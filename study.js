var ev = {
    handlers: {},
    on(type,handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger(type,handler) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for(var i = 0; i < handlers.length; i++ ) {
            if (handlers[i] === handler) {
                handlers[i].apply(null,args)
            }
        }
    },
    off(type,handler) {
       var handles = this.handlers[type]
       for(var i = 0;i < handles.length; i++) {
           if (handles[i] === handler) {
                this.handlers[type].splice(i,1)
                break
           }
       }
    },
    once(type,handler) {
        let once = (...args) => {
            handler(...args)
            this.off(type,once)
        }
        this.on(type,once)
    },
    removeAll() {
        this.handlers = {}
    }
}

class Mypromise {
    constructor(callback) {
        this._reject = []
        this._resolve = []
        setTimeout(() => {
            callback(this.resolve.bind(this),this.reject.bind(this))
        });
    }
    resolve(data,res) {
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
    all(list) {
        return new MyPromise((resolve,reject) => {
            let value = []
            let count =0
            for(var i = 0; i< list.length; i++) {
                list[i].then((res) => {
                    value[i] = res
                    count ++ 
                    if (count === list.length) resolve(value)
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
    allsettled(list) {
        return new MyPromise((resolve,reject) => {
            let value = []
            let count =0
            for(var i = 0; i< list.length; i++) {
                list[i].then((res) => {
                    value[i] = res
                    count ++ 
                    if (count === list.length) resolve(value)
                }).catch(err => {
                    value[i] = res
                    count ++ 
                    if (count === list.length) resolve(value)
                })
            }
        })
    }
}

var debounce = (fn,time) => {
    let timeout = null
    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn().apply(this,...args)
        }, time);
    }
}

var throttle = (fn,time) => {
    let flag = true
    return function (...args) {
        if (!flag) return
        setTimeout(() => {
            fn().apply(this,...args)
            flag = false
        }, time);
    }
}

function loopRequest(promises, max = 3) {
    let taskPool = []
    let loopFn = async (tasks) =>{
        if (tasks.length === 0) return

        await taskPool.shift().request()

        return loopFn(tasks)
    }
    while(max--) {
        taskPool.push(promises)
    }
    return Promise.all(taskPool)
}

// 实现一个instanceOf
function instanceOf (left, right) {
    let proto = left.__proto__;
    let prototype = right.prototype
    while(true) {
        if (proto === null) return false
        if (proto === prototype) return true 
        proto = proto.__proto__
    }
}



// 并行 promise.all()
var p1 = Promise.resolve(setTimeout(() => {
    console.log('p1' + Date.now())
}, 0));
var p2 = Promise.resolve(setTimeout(() => {
    console.log('p2' + Date.now())
}, 0));
var p3 = Promise.resolve(setTimeout(() => {
    console.log('p3' + Date.now())
}, 0));
Promise.all([p1,p2,p3]).then(datas=>{
    console.log(datas)
})
// 串行
let parallelPromises = [p1,p2,p3].reduce((pre,next)=> 
    pre.then(()=> next.then()),
    Promise.resolve()
)


function instanceOF (left, right) {
    let proto = letf.__proto__
    let prototype = right.prototype
    while(true) {
        if (proto === null ) return false
        if (proto === prototype) return true
        proto = proto.__proto__
    }
}


function loopRequest(promises,max=3) {
    let taskPool = []
    let loopFn = async(tasks) => {
        if(tasks.length === 0) return
        await taskPool.shift().request()
        return loopFn(tasks)
    }
    while(max--){
        taskPool.push(promises)
    }
    return Promise.all(taskPool)
}

function SingeInstance(){
    if(!SingeInstance._instance)  SingeInstance._instance=this;
    return SingeInstance._instance;
}


//简洁版的new操作符实现过程
function newFunc(constructor){
    //第一步：创建一个空对象obj 
    var obj = {};
    //第二步：将构造函数 constructor的原型对象赋给obj的原型
    obj.__proto__ = constructor.prototype;
    //第三步：将构造函数 constructor中的this指向obj,并立即执行构造函数内部的操作
    constructor.apply(obj);
    //第四步：返回这个对象
    return obj;
}

function typeCheck(target) {
    return Object.prototype.toString.call(target).slice(8, -1)
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
    for (i in target) {
        if (typeCheck(target[i]) === 'Array' || typeCheck(target[i]) === 'Object') {
            result[i] = deepClone(target[i])
        } else {
            result[i] = target[i]
        }
    }

    return result
}





var ev = {
    handlers: {},
    on(type,handler) {
        if (!this.handlers[type]){
            this.handlers[type] = []
        } 
        this.handlers[type].push(handlers)
    },
    trigger(type,handler) {
        var handlers = this.handlers[type]
        var args = Array.prototype.slice.call(arguments,1)
        for(var i=0; i< handler.length;i++) {
            if (handlers[i] === handler) {
                handlers[i].apply(null,args)
            }
        }
    },
    off(type) {
        delete this.handlers[type]
    },
    once(type,handler) {
        let once = (...args) => {
            handler(...args)
            this.off(type,once)
        }
        this.on(type,once)
    },
    
}

function checkType (target) {
    return Object.prototype.toString.call(target).slice(8,-1)
}

function deepClone (target) {   
    let result;
    if (checkType(target) === 'Object') {
        result = {}
    } else if (checkType(target) === 'Array') {
        result = []
    } else {
        result = target
    }
    for(i in target) {
        if (checkType(target[i]) === 'Object' ||  checkType(target[i]) === 'Array') {
            result[i] = deepClone(target[i])
        } else {
            result[i] = target[i]
        }
    }

    return result
}
const debounce = (fn,wait) => {
    let timer = null;
    return function (fn) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn()
        }, wait);
    }
}

const throttle = (fn,wait) => {
    let flag = true
    return function (fn) {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn()
            flag = true
        }, wait);
    }
}

class newPromise {
    constructor(callback){
        this._resolve = []
        this._reject = []
        setTimeout(() => {
            callback(this._reject.bind(this),this._resolve.bind(this))
        });
    }
    resolve(fn) {
        this._resolve.forEach(fn => fn(arguments))
    }
    reject(fn) {
        this._reject.forEach(fn => fn(arguments))
    }
    then(call) {
        this._resolve.push(call)
        return this
    }
    catch(call) {
        this._reject.push(call)
        return this
    }
    all(list) {
        return new newPromise((resolve,reject) => {
            let result = []
            let count = 0
            for(let i = 0; i< list.length;i++ ){
                list[i].then(res=> {
                    count ++ 
                    result[i] = res
                    if (count === list.length) resolve(result)
                }).catch(err=> {
                    reject(err)
                })
            }
        })
    }
    allsettled(list) {
        return new newPromise((resolve,reject) => {
            let result = []
            let count = 0
            for(let i = 0; i< list.length; i++ ){
                list[i].then(res=> {
                    count ++ 
                    result[i] = res
                    if (count === list.length) resolve(result) 
                }).catch(err=> {
                    count ++ 
                    result[i] = err
                    if (count === list.length) resolve(result) 
                })
            }
        })
    }
}

function newS (constructor) {
    let obj = {}
    obj.__proto__ = constructor.prototype
    constructor.apply(obj)
    return obj
}


var a = [1,2]
console.log(Array.isArray(a))
console.log(a instanceof Array)
console.log(a.__proto__ === Array.prototype)
console.log(Object.prototype.toString.call(a).slice(8,-1) === 'Array')


