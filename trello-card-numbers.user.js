// ==UserScript==
// @name        Trello - Show Card Numbers
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @author      stebaker92
// @description Show unique identifiers on Trello cards
// @match       https://trello.com/b/**
// @version     1
// @icon        https://www.google.com/s2/favicons?sz=64&domain=trello.com
// @grant       GM_addStyle
// ==/UserScript==

GM_addStyle(`
.card-short-id { font-weight: bold ; display: inline; }
.card-short-id:after { content: " "; }
`);
