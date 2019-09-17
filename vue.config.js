module.exports = {

    configureWebpack:{
        resolve:{
            alias:{
                "components": "@/components",
                "views": "@/views",
                "common": "@/common",
                "api": "@/api",
                "assets": "@/assets"
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
            },
            "/audiourl": {
                target: "http://m7.music.126.net/",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    "^/audiourl": ""
                }
            }
        }
    }

}