import type { ReactNode } from 'react';
import Divider from '../Divider/Divider';
import { OverlayHeaderPopover } from './OverlayHeaderPopover';

export type PopoverSize = 'md' | 'lg';
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export type PopoverProps = {
  className?: string;
  children?: ReactNode;
  size?: PopoverSize;
  placement?: PopoverPlacement;
  title?: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showScroll?: boolean;
  showSlot?: boolean;
  cancelLabel?: string;
  actionLabel?: string;
  skipLabel?: string;
  stepLabel?: string;
  onCancel?: () => void;
  onAction?: () => void;
  onSkip?: () => void;
};

const SIZE_CONFIG = {
  md: {
    width: 200,
    maxHeight: 295,
    contentHeight: 81,
    contentPadding: 'var(--sol-spacing-12)',
    headerSize: 'md' as const,
  },
  lg: {
    width: 300,
    maxHeight: 405,
    contentHeight: 93,
    contentPadding: 'var(--sol-spacing-16)',
    headerSize: 'lg' as const,
  },
};

const pointerPositionByPlacement: Record<PopoverPlacement, React.CSSProperties> = {
  bottom: {
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  top: {
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
  },
  left: {
    top: '50%',
    right: -8,
    transform: 'translateY(-50%) rotate(90deg)',
  },
  right: {
    top: '50%',
    left: -8,
    transform: 'translateY(-50%) rotate(-90deg)',
  },
};

function PopoverPointer({ placement }: { placement: PopoverPlacement }) {
  return (
    <span
      className="pointer-events-none absolute flex items-center justify-center"
      style={pointerPositionByPlacement[placement]}
      aria-hidden="true"
    >
      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" aria-hidden="true">
        <path
          d="M0.75 8L7.45 1.3Q8 0.75 8.55 1.3L15.25 8"
          fill="var(--sol-surface-container)"
        />
        <path
          d="M0.75 8L7.45 1.3Q8 0.75 8.55 1.3L15.25 8"
          stroke="var(--sol-border-solid)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.2 12.2C6.2 8.99 8.8 6.4 12 6.4C13.68 6.4 15.19 7.11 16.25 8.25L18 6.5V11.5H13L15.18 9.32C14.39 8.44 13.26 7.9 12 7.9C9.63 7.9 7.7 9.83 7.7 12.2H6.2ZM17.8 11.8C17.8 15.01 15.2 17.6 12 17.6C10.32 17.6 8.81 16.89 7.75 15.75L6 17.5V12.5H11L8.82 14.68C9.61 15.56 10.74 16.1 12 16.1C14.37 16.1 16.3 14.17 16.3 11.8H17.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DefaultSlot() {
  return (
    <div
      className="flex w-full flex-col items-start rounded-2"
      style={{
        gap: 'var(--sol-spacing-4)',
        padding: 'var(--sol-spacing-10)',
        border: '1px solid var(--color-pink)',
        background: 'var(--color-pink-container)',
        color: 'var(--color-pink)',
      }}
    >
      <RefreshIcon />
      <span className="font-regular underline text-text-xxs leading-text-xxs">
        ⓘ 슬롯 기능 유의사항
      </span>
    </div>
  );
}

function ScrollBar() {
  return (
    <span
      className="absolute bottom-0 right-0 top-0 flex items-center justify-center"
      style={{
        width: 12,
        padding: 'var(--sol-spacing-4) 3px',
      }}
      aria-hidden="true"
    >
      <span className="relative h-full w-[4px] overflow-hidden rounded-full">
        <span
          className="absolute left-0 right-0 top-0 rounded-full"
          style={{
            bottom: '50%',
            background: 'var(--sol-border-solid)',
          }}
        />
      </span>
    </span>
  );
}

function PopoverActionButton({
  children,
  variant,
  onClick,
}: {
  children: ReactNode;
  variant: 'secondary' | 'primary';
  onClick?: () => void;
}) {
  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap font-semibold"
      style={{
        minWidth: 68,
        height: 32,
        padding: '0 var(--sol-spacing-16)',
        borderRadius: 'var(--sol-radius-4)',
        border: `1px solid ${isPrimary ? 'var(--sol-primary)' : 'var(--sol-border-solid)'}`,
        background: isPrimary ? 'var(--sol-primary)' : 'var(--sol-surface-container)',
        color: isPrimary ? 'var(--sol-element-inverse)' : 'var(--sol-element-brand-variant)',
        fontSize: 'var(--sol-font-size-text-sm)',
        lineHeight: 'var(--sol-line-height-text-sm)',
      }}
    >
      {children}
    </button>
  );
}

function PopoverFooter({
  size,
  cancelLabel,
  actionLabel,
  skipLabel,
  stepLabel,
  onCancel,
  onAction,
  onSkip,
}: {
  size: PopoverSize;
  cancelLabel: string;
  actionLabel: string;
  skipLabel: string;
  stepLabel: string;
  onCancel?: () => void;
  onAction?: () => void;
  onSkip?: () => void;
}) {
  const showStep = size === 'lg';

  return (
    <div className="flex w-full flex-col">
      <Divider type="horizontal" color="G100" solid className="shrink-0" />
      <div
        className={`flex w-full items-center ${showStep ? 'justify-between' : 'justify-end'}`}
        style={{
          minHeight: size === 'lg' ? 57 : 56,
          padding: size === 'lg' ? 'var(--sol-spacing-12) var(--sol-spacing-16)' : 'var(--sol-spacing-12)',
        }}
      >
        {showStep && (
          <div className="flex shrink-0 items-center" style={{ gap: 'var(--sol-spacing-8)' }}>
            <button
              type="button"
              onClick={onSkip}
              className="font-semibold underline"
              style={{
                color: 'var(--sol-element-brand-variant)',
                fontSize: 'var(--sol-font-size-text-sm)',
                lineHeight: 'var(--sol-line-height-text-sm)',
              }}
            >
              {skipLabel}
            </button>
            <span
              className="font-regular text-element-tertiary"
              style={{
                fontSize: 'var(--sol-font-size-text-sm)',
                lineHeight: 'var(--sol-line-height-text-sm)',
              }}
            >
              {stepLabel}
            </span>
          </div>
        )}
        <div className="flex shrink-0 items-center" style={{ gap: 'var(--sol-spacing-8)' }}>
          <PopoverActionButton variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </PopoverActionButton>
          <PopoverActionButton variant="primary" onClick={onAction}>
            {actionLabel}
          </PopoverActionButton>
        </div>
      </div>
    </div>
  );
}

export default function Popover({
  className = '',
  children,
  size = 'md',
  placement = 'bottom',
  title = 'Header',
  showHeader = true,
  showFooter = true,
  showScroll = true,
  showSlot = true,
  cancelLabel = 'Cancel',
  actionLabel = 'Action',
  skipLabel = 'Skip',
  stepLabel = '1/5',
  onCancel,
  onAction,
  onSkip,
}: PopoverProps) {
  const config = SIZE_CONFIG[size];

  return (
    <div
      className={`relative flex flex-col overflow-visible bg-surface-container text-element-primary ${className}`}
      style={{
        width: config.width,
        maxHeight: config.maxHeight,
        border: '1px solid var(--sol-border-solid)',
        borderRadius: 'var(--sol-radius-4)',
        boxShadow: 'var(--sol-shadow-light)',
      }}
    >
      <PopoverPointer placement={placement} />
      <div className="flex flex-col overflow-hidden rounded-[inherit]">
        {showHeader && (
          <OverlayHeaderPopover
            title={title}
            size={config.headerSize}
            showNavigation={false}
            showClosedBtn
            showDivider
          />
        )}
        <div
          className="relative w-full shrink-0 overflow-hidden"
          style={{
            height: config.contentHeight,
            maxHeight: size === 'md' ? 200 : 300,
          }}
        >
          <div
            className="flex size-full flex-col items-start overflow-hidden rounded-[inherit]"
            style={{
              gap: 'var(--sol-spacing-12)',
              padding: config.contentPadding,
            }}
          >
            {showSlot && (children ?? <DefaultSlot />)}
          </div>
          {showScroll && <ScrollBar />}
        </div>
        {showFooter && (
          <PopoverFooter
            size={size}
            cancelLabel={cancelLabel}
            actionLabel={actionLabel}
            skipLabel={skipLabel}
            stepLabel={stepLabel}
            onCancel={onCancel}
            onAction={onAction}
            onSkip={onSkip}
          />
        )}
      </div>
    </div>
  );
}
