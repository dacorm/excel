import {Header} from "../header/Header";
import {$, Dom} from "../../core/dom";

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
    constructor({selector, options}: ExcelProps) {
        this.el = $(selector)
        this.components = options.components || [];
    }

    getRoot() {
        const root = $.create('div', 'excel');

        this.components.forEach((Component) => {
            const el = $.create('div', Component.className)
            const component = new Component({
                root: el
            });
            el.html(component.toHTML());
            root.append(el);
        })

        return root
    }

    render() {
        this.el.append(this.getRoot());
    }
}