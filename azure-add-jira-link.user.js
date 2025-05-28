// ==UserScript==
// @name         Azure DevOps - Add Jira Link
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.5.3
// @description  Adds a link to JIRA tickets on PRs
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
    waitForKeyElements(`.pr-header-branches > .bolt-link:last-of-type`, () => addBtn());
    waitForKeyElements(`.repos-pr-description-card`, () => injectLinkCard(), false);

    function addBtn() {
        // Prevent duplicate buttons on tab change
        if (document.querySelector(`.tm-custom-jira-btn`)) return;

        var link = getTicketUrl();

        const newEl = document.createElement("a")
        newEl.innerText = "JIRA";
        newEl.classList = "bolt-split-button-main bolt-button enabled primary bolt-focus-treatment tm-custom-jira-btn";
        newEl.href = link;

        // TODO - improve this logic using regex: ticketExample = "ABC-1371";
        // Check the ticket follows the format `***-000`
        if (!Number(getTicket().split('-')?.[1])) {
            console.warn("Unable to parse JIRA ticket ID")
            newEl.disabled = true;
            newEl.href="";
            newEl.classList += " disabled";
            newEl.title = "Unable to parse JIRA ticket ID"
        }

        const header = document.querySelector(".repos-pr-title-row");
        header.insertAdjacentElement("afterend", newEl);
    }

    function getTicket(){
        const branch = document.querySelector(".pr-header-branches > .bolt-link:last-of-type").innerText;

        var regexParsed = extractJiraTicketNumber(branch);
        if (regexParsed) return regexParsed;

        console.warn("Unable to parse ticket via regex");

        //var ticketParsed = branch.split("-").slice(0, 2).join("-")
        //ticketParsed = branch.split("-").slice(0, 2).join("-").replace("feature/", "").replace("feat/", "").replace("refactor/", "")
       // return ticketParsed;
    }

    function extractJiraTicketNumber(branchName) {
        // Define a regular expression pattern to match Jira ticket numbers with specified ranges.
        const pattern = /([A-Z]{3,}-\d{1,4})/gi;

        // Use the regular expression's exec method to find matches in the branch name.
        const match = pattern.exec(branchName);

        if (match) {
            // match[1] contains the Jira ticket number.
            return match[1];
        } else {
            // If no match is found, return null or an appropriate error message.
            return null;
        }
    }


    function getTicketUrl(){
        var ticketParsed = getTicket()

        // TODO - improve this logic using regex: ticketExample = "ABC-1371";
        // Check the ticket follows the format `***-000`
        if (!Number(ticketParsed.split('-')?.[1])) {
            console.warn("Unable to parse JIRA ticket ID")
            return;
        }

        var link = `${JIRA_URL}/browse/${ticketParsed.toUpperCase()}`;
        return link;
    }

    function injectLinkCard() {
        var link = getTicketUrl();

        if(!link) return;
        if(document.querySelector(`#tm_link`)) return
        var html = `
        <div id="tm_link" class="bolt-table-card bolt-card flex-column depth-8 bolt-card-white"><div class="bolt-card-content flex-row flex-grow bolt-default-horizontal-spacing"><div class="flex-column flex-grow scroll-hidden"><div class="padding-vertical-16 padding-horizontal-20 separator-line-bottom flex-row flex-center rhythm-horizontal-8"><div class="flex-column scroll-hidden">
          <a href="${link}">
            ${link}
            <span class="fabric-icon ms-Icon--NavigateExternalInline font-size" role="presentation" aria-hidden="true"> </span>
          </a>

        </div></div></div></div></div>
        `
        var card = document.createElement("div");
        card.innerHTML = html;
        document.querySelector(`.repos-pr-description-card`).insertAdjacentElement("beforebegin", card);
    }
})();
