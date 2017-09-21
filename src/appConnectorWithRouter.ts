import { connect, MapStateToPropsParam, MapDispatchToPropsParam, Component } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import * as React from 'react';

const appConnectorWithRouter = <TRouterProps, TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(
    mstp: MapStateToPropsParam<TPropsFromState, TOwnProps & RouteComponentProps<TRouterProps>>,
    mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps & RouteComponentProps<TRouterProps>>
) => {
    return {
        connect: (compo: Component<TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>>) => {
            return withRouter(connect(mstp, mdtp)(compo)) as React.ComponentClass<TOwnProps>;
        },
        StatefulCompo: class StatefulCompo<STATE> extends React.Component<TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>, STATE> {
            componentWillReceiveProps?(nextProps: Readonly<TPropsFromState & TPropsFromDispatch & TOwnProps>, nextContext: any):void;
            
        },
        StatelessCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) => React.ReactElement<any>) => compo
    };
}

export { appConnectorWithRouter }
