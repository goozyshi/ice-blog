---
title: webpack概念及构建流程
urlname: nilwzu
date: '2020-03-28 18:27:59'
updated: '2021-01-29 12:08:32'
description: 'webpack 配置：https://webpack.docschina.org/configuration/webpack编译流程漫谈webpack是一个模块打包工具，可以管理项目依赖并编译输出所需的静态文件。对webpack而言，所有文件都是模块，只是处理方式依赖不同的模块加载器。webp...'
tags:
  - 语雀
---
> webpack 配置：[https://webpack.docschina.org/configuration/](https://webpack.docschina.org/configuration/)
> [webpack编译流程漫谈](https://github.com/slashhuang/blog/issues/1#)


webpack是一个`模块打包`工具，可以`管理项目依赖并编译输出`所需的静态文件。

对webpack而言，`所有文件都是模块`，只是处理方式`依赖不同的模块加载器`。

webpack支持代码分割，模块化，全局分析(`区别于Gulp、Grunt`)。

## 基本功能和工作原理

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等
- `代码分割`：提取多个页面`公共代码`、首屏加载`未执行的代码`进行`异步加载`
- `热更新`：`监听`本地源代码的变化，`自动构建并刷新`浏览器

## 核心概念

默认配置文件是一般在项目的根目录的`webpack.config.js`。

### entry[入口]

`定义整个编译过程的起点`，抽象理解成入口。

每个HTML文档只使用一个入口起点。

**单页应用(单个入口)**

```javascript
module.exports = {
  entry: './src/index.js'
}
```

**多页面应用程序（多个入口）**

```javascript
module.exports = {
  entry: {
    home: './src/home/home.js',
    about: './src/about/about.js'
  }
}
```

### output[输出]

`定义整个编译过程的终点`，控制 webpack 如何向硬盘写入编译文件。

注意，即使可以存在`多个 entry` 起点，但`只指定一个 output` 配置。

- path： 输出文件夹的位置
- filename: 用于输出文件的文件名

**单个入口**

```javascript
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js' // 默认路径为/dist/bundle.js
  }
}
```

**多个入口**

当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建`多个 bundle`，

一般使用以下`占位符`来赋予每个 bundle 一个唯一的名称。

- 入口名称： `[name].bundle.js`
- 内部chunk.id：`[id].bundle.js`
- 构建过程生成的hash：`[name].[hash].bundle.js`，同次构建的hash相同
   - chunk内容的hash： `[chunkhash].bundle.js`，chunk内容不同生产的hash不同。可以实现`长效缓存`.

```javascript
module.exports = {
  entry: {
    home: './src/home/home.js',
    about: './src/about/about.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash:6].bundle.js'
  }
}
// [chunkhash:6]：保留6位hash值
// 文件1: /dist/home.ca401d.bundle.js
// 文件2: /dist/about.2ca563.bundle.js
```

### mode[模式]

`mode` 配置选项，告知 webpack 使用相应环境的内置优化。

mode: `production`| `development`|none

| 模式 | 描述 |
| --- | --- |
| production（`默认`） | 设置`process.env.NODE_ENV` 的值设置为 `production`，启用`uglifysPlugin` |
| development | 设置`process.env.NODE_ENV` 的值设置为 `development` |
| None | 退出任何默认优化选项 |


⚠️`production模式`下启用的uglifysPlugin，可以实现**JS文件**的Tree-shaking（`去除打包过程中未执行的代码，减少打包体积`）

⚠️CSS的Tree-shaking需要[【purify-css】](https://github.com/purifycss/purifycss)

**根据mode变量改变打包行为**（`需导出函数`）

```javascript
const baseConfig = {
  mode: 'development',
  entry: {
    home: './src/home/index.js',
    about: './src/about/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].index.js'
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    baseConfig.devtool = 'source-map'
  }
  if (argv.mode === 'production') {
    //...
  }
  return baseConfig
}
```

### loader[模块转换器]

webpack 只能理解 JavaScript 和 JSON 文件，loader** 让 webpack 能够去处理其他类型的文件。

webpack 的配置中 **loader** 有两个属性：

- `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- `use` 属性，表示进行转换时，应该使用哪个 loader，`顺序从右往左`。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      }
    ]
  }
}
// exclude: 除去node_modules文件夹，加快编译
// 编译css后缀的文件，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束
```

**常用loader**

- `babel-loader`: 将ES6+转移成ES5-
- `css-loader,style-loader, sass-loader`：解析css文件，能够解释[@import ]() url()等
- `file-loader`：直接输出文件，把构建后的文件路径返回，可以处理很多类型的文件
- `url-loader`：打包图片

⚠️打包图片时最好选用`url-loader`进行转换，可以指定一个limit属性，图片小于limit的返回Base64文件，大于limit直接调用调用file-loader。

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          outputPath: 'images/',
          limit: 500 //小于500B的文件打包出Base64格式，写入JS
        }
      }]
    }]
  }
}
```

### plugins[插件]

`对编译完成后的内容进行二度加工`，可以打包优化，资源管理和注入环境变量等

> **plugins插件**是一个具有 [`apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法的 JavaScript 对象。
> 而`apply` 方法会被 webpack compiler 调用，并且**compiler 对象可在整个编译生命周期访问**。


```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const path = require('path');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      // 压缩 => production 模式使用
      minify: {
        removeAttributeQuotes: true, //删除双引号
        collapseWhitespace: true //折叠 html 为一行
      }
    })
  ]
}
// 打包压缩public/index.html
```

## 构建流程

### webpack的核心`module`

> 无论你是jsx,tsx,html,css,scss,less,png文件，webpack一视同仁为module。
> 并且每个文件[module]都会经过相同的编译工序 loader==> plugin。


**打包原理**：将所有module打包成一个bundle文件，通过`代码分割`成单元片段`按需加载`。

- `module`：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- `chunk`：webpack在进行模块的依赖分析的时候，代码分割出来的代码块
- `bundle`： webpack打包出来的文件

**开发【module】 =>编译分析【chunk】 =>输出【bundle】**

```javascript
module.exports =  {
  watch: true,
  entry: './index.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(),'dist/'),
    filename: '[name].js'
  },
  resolve: {
    alias:{ jquery: 'src/lib/jquery.js', }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore',
      React: 'react'
    }),
    new WebpackNotifierPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
    	}
    ]
  }
};
```

### 1.确定webpack编译上下文context

> webpack在确定webpack.config中entry的路径依赖时，会根据这个context确定每个要编译的文件(assets)的绝对路径


### 2. entry和output 确定webpack的编译起点和终点

> 顾名思义，entry定义webpack编译起点，入口模块。 对应的结果为`compolation.assets`
> output定义webpack编译的终点，导出目录


### 3. loader确定模块预编译处理方式

> 以babel为例，当webpack发现模块名称匹配test中的正则/js[x]?的时候。
> 它会将当前模块作为参数传入babel函数处理，`babel([当前模块资源的引用])`。
> 函数执行的结果将会**缓存**在webpack的compilation对象上，并分配**唯一**的`id` 。
> 以上的这一步，非常非常关键。唯一的id值决定了webpack在最后的编译结果中，是否会存在重复代码。
> 而缓存在compilation对象上，则决定了webpack可以在`plugin`阶段直接拿取模块资源进行二度加工。


### 4. plugin阶段贯穿于webpack的整个编译流程，一般用来做一些优化操作

> 比如`webpack.ProvidePlugin`，它会在对编译结果再加工的操作过程中进行自定义的变量注入，当模块中碰到比如`_`这个变量的时候，webpack将从缓存的module中取出underscore模块加载进引用`_`的文件(compilation.assets)。
> 比如`WebpackNotifierPlugin`，它会在编译结果ready的时通知开发者，output已经就绪。


### 5. resolve.alias的作用就是对module模块提供别名

## [附录1·代码分割](https://www.yuque.com/goozyshi/blink/chdntb)
