module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "node":true, // 开启该项，不会检查 module
        "es6": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended", // 关闭该项，不会检查 module，但会导致其他问题
        "plugin:vue/recommended" // 启用 Vue.js 插件提供的规则
    ],
    "parserOptions": {
        "parser": "babel-eslint",
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "indent": "off", // 关闭缩进检测
        'no-unused-vars': 'warn',
        'no-undef': 'warn', // off、warn，关闭 no-undef 不会检查 module
        'no-labels': 'off',
        'camelcase': 'off',
        'quote-props': ['warn', 'consistent']
    }
};
