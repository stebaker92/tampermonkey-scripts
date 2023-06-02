// ==UserScript==
// @name         JIRA - Add PR Link on Paste
// @version      0.3
// @description  Attach a Link when pasting a PR URL
// @author       You
// @match        https://*.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    document.addEventListener('paste', async (e) => {
        console.log(e.target, "selectedEl");
        console.log(e.target?.isContentEditable, "isEditable");

        var text = (e.originalEvent || e).clipboardData.getData('text/plain');

        const isPR = text.includes("dev.azure.com") || (text.includes("visualstudio.com/") && text.includes("pullrequest"));
        if(!isPR) { console.log("is not PR link.. exiting"); return;}

        if (e.target.className.includes("ProseMirror-")) { console.log("ticket is being edited.. exiting"); return; }
        if (e.target.tagName.includes("INPUT")) { console.log("input is being edited.. exiting"); return; }

        // This is a little hacky but JIRA doesn't load icons from dev.azure.com so use visualstudio.com
        var org;
        const formatAzureUrl = text => text.includes("dev.azure.com") ? (org = text.split("/")[3], `${text.replace("dev.azure.com/" + org, org + ".visualstudio.com")}`) : text;

        text=formatAzureUrl(text);

        e.preventDefault();

        const repoName = decodeURI(text.includes("dev.azure.com") ? text.split("/")[6] : text.split("/")[5]); // This only handles Azure & VisualStudio.com links currently

        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        document.querySelector(`[data-testid="issue.views.issue-base.foundation.quick-add.link-button.ui.link-dropdown-button"]`).click();
        await wait(50)
        document.querySelector(`[data-test-id="issue.issue-view.views.issue-base.foundation.quick-add.quick-add-item.link-web"]`).click();
        await wait(50)

        sendKeys(`[data-testid="issue.views.issue-base.content.web-links.create-link.inline-fields.url"]`, text);
        sendKeys(`[data-testid="issue.views.issue-base.content.web-links.create-link.inline-fields.text"]`, "PR" + (repoName ? ` - ${repoName}` : ''));

        // document.querySelector(`[data-testid="issue.views.issue-base.content.web-links.create-link.submit-button"]`).click()
    });
})();

async function sendKeys(selector, text){
    document.querySelector(selector).focus();

    // This doesn't work due to SPA shennanigans
    // document.querySelector(selector).value = text;

    window.document.execCommand('insertText', false, text);
    document.querySelector(selector).dispatchEvent(new Event('input', { bubbles: true } ));
}
