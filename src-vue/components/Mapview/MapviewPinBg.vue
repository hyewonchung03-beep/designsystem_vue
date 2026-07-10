<script setup lang="ts">
import { useId } from 'vue';

withDefaults(defineProps<{ class?: string }>(), { class: '' });

const uid = useId();
const gid = `mappin-bg-${uid}`;
</script>

<template>
  <svg
    width="46"
    height="54"
    viewBox="0 0 46 54"
    fill="none"
    aria-hidden="true"
    :class="`block w-full h-full ${$props.class}`"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23 0C35.7025 0 46 10.1542 46 22.68C46 32.284 39.9463 40.4937 31.3965 43.8012L24.31 53.3527C24.1623 53.5527 23.9661 53.7159 23.7381 53.8285C23.5101 53.9412 23.2569 54 23 54C22.7431 54 22.4899 53.9412 22.2619 53.8285C22.0339 53.7159 21.8377 53.5527 21.69 53.3527L14.6035 43.8012C6.05366 40.4937 0 32.284 0 22.68C0 10.1542 10.2975 0 23 0Z"
      :fill="`url(#${gid})`"
    />
    <defs>
      <radialGradient
        :id="gid"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(23 21.4392) rotate(90) scale(38.5636 39.1077)"
      >
        <stop offset="0.4" stop-color="white" />
        <stop offset="1" stop-color="#E8E6F8" />
      </radialGradient>
    </defs>
  </svg>
</template>
