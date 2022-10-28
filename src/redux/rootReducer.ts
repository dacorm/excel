import {Action, State} from "../core/createStore";
import {CHANGE_TEXT, TABLE_RESIZE} from "./types";

export function rootReducer(state: State, action: Action) {
    let prevState;
    let field;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.payload.type === 'col' ? 'colState' : 'rowState';
            prevState = state[field] || {};
            prevState[action.payload.id] = action.payload.value;
            return {
                ...state,
                [field]: prevState
            }
        case CHANGE_TEXT:
            prevState = state['dataState'] || {};
            prevState[action.payload.id] = action.payload.value;
            return {
                ...state,
                currentText: action.payload.value,
                dataState: prevState,
            }
        default: return state
    }
}