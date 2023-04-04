import { RadioGroup } from "@headlessui/react"
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useComputed, useSignal } from "@preact/signals-react"
import type { User } from "@prisma/client/edge.js"
import { Response } from "@prisma/client/edge.js"
import { Form, useNavigation } from "@remix-run/react"
import type { ForwardRefExoticComponent, SVGProps } from "react"
import { capitalize } from "~/utilities/capitalize"
import { classNames } from "~/utilities/class-names"
import { Card } from "./Card"

export function RsvpCard({ user }: RsvpCard.Props) {
    let navigation = useNavigation()

    let selectedResponse = useSignal(user.response)

    let name = useSignal(user.name)
    let plusOne = useSignal(user.plusOne)
    let dietaryRestrictions = useSignal(user.dietaryRestrictions)

    let isDirty = useComputed(() => {
        let responseChanged = selectedResponse.value !== user.response
        let nameChanged = name.value !== user.name
        let plusOneChanged = selectedResponse.value === "YES" && plusOne.value !== user.plusOne
        let dietChanged =
            selectedResponse.value === "YES" &&
            dietaryRestrictions.value !== user.dietaryRestrictions

        return responseChanged || nameChanged || plusOneChanged || dietChanged
    })

    let isYes = useComputed(() => selectedResponse.value === "YES")
    let isSelected = useComputed(() => !!selectedResponse.value)

    let title = useComputed(() => {
        switch (selectedResponse.value) {
            case "YES":
                return "Hooray! 🥳"
            case "MAYBE":
                return "No worries 🤠"
            case "NO":
                return "We'll miss you! 🙁"
        }
    })

    let description = useComputed(() => {
        switch (selectedResponse.value) {
            case "YES":
                return "I just need some info and then you'll be confirmed!"
            case "MAYBE":
                return "When you know for sure, you can come back and update your response."
            case "NO":
                return "Maybe we'll see you next time."
        }
    })

    return (
        <Card className="p-0">
            <RadioGroup
                className="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={value => (selectedResponse.value = value)}
                value={selectedResponse.value}
            >
                <RadioGroup.Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 dark:text-gray-50 sm:mb-0">
                    Can you make it?
                </RadioGroup.Label>
                <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    {RsvpCard.OPTIONS.map(option => (
                        <RsvpCard.Button key={option.response} option={option} />
                    ))}
                </div>
            </RadioGroup>

            {isSelected.value && (
                <>
                    <hr className="border-t border-black/10 dark:border-white/5" />

                    <div className="py-6">
                        <h3 className="px-6 text-base font-semibold leading-6 text-gray-900 dark:text-gray-50">
                            {title.value ?? "Unknown"}
                        </h3>
                        <div className="mt-2 max-w-xl px-6 text-sm text-gray-500">
                            <p>{description.value ?? "Unknown"}</p>
                        </div>
                        <Form
                            action={`/${user.shortCode}`}
                            className="mt-5 flex w-full flex-col items-end"
                            method="post"
                        >
                            <input
                                id="response"
                                name="response"
                                type="hidden"
                                value={selectedResponse.value ?? ""}
                            />

                            <div className="flex w-full flex-col divide-y divide-black/10 px-6 dark:divide-white/5">
                                <div className="grid grid-rows-2 items-center border-t border-black/10 py-6 dark:border-white/5 sm:grid-cols-2 sm:grid-rows-none">
                                    <label
                                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:focus:bg-black sm:text-sm sm:leading-6"
                                        id="name"
                                        name="name"
                                        onInput={event =>
                                            (name.value = (event.target as HTMLInputElement).value)
                                        }
                                        placeholder="Jane Doe"
                                        type="text"
                                        value={name.value}
                                    />
                                </div>

                                {isYes.value && (
                                    <>
                                        <RadioGroup
                                            className="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                                            name="plus-one"
                                            onChange={value => (plusOne.value = value)}
                                            value={plusOne.value}
                                        >
                                            <div className="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                                <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                                                    Will you be bringing a plus-one?
                                                </RadioGroup.Label>

                                                <RadioGroup.Label
                                                    as="p"
                                                    className="text-sm text-gray-500"
                                                    id="plus-one-description"
                                                >
                                                    A guest who will not be responding seprately
                                                </RadioGroup.Label>
                                            </div>

                                            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                {[true, false].map(plusOne => (
                                                    <RadioGroup.Option
                                                        className={({ checked }) =>
                                                            classNames(
                                                                checked
                                                                    ? "border-transparent"
                                                                    : "border-gray-300 dark:border-gray-900",
                                                                "relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-900"
                                                            )
                                                        }
                                                        key={plusOne ? 1 : 0}
                                                        value={plusOne}
                                                    >
                                                        {({ checked }) => (
                                                            <>
                                                                <span className="flex flex-1">
                                                                    <span className="flex flex-col">
                                                                        <RadioGroup.Label
                                                                            as="span"
                                                                            className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                                                                        >
                                                                            {plusOne ? "Yes" : "No"}
                                                                        </RadioGroup.Label>
                                                                    </span>
                                                                </span>
                                                                <CheckCircleIcon
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        !checked ? "invisible" : "",
                                                                        "h-5 w-5 text-indigo-600 dark:text-indigo-700"
                                                                    )}
                                                                />
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        checked
                                                                            ? "border-indigo-600 dark:border-indigo-700"
                                                                            : "border-transparent",
                                                                        "pointer-events-none absolute -inset-px rounded-lg border-2"
                                                                    )}
                                                                />
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                        <div className="grid auto-rows-min gap-4 py-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:pb-6">
                                            <div className="flex flex-col justify-center gap-2 sm:gap-0">
                                                <label
                                                    className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
                                                    htmlFor="dietary-restrictions"
                                                >
                                                    Do you {plusOne.value && "or your plus-one "}
                                                    have any dietary restrictions?
                                                </label>

                                                <p
                                                    className="text-sm text-gray-500"
                                                    id="dietary_restrictions_description"
                                                >
                                                    Leave blank if not applicable
                                                </p>
                                            </div>

                                            <textarea
                                                className="block w-full max-w-2xl rounded-md border-0 bg-gray-50 text-gray-900 shadow-inner ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-black dark:text-gray-50 dark:ring-gray-900 dark:placeholder:text-gray-500 dark:focus:bg-black sm:py-1.5 sm:text-sm sm:leading-6"
                                                id="dietary-restrictions"
                                                name="dietary-restrictions"
                                                onInput={event =>
                                                    (dietaryRestrictions.value = (
                                                        event.target as HTMLTextAreaElement
                                                    ).value)
                                                }
                                                placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                                rows={2}
                                                value={dietaryRestrictions.value}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <hr className="w-full border-t border-black/10 dark:border-white/5" />

                            <div className="flex items-center justify-end gap-x-6 px-6 pb-2 pt-6">
                                <button
                                    className="flex flex-row items-center justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:enabled:bg-indigo-700 dark:enabled:hover:bg-indigo-600 dark:disabled:bg-gray-800 dark:disabled:text-slate-500"
                                    disabled={!isDirty.value || navigation.state !== "idle"}
                                    type="submit"
                                >
                                    {navigation.state !== "idle" && (
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="mr-2 h-4 w-4 animate-spin fill-gray-500 text-gray-400"
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
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    )}

                                    {navigation.state !== "idle"
                                        ? user.response
                                            ? "Updating..."
                                            : "Submitting..."
                                        : user.response
                                        ? "Update Response"
                                        : "Submit Response"}
                                </button>
                            </div>
                        </Form>
                    </div>
                </>
            )}
        </Card>
    )
}

export namespace RsvpCard {
    export interface Option {
        response: Response
        icon: ForwardRefExoticComponent<
            SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined }
        >
    }

    export const OPTIONS: RsvpCard.Option[] = [
        { response: Response.YES, icon: CheckIcon },
        { response: Response.MAYBE, icon: QuestionMarkCircleIcon },
        { response: Response.NO, icon: XMarkIcon },
    ]

    export interface Props {
        user: User
        actionData?: any
    }

    export namespace Button {
        export interface Props {
            option: RsvpCard.Option
        }
    }

    export function Button({ option }: Button.Props) {
        let isYes = option.response === "YES"
        let isNo = option.response === "NO"

        return (
            <RadioGroup.Option
                className={({ checked }) =>
                    classNames(
                        "cursor-pointer rounded-md px-3 py-3 text-sm font-semibold shadow-sm sm:py-2",
                        checked
                            ? isYes
                                ? "bg-green-600 text-white shadow-inner"
                                : isNo
                                ? "bg-red-600 text-white shadow-inner"
                                : "bg-gray-500 text-white shadow-inner"
                            : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800 dark:hover:bg-gray-900"
                    )
                }
                value={option.response}
            >
                {({ checked }) => {
                    const Icon = option.icon
                    return (
                        <div className="flex select-none flex-row items-center justify-center gap-x-2">
                            <Icon
                                className={classNames(
                                    checked ? "text-white" : "text-gray-500",
                                    "h-5 w-5"
                                )}
                            />
                            {capitalize(option.response)}
                        </div>
                    )
                }}
            </RadioGroup.Option>
        )
    }
}
