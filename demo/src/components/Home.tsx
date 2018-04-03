import * as React from 'react';
import { Link } from 'app-support';
import { appConnector } from 'app-support';
import { setContextName } from '../actions';
import * as reducers from '../reducers';

const conn = appConnector<{ id: string, title: string }>()(
    s => ({
        contextName: reducers.getContextName(s)
    }),
    { setContextName }

);
class Home extends conn.StatefulCompo<{}> {

    render() {
        return (
            <div>
                <div>Id From Router Props: {this.props.id}</div>
                <div>Context Name From State: {this.props.contextName}</div>
                <div>Title from Own Props: {this.props.title}</div>
                <hr />
                <input type="text" onChange={e => this.props.setContextName({ value: e.currentTarget.value })} />
                <hr />
                <Link to={`/${this.props.contextName}`}>Click Here to move to {this.props.contextName}</Link>
            </div>
        );
    }
}

export default conn.connect(Home);