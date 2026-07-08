export type ProgressBarSize  = 'sm' | 'md';
export type ProgressBarState = 'normal' | 'info' | 'success' | 'warning' | 'error';

export type ProgressBarProps = {
  value?: number;
  size?: ProgressBarSize;
  state?: ProgressBarState;
  label?: string;
  showLabel?: boolean;
  showValue?: boolean;
};

const STATE_FILL: Record<ProgressBarState, string> = {
  normal:  'bg-tertiary',
  info:    'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error:   'bg-error',
};

export default function ProgressBar({
  value = 50,
  size = 'sm',
  state = 'normal',
  label = 'Label',
  showLabel = true,
  showValue = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const trackHeight = size === 'md' ? 'h-2' : 'h-1';

  return (
    <div className={`flex w-full flex-col items-start text-left${size === 'md' ? ' gap-1' : ''}`}>
      {showLabel && (
        <p className="w-full text-text-sm leading-text-sm text-element-tertiary">
          {label}
        </p>
      )}
      <div className="flex w-full items-center gap-2">
        <div className={`relative ${trackHeight} min-w-0 flex-1 bg-fill-subtle`}>
          <div
            className={`absolute inset-y-0 left-0 ${STATE_FILL[state]}`}
            style={{ width: `${clamped}%` }}
          />
        </div>
        {showValue && (
          <div className="w-10 shrink-0 text-right">
            <span className="text-text-sm leading-text-sm font-semibold text-element-secondary">
              {clamped}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
