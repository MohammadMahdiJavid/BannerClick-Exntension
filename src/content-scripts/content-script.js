import { findBanners } from "./bannerDetector/findBanners.js";

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
    const banners = findBanners(document, "de", jsonizedFile);
});
