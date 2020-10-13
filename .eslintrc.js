module.exports = {
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "es6": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "allowImportExportEverywhere": true
    },
    "rules": {
        "linebreak-style": ["error", "windows"],
        "no-console": "off",
        "indent": ["error", "tab"],
        "comma-dangle": ["error", "never"],
        "no-tabs": 0,
        "max-len": ["error", { "ignoreComments": true, "tabWidth": 0, "code": 200 }],
        "no-shadow": ["error", { "allow": ["sxQuery"] }],
        "strict": 0,
        "func-names": ["error", "never"],
        "no-param-reassign": 0,
        "no-use-before-define": 0, //TODO: disable this after linting and see the result
        "no-plusplus": 0,
        "prefer-destructuring": ["error", {
            "array": false
        }],
        "eol-last": ["error", "never"],
        "no-underscore-dangle": 0,
        "no-new": 0
    }
}