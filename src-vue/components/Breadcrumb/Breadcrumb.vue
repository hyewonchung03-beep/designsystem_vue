<script lang="ts">
export type BreadcrumbItemDef = {
  label: string;
  href?: string;
};
</script>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps<{
  items: BreadcrumbItemDef[];
  maxItems?: number;
}>();

// ── Overflow ("더 보기") menu ────────────────────────────────────────────────

const overflowOpen = ref(false);
const overflowRef = ref<HTMLLIElement | null>(null);

function onPointerDown(e: PointerEvent) {
  if (overflowRef.value && !overflowRef.value.contains(e.target as Node)) {
    overflowOpen.value = false;
  }
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown));
onUnmounted(() => document.removeEventListener('pointerdown', onPointerDown));

// ── Item derivation ──────────────────────────────────────────────────────────

const current = computed(() => props.items[props.items.length - 1]);
const links = computed(() => props.items.slice(0, -1));
const shouldCollapse = computed(() => props.maxItems !== undefined && links.value.length > props.maxItems);
const visibleLinks = computed(() => (shouldCollapse.value ? links.value.slice(0, props.maxItems) : links.value));
const hiddenLinks = computed(() => (shouldCollapse.value ? links.value.slice(props.maxItems) : []));

// ── Per-item hover / focus / truncation state ────────────────────────────────
// (mirrors the per-item useState + useEffect(scrollWidth check) in the React source)

const linkState = reactive<Record<number, { hovered: boolean; focused: boolean; truncated: boolean }>>({});
const currentState = reactive({ hovered: false, focused: false, truncated: false });

const linkTextEls: Record<number, HTMLSpanElement | null> = {};
let currentTextEl: HTMLSpanElement | null = null;

function getLinkState(index: number) {
  if (!linkState[index]) linkState[index] = { hovered: false, focused: false, truncated: false };
  return linkState[index];
}

function setLinkTextRef(index: number, el: Element | null) {
  linkTextEls[index] = el as HTMLSpanElement | null;
}

function setCurrentTextRef(el: Element | null) {
  currentTextEl = el as HTMLSpanElement | null;
}

function checkTruncated(el: HTMLSpanElement | null) {
  return !!el && el.scrollWidth > el.clientWidth;
}

function recomputeTruncation() {
  visibleLinks.value.forEach((_, index) => {
    getLinkState(index).truncated = checkTruncated(linkTextEls[index]);
  });
  currentState.truncated = checkTruncated(currentTextEl);
}

onMounted(() => recomputeTruncation());
watch(
  () => [props.items, props.maxItems],
  () => nextTick(recomputeTruncation),
);
</script>

<template>
  <nav v-if="items.length" aria-label="Breadcrumb" class="text-left">
    <ol class="flex items-center gap-1 text-left">
      <li
        v-for="(item, index) in visibleLinks"
        :key="index"
        class="flex items-center gap-1 text-left text-element-quaternary"
      >
        <span class="relative flex items-center">
          <a
            :href="item.href ?? '#'"
            class="relative flex items-center text-left no-underline text-element-quaternary focus:outline-none"
            @mouseenter="getLinkState(index).hovered = true"
            @mouseleave="getLinkState(index).hovered = false"
            @focus="getLinkState(index).focused = true"
            @blur="getLinkState(index).focused = false"
          >
            <span
              :ref="(el) => setLinkTextRef(index, el)"
              :class="`max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-sm leading-text-sm${
                getLinkState(index).hovered || getLinkState(index).focused ? ' underline' : ''
              }`"
            >
              {{ item.label }}
            </span>
            <span
              v-if="getLinkState(index).focused"
              aria-hidden="true"
              class="pointer-events-none absolute inset-y-0 -inset-x-0.5 rounded-4 border-2 border-primary"
            />
          </a>
          <span
            v-if="(getLinkState(index).hovered || getLinkState(index).focused) && getLinkState(index).truncated"
            role="tooltip"
            class="pointer-events-none absolute left-0 top-6 z-20 flex max-w-[240px] flex-col items-start text-left"
          >
            <span class="flex items-center justify-center rounded-2 bg-surface-inverse px-[6px] py-[2px] backdrop-blur-[2px]">
              <span class="whitespace-nowrap text-left text-text-xs leading-text-xs text-element-inverse">
                {{ item.label }}
              </span>
            </span>
          </span>
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.7959 11.2041C16.2352 11.6434 16.2352 12.3566 15.7959 12.7959L9.7959 18.7959L8.2041 17.2041L13.4082 12L8.2041 6.7959L9.7959 5.2041L15.7959 11.2041Z"
            fill="currentColor"
          />
        </svg>
      </li>

      <li v-if="hiddenLinks.length > 0" ref="overflowRef" class="relative flex items-center gap-1 text-left text-element-quaternary">
        <button
          type="button"
          aria-label="더 보기"
          :aria-expanded="overflowOpen"
          class="flex size-5 items-center justify-center rounded-full text-left hover:bg-fill-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          @click="overflowOpen = !overflowOpen"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="4" cy="10" r="1.5" fill="currentColor" />
            <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            <circle cx="16" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </button>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15.7959 11.2041C16.2352 11.6434 16.2352 12.3566 15.7959 12.7959L9.7959 18.7959L8.2041 17.2041L13.4082 12L8.2041 6.7959L9.7959 5.2041L15.7959 11.2041Z"
            fill="currentColor"
          />
        </svg>
        <ul v-if="overflowOpen" class="absolute left-0 top-7 z-10 min-w-[146px] rounded-4 bg-surface-container-high p-1 shadow-emphasize">
          <li v-for="(item, index) in hiddenLinks" :key="index">
            <a
              :href="item.href ?? '#'"
              class="flex min-h-8 items-center rounded-2 px-2 py-1.5 text-left text-text-sm leading-text-sm text-element-primary hover:bg-fill-subtle"
              @click="overflowOpen = false"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </li>

      <li class="text-left">
        <span class="relative flex items-center">
          <span
            aria-current="page"
            tabindex="0"
            class="relative flex items-center text-left focus:outline-none"
            @mouseenter="currentState.hovered = true"
            @mouseleave="currentState.hovered = false"
            @focus="currentState.focused = true"
            @blur="currentState.focused = false"
          >
            <span
              :ref="(el) => setCurrentTextRef(el)"
              :class="`max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-sm font-semibold leading-text-sm text-element-brand-variant${
                currentState.hovered || currentState.focused ? ' underline' : ''
              }`"
            >
              {{ current.label }}
            </span>
            <span
              v-if="currentState.focused"
              aria-hidden="true"
              class="pointer-events-none absolute inset-y-0 -inset-x-0.5 rounded-4 border-2 border-primary"
            />
          </span>
          <span
            v-if="(currentState.hovered || currentState.focused) && currentState.truncated"
            role="tooltip"
            class="pointer-events-none absolute left-0 top-6 z-20 flex max-w-[240px] flex-col items-start text-left"
          >
            <span class="flex items-center justify-center rounded-2 bg-surface-inverse px-[6px] py-[2px] backdrop-blur-[2px]">
              <span class="whitespace-nowrap text-left text-text-xs leading-text-xs text-element-inverse">
                {{ current.label }}
              </span>
            </span>
          </span>
        </span>
      </li>
    </ol>
  </nav>
</template>
