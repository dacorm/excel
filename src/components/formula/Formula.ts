import {ExcelComponent} from "../../core/ExcelComponent";
import {DomListenerProps} from "../../core/DomListener";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor(root: DomListenerProps) {
        super(root, {
            name: 'Formula',
            listeners: ['input']
        });
    }

    toHTML(): string {
        return `<div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>`
    }

    onInput(event: Event) {
        console.log(this.root)
        console.log('onInput', event)
    }
}