import {
    concatWithOr,
    concatWithAnd,
    findElementsByXpath,
    pruneElements,
    findByZIndex,
    findOptimal,
    findDeepestElement,
} from "../utilities/utilityMethods.js";
import { toXPathText } from "../utilities/textMethods.js";
import {
    findFixedAncestors,
    isInsideViewport,
    hasEnoughWords,
} from "../utilities/elementMethods.js";

function findElementsWithCookie({ DOM, lang, jsonizedFile }) {
    let words = [
        jsonizedFile["words"][lang]["cookies"],
        jsonizedFile["words"][lang]["cookies1"],
    ];
    const oredWordsString = concatWithOr(words);
    const xpathExpression = toXPathText(oredWordsString);
    const elements = findElementsByXpath({
        DOM: DOM,
        xpathExpression: xpathExpression,
    });

    pruneElements({ elements: elements, strict: false });
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
        let oredWordsString = concatWithOr(words);
        words = [oredWordsString, jsonizedFile["words"][lang]["cookie"]];
        let andedWordsString = concatWithAnd(words);
        let xpathExpression = toXPathText(andedWordsString);
        elements.push(
            ...findElementsByXpath({
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
        oredWordsString = concatWithOr(words);
        words = [oredWordsString, jsonizedFile["words"][lang]["Cookie"]];
        andedWordsString = concatWithAnd(words);
        xpathExpression = toXPathText(andedWordsString);
        elements.push(
            ...findElementsByXpath({
                DOM: DOM,
                xpathExpression: xpathExpression,
            })
        );

        pruneElements({ elements: elements, strict: false });

        if (!elements.length) {
            let words = [
                jsonizedFile["words"][lang]["cookie"],
                jsonizedFile["words"][lang]["privacy policy"],
                jsonizedFile["words"][lang]["legitimate interest"],
            ];
            let oredWordsString = concatWithOr(words);
            let xpathExpression = toXPathText(oredWordsString);
            let elements = findElementsByXpath({
                DOM: DOM,
                xpathExpression: xpathExpression,
            });
            pruneElements({ elements: elements, strict: true });

            if (!elements.length) {
                let xpathExpression = ".//*[contains(@id, 'cookie')]";
                let elements = findElementsByXpath({
                    DOM: DOM,
                    xpathExpression: xpathExpression,
                });
                pruneElements({ elements: elements, strict: true });
            }
        }
    }
    return elements;
}

export function findBanners(DOM, lang = "en", jsonizedFile) {
    let banners = [];
    const elementsWithCookieInside = findElementsWithCookie({
        DOM: DOM,
        lang: lang,
        jsonizedFile: jsonizedFile,
    });
    if (elementsWithCookieInside.length) {
        let fixedElementsWithCookieInside = findFixedAncestors(
            elementsWithCookieInside
        );
        if (!fixedElementsWithCookieInside.size) {
            fixedElementsWithCookieInside = findByZIndex(
                elementsWithCookieInside
            );
        }
        if (!fixedElementsWithCookieInside.size) {
            fixedElementsWithCookieInside.set(
                document.querySelector("body"),
                findDeepestElement(elementsWithCookieInside)
            );
        }
        fixedElementsWithCookieInside.forEach((value, key) => {
            let optimalElement = findOptimal({ parent: key, element: value });
            if (
                !isInsideViewport(optimalElement) ||
                !hasEnoughWords(optimalElement)
            )
                return;
            banners.push(optimalElement);
        });
    }
    return banners;
}
