import {
    connect as reduxConnect,
    MapStateToPropsParam,
    MapDispatchToPropsParam,
    //MapDispatchToPropsFactory,
    //InferableComponentEnhancerWithProps,
    Component
} from 'react-redux';
import * as React from 'react';

const appConnector = <TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(
    mstp: MapStateToPropsParam<TPropsFromState, TOwnProps>,
    mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps>//    MapDispatchToPropsParam<TPropsFromDispatch,TOwnProps> //| TPropsFromDispatch
) => {
    const connect = (compo: Component<TPropsFromState & TPropsFromDispatch & TOwnProps>) => {
        return reduxConnect(mstp, mdtp)(compo) as React.ComponentClass<TOwnProps>;
    };

    return {
        connect,

        StatefulCompo: class StatefulCompo<STATE> extends React.Component<TPropsFromState & TPropsFromDispatch & TOwnProps, STATE> {
        },

        PureCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps) => React.ReactElement<TOwnProps> | null) => connect(compo)
    };
}
export { appConnector }
