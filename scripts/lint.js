const fs = require('fs');

const files = fs.readdirSync("./");
const userscripts = files.filter(f => f.includes('user.js'));

const findField = (js, field) => js.find(line => line.includes(`@${field}`))?.replace(`// @${field}`, "").trim();

var regexNotEmpty = "^(?!\s*$).+"

var validations = {
    name: regexNotEmpty,
    description: regexNotEmpty,
    icon: regexNotEmpty,
    namespace: "https://github.com/stebaker92",
    homepage: "https://github.com/stebaker92/tampermonkey-scripts",
    author: "stebaker92",
    version: /^(\d+)(?:\.(\d+)(?:\.(\d+))?)?$/,
}

userscripts.forEach(path => {
    const js = fs.readFileSync(path).toString().split("\n")

    var errors = [];

    for (const [key, regex] of Object.entries(validations)) {
        const jsValue = findField(js, key);

        if (!new RegExp(regex).test(jsValue)) {
            errors.push(` - ${key} failed validation with value '${jsValue}'`)
        }
    }

    if (errors.length) {
        console.info("Warnings in file", path)
        errors.forEach(e => console.log(e))
        console.log("")
    }

})
