import {DomListener, DomListenerProps} from "./DomListener";
import {Emitter, Function} from "./Emitter";
import {Action, Store} from "./createStore";

export interface OptionsI {
    name?: string;
    listeners?: string[];
    emitter?: Emitter;
    store?: Store;
}

export class ExcelComponent extends DomListener {
    name: string;
    protected emitter: Emitter;
    private unsubscribers: (() => void)[];
    protected store: Store;
    private storeSub: { unsubscribe: () => void } | null;
    constructor(root: DomListenerProps, options: OptionsI = {}) {
        super(root, options.listeners);
        this.name = options.name || '';
        this.emitter = options.emitter;
        this.store = options.store;
        this.unsubscribers = [];
        this.storeSub = null;
        this.prepare();
    }

    prepare() {

    }

    toHTML() {
        return ''
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }

    storeChanged(changes: { [p: string]: any }) {

    }

    subscribe(fn: (...args: any) => void) {
        this.storeSub = this.store.subscribe(fn);
    }

    isWatching(key: string) {
        if (this.subscribe) {
            return this.subscribe;
        }
    }

    emit(event: string, ...args: any) {
        this.emitter.emit(event, ...args);
    }

    on(event: string, fn: Function) {
        const unsub = this.emitter.subscribe(event, fn);
        this.unsubscribers.push(unsub);
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.unsubscribers.forEach((el) => {
            el();
        });
    }
}