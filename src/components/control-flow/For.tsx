import { Fragment, ReactNode } from 'react';

export namespace For {
    export interface Props<T> {
        each: T[];
        children(item: T): ReactNode;
    }
}

export function For<T>({ each, children }: For.Props<T>) {
    return <Fragment>{each.map(children)}</Fragment>;
}
