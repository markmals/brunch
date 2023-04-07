<script lang="ts">
export type NavigationState = 'idle' | 'submitting' | 'submitted' | 'error';

export interface Props {
    class: string;
    action: string;
    method: string;
}

export interface Events {
    (event: 'state', value: NavigationState): void;
    (event: 'optomisticData', value: FormData): void;
    (event: 'responseData', value: any): void;
    (event: 'error', value: Error): void;
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps<Props>();
const emit = defineEmits<Events>();

onMounted(() => emit('state', 'idle'));

async function onSubmit($event: Event) {
    let form = $event.currentTarget as HTMLFormElement;
    let data = new FormData(form);

    emit('state', 'submitting');
    emit('optomisticData', data);

    let response = await fetch(form.action, {
        method: form.method,
        body: data,
    });

    if (!response.ok) {
        emit('state', 'error');
        emit('error', new Error(`${response.status}: ${response.statusText}`));
        return;
    }

    emit('state', 'submitted');
    emit('responseData', await response.json());

    emit('state', 'idle');
}
</script>

<template>
    <form v-bind="props" @submit.prevent="onSubmit($event)">
        <slot></slot>
    </form>
</template>
