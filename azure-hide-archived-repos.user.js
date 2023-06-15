// ==UserScript==
// @name         Azure DevOps - Hide Archived Repos
// @namespace    https://github.com/stebaker92/
// @version      0.1
// @description  Mute repositories with 'archived' in the name
// @author       stebaker92
// @match        https://dev.azure.com/**
// @match        https://*.visualstudio.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=visualstudio.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';

    // DevOps uses client side routing so we need to wait until we're on a PR page to inject this button
    waitForKeyElements(`.repository-selector-callout .bolt-list-cell`, (e) => hideEl(e), false, 100);

    function hideEl(el) {
        console.log("found el", el.innerText)
        if (el.innerText?.toLowerCase().includes("archived")){
            el.style.opacity=".4";
        }
    }
})();
