/// <reference types="react" />
/// <reference types="react-redux" />
import { MapStateToPropsParam, MapDispatchToPropsParam } from 'react-redux';
import * as React from 'react';
declare const appConnector: <TOwnProps>() => <TPropsFromState, TPropsFromDispatch>(mstp: MapStateToPropsParam<TPropsFromState, TOwnProps>, mdtp: MapDispatchToPropsParam<TPropsFromDispatch, TOwnProps>) => {
    connect: (compo: React.ComponentType<TPropsFromState & TPropsFromDispatch & TOwnProps>) => React.ComponentClass<Pick<TPropsFromState & TPropsFromDispatch & TOwnProps, ({
        [P in keyof (TPropsFromState & TPropsFromDispatch & TOwnProps)]: P;
    } & {
        [P in keyof (TPropsFromState & TPropsFromDispatch)]: never;
    } & {
        [x: string]: never;
    })[keyof (TPropsFromState & TPropsFromDispatch & TOwnProps)]> & TOwnProps>;
    StatefulCompo: {
        new <STATE>(props?: (TPropsFromState & TPropsFromDispatch & TOwnProps) | undefined, context?: any): {
            setState<K extends keyof STATE>(f: (prevState: STATE, props: TPropsFromState & TPropsFromDispatch & TOwnProps) => Pick<STATE, K>, callback?: (() => any) | undefined): void;
            setState<K extends keyof STATE>(state: Pick<STATE, K>, callback?: (() => any) | undefined): void;
            forceUpdate(callBack?: (() => any) | undefined): void;
            render(): false | JSX.Element | null;
            props: Readonly<{
                children?: React.ReactNode;
            }> & Readonly<TPropsFromState & TPropsFromDispatch & TOwnProps>;
            state: Readonly<STATE>;
            context: any;
            refs: {
                [key: string]: React.ReactInstance;
            };
        };
    };
    StatelessCompo: (compo: (props: TPropsFromState & TPropsFromDispatch & TOwnProps) => React.ReactElement<any>) => (props: TPropsFromState & TPropsFromDispatch & TOwnProps) => React.ReactElement<any>;
};
export { appConnector };
