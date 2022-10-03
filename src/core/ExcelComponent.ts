import {DomListener, DomListenerProps} from "./DomListener";

export interface OptionsI {
    name?: string;
    listeners?: string[];
}

export class ExcelComponent extends DomListener {
    constructor(root: DomListenerProps, options: OptionsI = {}) {
        super(root, options.listeners);
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners();
    }
}