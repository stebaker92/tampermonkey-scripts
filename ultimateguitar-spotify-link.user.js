// ==UserScript==
// @name         Ultimate Guitar - Link To Spotify
// @namespace    https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.1.2
// @description  Adds a link to Spotify
// @author       stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/blob/master/ultimateguitar-spotify-link.user.js
// @match        https://tabs.ultimate-guitar.com/tab/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=https://ultimate-guitar.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const title = document.querySelector(`header h1`).parentNode.textContent.replace(" tab", "").trim().split(" by ").map(x => x.trim())

    const query = title.join(" - ")

    // See https://community.spotify.com/t5/Desktop-Windows/URI-Codes/td-p/4479486
    const uri = `spotify://search:${query}`
    const uriWeb = `https://open.spotify.com/search/${query}`

    const icon = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>`

    const styles = `
position: fixed;
display: flex;
align-items: center;
flex-direction:column;
grid-gap: 10px;
bottom: 1rem;
right: 2rem;
z-index: 1000;
fill: lightgreen;
background: #2d2d2d;
border: 1px solid #606060;
color: white;
padding: 5px;
line-height: 14px;
`
    const iconWrapper = `<a href="${uri}" style="${styles}">Search on Spotify ${icon}</div>`;
    insertHtml(iconWrapper, "main")
})();

function insertHtml(html, selector) {
    var el = document.createElement("div");
    el.innerHTML = html;

    const parent = document.querySelector(selector);
    parent.appendChild(el);
}
