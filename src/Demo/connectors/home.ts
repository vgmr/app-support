import { appConnector } from 'app-support';
import { setContextName } from '../actions';
import * as reducers from '../reducers';

export default appConnector<{ id: string }>()(
    (s) => ({
        contextName: reducers.getContextName(s)
    }), {
        setContextName
    });