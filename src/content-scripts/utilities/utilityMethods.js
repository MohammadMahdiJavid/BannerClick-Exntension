import {
    deleteInvisibleElements,
    deleteUnrelatedElements,
} from "./elementMethods.js";

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

export function findElementsByXpath(DOM, xpathExpression) {
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

export function pruneElements(elements, strict = false) {
    deleteUnrelatedElements(elements, strict);
    deleteInvisibleElements(elements);
}
