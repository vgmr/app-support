import {
    test
} from '../actions';


export interface Model {
    value: string
};

const defaultState: Model = {
    value: 'sciao'
};

// Root Reducer
export default (state: Model = defaultState, action: any): Model => {
    if (test.matchAction(action)) {
        return { ...state, value: action.payload.value }
    }
    return state;
}

// Selectors
export const getValue = (s: Model) => s.value;




