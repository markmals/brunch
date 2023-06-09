import { CheckCircleSolid } from "preact-heroicons"
import { Label, Radio } from "react-aria-components"
import { classList } from "../lib/classList"
import { For } from "./control-flow/For"

export function PlusOneButtons() {
    return (
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <For each={[true, false]}>
                {plusOne => (
                    <Radio key={plusOne ? 1 : 0} value={plusOne.toString()}>
                        {({ isSelected }) => (
                            <div
                                class={classList(
                                    isSelected
                                        ? "border-transparent"
                                        : "border-gray-300 dark:border-gray-900",
                                    "relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-900"
                                )}
                            >
                                <span class="flex flex-1">
                                    <span class="flex flex-col">
                                        <Label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {plusOne ? "Yes" : "No"}
                                        </Label>
                                    </span>
                                </span>
                                <CheckCircleSolid
                                    class={classList(
                                        !isSelected ? "invisible" : "",
                                        "h-5 w-5 text-indigo-600 dark:text-indigo-700"
                                    )}
                                    aria-hidden="true"
                                />
                                <span
                                    class={classList(
                                        isSelected
                                            ? "border-indigo-600 dark:border-indigo-700"
                                            : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-lg border-2"
                                    )}
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                    </Radio>
                )}
            </For>
        </div>
    )
}
