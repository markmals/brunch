import { ComponentChildren, Fragment } from 'preact';

export namespace For {
    export interface Props<T> {
        each: T[];
        children(item: T): ComponentChildren;
    }
}

export function For<T>({ each, children }: For.Props<T>) {
    return <Fragment>{each.map(children)}</Fragment>;
}
