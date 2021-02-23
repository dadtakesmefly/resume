function _addListener (target, type, listener, prepend) {
    let events = target._events
    let existing = null
    if (events === void 0) {
        events = target._events = Object.create(null)
    } else {
        existing = events[type]
    }

    if (existing === void 0) {
        existing = events[type] = [listener];
    } else {
        if (prepend) {
            existing.unshift(listener)
        } else {
            existing.push(listener)
        }
    }

    return target
}

class EventEmitter {
    constructor() {
        this.init()
    }

    init () {
        this._events = Object.create(null)
        this._eventsCount = 0
    }

    on (...args) {
        return this.addListener.apply(this, args)
    }

    trigger (type, ...args) {
        return this.emit(type, args);
    }

    emit (type, ...args) {
        let handler = this._events[type] || []
        let len = handler.length
        if (handler === void 0 || len == 0) {
            return false
        }
        // 从后往前调用，防止因移除监听出错
        for (let i = len - 1; i >= 0; i--) {
            Reflect.apply(handler[i], this, args)
        }
        return true
    }

    addListener (type, listener) {
        return _addListener(this, type, listener, false)
    }

    prependListener (type, listener) {
        return _addListener(this, type, listener, true)
    }

    once (type, listener) {
        if (type === void 0 || typeof listener !== "function") {
            return this
        }
        let tmpfunc = (...args) => {
            this.removeListener(type, tmpfunc)
            Reflect.apply(listener, this, args)
        } 
        this.addListener(type, tmpfunc)
    }

    removeAllListener (type) {
        if (type === void 0) {
            return this
        }

        delete this._events[type]
        return this
    }

    /**
     *
     *
     * @param {*} type
     * @param {*} listener
     * @returns
     * @memberof EventEmitter
     */
    removeListener (type, listener) {

        if (type === void 0 || typeof listener !== "function") {
            return this
        }

        let events = this._events

        if (events === undefined) {
            return this
        }

        let list = events[type]

        if (list === listener || list.listener === listener) {
            if (--this._eventsCount == 0) {
                this._events = Object.create(null)
            } else {
                delete events[type]
            }
        } else if (typeof list !== "function") {
            let position = -1
            // 从后往前查找移除
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                    position = i
                    break
                }
            }
            if (position < 0) {
                return this
            }
            list.splice(position, 1)
        }
        
        return this
    }
}

