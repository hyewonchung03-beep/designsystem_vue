import { useState, useId, type ReactElement } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

export type SectionMessageStatus =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'brand-light';

export type SectionMessageProps = {
  status?: SectionMessageStatus;
  heading?: string;
  linkLabel?: string;
  showLink?: boolean;
  showClose?: boolean;
  onLinkClick?: () => void;
  onClose?: () => void;
  className?: string;
};

// ── Status config (Tailwind class lookup) ──────────────────────────────────

const statusConfig: Record<
  SectionMessageStatus,
  { bg: string; iconColor: string; role: 'status' | 'alert' }
> = {
  neutral:       { bg: 'bg-surface-base-variant', iconColor: 'text-element-primary', role: 'status' },
  info:          { bg: 'bg-light-blue-container',  iconColor: 'text-info',            role: 'status' },
  success:       { bg: 'bg-green-container',       iconColor: 'text-success',         role: 'status' },
  warning:       { bg: 'bg-yellow-container',      iconColor: 'text-warning',         role: 'alert' },
  error:         { bg: 'bg-error-container',       iconColor: 'text-error',           role: 'alert' },
  'brand-light': { bg: 'bg-selected-container',    iconColor: 'text-element-primary', role: 'status' },
};

// ── Icons ──────────────────────────────────────────────────────────────────

function ResponsiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.70801 15.0007V13.334H3.95801V15.0007C3.95801 15.5759 4.42438 16.0423 4.99967 16.0423H6.66634V17.2923H4.99967C3.73402 17.2923 2.70801 16.2663 2.70801 15.0007ZM11.6663 16.0423V17.2923H8.33301V16.0423H11.6663ZM16.0413 15.0007V13.334H17.2913V15.0007C17.2913 16.2663 16.2653 17.2923 14.9997 17.2923H13.333V16.0423H14.9997C15.575 16.0423 16.0413 15.5759 16.0413 15.0007ZM3.95801 8.33398V11.6673H2.70801V8.33398H3.95801ZM17.2913 8.33398V11.6673H16.0413V8.33398H17.2913ZM2.70801 5.00065C2.70801 3.735 3.73402 2.70898 4.99967 2.70898H6.66634V3.95898H4.99967C4.42438 3.95898 3.95801 4.42535 3.95801 5.00065V6.66732H2.70801V5.00065ZM16.0413 5.00065C16.0413 4.42535 15.575 3.95898 14.9997 3.95898H13.333V2.70898H14.9997C16.2653 2.70898 17.2913 3.735 17.2913 5.00065V6.66732H16.0413V5.00065ZM11.6663 2.70898V3.95898H8.33301V2.70898H11.6663Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.7087 9.99935C17.7087 14.2565 14.2575 17.7077 10.0003 17.7077C5.74313 17.7077 2.29199 14.2565 2.29199 9.99935C2.29199 5.74215 5.74313 2.29102 10.0003 2.29102C14.2575 2.29102 17.7087 5.74215 17.7087 9.99935Z" fill="currentColor" />
      <path d="M9.375 9.37467H10.625V13.4575H9.375V9.37467ZM10.6323 6.54102V7.79102H9.375V6.54102H10.6323Z" className="fill-static-white" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.4509 15.45C12.4406 18.4603 7.56 18.4603 4.54971 15.45C1.53942 12.4397 1.53942 7.55903 4.54971 4.54873C7.56 1.53844 12.4406 1.53844 15.4509 4.54873C18.4612 7.55903 18.4612 12.4397 15.4509 15.45Z" fill="currentColor" />
      <path d="M13.6143 8.32715L9.3776 12.563C9.13352 12.807 8.73788 12.8071 8.49382 12.563L6.37305 10.4422L7.25684 9.55843L8.93571 11.2373L12.7305 7.44336L13.6143 8.32715Z" className="fill-static-white" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.05381 4.27343C8.40486 2.07555 11.5964 2.0755 12.9474 4.27343C12.9528 4.2823 12.958 4.29164 12.963 4.30077L17.6808 12.9141C17.9888 13.42 18.2657 14.1315 18.0489 14.8789C17.6309 16.3199 16.3023 17.3749 14.7257 17.375H5.27549C3.69878 17.375 2.3703 16.32 1.95224 14.8789C1.73548 14.1315 2.01235 13.42 2.32041 12.9141L7.03818 4.30077C7.04319 4.29164 7.04835 4.2823 7.05381 4.27343Z" fill="currentColor" />
      <path d="M9.375 12.9398H10.625V14.2231H9.375V12.9398ZM9.375 6.34961H10.625V11.3846H9.375V6.34961Z" className="fill-static-white" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10.0003" cy="9.99935" r="7.70833" fill="currentColor" />
      <path d="M9.375 11.999H10.625V13.2799H9.375V11.999ZM9.375 5.83203H10.625V10.6237H9.375V5.83203Z" className="fill-static-white" />
    </svg>
  );
}

function StatusIcon({ status }: { status: SectionMessageStatus }) {
  const { iconColor } = statusConfig[status];
  const icons: Record<string, () => ReactElement> = {
    neutral: ResponsiveIcon,
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    'brand-light': ResponsiveIcon,
  };
  const Icon = icons[status];

  return (
    <span className={`flex size-5 shrink-0 items-center justify-center ${iconColor}`}>
      <Icon />
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.1201 3.93945L9.06087 7.9987L13.1201 12.0586L12.0596 13.1191L7.99967 9.0599L3.94043 13.1191L2.87988 12.0586L6.93848 7.9987L2.87988 3.93945L3.94043 2.87891L7.99967 6.9375L12.0596 2.87891L13.1201 3.93945Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── SectionMessage ─────────────────────────────────────────────────────────

export default function SectionMessage({
  status = 'neutral',
  heading = 'Heading',
  linkLabel = 'Link',
  showLink = true,
  showClose = true,
  onLinkClick,
  onClose,
  className,
}: SectionMessageProps) {
  const [visible, setVisible] = useState(true);
  const labelId = useId();
  const { bg, role } = statusConfig[status];

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <section
      className={`w-64 overflow-hidden rounded-2 shadow-extralight text-left ${bg} text-element-primary ${className ?? ''}`}
      role={role}
      aria-labelledby={labelId}
    >
      <div className="flex items-center gap-2 px-2.5 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <StatusIcon status={status} />
          <strong
            id={labelId}
            className="min-w-0 flex-1 truncate text-text-sm font-semibold leading-text-sm text-element-primary"
          >
            {heading}
          </strong>
        </div>

        {(showLink || showClose) && (
          <div className="flex shrink-0 items-center gap-3">
            {showLink && (
              <button
                type="button"
                className="group relative text-text-sm font-semibold leading-text-sm text-element-brand-variant underline
                  focus-visible:outline-none focus-visible:shadow-focus-button-ring"
                onClick={onLinkClick}
              >
                <span className="absolute -inset-0.5 rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed" />
                <span className="relative">{linkLabel}</span>
              </button>
            )}
            {showClose && (
              <button
                type="button"
                className="flex size-4 items-center justify-center rounded-circle text-element-quaternary
                  focus-visible:outline-none focus-visible:shadow-focus-button-ring"
                aria-label="Close section message"
                onClick={handleClose}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
