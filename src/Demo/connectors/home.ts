import { appConnectorWithRouter } from 'app-support';
import { setContextName } from '../actions';
import * as reducers from '../reducers';

export default appConnectorWithRouter<{ id: string }, {title:string}>()(
    (s) => ({
        contextName: reducers.getContextName(s)
    }),
    {setContextName}
    /*
    (d) => {
        return {
            setContextName: (value: string) => {
               d( setContextName({ value }));
            }
        };
    }
    */
);