let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color }); // needs storage permission
  console.log("Default background color set to %cgreen", `color: ${color}`);
});
