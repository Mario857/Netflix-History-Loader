/* popup.js
 *
 * This file initializes its scripts after the popup has loaded.
 *
 * It shows how to access global variables from background.js.
 * Note that getViews could be used instead to access other scripts.
 *
 * A port to the active tab is open to send messages to its in-content.js script.
 *
 */


console = chrome.extension.getBackgroundPage().console;
const expandButton = document.getElementById('expandButton');
const saveHistoryButton = document.getElementById('saveHistoryButton');
const openHistoryFileButton = document.getElementById('openHistoryFileButton');
const loadHistoryFileButton = document.getElementById('loadHistoryFileButton');


//const expand = document.getElementsByClassName("btn-bar top-padding btn-bar-left")[0].children[0].click();

function scrapHistoryLinks(document) {

}

function log(...args) {
    chrome.tabs.executeScript({ code: `console.log(${args})` });
};


const setTempStorage = (value) => {
    chrome.tabs.executeScript({ code: `localStorage.setItem('temp1', '${value}')` });
}

const getTempStorage = () => {
    chrome.tabs.executeScript({
        code: `(function getTemp(){
        const temp1 = localStorage.getItem('temp1');
        return { temp1 };
      })()` }, function (result) {
        return JSON.parse(result[0].temp1);
    });
}

const getHistoryLinksScript = `(function getUrls(){
    const urls = Array.from({ length: document.getElementsByClassName("col title").length }).map((_, i) => document.getElementsByClassName("col title")[i].children[0].getAttribute('href'))
    return { urls };
  })()`;

expandButton.onclick = function (element) {
    chrome.tabs.executeScript({ code: `setInterval(() => document.getElementsByClassName("btn-bar top-padding btn-bar-left")[0].children[0].click(), 200)` })
};

saveHistoryButton.onclick = function (element) {
    chrome.tabs.executeScript({
        code: `(function getUrls(){
        const urls = Array.from({ length: document.getElementsByClassName("col title").length }).map((_, i) => document.getElementsByClassName("col title")[i].children[0].getAttribute('href'))
        return { urls };
      })()` }, function (result) {
        const urlLinks = result[0].urls.map(x => `https://www.netflix.com${x.replace('/title/', '/watch/')}`).reverse();
        setTempStorage(JSON.stringify(urlLinks));
    });

}

openHistoryFileButton.onclick = function (element) {

    chrome.tabs.executeScript({
        code: `(function getTemp(){
        const temp1 = localStorage.getItem('temp1');
        return { temp1 };
      })()` }, function (result) {
        JSON.parse(result[0].temp1).forEach((x, i) => {
            setTimeout(() => {
                chrome.tabs.executeScript({ code: `window.location.replace('${x}');` })
            }, 4000 * i)
        })
    });
}


loadHistoryFileButton.onclick = function (element) {

}

// Start the popup script, this could be anything from a simple script to a webapp
const initPopupScript = () => {
    // Access the background window object
    const backgroundWindow = chrome.extension.getBackgroundPage();
    // Do anything with the exposed variables from background.js
    console.log(backgroundWindow.sampleBackgroundGlobal);

    // This port enables a long-lived connection to in-content.js
    let port = null;

    // Send messages to the open port
    const sendPortMessage = message => port.postMessage(message);

    // Find the current active tab
    const getTab = () =>
        new Promise(resolve => {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                tabs => resolve(tabs[0])
            );
        });

    // Handle port messages
    const messageHandler = message => {
        console.log('popup.js - received message:', message);
    };

    // Find the current active tab, then open a port to it
    getTab().then(tab => {
        // Connects to tab port to enable communication with inContent.js
        port = chrome.tabs.connect(tab.id, { name: 'chrome-extension-template' });
        // Set up the message listener
        port.onMessage.addListener(messageHandler);
        // Send a test message to in-content.js
        sendPortMessage('Message from popup!');
    });
};

// Fire scripts after page has loaded
document.addEventListener('DOMContentLoaded', initPopupScript);




  