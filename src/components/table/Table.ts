import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {DomListenerProps} from "../../core/DomListener";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor(root: DomListenerProps) {
        super(root, {
            name: 'Table',
            listeners: []
        });
    }

    toHTML(): string {
        return createTable();
    }
}