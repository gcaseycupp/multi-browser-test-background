
const tabStorage = {};
const networkFilters = {
    urls: [
        "http://*/*",
        "https://*/*"
    ]
};
var LogVerbose = true;

console.log('redirectTest background page loaded');
console.log('Working on Chrome : Yes');
console.log('Working on Edge : Yes');
console.log('Working on Firefox : Yes');
console.log('Working on Safari : ?');

(function () {

   
    if (chrome?.runtime) {
        console.log('Chromium Browser')
        setupChromeListeners();

    } else {
        console.log('Not Chromium Browser')
        setupBrowserListeners();
    }

}());


function setupBrowserListeners() {
    //setup 
    let browser = "browser"; // firefox, safari

    // browser.tabs.onActivated.addListener((tab) => {
    //     logTabEvent(tab, "onActivated", browser);
    // });

    browser.webNavigation.onDOMContentLoaded.addListener((details) => {
        onWebNavEvent(details, "onDOMContentLoaded", browser);
    });

    // browser.webNavigation.onCompleted.addListener((details) => {
    //     onWebNavEvent(details, "onCompleted", browser);
    // });

    // browser.webRequest.onCompleted.addListener((details) => {
    //     logWebRequest(details, "onCompleted", browser);
    // }, networkFilters);
}

function setupChromeListeners() {
    let browser = "chromium"; //chrome, edge

    // chrome.tabs.onActivated.addListener((tab) => {
    //     logTabEvent(tab, "onActivated", browser);
    // });

    chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
        onWebNavEvent(details, "onDOMContentLoaded", browser);
    });

    // chrome.webNavigation.onCompleted.addListener((details) => {
    //     onWebNavEvent(details, "onCompleted", browser);
    // });

    // chrome.webRequest.onCompleted.addListener((details) => {
    //     logWebRequest(details, "onCompleted", browser);
    // }, networkFilters);
}

function logTabEvent(tab, eventName, browser) {
    if (this.LogVerbose) {
        this.log("tab", tab, eventName, browser)
    }
}

function logWebRequest(details, eventName, browser) {
    // if (details?.frameType !== "sub_frame" || details?.frameId === 0) {
    if(details?.frameId === 0) {
        this.log("webRequest", details, eventName, browser);
    }
}

function onWebNavEvent(details, eventName, browser) {
    // if (details?.transitionType !== "auto_subframe" || 
    if(details?.frameId === 0) {
        this.log("webNav", details, eventName, browser)
    }
}

function log(apiName, details, eventName, browser) {
    if (this.LogVerbose) {
        console.log(`${browser} : ${apiName}.${eventName}:`, JSON.parse(JSON.stringify(details)));
    }
}


