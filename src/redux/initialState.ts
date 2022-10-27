import {State} from "../core/createStore";
import {storage} from "../utils/storage";

const defaultState: State = {
    rowState: {},
    colState: {}
}

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;