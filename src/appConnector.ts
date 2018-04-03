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

            set derivedStateFromProps(value: (nextProps: Props, prevState: State) => State) {
                StatefulComponent["getDeriverdStateFromProps"] = value;
            }

        },

        PureCompo: (compo: (props: Props) => React.ReactElement<TOwnProps> | null) => connect(compo)
    };
}
export { appConnector }
