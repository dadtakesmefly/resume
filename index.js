var en = {
    handlers:{},
    // 类型  绑定事件
    on:function(type,handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = []   //每个事件都可以绑定多次
        }
    
        this.handlers[type].push(handler)//handlers数组里面存放的是例如imsdk.on("requestFailure",event)，key值对应的event.
    },
    removeHandler:function (type,handler) {
        var events = this.handlers[type];
        for(var i = 0; i< events.length; i++) {
            if (events[i] === handler) {
                events.splice(i,1);
                break
            }
        }
    },
    trigger:function (type) {
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type]; //取出key对应的所有事件
            var args = Array.prototype.slice.call(arguments,1) //把传进来的key值去掉，留下的是数据data
            for(var i = 0; i < handlers.length; i++) {
                 //把事件数组进行循环
                 handlers[i].apply(null,args) //事件对应的data
            }
        }
    }
}




class MyPromise {
    constructor(callback) {
        /**
         *  三种状态 
         *  pending：进行中
         *  fulfilled：已成功
         *  rejected: 已失败
         */
        this.status = 'pending';
        this._reject = [];
        this._resolve = [];

        setTimeout(n => {
            callback(this.resolve.bind(this), this.reject.bind(this), this._reject.length)
        })
    }
    reject() {
        if (this.status !== 'pending') return;
        this.status = 'rejected';
        this._reject.forEach(fn => fn(...arguments))
    }
    resolve(data, res) {
        if (this.status !== 'pending') return;
        this.status = 'fulfilled';
        this._resolve.forEach(fn => fn(...arguments))
    }
    then(call) {
        this._resolve.push(call)
        return this
    }
    catch(call) {
        this._reject.push(call)
        return this
    }
    static all(list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                p.then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }).catch(err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }
    static allSettled(list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                p.then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }).catch(err => {
                    // 有一个被rejected时返回的MyPromise状态就变成依旧变成fulfilled 
                    values[i] = err
                    count++
                    if (count === list.length) resolve(values)
                })
            }
        })
    }
}

var en =  {
    handlers: {},
    on:function (type,handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger:function(type) {
        var handler = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for(var i =0 ;i < handler.length; i++) {
            handler[i].apply(null,args)
        }
    }
}


class Promise {
    constructor (callback) {
        this._reject = []
        this._resolve = []
        setTimeout(() => {
            callback(this.reject.bind(this),this.resolve.bind(this))
        });

    }
    resolve() {
        this._resolve.forEach(fn => fn(...arguments))
    }
    reject() {
        this._reject.forEach(fn => fn (...arguments))
    }
    then(call) {
        this._resolve.push(call)
        return this
    }
    catch(call) {
        this._reject.push(call)
        return this
    }
}







var en = {
    handlers:{},
    on(type,handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger(type) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for(var i =0 ; i < handlers.length; i++) {
            handlers[i].apply(null,args)
        }
    },
    remove(type,handler) {
        var handlers = this.handlers[type]
        for(var i =0 ;i < handlers.length;i++ ){
            if (handlers[i] === handler)  {
                handlers.splice(i,1)
                break
            }
        }
    }
}





var debounce = (fn,time) =>{
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn.apply(this,arguments)
        }, time);
    }
}

const throttle = (fn, time) => {
    let flag = true;
    return function() {
      if (!flag) return;
      flag = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        flag = true;
      }, time);
    }
  }


  function add() {
    const _args = [...arguments];
    function fn() {
      _args.push(...arguments);
      return fn;
    }
    fn.toString = function() {
      return _args.reduce((sum, cur) => sum + cur);
    }
    return fn;
  }


  var debunce = (fn,time) =>{
    let timeout = null
    return  function () {
        clearTimeout(timeout)
        timeout = setTimeout (()=>{
            fn.apply(this,arguments)
        },time)
    }
  }

  var throttle = (fn,time)=>{
    let flag = true
    return function () {
        if (!flag)  {
            return
        }
        flag = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            flag = true;
        }, time);
    }
}











var ev = {
    handlers: {},
    on(type,handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger(type) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].apply(null,args)
        }
    },
}

class promise {
    constructor(callback){
        this._reject =[]
        this._resolve = []
        setTimeout(() => {
            callback(this.resolve.bind(this),this.reject.bind(this))
        });
    }
    resolve(){
        this._resolve.forEach(fn => fn(...arguments))
    }
    reject() {
        this._reject.forEach(fn => fn(...arguments))
    }
    then(call) {
        this._resolve.push(call)
        return this
    }
    catch(call) {
        this._reject.push(call)
        return this
    }
    
}


var debounce = (fn,time) => {
    let timeout = null
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
           fn.apply(this,arguments) 
        }, time);
    }
}

var throttle = (fn,time) => {
    let flag = true
    return function () {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this,arguments)
            flag = true
        }, time);
    }
}

var singleton = function () {}
singleton.getInstance = (function () {
    let instance = null;
    return function () {
        if (!instance) {
            instance = new singleton()
        }
        return instance
    }
})()

var a = [5,3,2,4,1]
let max;

for (var i = 0; i < a.length ;i++) {
    for(var j = 0; j< a.length ;j++) {
        if (a[i] < a [j]) {
            　max=a[j];
              a[j]=a[i];
              a[i]=max;
        } 
    }
} 
console.log(a)

a.sort()


    setTimeout(() => {
        console.log(1)
    }, 0);  

    new Promise(function execulor(resolve){
        console.log(2)
        for(var i = 0;i<10000;i+=1){
            i ==9999 && resolve()
        }
        console.log(3)
    }).then(function(){
        console.log(4)
    })
    console.log(5)


    var a= [1,2,3,4]
    var newA =1
    a.forEach(n=>{
        newA *= n
    })
    var b =  a.map(item => {
        return newA/item
    })


var a = [1,8,4,2,5,6,7,1]

function getMaxNum (arr, k) {
    let max = 0;
    
    while(arr.length) {
        let num = arr.slice(0 , k).reduce((k, j) => {
            return  k + j
        })

        if (num > max) {
            max = num
        }
        arr.splice(0, 1)
    }

   return max
}

function typeCheck(target) {
    return Object.prototype.toString.call(target).slice(8,-1)
}


function deepClone(target) {
    let result;
    if (typeCheck(target) === 'Array') {
        result = []
    } else if (typeCheck(target) === 'Object') {
        result = {}
    } else {
        result = target
    }
    for (var i in target) {
        if (typeCheck(target[i]) === 'Array' || typeCheck(target[i]) === 'Object' ) {
            result[i] = deepClone(target[i])
        } else {
            result[i] = target[i]
        }
    }
    return result
}


var ev = {
    handlers: {},
    on(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        } 
        this.handlers[type].push(handler)
    },
    trigger(type) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments, 1)
        for(var i = 0; i <= handlers.length; i++) {
            handlers[i].apply(null,args)
        }
    },
    remove(type, handler) {
        var handlers = this.handlers[type]
        for(var i = 0; i < handler.lenght; i++) {
            if(handler[i] === handler) {
                handlers.splice(i,1)
                break
            }
        }
        handler = handler.filter(i => i[type] != handler)
    },
    off(type) {
        delete this.handlers[type]
    },
    once(type, handler) {
        let once = (...args) => {
            handler(...args);
            this.off(type);
        };
        this.on(type, once);
    },
    removeAll(type) {
        this.handlers = {}
    }


}


function typeCheck (targer) {
    return Object.prototype.toString.call(targer).slice(8,-1)
}

function deepClone(target) {
    let result;
    if (typeCheck(target) === 'Array') {
        result = []
    } else if (typeCheck(target) === 'Object') {
        result = {}
    } else {
        result = target
    }

    for(var i in target) {
        if (typeCheck(target[i]) === 'Object' || typeCheck(target[i]) === 'Array') {
            result[i] = deepClone(target[i])
        }
        else {
            result[i] = target[i]
        }
    }

    return result
}

class MyPromise {
    constructor(callback) {
        this._reject = []
        this._resolve = []
        setTimeout(() => {
            callback(this.resolve.bind(this),this.reject.bind(this))
        });
    }
    resolve() {
        this._resolve.forEach(fn => fn(arguments))
    }
    reject() {
        this._reject.forEach(fn => fn(arguments))
    }
    then(call) {
        this._resolve.push(call)
        return this
    }
    catch(call) {
        this._reject.forEach(call)
        return this
    }
    static all(list) {
        return new MyPromise((resolve, reject) => {
            let value = []
            let count =0
            for (var [i, p] of list) {
                p.then(res => {
                    value[i] = res
                    if (count === list.length) {
                        resolve(value)
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })       
    }
    static allSettled (list) {
        return new MyPromise((resolve, reject) => {
            let value = []
            let count =0
            for (var [i, p] of list) {
                p.then(res => {
                    value[i] = res
                    count ++
                    if (count === list.length) {
                        resolve(value)
                    }
                }).catch(err => {
                    value[i] = res
                    count ++
                    if (count === list.length) {
                        resolve(value)
                    }
                })
            }
        })      
    }
}





var ev = {
    handlers: {},
    on(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger(type) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for(var i = 0 ; i <= handlers.lenght; i++) {
            
            handlers[i].apply(null,args)
            
        }
    },
    remove(type) {
        delete this.handlers[type]
    },
    removeAll() {
        this.handlers = {}
    },
    off(type) {
        var handlers = this.handlers[type]
        for(var i =0; i<= handlers.lenght;i++){
            if (handlers[i] === handler) {
                handlers.splice(i,1)
                break
            }
        }
    },
    once(type, handler) {
        let once = (...args) => {
            handler(...args);
            this.off(type)
           
        }
        this.on(type,once)
    }
}


class MyPromise {
    constructor(callback) {
        this._reject = []
        this._resolve = []
        setTimeout(() => {
            callback(this.resolve.bind(this),this.reject.bind(this))
        });
    }
    resolve() {
        this._resolve.forEach(fn=> fn(arguments))
    }
    reject() {
        this._reject.forEach(fn=> fn(arguments))
    }
    then(cb) {
        this._resolve.push(cb)
    }
    catch(cb) {
        this._reject.push(cb)
    }
    all(list) {
        return new MyPromise ((resolve,reject)=>{
            let value = []
            let count = 0
            for(let [i,p] of list.entries()) {
                p.then(res => {
                    value[i] = res
                    count++
                    if (count === list.length) resolve(value) 
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
    allSettled(list) {
        return new MyPromise ((resolve,reject)=>{
            let value = []
            let count = 0
            for(let [i,p] of list.entries()) {
                p.then(res => {
                    value[i] = res
                    count++
                    if (count === list.length) resolve(value) 
                }).catch(err => {
                    value[i] = res
                    count++
                    if (count === list.length) resolve(value) 
                })
            }
        })
    }
}


function loopFn(promises, max = 3) {
    let taskPool = []
    let loopFn = async(tasks) => {
        if (tasks.lenght === 0) return
        try {
            taskPool.shift().request()
        } catch (err){

        }
        return loopFn(tasks)
    }
    while(max--) {
        taskPool.push(loopFn(promises))
    }
    return Promise.all(taskPool)
}