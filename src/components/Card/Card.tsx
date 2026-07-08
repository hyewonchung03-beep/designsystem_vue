import { type ReactNode } from 'react';
import { IcTrigger, IcImage } from '../Icon';

// ── Types ──────────────────────────────────────────────────────────────────

export type CardProps = {
  title: string;
  description?: string;
  thumbnailSrc?: string;
  badgeLabel?: string;
  showDragHandle?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

// ── Card ───────────────────────────────────────────────────────────────────

export default function Card({
  title,
  description,
  thumbnailSrc,
  badgeLabel,
  showDragHandle = false,
  onClick,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={`relative flex flex-col overflow-clip rounded-4 border border-border-solid bg-surface-container text-element-primary shadow-extralight text-left
        ${onClick ? 'cursor-pointer' : ''}
        ${className ?? ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Thumbnail */}
      <div className="relative flex h-[131px] w-full shrink-0 items-center justify-center bg-surface-container-low">
        {thumbnailSrc ? (
          <img
            src={thumbnailSrc}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <span className="text-element-quaternary">
            <IcImage size={32} />
          </span>
        )}
      </div>

      {/* Badge */}
      {badgeLabel && (
        <div className="absolute right-[-1px] top-[-1px] flex items-center gap-1 overflow-clip rounded-bl-2 bg-element-brand-variant px-sol-8 py-sol-4">
          <span className="whitespace-nowrap text-text-xs leading-text-xxs font-semibold text-element-inverse">
            {badgeLabel}
          </span>
        </div>
      )}

      {/* Drag handle */}
      {showDragHandle && (
        <div className="absolute left-0.5 top-0">
          <IcTrigger size={12} ratio="1:2" aria-label="드래그 핸들" />
        </div>
      )}

      {/* Contents */}
      <div className="flex flex-col gap-1 border-t border-border-solid-variant px-sol-16 pb-sol-16 pt-sol-14">
        <p className="text-text-sm leading-text-sm font-semibold text-element-primary">
          {title}
        </p>
        {description && (
          <p className="line-clamp-3 text-text-xs leading-text-xs font-regular text-element-secondary">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
