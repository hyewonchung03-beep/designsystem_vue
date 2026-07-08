import { IcBlank } from '../Icon/IcBlank';
import type { IconSize } from '../Icon/IcResponsive';
import { DatatableCellText, type DatatableCellTextType } from './DatatableCellText';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableCellSize = 'sm' | 'md' | 'lg';
export type DatatableCellAlign = 'left' | 'center' | 'right';

export type { DatatableCellTextType };

export type DatatableCellProps = {
  content?: string;
  subText?: string;
  size?: DatatableCellSize;
  align?: DatatableCellAlign;
  textType?: DatatableCellTextType;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showSubText?: boolean;
  showTrend?: boolean;
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

// ── Size config ──────────────────────────────────────────────────────────────

const sizeConfig: Record<
  DatatableCellSize,
  { minH: string; py: string; textClass: string; subTextClass: string; iconSize: IconSize }
> = {
  sm: {
    minH: 'min-h-[34px]',
    py: 'py-2',
    textClass: 'text-text-xs leading-text-xs',
    subTextClass: 'text-text-xxs leading-text-xxs',
    iconSize: 16,
  },
  md: {
    minH: 'min-h-[40px]',
    py: 'py-2.5',
    textClass: 'text-text-sm leading-text-sm',
    subTextClass: 'text-text-xs leading-text-xs',
    iconSize: 20,
  },
  lg: {
    minH: 'min-h-[46px]',
    py: 'py-3',
    textClass: 'text-text-md leading-text-md',
    subTextClass: 'text-text-sm leading-text-sm-compact',
    iconSize: 20,
  },
};

const alignConfig: Record<DatatableCellAlign, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

// ── Icons ────────────────────────────────────────────────────────────────────

function IcTrendUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 4L14 8H6L10 4ZM10 16L6 12H14L10 16Z"
        fill="currentColor"
        opacity={0.3}
      />
      <path d="M10 4L14 8H6L10 4Z" fill="currentColor" />
    </svg>
  );
}

function IcTrendDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 4L14 8H6L10 4ZM10 16L6 12H14L10 16Z"
        fill="currentColor"
        opacity={0.3}
      />
      <path d="M10 16L6 12H14L10 16Z" fill="currentColor" />
    </svg>
  );
}

// ── DatatableCell ────────────────────────────────────────────────────────────

export function DatatableCell({
  content = 'Content',
  subText = 'Data',
  size = 'lg',
  align = 'left',
  textType = 'regular',
  showLeftIcon = false,
  showRightIcon = false,
  showSubText = false,
  showTrend = false,
  trendValue = 'N',
  trendDirection = 'up',
  leftIcon,
  rightIcon,
  className,
}: DatatableCellProps) {
  const cfg = sizeConfig[size];
  const alignCls = alignConfig[align];

  return (
    <div
      className={`flex ${cfg.minH} min-w-20 items-center gap-2 ${cfg.py} ${className ?? ''}`}
    >
      <div className={`flex min-w-0 flex-1 flex-col gap-1.5 ${alignCls}`}>
        <div className="flex w-full items-center gap-1.5">
          {showLeftIcon && (
            <span className="flex shrink-0 items-center justify-center text-element-secondary">
              {leftIcon ?? <IcBlank size={cfg.iconSize} />}
            </span>
          )}

          <div className={`flex min-w-0 flex-1 flex-col ${alignCls}`}>
            <DatatableCellText text={content} size={size} type={textType} />
          </div>

          {showRightIcon && (
            <span className="flex shrink-0 items-center justify-center text-element-secondary">
              {rightIcon ?? <IcBlank size={cfg.iconSize} />}
            </span>
          )}

          {showTrend && (
            <span className="flex shrink-0 items-center gap-0.5 text-success">
              {trendDirection === 'up' ? <IcTrendUp /> : <IcTrendDown />}
              <span className={`${cfg.textClass} font-regular`}>
                {trendValue}%
              </span>
            </span>
          )}
        </div>

        {showSubText && (
          <span
            className={`${cfg.subTextClass} font-regular text-element-quaternary`}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}

export default DatatableCell;
