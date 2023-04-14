import { ComponentChildren, Fragment } from 'preact';

export namespace Show {
    export interface Props {
        when: boolean;
        children: ComponentChildren;
    }
}

export function Show({ when, children }: Show.Props) {
    if (when) return <Fragment>{children}</Fragment>;
    return null;
}
