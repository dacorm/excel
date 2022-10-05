const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
        <div class="cell" contenteditable="true"></div>
    `
}

function createCol(col: string) {
    return `
        <div class="column">
            ${col}
        </div>
    `
}

function createRow(index: number, content: string) {
    return `
        <div class="row">
            <div class="row-info">${index ?? ''}</div>
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
        const cells = new Array(colsCount).fill('').map(createCell).join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('');
}