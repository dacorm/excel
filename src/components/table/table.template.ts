const CODES = {
    A: 65,
    Z: 90
}

function createCell(row: number) {
    return function(_: number, col: number) {
        return `
        <div class="cell" contenteditable="true" data-col="${col}" data-id="${row}:${col}" data-type="cell"></div>
    `
    }
}

function createCol(col: string, index: number) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index: number, content: string) {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''

    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ?? ''}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(el: string, index: number) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount: number = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows: string[] = [];

    const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('')

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount).fill('').map(createCell(i)).join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('');
}