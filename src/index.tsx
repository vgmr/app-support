import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Demo/components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, configureStore } from 'app-support';
import * as reducers from './Demo/reducers';

const store = configureStore(reducers.default, true);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
