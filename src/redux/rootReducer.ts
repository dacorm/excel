import {Action, State} from "../core/createStore";
import {TABLE_RESIZE} from "./types";

export function rootReducer(state: State, action: Action) {
    let field;
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.payload.type === 'col' ? 'colState' : 'rowState';
            const prevState = state[field] || {};
            prevState[action.payload.id] = action.payload.value;
            return {
                ...state,
                [field]: prevState
            }
        default: return state
    }
}