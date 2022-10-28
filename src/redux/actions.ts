import {CHANGE_TEXT, TABLE_RESIZE} from "./types";
import {Dom} from "../core/dom";

export function tableResize(data: any) {
    return {
        type: TABLE_RESIZE,
        payload: data
    }
}

export function changeText(text: Record<string, string | Dom>) {
    return {
        type: CHANGE_TEXT,
        payload: text
    }
}