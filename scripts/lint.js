const fs = require('fs');

const files = fs.readdirSync("./");
const userscripts = files.filter(f => f.includes('user.js'));

const findField = (js, field) => js.find(line => line.includes(`@${field}`))?.replace(`// @${field}`, "").trim();

var regexNotEmpty = "^(?!\s*$).+"

var validations = {
    name: regexNotEmpty,
    description: regexNotEmpty,
    icon: regexNotEmpty,
    namespace: "https://github.com/stebaker92/",
    homepage: "https://github.com/stebaker92/tampermonkey-scripts",
    author: "stebaker92",
    version: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/,
}

userscripts.forEach(path => {
    const js = fs.readFileSync(path).toString().split("\n")

    console.info("Linting file", path)

    for (const [key, regex] of Object.entries(validations)) {
        const jsValue = findField(js, key);

        !new RegExp(regex).test(jsValue) && console.error(" - " + key + " failed validation with value " + jsValue)
    }
    
    console.log("")
})
