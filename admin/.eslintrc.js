module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "@vue/prettier"],
    rules: {
        "no-unused-vars": 0, // 直接禁用变量声明但未使用的提示
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    },
    parserOptions: {
        parser: "babel-eslint"
    }
};