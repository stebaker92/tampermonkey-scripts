// ==UserScript==
// @name         Twitch - reward redeemer
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.2
// @description  Auto redeems channel rewards in Twitch
// @author       stebaker92
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @grant        none
// @match        https://www.twitch.tv/*
// @match        https://clips.twitch.tv/*
// ==/UserScript==

(function () {
    'use strict';

    setInterval(() => (console.log('Checking for claimable button'), document.querySelector(".claimable-bonus__icon")?.click()), 10_000);
})();
