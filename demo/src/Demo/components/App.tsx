import * as React from 'react';
import { Route, Router } from 'app-support';
import { Provider, configureStore } from 'app-support';
import * as reducers from '../reducers';
import Home from './Home';

const store = configureStore(reducers.default, true);

class App extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route exact path="/:id" component={Home} />
                        <Route exact path="/" component={Home} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;