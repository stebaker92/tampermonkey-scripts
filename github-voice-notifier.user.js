// ==UserScript==
// @name         GitHub - Voice notifier when PR is ready to merge
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Says a thing when you can merge
// @author       stebaker92
// @match        https://github.com/*/*/pull/*
// @updateURL    https://github.com/stebaker92/tampermonkey-scripts/raw/master/github-voice-notifier.user.js
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// ==/UserScript==

let timer;

(function() {
    'use strict';

    const canMerge = checkCanMerge();

    if (!canMerge){
        timer = startTimer();
    }
})();

function startTimer(){
    console.log('starting timer...')

    return setInterval(() => {
        if (prIsOutdated()) {
            clearInterval(timer)
            notify("Your P R is outdated, you need to merge master in");
        }

        if (checkCanMerge()) {
            clearInterval(timer)
            notify("Your P R is ready to merge");
        }
    }, 5000);
}

function checkCanMerge() {
    console.log('checking if we can merge...')

    const btn = document.querySelector('.hx_create-pr-button');

    if (btn && !btn.disabled) {
        console.log('btn is enabled...')
        return true;
    }
}

function prIsOutdated() {
const updateBtn = document.querySelector(".js-update-branch-form");

    return updateBtn && !updateBtn.disabled;
}

function notify(text) {
    console.warn(text)
    // https://dev.to/asaoluelijah/text-to-speech-in-3-lines-of-javascript-b8h
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}
