import {ExcelComponent, OptionsI} from "../../core/ExcelComponent";
import {createTable} from "./table.template";
import {DomListenerProps} from "../../core/DomListener";
import {$, Dom} from "../../core/dom";
import {TableSelection} from "./TableSelection";
import {tableResize} from "../../redux/actions";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    private selection: TableSelection;

    constructor(root: DomListenerProps, options: OptionsI) {
        super(root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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
        this.selectCell(cell);

        this.on('Formula:input', (text) => {
            this.selection.current.text(text);
        })

        this.on('formula:done', () => {
            this.selection.current.focus();
        })
    }

    selectCell(cell: Dom) {
        this.selection.select(cell);
        this.emit('table:select', cell);
        this.dispatch({ type: 'TEST' })
    }

    resizeTable(event: any) {
        return new Promise((resolve) => {
            const resizer = $(event.target);
            const parent = resizer.closest('[data-type="resizable"]');
            const coords = parent.getCoords();
            const type = resizer.data.resize;
            const sideProp = type === 'col' ? 'bottom' : 'right';
            let value: number;

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

                resolve({
                    value,
                    id: type === 'col' ? parent.data.col : null
                });

                resizer.css({
                    opacity: 0,
                    bottom: 0,
                    right: 0
                })
            }
        })
    }

    async resizeHandler(event: any) {
        try {
            const data = await this.resizeTable(event);
            this.dispatch(tableResize(data));
        } catch (e) {
            console.warn(e);
        }
    }

    onMousedown(event: any) {
        if (event.target.dataset.resize) {
            this.resizeHandler(event);
        } else if (event.target.dataset.type === 'cell') {
            const target = $(event.target);
            if (event.shiftKey) {
                const targetParsed = target.id(true);
                const current = this.selection.current.id(true);

                const cols = range(current.col, targetParsed.col);
                const rows = range(current.row, targetParsed.row);

                const ids = cols.reduce((acc, col) => {
                    rows.forEach((row) => {
                        acc.push(`${row}:${col}`);
                    })
                    return acc
                }, []);

                const cells = ids.map((id) => {
                    return this.root.find(`[data-id="${id}"]`);
                });
                this.selection.selectGroup(cells);
            } else {
                this.selectCell(target);
            }
        }
    }

    onKeydown(event: KeyboardEvent) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
        const { key } = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.selection.current.id(true);
            const next = this.root.find(nextSelector(key, id));
            this.selectCell(next);
        }
    }

    onInput(event: any) {
        this.emit('table:input', $(event.target))
    }
}

export function range(start: number, end: number) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1).fill('').map((_, index) => {
        return start + index;
    });
}

function nextSelector(key: string, { col, row }: Record<string, number>) {
    const MIN_VALUE = 0;

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
    }

    return `[data-id="${row}:${col}"]`
}