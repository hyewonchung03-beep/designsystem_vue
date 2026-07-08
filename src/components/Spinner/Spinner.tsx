export type SpinnerSize          = 'sm' | 'md' | 'lg';
export type SpinnerLabelPosition = 'below' | 'right';

export type SpinnerProps = {
  size?:          SpinnerSize;
  labelPosition?: SpinnerLabelPosition;
  inverse?:       boolean;
  showLoaderText?: boolean;
  label?:         string;
};

// Icon pixel size per labelPosition × size
const ICON_SIZE: Record<SpinnerLabelPosition, Record<SpinnerSize, number>> = {
  below: { sm: 32, md: 64, lg: 96 },
  right: { sm: 16, md: 24, lg: 32 },
};

const LABEL_CLS: Record<SpinnerSize, string> = {
  sm: 'text-text-xs leading-text-xs',
  md: 'text-text-sm leading-text-sm',
  lg: 'text-text-md leading-text-md',
};

const ROW_GAP: Record<SpinnerSize, string> = {
  sm: 'gap-2',
  md: 'gap-2',
  lg: 'gap-3',
};

function SpinnerIcon({ size, inverse }: { size: number; inverse: boolean }) {
  const sw = size / 9.6;           // strokeWidth proportional to size
  const r  = (size - sw) / 2;      // radius fills the container
  const cx = size / 2;
  const cy = size / 2;
  // Arc: start at top (cx, sw/2), sweep 90° clockwise
  const arcPath = `M${cx} ${sw / 2} a${r} ${r} 0 0 1 ${r} ${r}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className="animate-spin"
      aria-hidden="true"
    >
      <circle
        cx={cx} cy={cy} r={r}
        stroke="currentColor"
        strokeWidth={sw}
        strokeOpacity={inverse ? 0.35 : 0.18}
      />
      <path
        d={arcPath}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="butt"
      />
    </svg>
  );
}

export default function Spinner({
  size          = 'sm',
  labelPosition = 'below',
  inverse       = false,
  showLoaderText = true,
  label         = 'Loading',
}: SpinnerProps) {
  const iconSize  = ICON_SIZE[labelPosition][size];
  const isRow     = labelPosition === 'right';
  const colorCls  = inverse ? 'text-element-inverse' : 'text-element-brand';
  const layoutCls = isRow
    ? `flex-row ${ROW_GAP[size]}`
    : 'flex-col gap-2';

  return (
    <div
      className={`inline-flex items-center ${layoutCls} ${colorCls}`}
      role="status"
      aria-label={label}
    >
      <SpinnerIcon size={iconSize} inverse={inverse} />
      {showLoaderText && (
        <span className={`whitespace-nowrap text-center ${LABEL_CLS[size]}`}>
          {label}
        </span>
      )}
    </div>
  );
}
