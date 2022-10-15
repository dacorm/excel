export interface Action {
    type: string
    payload?: any
}

export interface State {
    [key: string]: any

}

export interface Store {
    subscribe: (fn: (...args: any) => void) => { unsubscribe: () => void }
    dispatch: (action: Action) => void
    getState: () => State
}

export function createStore(rootReducer: (state: State, action: Action) => {}, initialState: State = {}) {
    let state = rootReducer({...initialState}, { type: '__INIT__' });
    let listeners: ((...args: any) => void)[] = [];

    return {
        subscribe(fn: (...args: any) => void) {
            listeners.push(fn);
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn);
                }
            }
        },
        dispatch(action: Action) {
            state = rootReducer(state, action)
            listeners.forEach((listener) => {
                listener(state);
            })
        },
        getState() {
            return state;
        },
    }
}