import * as Redux from 'redux';

export interface AppContext {
    store: Redux.Store<IAppState>;
}

// Store Model
export interface IAppState {
}

// Root Reducer
export default Redux.combineReducers<IAppState>({
});

// Selectors