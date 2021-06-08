module.exports = {
    chainWebpack: config => {
        // Add limit for small images so they're embed with the lib
        config.module
            .rule("images")
            .use("url-loader")
            .loader("url-loader")
            .tap(options => Object.assign(options, { limit: 5000 }))
    }
}
