// ==UserScript==
// @name         Azure DevOps - Add Jira Link
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.4.1
// @description  Add a link to JIRA tickets on PRs
// @author       stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @match        https://*.visualstudio.com/**
// @match        https://dev.azure.com/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=visualstudio.com
// @grant        GM_getValue
// @grant        GM_setValue
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(function () {
    'use strict';

    const JIRA_URL = GM_getValue("jira_url") || prompt("What is your JIRA base URL?", "https://EXAMPLE.atlassian.net/browse/");
    GM_setValue("jira_url", new URL(JIRA_URL).origin);

    if (!JIRA_URL) return;

    // DevOps uses client side routing so we need to wait until we're on a PR page to inject this button
    waitForKeyElements(`.pr-header-branches .bolt-link`, () => addBtn());

    function addBtn() {
        // Prevent duplicate buttons on tab change
        if (document.querySelector(`.tm-custom-jira-btn`)) return;

        const branch = document.querySelector(".pr-header-branches .bolt-link").innerText;
        var ticketParsed = branch.split("-").slice(0, 2).join("-")
        ticketParsed = (ticketParsed.includes("/") ? ticketParsed.split("/")[1] : ticketParsed)


        const newEl = document.createElement("a")
        newEl.innerText = "JIRA";
        newEl.classList = "bolt-split-button-main bolt-button enabled primary bolt-focus-treatment tm-custom-jira-btn";
        newEl.href = `${JIRA_URL}/browse/${ticketParsed}`;

        // TODO - improve this logic using regex: ticketExample = "ABC-1371";
        // Check the ticket follows the format `***-000`
        if (!Number(ticketParsed.split('-')?.[1])) {
            newEl.disabled = true;
            newEl.href="";
            newEl.classList += " disabled";
            newEl.title = "Unable to parse JIRA ticket ID";
        }

        const header = document.querySelector(".repos-pr-title-row");
        header.insertAdjacentElement("afterend", newEl);
    }
})();
