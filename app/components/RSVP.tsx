import { RadioGroup } from "@headlessui/react"
import { CheckIcon, FlagIcon, XMarkIcon } from "@heroicons/react/24/solid"
import type { ForwardRefExoticComponent, SVGProps } from "react"
import { classNames } from "~/utilities/classNames"
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
    { response: "Maybe", icon: FlagIcon },
    { response: "No", icon: XMarkIcon },
]

export function RSVP() {
    // TODO: Take state from RSVPBar
    // Display form on choice for:
    //  - Name
    // If Yes, display:
    //  - +1 y/n
    //  - +1 name
    //  - Dietary restrictions or special requests
    // TODO: Save responses in MongoDB
}

export function RSVPBar({ value, onChange }: { value: any; onChange: (value: any) => void }) {
    return (
        <Card>
            <RadioGroup
                className="flex w-full flex-col items-center justify-center sm:flex-row sm:justify-between"
                onChange={onChange}
                value={value}
            >
                <RadioGroup.Label className="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 sm:mb-0">
                    Are you going?
                </RadioGroup.Label>
                <div className="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4">
                    {options.map(option => (
                        <RSVPButton key={option.response} option={option} />
                    ))}
                </div>
            </RadioGroup>{" "}
        </Card>
    )
}

export function RSVPButton({ option }: { option: RSVPOption }) {
    return (
        <RadioGroup.Option
            className={({ checked }) =>
                // TODO: Customize colors per button
                classNames(
                    "cursor-pointer",
                    checked
                        ? "rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        : "rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
