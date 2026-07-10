<!--
  DateInputGroup — internal helper used only by DatePickerRange's
  date/time input row. TODO (carried over from React source): replace with
  the real TextInput component once it exists.

  React: src/components/DatePicker/DatePicker.tsx (DateInputGroup, local function)
-->
<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="flex flex-col flex-1 min-w-0 gap-1">
    <span class="text-text-xs leading-text-xs font-regular text-element-tertiary">
      {{ label }}
    </span>
    <div class="flex gap-2">
      <!--
        NOTE: height:30px below has no matching --sol-* token (pre-existing
        in the React source). CLAUDE.md violation — left as-is pending a
        token decision, per this repo's established convention (see
        src-vue/components/Tooltip/Tooltip.vue for the same NOTE convention).
      -->
      <input
        type="text"
        :value="value"
        readonly
        placeholder="Text"
        style="height: 30px"
        class="flex-1 min-w-0 px-sol-8 rounded-4 border border-border-normal bg-surface-container text-text-xs leading-text-xs font-regular text-element-primary focus:outline-none placeholder:text-element-quaternary"
      />
      <div class="relative flex-1" style="height: 30px">
        <!-- NOTE: padding-right:26px below has no matching --sol-* token (pre-existing in the React source). -->
        <input
          type="text"
          readonly
          placeholder="Text"
          style="padding-right: 26px"
          class="w-full h-full pl-sol-8 rounded-4 border border-border-normal bg-surface-container text-text-xs leading-text-xs font-regular text-element-primary focus:outline-none placeholder:text-element-quaternary"
        />
        <span class="absolute right-sol-8 top-1/2 -translate-y-1/2 text-element-tertiary pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM12.75 8.62012V12.5215L15.4248 13.4131L14.9502 14.8369L11.7627 13.7744C11.4564 13.6723 11.25 13.3853 11.25 13.0625V8.62012H12.75ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>
