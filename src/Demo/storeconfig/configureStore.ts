import { createStore, compose, Store } from 'redux';
import root, { IAppState } from '../reducers';
import {createMiddleware} from 'app-support';

function configureStore(): Store<IAppState> {

    let enhancers = createMiddleware();

    // Dev Tools compose if available
    const wnd = window as any;
    const devTools = wnd.devToolsExtension !== undefined ? wnd.devToolsExtension() : (f: any) => f;

    if (devTools) {
        enhancers = compose(enhancers, devTools) as any;
    }


    
    // create store
    return createStore<IAppState>(root, enhancers);

}

export default configureStore;