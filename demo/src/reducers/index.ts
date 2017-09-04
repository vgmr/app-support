import * as fromContext from './context';
import { Redux } from 'app-support';

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