<script lang="ts">
import type { Component } from 'vue';

export type SideNavSubItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

export type SideNavItem = {
  id: string;
  label: string;
  icon?: Component;
  disabled?: boolean;
  children?: SideNavSubItem[];
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import NavProfile from './NavProfile.vue';
import NavItem from './NavItem.vue';
import NavGroup from './NavGroup.vue';
import NavItemCollapsed from './NavItemCollapsed.vue';

const props = withDefaults(
  defineProps<{
    items: SideNavItem[];
    activeId?: string;
    defaultActiveId?: string;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    profileName?: string;
    profileLogo?: Component;
  }>(),
  // collapsed는 명시적으로 undefined를 기본값으로 선언해야 한다: Vue는 기본값이 없는
  // Boolean prop을 전달하지 않으면 undefined 대신 자동으로 false로 캐스팅하므로,
  // 이 선언이 없으면 uncontrolled 모드(props.collapsed ?? internalCollapsed.value)가
  // 항상 collapsed=false로 강제되어 defaultCollapsed가 무시된다.
  { defaultActiveId: '', defaultCollapsed: false, profileName: 'Company', collapsed: undefined },
);

const emit = defineEmits<{
  'active-change': [id: string];
  'collapsed-change': [collapsed: boolean];
}>();

const internalActiveId = ref(props.defaultActiveId);
const internalCollapsed = ref(props.defaultCollapsed);

const activeId = computed(() => props.activeId ?? internalActiveId.value);
const isCollapsed = computed(() => props.collapsed ?? internalCollapsed.value);

const expandedGroups = ref(
  new Set(props.items.filter((item) => item.children?.some((c) => c.id === activeId.value)).map((item) => item.id)),
);

function isGroupActive(item: SideNavItem) {
  return item.children?.some((c) => c.id === activeId.value) ?? false;
}

function handleSelect(id: string) {
  internalActiveId.value = id;
  emit('active-change', id);
}

function handleToggleCollapse() {
  const next = !isCollapsed.value;
  internalCollapsed.value = next;
  emit('collapsed-change', next);
}

function handleToggleGroup(id: string) {
  const next = new Set(expandedGroups.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  expandedGroups.value = next;
}

function handleCollapsedItemClick(item: SideNavItem) {
  if (item.disabled) return;
  const targetId = item.children ? (item.children[0]?.id ?? item.id) : item.id;
  handleSelect(targetId);
}
</script>

<template>
  <div
    class="flex h-full flex-col bg-surface-default border-r border-border-solid"
    :class="isCollapsed ? 'w-16' : 'w-60'"
  >
    <NavProfile :collapsed="isCollapsed" :name="profileName" :logo="profileLogo" @toggle="handleToggleCollapse" />

    <div class="h-4 shrink-0" />

    <div v-if="isCollapsed" class="flex flex-1 flex-col items-center gap-1 overflow-y-auto px-3">
      <NavItemCollapsed
        v-for="item in items"
        :key="item.id"
        :item="item"
        :is-active="item.id === activeId || isGroupActive(item)"
        @click="handleCollapsedItemClick(item)"
      />
    </div>

    <div v-else class="flex flex-1 flex-col gap-1 overflow-y-auto px-3.5 pb-6">
      <template v-for="item in items" :key="item.id">
        <NavGroup
          v-if="item.children && item.children.length > 0"
          :item="item"
          :is-expanded="expandedGroups.has(item.id)"
          :has-active-child="isGroupActive(item)"
          :active-id="activeId"
          @toggle="handleToggleGroup(item.id)"
          @select="handleSelect"
        />
        <NavItem
          v-else
          :item="item"
          :is-active="item.id === activeId"
          @click="!item.disabled && handleSelect(item.id)"
        />
      </template>
    </div>
  </div>
</template>
