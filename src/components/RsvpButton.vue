<script setup lang="ts">
import { RadioGroupOption } from '@headlessui/vue';
import { Response as UserResponse } from '@prisma/client/edge';
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface Option {
    response: UserResponse;
    icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>;
}

export interface Props {
    option: Option;
}

let { option } = defineProps<Props>();

function capitalize(phrase: string) {
    let lower = phrase.toLowerCase();
    return phrase.charAt(0).toUpperCase() + lower.slice(1);
}
</script>

<template>
    <RadioGroupOption v-slot="{ checked }" as="template" :value="option.response">
        <div
            :class="[
                'cursor-pointer rounded-md px-3 py-3 text-sm font-semibold shadow-sm sm:py-2',
                checked
                    ? option.response === UserResponse.YES
                        ? 'bg-green-600 text-white shadow-inner'
                        : option.response === UserResponse.NO
                        ? 'bg-red-600 text-white shadow-inner'
                        : 'bg-gray-500 text-white shadow-inner'
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-950 dark:text-gray-100 dark:ring-gray-800 dark:hover:bg-gray-900',
            ]"
        >
            <div class="flex select-none flex-row items-center justify-center gap-x-2">
                <component
                    :is="option.icon"
                    :class="[checked ? 'text-white' : 'text-gray-500', 'h-5 w-5']"
                />
                {{ capitalize(option.response) }}
            </div>
        </div>
    </RadioGroupOption>
</template>
