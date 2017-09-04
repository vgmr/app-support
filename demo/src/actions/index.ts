import { createAction, listenConfiguration } from 'app-support';
listenConfiguration(c => console.log('configuration:', JSON.stringify(c, null, 2)));

export const setContextName = createAction<{ value: string }>('SET_CONTEXT_NAME');