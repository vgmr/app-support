import * as AS from '../';
import * as React from 'react';
import { } from 'react-redux';

const action = AS.createAction<{ix:string}>("MY_ACTION");

const conn = AS.appConnectorWithRouter<{id:string},{ text: string }>()(
    s => ({ value: 1 }),
    {action}
);

class Stateful extends conn.StatefulCompo<{ value: String }> {
    render() {
        return <div onClick={_ =>this.props.action({ix:'1'})}/>
            {this.props.text}
            {this.props.value}
            {this.state.value}
        </div>
    }
}

const Stateless = conn.StatelessCompo(props => {
    return <div onClick={_ => (props as any).action()}>
        {props.text}
        {props.value}
    </div>
});

const ConnectedStateful = conn.connect(Stateful);
const ConnectedStateless = conn.connect(Stateless);

export default (props: any) => <div>
    <ConnectedStateful text='hello' />
    <ConnectedStateless text='hello' />
</div>;

