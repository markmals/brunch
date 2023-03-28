import { RadioGroup } from "@headlessui/react"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid"
import type { User } from "@prisma/client/edge"
import { Form } from "@remix-run/react"
import type { ForwardRefExoticComponent, ReactNode, SVGProps } from "react"
import { createContext, useContext, useState } from "react"
import { classNames } from "~/utilities/class-names"
import { Card } from "./Card"

export interface RSVPOption {
    response: "Yes" | "Maybe" | "No"
    icon: ForwardRefExoticComponent<
        SVGProps<SVGSVGElement> & {
            title?: string | undefined
            titleId?: string | undefined
        }
    >
}

const options: RSVPOption[] = [
    { response: "Yes", icon: CheckIcon },
    { response: "Maybe", icon: QuestionMarkCircleIcon },
    { response: "No", icon: XMarkIcon },
]

function isYes(response?: string): boolean {
    return response === "Yes"
}

function isNo(response?: string): boolean {
    return response === "No"
}

function isMaybe(response?: string): boolean {
    return response === "Maybe"
}

export const UserContext = createContext<User | undefined>(undefined)
export const ActionDataContext = createContext<any>(undefined)

export function RSVP() {
    // TODO: Save responses in MongoDB
    const [selectedResponse, setSelectedResponse] = useState<string | undefined>(undefined)

    return (
        <RSVPBar onChange={setSelectedResponse} value={selectedResponse}>
            {!!selectedResponse && <hr className="border-t border-black/10" />}
            {isYes(selectedResponse) ? (
                <YesForm />
            ) : isNo(selectedResponse) ? (
                <NoForm />
            ) : isMaybe(selectedResponse) ? (
                <MaybeForm />
            ) : null}
        </RSVPBar>
    )
}

function YesForm() {
    const user = useContext(UserContext)
    const actionData = useContext(ActionDataContext)
    const [selectedPlusOne, setSelectedPlusOne] = useState<boolean>(user?.plusOne ?? false)

    // const form = useRef<HTMLFormElement>()
    // useEffect(() => console.log(Object.fromEntries(new FormData(form.current))), [form])

    return (
        <div className="py-6 px-4 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Hooray! 🎉</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{"I just need some info and then you'll be confirmed!"}</p>
            </div>
            <Form
                action={`/${user?.shortCode}`}
                className="mt-5 w-full sm:flex sm:items-center"
                method="post"
            >
                <input id="response" name="response" type="hidden" value="YES" />

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
                            defaultValue={user?.name}
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            type="text"
                        />
                    </div>

                    <RadioGroup
                        className="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                        name="plus_one"
                        onChange={setSelectedPlusOne}
                        value={selectedPlusOne}
                    >
                        <div className="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                            <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Will you be bringing a plus-one?
                            </RadioGroup.Label>

                            <RadioGroup.Label
                                as="p"
                                className="text-sm text-gray-500"
                                id="plus_one_description"
                            >
                                A guest who will not be responding seprately
                            </RadioGroup.Label>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            {[true, false].map(plusOne => (
                                <RadioGroup.Option
                                    className={({ checked }) =>
                                        classNames(
                                            checked ? "border-transparent" : "border-gray-300",
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
                                htmlFor="dietary_restrictions"
                            >
                                Do you {selectedPlusOne && "or your plus-one "}have any dietary
                                restrictions?
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
                            defaultValue={user?.dietaryRestrictions ?? ""}
                            id="dietary_restrictions"
                            name="dietary_restrictions"
                            placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                            rows={2}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-x-6 pt-6 pb-2">
                        <button
                            className="rounded-md py-2 px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                            disabled={!!actionData?.ok}
                            type="submit"
                        >
                            {actionData?.ok ? "Update Response" : "Submit Response"}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

function NoForm() {
    const user = useContext(UserContext)

    return (
        <div className="py-6 px-4 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
                {"We'll miss you! 🙁"}
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>{"Maybe we'll see you next time."}</p>
            </div>
            <Form
                action={`/${user?.shortCode}`}
                className="mt-5 w-full sm:flex sm:items-center"
                method="post"
            >
                <input id="response" name="response" type="hidden" value="NO" />

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
                            defaultValue={user?.name}
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-x-6 pt-6 pb-2">
                        <button
                            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            Submit Response
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    )
}
function MaybeForm() {
    const user = useContext(UserContext)

    return (
        <div className="py-6 px-4 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">No worries 😃</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>When you know for sure, you can come back and update your response.</p>
            </div>
            <Form
                action={`/${user?.shortCode}`}
                className="mt-5 w-full sm:flex sm:items-center"
                method="post"
            >
                <input id="response" name="response" type="hidden" value="MAYBE" />

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
                            defaultValue={user?.name}
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-x-6 pt-6 pb-2">
                        <button
                            className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="submit"
                        >
                            Submit Response
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export function RSVPBar({
    value,
    onChange,
    children,
}: {
    value: any
    onChange: (value: any) => void
    children: ReactNode
}) {
    return (
        <Card className="p-0">
            <RadioGroup
                className="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
                onChange={onChange}
                value={value}
            >
                <RadioGroup.Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 sm:mb-0">
                    Can you make it?
                </RadioGroup.Label>
                <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    {options.map(option => (
                        <RSVPButton key={option.response} option={option} />
                    ))}
                </div>
            </RadioGroup>
            {children}
        </Card>
    )
}

export function RSVPButton({ option }: { option: RSVPOption }) {
    return (
        <RadioGroup.Option
            className={({ checked }) =>
                classNames(
                    "cursor-pointer rounded-md py-2 px-3 text-sm font-semibold shadow-sm",
                    checked
                        ? isYes(option.response)
                            ? "bg-green-600 text-white"
                            : isNo(option.response)
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
                        {option.response}
                    </div>
                )
            }}
        </RadioGroup.Option>
    )
}
