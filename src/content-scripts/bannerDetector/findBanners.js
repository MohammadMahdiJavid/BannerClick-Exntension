import {
    concatWithOr,
    findElementsByXpath,
    pruneElements,
} from "../utilities/utilityMethods.js";
import { toXPathText } from "../utilities/textMethods.js";

function findElementsWithCookie(DOM, lang, jsonizedFile) {
    let words = [
        jsonizedFile["words"][lang]["cookies"],
        jsonizedFile["words"][lang]["cookies1"],
    ];
    const oredWordsString = concatWithOr(words);
    const xpathExpression = toXPathText(oredWordsString);
    const elements = findElementsByXpath(DOM, xpathExpression);
    pruneElements(elements);
    console.log(elements);
}

export function findBanners(DOM, lang = "en", jsonizedFile) {
    let banners = [];
    findElementsWithCookie(DOM, lang, jsonizedFile);
    return banners;
}
