import { Fragment, ReactNode, ReactNode } from 'react';

export namespace Show {
    export interface Props {
        when: boolean;
        children: ReactNode;
    }
}

export function Show({ when, children }: Show.Props) {
    if (when) return <Fragment>{children}</Fragment>;
    return null;
}
