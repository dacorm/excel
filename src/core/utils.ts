export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isEqual(a: any, b: any) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}