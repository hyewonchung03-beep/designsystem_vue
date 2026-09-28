<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  collapsed: boolean;
  name: string;
  logo?: Component;
}>();

defineEmits<{ toggle: [] }>();
</script>

<template>
  <!-- ic_trigger: 사이드바 접기/펼치기 버튼 -->
  <div
    v-if="collapsed"
    class="group relative flex h-16 w-full shrink-0 items-center justify-center border-b border-border-solid"
  >
    <button
      type="button"
      class="flex size-9 cursor-pointer items-center justify-center rounded-4 bg-interaction-neutral-hover text-element-primary focus:outline-none"
      @click="$emit('toggle')"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M11.5303 11.4697C11.8232 11.7626 11.8232 12.2374 11.5303 12.5303L8.53027 15.5303L7.46973 14.4697L9.93945 12L7.46973 9.53027L8.53027 8.46973L11.5303 11.4697Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.0357 20.2128 20.887 19.2041 20.9893L19 21H5L4.7959 20.9893C3.85435 20.8938 3.1062 20.1457 3.01074 19.2041L3 19V5C3 3.89543 3.89543 3 5 3H19ZM5 4.5C4.72386 4.5 4.5 4.72386 4.5 5V19C4.5 19.2761 4.72386 19.5 5 19.5H7.99707V4.5H5ZM9.49707 19.5H19C19.2761 19.5 19.5 19.2761 19.5 19V5C19.5 4.72386 19.2761 4.5 19 4.5H9.49707V19.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <div class="pointer-events-none absolute left-1/2 top-full z-50 mt-1 hidden -translate-x-1/2 group-hover:flex">
      <div class="whitespace-nowrap rounded-2 bg-surface-inverse px-1.5 py-0.5 text-text-xs leading-text-xs text-element-inverse">
        Open sidebar
      </div>
    </div>
  </div>

  <div v-else class="relative flex h-16 shrink-0 items-center gap-3 border-b border-border-solid px-3.5">
    <div v-if="logo" class="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-4">
      <component :is="logo" />
    </div>
    <div v-else class="flex size-9 shrink-0 items-center justify-center rounded-4 bg-element-brand">
      <span class="text-text-md font-semibold leading-none text-element-inverse">
        {{ name.charAt(0).toUpperCase() }}
      </span>
    </div>
    <span class="min-w-0 flex-1 truncate text-left text-text-md leading-text-md font-semibold text-element-primary">
      {{ name }}
    </span>
    <div class="group relative flex size-6 shrink-0 items-center justify-center">
      <button
        type="button"
        class="absolute -inset-1 flex cursor-pointer items-center justify-center rounded-circle text-element-primary hover:bg-interaction-neutral-hover focus:outline-none"
        @click="$emit('toggle')"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M16.5303 9.53027L14.0605 12L16.5303 14.4697L15.4697 15.5303L12.4697 12.5303C12.1768 12.2374 12.1768 11.7626 12.4697 11.4697L15.4697 8.46973L16.5303 9.53027Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.0357 20.2128 20.887 19.2041 20.9893L19 21H5L4.7959 20.9893C3.85435 20.8938 3.1062 20.1457 3.01074 19.2041L3 19V5C3 3.89543 3.89543 3 5 3H19ZM5 4.5C4.72386 4.5 4.5 4.72386 4.5 5V19C4.5 19.2761 4.72386 19.5 5 19.5H7.99707V4.5H5ZM9.49707 19.5H19C19.2761 19.5 19.5 19.2761 19.5 19V5C19.5 4.72386 19.2761 4.5 19 4.5H9.49707V19.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div class="pointer-events-none absolute right-0 top-full z-50 mt-1 hidden group-hover:flex">
        <div class="whitespace-nowrap rounded-2 bg-surface-inverse px-1.5 py-0.5 text-text-xs leading-text-xs text-element-inverse">
          Close sidebar
        </div>
      </div>
    </div>
  </div>
</template>
