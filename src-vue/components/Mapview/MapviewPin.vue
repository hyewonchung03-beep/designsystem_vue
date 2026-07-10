<script lang="ts">
export type MapviewPinType = 'icon' | 'occupancy' | 'Issues';
export type MapviewPinAlertColor = 'red' | 'yellow';
</script>

<script setup lang="ts">
import { computed } from 'vue';
import MapviewPinBg from './MapviewPinBg.vue';
import MapviewPinIcon, { type MapviewPinIconType, type MapviewPinIconOption } from './MapviewPinIcon.vue';

const props = withDefaults(
  defineProps<{
    type?: MapviewPinType;
    selected?: boolean;
    showAlert?: boolean;
    alertColor?: MapviewPinAlertColor;
    text?: string;
    iconType?: MapviewPinIconType;
    iconOption?: MapviewPinIconOption;
    showIconNumber?: boolean;
    iconCount?: number;
    class?: string;
  }>(),
  {
    type: 'icon',
    selected: false,
    showAlert: false,
    alertColor: 'red',
    text: 'NN',
    iconType: 'device',
    iconOption: 'gateway',
    showIconNumber: false,
    iconCount: 2,
    class: '',
  },
);

const isLarge = computed(() => props.selected && (props.type === 'icon' || props.type === 'Issues'));
const size = computed(() => (isLarge.value ? 84 : 66));

const pinBgInsetPct = computed(() =>
  isLarge.value
    ? { top: 0.0947, side: 0.1548 }
    : { top: 0.0909, side: 0.1515 },
);
const pinTop = computed(() => size.value * pinBgInsetPct.value.top);
const pinSide = computed(() => size.value * pinBgInsetPct.value.side);
const pinW = computed(() => size.value - pinSide.value * 2);
const pinH = computed(() => pinW.value * (54 / 46));

const circleRadius = computed(() => pinW.value / 2);
const circleCenterX = computed(() => pinSide.value + circleRadius.value);
const circleCenterY = computed(() => pinTop.value + circleRadius.value);

const iconSize = computed(() => (isLarge.value ? 36 : 28));
const iconTop = computed(() => circleCenterY.value - iconSize.value / 2);
const iconLeft = computed(() => circleCenterX.value - iconSize.value / 2);

const textTailOffset = computed(() => (isLarge.value ? 5 : 4));
const textTop = computed(() => size.value / 2 - textTailOffset.value);
const textWidth = computed(() => (isLarge.value ? 58 : 46));

const alertSize = computed(() => (isLarge.value ? 30 : 24));

const textColorClass = computed(() => {
  if (props.type !== 'Issues') return 'text-element-tertiary';
  return props.alertColor === 'yellow' ? 'text-yellow' : 'text-error';
});
</script>

<template>
  <div :class="`relative ${$props.class}`" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Bottom shadow oval -->
    <div
      class="absolute"
      style="left: 39%; right: 39%; bottom: 6%; height: 5px; border-radius: 50%; background: radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 100%); opacity: 0.8"
    />

    <!-- Pin background -->
    <div
      class="absolute"
      :style="{
        top: `${pinTop}px`,
        left: `${pinSide}px`,
        width: `${pinW}px`,
        height: `${pinH}px`,
        filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.16))',
      }"
    >
      <MapviewPinBg />
    </div>

    <!-- Icon -->
    <div
      v-if="type === 'icon'"
      class="absolute overflow-clip"
      :style="{ top: `${iconTop}px`, left: `${iconLeft}px`, width: `${iconSize}px`, height: `${iconSize}px` }"
    >
      <MapviewPinIcon
        :type="iconType"
        :option="iconOption"
        :show-number="showIconNumber"
        :count="iconCount"
        :size="iconSize"
      />
    </div>

    <!-- Text (occupancy / Issues) -->
    <div
      v-if="type === 'occupancy' || type === 'Issues'"
      class="absolute flex items-center justify-center"
      :style="{
        top: `${textTop}px`,
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: `${textWidth}px`,
        padding: 'var(--sol-spacing-4)',
      }"
    >
      <span
        :class="`text-center w-full ${textColorClass}`"
        :style="{
          fontSize: isLarge ? 'var(--sol-font-size-text-xl)' : 'var(--sol-font-size-text-md)',
          lineHeight: isLarge ? 'var(--sol-line-height-text-xl)' : 'var(--sol-line-height-text-sm)',
          fontWeight: 'var(--sol-font-weight-semibold)',
        }"
      >
        {{ text }}
      </span>
    </div>

    <!-- Alert badge -->
    <div
      v-if="showAlert"
      class="absolute"
      :style="{ top: '0px', right: '3px', width: `${alertSize}px`, height: `${alertSize}px` }"
    >
      <svg v-if="alertColor === 'red'" :width="alertSize" :height="alertSize" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4638 5.12823C10.085 2.49046 13.9158 2.49046 15.537 5.12823C15.5435 5.13878 15.5496 5.1496 15.5556 5.16045L21.2167 15.4964C21.5864 16.1034 21.9181 16.957 21.6581 17.8538C21.1566 19.5833 19.562 20.8499 17.6699 20.8499H6.33001C4.43803 20.8497 2.84424 19.5831 2.34271 17.8538C2.08269 16.957 2.41447 16.1034 2.78411 15.4964L8.44525 5.16045C8.4512 5.14959 8.45732 5.13878 8.4638 5.12823Z" fill="#E76067"/>
        <path d="M11.25 15.5278H12.75V17.0679H11.25V15.5278ZM11.25 7.61963H12.75V13.6616H11.25V7.61963Z" fill="white"/>
      </svg>
      <svg v-else :width="alertSize" :height="alertSize" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4638 5.12823C10.085 2.49046 13.9158 2.49046 15.537 5.12823C15.5435 5.13878 15.5496 5.1496 15.5556 5.16045L21.2167 15.4964C21.5864 16.1034 21.9181 16.957 21.6581 17.8538C21.1566 19.5833 19.562 20.8499 17.6699 20.8499H6.33001C4.43803 20.8497 2.84424 19.5831 2.34271 17.8538C2.08269 16.957 2.41447 16.1034 2.78411 15.4964L8.44525 5.16045C8.4512 5.14959 8.45732 5.13878 8.4638 5.12823Z" fill="#D4AE00"/>
        <path d="M11.25 15.5278H12.75V17.0679H11.25V15.5278ZM11.25 7.61963H12.75V13.6616H11.25V7.61963Z" fill="white"/>
      </svg>
    </div>
  </div>
</template>
