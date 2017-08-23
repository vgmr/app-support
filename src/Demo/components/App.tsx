import * as React from 'react';
import { Route, Router } from 'app-support';
import Test from './Test';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Test} />
            </Router>
        );
    }
}

export default App;