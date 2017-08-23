import { connect, MapStateToProps, Component,MapDispatchToPropsObject } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import * as React from 'react';
//import {debounce} from 'lodash'
 
type Props<PS, PD, PR> = PS & PD & POwn<PR>;
type POwn<PR> = RouteComponentProps<PR>
type C<P> = Component<P>;

interface Config<PS, PD, PR> {
    mapStateToProps: MapStateToProps<PS, POwn<PR>>,
    actions: PD,
    checkProps?: (props: Props<PS, PD, PR>) => void
}

const apply = <PS, PD, PR>(config: Config<PS, PD, PR>) => {
    return {
        connectRouter: (compo: C<Props<PS, PD, PR>>) => {
                const mdtp = config.actions as any as MapDispatchToPropsObject;
                if (config.checkProps) {
                    const c0 = withCheckProps(config.checkProps)(compo) as any as C<Props<PS, PD, PR>>
                    const c1 = connect(config.mapStateToProps, mdtp)(c0);
                    return withRouter(c1);
                } else {
                    const c1 = connect(config.mapStateToProps, mdtp)(compo);
                    return withRouter(c1);
                }
            },
        StatefulCompo: class StatefulCompo<S> extends React.Component<Props<PS, PD, PR>, S> {

        },
        StatefulCompoWithProps: class StatefulCompo<P,S> extends React.Component<Props<PS, PD, PR> & P, S> {

        },
        StatelessCompo: (compo: (props:Props<PS,PD,PR>) => React.ReactElement<any>) => compo
    };
}

const connectRouter = <PR,PS,PD> (
           defaultRouteObj: PR,
           mapStateToProps: MapStateToProps<PS, POwn<PR>>,
           actions:PD,
           checkProps?: (props: Props<PS, PD, PR>, prev?: Props<PS, PD, PR> ) => void 
    ) => {
        return  apply({
            mapStateToProps,
            actions,
            checkProps
        } as Config<PS,PD,PR>);
}


function withCheckProps <P> (checkProps: (props:P, prev?:P)=>void){
        return (Compo: C<P>) => {
            class Controller extends React.Component<P, {}> {
                constructor (props:P) {
                    super(props);
                }
                componentDidMount () {
                    debounce(checkProps,300)(this.props);
                }

                componentWillReceiveProps  (next: P)  {
                    if (JSON.stringify(next) != JSON.stringify(this.props)) {
                        debounce(checkProps,300)(next, this.props);
                    }
                }

                render() {
                    return <Compo {...this.props as any}/>
                }
            }
            return Controller as any as React.Component<P,{}>
        }
}


export default connectRouter;
