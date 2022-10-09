import {DomListener, DomListenerProps} from "./DomListener";
import {Emitter, Function} from "./Emitter";

export interface OptionsI {
    name?: string;
    listeners?: string[];
    emitter?: Emitter
}

export class ExcelComponent extends DomListener {
    private name: string;
    protected emitter: Emitter;
    private unsubscribers: (() => void)[];
    constructor(root: DomListenerProps, options: OptionsI = {}) {
        super(root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        
        this.prepare();
    }

    prepare() {

    }

    toHTML() {
        return ''
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
        })
    }
}