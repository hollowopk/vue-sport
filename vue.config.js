const path = require("path")
module.exports = {
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:8080/",
                pathRewrite:{ // 重写路径
                    "^/api":""
                },
                changeOrigin:true // 允许跨域
            },
            "/http":{
              target:"https://api-hmugo-web.itheima.net/api/public/v1/",
              pathRewrite:{ // 重写路径
                  "^/http":""
              },
              changeOrigin:true // 允许跨域
          },
        }
    },
    pluginOptions: {
        "style-resources-loader": {
          preProcessor: "less",
          patterns: [
            // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
            path.resolve(__dirname, "./src/theme/style.less"),
          ],
        },
      },

}