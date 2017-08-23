import * as Redux from 'redux';
import * as fromTest from './test';

/*
export interface AppContext {
    store: Redux.Store<IAppState>;
}
*/
// Store Model
export interface Model {
    test: fromTest.Model;
}

// Root Reducer
export default Redux.combineReducers<Model>({
    test: fromTest.default
});

// Selectors
export const getValue = (s: Model) => fromTest.getValue(s.test);