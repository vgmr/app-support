import { createAction } from 'redux-helper';

export const test = createAction<{value:string}>('TEST');