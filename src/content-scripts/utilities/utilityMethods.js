import {
    deleteInvisibleElements,
    deleteUnrelatedElements,
    findPath,
    isMajorChild,
    isOneDimension,
    isElementSizeEqualToWindow,
} from "./elementMethods.js";
import { findAncestorWithIntZIndex } from "./elementMethods.js";

function findWordVariations(word) {
    // one word variation
    return [
        word.charAt(0).toUpperCase() + word.slice(1),
        word.toLowerCase(),
        word.toUpperCase(),
    ];
}

function findWordsVariations(words) {
    // all words variations
    const all = [];

    for (const word of words) {
        if (word.includes("contains(.,")) continue;
        all.push(...findWordVariations(word));
    }

    return all;
}

export function concatWithOr(words, variation = true) {
    /*
        returns a XPATH expression
        to look for each word contained in the text
        or operator
    */
    let result = "";
    if (variation) words = findWordsVariations(words);
    words.forEach((word, index) => {
        if (word.includes("contains(.,")) {
            if (result) result = result + " or (" + word + ")";
            else result = result + "(" + word + ")";
        } else {
            if (result) result = result + ' or contains(., "' + word + '")';
            else result = result + 'contains(., "' + word + '")';
        }
    });
    return result;
}

export function concatWithAnd(words) {
    let result = "";
    words.forEach((word, index) => {
        if (word.includes("contains(.,")) {
            if (result) result = result + " and (" + word + ")";
            else result = result + "(" + word + ")";
        } else if (result) {
            result = result + ' and contains(., "' + word + '")';
        } else {
            result = result + 'contains(., "' + word + '")';
        }
    });
    return result;
}

export function findElementsByXpath({ DOM, xpathExpression }) {
    const result = DOM.evaluate(
        xpathExpression,
        DOM,
        null,
        // XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        XPathResult.ANY_TYPE,
        null
    );
    // Loop through the matching elements
    let node;
    const matchedElements = [];

    while ((node = result.iterateNext())) {
        matchedElements.push(node);
    }
    return matchedElements;
}

export function pruneElements({ elements, strict = false }) {
    deleteUnrelatedElements(elements, strict);
    deleteInvisibleElements(elements);
}

export function findByZIndex(elements) {
    const ancestorsWithIntZIndex = new Map();
    elements.forEach((element) => {
        const ancestorWithIntZIndex = findAncestorWithIntZIndex(element);
        if (!ancestorWithIntZIndex) return;
        ancestorsWithIntZIndex.set(ancestorWithIntZIndex, element);
    });
    return ancestorsWithIntZIndex;
}

function getElementDepth(element) {
    let depth = 0;
    let parent = element.parentElement;
    while (parent && parent.tagName.toLowerCase() !== "html") {
        depth++;
        parent = parent.parentElement;
    }
    return depth;
}

export function findDeepestElement(elements) {
    let deepestElement = elements[0];
    let maxDepth = getElementDepth(elements[0]);
    elements.forEach((element) => {
        const elementDepth = getElementDepth(element);
        if (elementDepth > maxDepth) {
            maxDepth = elementDepth;
            deepestElement = element;
        }
    });
    return deepestElement;
}

export function findOptimal({ parent, element, frame = false }) {
    /*
    finds best possible element that covers all the banner-related content 
    also tries to shrink it as much as possible
    head Element : parent
    tail Element : element
    */
    let path = findPath({ parent: parent, element: element });
    let headElement = parent;
    let tailElement = element;
    let optimalElement = null;
    while (true) {
        const opacity = parseFloat(
            window.getComputedStyle(headElement).opacity
        );
        let backgroundColors = window
            .getComputedStyle(headElement)
            .backgroundColor.split(",");
        let alpha = null;
        if (backgroundColors.length === 4) {
            alpha = parseFloat(backgroundColors[3].replace(")", ""));
        } else {
            alpha = 1.0;
        }
        if (headElement === tailElement) {
            optimalElement = headElement;
            break;
        }
        // check if there are any siblings for next one
        // check transparency of head div
        if (
            !["div", "form", "section"].includes(
                headElement.tagName.toLowerCase()
            )
        ) {
            headElement = path.shift();
            continue;
        }
        if (!frame && isElementSizeEqualToWindow(headElement)) {
            headElement = path.shift();
            continue;
        }
        if (
            (opacity !== 1.0 || alpha < 1.0) &&
            isMajorChild(headElement, path)
        ) {
            headElement = path.shift();
            continue;
        }
        if (isOneDimension(headElement)) {
            // some divs have height or width of 0
            headElement = path.shift();
            continue;
        }
        optimalElement = headElement;
        break;
    }
    return optimalElement;
}
