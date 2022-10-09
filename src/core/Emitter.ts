export type Function = (...args: any) => void

export class Emitter {
    private listeners: Record<string, Function[]>;
    constructor() {
        this.listeners = {}
    }

    emit(event: string, ...args: any) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        } else {
            this.listeners[event].forEach((listener) => {
                listener(...args)
            })
        }
    }

    subscribe(event: string, fn: Function) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
        return () => {
            this.listeners[event] = this.listeners[event].filter((listener) => {
                return listener !== fn
            })
        }
    }
}