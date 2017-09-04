import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { loadConfiguration } from 'app-support';

loadConfiguration('./config.json').then(cfg => {
    ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
});
