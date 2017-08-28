import {
    setContextName
} from '../actions';

export interface Model {
    contextName: string;
}

const defaultState: Model = {
    contextName: 'default context name'
};

// Root Reducer
export default (state: Model = defaultState, action: any): Model => {
    if (setContextName.matchAction(action)) {
        return { ...state, contextName: action.payload.value };
    }
    return state;
};

// Selectors
export const getContextName = (s: Model) => s.contextName;