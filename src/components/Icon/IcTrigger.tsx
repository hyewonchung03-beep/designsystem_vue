import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import { IcResponsive } from './IcResponsive';

// ── Types ──────────────────────────────────────────────────────────────────

export type IcTriggerSize = 12 | 14 | 16 | 20 | 24;
export type IcTriggerRatio = '1:1' | '1:2';

export type IcTriggerProps = {
  size: IcTriggerSize;
  ratio?: IcTriggerRatio;
  inverse?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  'aria-label': string;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'style'>;

// ── Size tokens ────────────────────────────────────────────────────────────

const SIZE_1_1: Record<IcTriggerSize, string> = {
  12: 'size-icon-12',
  14: 'size-icon-14',
  16: 'size-icon-16',
  20: 'size-icon-20',
  24: 'size-icon-24',
};

const SIZE_1_2: Record<IcTriggerSize, string> = {
  12: 'w-icon-12 h-icon-24',
  14: 'w-icon-14 h-icon-28',
  16: 'w-icon-16 h-icon-32',
  20: 'w-icon-20 h-[40px]',
  24: 'w-icon-24 h-[48px]',
};

// ── Component ──────────────────────────────────────────────────────────────

export function IcTrigger({
  size,
  ratio = '1:1',
  inverse = false,
  children,
  disabled = false,
  onClick,
  ...rest
}: IcTriggerProps) {
  const is1to2 = ratio === '1:2';

  const colorCls = disabled
    ? 'cursor-not-allowed text-element-disabled'
    : `cursor-pointer ${inverse ? 'text-element-inverse' : 'text-element-primary'}`;

  const overlayCls = is1to2
    ? 'inset-x-[-1px] inset-y-[2px] rounded-2'
    : '-inset-1 rounded-circle';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center ${colorCls}
        focus:outline-none focus-visible:shadow-focus-button-ring ${is1to2 ? 'focus-visible:rounded-2' : 'focus-visible:rounded-circle'}
      `}
      {...rest}
    >
      {is1to2 ? (
        <span className={`relative z-[1] inline-flex shrink-0 items-center justify-center ${SIZE_1_2[size]}`}>
          {children}
        </span>
      ) : (
        <IcResponsive size={size} className="relative z-[1]">
          {children}
        </IcResponsive>
      )}

      {!disabled && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute ${overlayCls}
            bg-interaction-neutral-normal
            group-hover:bg-interaction-neutral-hover
            group-active:bg-interaction-neutral-pressed`}
        />
      )}
    </button>
  );
}
