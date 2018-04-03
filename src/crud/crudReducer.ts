import { CrudActions } from "./crudActions";

export interface CrudModel<TElement> {
    items: TElement[] | undefined,
    item: TElement | undefined,
    itemStatus: 'saved' | 'normal',
    error?: string,
    filter: any
}

export const crudReducerCreate = <TElement, TFilter, TKey>(cw: CrudActions<TElement, TFilter, TKey>, defaultFilter:TFilter) => {
    const defaultState: CrudModel<TElement> = {
        items: undefined,
        item: undefined,
        itemStatus: 'normal',
        filter: defaultFilter
    }
    return {
        // Root Reducer
        reducer: (state: CrudModel<TElement> = defaultState, action: any): CrudModel<TElement> => {
            if (cw.save.success.matchAction(action)) {
                if (typeof action.payload === 'string') {
                    return { ...state, error: action.payload }
                } else {
                    return { ...state, item: action.payload, items: undefined, itemStatus: 'saved', error: undefined };
                }
            } else if (cw.save.exec.matchOnError(action)) {
                return { ...state, error: action.promiseActionError }
            } else if (cw.delete.success.matchAction(action)) {
                return { ...state, item: undefined, items: undefined, itemStatus: 'saved' };
            } else if (cw.search.success.matchAction(action)  ) {
                return { ...state, items: action.payload };
            } else if (cw.getById.success.matchAction(action)) {
                return { ...state, item: action.payload };
            } else if (cw.new.success.matchAction(action)) {
                return { ...state, item: action.payload };
            } else if (cw.setCurrent.matchAction(action)) {
                return { ...state, item: action.payload };
            } else if (cw.reset.matchAction(action)) {
                return { ...state, itemStatus: 'normal' };
            } else if (cw.setFilter.matchAction(action)) {
                return { ...state, filter: action.payload }
            }
            return state;
        },
        selectors: (state: CrudModel<TElement>): CrudSelectors<TElement, TFilter> => ({
            all: state.items,
            current: state.item,
            status: state.itemStatus,
            filter: state.filter
        })
    }
}

export interface CrudSelectors<TElement, TFilter> {
    all: TElement[] | undefined,
    current: TElement | undefined,
    status: 'normal' | 'saved',
    filter?: TFilter
}