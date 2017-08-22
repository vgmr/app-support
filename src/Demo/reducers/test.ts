import {
 test
} from '../actions';

// Store Model 
export interface Model {
    value:string
}

const defaultState: Model = {
    value: ''
}

// Root Reducer
export default (state: Model = defaultState, action: any): Model => {
    if (test.matchAction(action)) {
        return {value:'test'};
    }
    return state;
}

//Sekectors
export const getValue = (s:Model) => s.value;