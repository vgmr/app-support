import {
    connect as reduxConnect,
    MapStateToPropsParam,
    MapDispatchToPropsParam,
    Component
} from 'react-redux';
import * as React from 'react';

const appConnector = <TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(
    mstp: MapStateToPropsParam<TPropsFromState, TOwnProps, any>,
    mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps>//    MapDispatchToPropsParam<TPropsFromDispatch,TOwnProps> //| TPropsFromDispatch
) => {

    type Props = TPropsFromState & TPropsFromDispatch & TOwnProps;

    const connect = (compo: Component<Props>) => {
        return reduxConnect(mstp, mdtp)(compo) as React.ComponentClass<TOwnProps>;
    };

    return {
        connect,

        StatefulCompo: class StatefulComponent<State> extends React.Component<Props, State> {
            castProps(p: any) {
                return p as Props;
            }
        },

        PureCompo: (compo: (props: Props) => React.ReactElement<TOwnProps> | null) => connect(compo),

        castProps: (p: any) => p as Props,

        propsObject: {} as Props
    };
}
export { appConnector }

/*
export const conn = appConnector()(s => ({}), {});

export interface State { }

export class Test extends conn.StatefulCompo<State>{

    static getDerivedStateFromProps(props: any, state: State) {
        const p = conn.castProps(props);
        return { ...state, ...p }
    }

    render() {
        return null;
    }
}

*/