export type TableProgressBarSize = 'xs' | 'sm' | 'md';

export type TableProgressBarProps = {
  value?: number;
  size?: TableProgressBarSize;
  showValue?: boolean;
  showNumber?: boolean;
  currentNumber?: string;
  totalNumber?: string;
};

const TRACK_HEIGHT: Record<TableProgressBarSize, string> = {
  xs: 'h-1',
  sm: 'h-[5px]',
  md: 'h-1.5',
};

const NUMBER_GAP: Record<TableProgressBarSize, string> = {
  xs: 'gap-1',
  sm: 'gap-1.5',
  md: 'gap-2',
};

const CURRENT_TEXT: Record<TableProgressBarSize, string> = {
  xs: 'text-text-sm leading-text-sm font-semibold',
  sm: 'text-text-md leading-text-md font-semibold',
  md: 'text-text-lg leading-text-lg font-semibold',
};

const SECONDARY_TEXT: Record<TableProgressBarSize, string> = {
  xs: 'text-text-xs leading-text-xs',
  sm: 'text-text-sm leading-text-sm',
  md: 'text-text-md leading-text-md',
};

const VALUE_TEXT: Record<TableProgressBarSize, string> = {
  xs: 'text-text-xs leading-text-xs w-[34px]',
  sm: 'text-text-sm leading-text-sm w-[42px]',
  md: 'text-text-md leading-text-md w-[47px]',
};

export default function TableProgressBar({
  value = 0,
  size = 'xs',
  showValue = true,
  showNumber = false,
  currentNumber = 'NN',
  totalNumber = 'NN',
}: TableProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex w-full flex-col items-start ${NUMBER_GAP[size]}`}>
      {showNumber && (
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span className={`text-element-primary overflow-hidden text-ellipsis ${CURRENT_TEXT[size]}`}>
            {currentNumber}
          </span>
          <span className={`text-element-tertiary overflow-hidden text-ellipsis ${SECONDARY_TEXT[size]}`}>
            /
          </span>
          <span className={`text-element-tertiary overflow-hidden text-ellipsis ${SECONDARY_TEXT[size]}`}>
            {totalNumber}
          </span>
        </div>
      )}
      <div className="flex w-full items-center gap-2">
        <div className={`relative ${TRACK_HEIGHT[size]} min-w-0 flex-1 bg-fill-subtle`}>
          <div
            className="absolute inset-y-0 left-0 bg-info"
            style={{ width: `${clamped}%` }}
          />
        </div>
        {showValue && (
          <div className={`shrink-0 text-right text-element-secondary ${VALUE_TEXT[size]}`}>
            {clamped}%
          </div>
        )}
      </div>
    </div>
  );
}
