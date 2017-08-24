import { createAction } from 'redux-helper';

export const setContextName = createAction<{value:string}>('SET_CONTEXT_NAME');