import {Dom} from "../../core/dom";

export class TableSelection {
    static className = 'selected'

    private group: Dom[];
    constructor() {
        this.group = []
    }

    select(el: Dom) {
        this.clear();
        el.addClass(TableSelection.className);
        this.group.push(el);
    }

    clear() {
        this.group.forEach((cell) => {
            cell.removeClass(TableSelection.className);
        })
        this.group = [];
    }

    selectGroup() {

    }
}