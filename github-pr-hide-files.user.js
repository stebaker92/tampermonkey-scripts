// ==UserScript==
// @name         GitHub - Hide test files in PRs
// @namespace    https://github.com/stebaker92/
// @version      0.1.4
// @description  Auto collapse all test related files in PRs
// @author       stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @match        https://github.com/*/*/pull/*
// @icon         https://github.githubassets.com/pinned-octocat.svg
// @grant        none
// ==/UserScript==

const testPatterns = [
    // JS
    '_test',
    'spec.js',
    'test/',
    'test-utils/',
    'fixture',
];

(function () {
    'use strict';

    // Init
    addButton();

    // Pjax
    document.addEventListener('pjax:end', addButton)
})();

function toggleTestFiles() {
    const files = document.querySelectorAll('.file');
    console.log('got files', files)

    files.forEach(file => {
        const path = file.querySelector('.file-header')?.attributes['data-path']?.textContent;

        if (!path) return;

        console.log('checking file', path)

        let isTestFile = false
        testPatterns.forEach(pattern => {
            if (path.includes(pattern)) {
                isTestFile = true
            }
        })

        console.log(`file is ${isTestFile}`)

        if (isTestFile) {
            const button = file.querySelector('.file-info button')

            if (button.attributes['aria-expanded'].textContent === 'true') {
                button.click();
            }
        }
    });
}

function addButton() {
    var e = document.querySelector('#files_bucket .pr-toolbar .diffbar > .pr-review-tools')
    if (!e) return;
    var r = e.querySelector('.GithubTestHiderButton')
    if (r) {
        r.parentElement.removeChild(r)
    }

    var on = false;

    var a = document.createElement('button')
    a.classList.add('btn', 'btn-sm', 'btn-outline', 'tooltipped', 'tooltipped-s')
    a.onclick = () => toggleTestFiles(on)
    a.setAttribute('rel', 'nofollow')
    a.setAttribute('aria-label', on ? 'Show test files' : 'Hide test files')
    a.appendChild(document.createTextNode('🧪'))

    var g = document.createElement('div')
    g.classList.add('GithubTestHiderButton', 'diffbar-item')
    g.appendChild(a)

    e.insertBefore(g, e.firstChild)
}
