import {ExcelComponent, OptionsI} from "../../core/ExcelComponent";
import {DomListenerProps} from "../../core/DomListener";
import {$, Dom} from "../../core/dom";
import {State} from "../../core/createStore";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    private formula: Dom;

    constructor(root: DomListenerProps, options: OptionsI) {
        super(root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    toHTML(): string {
        return `<div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init();

        this.formula = this.root.find('#formula');

        this.on('table:select', (cell) => {
            this.formula.text(cell.text())
        })

        this.subscribe((state: State) => {
            this.formula.text(state.currentText)
        })
    }

    storeChanged(changes: { [p: string]: any }) {
        console.log('changes', changes)
    }

    onInput(event: { target: HTMLDivElement }) {
        this.emit('Formula:input', $(event.target).text());
    }

    onKeydown(event: KeyboardEvent) {
        const keys = ['Enter', 'Tab'];

        if (keys.includes(event.key)) {
            event.preventDefault();

            this.emit('formula:done');
        }
    }
}