import { IcBlank } from '../Icon/IcBlank';

// ── Types ────────────────────────────────────────────────────────────────────

export type DatatableHeaderCellSize = 'sm' | 'md' | 'lg';
export type DatatableHeaderCellPosition = 'left' | 'center' | 'right';

export type DatatableHeaderCellProps = {
  label?: string;
  size?: DatatableHeaderCellSize;
  position?: DatatableHeaderCellPosition;
  showIcon?: boolean;
  showPadding?: boolean;
  onIconClick?: () => void;
  className?: string;
};

// ── Size config ──────────────────────────────────────────────────────────────

type SizeCfg = {
  cell: string;
  content: string;
  text: string;
  iconSizeLeft: 12 | 14 | 16;
  iconSizeOther: 14 | 16;
  iconBtn: string;
};

const sizeConfig: Record<DatatableHeaderCellSize, SizeCfg> = {
  sm: {
    cell: 'min-h-[24px] py-1',
    content: 'gap-0.5',
    text: 'text-text-xs leading-text-xs font-semibold',
    iconSizeLeft: 12,
    iconSizeOther: 14,
    iconBtn: 'size-5',
  },
  md: {
    cell: 'min-h-[36px] py-2',
    content: 'gap-1',
    text: 'text-text-sm leading-text-sm font-semibold',
    iconSizeLeft: 14,
    iconSizeOther: 14,
    iconBtn: 'size-[22px]',
  },
  lg: {
    cell: 'min-h-[46px] py-3',
    content: 'gap-1.5',
    text: 'text-text-md leading-text-md font-semibold',
    iconSizeLeft: 16,
    iconSizeOther: 16,
    iconBtn: 'size-6',
  },
};

const positionContent: Record<DatatableHeaderCellPosition, string> = {
  left: '',
  center: 'justify-center',
  right: 'justify-end',
};

// ── DatatableHeaderCell ──────────────────────────────────────────────────────

export function DatatableHeaderCell({
  label = 'Header',
  size = 'sm',
  position = 'left',
  showIcon = true,
  showPadding = false,
  onIconClick,
  className,
}: DatatableHeaderCellProps) {
  const cfg = sizeConfig[size];
  const iconSize = position === 'left' ? cfg.iconSizeLeft : cfg.iconSizeOther;

  return (
    <div
      role="columnheader"
      className={`flex items-center ${cfg.cell} ${className ?? ''}`}
    >
      {showPadding && <div className="w-2 shrink-0 self-stretch" />}

      <div className={`flex min-w-px flex-1 items-center ${cfg.content} ${positionContent[position]}`}>
        <span className={`shrink-0 whitespace-nowrap text-element-tertiary ${cfg.text}`}>
          {label}
        </span>

        {showIcon && (
          <button
            type="button"
            onClick={onIconClick}
            aria-label={`${label} column action`}
            className={`relative flex ${cfg.iconBtn} shrink-0 items-center justify-center rounded-circle text-element-secondary
              hover:bg-interaction-neutral-hover active:bg-interaction-neutral-pressed
              focus-visible:outline-none focus-visible:shadow-focus-button-ring`}
          >
            <IcBlank size={iconSize} />
          </button>
        )}
      </div>

      {showPadding && <div className="w-2 shrink-0 self-stretch" />}
    </div>
  );
}

export default DatatableHeaderCell;
