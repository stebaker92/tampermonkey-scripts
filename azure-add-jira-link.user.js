// ==UserScript==
// @name         Azure DevOps - Add Jira Link
// @namespace    http://tampermonkey.net/
// @version      0.2.1
// @description  Add link to JIRA
// @author       stebaker92
// @match        https://*.visualstudio.com/*/_git/*/pullrequest/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=visualstudio.com
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    const JIRA_URL = GM_getValue("jira_url") || prompt("What is your JIRA base URL?", "https://EXAMPLE.atlassian.net/browse/");
    GM_setValue("jira_url", new URL(JIRA_URL).origin);

    if (!JIRA_URL) return;

    const branch = document.querySelector(".pr-header-branches .bolt-link").innerText;
    // TODO - regex this: ticketExample = "PXC-1371";
    const ticketParsed = branch.split("-").slice(0,2).join("-").replace("feature/", "")

    const newEl = document.createElement("a")
    newEl.innerText = "JIRA";
    newEl.classList = "bolt-split-button-main bolt-button enabled primary bolt-focus-treatment";
    newEl.href= `${JIRA_URL}/browse/${ticketParsed}`;

    const header = document.querySelector(".repos-pr-title-row");
    header.insertAdjacentElement("afterend", newEl);

    // TODO - we could load the JIRA page and append the title onto the PR using GM_xmlHttpRequest
})();
