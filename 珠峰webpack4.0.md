# 珠峰webpack4.0

#### webpack可以做的事情，代码转换、文件优化、代码分割、模块合并、自动刷新、代码校验、自动发布

#### 本课程最终掌握内容

（1）webpack常见配置

（2）webpack高级配置

（3）webpack优化策略

（4）ast抽象语法树

（5）webpack中的Tepable

（6）掌握webpack流程，手写webpack

（7）手写webpack中常见的loader

（8）手写webpack中常见的plugin



## webpack安装

- 安装本地的webpack 保证版本一致

- webpack webpack-cli -D   (-D 表示开发依赖，上线的时候不需要)

```
yarn init -y
yarn add webpack webpack-cli -D
```

## webpack可以进行0配置

- 打包工具->输出后的结果（js模块）
- webpack会将所有模块的代码打包成一个文件

- 0配置很弱

## 手动配置webpack

- 创建webpack.config.js或者 webpackfile.js，这个是webpack认可的默认配置文件

```
如果想用别的文件名咋办？
第一种方法 ：打包的时候 执行"npx webpack --config 文件名"
第二种方法：在packConfig.js 中的script：{} 添加一条指令  如："build":"webpack --config 文件名", 打包时执行  npm run build
```



- webpack 是node写出来的 node的写法
- 想要资源在服务器上执行，可以安装一个插件

```
yarn add webpack-dev-server -D
执行：npx webapck-dev-server  这里加到packConfig.js的指令中
"dev":"webapck-dev-server"  执行 npm run dev
```



- 打包指令 npx webpack

```js
//webpack.config.js
const path = require("path") //path模块
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin")//抽离css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")//压缩css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//压缩js
const 
module.export = {//配置区域
    optimizetion:{//优化项
        minimizer:[//压缩配置
            new UglifyJsPlugin({
                cache:true,
                parallel:true
            }),
            new OptimizeCssAssetsWebpackPlugin()
            
        ]
    },
    devServer:{//开发服务器的配置
        port:3000,//更改端口号
        progress:true,//显示滚动条
        contentBase:"./build", //运行地址:回去找build文件夹下的index.html文件
        compress:true
    },
    mode:"development",//模式 默认两种=》production(生产模式) development(开发模式)
	entry:"./src/index.js",//入口
    output:{ //出口配置项
        filename:"bundle.js", //打包后的文件名   如果这里是  bundle.[hash:8].js  则每次打包都会生成新的带有8位hash值的文件，不会覆盖之前的
        /*
      	（将打包后的文件放在哪个路径下）路径必须是一个绝对路径
        path.resolve=>解析出绝对路径
        __dirname=>当前目录
        "build"=>创建文件夹名称,打包后文件会放在这里面
        */
        path:path.resolve(__dirname,"build"),
        
    },
    plugins:[//数组 放着所有webpack插件
        new HtmlWebpackPlugin({ //压缩html模板
            template:"./src/index.html",
            filename:"index.html",
            minify:{//压缩文件
                removeAttrbuteQuotes:true,//删除模板中的双引号
                collapseWhitespace:true,//折叠空行，压缩成一行
            },
            hash:true,//哈希戳
        }),
        new MiniCssExtractPlugin({//抽离css文件
            filename:"main.css"
        })
    ],
    module:{//模块 将css样式文件，以<style></style>的方式嵌入到模板中
        rules:[//规则  css-loader 接续@import这种语法的
            //style-loader  他是把css插入到head的标签中
            //loader的特点，希望单一，所以要很多个loader
            //loader的顺序 默认是从右向左执行，从下到上执行
            //use：可以是 “”传一个loader   可以使["",""]传多个，也可以是[{loader:"css-loader"},{}]给每个loader加配置项
            /*
            //模块 将css样式文件，以<style></style>的方式嵌入到模板中
            {text:/\.css$/,use:["style-loader","css-loader"]},
            {text:/\.less$/,use:["style-loader","css-loader","less-loader"]}
            */
            //处理js文件
            {text:/\.js$/,use:[{
                loader:"babel-loader",
                options:{//用babel-loader 需要把es6=》es5
                    presets:[
                        "@babel/preset-env"
                    ]
                }
            }]},
            //模块 将css样式文件，抽离出来
            {text:/\.css$/,use:[MiniCssExtractPlugin.loader,"postcss-loader","css-loader"]},
            {text:/\.less$/,use:[MiniCssExtractPlugin.loader,"postcss-loader","css-loader","less-loader"]}
            
        ]
        
    }

}
```

```
//postcss.config.js
module.exports = {
plugins:[require("autoprefixer")]
}
```

