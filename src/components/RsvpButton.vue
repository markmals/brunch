<script setup lang="ts"></script>

<template>
                <RadioGroupOption
                class={({ checked }) =>
                    classs(
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
                <div class="flex select-none flex-row items-center justify-center gap-x-2">
                            <Icon
                            class="h-5 w-5"
                            :class="{'text-white': checked, 'text-gray-500': !checked}"
                            />
                            {{capitalize(option.response)}}
                        </div>
            </RadioGroupOption>

</template>
