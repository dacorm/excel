import {TABLE_RESIZE} from "./types";

export function tableResize(data: any) {
    return {
        type: TABLE_RESIZE,
        payload: data
    }
}