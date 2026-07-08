import type { Meta, StoryObj } from '@storybook/react';

/* ─────────────────────────── Types ─────────────────────────── */

type Size = 'sm' | 'md' | 'lg';
type Align = 'left' | 'center' | 'right';

interface StructuredListCellProps {
  /** Cell size */
  size?: Size;
  /** Text alignment */
  align?: Align;
  /** Cell text content */
  text?: string;
}

/* ──────────────────────── Style maps ──────────────────────── */

const sizeClasses: Record<Size, { text: string; leading: string; py: string; gap: string }> = {
  sm: { text: 'text-xs', leading: 'leading-4', py: 'py-1.5', gap: 'gap-1' },
  md: { text: 'text-sm', leading: 'leading-5', py: 'py-2', gap: 'gap-1.5' },
  lg: { text: 'text-base', leading: 'leading-5', py: 'py-3', gap: 'gap-2' },
};

const alignClasses: Record<Align, { justify: string; items: string; textAlign: string }> = {
  left: { justify: 'justify-start', items: 'items-start', textAlign: 'text-left' },
  center: { justify: 'justify-center', items: 'items-center', textAlign: 'text-center' },
  right: { justify: 'justify-end', items: 'items-end', textAlign: 'text-right' },
};

/* ────────────────────── Component ────────────────────── */

function StructuredListCell({ size = 'md', align = 'left', text = 'Text' }: StructuredListCellProps) {
  const s = sizeClasses[size];
  const a = alignClasses[align];

  return (
    <div className={`inline-flex flex-col justify-center ${a.items}`}>
      <div className={`inline-flex ${a.justify} items-center ${s.gap}`}>
        {/* left padding – 8px spacer */}
        <div className="w-2 self-stretch" />

        {/* text block */}
        <div className={`inline-flex flex-col justify-center ${a.items} ${s.py}`}>
          <span
            className={[
              s.text,
              s.leading,
              'font-normal',
              "font-['Pretendard']",
              'text-gray-900',
              a.textAlign,
              'truncate',
              'max-w-[200px]',
            ].join(' ')}
          >
            {text}
          </span>
        </div>

        {/* right spacer – 8px */}
        <div className="w-2 self-stretch" />
      </div>
    </div>
  );
}

/* ─────────────────────── Stories ─────────────────────── */

const meta = {
  title: 'Components/Structured list/StructuredListCell',
  component: StructuredListCell,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    text: { control: 'text' },
  },
  args: {
    size: 'md',
    align: 'left',
    text: 'Text',
  },
} satisfies Meta<typeof StructuredListCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Individual stories ── */

export const Default: Story = {};

export const SmallLeft: Story = {
  args: { size: 'sm', align: 'left', text: 'Small Left' },
};

export const MediumCenter: Story = {
  args: { size: 'md', align: 'center', text: 'Medium Center' },
};

export const LargeRight: Story = {
  args: { size: 'lg', align: 'right', text: 'Large Right' },
};

/* ── All Variants grid (3×3) ── */

const sizes: Size[] = ['sm', 'md', 'lg'];
const aligns: Align[] = ['left', 'center', 'right'];

const sizeLabels: Record<Size, string> = { sm: 'SM', md: 'MD', lg: 'LG' };
const alignLabels: Record<Align, string> = { left: 'Left', center: 'Center', right: 'Right' };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {/* Column headers */}
      <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-4">
        <div />
        {aligns.map((a) => (
          <div key={a} className="text-xs font-semibold text-gray-500 uppercase text-center">
            {alignLabels[a]}
          </div>
        ))}
      </div>

      {/* Rows per size */}
      {sizes.map((s) => (
        <div key={s} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-4 items-center">
          {/* Row label */}
          <div className="text-xs font-semibold text-gray-500 uppercase">
            {sizeLabels[s]}
          </div>

          {/* Cells */}
          {aligns.map((a) => (
            <div
              key={`${s}-${a}`}
              className="border border-gray-200 rounded-md bg-white p-2 flex flex-col gap-1"
            >
              <span className="text-[10px] text-gray-400 font-mono">
                {sizeLabels[s]} / {alignLabels[a]}
              </span>
              <StructuredListCell size={s} align={a} text="Sample Text" />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
