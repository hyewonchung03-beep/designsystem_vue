export type ToastMessageStatus = 'success' | 'info' | 'warning' | 'error' | 'default';

export type ToastMessageProps = {
  status?: ToastMessageStatus;
  inverse?: boolean;
  text?: string;
  description?: string;
  actionLabel?: string;
  showDescription?: boolean;
  showAction?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  className?: string;
};

// ── Status icon ────────────────────────────────────────────────────────────

const STATUS_ICON: Record<
  Exclude<ToastMessageStatus, 'default'>,
  { colorClass: string; path: string; fillRule?: 'evenodd' }
> = {
  success: {
    colorClass: 'text-success',
    fillRule: 'evenodd',
    path: 'M9.99935 3.54102C6.43251 3.54102 3.54102 6.43251 3.54102 9.99935C3.54102 13.5662 6.43251 16.4577 9.99935 16.4577C13.5662 16.4577 16.4577 13.5662 16.4577 9.99935C16.4577 6.43251 13.5662 3.54102 9.99935 3.54102ZM2.29102 9.99935C2.29102 5.74215 5.74215 2.29102 9.99935 2.29102C14.2565 2.29102 17.7077 5.74215 17.7077 9.99935C17.7077 14.2565 14.2565 17.7077 9.99935 17.7077C5.74215 17.7077 2.29102 14.2565 2.29102 9.99935ZM13.6288 8.31629L9.37879 12.5663C9.13471 12.8104 8.73899 12.8104 8.49491 12.5663L6.36991 10.4413L7.25379 9.55741L8.93685 11.2405L12.7449 7.43241L13.6288 8.31629Z',
  },
  info: {
    colorClass: 'text-info',
    path: 'M16.4587 9.99935C16.4587 6.43251 13.5672 3.54102 10.0003 3.54102C6.43349 3.54102 3.54199 6.43251 3.54199 9.99935C3.54199 13.5662 6.43349 16.4577 10.0003 16.4577C13.5672 16.4577 16.4587 13.5662 16.4587 9.99935ZM9.37533 9.37435H10.6253V13.458H9.37533V9.37435ZM10.6327 6.54069V7.79069H9.37533V6.54069H10.6327ZM17.7087 9.99935C17.7087 14.2565 14.2575 17.7077 10.0003 17.7077C5.74313 17.7077 2.29199 14.2565 2.29199 9.99935C2.29199 5.74215 5.74313 2.29102 10.0003 2.29102C14.2575 2.29102 17.7087 5.74215 17.7087 9.99935Z',
  },
  warning: {
    colorClass: 'text-warning',
    path: 'M7.05315 4.27375C8.36187 2.1444 11.398 2.07748 12.8149 4.07356L12.9467 4.27375L12.9622 4.30061L17.6871 12.9269C17.9921 13.432 18.2626 14.1372 18.0476 14.8784C17.6296 16.3196 16.3017 17.3752 14.7249 17.3752H5.27499C3.69817 17.3752 2.37021 16.3196 1.95224 14.8784C1.73729 14.1372 2.00779 13.432 2.31275 12.9269L7.03768 4.30061L7.05315 4.27375ZM11.8725 4.91421C11.0074 3.52893 8.99148 3.52869 8.12655 4.91421L3.40894 13.5275C3.40394 13.5366 3.39812 13.5455 3.39266 13.5544C3.15428 13.9422 3.07887 14.2755 3.15259 14.5301L3.20956 14.7002C3.52705 15.534 4.333 16.1252 5.27499 16.1252H14.7249C15.7296 16.1252 16.5798 15.4524 16.8473 14.5301C16.921 14.2755 16.8456 13.9422 16.6072 13.5544C16.6017 13.5455 16.5959 13.5366 16.5909 13.5275L11.8725 4.91421ZM9.37492 12.9399H10.6249V14.2233H9.37492V12.9399ZM9.37492 6.34976H10.6249V11.3848H9.37492V6.34976Z',
  },
  error: {
    colorClass: 'text-error',
    path: 'M16.4587 9.99935C16.4587 6.43251 13.5672 3.54102 10.0003 3.54102C6.43349 3.54102 3.54199 6.43251 3.54199 9.99935C3.54199 13.5662 6.43349 16.4577 10.0003 16.4577C13.5672 16.4577 16.4587 13.5662 16.4587 9.99935ZM9.37533 11.9997H10.6253V13.2806H9.37533V11.9997ZM9.37533 5.83268H10.6253V10.6243H9.37533V5.83268ZM17.7087 9.99935C17.7087 14.2565 14.2575 17.7077 10.0003 17.7077C5.74313 17.7077 2.29199 14.2565 2.29199 9.99935C2.29199 5.74215 5.74313 2.29102 10.0003 2.29102C14.2575 2.29102 17.7087 5.74215 17.7087 9.99935Z',
  },
};

function StatusIcon({ status }: { status: Exclude<ToastMessageStatus, 'default'> }) {
  const { colorClass, path, fillRule } = STATUS_ICON[status];
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      aria-hidden="true"
      className={`shrink-0 ${colorClass}`}
    >
      <path
        fillRule={fillRule}
        clipRule={fillRule ? 'evenodd' : undefined}
        d={path}
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M15.8091 4.9248L10.7342 9.99886L15.8091 15.0737L14.9253 15.9575L9.85042 10.8826L4.77637 15.9575L3.89258 15.0737L8.96663 9.99886L3.89258 4.9248L4.77637 4.04102L9.85042 9.11507L14.9253 4.04102L15.8091 4.9248Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── ToastMessage ───────────────────────────────────────────────────────────

export default function ToastMessage({
  status = 'success',
  inverse = false,
  text = 'Notification Message',
  description = 'Description text',
  actionLabel = 'Action',
  showDescription = true,
  showAction = true,
  showClose = true,
  onClose,
  onAction,
  className = '',
}: ToastMessageProps) {
  const titleCls   = inverse ? 'text-element-inverse'         : 'text-element-primary';
  const descCls    = inverse ? 'text-element-inverse-variant' : 'text-element-tertiary';
  const actionCls  = inverse ? 'text-element-inverse'         : 'text-element-brand-variant';
  const closeCls   = inverse ? 'text-element-inverse'         : 'text-element-quaternary';
  const bgCls      = inverse ? 'bg-surface-inverse-surface'   : 'bg-surface-container';
  const borderCls  = inverse ? ''                             : 'border border-border-solid';

  const actionOverlay = inverse
    ? 'bg-interaction-inverse-normal group-hover:bg-interaction-inverse-hover group-active:bg-interaction-inverse-pressed'
    : 'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed';

  const closeOverlay = inverse
    ? 'bg-interaction-inverse-normal group-hover:bg-interaction-inverse-hover group-active:bg-interaction-inverse-pressed'
    : 'bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed';

  const hasBody = showDescription || showAction;

  return (
    <div
      className={`inline-flex gap-3 items-start overflow-hidden px-3 py-2 rounded-4 shadow-emphasize text-left ${bgCls} ${titleCls} ${borderCls} ${className}`}
    >
      {/* Icon + Content */}
      <div className={`flex flex-1 min-w-0 items-start ${status !== 'default' ? 'gap-1.5' : ''}`}>
        {status !== 'default' && <StatusIcon status={status} />}

        <div className="flex flex-1 min-w-0 flex-col gap-0.5">
          <p className={`font-semibold truncate text-text-sm leading-text-sm ${titleCls}`}>
            {text}
          </p>

          {hasBody && (
            <div className="flex flex-col gap-2.5 pb-1">
              {showDescription && (
                <p className={`font-regular text-text-sm leading-text-xs-2line ${descCls}`}>
                  {description}
                </p>
              )}
              {showAction && (
                <button
                  type="button"
                  onClick={onAction}
                  className={`group relative w-fit font-semibold text-text-xs leading-text-xs ${actionCls} focus-visible:outline-none`}
                >
                  <span className={`absolute -inset-0.5 rounded-2 ${actionOverlay}`} />
                  <span className="relative">{actionLabel}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Close button */}
      {showClose && (
        <div className="flex h-5 shrink-0 items-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className={`group relative flex size-4 items-center justify-center rounded-circle ${closeCls} focus-visible:outline-none`}
          >
            <span className={`absolute -inset-1 rounded-circle ${closeOverlay}`} />
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  );
}
