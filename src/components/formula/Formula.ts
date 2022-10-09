import {ExcelComponent, OptionsI} from "../../core/ExcelComponent";
import {DomListenerProps} from "../../core/DomListener";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor(root: DomListenerProps, options: OptionsI) {
        super(root, {
            name: 'Formula',
            listeners: ['input'],
            ...options
        });
    }

    toHTML(): string {
        return `<div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>`
    }

    onInput(event: { target: HTMLDivElement }) {
        const text = event.target.textContent.trim();
        this.emit('Formula:input', text);
    }
}