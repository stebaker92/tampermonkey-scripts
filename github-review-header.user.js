// ==UserScript==
// @name         GitHub - Review Requests header link
// @namespace    https://github.com/stebaker92/
// @version      0.1.1
// @description  Adds 'Review Requests' link to GitHubs navbar
// @author       stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @match        https://github.com/*
// @icon         https://github.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const href = '/pulls/review-requested';

    const nav = document.getElementsByTagName('nav')[0];

    const a = document.createElement('a');
    a.innerHTML = 'Review Requests';
    a.href = href;
    var classes = "js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade-15".split(" ");
    a.classList.add(...classes);

    nav.prepend(a);
})();
