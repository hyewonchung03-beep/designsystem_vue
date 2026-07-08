import { useState } from 'react';
import {
  IcLayoutCollapse,
  IcLayoutExpand,
  IcChevronDown,
  IcChevronUp,
} from './icons';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SideNavSubItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

export type SideNavItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: SideNavSubItem[];
};

export type SideNavigationProps = {
  items: SideNavItem[];
  activeId?: string;
  defaultActiveId?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  profileName?: string;
  profileLogo?: React.ReactNode;
  onActiveChange?: (id: string) => void;
  onCollapsedChange?: (collapsed: boolean) => void;
};

// ─── Profile ─────────────────────────────────────────────────────────────────

function LogoMark({ name, logo }: { name: string; logo?: React.ReactNode }) {
  if (logo) {
    return (
      <div className="shrink-0 size-9 rounded-4 overflow-hidden flex items-center justify-center">
        {logo}
      </div>
    );
  }
  return (
    <div className="shrink-0 size-9 rounded-4 bg-element-brand flex items-center justify-center">
      <span className="text-element-inverse font-semibold text-text-md leading-none">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

function ExpandedProfile({
  name,
  logo,
  onCollapse,
}: {
  name: string;
  logo?: React.ReactNode;
  onCollapse: () => void;
}) {
  return (
    <div className="relative flex items-center gap-3 h-16 px-3.5 shrink-0 border-b border-border-solid">
      <LogoMark name={name} logo={logo} />
      <span className="flex-1 min-w-0 text-text-md leading-text-md font-semibold text-element-primary truncate">
        {name}
      </span>
      {/* ic_trigger: 24×24, 호버 영역 32×32 (-inset-1), 툴팁 */}
      <div className="group relative shrink-0 flex items-center justify-center size-6">
        <button
          type="button"
          onClick={onCollapse}
          className="absolute -inset-1 rounded-circle flex items-center justify-center text-element-primary hover:bg-interaction-neutral-hover cursor-pointer focus:outline-none"
        >
          <IcLayoutCollapse />
        </button>
        <div className="pointer-events-none absolute right-0 top-full mt-1 z-50 hidden group-hover:flex">
          <div className="bg-surface-inverse text-element-inverse text-text-xs leading-text-xs whitespace-nowrap px-1.5 py-0.5 rounded-2">
            Close sidebar
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsedProfile({
  onExpand,
}: {
  name: string;
  logo?: React.ReactNode;
  onExpand: () => void;
}) {
  return (
    <div className="group relative flex items-center justify-center h-16 w-full shrink-0 border-b border-border-solid">
      <button
        type="button"
        onClick={onExpand}
        className="flex items-center justify-center size-9 rounded-4 bg-interaction-neutral-hover text-element-primary cursor-pointer focus:outline-none"
      >
        <IcLayoutExpand />
      </button>
      {/* 툴팁: Open sidebar */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50 hidden group-hover:flex">
        <div className="bg-surface-inverse text-element-inverse text-text-xs leading-text-xs whitespace-nowrap px-1.5 py-0.5 rounded-2">
          Open sidebar
        </div>
      </div>
    </div>
  );
}

// ─── Nav Items (expanded) ────────────────────────────────────────────────────

function ExpandedNavItem({
  item,
  isActive,
  onClick,
}: {
  item: SideNavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={item.disabled}
      className={`relative flex items-center gap-2 w-full h-10 px-2 rounded-4 text-left overflow-hidden focus:outline-none ${
        item.disabled
          ? 'cursor-not-allowed'
          : isActive
          ? 'bg-selected-container cursor-pointer'
          : 'hover:bg-interaction-neutral-hover cursor-pointer'
      }`}
    >
      {item.icon && (
        <span
          className={`shrink-0 size-5 flex items-center justify-center ${
            isActive
              ? 'text-element-brand-variant'
              : item.disabled
              ? 'text-element-disabled'
              : 'text-element-secondary'
          }`}
        >
          {item.icon}
        </span>
      )}
      <span
        className={`flex-1 text-text-md leading-text-md truncate ${
          isActive
            ? 'font-semibold text-element-brand-variant'
            : item.disabled
            ? 'font-regular text-element-disabled'
            : 'font-regular text-element-secondary'
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

function SubItem({
  item,
  isActive,
  onClick,
}: {
  item: SideNavSubItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={item.disabled}
      className={`relative flex items-center w-full h-10 pl-9 pr-2 rounded-4 text-left overflow-hidden focus:outline-none ${
        item.disabled
          ? 'cursor-not-allowed'
          : isActive
          ? 'bg-selected-container cursor-pointer'
          : 'hover:bg-interaction-neutral-hover cursor-pointer'
      }`}
    >
      <span
        className={`flex-1 text-text-md leading-text-md truncate ${
          isActive
            ? 'font-semibold text-element-brand-variant'
            : item.disabled
            ? 'font-regular text-element-disabled'
            : 'font-regular text-element-secondary'
        }`}
      >
        {item.label}
      </span>
    </button>
  );
}

function NavGroup({
  item,
  isExpanded,
  hasActiveChild,
  activeId,
  onToggle,
  onSelect,
}: {
  item: SideNavItem;
  isExpanded: boolean;
  hasActiveChild: boolean;
  activeId: string;
  onToggle: () => void;
  onSelect: (id: string) => void;
}) {
  const highlighted = hasActiveChild;

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={onToggle}
        disabled={item.disabled}
        className={`relative flex items-center gap-2 w-full h-10 px-2 rounded-4 text-left overflow-hidden focus:outline-none ${
          item.disabled
            ? 'cursor-not-allowed'
            : 'hover:bg-interaction-neutral-hover cursor-pointer'
        }`}
      >
        {item.icon && (
          <span
            className={`shrink-0 size-5 flex items-center justify-center ${
              highlighted
                ? 'text-element-brand-variant'
                : item.disabled
                ? 'text-element-disabled'
                : 'text-element-secondary'
            }`}
          >
            {item.icon}
          </span>
        )}
        <span
          className={`flex-1 text-text-md leading-text-md truncate ${
            highlighted
              ? 'font-semibold text-element-brand-variant'
              : item.disabled
              ? 'font-regular text-element-disabled'
              : 'font-regular text-element-secondary'
          }`}
        >
          {item.label}
        </span>
        <span
          className={`shrink-0 ${
            highlighted
              ? 'text-element-brand-variant'
              : item.disabled
              ? 'text-element-disabled'
              : 'text-element-secondary'
          }`}
        >
          {isExpanded ? <IcChevronUp /> : <IcChevronDown />}
        </span>
      </button>

      {isExpanded && item.children && (
        <div className="flex flex-col gap-1">
          {item.children.map((sub) => (
            <SubItem
              key={sub.id}
              item={sub}
              isActive={sub.id === activeId}
              onClick={() => !sub.disabled && onSelect(sub.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Nav Item (collapsed, icon-only) ────────────────────────────────────────

function CollapsedNavItem({
  item,
  isActive,
  onClick,
}: {
  item: SideNavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        onClick={onClick}
        disabled={item.disabled}
        className={`relative flex items-center justify-center size-10 rounded-4 focus:outline-none ${
          item.disabled
            ? 'cursor-not-allowed'
            : isActive
            ? 'bg-selected-container cursor-pointer'
            : 'hover:bg-interaction-neutral-hover cursor-pointer'
        }`}
        title={item.label}
      >
        <span
          className={`size-5 flex items-center justify-center ${
            isActive
              ? 'text-element-brand-variant'
              : item.disabled
              ? 'text-element-disabled'
              : 'text-element-secondary'
          }`}
        >
          {item.icon}
        </span>
      </button>
      {/* Tooltip */}
      <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 hidden group-hover:flex items-center">
        <div className="bg-surface-inverse text-element-inverse text-text-xs leading-text-xs whitespace-nowrap px-1.5 py-0.5 rounded-2">
          {item.label}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SideNavigation({
  items,
  activeId: controlledActiveId,
  defaultActiveId = '',
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  profileName = 'Company',
  profileLogo,
  onActiveChange,
  onCollapsedChange,
}: SideNavigationProps) {
  const [internalActiveId, setInternalActiveId] = useState(defaultActiveId);
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const active = controlledActiveId ?? defaultActiveId;
    const set = new Set<string>();
    for (const item of items) {
      if (item.children?.some((c) => c.id === active)) set.add(item.id);
    }
    return set;
  });

  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const activeId = controlledActiveId ?? internalActiveId;

  function handleSelect(id: string) {
    setInternalActiveId(id);
    onActiveChange?.(id);
  }

  function handleToggleCollapse() {
    const next = !isCollapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }

  function handleToggleGroup(id: string) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function isGroupActive(item: SideNavItem) {
    return item.children?.some((c) => c.id === activeId) ?? false;
  }

  return (
    <div
      className={`flex flex-col h-full bg-surface-default border-r border-border-solid ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Profile header */}
      {isCollapsed ? (
        <CollapsedProfile name={profileName} logo={profileLogo} onExpand={handleToggleCollapse} />
      ) : (
        <ExpandedProfile name={profileName} logo={profileLogo} onCollapse={handleToggleCollapse} />
      )}

      {/* Spacer */}
      <div className="h-4 shrink-0" />

      {/* Navigation */}
      {isCollapsed ? (
        <div className="flex flex-col items-center gap-1 px-3 flex-1 overflow-y-auto">
          {items.map((item) => (
            <CollapsedNavItem
              key={item.id}
              item={item}
              isActive={item.id === activeId || isGroupActive(item)}
              onClick={() => {
                if (item.disabled) return;
                const targetId = item.children ? (item.children[0]?.id ?? item.id) : item.id;
                handleSelect(targetId);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-1 px-3.5 flex-1 overflow-y-auto pb-6">
          {items.map((item) => {
            if (item.children && item.children.length > 0) {
              return (
                <NavGroup
                  key={item.id}
                  item={item}
                  isExpanded={expandedGroups.has(item.id)}
                  hasActiveChild={isGroupActive(item)}
                  activeId={activeId}
                  onToggle={() => handleToggleGroup(item.id)}
                  onSelect={handleSelect}
                />
              );
            }
            return (
              <ExpandedNavItem
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                onClick={() => !item.disabled && handleSelect(item.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
