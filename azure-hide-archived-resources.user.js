// ==UserScript==
// @name         Azure DevOps - Hide Archived Resources
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.1.1
// @description  Mute resources repositories with 'archived' in the name
// @author       stebaker92
// @match        https://dev.azure.com/**
// @match        https://*.visualstudio.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=visualstudio.com
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(function() {
    'use strict';

    hideArchivedRepos();
    hideArchivedProjects();
})();


function hideArchivedRepos() {
    // DevOps uses client side routing so we need to wait until we're on a PR page to run this
    waitForKeyElements(`.repository-selector-callout .bolt-list-cell`, (e) => hideEl(e), false, 100);

    function hideEl(el) {
        console.log("found el", el.innerText)
        if (el.innerText?.toLowerCase().includes("archived")){
            el.style.opacity=".4";
        }
    }
}

function hideArchivedProjects() {
    // TODO
}