<script lang="ts" setup>
import { RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';
</script>

<template>
    <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <RadioGroupOption
            v-for="plusOne in [true, false]"
            v-slot="{ checked }"
            as="template"
            :key="plusOne ? 1 : 0"
            :value="plusOne"
        >
            <div
                :class="[
                    checked ? 'border-transparent' : 'border-gray-300 dark:border-gray-900',
                    'relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-900',
                ]"
            >
                <span class="flex flex-1">
                    <span class="flex flex-col">
                        <RadioGroupLabel
                            class="block text-sm font-medium text-gray-900 dark:text-gray-100"
                            as="span"
                        >
                            {{ plusOne ? 'Yes' : 'No' }}
                        </RadioGroupLabel>
                    </span>
                </span>
                <CheckCircleIcon
                    :class="[
                        !checked ? 'invisible' : '',
                        'h-5 w-5 text-indigo-600 dark:text-indigo-700',
                    ]"
                    aria-hidden="true"
                />
                <span
                    :class="[
                        checked ? 'border-indigo-600 dark:border-indigo-700' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-lg border-2',
                    ]"
                    aria-hidden="true"
                />
            </div>
        </RadioGroupOption>
    </div>
</template>
