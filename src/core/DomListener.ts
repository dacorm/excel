import {Dom} from "./dom";
import {capitalize} from "./utils";

export interface DomListenerProps extends Dom {
    root?: HTMLElement | Dom
}

export class DomListener {
    protected root: DomListenerProps;
    listeners: string[];

    constructor(root: DomListenerProps, listeners: string[] = []) {
        if (!root) {
            throw new Error('No root provided');
        }
        this.root = root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            // @ts-ignore
            if (!this[method]) {
                throw new Error(`Method ${method} is not defined`)
            }
            // @ts-ignore
            this[method] = this[method].bind(this)
            // @ts-ignore
            this.root.on(listener, this[method]);
        })
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            // @ts-ignore
            this.root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName: string) {
    return 'on' + capitalize(eventName)
}