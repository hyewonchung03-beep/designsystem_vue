import type { ReactNode } from 'react';

function IcCheck() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.0537 7.00391L10.2207 17.8369C9.92781 18.1298 9.45305 18.1298 9.16016 17.8369L3.94629 12.624L5.00684 11.5635L9.68945 16.2461L19.9932 5.94336L21.0537 7.00391Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type MenuItemVariant = 'default' | 'danger';

export type MenuItemProps = {
  label: string;
  sublabel?: string;
  variant?: MenuItemVariant;
  selected?: boolean;
  leadingIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function MenuItem({
  label,
  sublabel,
  variant = 'default',
  selected = false,
  leadingIcon,
  onClick,
  className = '',
}: MenuItemProps) {
  const isDanger = variant === 'danger';

  const labelColor = selected
    ? 'text-element-brand'
    : isDanger
    ? 'text-error'
    : 'text-element-primary';

  const labelWeight = selected ? 'font-semibold' : 'font-regular';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center w-full min-h-8 rounded-2 cursor-pointer focus:outline-none ${className}`}
    >
      <span className="absolute inset-0 rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
      <span className="relative flex flex-1 items-center gap-1.5 py-1.5 px-2">
        {leadingIcon && (
          <span className="shrink-0 flex items-center justify-center size-4 text-element-quaternary">
            {leadingIcon}
          </span>
        )}
        <span className={`flex-1 min-w-0 text-text-sm leading-text-sm ${labelWeight} ${labelColor} text-left overflow-hidden text-ellipsis whitespace-nowrap`}>
          {label}
        </span>
        {sublabel && !selected && (
          <span className="text-text-xs leading-text-xs font-regular text-element-tertiary text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {sublabel}
          </span>
        )}
        {selected && !isDanger && (
          <span className="shrink-0 flex items-center justify-center size-3.5 text-element-brand">
            <IcCheck />
          </span>
        )}
      </span>
    </button>
  );
}
