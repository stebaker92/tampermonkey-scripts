const fs = require('fs');

const files = fs.readdirSync("./");
const userscripts = files.filter(f => f.includes('user.js'));

let readmeMarkdown = fs.readFileSync('README.template.md').toString();

let projectsMarkdown = '';

const findField = (js, field) => js.find(line => line.includes(`@${field}`))?.replace(`// @${field}`, "").trim();

userscripts.forEach(path => {
    const js = fs.readFileSync(path).toString().split("\n")

    const name = findField(js, 'name')
    const description = findField(js, 'description')
    const url = path && `${path}?raw=1`
    const version = findField(js, 'version')
    const imageUrl = version && `https://img.shields.io/badge/v${version}-install-success`

    projectsMarkdown += `
## ${name}
[![Install](${imageUrl})](${url})
${description}
`;

})

const updatedReadme = readmeMarkdown.replace('{projects}', projectsMarkdown)

fs.writeFileSync('README.md', updatedReadme)
