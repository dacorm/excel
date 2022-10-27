import {State} from "../../core/createStore";

const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell(state: State, row: number) {
    return function(_: number, col: number) {
        return `
        <div 
        class="cell" 
        contenteditable="true" 
        data-col="${col}" 
        data-id="${row}:${col}" 
        data-type="cell"
        style="width: ${getWidth(state, col)}"
        ></div>
    `
    }
}

function createCol(col: string, index: number, width: string) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index: number, content: string, state: State = {}) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index);
    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index ?? ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function getWidth(state: State, index: number) {
    return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state: State, index: number) {
    return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toChar(el: string, index: number) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount: number = 15, state: State = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows: string[] = [];

    const cols = new Array(colsCount).fill('').map((el, index) => {
        return toChar(el, index);
    }).map((col, index) => {
        const width = getWidth(state.colState, index);
        return createCol(col, index, width);
    }).join('')

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill('').map(createCell(state.colState, i)).join('')
        rows.push(createRow(i + 1, cells, state.rowState))
    }

    return rows.join('');
}