import { createAction } from 'app-support';

export const setContextName = createAction<{ value: string }>('SET_CONTEXT_NAME');