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
        if (this.handlers[type] instanceof Aray) {
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


