export const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => {
        return state;
    }

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        for (let count = 0; count < listeners.length; count++) {
            listeners[count]();
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}