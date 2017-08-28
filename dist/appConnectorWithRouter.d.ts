/// <reference types="react" />
/// <reference types="react-redux" />
import { MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as React from 'react';
declare const appConnectorWithRouter: <TRouterProps, TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(mstp: MapStateToPropsParam<TPropsFromState, TOwnProps & RouteComponentProps<TRouterProps>>, mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps & RouteComponentProps<TRouterProps>>) => {
    connect: (compo: React.ComponentType<TPropsFromState & TPropsFromDispatch & TOwnProps>) => React.ComponentClass<Pick<TPropsFromState & TPropsFromDispatch & TOwnProps, ({
        [P in keyof (TPropsFromState & TPropsFromDispatch & TOwnProps)]: P;
    } & {
        [P in keyof (TPropsFromState & TPropsFromDispatch)]: never;
    } & {
        [x: string]: never;
    })[keyof (TPropsFromState & TPropsFromDispatch & TOwnProps)]> & TOwnProps & RouteComponentProps<TRouterProps>>;
    StatefulCompo: {
        new <STATE>(props?: (TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) | undefined, context?: any): {
            setState<K extends keyof STATE>(f: (prevState: STATE, props: TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) => Pick<STATE, K>, callback?: (() => any) | undefined): void;
            setState<K extends keyof STATE>(state: Pick<STATE, K>, callback?: (() => any) | undefined): void;
            forceUpdate(callBack?: (() => any) | undefined): void;
            render(): false | JSX.Element | null;
            props: Readonly<{
                children?: React.ReactNode;
            }> & Readonly<TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>>;
            state: Readonly<STATE>;
            context: any;
            refs: {
                [key: string]: React.ReactInstance;
            };
        };
    };
    StatelessCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) => React.ReactElement<any>) => (props: TPropsFromState & TPropsFromDispatch & TOwnProps & RouteComponentProps<TRouterProps>) => React.ReactElement<any>;
};
export { appConnectorWithRouter };
