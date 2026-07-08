import { type ReactNode } from 'react';
import { Badge } from '../Badge/Badge';
import type { BadgeOption } from '../Badge/Badge';
import { IcImage } from '../Icon/IcImage';

// ── Types ──────────────────────────────────────────────────────────────────

export type CardItemType = 'horizontal' | 'vertical';
export type CardItemSize = 'sm' | 'md';
export type CardItemState = 'enabled' | 'disabled';

export type CardItemProps = {
  title: string;
  description?: string;
  thumbnailSrc?: string;
  badgeLabel?: string;
  badgeOption?: BadgeOption;
  dateText?: string;
  type?: CardItemType;
  size?: CardItemSize;
  showThumbnail?: boolean;
  showMeta?: boolean;
  showDescription?: boolean;
  state?: CardItemState;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

// ── Size / type config ────────────────────────────────────────────────────

const THUMBNAIL_WIDTH: Record<CardItemSize, string> = {
  sm: 'w-[100px]',
  md: 'w-[124px]',
};

const CONTENT_CLS: Record<CardItemSize, string> = {
  sm: 'gap-2 p-sol-14',
  md: 'gap-3 p-4',
};

const TITLE_CLS: Record<CardItemSize, string> = {
  sm: 'text-text-md leading-text-md',
  md: 'text-text-lg leading-text-lg',
};

const DESC_CLS: Record<CardItemSize, string> = {
  sm: 'text-text-sm leading-text-sm-compact',
  md: 'text-text-md leading-text-sm',
};

// ── CardItem ──────────────────────────────────────────────────────────────

export default function CardItem({
  title,
  description,
  thumbnailSrc,
  badgeLabel,
  badgeOption = 'neutral',
  dateText,
  type = 'horizontal',
  size = 'md',
  showThumbnail = true,
  showMeta = true,
  showDescription = true,
  state = 'enabled',
  onClick,
  className,
  children,
}: CardItemProps) {
  const isDisabled = state === 'disabled';
  const isInteractive = !!onClick && !isDisabled;
  const isVertical = type === 'vertical';

  const thumbnail = showThumbnail && (
    isVertical ? (
      <div className="relative flex w-full shrink-0 items-center bg-surface-container-low">
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-element-quaternary">
            <IcImage size={32} />
          </div>
        )}
        <div className="w-full" style={{ paddingBottom: '56.25%' }} />
      </div>
    ) : (
      <div className={`relative flex ${THUMBNAIL_WIDTH[size]} shrink-0 items-center self-stretch bg-surface-container-low`}>
        {thumbnailSrc ? (
          <img src={thumbnailSrc} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-element-quaternary">
            <IcImage size={32} />
          </div>
        )}
      </div>
    )
  );

  const VERTICAL_CONTENT_CLS: Record<CardItemSize, string> = {
    sm: 'gap-2 px-sol-14 pt-sol-14 pb-sol-18',
    md: 'gap-3 px-4 pt-4 pb-5',
  };

  const contentPadding = isVertical
    ? VERTICAL_CONTENT_CLS[size]
    : CONTENT_CLS[size];

  return (
    <div
      className={[
        'overflow-clip rounded-4 border border-border-solid bg-surface-container shadow-extralight text-left',
        isVertical ? 'flex flex-col items-start' : 'flex items-start',
        isDisabled ? 'pointer-events-none opacity-50' : '',
        isInteractive ? 'cursor-pointer hover:shadow-light active:shadow-extralight transition-shadow' : '',
        className ?? '',
      ].join(' ')}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {thumbnail}

      <div
        className={[
          'flex min-w-0 flex-1 flex-col self-stretch',
          contentPadding,
          isVertical && showThumbnail ? 'border-t border-border-solid-variant' : '',
        ].join(' ')}
      >
        {showMeta && (badgeLabel || dateText) && (
          <div className="flex w-full items-center gap-2">
            {badgeLabel && (
              <Badge label={badgeLabel} size="sm" type="solid" option={badgeOption} />
            )}
            {dateText && (
              <p className="min-w-0 flex-1 text-right text-text-xs leading-text-xs font-regular text-element-quaternary">
                {dateText}
              </p>
            )}
          </div>
        )}

        <div className="flex w-full flex-col gap-0.5">
          <p className={`font-semibold text-element-primary ${TITLE_CLS[size]}`}>
            {title}
          </p>
          {showDescription && description && (
            <p className={`font-regular text-element-secondary ${DESC_CLS[size]}`}>
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}
