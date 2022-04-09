// ==UserScript==
// @name         GitHub - Add link to gitpod
// @namespace    https://github.com/stebaker92/
// @version      0.1
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @description  Adds a link to GitPod on all repos
// @author       stebaker92
// @match        https://github.com/*/*
// @icon         https://github.com/favicon.ico
// @require      https://cdn.jsdelivr.net/gh/CoeJoder/waitForKeyElements.js@v1.2/waitForKeyElements.js
// ==/UserScript==

(async function() {
    waitForKeyElements(`.file-navigation`, (el) => {
        insertButton(el);
    }, true, 300);
})();

function insertButton(el){
    console.log("found element", el)
    const href = "https://gitpod.io/#" + location.href;

    const a = document.createElement('a');
    a.innerHTML = 'Open in GitPod';
    a.href = href;
    var classes = "btn ml-2 d-none d-md-block".split(" ");
    a.classList.add(...classes);

    el.appendChild(a);
}
