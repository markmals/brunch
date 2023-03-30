import type { User } from "@prisma/client"
import { Response as SelectedResponse } from "@prisma/client"
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "solid-headless"
import { createMemo, createSignal, For, JSX, Show } from "solid-js"
import { capitalize } from "../lib/capitalize"
import { classList } from "../lib/classList"

export function Rsvp({ user, actionData }: Rsvp.Props) {
    let [selectedResponse, setSelectedResponse] = createSignal<SelectedResponse | null>(null)
    let [willBringPlusOne, setPlusOne] = createSignal<boolean | null>(null)

    let isYes = createMemo(() => selectedResponse() === "YES")
    let isSelected = createMemo(() => !!selectedResponse())

    let title = createMemo(() => {
        switch (selectedResponse()) {
            case "YES":
                return "Hooray! 🎉"
            case "MAYBE":
                return "No worries 🤠"
            case "NO":
                return "We'll miss you! 🙁"
        }
    })

    let description = createMemo(() => {
        switch (selectedResponse()) {
            case "YES":
                return "I just need some info and then you'll be confirmed!"
            case "MAYBE":
                return "When you know for sure, you can come back and update your response."
            case "NO":
                return "Maybe we'll see you next time."
        }
    })

    return (
        <>
            <RadioGroup
                class="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={setSelectedResponse}
                value={selectedResponse}
            >
                {({ isSelected }) => (
                    <>
                        <RadioGroupLabel class="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 sm:mb-0">
                            Can you make it?
                        </RadioGroupLabel>
                        <div class="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                            <For each={Rsvp.OPTIONS}>
                                {/* isSelected(option.response as any) */}
                                {option => <Rsvp.Button option={option} isSelected={false} />}
                            </For>
                        </div>
                    </>
                )}
            </RadioGroup>

            <Show when={isSelected()}>
                <hr class="border-t border-black/10" />

                <div class="px-4 py-6 sm:px-6">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">
                        {title ?? "Unknown"}
                    </h3>
                    <div class="mt-2 max-w-xl text-sm text-gray-500">
                        <p>{description ?? "Unknown"}</p>
                    </div>
                    <form class="mt-5 w-full sm:flex sm:items-center" method="post">
                        <input
                            id="response"
                            name="response"
                            type="hidden"
                            value={selectedResponse() ?? ""}
                        />

                        <div class="flex w-full flex-col divide-y divide-black/10">
                            <div class="grid grid-rows-2 items-center border-t border-black/10 py-6 sm:grid-cols-2 sm:grid-rows-none">
                                <label
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    for="name"
                                >
                                    Name
                                </label>
                                <input
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={user?.name}
                                    id="name"
                                    name="name"
                                    placeholder="Jane Doe"
                                    type="text"
                                />
                            </div>

                            <Show when={isYes()}>
                                <RadioGroup
                                    class="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                                    onChange={setPlusOne}
                                    value={willBringPlusOne}
                                >
                                    {({ isSelected }) => (
                                        <>
                                            <div class="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                                <RadioGroupLabel class="block text-sm font-medium leading-6 text-gray-900">
                                                    Will you be bringing a plus-one?
                                                </RadioGroupLabel>

                                                <RadioGroupLabel
                                                    as="p"
                                                    class="text-sm text-gray-500"
                                                    id="plus-one-description"
                                                >
                                                    A guest who will not be responding seprately
                                                </RadioGroupLabel>
                                            </div>
                                            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                <For each={[true, false]}>
                                                    {/*
                                                    isSelected(plusOne as any)
                                                                    ? "border-transparent"
                                                                    : "border-gray-300",
                                                    */}
                                                    {plusOne => (
                                                        <RadioGroupOption
                                                            class={classList(
                                                                "border-transparent",
                                                                "relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none"
                                                            )}
                                                            value={plusOne}
                                                        >
                                                            {({ isSelected }) => (
                                                                <>
                                                                    <span class="flex flex-1">
                                                                        <span class="flex flex-col">
                                                                            <RadioGroupLabel
                                                                                as="span"
                                                                                class="block text-sm font-medium text-gray-900"
                                                                            >
                                                                                {plusOne
                                                                                    ? "Yes"
                                                                                    : "No"}
                                                                            </RadioGroupLabel>
                                                                        </span>
                                                                    </span>
                                                                    <CheckCircleIcon
                                                                        aria-hidden="true"
                                                                        class={classList(
                                                                            !isSelected()
                                                                                ? "invisible"
                                                                                : "",
                                                                            "h-5 w-5 text-indigo-600"
                                                                        )}
                                                                    />
                                                                    <span
                                                                        aria-hidden="true"
                                                                        class={classList(
                                                                            isSelected()
                                                                                ? "border-indigo-600"
                                                                                : "border-transparent",
                                                                            "pointer-events-none absolute -inset-px rounded-lg border-2"
                                                                        )}
                                                                    />
                                                                </>
                                                            )}
                                                        </RadioGroupOption>
                                                    )}
                                                </For>
                                            </div>
                                        </>
                                    )}
                                </RadioGroup>
                                <div class="grid auto-rows-min gap-4 py-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:pb-6">
                                    <div class="flex flex-col justify-center gap-2 sm:gap-0">
                                        <label
                                            class="block text-sm font-medium leading-6 text-gray-900"
                                            for="dietary-restrictions"
                                        >
                                            Do you {willBringPlusOne() && "or your plus-one "}
                                            have any dietary restrictions?
                                        </label>

                                        <p
                                            class="text-sm text-gray-500"
                                            id="dietary_restrictions_description"
                                        >
                                            Leave blank if not applicable
                                        </p>
                                    </div>

                                    {/* FIXME: This doesn't retain its state when the response is switched away and then back */}
                                    <textarea
                                        class="block w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                        value={user?.dietaryRestrictions ?? ""}
                                        id="dietary-restrictions"
                                        name="dietary-restrictions"
                                        placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                        rows={2}
                                    />
                                </div>
                            </Show>

                            <div class="flex items-center justify-end gap-x-6 pb-2 pt-6">
                                <button
                                    class="rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                    disabled={!!actionData?.ok}
                                    type="submit"
                                >
                                    {actionData?.ok ? "Update Response" : "Submit Response"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Show>
        </>
    )
}

export namespace Rsvp {
    export interface Option {
        response: SelectedResponse
        icon: (props: JSX.IntrinsicElements["svg"]) => JSX.Element
    }

    export const OPTIONS: Rsvp.Option[] = [
        { response: SelectedResponse.YES, icon: CheckIcon },
        { response: SelectedResponse.MAYBE, icon: QuestionMarkIcon },
        { response: SelectedResponse.NO, icon: XMarkIcon },
    ]

    export interface Props {
        user: User | null
        actionData?: any
    }

    export namespace Button {
        export interface Props {
            option: Rsvp.Option
            isSelected: boolean
        }
    }

    export function Button({ option, isSelected }: Rsvp.Button.Props) {
        let isYes = createMemo(() => option.response === "YES")
        let isNo = createMemo(() => option.response === "NO")

        return (
            <RadioGroupOption
                class={classList(
                    "cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-sm",
                    isSelected
                        ? isYes()
                            ? "bg-green-600 text-white"
                            : isNo()
                            ? "bg-red-600 text-white"
                            : "bg-gray-500 text-white"
                        : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                )}
                value={option.response}
            >
                {({ isSelected }) => {
                    const Icon = option.icon
                    return (
                        <div class="flex select-none flex-row items-center justify-center gap-x-2">
                            <Icon
                                classList={{
                                    "text-white": isSelected(),
                                    "text-gray-500": !isSelected(),
                                }}
                            />
                            {capitalize(option.response)}
                        </div>
                    )
                }}
            </RadioGroupOption>
        )
    }
}

function CheckIcon(props: JSX.IntrinsicElements["svg"]) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    )
}

function QuestionMarkIcon(props: JSX.IntrinsicElements["svg"]) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
        >
            <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
            />
        </svg>
    )
}

function XMarkIcon(props: JSX.IntrinsicElements["svg"]) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    )
}

function CheckCircleIcon(props: JSX.IntrinsicElements["svg"]) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
        >
            <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clip-rule="evenodd"
            />
        </svg>
    )
}
