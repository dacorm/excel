import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {DomListenerProps} from "../../core/DomListener";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor(root: DomListenerProps) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML(): string {
        return createTable();
    }

    onMousedown(event: any) {
        if (event.target.dataset.resize) {
            console.log('start')
        }
    }
}