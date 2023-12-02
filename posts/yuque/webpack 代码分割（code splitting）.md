---
title: webpack 代码分割（code splitting）
urlname: chdntb
date: '2020-04-11 15:57:02'
updated: '2021-01-29 12:08:32'
description: webpack官网-代码分离webpack中的代码分割代码分割是webpack的一个重要功能，此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分割方法Entry Points：入口起点prevent duplication：提取公共代码，webpack4...
tags:
  - 语雀
---
> [webpack官网-代码分离](https://webpack.docschina.org/guides/code-splitting/)

> [webpack中的代码分割](https://www.jianshu.com/p/c42a817dc8cf)



代码分割是webpack的一个重要功能，此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。

代码分割方法

- Entry Points：入口起点
- prevent duplication：提取公共代码，webpack4用optimization属性进行配置
- Dynamic Imports： 动态导入

## 示例代码

Common.js

```javascript
export default function Book (name) {
  this.name = name
}
```

home.js

```javascript
// 引入common和第三方库lodash
import Book from './common'
import _ from 'lodash'

const Home = new Book('Home')
console.log(Home)
console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

about.js

```javascript
// 引入common和第三方库lodash
import Book from './common'
import _ from 'lodash'

const About = new Book('About')
console.log(About)
console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

## Entry Points（入口起点）

以下示例通过入口起点配置，将 home 和 about 文件分别打包到不同的bundle文件

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    home: './src/home.js',
    about: './src/about.js'
  },
  output: {
    filename: '[name].[chunkhash:6].js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

构建结果

```javascript
          Asset     Size  Chunks                         Chunk Names
about.99476c.js  553 KiB   about  [emitted] [immutable]  about
 home.dca668.js  553 KiB    home  [emitted] [immutable]  home
```

⚠️这种方式存在一些隐患：

- 入口文件如果`引用了公共模块`，那么这些模块都将`重复的被打包`到各个bundle文件里
- 不灵活，不能动态地将核心逻辑从代码分割出来

## Prevent Duplication（防止重复）

通过提取公共代码，可以很好的解决上述问题。

使用webpack4内置的[splitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/)插件和对[optimization.splitChunks](https://webpack.docschina.org/plugins/split-chunks-plugin/#optimization-splitchunks)进行配置

```javascript
module.exports = {
  ...
  optimization: {
    splitChunks: {
      chunks: 'initial',
      minChunks: 1,
      name: true,
      cacheGroups: {
        common: {
          // 抽离公共代码
          chunks: 'all',
          name: 'common', // 打包后的文件名
          minChunks: 2, // 最小引用2次
          minSize: 0 // 超出0字节就生成一个新包
        },
        // 公用库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
  ...
}
```

构建结果

```javascript
           Asset      Size  Chunks                         Chunk Names
 about.af5faf.js  7.17 KiB   about  [emitted] [immutable]  about
common.bbbff9.js   548 KiB  common  [emitted] [immutable]  common
  home.44f1e7.js  7.16 KiB    home  [emitted] [immutable]  home
```

可以看到home 和about的体积都大幅减少

因为公用的 common代码以及第三方库lodash从主bundle中移除至一个单独的chunk中。

### 代码分割常见 plugin 和 loader

- [`mini-css-extract-plugin`](https://webpack.docschina.org/plugins/mini-css-extract-plugin)：用于将 CSS 从主应用程序中分离。
- [`bundle-loader`](https://webpack.docschina.org/loaders/bundle-loader)：用于分离代码和延迟加载生成的 bundle。
- [`promise-loader`](https://github.com/gaearon/promise-loader)：类似于 `bundle-loader` ，但是使用了 promise AP

### Dynamic Imports（动态引入）

Webpack 的动态分割主要方式是使用符合 ECMAScript 提案的 import() 语法。

```javascript
import('path/to/module') -> Promise
```

动态地加载模块。调用 `import()` 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。

如在vue-router的路由配置上，我们只需这么写，即可实现动态引入。

```javascript
const router = new VueRouter({
  routes: [
    { path: '/about', component: () => import('@/views/about'), },
    { path: '/home', component: () => import('@/views/home'), }
  ]
})
```
