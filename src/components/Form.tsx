import type { ComponentChildren } from "preact"
import type { JSXInternal } from "preact/src/jsx"

export namespace Form {
    export type NavigationState = "idle" | "submitting" | "submitted" | "error"

    export interface Props {
        class?: string
        action: string
        method: string

        children: ComponentChildren

        onState?(value: NavigationState): void
        onOptomisticData?(value: FormData): void
        onResponseData?(value: any): void
        onError?(value: Error): void
    }
}

export function Form({ onState, onOptomisticData, onError, onResponseData, ...props }: Form.Props) {
    async function onSubmit($event: JSXInternal.TargetedEvent<HTMLFormElement, Event>) {
        $event.preventDefault()
        let form = $event.currentTarget
        let data = new FormData(form)

        onState?.("submitting")
        onOptomisticData?.(data)

        let response = await fetch(form.action, {
            method: form.method,
            body: data,
        })

        if (!response.ok) {
            onState?.("error")
            onError?.(new Error(`${response.status}: ${response.statusText}`))
            return
        }

        onState?.("submitted")
        onResponseData?.(await response.json())

        onState?.("idle")
    }

    return <form {...props} onSubmit={$event => onSubmit($event)} />
}
