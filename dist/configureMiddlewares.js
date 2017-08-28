import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import checkedPromise, { createAction } from 'redux-helper';
import thunk from 'redux-thunk';
export { Provider };
function configureCheckedPromiseMiddleware(promiseCycleActions) {
    var psa = promiseCycleActions || {
        onStart: createAction('ON_START'),
        onEnd: createAction('ON_END'),
        showError: createAction('SHOW_ERROR')
    };
    var cpmOptions = {
        onStart: psa.onStart,
        onEnd: psa.onEnd,
        onError: function (msg) {
            var messageString = '';
            console.group('Error');
            if (typeof (msg) === 'string') {
                messageString = msg;
            }
            else if (Array.isArray(msg) && msg.length > 0) {
                messageString = msg[0].Message || 'Error';
            }
            else if (typeof (msg) === 'object') {
                var response = msg.response;
                if (response) {
                    messageString = response;
                }
                else {
                    messageString = msg.toString();
                }
            }
            else {
                messageString = JSON.stringify(msg);
            }
            console.warn(msg);
            console.groupEnd();
            return psa.showError(messageString);
        }
    };
    return cpmOptions;
}
var configureAll = function (promiseCycleActions) {
    var configuredCpm = checkedPromise(configureCheckedPromiseMiddleware());
    var middlewares = [configuredCpm, thunk];
    return middlewares;
};
export var createMiddleware = function (promiseCycleActions) { return applyMiddleware.apply(void 0, configureAll()); };
export function configureStore(root, useDevTools) {
    var enhancers = createMiddleware();
    // Dev Tools compose if available
    var wnd = window;
    var devTools = wnd.devToolsExtension !== undefined ? wnd.devToolsExtension() : function (f) { return f; };
    if (devTools && useDevTools) {
        enhancers = compose(enhancers, devTools);
    }
    // create store
    return createStore(root, enhancers);
}
//# sourceMappingURL=configureMiddlewares.js.map