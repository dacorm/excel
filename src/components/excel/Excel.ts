import {Header} from "../header/Header";
import {$, Dom} from "../../core/dom";
import {Emitter} from "../../core/Emitter";
import {ExcelComponent} from "../../core/ExcelComponent";

interface Options {
    components: (typeof Header)[];
}

interface ExcelProps {
    selector: string;
    options: Options;
}

export class Excel {
    private el: Dom;
    private components: typeof Header[];
    private newComponents: Header[];
    private emitter: Emitter;
    constructor({selector, options}: ExcelProps) {
        this.el = $(selector)
        this.components = options.components || [];
        this.emitter = new Emitter();
    }

    getRoot() {
        const root = $.create('div', 'excel');

        const componentOptions = {
            emitter: this.emitter
        }

        this.newComponents = this.components.map((Component) => {
            const el = $.create('div', Component.className)
            const component = new Component(el, componentOptions);
            el.html(component.toHTML());
            root.append(el);
            return component
        })

        return root
    }

    render() {
        this.el.append(this.getRoot());
        this.newComponents.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach((component) => {
            // @ts-ignore
            component.destroy();
        })
    }
}