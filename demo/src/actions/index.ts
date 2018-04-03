import { createAction, listenConfiguration } from 'app-support';
listenConfiguration(c => {
    console.info('test');
});

export const setContextName = createAction<{ value: string }>('SET_CONTEXT_NAME');