// ==UserScript==
// @name         GitHub - Adds banner for github pages apps
// @namespace    https://github.com/stebaker92/
// @version      0.1.1
// @description  Add repo links for github pages apps
// @author       stebaker92
// @match        https://*.github.io/*
// @match        https://*.gitlab.io/*
// @match        https://*.netlify.app/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // This needs improvement but works for most github/gitlab hosted web apps
    const repo = location.pathname.split("/")[1];
    const [subdomain, service] = location.host.split(".")
    const serviceFriendly = service;

    // Ribbon SVG & css source:
    // https://codepo8.github.io/css-fork-on-github-ribbon/
    GM_addStyle(`
    #forkongithub a{background:#000;color:#fff;text-decoration:none;font-family:arial,sans-serif;text-align:center;font-weight:bold;padding:5px 40px;font-size:1rem;line-height:2rem;position:relative;transition:0.5s;}#forkongithub a:hover{background:#c11;color:#fff;}#forkongithub a::before,#forkongithub a::after{content:"";width:100%;display:block;position:absolute;top:1px;left:0;height:1px;background:#fff;}#forkongithub a::after{bottom:1px;top:auto;}@media screen and (min-width:800px){#forkongithub{position:absolute;display:block;top:0;right:0;width:200px;overflow:hidden;height:200px;z-index:9999;}#forkongithub a{width:200px;position:absolute;top:60px;right:-60px;transform:rotate(45deg);-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);box-shadow:4px 4px 10px rgba(0,0,0,0.8);}}
    `);
    GM_addStyle(`#forkongithub a { box-sizing: unset; }`)

    // try to build a path like so:
    // https://my-git-user.gitlab.io/my-app/
    let link = `https://${service}.com/${subdomain}/${repo}`;
    if (location.host.includes("netlify.app")) link = `https://app.netlify.com/sites/${subdomain}/overview`

    const toInject = `<span id="forkongithub"><a href="${link}">View on ${service}</a></span>`
    var el = document.createElement("div");
    el.innerHTML = toInject;
    document.body.appendChild(el);
})();
