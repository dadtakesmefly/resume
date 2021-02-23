var ev = {
    handlers: {},
    on(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    },
    trigger(type) {
        var hanlders = this.handlers[type]
        var args = Array.prototype.slice.call(arguments, 1)
        for (var i = 0; i <= hanlders.length; i++) {
            hanlders[i].apply(null, args)
        }
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
    removeAll() {
        this.handlers = {}
    }
}


class MyPromise {
    constructor(callback) {
        this._reject = []
        this._resolve = []
        setTimeout(() => {
            callback(this._resolve.bind(this), this.reject.bind(this))
        });
    }
    resolve() {
        this._resolve.push(fn => fn(arguments))
    }
    reject() {
        this._reject.push(fn => fn(arguments))
    }
    then(call) {
        this._resolve.forEach(call)
        return this
    }
    catch(call) {
        this._reject.forEach(call)
        return this
    }
    all(list) {
        return new MyPromise((resolve, reject) => {
            let result = []
            let count = 0
            for (var [i, p] of list.entries()) {
                p.then((value) => {
                    result[i] == value
                    if (count === list.lenght) resolve(result)
                }).cathc((err) => {
                    reject(err)
                })
            }
        })
    }
    allSettled() {
        return new MyPromise((resolve, reject) => {
            let result = []
            let count = 0
            for (var [i, p] of list.entries()) {
                p.then((value) => {
                    result[i] = value
                    count++
                    if (count === list.lenght) resolve(result)
                }).cathc((err) => {
                    result[i] = err
                    count++
                    if (count === list.lenght) resolve(result)
                })
            }
        })
    }
}

var debounce = (fn, time) => {
    let timeout = null
    return function () {
        timeout = setTimeout(() => {
            fn()
        }, time);
    }
}

var throttle = (fn, time) => {
    let flag = true
    return function () {
        if (!flag) return
        setTimeout(() => {
            fn()
            flag = false
        }, time);
    }
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


function loopRequest(promises,max =3) {
    let taskPool = []
    let loopFn = async(tasks) => {
        if (tasks.length === 0) return
        await taskPool.shift().request()
        return loopFn(tasks)
    }
    while(max--) {
        taskPool.push(loopFn(promises))
    }
    return Promise.all(taskPool)
}


