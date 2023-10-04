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



function findElementsWithCookie(DOM, lang, jsonizedFile) {
    let words = [
        jsonizedFile["words"][lang]["cookies"],
        jsonizedFile["words"][lang]["cookies1"],
    ];
    const oredWordsString = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.concatWithOr)(words);
    const xpathExpression = (0,_utilities_textMethods_js__WEBPACK_IMPORTED_MODULE_1__.toXPathText)(oredWordsString);
    const elements = (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.findElementsByXpath)(DOM, xpathExpression);
    (0,_utilities_utilityMethods_js__WEBPACK_IMPORTED_MODULE_0__.pruneElements)(elements);
    console.log(elements);
}

function findBanners(DOM, lang = "en", jsonizedFile) {
    let banners = [];
    findElementsWithCookie(DOM, lang, jsonizedFile);
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
/* harmony export */   deleteUnrelatedElements: () => (/* binding */ deleteUnrelatedElements)
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
/* harmony export */   concatWithOr: () => (/* binding */ concatWithOr),
/* harmony export */   findElementsByXpath: () => (/* binding */ findElementsByXpath),
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

function findElementsByXpath(DOM, xpathExpression) {
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

function pruneElements(elements, strict = false) {
    (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.deleteUnrelatedElements)(elements, strict);
    (0,_elementMethods_js__WEBPACK_IMPORTED_MODULE_0__.deleteInvisibleElements)(elements);
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

    if (document.readyState !== "complete") {
        console.log("document not ready");
        await ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))(1000);
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
        console.log(jsonizedFile);
    } else {
        console.error(
            "Failed to fetch JSON file:",
            response.status,
            response.statusText
        );
        return;
    }
    console.log(jsonizedFile);
    const banners = (0,_bannerDetector_findBanners_js__WEBPACK_IMPORTED_MODULE_0__.findBanners)(document, "de", jsonizedFile);
});

})();

/******/ })()
;
//# sourceMappingURL=contentScript.bundle.js.map