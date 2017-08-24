import { connect, MapStateToProps, Component as ReduxComponent,MapDispatchToPropsObject } from 'react-redux';
import {Component} from 'react';

type Props<STATE, DISPATCH> = STATE & DISPATCH;

interface Config<STATE, DISPATCH> {
    mapStateToProps: MapStateToProps<STATE, {}>,
    actions: DISPATCH,
}

const apply = <STATE, DISPATCH>(config: Config<STATE, DISPATCH>) => {
    return {
        connect: (compo: ReduxComponent<Props<STATE, DISPATCH>>) => {
            const mdtp = config.actions as any as MapDispatchToPropsObject;
            return connect(config.mapStateToProps, mdtp)(compo);
        },
        StatefulCompo: class StatefulCompo<S> extends Component<Props<STATE, DISPATCH>, S> {

        },
        StatefulCompoWithProps: class StatefulCompo<PROPS, STATE> extends Component<Props<STATE, DISPATCH> & PROPS, STATE> {

        },
        StatelessCompo: (compo: (props: Props<STATE, DISPATCH>) => React.ReactElement<any>) => compo
    };
}

export const appConnector = <STATE, DISPATCH>(
    mapStateToProps: MapStateToProps<STATE,{}>,
    actions: DISPATCH,
) => {
    return apply({
        mapStateToProps,
        actions,
    } as Config<STATE, DISPATCH>);
}

