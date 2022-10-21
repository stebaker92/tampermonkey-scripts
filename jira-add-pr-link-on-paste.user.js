// ==UserScript==
// @name         JIRA - Add PR Link on Paste
// @namespace    https://github.com/stebaker92/
// @version      0.2.2
// @description  Attach a Link when pasting a PR URL
// @author       stebaker92
// @match        https://*.atlassian.net/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('paste', (e) => {
        console.log(e.target?.isContentEditable, "isEditable");

        const text = (e.originalEvent || e).clipboardData.getData('text/plain');

        const isPR = text.includes("dev.azure.com") || (text.includes("visualstudio.com/") && text.includes("pullrequest"));
        if (!isPR) { console.log("is not PR link.. exiting"); return; }

        if (e.target.className.includes("ProseMirror-")) { console.log("ticket is being edited.. exiting"); return; }

        e.preventDefault();

        const repoName = decodeURI(text.split("/")[5]); // TODO - this only handles Azure links currently

        document.querySelector(`[data-testid="issue.views.issue-base.foundation.quick-add.link-button.ui.link-dropdown-button"]`).click()
        document.querySelector(`[data-test-id="issue.issue-view.views.issue-base.foundation.quick-add.quick-add-item.link-web"]`).click()

        sendKeys(`[data-testid="issue.views.issue-base.content.web-links.create-link.inline-fields.url"]`, text);
        sendKeys(`[data-testid="issue.views.issue-base.content.web-links.create-link.inline-fields.text"]`, "PR" + (repoName ? ` - ${repoName}` : ''));

        // document.querySelector(`[data-testid="issue.views.issue-base.content.web-links.create-link.submit-button"]`).click()
    });
})();

async function sendKeys(selector, text) {
    document.querySelector(selector).focus();

    // This doesn't work due to SPA shennanigans
    // document.querySelector(selector).value = text;

    window.document.execCommand('insertText', false, text);
    document.querySelector(selector).dispatchEvent(new Event('input', { bubbles: true }));
}
