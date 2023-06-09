import { useComputed, useSignalEffect as useEffect, useSignal } from "@preact/signals"
import type { User } from "@prisma/client/edge"
import { Response as UserResponse } from "@prisma/client/edge"
import { CheckOutline, QuestionMarkCircleOutline, XMarkOutline } from "preact-heroicons"
import type { JSXInternal } from "preact/src/jsx"
import { Label, RadioGroup, SSRProvider } from "react-aria-components"
import { Form } from "./Form"
import { PlusOneButtons } from "./PlusOneButtons"
import { RsvpButton } from "./RsvpButton"
import { For } from "./control-flow/For"
import { Show } from "./control-flow/Show"

type InputEvent = JSXInternal.TargetedEvent<HTMLInputElement, Event>
type TextAreaEvent = JSXInternal.TargetedEvent<HTMLTextAreaElement, Event>

export function Rsvp({ user: initialUser }: Rsvp.Props) {
    let user = useSignal(initialUser ?? undefined)

    let navigation = useSignal<Form.NavigationState>("idle")

    let selectedResponse = useSignal(user.value?.response)

    let name = useSignal(user.value?.name)
    let plusOne = useSignal(user.value?.plusOne)
    let dietaryRestrictions = useSignal(user.value?.dietaryRestrictions)

    const setName = ($event: InputEvent) => (name.value = $event.currentTarget.value)
    const setDietaryRestrictions = ($event: TextAreaEvent) =>
        (dietaryRestrictions.value = $event.currentTarget.value)

    useEffect(() => {
        selectedResponse.value = user.value?.response ?? undefined
        name.value = user.value?.name
        plusOne.value = user.value?.plusOne
        dietaryRestrictions.value = user.value?.dietaryRestrictions
    })

    let isDirty = useComputed(() => {
        let responseChanged = selectedResponse.value !== user.value?.response
        let nameChanged = name.value !== user.value?.name
        let plusOneChanged =
            selectedResponse.value === UserResponse.YES && plusOne.value !== user.value?.plusOne
        let dietChanged =
            selectedResponse.value === UserResponse.YES &&
            dietaryRestrictions.value !== user.value?.dietaryRestrictions
        return responseChanged || nameChanged || plusOneChanged || dietChanged
    })

    let isYes = useComputed(() => selectedResponse.value === UserResponse.YES)
    let isSelected = useComputed(() => !!selectedResponse.value)

    let title = useComputed(() => {
        switch (selectedResponse.value) {
            case UserResponse.YES:
                return "Hooray! 🥳"
            case UserResponse.MAYBE:
                return "No worries 🤠"
            case UserResponse.NO:
                return "We'll miss you! 🙁"
        }
    })

    let description = useComputed(() => {
        switch (selectedResponse.value) {
            case UserResponse.YES:
                return "I just need some info and then you'll be confirmed!"
            case UserResponse.MAYBE:
                return "When you know for sure, you can come back and update your response."
            case UserResponse.NO:
                return "Maybe we'll see you next time."
        }
    })

    let buttonTitle = useComputed(() => {
        let isIdle = navigation.value === "idle"
        let hasResponed = !!user.value?.response
        if (isIdle) {
            return `${hasResponed ? "Update" : "Submit"} Response`
        } else {
            return hasResponed ? "Updating..." : "Submitting..."
        }
    })

    let buttonIsDisabled = useComputed(() => !isDirty.value || navigation.value !== "idle")

    return (
        <SSRProvider>
            <RadioGroup
                className="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={$event =>
                    (selectedResponse.value = ($event as UserResponse | undefined) ?? undefined)
                }
                value={selectedResponse.value ?? ""}
            >
                <Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 dark:text-gray-50 sm:mb-0">
                    Can you make it?
                </Label>

                <div class="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    <For each={Rsvp.OPTIONS}>
                        {option => <RsvpButton option={option} key={option.response} />}
                    </For>
                </div>
            </RadioGroup>

            <Show when={isSelected.value}>
                <hr class="border-t border-black/10 dark:border-white/5" />

                <div class="py-6">
                    <h3 class="px-6 text-base font-semibold leading-6 text-gray-900 dark:text-gray-50">
                        {title}
                    </h3>
                    <div class="mt-2 max-w-xl px-6 text-sm text-gray-500">
                        <p>{description}</p>
                    </div>

                    <Form
                        class="mt-5 flex w-full flex-col items-end"
                        action="/response"
                        method="POST"
                        onState={$event => (navigation.value = $event)}
                        onResponseData={$event => (user.value = $event)}
                    >
                        <input
                            id="short-code"
                            name="short-code"
                            type="hidden"
                            value={user.value?.shortCode}
                        />

                        <input
                            id="response"
                            name="response"
                            type="hidden"
                            value={selectedResponse.value ?? ""}
                        />

                        <div class="flex w-full flex-col divide-y divide-black/10 px-6 dark:divide-white/5">
                            <div class="grid grid-rows-2 items-center border-t border-black/10 py-6 dark:border-white/5 sm:grid-cols-2 sm:grid-rows-none">
                                <label
                                    class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                    for="name"
                                >
                                    Name
                                </label>
                                <input
                                    class="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:focus:bg-black sm:text-sm sm:leading-6"
                                    id="name"
                                    value={name}
                                    onInput={$event => setName($event)}
                                    name="name"
                                    placeholder="Jane Doe"
                                    type="text"
                                />
                            </div>

                            <Show when={isYes.value}>
                                <RadioGroup
                                    className="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                                    value={plusOne?.toString() ?? ""}
                                    onChange={$event => (plusOne.value = $event === "true")}
                                    name="plus-one"
                                >
                                    <div class="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                            Will you be bringing a plus-one?
                                        </Label>

                                        <Label
                                            className="text-sm text-gray-500"
                                            htmlFor="plus-one-description"
                                        >
                                            A guest who will not be responding seprately
                                        </Label>
                                    </div>

                                    <PlusOneButtons />
                                </RadioGroup>

                                <div class="grid auto-rows-min gap-4 py-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:pb-6">
                                    <div class="flex flex-col justify-center gap-2 sm:gap-0">
                                        <label
                                            class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                            for="dietary-restrictions"
                                        >
                                            Do you{" "}
                                            <Show when={!!plusOne.value}> or your plus-one </Show>
                                            have any dietary restrictions?
                                        </label>

                                        <p
                                            class="text-sm text-gray-500"
                                            id="dietary-restrictions-description"
                                        >
                                            Leave blank if not applicable
                                        </p>
                                    </div>

                                    <textarea
                                        class="block w-full max-w-2xl rounded-md border-0 bg-gray-50 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:placeholder:text-gray-500 dark:focus:bg-black sm:py-1.5 sm:text-sm sm:leading-6"
                                        id="dietary-restrictions"
                                        value={dietaryRestrictions}
                                        onInput={setDietaryRestrictions}
                                        name="dietary-restrictions"
                                        placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                        rows={2}
                                    ></textarea>
                                </div>
                            </Show>
                        </div>

                        <hr class="w-full border-t border-black/10 dark:border-white/5" />

                        <div class="flex items-center justify-end gap-x-6 px-6 pb-2 pt-6">
                            <button
                                class="flex flex-row items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:enabled:bg-indigo-700 dark:enabled:hover:bg-indigo-600 dark:disabled:bg-gray-800 dark:disabled:text-slate-500"
                                disabled={buttonIsDisabled}
                                type="submit"
                            >
                                <Show when={navigation.value !== "idle"}>
                                    <div role="status">
                                        <svg
                                            class="mr-2 h-4 w-4 animate-spin fill-gray-500 text-gray-400"
                                            aria-hidden="true"
                                            fill="none"
                                            viewBox="0 0 100 101"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentFill"
                                            />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </Show>
                                {buttonTitle}
                            </button>
                        </div>
                    </Form>
                </div>
            </Show>
        </SSRProvider>
    )
}

export namespace Rsvp {
    export interface Props {
        user: User | null
    }

    export const OPTIONS: RsvpButton.Option[] = [
        { response: UserResponse.YES, icon: CheckOutline },
        { response: UserResponse.MAYBE, icon: QuestionMarkCircleOutline },
        { response: UserResponse.NO, icon: XMarkOutline },
    ]
}
