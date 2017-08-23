import { Action as RHAction } from 'redux-helper';
import * as Redux from 'redux';

export interface Action<TPayload> {
    (payload?: TPayload): RHAction<TPayload>;
    matchAction(action: Redux.Action): action is RHAction<TPayload>;
    type: string;
}


export class ReducerBuilder<Model> {
    private defaultState: Model;
    private solver: Array<(state: Model, act: Action<any>) => Model |undefined>;

    constructor(defaultState: Model) {
        this.defaultState = defaultState;
        this.solver = [];
    }

    addAction<T>(action: Action<T>, cb: (state: Model, payload: T) => Model) {
        this.solver.push( (s,a) =>{
            if (a.matchAction(action)) {
                return cb(s,action.payload);
            }
            return undefined;
        });
    }

    getReducerFunction () {
        return (state: Model = this.defaultState, action:Action<any> ) => {
            for (const solve of this.solver) {
                const res = solve(state,action);
                if (res) return res;
            }
            return state;
        }
    }

}
