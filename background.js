let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color }); // needs storage permission
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log("onActivated:", activeInfo);
  printCurrentUrl();
  injectContentScriptInTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((updateInfo) => {
  console.log("onUpdated:", updateInfo);
  printCurrentUrl();
  injectContentScriptInTab(updateInfo);
});

function printCurrentUrl() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url;
    console.log(url);
  });
}

function injectContentScriptInTab(tabID, script) {
  let scr = "content/currentpage.js";
  if (script) {
    scr = script;
  }

  console.log("injected");

  chrome.scripting.executeScript({
    target: { tabId: tabID },
    files: [scr],
  });
}
