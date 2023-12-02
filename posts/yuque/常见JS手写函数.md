---
title: 常见JS手写函数
urlname: nqg7cu
date: '2021-01-06 00:48:09'
updated: '2022-07-03 13:28:28'
description: null
tags:
  - 语雀
---
> > -  [JavaScript手写代码无敌秘籍](https://juejin.cn/post/6844903809206976520#heading-26) 
> -  [金三银四：20道前端手写面试题](https://juejin.cn/post/7079681931662589960) 


## 不使用a标签，实现a标签的下载功能

```javascript
window.location.href= url // a标签self，当前窗口打开
window.open(url) // _blank，新窗口打开
```

## 实现 new

- 新建一个空对象
- 空对象继承构造函数原型对象
- 构造函数绑定空对象
- 返回该对象

```javascript
/**
 * new: 创建一个空对象继承函数原型，属性和方法被加入到该对象中，最后隐式返回this引用的对象
 */
function myNew (constructor, ...args) {
  let obj = {
    __proto__: constructor.prototype
  }
  constructor.apply(obj, args)
  return obj
}
functin People (name) {
  this.name = name
}
const bb = myNew(People, 'cxl')
console.log(bb)
```

## 实现 instanceof

即判断**a 在不在 b 的原型链上**

```javascript
/**
 * 实现 instanceOf： 判断 a 在不在 b 的原型链上
 */
function myInstanceOf (a, b) {
  while (true) {
    if (a === null) {
      return false
    }
    if (a.__proto__ === b.prototype) {
      return true
    }
    a = a.__proto__
  }
}

console.log(myInstanceOf([], Object))
```

## 深浅拷贝

深浅拷贝的区别在于：

-  浅拷贝：对于复杂数据类型，浅拷贝只是引用地址赋值给新对象，**改变新对象的值，原对象的值也会改变** 
-  深拷贝：对于复杂数据类型，深拷贝后引用地址都是新的，改变新对象的值，**原对象的值不会改变** 

```javascript
const newObj = JSON.parse(JSON.stringify(obj)) // 最简单版本，不能拷贝函数等
/**
 * 深拷贝：Array ｜ Object 类型递归返回，其他类型直接返回即可
 * 循环引用会栈爆，利用hash表 + WeakMap 弱引用 性能更好 并且支持 Symbol
 */
function deepCopy(target, hash = new WeakMap()) {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  if (hash.has(target)) {
    return hash.get(target)
  }
  const res = Array.isArray(target) ? [] : {}
  hash.set(target, res)
  for (let key of Object.keys(target)) {
    res[key] = deepCopy(target[key], hash)
  }
  return res
}
const o1 = {
  k1: undefined,
  k2: null,
  k3: 4,
  k4: [{a: 1}],
  k5: console.log
}
o1.k6 = o1
const o2 = deepCopy(o1)
console.log(o2)
```

> 引申一个问题： weakMap 和 Map的区别？ GC回收机制：标记清除 + 引用计数 ？


## 实现 JSON.parse

eval 与 Function 都有着动态编译JS代码的作用，

但会有 XSS 漏洞， 需校验确保参数是正确的JSON数据 而不是可执行的 JS 代码

```javascript
const myJsonParse = (opt) => eval(`(${opt})`)
const myJsonParse2 = (opt) => (new Function(`return ${opt}`))()
// JSON格式要用【双引号】
const text = '{"a": "xxx"}'
console.log(myJsonParse(text), myJsonParse2(text))
```

## 节流防抖

- 防抖：只执行最后一次触发的任务，清除异步任务，核心在于**清除定时器，重新计时**
- 节流：每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，核心在于**开关锁**。

```javascript
// 防抖 debounce
function debounce (fn, wait) {
  let timer
  return (...args) => {
    // 事件再次触发则清除定时器，重新计时
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}
window.addEventListener('scroll', debounce(() => console.log(`debounce`), 500))

// 节流 throttle
function throttle(fn, timer) {
  let pre = 0;
  return (...args) => {
    while (Date.now() - pre > timer) {
      fn.apply(this, args);
      pre = Date.now();
    }
  };
}
window.addEventListener('scroll', throttle(() => console.log(`throttle`), 500))
```

## 实现 call 或 apply 或 bind

作用：**改变 this 指向** + **借用其他对象的方法**

- call: 调用一个函数，接收一个参数列表，第一个参数指定函数体内this的指向，后续的参数列表
- apply：调用一个函数，接收两个参数，第一个参数指定函数体内this的指向，第二个参数为数组或类数组
- bind：`bind` 参数类型和 call 相同，不过它不会执行函数，而是修改 this 后返回一个新的函数

```javascript
// 将函数设为对象的属性，执行并删除函数属性
Function.prototype.myCall = function (context = window, ...args) {
  // 使用Symbol 来确定唯一key
  const key = Symbol()
  context[key] = this // 将this赋值给上下文对象的执行函数_fn
  const res = context[key](...args)
  Reflect.deleteProperty(context, key) // 删除函数
  return res
}

// apply与call实现相同，但apply 接收一个参数数组
Function.prototype.myApply = function (context, args) {
  // 使用Symbol 来确定唯一key
  const key = Symbol()
  context[key] = this
  const res = context._fn(...args)
  Reflect.deleteProperty(context, key)
  return res
}

// bind 返回一个新函数，将传入的context作为新函数的this指向
Function.prototype.myBind = function (context, ...args) {
  return () => {
    this.myApply(context, args)
  }
}

const foo = {
  name: 'foo',
  sex: 'male'
}
/* myCall */
function print () {
  console.log(this.name)
}
print.myCall(foo) // foo

/* myApply */
function bar (name, age) {
  console.log(name, age, this.sex)
}
bar.myApply(foo, ['K', 33])// K 33 male

/* myBind */
const cat = function (name) {
  console.log(this.name, name)
}.myBind(foo, 'L')

cat() // foo L
```

## 实现继承

### es5 寄生组合实现继承

通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

弥补其它方式的继承会在**一次实例中调用两次父类的构造函数**的缺点

```javascript
function inheritPrototype (sub, sup) {
  let pro = Object.create(sup.prototype)
  pro.constructor = sub
  sub.prototype = pro
}
function Father () {
  this.name = 'sdada'
}

function Child () {
  Father.call(this)
}
Father.prototype.sayName = function () {
  console.log(this.name)
}
inheritPrototype(Child, Father)

const nx = new Child()
nx.sayName()
```

### class 类继承

> ES6的Class继承在通过 Babel 进行转换成ES5代码的时候 使用的就是 寄生组合式继承。


本质是寄生组合式继承的`语法糖`。

- Class 可以通过**extends**关键字实现继承
- 子类必须在**constructor**方法中调用**super**方法，否则新建实例时会报错
- 父类的静态方法，也会被子类继承

```javascript
class Father {
  constructor () {
    this.name = 'Father'
  }
  sayName () {
    console.log(this.name)
  }
  static sayName () {
    console.log(222)
  }
}

class Child extends Father {
  constructor () {
    super() // 必须调用，否则新建实例会报错
    this.name = 'Child'
  }
}
const nx = new Child()
nx.sayName() // 'Child'
Child.sayName() // 222
```

## JS机制

> JS事件循环机制


```javascript
console.log("start");

setTimeout(() => {
  console.log("setTimeout1");
}, 0);

(async function foo() {
  console.log("async 1");

  await asyncFunction();

  console.log("async2");

})().then(console.log("foo.then") );

async function asyncFunction() {
  console.log("asyncFunction");

  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);

  new Promise((res) => {
    console.log("promise1");

    res("promise2");
  }).then(console.log);
}
```

提示：

1. script标签算一个宏任务所以最开始就执行了
2. async await 在await之后的代码都会被放到微任务队列中去

**开始执行**：

- 最开始碰到 console.log("start"); 直接执行并打印出 `start`
- 往下走，遇到一个 setTimeout1  就放到`宏任务队列`
- 碰到立即执行函数 foo， 打印出 `async 1`
- 遇到 await 堵塞队列，先 `执行await的函数`
- 执行 asyncFunction 函数， 打印出 `asyncFunction`
- 遇到第二个 setTimeout2， `放到宏任务队列`
- new Promise 立即执行，打印出 `promise1`
- 执行到 res("promise2") 函数调用，就是Promise.then。`放到微任务队列`
- asyncFunction函数就执行完毕， 把后面的打印 async2 会放到`微任务队列`
- 然后打印出立即执行函数的then方法  `foo.then`
- 最后执行打印 `end`
- 开始执行微任务的队列 打印出第一个 `promise2`
- 然后打印第二个 `async2`
- 微任务执行完毕，执行宏任务 打印第一个 `setTimeout1`
- 执行第二个宏任务 打印 `setTimeout2`、
- 就此，函数执行完毕

## 手写sleep函数 延迟执行

setTimeout

```javascript
const fn  = () => console.log(`sdsd`)
const sleep = (time, fn) => {
  setTimeout(() => {
    fn()
  }, time)
}
```

async - await

generater - yield

while 完全阻塞

```javascript
const sleep = (time, fn) => {
  const now = Date.now()
  while (Date.now() - now < time){}
  fn()
}
```

## 实现函数柯里化

> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。


函数柯里化的主要作用和特点就是**参数复用**、**提前返回** 和 **延迟执行。**

```javascript
// es5
function _curry(fn, args = []) {
  return function(){
    newArgs = [...args, ...arguments]
    return newArgs.length < fn.length ? curry.call(this,fn,newArgs) : fn.apply(this,newArgs)
  }
}

// es6
const curry = (fn, args = []) => (...params) => (arg => arg.length === fn.length ? fn(...arg) : curry(fn, arg))([...args, ...params])

const curryTest = (a, b ,c) => a + b + c
const add = curry(curryTest)
add(1)(4)(5)
```

## 手写 Promise

[完整链接](https://juejin.cn/post/6945319439772434469)

以下简要实现**then 和 catch**

```javascript
// 三个状态 pengding => fulfilled || pending => rejected
const STATUS_PENDING = 'PENDING'
const STATUS_FULFILLED = 'FULFILLED'
const STATUS_REJECTED = 'REJECTED'

class MyPromise {
  constructor (executor) {
    this.status = STATUS_PENDING
    this.value = undefined
    this.reason  = undefined
    this.resolveQueue = [] // resolve 回调队列， 处理异步
    this.rejectQueue = [] // reject 回调队列
    // 使用箭头函数可以让 this 指向当前实例
    const resolve = value => {
      // 更改成功后的状态
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_FULFILLED
        this.value = value
        this.resolveQueue.map(fn => fn())
      }
    }
    const reject = reason => {
      // 更改失败后的状态
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_REJECTED
        this.reason = reason
        this.rejectQueue.map(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err){
      reject(err)
    }
  }
  then (onFulfilled, onRejected) {
    if (this.status === STATUS_FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === STATUS_REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === STATUS_PENDING) {
      onFulfilled && this.resolveQueue.push(() => {onFulfilled(this.value)})
      onRejected && this.rejectQueue.push(() => {onRejected(this.reason)})
    }
  }
  catch (rejectFn) {
    this.then(undefined, rejectFn)
  }
}
new MyPromise((resolve, reject) => resolve(`sync`)).then(x => console.log(x))
new MyPromise((resolve, reject) => setTimeout(() => resolve(`async`), 1000)).then(x => console.log(x))
```

# 业务

## 实现trim函数

```javascript
String.prototype.myTrim = function () {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
let x = ' d ddd  '
x.myTrim()
```

## 解析URL Params 为参数

```javascript
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
const getUrlParams = (url, sKey) => {
  let params = url.split('?')[1].split('#')[0].split('&')
  let hash = {}
  params.map(p => {
    let [key, val = true] = p.split('=')
    if (!hash[key]) {
      hash[key] = typeof val === 'string' ? decodeURIComponent(val) : val
    } else {
      hash[key] = [].concat(hash[key], typeof val  === 'string' ? decodeURIComponent(val) : val)
    }
  })
  return sKey ? hash[sKey]: hash
}
console.log(getUrlParams(url))
// { user: 'anonymous', id: [ '123', '456' ], city: '北京', enabled: true }
```

## Promise 并发请求限制

- 定义一个PromisePool 对象，初始化一个 pool 作为并发池
- 然后先循环填满并发池，不断调用setTask，执行完删除完成的task，将新task填充入并发池

```javascript
class PromisePoll {
  constructor (max, fn) {
    this.max = max // 最大并发数目
    this.fn = fn
    this.pool = [] // 并发池
    this.urls = []
  }
  start (urls) {
    this.urls = urls
    while (this.pool.length < this.max) {
      this.setTask(this.urls.shift())
    }
    this.supply(Promise.race(this.pool))
  }
  setTask (url) {
    if (!url) return
    const task = this.fn(url)
    this.pool.push(task)
    task.then(() => {
      this.pool.splice(this.pool.indexOf(task), 1)
    })
  }
  supply (donePromise) {
    donePromise.then(() => {
      const url = this.urls.shift()
      this.setTask(url)
      this.supply(Promise.race(this.pool))
    })
  }
}

const urls = ['A', 'B', 'C', 'X', 'Y', 'Z']
// 生成异步 Promise
const createAsyncFn = url => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`任务${url}已完成`)
    }, 1000 * Math.random())
  }).then(res => {
    console.log(`外部逻辑:${res}`)
  })
}

const pool = new PromisePool(3, createAsyncFn)
pool.start(urls)
```
