module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
		"es6": true,
		"jasmine": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
		],
		"no-console": 0,
		"no-unused-vars": 1
    }
};