module.exports = {

    configureWebpack:{
        resolve:{
            alias:{
                "components": "@/components",
                "views": "@/views",
                "common": "@/common",
                "api": "@/api"
            }
        }
    },

    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }

}