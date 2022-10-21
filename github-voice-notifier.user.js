// ==UserScript==
// @name         GitHub - Voice notifier when PR is ready to merge
// @namespace    https://github.com/stebaker92/
// @version      0.2.1
// @description  Says a thing when you can merge
// @author       stebaker92
// @match        https://github.com/*/*/pull/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @updateURL    https://github.com/stebaker92/tampermonkey-scripts/raw/master/github-voice-notifier.user.js
// @grant        none
// ==/UserScript==

let timer;
let wasPrOutdatedOnLoad;

(function() {
    'use strict';

    waitForButtonLoaded().then(() => {
        console.log('merge button has loaded')

        wasPrOutdatedOnLoad = prIsOutdated();

        if (!checkCanMerge()) {
            timer = startTimer();
        }
    })
})();

async function waitForButtonLoaded() {
    // Button gets loaded async, wait for it to appear on the page
    while (!document.querySelector('.hx_create-pr-button')) {
        await new Promise(r => setTimeout(r, 500));
    }
}

function startTimer(){
    console.log('starting timer...')

    var spinner = `
<svg style="box-sizing: content-box;
    display: block;
    left: 2px;
    top: 8px;
    z-index: 100;
    color: var(--color-icon-primary);" viewBox="0 0 16 16" fill="none" data-view-component="true" width="16" height="16" class="hx_form-control-spinner anim-rotate">
  <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" vector-effect="non-scaling-stroke"></circle>
  <path d="M15 8a7.002 7.002 0 00-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"></path>
</svg>
`
    var node = document.createElement("div");
    node.classList="hx_form-control-spinner-wrapper"
    node.innerHTML = spinner;
    document.querySelector('.js-merge-box').appendChild(node);

    return setInterval(() => {
        if (prIsOutdated() && !wasPrOutdatedOnLoad) {
            clearInterval(timer)
            notify("Your P R is outdated");
        }

        if (checkCanMerge()) {
            clearInterval(timer)
            notify("Your P R is ready to merge");
        }
    }, 5000);
}

function checkCanMerge(){
    console.log('checking if we can merge...')

    const btn = document.querySelector('.hx_create-pr-button');

    if (btn && !btn.disabled) {
        console.log('btn is enabled...')
        return true;
    }
}

function prIsOutdated(){
    const updateBtn = document.querySelector(".js-update-branch-form");

    return updateBtn && !updateBtn.disabled;
}

function notify(text){
    console.warn(text)
    // https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 0.5;
    window.speechSynthesis.speak(msg);

    // This should bring attention to the tab, just incase you don't hear the voice (i.e. low volume, AFK)
    alert(text);
}
