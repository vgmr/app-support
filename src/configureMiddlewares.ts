import { Middleware, applyMiddleware, Store, AnyAction, compose, createStore, Reducer } from 'redux';
import { Provider } from 'react-redux';
import checkedPromise, { CheckedPromiseMiddlewareOptions, CreateAction, createAction } from 'redux-helper';
import thunk from 'redux-thunk';

export { AnyAction, Provider };

function configureCheckedPromiseMiddleware(promiseCycleActions?: PromiseCycleActions) {
    const psa = promiseCycleActions || {
        onStart: createAction<string>('ON_START'),
        onEnd: createAction<void>('ON_END'),
        onError: createAction<{ messageString: string, originalError: any }>('SHOW_ERROR')
    };

    const cpmOptions: CheckedPromiseMiddlewareOptions = {
        onStart: psa.onStart,
        onEnd: psa.onEnd,
        onError: (msg: string | { response: string } | Error | any[]) => {
            let messageString = '';
            console.group('Error');
            if (typeof (msg) === 'string') {
                messageString = msg;
            } else if (Array.isArray(msg) && msg.length > 0) {
                messageString = msg[0].Message || 'Error';

            } else if (typeof (msg) === 'object') { //SWAGGER EXCEPTION
                var { response } = msg as { response: string };
                if (response) {
                    messageString = response;
                } else {
                    messageString = msg.toString();
                }
            } else {
                messageString = JSON.stringify(msg);
            }
            console.warn(msg);
            console.groupEnd();
            return psa.onError( { messageString, originalError: msg });
        }
    };

    return cpmOptions;
}

const configureAll = (promiseCycleActions?: PromiseCycleActions): Middleware[] => {
    const configuredCpm = checkedPromise(configureCheckedPromiseMiddleware());
    const middlewares = [configuredCpm, thunk];
    return middlewares;
};

export const createMiddleware = (promiseCycleActions?: PromiseCycleActions) => applyMiddleware(...configureAll());

export interface PromiseCycleActions {
    onStart: CreateAction<string>,
    onEnd: CreateAction<void>,
    onError: CreateAction<{messageString:string, originalError:any}>
}

export function configureStore<IAppState>(root: Reducer<IAppState>, useDevTools?: boolean): Store<IAppState> {

    let enhancers = createMiddleware();

    // Dev Tools compose if available
    const wnd = window as any;
    const devTools = wnd.devToolsExtension !== undefined ? wnd.devToolsExtension() : (f: any) => f;

    if (devTools && useDevTools) {
        enhancers = compose(enhancers, devTools) as any;
    }

    // create store
    return createStore<IAppState>(root, enhancers);

}
