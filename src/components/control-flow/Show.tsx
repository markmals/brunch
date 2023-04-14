import { ComponentChildren, ComponentType, Fragment } from "preact"

export namespace Show {
    export interface Props {
        when: boolean
        fallback?: ComponentType
        children: ComponentChildren
    }
}

export function Show({ when, fallback, children }: Show.Props) {
    if (when) return <Fragment>{children}</Fragment>
    if (fallback) return fallback
    return null
}
