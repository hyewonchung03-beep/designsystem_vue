import type { ReactNode } from 'react';
import Divider from '../Divider/Divider';
import { IcBlank } from '../Icon/IcBlank';
import { IcTrigger } from '../Icon/IcTrigger';
import { BadgeCounter } from '../Badge/BadgeCounter';

function IcChevronLeft() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.5302 6.53027L10.0605 12L15.5302 17.4697L14.4697 18.5303L8.46967 12.5303C8.17678 12.2374 8.17678 11.7626 8.46967 11.4697L14.4697 5.46973L15.5302 6.53027Z" fill="currentColor" />
    </svg>
  );
}

function IcClose() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z" fill="currentColor" />
    </svg>
  );
}

export type OverlayHeaderPopoverSize = 'sm' | 'md' | 'lg';

export type OverlayHeaderPopoverProps = {
  title: ReactNode;
  size?: OverlayHeaderPopoverSize;
  showNavigation?: boolean;
  onNavigate?: () => void;
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  showDescription?: boolean;
  description?: ReactNode;
  showNumber?: boolean;
  count?: number;
  showClosedBtn?: boolean;
  onClose?: () => void;
  showLinkBtn?: boolean;
  linkLabel?: string;
  onLinkClick?: () => void;
  showBadge?: boolean;
  badgeLabel?: string;
  showDivider?: boolean;
  className?: string;
};

const SIZE_STYLES = {
  lg: {
    padding: {
      paddingTop: 'var(--sol-spacing-10)',
      paddingBottom: 'var(--sol-spacing-10)',
      paddingLeft: 'var(--sol-spacing-16)',
      paddingRight: 'var(--sol-spacing-16)',
    },
    gap: 'var(--sol-spacing-10)',
    navIconSize: 20 as const,
    closeIconSize: 20 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-md)',
      lineHeight: 'var(--sol-line-height-text-md)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xs)',
      lineHeight: 'var(--sol-line-height-text-xs)',
    },
  },
  md: {
    padding: {
      paddingTop: 'var(--sol-spacing-8)',
      paddingBottom: 'var(--sol-spacing-8)',
      paddingLeft: 'var(--sol-spacing-12)',
      paddingRight: 'var(--sol-spacing-12)',
    },
    gap: 'var(--sol-spacing-8)',
    navIconSize: 16 as const,
    closeIconSize: 16 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-sm)',
      lineHeight: 'var(--sol-line-height-text-sm)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xxs)',
      lineHeight: 'var(--sol-line-height-text-xxs)',
    },
  },
  sm: {
    padding: {
      paddingTop: 'var(--sol-spacing-6)',
      paddingBottom: 'var(--sol-spacing-6)',
      paddingLeft: 'var(--sol-spacing-12)',
      paddingRight: 'var(--sol-spacing-12)',
    },
    gap: 'var(--sol-spacing-6)',
    navIconSize: 14 as const,
    closeIconSize: 16 as const,
    titleStyle: {
      fontSize: 'var(--sol-font-size-text-xs)',
      lineHeight: 'var(--sol-line-height-text-xs)',
    },
    descStyle: {
      fontSize: 'var(--sol-font-size-text-xxs)',
      lineHeight: 'var(--sol-line-height-text-xxs)',
    },
  },
} as const;

export function OverlayHeaderPopover({
  title,
  size = 'lg',
  showNavigation = true,
  onNavigate,
  showLeadingIcon = false,
  leadingIcon,
  showDescription = false,
  description,
  showNumber = false,
  count = 1,
  showClosedBtn = true,
  onClose,
  showLinkBtn = false,
  linkLabel = 'Clear',
  onLinkClick,
  showBadge = false,
  badgeLabel = 'OOS',
  showDivider = true,
  className = '',
}: OverlayHeaderPopoverProps) {
  const s = SIZE_STYLES[size];

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className="flex items-center w-full"
        style={{ ...s.padding, gap: s.gap }}
      >
        {/* 뒤로가기 네비게이션 */}
        {showNavigation && (
          <div className="shrink-0 flex items-center">
            <IcTrigger size={s.navIconSize} aria-label="뒤로" onClick={onNavigate}>
              <span className="text-element-quaternary inline-flex">
                <IcChevronLeft />
              </span>
            </IcTrigger>
          </div>
        )}

        {/* 선택적 leading icon */}
        {showLeadingIcon && (
          <span className="shrink-0" style={{ width: 16, height: 16 }}>
            {leadingIcon ?? <IcBlank size={16} />}
          </span>
        )}

        {/* 타이틀 + 배지 + 설명 */}
        <div className="flex flex-1 flex-col min-w-0" style={{ gap: 'var(--sol-spacing-2)' }}>
          <div className="flex items-center" style={{ gap: 'var(--sol-spacing-4)' }}>
            {/* sm 전용 OOS 배지 */}
            {size === 'sm' && showBadge && (
              <span
                className="flex items-center justify-center rounded-full bg-error-container shrink-0"
                style={{
                  padding: 'var(--sol-spacing-4) var(--sol-spacing-8)',
                  fontSize: 'var(--sol-font-size-text-xxs)',
                  lineHeight: 'var(--sol-line-height-text-xxs)',
                  color: 'var(--sol-error)',
                  fontWeight: 600,
                }}
              >
                {badgeLabel}
              </span>
            )}
            <p
              className="font-semibold text-element-primary overflow-hidden text-ellipsis whitespace-nowrap"
              style={s.titleStyle}
            >
              {title}
            </p>
            {showNumber && (
              <span className="shrink-0">
                <BadgeCounter count={count} />
              </span>
            )}
          </div>
          {showDescription && description && (
            <p
              className="text-element-tertiary font-regular overflow-hidden text-ellipsis whitespace-nowrap w-full"
              style={s.descStyle}
            >
              {description}
            </p>
          )}
        </div>

        {/* 우측 컨트롤: sm은 링크버튼 + 닫기, lg/md는 닫기만 */}
        <div
          className="flex items-center shrink-0"
          style={{ gap: size === 'sm' ? 'var(--sol-spacing-8)' : 'var(--sol-spacing-12)' }}
        >
          {size === 'sm' && showLinkBtn && (
            <button
              type="button"
              onClick={onLinkClick}
              className="font-semibold text-primary underline whitespace-nowrap"
              style={s.titleStyle}
            >
              {linkLabel}
            </button>
          )}
          {showClosedBtn && (
            <div className="shrink-0 flex items-center">
              <IcTrigger size={s.closeIconSize} aria-label="닫기" onClick={onClose}>
                <span className="text-element-quaternary inline-flex">
                  <IcClose />
                </span>
              </IcTrigger>
            </div>
          )}
        </div>
      </div>

      {showDivider && <Divider type="horizontal" color="G100" solid className="shrink-0" />}
    </div>
  );
}
