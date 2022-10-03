import {Dom} from "./dom";

export interface DomListenerProps extends Dom {
    root?: HTMLElement | Dom
}

export class DomListener {
    private root: DomListenerProps;
    private listeners: string[];

    constructor(root: DomListenerProps, listeners: string[] = []) {
        if (!root) {
            throw new Error('No root provided')
        }
        this.root = root;
        this.listeners = listeners;
    }

    initDOMListeners() {

    }

    removeDOMListeners() {

    }
}