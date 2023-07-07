// ==UserScript==
// @name         Spotify - Hide Podcast Recommendations
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.3.2
// @description  Hide podcast recommendations from homepage
// @author       stebaker92
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=spotify.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function HidePodcastsFromHomePage() {
    waitForKeyElements(".Root__main-view", (el) => {
        console.log("creating MutationObserver");

        const observer = new MutationObserver(() => {
            const elements = document.querySelectorAll(`a[href*="/episode/"], a[href*="/show/"], a[href*="/podcasts/"]`);

            for (const element of elements) {
                let closestParentSection = element.closest(`section[data-testid="component-shelf"]`);
                closestParentSection.style.display = "none";
            }
        });

        observer.observe(el, { attributes: true, childList: true, subtree: true });
    }, true);
})();
