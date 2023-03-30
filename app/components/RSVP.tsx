import { RadioGroup } from "@headlessui/react"
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import type { User } from "@prisma/client"
import { Response } from "@prisma/client"
import { Form } from "@remix-run/react"
import type { ForwardRefExoticComponent, SVGProps } from "react"
import { useEffect, useMemo, useState } from "react"
import { capitalize } from "~/utilities/capitalize"
import { classNames } from "~/utilities/class-names"
import { Card } from "./Card"

export function Rsvp({ user }: Rsvp.Props) {
    let [selectedResponse, setSelectedResponse] = useState<Response | null>(user.response)

    let [name, setName] = useState(user.name)
    let [plusOne, setPlusOne] = useState(user.plusOne)
    let [dietaryRestrictions, setDietaryRestrictions] = useState(user.dietaryRestrictions)

    let isDirty = useMemo(() => {
        let responseChanged = selectedResponse !== user.response
        let nameChanged = name !== user.name
        let plusOneChanged = plusOne !== user.plusOne
        let dietChanged =
            selectedResponse === "YES" && dietaryRestrictions !== user.dietaryRestrictions

        return responseChanged || nameChanged || plusOneChanged || dietChanged
    }, [dietaryRestrictions, name, plusOne, selectedResponse, user])

    useEffect(() => setDietaryRestrictions(user.dietaryRestrictions), [user])

    let isYes = useMemo(() => selectedResponse === "YES", [selectedResponse])
    let isSelected = useMemo(() => !!selectedResponse, [selectedResponse])

    let title = useMemo(() => {
        switch (selectedResponse) {
            case "YES":
                return "Hooray! 🎉"
            case "MAYBE":
                return "No worries 🤠"
            case "NO":
                return "We'll miss you! 🙁"
        }
    }, [selectedResponse])

    let description = useMemo(() => {
        switch (selectedResponse) {
            case "YES":
                return "I just need some info and then you'll be confirmed!"
            case "MAYBE":
                return "When you know for sure, you can come back and update your response."
            case "NO":
                return "Maybe we'll see you next time."
        }
    }, [selectedResponse])

    return (
        <Card className="p-0">
            <RadioGroup
                className="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={setSelectedResponse}
                value={selectedResponse}
            >
                <RadioGroup.Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 sm:mb-0">
                    Can you make it?
                </RadioGroup.Label>
                <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    {Rsvp.OPTIONS.map(option => (
                        <Rsvp.Button key={option.response} option={option} />
                    ))}
                </div>
            </RadioGroup>

            {isSelected && (
                <>
                    <hr className="border-t border-black/10" />

                    <div className="px-4 py-6 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            {title ?? "Unknown"}
                        </h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>{description ?? "Unknown"}</p>
                        </div>
                        <Form
                            action={`/${user.shortCode}`}
                            className="mt-5 w-full sm:flex sm:items-center"
                            method="post"
                        >
                            <input
                                id="response"
                                name="response"
                                type="hidden"
                                value={selectedResponse ?? ""}
                            />

                            <div className="flex w-full flex-col divide-y divide-black/10">
                                <div className="grid grid-rows-2 items-center border-t border-black/10 py-6 sm:grid-cols-2 sm:grid-rows-none">
                                    <label
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        id="name"
                                        name="name"
                                        onInput={event => setName((event.target as any).value)}
                                        placeholder="Jane Doe"
                                        type="text"
                                        value={name}
                                    />
                                </div>

                                {isYes && (
                                    <>
                                        <RadioGroup
                                            className="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                                            name="plus-one"
                                            onChange={setPlusOne}
                                            value={plusOne}
                                        >
                                            <div className="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                                <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
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
                                                                    : "border-gray-300",
                                                                "relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none"
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
                                                                            className="block text-sm font-medium text-gray-900"
                                                                        >
                                                                            {plusOne ? "Yes" : "No"}
                                                                        </RadioGroup.Label>
                                                                    </span>
                                                                </span>
                                                                <CheckCircleIcon
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        !checked ? "invisible" : "",
                                                                        "h-5 w-5 text-indigo-600"
                                                                    )}
                                                                />
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        checked
                                                                            ? "border-indigo-600"
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
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                    htmlFor="dietary-restrictions"
                                                >
                                                    Do you {plusOne && "or your plus-one "}
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
                                                className="block w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                                id="dietary-restrictions"
                                                name="dietary-restrictions"
                                                onInput={event =>
                                                    setDietaryRestrictions(
                                                        (event.target as any).value
                                                    )
                                                }
                                                placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                                rows={2}
                                                value={dietaryRestrictions}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-end gap-x-6 pb-2 pt-6">
                                    <button
                                        className="rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                        disabled={!isDirty}
                                        type="submit"
                                    >
                                        {user.response ? "Update Response" : "Submit Response"}
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </>
            )}
        </Card>
    )
}

export namespace Rsvp {
    export interface Option {
        response: Response
        icon: ForwardRefExoticComponent<
            SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined }
        >
    }

    export const OPTIONS: Rsvp.Option[] = [
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
            option: Rsvp.Option
        }
    }

    export function Button({ option }: Button.Props) {
        let isYes = useMemo(() => option.response === "YES", [option])
        let isNo = useMemo(() => option.response === "NO", [option])

        return (
            <RadioGroup.Option
                className={({ checked }) =>
                    classNames(
                        "cursor-pointer rounded-md px-3 py-2 text-sm font-semibold shadow-sm",
                        checked
                            ? isYes
                                ? "bg-green-600 text-white"
                                : isNo
                                ? "bg-red-600 text-white"
                                : "bg-gray-500 text-white"
                            : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
