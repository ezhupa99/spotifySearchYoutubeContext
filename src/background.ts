const tabFilter = {
    url: "*://open.spotify.com/*"
}

chrome.runtime.onInstalled.addListener(() => {

    // * Reload all tabs to make sure popup and content script message API works
    chrome.tabs.query(tabFilter, function (tabs) {

        reloadSpotifyChromeTabs(tabs);
    })
});

function reloadSpotifyChromeTabs(tabs: chrome.tabs.Tab[]) {
    tabs.forEach((tab: chrome.tabs.Tab) => {
        chrome.tabs.reload(tab.id as number);
    });
}
