import { Response as UserResponse } from "@prisma/client/edge"
import { Radio } from "react-aria-components"
import { classList } from "../lib/classList"

export namespace RsvpButton {
    export interface Option {
        response: UserResponse
        icon: any
    }

    export interface Props {
        option: Option
    }
}

function capitalize(phrase: string) {
    let lower = phrase.toLowerCase()
    return phrase.charAt(0).toUpperCase() + lower.slice(1)
}

export function RsvpButton({ option }: RsvpButton.Props) {
    return (
        <Radio
            className={({ isSelected }) =>
                classList(
                    "cursor-pointer rounded-md px-3 py-3 text-sm font-semibold shadow-sm sm:py-2",
                    isSelected
                        ? option.response === UserResponse.YES
                            ? "bg-green-600 text-white shadow-inner"
                            : option.response === UserResponse.NO
                            ? "bg-red-600 text-white shadow-inner"
                            : "bg-gray-500 text-white shadow-inner"
                        : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800 dark:hover:bg-gray-900"
                )
            }
            value={option.response}
        >
            {({ isSelected }) => {
                const Icon = option.icon.render
                return (
                    <div class="flex select-none flex-row items-center justify-center gap-x-2">
                        <Icon
                            class={classList(
                                isSelected ? "text-white" : "text-gray-500",
                                "h-5 w-5"
                            )}
                        />
                        {capitalize(option.response)}
                    </div>
                )
            }}
        </Radio>
    )
}
