module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 取消校验单引号
    quotes: 'off',
    // 取消校验分号
    semi: 'off',
    'vue/max-attributes-per-line': 'off', // 取消校验单行属性的最大数量
    'vue/singleline-html-element-content-newline': 'off', // 取消校验单行 HTML 元素内容的换行。
    'vue/multiline-html-element-content-newline': 'off', // 取消校验多行 HTML 元素内容的换行。
    'vue/html-closing-bracket-newline': 'off', // 取消校验 HTML 关闭标签的换行。
    'vue/html-closing-bracket-spacing': 'off', // 取消校验 HTML 关闭标签的间距。
    'vue/html-indent': 'off', // 取消校验 HTML 缩进。
    'vue/html-self-closing': 'off', // 取消校验单行属性的最大数量。
    'space-before-function-paren': 'off' // 取消函数名前后空格校验
  }
}
