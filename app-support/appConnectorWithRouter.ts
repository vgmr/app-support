import { connect, MapStateToProps, Component as ReduxComponent,MapDispatchToPropsObject } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import {Component} from 'react';

type Props<STATE, DISPATCH, ROUTER> = STATE & DISPATCH & RouteComponentProps<ROUTER>;

interface Config<STATE, DISPATCH, ROUTER> {
    mapStateToProps: MapStateToProps<STATE, RouteComponentProps<ROUTER>>,
    actions: DISPATCH,
}

const apply = <STATE, DISPATCH, ROUTER>(config: Config<STATE, DISPATCH, ROUTER>) => {
    return {
        connect: (compo: ReduxComponent<Props<STATE, DISPATCH, ROUTER>>) => {
            const mdtp = config.actions as any as MapDispatchToPropsObject;
            const c1 = connect(config.mapStateToProps, mdtp)(compo);
            return withRouter(c1);
        },
        StatefulCompo: class StatefulCompo<S> extends Component<Props<STATE, DISPATCH, ROUTER>, S> {

        },
        StatefulCompoWithProps: class StatefulCompo<PROPS, STATE> extends Component<Props<STATE, DISPATCH, ROUTER> & PROPS, STATE> {

        },
        StatelessCompo: (compo: (props: Props<STATE, DISPATCH, ROUTER>) => React.ReactElement<any>) => compo
    };
}

export const appConnectorWithRouter = <ROUTER>() => <STATE, DISPATCH>(
    mapStateToProps: MapStateToProps<STATE, RouteComponentProps<ROUTER>>,
    actions: DISPATCH,
) => {
    return apply({
        mapStateToProps,
        actions,
    } as Config<STATE, DISPATCH, ROUTER>);
}

