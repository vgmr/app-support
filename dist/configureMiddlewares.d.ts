import { Store, AnyAction, Reducer } from 'redux';
import { Provider } from 'react-redux';
import { CreateAction } from 'redux-helper';
export { AnyAction, Provider };
export declare const createMiddleware: (promiseCycleActions?: PromiseCycleActions | undefined) => <S>(next: (reducer: Reducer<S>, preloadedState?: S | undefined) => Store<S>) => (reducer: Reducer<S>, preloadedState?: S | undefined) => Store<S>;
export interface PromiseCycleActions {
    onStart: CreateAction<string>;
    onEnd: CreateAction<void>;
    showError: CreateAction<string>;
}
export declare function configureStore<IAppState>(root: Reducer<IAppState>, useDevTools?: boolean): Store<IAppState>;
