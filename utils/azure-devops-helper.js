console.info("Loaded azure-devops-helper");

function getDataProviders() {
    return dataProviders?.data; // Can also use JSON.parse(document.getElementById('dataProviders')?.innerHTML)?.data;
}

function getBaseApiUrl() {
    return `${window.location.origin}${dataProviders?.data['ms.vss-tfs-web.header-action-data'].suiteHomeUrl}`;
}

function getOrg() {
    return dataProviders?.data["ms.vss-web.page-data"].hostName;
}

function getProject() {
    return dataProviders?.data['ms.vss-tfs-web.page-data'].project.name;
}

function getRepo() {
    return dataProviders?.data["ms.vss-code-web.versioncontrol-viewmodel-data-provider"].gitRepository.name;
}

function getBranchesUrl() {
    return dataProviders?.data['ms.vss-code-web.branches-hub'];
}

function getBranchesUrl() {
    return dataProviders?.data["ms.vss-code-web.versioncontrol-viewmodel-data-provider"]?.gitRepository.url + "/stats/branches"
}

async function fetchBranches(repoId) {
    var response = await fetch(getBranchesUrl());
    return await response.json();
}

azure = {
    getBaseApiUrl,
    getProject,
    getRepo,
    fetchBranches,
};

