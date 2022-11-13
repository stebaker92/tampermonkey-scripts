// ==UserScript==
// @name         Spotify - Hide Podcast Recommendations
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Hide podcasts from homepage
// @author       stebaker92
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function HidePodcastsFromHomePage() {
    waitForKeyElements(".Root__main-view", (mainView) => {
        console.log("creating MutationObserver");

        const observer = new MutationObserver(() => {
            const elements = document.querySelectorAll(`a[href*="/episode/"], a[href*="/show/"]`);

            for (const element of elements) {
                let closestParentSection = element.closest("section");
                closestParentSection.style.display = "none";
            }
        });

        observer.observe(mainView, { attributes: true, childList: true, subtree: true });
    }, true);
})();
