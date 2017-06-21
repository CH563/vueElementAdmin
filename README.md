# 后台管理系统

> 后台管理系统模版

## Build Setup

``` bash
# 所在安装整个项目依赖
npm install

# 开启热更新调试，访问地址localhost:8080
npm run dev

# 打包压缩发布生产
npm run build

# 打包压缩发布生产，而且生成报告
npm run build --report
```

文件文录
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // 生成索引地图
|   |-- webpack.base.conf.js         // webpack基础配置(一些loader配置)
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.dll.conf.js          // 所有文件打包成dll
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   dist                             // 打包生产后存放目录
|   doc                              // 项目说明文档、接口文档
|   node_modules                     // 依赖文件存放目录
|-- src                              // 源码目录(页面主要文件存放)
|   |-- assets                         // 静态图片
|   |-- common                         // 静态js
|   |-- components                     // vue公共组件
|   |-- mock                           // mock数据
|   |-- router                         // 路由配置
|   |-- style                          // 静态公共样式文件
|   |-- views                          // 页面文件
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcssrc.js                    // postcss编译设置
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
|-- README.md                        // 项目说明
.