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
    mdtp: MapDispatchToPropsParam<TPropsFromDispatch,TOwnProps>//    MapDispatchToPropsParam<TPropsFromDispatch,TOwnProps> //| TPropsFromDispatch
) => {
    return {
        connect: (compo: Component<TPropsFromState & TPropsFromDispatch & TOwnProps>) => {
            return connect(mstp, mdtp)(compo); //as any as InferableComponentEnhancerWithProps<TPropsFromState & TPropsFromDispatch, TOwnProps> 
        },
        StatefulCompo: class StatefulCompo<STATE> extends React.Component<TPropsFromState & TPropsFromDispatch & TOwnProps, STATE> {

        },
        StatelessCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps) => React.ReactElement<any>) => compo
    };
}
export { appConnector }