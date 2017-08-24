import * as fromContext from './context';

// Store Model
export interface Model {
    context: fromContext.Model;
}

// Root Reducer
export default Redux.combineReducers<Model>({
    context: fromContext.default
});

// Selectors
export const getContextName = (s: Model) => fromContext.getContextName(s.context);