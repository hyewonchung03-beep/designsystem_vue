import type { ReactNode } from 'react';
import { IcBlank } from '../Icon/IcBlank';
import { DatatableCellText, type DatatableCellTextType, type DatatableCellTextSize } from '../DatatableCell/DatatableCellText';

function IcArrowCircleUp({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM11.25 10.4102L8.59961 13.0605L7.53906 12L11.4697 8.06934L11.5264 8.01855C11.8209 7.77806 12.2556 7.79483 12.5303 8.06934L16.4609 12L15.4004 13.0605L12.75 10.4102V16.1504H11.25V10.4102ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" fill="currentColor"/>
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────

export type StructuredListBodyCellAlign = 'left' | 'center' | 'right';
export type StructuredListBodyCellTrendDirection = 'up' | 'down';

export type { DatatableCellTextType, DatatableCellTextSize };

export type StructuredListBodyCellProps = {
  text?: string;
  subText?: string;
  align?: StructuredListBodyCellAlign;
  condensed?: boolean;
  custom?: boolean;
  showText?: boolean;
  showSubText?: boolean;
  showLeftIcon?: boolean;
  leadingIcon?: ReactNode;
  showTrendIndicator?: boolean;
  trendValue?: string;
  trendDirection?: StructuredListBodyCellTrendDirection;
  textType?: DatatableCellTextType;
  textSize?: DatatableCellTextSize;
  children?: ReactNode;
  className?: string;
};

// ── TrendIndicator ───────────────────────────────────────────────────────────

function TrendIndicator({ value }: { value: string }) {
  return (
    <div className="flex items-center shrink-0 text-success gap-0.5">
      <IcArrowCircleUp size={16} />
      <span className="text-text-sm leading-text-sm font-regular whitespace-nowrap">
        {value}
      </span>
    </div>
  );
}

// ── StructuredListBodyCell ───────────────────────────────────────────────────

export function StructuredListBodyCell({
  text = 'Content',
  subText = 'Data',
  align = 'left',
  condensed = false,
  custom = false,
  showText = true,
  showSubText = false,
  showLeftIcon = false,
  leadingIcon,
  showTrendIndicator = false,
  trendValue = 'N%',
  trendDirection: _trendDirection = 'up',
  textType = 'regular',
  textSize = 'md',
  children,
  className = '',
}: StructuredListBodyCellProps) {
  const isLeft = align === 'left';
  const isCenter = align === 'center';
  const isRight = align === 'right';
  const isNotCustomLeft = !custom && isLeft;
  const isCustomCenter = custom && isCenter;

  const containerStyle = condensed
    ? { minHeight: 'var(--sol-gap-36)', paddingTop: 'var(--sol-gap-8)', paddingBottom: 'var(--sol-gap-8)', gap: custom ? 0 : 'var(--sol-gap-6)' }
    : { minHeight: 'var(--sol-gap-60)', paddingTop: 'var(--sol-gap-16)', paddingBottom: 'var(--sol-gap-24)', gap: custom ? 0 : 'var(--sol-gap-6)' };

  const itemsCls = condensed ? 'items-center' : 'items-start';
  const justifyCls = isRight ? 'justify-end' : isCenter ? 'justify-center' : '';

    return (
    <div
      className={`flex min-w-[80px] ${itemsCls} ${justifyCls} ${className}`}
      style={containerStyle}
    >
      {/* ── Trend indicator: RIGHT / CENTER (left of text) ── */}
      {!custom && (isRight || isCenter) && showTrendIndicator && (
        <TrendIndicator value={trendValue} />
      )}

      {/* ── Right-aligned text ── */}
      {!custom && isRight && showText && (
        <div className="flex flex-1 flex-col items-end min-w-0 gap-1">
          <div className="flex items-center justify-end w-full shrink-0 gap-1">
            {showLeftIcon && (
              <span className="shrink-0 text-element-secondary">
                {leadingIcon ?? <IcBlank size={16} />}
              </span>
            )}
            <DatatableCellText text={text} size={textSize} type={textType} className="text-right shrink-0" />
          </div>
          {showSubText && (
            <span className="text-text-xs leading-text-xs font-regular text-element-quaternary text-right w-full shrink-0">
              {subText}
            </span>
          )}
        </div>
      )}

      {/* ── Center-aligned text ── */}
      {!custom && isCenter && showText && (
        <div className="flex flex-1 flex-col items-center min-w-0 gap-1">
          <div className="flex items-center justify-center w-full shrink-0 gap-1">
            {showLeftIcon && (
              <span className="shrink-0 text-element-secondary">
                {leadingIcon ?? <IcBlank size={16} />}
              </span>
            )}
            <DatatableCellText text={text} size={textSize} type={textType} className="text-center shrink-0" />
          </div>
          {showSubText && (
            <span className="text-text-xs leading-text-xs font-regular text-element-quaternary text-center w-full shrink-0">
              {subText}
            </span>
          )}
        </div>
      )}

      {/* ── Custom center slot ── */}
      {isCustomCenter && (
        <div className="flex flex-1 flex-col items-start min-w-0">{children}</div>
      )}

      {/* ── Left-aligned text ── */}
      {isNotCustomLeft && showText && (
        <div className="flex flex-1 flex-col items-start min-w-0 gap-1">
          <div className="flex items-center w-full shrink-0 gap-1.5">
            {showLeftIcon && (
              <span className="shrink-0 text-element-secondary">
                {leadingIcon ?? <IcBlank size={16} />}
              </span>
            )}
            <DatatableCellText text={text} size={textSize} type={textType} />
          </div>
          {showSubText && (
            <span
              className="text-text-sm leading-text-xs-2line font-regular text-element-quaternary w-full shrink-0"
            >
              {subText}
            </span>
          )}
        </div>
      )}

      {/* ── Trend indicator: LEFT align (right of text) ── */}
      {isNotCustomLeft && showTrendIndicator && (
        <TrendIndicator value={trendValue} />
      )}
    </div>
  );
}
