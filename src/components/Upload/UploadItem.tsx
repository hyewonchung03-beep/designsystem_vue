import { useState } from 'react';

export type UploadItemState = 'uploading' | 'error' | 'done' | 'read-only';

export type UploadItemProps = {
  fileName?: string;
  fileSize?: string;
  timeLeft?: string;
  showSubtext?: boolean;
  value?: number;
  state?: UploadItemState;
  imageSrc?: string;
  showPause?: boolean;
  showClose?: boolean;
  showTextButton?: boolean;
  defaultPaused?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  onRemove?: () => void;
  onRetry?: () => void;
  className?: string;
};

function IcPlay({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.4587 11.9997L9.25066 16.324V7.67552L16.4587 11.9997ZM10.7507 13.6745L13.5417 11.9997L10.7507 10.324V13.6745Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.45867 5.45872C9.07096 1.84658 14.9284 1.84663 18.5407 5.45872C22.153 9.07103 22.1529 14.9284 18.5407 18.5408L18.195 18.8689C14.6811 22.0434 9.31824 22.0434 5.80437 18.8689L5.45867 18.5408C1.84653 14.9284 1.84639 9.07101 5.45867 5.45872ZM17.4802 6.51927C14.4536 3.49296 9.54572 3.49291 6.51922 6.51927C3.49272 9.54577 3.49286 14.4536 6.51922 17.4802C9.54578 20.5068 14.4536 20.5068 17.4802 17.4802C20.5066 14.4536 20.5067 9.54579 17.4802 6.51927Z" fill="currentColor"/>
    </svg>
  );
}

function IcPause({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.5935 15.2693H9.09346V8.73123H10.5935V15.2693Z" fill="currentColor"/>
      <path d="M14.906 15.2693H13.406V8.73123H14.906V15.2693Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M5.45869 5.45877C9.071 1.84657 14.9284 1.84661 18.5407 5.45877C22.153 9.07109 22.153 14.9284 18.5407 18.5408L18.195 18.8689C14.6812 22.0434 9.31827 22.0434 5.8044 18.8689L5.45869 18.5408C1.8465 14.9284 1.8464 9.07107 5.45869 5.45877ZM17.4802 6.51932C14.4536 3.49294 9.54576 3.4929 6.51924 6.51932C3.49273 9.54583 3.49284 14.4537 6.51924 17.4803C9.5458 20.5068 14.4536 20.5068 17.4802 17.4803C20.5066 14.4537 20.5067 9.54585 17.4802 6.51932Z" fill="currentColor"/>
    </svg>
  );
}

function IcDelete({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75ZM12 10.9395L9.0957 8.03516L8.03516 9.0957L10.9395 12L8.03516 14.9043L9.0957 15.9648L12 13.0605L14.9043 15.9648L15.9648 14.9043L13.0605 12L15.9648 9.0957L14.9043 8.03516L12 10.9395Z" fill="currentColor"/>
    </svg>
  );
}

const STATE_STYLE: Record<UploadItemState, { wrapper: string; bar?: string }> = {
  uploading: {
    wrapper: 'bg-selected-container-variant border-tertiary',
    bar: 'bg-tertiary',
  },
  error: {
    wrapper: 'bg-error-container border-error-dim',
  },
  done: {
    wrapper: 'bg-surface-container border-border-normal',
  },
  'read-only': {
    wrapper: 'bg-fill-disabled border-border-normal-variant',
  },
};

export function UploadItem({
  fileName = 'title.jpg',
  fileSize = '4.39KB',
  timeLeft = '2 sec left',
  showSubtext = true,
  value = 60,
  state = 'uploading',
  imageSrc,
  showPause = true,
  showClose = true,
  showTextButton = true,
  defaultPaused = false,
  onPause,
  onResume,
  onRemove,
  onRetry,
  className = '',
}: UploadItemProps) {
  const [isPaused, setIsPaused] = useState(defaultPaused);

  function handleTogglePause() {
    if (isPaused) {
      setIsPaused(false);
      onResume?.();
    } else {
      setIsPaused(true);
      onPause?.();
    }
  }
  const clamped = Math.min(100, Math.max(0, value));
  const { wrapper, bar } = STATE_STYLE[state];
  const isUploading = state === 'uploading';
  const isReadOnly = state === 'read-only';

  if (isUploading) {
    return (
      <div
        className={`flex flex-col w-full rounded-4 border overflow-hidden ${wrapper} ${className}`}
        style={{
          padding: 'var(--sol-spacing-12) var(--sol-spacing-14)',
          gap: 'var(--sol-spacing-8)',
        }}
      >
        {/* Content row */}
        <div
          className="flex items-center w-full"
          style={{ gap: 'var(--sol-spacing-8)' }}
        >
          {/* File icon + info */}
          <div
            className="flex items-center flex-1 min-w-0"
            style={{ gap: 'var(--sol-spacing-8)' }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="shrink-0"
                style={{ objectFit: 'contain' }}
              />
            ) : (
              <span className="shrink-0 text-element-quaternary" style={{ display: 'block', width: 28, height: 28 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4.25879 18.75V5.25C4.2588 3.59318 5.60198 2.25005 7.25879 2.25H15.8838V2.25684C16.3663 2.28824 16.8138 2.50179 17.1416 2.84668C17.465 3.18692 17.9682 3.70115 18.4463 4.12891L18.793 4.45117C19.1645 4.80902 19.5898 5.24659 19.8643 5.53125C20.1838 5.86267 20.3633 6.2975 20.3809 6.75H20.3838V18.75C20.3837 20.4068 19.0406 21.75 17.3838 21.75H7.25879C5.60195 21.75 4.25881 20.4068 4.25879 18.75ZM15.8838 6.375C15.8838 6.58199 16.0518 6.74981 16.2588 6.75H18.876C18.8625 6.6821 18.8315 6.62042 18.7852 6.57227C18.4127 6.18591 17.8146 5.57564 17.4463 5.24609C16.9231 4.77795 16.3872 4.22974 16.0547 3.87988C16.0053 3.82793 15.946 3.79232 15.8838 3.77148V6.375ZM5.75879 18.75C5.75881 19.5784 6.43038 20.25 7.25879 20.25H17.3838C18.2122 20.25 18.8838 19.5784 18.8838 18.75V8.25H16.2588C15.2234 8.24981 14.3838 7.41042 14.3838 6.375V3.75H7.25879C6.43041 3.75005 5.75879 4.4216 5.75879 5.25V18.75Z" fill="currentColor"/>
                </svg>
              </span>
            )}
            <div className="flex flex-col flex-1 min-w-0" style={{ gap: 'var(--sol-spacing-2)' }}>
              <span
                className="truncate text-element-primary"
                style={{
                  fontSize: 'var(--sol-font-size-text-sm)',
                  lineHeight: 'var(--sol-line-height-text-sm)',
                  fontWeight: 'var(--sol-font-weight-regular)',
                }}
              >
                {fileName}
              </span>
              {showSubtext && (
                <span
                  className="text-element-tertiary"
                  style={{
                    fontSize: 'var(--sol-font-size-text-xxs)',
                    lineHeight: 'var(--sol-line-height-text-xxs)',
                  }}
                >
                  {fileSize}{timeLeft && ` · ${timeLeft}`}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="shrink-0 flex items-center" style={{ gap: 'var(--sol-spacing-8)' }}>
            {showPause && (
              <button
                type="button"
                onClick={handleTogglePause}
                aria-label={isPaused ? '재개' : '일시정지'}
                className="flex items-center justify-center text-element-quaternary"
              >
                {isPaused ? <IcPlay size={20} /> : <IcPause size={20} />}
              </button>
            )}
            {showClose && (
              <button
                type="button"
                onClick={onRemove}
                aria-label="삭제"
                className="flex items-center justify-center text-element-quaternary"
              >
                <IcDelete size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 w-full bg-fill-subtle shrink-0 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 ${bar}`}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center w-full rounded-4 border overflow-hidden ${wrapper} ${className}`}
      style={{
        padding: 'var(--sol-spacing-12) var(--sol-spacing-14)',
        gap: 'var(--sol-spacing-8)',
      }}
    >
      {/* File icon */}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          width={28}
          height={28}
          className="shrink-0"
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <span className="shrink-0 text-element-quaternary" style={{ display: 'block', width: 28, height: 28 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4.25879 18.75V5.25C4.2588 3.59318 5.60198 2.25005 7.25879 2.25H15.8838V2.25684C16.3663 2.28824 16.8138 2.50179 17.1416 2.84668C17.465 3.18692 17.9682 3.70115 18.4463 4.12891L18.793 4.45117C19.1645 4.80902 19.5898 5.24659 19.8643 5.53125C20.1838 5.86267 20.3633 6.2975 20.3809 6.75H20.3838V18.75C20.3837 20.4068 19.0406 21.75 17.3838 21.75H7.25879C5.60195 21.75 4.25881 20.4068 4.25879 18.75ZM15.8838 6.375C15.8838 6.58199 16.0518 6.74981 16.2588 6.75H18.876C18.8625 6.6821 18.8315 6.62042 18.7852 6.57227C18.4127 6.18591 17.8146 5.57564 17.4463 5.24609C16.9231 4.77795 16.3872 4.22974 16.0547 3.87988C16.0053 3.82793 15.946 3.79232 15.8838 3.77148V6.375ZM5.75879 18.75C5.75881 19.5784 6.43038 20.25 7.25879 20.25H17.3838C18.2122 20.25 18.8838 19.5784 18.8838 18.75V8.25H16.2588C15.2234 8.24981 14.3838 7.41042 14.3838 6.375V3.75H7.25879C6.43041 3.75005 5.75879 4.4216 5.75879 5.25V18.75Z" fill="currentColor"/>
          </svg>
        </span>
      )}

      {/* File info */}
      <div className="flex flex-col flex-1 min-w-0" style={{ gap: 'var(--sol-spacing-2)' }}>
        <span
          className="truncate text-element-primary"
          style={{
            fontSize: 'var(--sol-font-size-text-sm)',
            lineHeight: 'var(--sol-line-height-text-sm)',
            fontWeight: 'var(--sol-font-weight-regular)',
          }}
        >
          {fileName}
        </span>
        <span
          className="text-element-tertiary"
          style={{
            fontSize: 'var(--sol-font-size-text-xxs)',
            lineHeight: 'var(--sol-line-height-text-xxs)',
          }}
        >
          {fileSize}
        </span>
      </div>

      {/* Right actions */}
      <div className="shrink-0 flex items-center" style={{ gap: 'var(--sol-spacing-8)' }}>
        {showTextButton && !isReadOnly && (
          <button
            type="button"
            onClick={onRetry}
            className="group relative rounded-2 text-text-xs leading-text-xs font-semibold text-primary focus:outline-none"
          >
            <span
              className="absolute rounded-2 bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed"
              style={{ inset: 'calc(var(--sol-gap-2) * -1)' }}
            />
            <span className="relative">Retry</span>
          </button>
        )}
        {!isReadOnly && showClose && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="삭제"
            className="flex items-center justify-center text-element-quaternary"
          >
            <IcDelete size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
