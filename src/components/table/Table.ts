import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {DomListenerProps} from "../../core/DomListener";
import {$} from "../../core/dom";
import {TableSelection} from "./TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    private selection: TableSelection;

    constructor(root: DomListenerProps) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML(): string {
        return createTable();
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        
        const cell = this.root.find('[data-id="0:0"]');
        this.selection.select(cell);
    }

    onMousedown(event: any) {
        if (event.target.dataset.resize) {
            const resizer = $(event.target);
            const parent = resizer.closest('[data-type="resizable"]');
            const coords = parent.getCoords();
            const type = resizer.data.resize;
            const sideProp = type === 'col' ? 'bottom' : 'right';
            let value: number

            resizer.css({
                opacity: 1,
                [sideProp]: '-5000px',
                zIndex: 1000
            })


            document.onmousemove = (e) => {
                if (type === 'col') {
                    const delta = e.pageX - coords.right;
                    value = coords.width + delta;
                    resizer.css({
                        right: -delta + 'px'
                    })
                } else {
                    const delta = e.pageY - coords.bottom;
                    value = coords.height + delta;
                    resizer.css({
                        bottom: -delta + 'px'
                    })
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                if (type === 'col') {
                    parent.css({
                        width: value + 'px'
                    })
                    this.root.findAll(`[data-col="${parent.data.col}"]`).forEach((el) => {
                        el.setAttribute('style', `width: ${value}px`)
                    })
                } else {
                    parent.css({
                        height: value + 'px'
                    })
                }

                resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0
                })
            }
        } else if (event.target.dataset.type === 'cell') {
            const target = $(event.target);
            this.selection.select(target);
        }
    }
}