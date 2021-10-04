// ==UserScript==
// @name         Twitch reward redeemer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto redeems channel rewards in Twitch
// @author       stebaker92
// @icon         https://www.google.com/s2/favicons?domain=twitch.tv
// @updateURL    https://github.com/stebaker92/tampermonkey-scripts/raw/master/twitch-redeem-auto-collector.user.js
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @grant        none
// @match        https://www.twitch.tv/*
// @match        https://clips.twitch.tv/*
// ==/UserScript==

(function() {
    'use strict';
  
    var targetNodeRoot = document.getElementById('root');

    var callbackRoot = function(mutationsList, observer) {
        // This can definitely be more efficient but it works! 
        $(".claimable-bonus__icon") && $(".claimable-bonus__icon").click();
    };
  
    var observerroot = new MutationObserver(callbackRoot);

    var config = { attributes: false, childList: true, subtree: true };

    // Start observing the target node for DOM mutations.
    observerroot.observe(targetNodeRoot, config);
})();
