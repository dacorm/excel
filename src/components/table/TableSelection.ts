import {Dom} from "../../core/dom";

export class TableSelection {
    static className = 'selected'

    private group: Dom[];
    current: Dom | null;
    constructor() {
        this.group = []
        this.current = null
    }

    select(el: Dom) {
        this.clear();
        el.focus().addClass(TableSelection.className);
        this.group.push(el);
        this.current = el;
    }

    clear() {
        this.group.forEach((cell) => {
            cell.removeClass(TableSelection.className);
        })
        this.group = [];
    }

    selectGroup(group: Dom[] = []) {
        this.clear();
        this.group = group;
        this.group.forEach((el) => {
            el.addClass(TableSelection.className);
        })
    }
}