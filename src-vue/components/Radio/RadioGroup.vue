<script lang="ts">
import type { InjectionKey } from 'vue';

export type RadioContextValue = {
  name: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export const RadioContextKey: InjectionKey<RadioContextValue> = Symbol('RadioContext');
</script>

<script setup lang="ts">
import { provide, reactive, useId } from 'vue';

const props = withDefaults(
  defineProps<{
    name?: string;
    value?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  change: [string];
}>();

const autoName = useId();

// Getters keep the provided context reactive to prop changes — plain value
// copies would freeze at the moment the RadioGroup was created.
const context: RadioContextValue = reactive({
  get name() {
    return props.name ?? autoName;
  },
  get value() {
    return props.value;
  },
  get disabled() {
    return props.disabled;
  },
  onChange: (value: string) => emit('change', value),
});

provide(RadioContextKey, context);
</script>

<template>
  <div role="radiogroup" class="flex flex-col gap-2 text-left">
    <slot />
  </div>
</template>
