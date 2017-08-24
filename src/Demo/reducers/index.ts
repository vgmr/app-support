import * as Redux from 'redux';
import * as fromContext from './context';

// Store Model
export interface Model {
    test: fromContext.Model;
}

// Root Reducer
export default Redux.combineReducers<Model>({
    test: fromContext.default
});

// Selectors
export const getContextName = (s: Model) => fromContext.getContextName(s.test);