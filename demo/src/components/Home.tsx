import * as React from 'react';
import cr from '../connectors/home';
import { Link } from 'app-support';

class Home extends cr.StatefulCompo<{}> {
    render() {
        return (
            <div>
                <div>Id From Router Props: {this.props.match.params.id}</div>
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

export default cr.connect(Home);