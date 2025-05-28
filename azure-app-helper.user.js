// ==UserScript==
// @name         Azure - Web App Helper
// @namespace    https://github.com/stebaker92
// @homepage     https://github.com/stebaker92/tampermonkey-scripts/
// @version      0.5
// @description  try to take over the world!
// @author       You
// @match        https://portal.azure.com/*
// @match        https://*.azurewebsites.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=azure.com
// @grant        GM_registerMenuCommand
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand("🌐 Open Web App", () => open("health", ""))
    GM_registerMenuCommand("🔧 App Service Editor", () => open("dev", ".scm"))
    GM_registerMenuCommand("📝 View appsettings.json", () => open("api/vfs/site/wwwroot/appsettings.json", ".scm"))
    GM_registerMenuCommand("📝 View appsettings.development.json", () => open("api/vfs/site/wwwroot/appsettings.Development.json", ".scm"))
    GM_registerMenuCommand("🔍 Search in Azure Portal", () => open("https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/filter/", "", false))
    // Alternatively, we could use https://portal.azure.com/#view/HubsExtension/BrowseAll/filter/ for other apps
    GM_registerMenuCommand("📝 Event Log", () => open("api/vfs/LogFiles/eventlog.xml", ".scm"))
})();

function open(route, subdomain = ".scm", relative=true){
    var appName, url;

    console.log("parsing");

    if(location.hash.split("/").pop() === "appServices") {
        // we're on the azure portal!
        //appName = location.hash.split("/").splice(-2, 1)[0];
        appName = location.hash.split("/")[location.hash.split("/").indexOf("sites")+1]
    } else if (location.href.includes(".scm.")) {
        appName = location.host.split(".")[0];
    }else if (location.href.includes("azurewebsites.net")) {
        appName = location.host.split(".")[0];
    }
    else{
        return
    }

    if(relative) url = `https://${appName}${subdomain}.azurewebsites.net/`;
    else {
        url = "";
        // hacks
        route += appName
    }

    window.location.href = url + route
}
