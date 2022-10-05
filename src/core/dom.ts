export class Dom {
    el: Element;
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