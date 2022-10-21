// ==UserScript==
// @name        Trello - Card Numbers
// @namespace   https://github.com/stebaker92/
// @author      stebaker92
// @description Show trello card numbers
// @match       https://trello.com/b/**
// @version     1
// @icon        https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(`
.card-short-id { font-weight: bold ; display: inline; }
.card-short-id:after { content: " "; }
`);
