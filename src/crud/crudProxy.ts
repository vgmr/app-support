

export interface Crud<TElement, TFilter, TKey> {
    search: (filter: TFilter) => Promise<TElement[]>,
    getById: (id: TKey) => Promise<TElement | undefined>
    save: (item: TElement) => Promise<TElement | string>,
    delete: (id: TKey) => Promise<boolean>,
    create: (item: Partial<TElement>) => Promise<TElement>
}