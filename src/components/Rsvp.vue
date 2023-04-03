<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue"
import type { Response, User } from "@prisma/client/edge"
import { computed, ref } from "vue"
import { Rsvp } from "../lib/rsvp"

export interface Props {
    user: User | null
    actionData?: any
}

const { user, actionData } = defineProps<Props>()

let selectedResponse = ref<Response | undefined>(undefined)
let willBringPlusOne = ref<boolean>(user?.plusOne ?? false)

let isYes = computed(() => selectedResponse.value === "YES")
let isSelected = computed(() => !!selectedResponse.value)

let title = computed(() => {
    switch (selectedResponse.value) {
        case "YES":
            return "Hooray! 🎉"
        case "MAYBE":
            return "No worries 🤠"
        case "NO":
            return "We'll miss you! 🙁"
    }
})

let description = computed(() => {
    switch (selectedResponse.value) {
        case "YES":
            return "I just need some info and then you'll be confirmed!"
        case "MAYBE":
            return "When you know for sure, you can come back and update your response."
        case "NO":
            return "Maybe we'll see you next time."
    }
})
</script>

<template>
    <RadioGroup
        class="flex w-full flex-col items-center justify-center px-4 py-5 sm:flex-row sm:justify-between sm:px-6"
        v-model="selectedResponse"
    >
        <RadioGroupLabel
            class="mb-6 cursor-text text-base font-semibold leading-6 text-gray-900 sm:mb-0"
        >
            Can you make it?
        </RadioGroupLabel>
        <div
            class="grid w-full grid-cols-1 items-center gap-y-6 sm:w-auto sm:grid-cols-3 sm:gap-x-4"
        >
            <RsvpButton v-for="option of Rsvp.OPTIONS" :option="option" />
        </div>
    </RadioGroup>

    <template v-show="isSelected">
        <hr class="border-t border-black/10" />

        <div class="px-4 py-6 sm:px-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
                {{ title ?? "Unknown" }}
            </h3>
            <div class="mt-2 max-w-xl text-sm text-gray-500">
                <p>{{ description ?? "Unknown" }}</p>
            </div>
            <form class="mt-5 w-full sm:flex sm:items-center" method="post">
                <input id="response" name="response" type="hidden" v-model="selectedResponse" />

                <div class="flex w-full flex-col divide-y divide-black/10">
                    <div
                        class="grid grid-rows-2 items-center border-t border-black/10 py-6 sm:grid-cols-2 sm:grid-rows-none"
                    >
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="name">
                            Name
                        </label>
                        <input
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue="{user?.name}"
                            id="name"
                            name="name"
                            placeholder="Jane Doe"
                            type="text"
                        />
                    </div>

                    <template v-show="isYes">
                        <RadioGroup
                            class="grid auto-rows-min pb-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:py-6"
                            name="plus-one"
                            v-model="willBringPlusOne"
                        >
                            <div class="flex flex-col justify-center gap-2 py-4 sm:gap-0 sm:py-0">
                                <RadioGroupLabel
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Will you be bringing a plus-one?
                                </RadioGroupLabel>

                                <RadioGroupLabel
                                    as="p"
                                    class="text-sm text-gray-500"
                                    id="plus-one-description"
                                >
                                    A guest who will not be responding seprately
                                </RadioGroupLabel>
                            </div>

                            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <RadioGroupOption
                                    v-for="plusOne of [true, false]"
                                    v-model="plusOne"
                                    v-slot="{ checked }"
                                >
                                    <span class="flex flex-1">
                                        <span class="flex flex-col">
                                            <RadioGroup.Label
                                                as="span"
                                                class="block text-sm font-medium text-gray-900"
                                            >
                                                {{ plusOne ? "Yes" : "No" }}
                                            </RadioGroup.Label>
                                        </span>
                                    </span>
                                    <CheckCircleIcon
                                        aria-hidden="true"
                                        class="h-5 w-5 text-indigo-600"
                                        :class="{ invisible: !checked }"
                                    />
                                    <span
                                        aria-hidden="true"
                                        class="pointer-events-none absolute -inset-px rounded-lg border-2"
                                        :class="{
                                            'border-indigo-600': checked,
                                            'border-transparent': !checked,
                                        }"
                                    />
                                </RadioGroupOption>
                            </div>
                        </RadioGroup>
                        <div
                            class="grid auto-rows-min gap-4 py-6 sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:pb-6"
                        >
                            <div class="flex flex-col justify-center gap-2 sm:gap-0">
                                <label
                                    class="block text-sm font-medium leading-6 text-gray-900"
                                    for="dietary-restrictions"
                                >
                                    Do you {{ willBringPlusOne && "or your plus-one " }} have any
                                    dietary restrictions?
                                </label>

                                <p
                                    class="text-sm text-gray-500"
                                    id="dietary_restrictions_description"
                                >
                                    Leave blank if not applicable
                                </p>
                            </div>

                            <!-- FIXME: This doesn't retain its state when the response is switched away and then back -->
                            <textarea
                                class="block w-full max-w-2xl rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                v-model="user?.dietaryRestrictions"
                                id="dietary-restrictions"
                                name="dietary-restrictions"
                                placeholder="e.g. wheat, peanuts, dairy, shrimp, soy, etc."
                                :rows="2"
                            />
                        </div>
                    </template>

                    <div class="flex items-center justify-end gap-x-6 pb-2 pt-6">
                        <button
                            class="rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 enabled:bg-indigo-600 enabled:text-white enabled:shadow-sm enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                            :disabled="!!actionData?.ok"
                            type="submit"
                        >
                            {{ actionData?.ok ? "Update Response" : "Submit Response" }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </template>
</template>
