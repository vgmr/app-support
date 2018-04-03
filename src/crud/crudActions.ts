import { createAction } from "redux-helper/dist/actionCreators";
import { createPromiseAction } from "redux-helper";
import { CreatePromiseAction, CreateAction } from "redux-helper";
import { Crud } from "./crudProxy";

interface ActionWrapper<T, R> {
    success: CreateAction<R>,
    exec: CreatePromiseAction<T>
}
export function wrapServiceToActions<T, R>(name: string, promise: (parms: T) => Promise<R>): ActionWrapper<T, R> {
    const success = createAction<R>(name + "_SUCCESS");
    const exec = createPromiseAction(name, promise, success);
    return {
        success,
        exec
    }
}

export interface CrudActions<TElement, TFilter, TKey> {
    search: ActionWrapper<TFilter, TElement[]>,
    getById: ActionWrapper<TKey, TElement | undefined>,
    new: ActionWrapper<Partial<TElement>, TElement>,
    save: ActionWrapper<TElement, string | TElement>,
    delete: ActionWrapper<TKey, boolean>,
    setCurrent: CreateAction<TElement>
    reset: CreateAction<{}>
    setFilter: CreateAction<TFilter>
    tag:string
}


export function crudActionsCreate<TElement, TFilter, TKey>(svc: Crud<TElement, TFilter, TKey>, tag: string): CrudActions<TElement, TFilter, TKey> {
    const uTAG = tag.toUpperCase();
    let ret = {
        search: wrapServiceToActions("SEARCH_" + uTAG, svc.search),
        getById: wrapServiceToActions("GET_BY_ID_" + uTAG, svc.getById),
        new: wrapServiceToActions("NEW_" + uTAG, svc.create),
        save: wrapServiceToActions("SAVE_" + uTAG, svc.save),
        delete: wrapServiceToActions("DELETE_" + uTAG, svc.delete),
        setCurrent: createAction<TElement>("SET_CURRENT_" + uTAG),
        reset: createAction("RESET_" + uTAG),
        setFilter: createAction<TFilter>("SET_FILTER_" + uTAG),
        tag
    };
    return ret;
}
