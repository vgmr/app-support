import {
    connect,
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
    return {
        connect: (compo: Component<TPropsFromState & TPropsFromDispatch & TOwnProps>) => {
            return connect(mstp, mdtp)(compo) as React.ComponentClass<TOwnProps>;
        },
        StatefulCompo: class StatefulCompo<STATE> extends React.Component<TPropsFromState & TPropsFromDispatch & TOwnProps, STATE> {
            componentWillReceiveProps?(nextProps: Readonly<TPropsFromState & TPropsFromDispatch & TOwnProps>, nextContext: any):void;
        },
        StatelessCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps) => React.ReactElement<any>) => compo
    };
}
export { appConnector }
