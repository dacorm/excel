export class Dom {
    el: Element;
    private elem: HTMLElement;
    constructor(selector: string | HTMLElement) {
        this.el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html: string) {
        if (typeof html === 'string') {
            this.el.innerHTML = html
        }
        return this.el.outerHTML.trim();
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType: string, callback: () => void) {
        this.el.addEventListener(eventType, callback)
    }

    off(eventType: string, callback: () => void) {
        this.el.removeEventListener(eventType, callback)
    }

    append(node: Element | Dom) {
        if (node instanceof  Dom) {
            node = node.el
        }
        if (Element.prototype.append) {
            this.el.append(node)
        } else {
            this.el.appendChild(node)
        }
        return this
    }

    get data() {
        // @ts-ignore
        return this.el.dataset
    }

    closest(selector: string) {
        return $((this.el.closest(selector)) as HTMLElement)
    }

    getCoords() {
        return this.el.getBoundingClientRect()
    }

    find(selector: string) {
        return $((this.el.querySelector(selector) as HTMLElement));
    }

    findAll(selector: string) {
        return this.el.querySelectorAll(selector);
    }

    addClass(className: string) {
        this.el.classList.add(className);
    }

    removeClass(className: string) {
        this.el.classList.remove(className);
    }

    id(parse: boolean = false) {
        if (parse) {
            const parsed: string[] = this.id().split(':');
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id;
    }

    text(text?: string) {
        if (typeof text === 'string') {
            this.el.textContent = text;
            return this;
        }
        if (this.el.tagName.toLowerCase() === 'input') {
            return (this.el as HTMLInputElement).value.trim();
        }
        return this.el.textContent.trim();
    }

    focus() {
        (this.el as HTMLInputElement).focus();
        return this
    }

    css(styles:Record<string, string | number> = {}) {
        Object.keys(styles).forEach((key) => {
            this.elem = (this.el) as HTMLElement;
            // @ts-ignore
            this.elem.style[key] = styles[key];
        })
    }
}

export function $(selector: string | HTMLElement) {
    return new Dom(selector)
}

$.create = (tagName: string, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes);
    }

    return $(el)
}