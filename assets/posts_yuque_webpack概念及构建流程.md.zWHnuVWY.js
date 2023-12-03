import{_ as s,o as i,c as a,R as n}from"./chunks/framework.sFPk6Hfx.js";const g=JSON.parse('{"title":"webpack概念及构建流程","description":"webpack 配置：https://webpack.docschina.org/configuration/webpack编译流程漫谈webpack是一个模块打包工具，可以管理项目依赖并编译输出所需的静态文件。对webpack而言，所有文件都是模块，只是处理方式依赖不同的模块加载器。webp...","frontmatter":{"title":"webpack概念及构建流程","urlname":"nilwzu","date":"2020-03-28 18:27:59","updated":"2021-01-29 12:08:32","description":"webpack 配置：https://webpack.docschina.org/configuration/webpack编译流程漫谈webpack是一个模块打包工具，可以管理项目依赖并编译输出所需的静态文件。对webpack而言，所有文件都是模块，只是处理方式依赖不同的模块加载器。webp...","tags":["语雀"]},"headers":[],"relativePath":"posts/yuque/webpack概念及构建流程.md","filePath":"posts/yuque/webpack概念及构建流程.md"}'),l={name:"posts/yuque/webpack概念及构建流程.md"},e=n(`<blockquote><p>webpack 配置：<a href="https://webpack.docschina.org/configuration/" target="_blank" rel="noreferrer">https://webpack.docschina.org/configuration/</a><a href="https://github.com/slashhuang/blog/issues/1#" target="_blank" rel="noreferrer">webpack编译流程漫谈</a></p></blockquote><p>webpack是一个<code>模块打包</code>工具，可以<code>管理项目依赖并编译输出</code>所需的静态文件。</p><p>对webpack而言，<code>所有文件都是模块</code>，只是处理方式<code>依赖不同的模块加载器</code>。</p><p>webpack支持代码分割，模块化，全局分析(<code>区别于Gulp、Grunt</code>)。</p><h2 id="基本功能和工作原理" tabindex="-1">基本功能和工作原理 <a class="header-anchor" href="#基本功能和工作原理" aria-label="Permalink to &quot;基本功能和工作原理&quot;">​</a></h2><ul><li>代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等</li><li>文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等</li><li><code>代码分割</code>：提取多个页面<code>公共代码</code>、首屏加载<code>未执行的代码</code>进行<code>异步加载</code></li><li><code>热更新</code>：<code>监听</code>本地源代码的变化，<code>自动构建并刷新</code>浏览器</li></ul><h2 id="核心概念" tabindex="-1">核心概念 <a class="header-anchor" href="#核心概念" aria-label="Permalink to &quot;核心概念&quot;">​</a></h2><p>默认配置文件是一般在项目的根目录的<code>webpack.config.js</code>。</p><h3 id="entry-入口" tabindex="-1">entry[入口] <a class="header-anchor" href="#entry-入口" aria-label="Permalink to &quot;entry[入口]&quot;">​</a></h3><p><code>定义整个编译过程的起点</code>，抽象理解成入口。</p><p>每个HTML文档只使用一个入口起点。</p><p><strong>单页应用(单个入口)</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/index.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>多页面应用程序（多个入口）</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    home: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/home/home.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    about: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/about/about.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="output-输出" tabindex="-1">output[输出] <a class="header-anchor" href="#output-输出" aria-label="Permalink to &quot;output[输出]&quot;">​</a></h3><p><code>定义整个编译过程的终点</code>，控制 webpack 如何向硬盘写入编译文件。</p><p>注意，即使可以存在<code>多个 entry</code> 起点，但<code>只指定一个 output</code> 配置。</p><ul><li>path： 输出文件夹的位置</li><li>filename: 用于输出文件的文件名</li></ul><p><strong>单个入口</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;bundle.js&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 默认路径为/dist/bundle.js</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p><strong>多个入口</strong></p><p>当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建<code>多个 bundle</code>，</p><p>一般使用以下<code>占位符</code>来赋予每个 bundle 一个唯一的名称。</p><ul><li>入口名称： <code>[name].bundle.js</code></li><li>内部chunk.id：<code>[id].bundle.js</code></li><li>构建过程生成的hash：<code>[name].[hash].bundle.js</code>，同次构建的hash相同 <ul><li>chunk内容的hash： <code>[chunkhash].bundle.js</code>，chunk内容不同生产的hash不同。可以实现<code>长效缓存</code>.</li></ul></li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    home: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/home/home.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    about: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/about/about.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: __dirname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/dist&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name].[chunkhash:6].bundle.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [chunkhash:6]：保留6位hash值</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件1: /dist/home.ca401d.bundle.js</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件2: /dist/about.2ca563.bundle.js</span></span></code></pre></div><h3 id="mode-模式" tabindex="-1">mode[模式] <a class="header-anchor" href="#mode-模式" aria-label="Permalink to &quot;mode[模式]&quot;">​</a></h3><p><code>mode</code> 配置选项，告知 webpack 使用相应环境的内置优化。</p><p>mode: <code>production</code>| <code>development</code>|none</p><table><thead><tr><th>模式</th><th>描述</th></tr></thead><tbody><tr><td>production（<code>默认</code>）</td><td>设置<code>process.env.NODE_ENV</code> 的值设置为 <code>production</code>，启用<code>uglifysPlugin</code></td></tr><tr><td>development</td><td>设置<code>process.env.NODE_ENV</code> 的值设置为 <code>development</code></td></tr><tr><td>None</td><td>退出任何默认优化选项</td></tr></tbody></table><p>⚠️<code>production模式</code>下启用的uglifysPlugin，可以实现<strong>JS文件</strong>的Tree-shaking（<code>去除打包过程中未执行的代码，减少打包体积</code>）</p><p>⚠️CSS的Tree-shaking需要<a href="https://github.com/purifycss/purifycss" target="_blank" rel="noreferrer">【purify-css】</a></p><p><strong>根据mode变量改变打包行为</strong>（<code>需导出函数</code>）</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> baseConfig</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  mode: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;development&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    home: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/home/index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    about: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/about/index.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: __dirname </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/dist&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name].[chunkhash].index.js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">env</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">argv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv.mode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;development&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    baseConfig.devtool </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;source-map&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (argv.mode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;production&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    //...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> baseConfig</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="loader-模块转换器" tabindex="-1">loader[模块转换器] <a class="header-anchor" href="#loader-模块转换器" aria-label="Permalink to &quot;loader[模块转换器]&quot;">​</a></h3><p>webpack 只能理解 JavaScript 和 JSON 文件，loader** 让 webpack 能够去处理其他类型的文件。</p><p>webpack 的配置中 <strong>loader</strong> 有两个属性：</p><ul><li><code>test</code> 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。</li><li><code>use</code> 属性，表示进行转换时，应该使用哪个 loader，<code>顺序从右往左</code>。</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        test:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">css</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        use: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;style-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;css-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;sass-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        exclude:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">node_modules</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// exclude: 除去node_modules文件夹，加快编译</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 编译css后缀的文件，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束</span></span></code></pre></div><p><strong>常用loader</strong></p><ul><li><code>babel-loader</code>: 将ES6+转移成ES5-</li><li><code>css-loader,style-loader, sass-loader</code>：解析css文件，能够解释<a href="./.html">@import </a> url()等</li><li><code>file-loader</code>：直接输出文件，把构建后的文件路径返回，可以处理很多类型的文件</li><li><code>url-loader</code>：打包图片</li></ul><p>⚠️打包图片时最好选用<code>url-loader</code>进行转换，可以指定一个limit属性，图片小于limit的返回Base64文件，大于limit直接调用调用file-loader。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rules: [{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      test:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">(png</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">jpg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">gif)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      use: [{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        loader: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;url-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        options: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          outputPath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;images/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          limit: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //小于500B的文件打包出Base64格式，写入JS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="plugins-插件" tabindex="-1">plugins[插件] <a class="header-anchor" href="#plugins-插件" aria-label="Permalink to &quot;plugins[插件]&quot;">​</a></h3><p><code>对编译完成后的内容进行二度加工</code>，可以打包优化，资源管理和注入环境变量等</p><blockquote><p><strong>plugins插件</strong>是一个具有 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank" rel="noreferrer"><code>apply</code></a> 方法的 JavaScript 对象。 而<code>apply</code> 方法会被 webpack compiler 调用，并且<strong>compiler 对象可在整个编译生命周期访问</strong>。</p></blockquote><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HtmlWebpackPlugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;html-webpack-plugin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">); </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//通过 npm 安装</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;path&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HtmlWebpackPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      template: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./public/index.html&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      // 压缩 =&gt; production 模式使用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      minify: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        removeAttributeQuotes: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//删除双引号</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        collapseWhitespace: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> //折叠 html 为一行</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打包压缩public/index.html</span></span></code></pre></div><h2 id="构建流程" tabindex="-1">构建流程 <a class="header-anchor" href="#构建流程" aria-label="Permalink to &quot;构建流程&quot;">​</a></h2><h3 id="webpack的核心module" tabindex="-1">webpack的核心<code>module</code> <a class="header-anchor" href="#webpack的核心module" aria-label="Permalink to &quot;webpack的核心\`module\`&quot;">​</a></h3><blockquote><p>无论你是jsx,tsx,html,css,scss,less,png文件，webpack一视同仁为module。 并且每个文件[module]都会经过相同的编译工序 loader==&gt; plugin。</p></blockquote><p><strong>打包原理</strong>：将所有module打包成一个bundle文件，通过<code>代码分割</code>成单元片段<code>按需加载</code>。</p><ul><li><code>module</code>：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。</li><li><code>chunk</code>：webpack在进行模块的依赖分析的时候，代码分割出来的代码块</li><li><code>bundle</code>： webpack打包出来的文件</li></ul><p><strong>开发【module】 =&gt;编译分析【chunk】 =&gt;输出【bundle】</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  watch: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  entry: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./index.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  devtool: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;source-map&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  output: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path: path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(process.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cwd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;dist/&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;[name].js&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  resolve: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    alias:{ jquery: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;src/lib/jquery.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> webpack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ProvidePlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      $: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;jquery&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      _: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;underscore&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      React: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;react&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WebpackNotifierPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  module: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    rules: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        test:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">\\.</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">js</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">[x]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        exclude:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /</span><span style="--shiki-light:#032F62;--shiki-dark:#DBEDFF;">node_modules</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        use: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;babel-loader&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h3 id="_1-确定webpack编译上下文context" tabindex="-1">1.确定webpack编译上下文context <a class="header-anchor" href="#_1-确定webpack编译上下文context" aria-label="Permalink to &quot;1.确定webpack编译上下文context&quot;">​</a></h3><blockquote><p>webpack在确定webpack.config中entry的路径依赖时，会根据这个context确定每个要编译的文件(assets)的绝对路径</p></blockquote><h3 id="_2-entry和output-确定webpack的编译起点和终点" tabindex="-1">2. entry和output 确定webpack的编译起点和终点 <a class="header-anchor" href="#_2-entry和output-确定webpack的编译起点和终点" aria-label="Permalink to &quot;2. entry和output 确定webpack的编译起点和终点&quot;">​</a></h3><blockquote><p>顾名思义，entry定义webpack编译起点，入口模块。 对应的结果为<code>compolation.assets</code> output定义webpack编译的终点，导出目录</p></blockquote><h3 id="_3-loader确定模块预编译处理方式" tabindex="-1">3. loader确定模块预编译处理方式 <a class="header-anchor" href="#_3-loader确定模块预编译处理方式" aria-label="Permalink to &quot;3. loader确定模块预编译处理方式&quot;">​</a></h3><blockquote><p>以babel为例，当webpack发现模块名称匹配test中的正则/js[x]?的时候。 它会将当前模块作为参数传入babel函数处理，<code>babel([当前模块资源的引用])</code>。 函数执行的结果将会<strong>缓存</strong>在webpack的compilation对象上，并分配<strong>唯一</strong>的<code>id</code> 。 以上的这一步，非常非常关键。唯一的id值决定了webpack在最后的编译结果中，是否会存在重复代码。 而缓存在compilation对象上，则决定了webpack可以在<code>plugin</code>阶段直接拿取模块资源进行二度加工。</p></blockquote><h3 id="_4-plugin阶段贯穿于webpack的整个编译流程-一般用来做一些优化操作" tabindex="-1">4. plugin阶段贯穿于webpack的整个编译流程，一般用来做一些优化操作 <a class="header-anchor" href="#_4-plugin阶段贯穿于webpack的整个编译流程-一般用来做一些优化操作" aria-label="Permalink to &quot;4. plugin阶段贯穿于webpack的整个编译流程，一般用来做一些优化操作&quot;">​</a></h3><blockquote><p>比如<code>webpack.ProvidePlugin</code>，它会在对编译结果再加工的操作过程中进行自定义的变量注入，当模块中碰到比如<code>_</code>这个变量的时候，webpack将从缓存的module中取出underscore模块加载进引用<code>_</code>的文件(compilation.assets)。 比如<code>WebpackNotifierPlugin</code>，它会在编译结果ready的时通知开发者，output已经就绪。</p></blockquote><h3 id="_5-resolve-alias的作用就是对module模块提供别名" tabindex="-1">5. resolve.alias的作用就是对module模块提供别名 <a class="header-anchor" href="#_5-resolve-alias的作用就是对module模块提供别名" aria-label="Permalink to &quot;5. resolve.alias的作用就是对module模块提供别名&quot;">​</a></h3><h2 id="附录1·代码分割" tabindex="-1"><a href="https://www.yuque.com/goozyshi/blink/chdntb" target="_blank" rel="noreferrer">附录1·代码分割</a> <a class="header-anchor" href="#附录1·代码分割" aria-label="Permalink to &quot;[附录1·代码分割](https://www.yuque.com/goozyshi/blink/chdntb)&quot;">​</a></h2>`,64),p=[e];function h(t,k,d,E,r,o){return i(),a("div",null,p)}const y=s(l,[["render",h]]);export{g as __pageData,y as default};
