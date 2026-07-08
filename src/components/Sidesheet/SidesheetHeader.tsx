import type { ReactNode } from 'react';
import { IcTrigger } from '../Icon/IcTrigger';

function IcClose() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M18.9707 5.91064L12.8809 11.9995L18.9707 18.0894L17.9102 19.1499L11.8203 13.0601L5.73145 19.1499L4.6709 18.0894L10.7598 11.9995L4.6709 5.91064L5.73145 4.8501L11.8203 10.939L17.9102 4.8501L18.9707 5.91064Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type SidesheetHeaderProps = {
  title: ReactNode;
  showDivider?: boolean;
  onClose?: () => void;
  className?: string;
};

export function SidesheetHeader({
  title,
  showDivider = true,
  onClose,
  className = '',
}: SidesheetHeaderProps) {
  return (
    <div
      className={`relative flex shrink-0 w-full items-start ${className}`}
      style={{
        gap: 'var(--sol-spacing-8)',
        padding: 'var(--sol-spacing-20) var(--sol-spacing-20) var(--sol-spacing-16) var(--sol-spacing-20)',
      }}
    >
      <p
        className="flex-1 font-semibold text-element-primary min-w-0 break-words"
        style={{
          fontSize: 'var(--sol-font-size-text-md)',
          lineHeight: 'var(--sol-line-height-text-lg)',
        }}
      >
        {title}
      </p>
      <div className="shrink-0 flex items-center">
        <IcTrigger size={20} aria-label="닫기" onClick={onClose}>
          <span className="inline-flex text-element-quaternary">
            <IcClose />
          </span>
        </IcTrigger>
      </div>
      {showDivider && (
        <div className="absolute left-0 right-0 bottom-0 h-px bg-border-solid-variant" />
      )}
    </div>
  );
}
