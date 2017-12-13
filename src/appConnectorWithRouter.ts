import { connect as reduxConnect, MapStateToPropsParam, MapDispatchToPropsParam, Component } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import * as React from 'react';

const appConnectorWithRouter = <TRouterProps, TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(
    mstp: MapStateToPropsParam<TPropsFromState, TOwnProps & RouteComponentProps<TRouterProps>>,
    mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps & RouteComponentProps<TRouterProps>>
) => {
    const connect = (compo: Component<TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>>) => {
        return withRouter(reduxConnect(mstp, mdtp)(compo)) as any as React.ComponentClass<TOwnProps>;
    };

    return {
        connect,
        StatefulCompo: class StatefulCompo<STATE> extends React.Component<TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>, STATE> {
        },
        PureCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) => React.ReactElement<TOwnProps>) => connect(compo)
    };
}

export { appConnectorWithRouter }
