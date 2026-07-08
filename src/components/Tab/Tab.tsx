import { useState } from 'react';
import { BadgeCounter } from '../Badge/BadgeCounter';

export type TabSize = 'sm' | 'md';

export type TabItemDef = {
  label: string;
  badge?: number;
  dot?: boolean;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItemDef[];
  size?: TabSize;
  defaultIndex?: number;
  onChange?: (index: number) => void;
};

const TEXT_CLS: Record<TabSize, string> = {
  md: 'text-text-md leading-text-md',
  sm: 'text-text-sm leading-text-sm',
};

const HEIGHT_CLS: Record<TabSize, string> = {
  md: 'h-12',
  sm: 'h-10',
};

// Focus ring extends 5px beyond the tab's left/right edges.
// md: flush to top/bottom (inset: 0 -5px)
// sm: 2px inset top/bottom (inset: 2px -5px)
const FOCUS_RING_INSET: Record<TabSize, string> = {
  md: '[inset:0_-5px]',
  sm: '[inset:2px_-5px]',
};

function TabBadge({ count, selected }: { count: number; selected: boolean }) {
  if (selected) return <BadgeCounter count={count} />;
  return (
    <span
      className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-2 px-1 text-text-xs leading-text-xs font-semibold bg-fill-disabled text-element-disabled"
    >
      {count}
    </span>
  );
}

function TabDot({ size }: { size: TabSize }) {
  return (
    <span className={`flex shrink-0 items-start ${size === 'md' ? 'h-[22px]' : 'h-[20px]'}`}>
      <span className="size-1.5 rounded-circle bg-error" />
    </span>
  );
}

export default function Tabs({
  items,
  size = 'md',
  defaultIndex = 0,
  onChange,
}: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  function handleSelect(index: number) {
    if (items[index]?.disabled) return;
    setSelectedIndex(index);
    onChange?.(index);
  }

  return (
    <div className="relative w-full">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-border-solid pointer-events-none"
      />
      <div
        role="tablist"
        className={`flex items-center pl-6 gap-4 ${HEIGHT_CLS[size]}`}
      >
        {items.map((item, index) => {
          const isSelected = selectedIndex === index;
          const isDisabled = item.disabled ?? false;

          const textColor = isDisabled
            ? 'text-element-disabled'
            : isSelected
            ? 'text-element-brand'
            : size === 'sm'
            // sm 미선택: 키보드 포커스 시에만 tertiary로 변경
            ? 'text-element-quaternary focus-visible:text-element-tertiary'
            : 'text-element-quaternary';

          const indicatorColor = isDisabled ? 'bg-fill-disabled' : 'bg-element-brand';

          return (
            <button
              key={index}
              role="tab"
              type="button"
              aria-selected={isSelected}
              disabled={isDisabled}
              onClick={() => handleSelect(index)}
              className={`group relative flex items-center gap-1 px-1 h-full shrink-0 focus:outline-none before:content-none ${
                isDisabled
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-interaction-neutral-hover'
              } ${textColor}`}
            >
              <span
                className={`${TEXT_CLS[size]} ${
                  isSelected ? 'font-semibold' : 'font-normal'
                } whitespace-nowrap`}
              >
                {item.label}
              </span>

              {item.badge !== undefined && (
                <TabBadge count={item.badge} selected={isSelected && !isDisabled} />
              )}

              {item.dot && <TabDot size={size} />}

              {/* Bottom indicator */}
              {isSelected && (
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[2px] ${indicatorColor}`}
                />
              )}

              {/* Focus ring: 키보드 포커스(:focus-visible)일 때만 표시 */}
              <span
                aria-hidden="true"
                className={`absolute border-2 border-element-brand rounded-[3px] pointer-events-none hidden group-focus-visible:block ${FOCUS_RING_INSET[size]}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
