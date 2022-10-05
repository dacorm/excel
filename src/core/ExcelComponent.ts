import {DomListener, DomListenerProps} from "./DomListener";

export interface OptionsI {
    name?: string;
    listeners?: string[];
}

export class ExcelComponent extends DomListener {
    private name: string;
    constructor(root: DomListenerProps, options: OptionsI = {}) {
        super(root, options.listeners);
        this.name = options.name || ''
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}