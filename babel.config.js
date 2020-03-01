// module.exports = {
//     presets: [
//         "@vue/cli-plugin-babel/preset"
//     ],
//     plugins: [
//         "@babel/syntax-dynamic-import",
//         "transform-remove-console"
//     ]
// }

module.exports = (api) => {
    api.cache(() => process.env.NODE_ENV);

    return {
        presets: [
            "@vue/cli-plugin-babel/preset"
        ],
        plugins: [
            "@babel/syntax-dynamic-import",
            "transform-remove-console"
        ]
    };
};
