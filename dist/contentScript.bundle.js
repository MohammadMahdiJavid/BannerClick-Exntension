/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content-scripts/bannerDetector/findBanners.js":
/*!***********************************************************!*\
  !*** ./src/content-scripts/bannerDetector/findBanners.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findBanners: () => (/* binding */ findBanners)
/* harmony export */ });
/* harmony import */ var _utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/utilityMethods.js */ "./src/content-scripts/utilities/utilityMethods.js");
/* harmony import */ var _utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/textMethods.js */ "./src/content-scripts/utilities/textMethods.js");
/* harmony import */ var _utilities_elementMethods_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/elementMethods.js */ "./src/content-scripts/utilities/elementMethods.js");




function findElementsWithCookie({ DOM, lang, jsonizedFile }) {
    let words = [
        jsonizedFile["words"][lang]["cookies"],
        jsonizedFile["words"][lang]["cookies1"],
    ];
    const oredWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithOr)(words);
    const xpathExpression = (0,_utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__.toXPathText)(oredWordsString);
    const elements = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)({
        DOM: DOM,
        xpathExpression: xpathExpression,
    });

    (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.pruneElements)({ elements: elements, strict: false });
    console.log("find Elements With Cookie inside");
    console.log(elements);

    if (!elements.length) {
        let words = [
            jsonizedFile["words"][lang]["partner"],
            jsonizedFile["words"][lang]["consent"],
            jsonizedFile["words"][lang]["accept"],
            jsonizedFile["words"][lang]["agree"],
            jsonizedFile["words"][lang]["personalised"],
            jsonizedFile["words"][lang]["policy"],
            jsonizedFile["words"][lang]["privacy"],
        ];
        let oredWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithOr)(words);
        words = [oredWordsString, jsonizedFile["words"][lang]["cookie"]];
        let andedWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithAnd)(words);
        let xpathExpression = (0,_utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__.toXPathText)(andedWordsString);
        elements.push(
            ...(0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)({
                DOM: DOM,
                xpathExpression: xpathExpression,
            })
        );

        words = [
            jsonizedFile["words"][lang]["partner"],
            jsonizedFile["words"][lang]["consent"],
            jsonizedFile["words"][lang]["accept"],
            jsonizedFile["words"][lang]["agree"],
            jsonizedFile["words"][lang]["personalised"],
            jsonizedFile["words"][lang]["policy"],
            jsonizedFile["words"][lang]["privacy"],
        ];
        oredWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithOr)(words);
        words = [oredWordsString, jsonizedFile["words"][lang]["Cookie"]];
        andedWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithAnd)(words);
        xpathExpression = (0,_utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__.toXPathText)(andedWordsString);
        elements.push(
            ...(0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)({
                DOM: DOM,
                xpathExpression: xpathExpression,
            })
        );

        (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.pruneElements)({ elements: elements, strict: false });

        if (!elements.length) {
            let words = [
                jsonizedFile["words"][lang]["cookie"],
                jsonizedFile["words"][lang]["privacy policy"],
                jsonizedFile["words"][lang]["legitimate interest"],
            ];
            let oredWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithOr)(words);
            let xpathExpression = (0,_utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__.toXPathText)(oredWordsString);
            let elements = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)({
                DOM: DOM,
                xpathExpression: xpathExpression,
            });
            (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.pruneElements)({ elements: elements, strict: true });

            if (!elements.length) {
                let xpathExpression = ".//*[contains(@id, 'cookie')]";
                let elements = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)({
                    DOM: DOM,
                    xpathExpression: xpathExpression,
                });
                (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.pruneElements)({ elements: elements, strict: true });
            }
        }
    }
    return elements;
}

function findBanners(DOM, lang = "en", jsonizedFile) {
    let banners = [];
    const elementsWithCookieInside = findElementsWithCookie({
        DOM: DOM,
        lang: lang,
        jsonizedFile: jsonizedFile,
    });
    if (elementsWithCookieInside.length) {
        let fixedElementsWithCookieInside = (0,_utilities_elementMethods_js__WEBPACK_IMPORTED_MODULE_2__.findFixedAncestors)(
            elementsWithCookieInside
        );
        if (!fixedElementsWithCookieInside.size) {
            fixedElementsWithCookieInside = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findByZIndex)(
                elementsWithCookieInside
            );
        }
        if (!fixedElementsWithCookieInside.size) {
            fixedElementsWithCookieInside.set(
                document.querySelector("body"),
                (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findDeepestElement)(elementsWithCookieInside)
            );
        }
        fixedElementsWithCookieInside.forEach((value, key) => {
            let optimalElement = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findOptimal)({ parent: key, element: value });
            if (
                !(0,_utilities_elementMethods_js__WEBPACK_IMPORTED_MODULE_2__.isInsideViewport)(optimalElement) ||
                !(0,_utilities_elementMethods_js__WEBPACK_IMPORTED_MODULE_2__.hasEnoughWords)(optimalElement)
            )
                return;
            banners.push(optimalElement);
        });
    }
    return banners;
}


/***/ }),

/***/ "./src/content-scripts/utilities/elementMethods.js":
/*!*********************************************************!*\
  !*** ./src/content-scripts/utilities/elementMethods.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteInvisibleElements: () => (/* binding */ deleteInvisibleElements),
/* harmony export */   deleteUnrelatedElements: () => (/* binding */ deleteUnrelatedElements),
/* harmony export */   findAncestorWithIntZIndex: () => (/* binding */ findAncestorWithIntZIndex),
/* harmony export */   findFixedAncestors: () => (/* binding */ findFixedAncestors),
/* harmony export */   findPath: () => (/* binding */ findPath),
/* harmony export */   hasEnoughWords: () => (/* binding */ hasEnoughWords),
/* harmony export */   isElementSizeEqualToWindow: () => (/* binding */ isElementSizeEqualToWindow),
/* harmony export */   isInsideViewport: () => (/* binding */ isInsideViewport),
/* harmony export */   isMajorChild: () => (/* binding */ isMajorChild),
/* harmony export */   isOneDimension: () => (/* binding */ isOneDimension)
/* harmony export */ });
function entriesToRemove(elements, unrelatedElements) {
    unrelatedElements.forEach((element) => {
        const index = elements.indexOf(element);
        if (index !== -1) elements.splice(index, 1);
    });
}

function isInsideOptions(element) {
    while (!["div", "html"].includes(element.tagName.toLowerCase())) {
        if (
            ["table", "tr", "ul", "ol", "script"].includes(
                element.tagName.toLowerCase()
            )
        )
            return true;
        element = element.parentElement;
    }
    return false;
}

function isFixedElement(element) {
    const style = window.getComputedStyle(element);
    return style.position === "fixed";
}

function findFixedAncestor(element) {
    while (true) {
        if (element.tagName.toLowerCase() === "html") return null;
        else if (isFixedElement(element)) return element;
        element = element.parentElement;
    }
}
function isInsideViewport(element) {
    // check if the element is inside the viewport
    const rects = element.getClientRects();
    const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    for (const rect of rects) {
        const top = rect.top + scrollTop;
        const left = rect.left + scrollLeft;
        const bottom = rect.bottom + scrollTop;
        const right = rect.right + scrollLeft;

        if (
            bottom >= 0 &&
            top <= viewportHeight &&
            right >= 0 &&
            left <= viewportWidth
        ) {
            return true;
        }
    }

    return false;
}

function isInsideViewport2(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isPositiveZIndexInt(element) {
    const style = window.getComputedStyle(element);
    const zIndex = style.zIndex;
    return zIndex !== "" && parseInt(zIndex) > 5;
}

function findAncestorWithIntZIndex(element) {
    while (true) {
        if (element.tagName.toLowerCase() === "html") return null;
        else if (isPositiveZIndexInt(element)) return element;
        element = element.parentElement;
    }
}
const isInsideFooter = (element) => element.closest("footer") !== null;

const isLink = (element) =>
    element.closest("a") !== null || // Check if the element itself is a link
    element.closest("[onclick]") !== null; // Check if the element has an onclick attribute

function hasNegativeZIndex(element) {
    const style = window.getComputedStyle(element);
    const zIndex = style.zIndex;
    return zIndex !== "" && parseInt(zIndex) < 0;
}

function deleteUnrelatedElements(elements, strict) {
    const unrelatedElements = [];
    elements.forEach((element, index) => {
        try {
            if (isInsideOptions(element) || !isInsideViewport(element))
                unrelatedElements.push(element);
            else if (strict && !findFixedAncestor(element))
                unrelatedElements.push(element);
            else if (
                findFixedAncestor(element) ||
                findAncestorWithIntZIndex(element)
            )
                return; // check this functionality with Debugger
            else if (isInsideFooter(element)) unrelatedElements.push(element);
            else if (isLink(element)) unrelatedElements.push(element);
        } catch (error) {
            unrelatedElements.push(element);
        }
    });
    entriesToRemove(elements, unrelatedElements);
}

function deleteInvisibleElements(elements) {
    const invisibleElements = [];
    elements.forEach((element, index) => {
        try {
            if (element.tagName.toLowerCase() === "html") return;
            if (
                element.closest('[style*="visibility: hidden"]') ||
                element.closest('[style*="display: none"]') ||
                hasNegativeZIndex(element)
            )
                invisibleElements.push(element);
        } catch (error) {
            invisibleElements.push(element);
        }
    });
    entriesToRemove(elements, invisibleElements);
}

function findFixedAncestors(elements) {
    const fixedAncestors = new Map();
    elements.forEach((element) => {
        const fixedAncestor = findFixedAncestor(element);
        if (fixedAncestor) fixedAncestors.set(fixedAncestor, element);
    });
    return fixedAncestors;
}

function findPath({ parent, element }) {
    /*
    sequential path between parent to element
    */
    const path = [];
    let tmp = element;
    while (tmp !== parent) {
        path.unshift(tmp);
        tmp = tmp.parentElement;
    }
    return path;
}

function isElementSizeEqualToWindow(element) {
    let tolerance = 0.1;
    let windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    let windowArea = windowSize.width * windowSize.height;
    let elementArea = element.offsetWidth * element.offsetHeight;
    return elementArea > (1 - tolerance) * windowArea;
}

function isOneDimension(element) {
    if (element.offsetWidth < 5 || element.offsetHeight < 5) return true;
    return false;
}

function isMajorChild(element, path) {
    const elementArea = element.offsetWidth * element.offsetHeight;
    const windowInnerSize = window.innerHeight * window.innerWidth;
    for (const child of path) {
        const childArea = child.offsetWidth * child.offsetHeight;
        const isMajorSize = elementArea - childArea > windowInnerSize * 0.1;
        if (
            // textContent has better match compared to innerText
            // child.innerText === element.innerText &&
            child.textContent === element.textContent &&
            isMajorSize &&
            !isOneDimension(child)
        )
            return true;
    }
    return false;
}

function hasEnoughWords(element) {
    const matches = element.textContent.match(/\w+/g);
    return matches && matches.length > 3;
}


/***/ }),

/***/ "./src/content-scripts/utilities/textMethods.js":
/*!******************************************************!*\
  !*** ./src/content-scripts/utilities/textMethods.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toXPathText: () => (/* binding */ toXPathText)
/* harmony export */ });
const toXPathText = (string) => `.//*[text()[${string}]]`;


/***/ }),

/***/ "./src/content-scripts/utilities/utilityMethods.js":
/*!*********************************************************!*\
  !*** ./src/content-scripts/utilities/utilityMethods.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   concatWithAnd: () => (/* binding */ concatWithAnd),
/* harmony export */   concatWithOr: () => (/* binding */ concatWithOr),
/* harmony export */   findByZIndex: () => (/* binding */ findByZIndex),
/* harmony export */   findDeepestElement: () => (/* binding */ findDeepestElement),
/* harmony export */   findElementsByXpath: () => (/* binding */ findElementsByXpath),
/* harmony export */   findOptimal: () => (/* binding */ findOptimal),
/* harmony export */   pruneElements: () => (/* binding */ pruneElements)
/* harmony export */ });
/* harmony import */ var _elementMethods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elementMethods.js */ "./src/content-scripts/utilities/elementMethods.js");



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

function concatWithOr(words, variation = true) {
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

function concatWithAnd(words) {
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

function findElementsByXpath({ DOM, xpathExpression }) {
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

function pruneElements({ elements, strict = false }) {
    (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.deleteUnrelatedElements)(elements, strict);
    (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.deleteInvisibleElements)(elements);
}

function findByZIndex(elements) {
    const ancestorsWithIntZIndex = new Map();
    elements.forEach((element) => {
        const ancestorWithIntZIndex = (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.findAncestorWithIntZIndex)(element);
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

function findDeepestElement(elements) {
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

function findOptimal({ parent, element, frame = false }) {
    /*
    finds best possible element that covers all the banner-related content 
    also tries to shrink it as much as possible
    head Element : parent
    tail Element : element
    */
    let path = (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.findPath)({ parent: parent, element: element });
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
        if (!frame && (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.isElementSizeEqualToWindow)(headElement)) {
            headElement = path.shift();
            continue;
        }
        if (
            (opacity !== 1.0 || alpha < 1.0) &&
            (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.isMajorChild)(headElement, path)
        ) {
            headElement = path.shift();
            continue;
        }
        if ((0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.isOneDimension)(headElement)) {
            // some divs have height or width of 0
            headElement = path.shift();
            continue;
        }
        optimalElement = headElement;
        break;
    }
    return optimalElement;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./src/content-scripts/content-script.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bannerDetector_findBanners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bannerDetector/findBanners.js */ "./src/content-scripts/bannerDetector/findBanners.js");


console.log("inside Content Script");

document.addEventListener("DOMContentLoaded", async function () {
    // do stuff here
    console.log("content-script.js is being executed");

    while (document.readyState !== "complete") {
        console.log("document not ready");
        await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(2000);
    }
    // chrome.runtime.getURL("static/dictWords.json", async (fileUrl) => {
    //     response = await fetch(fileUrl);
    //     console.log(jsonizedFile);
    // });
    let filePath = chrome.runtime.getURL("static/dictWords.json");
    let response = await fetch(filePath);
    let jsonizedFile;

    if (response.ok) {
        jsonizedFile = await response.json();
        console.log(`json file containing words:`);
        console.log(jsonizedFile);
    } else {
        console.error(
            "Failed to fetch JSON file:",
            response.status,
            response.statusText
        );
        return;
    }
    console.log(`json file containing words:`);
    console.log(jsonizedFile);
    const banners = (0,_bannerDetector_findBanners_js__WEBPACK_IMPORTED_MODULE_0__.findBanners)(document, "de", jsonizedFile);
    console.log(`found banners`);
    console.log(banners);
});

})();

/******/ })()
;
//# sourceMappingURL=contentScript.bundle.js.map