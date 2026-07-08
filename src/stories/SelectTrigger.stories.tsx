/**
 * SelectTrigger stories
 *
 * Figma: select_trigger (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 14372-125525
 */
import type { Meta, StoryObj } from '@storybook/react';
import { SelectTrigger } from '../components/SelectTrigger/SelectTrigger';
import { IcBlank } from '../components/Icon/IcBlank';
import type { SelectTriggerState, SelectTriggerSize } from '../components/SelectTrigger/SelectTrigger';
import type { ReactNode } from 'react';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Select/SelectTrigger',
  component: SelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md'] },
    state: { control: 'select', options: ['enabled', 'disabled', 'error', 'readonly'] },
    placeholder: { control: 'text' },
    badgeCount: { control: 'number' },
  },
  args: {
    placeholder: 'Select',
    size: 'sm',
    state: 'enabled',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
    ],
  },
  decorators: [
    (Story: React.FC) => (
      <div className="flex flex-wrap items-start gap-6 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Filter icon (ic_filter.svg, currentColor) ────────────────────────────────
// static/img/foundation/iconography/ic_filter.svg — demo용으로만 사용

function IcFilter({ size }: { size: 16 | 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.41309 12.4014C7.83743 12.4734 9.01399 13.4828 9.33887 14.8252H20.8213V16.3252H9.33887C9.01413 17.6678 7.83759 18.6779 6.41309 18.75L6.25 18.7539C4.49452 18.7539 3.07129 17.3307 3.07129 15.5752C3.0714 13.8198 4.4946 12.3965 6.25 12.3965L6.41309 12.4014ZM20.0625 8.25293C19.9822 7.46303 19.3544 6.83516 18.5645 6.75488L18.3926 6.74609C17.4656 6.74617 16.7139 7.4978 16.7139 8.4248L16.7227 8.59668C16.8088 9.44289 17.5237 10.1034 18.3926 10.1035L18.5645 10.0947C19.4108 10.0087 20.0712 9.29382 20.0713 8.4248L20.0625 8.25293ZM4.57129 15.5752C4.57129 16.5022 5.32295 17.2539 6.25 17.2539L6.42188 17.2451C7.26811 17.159 7.92871 16.4442 7.92871 15.5752C7.9286 14.7063 7.26806 13.9914 6.42188 13.9053L6.25 13.8965C5.32302 13.8965 4.5714 14.6482 4.57129 15.5752ZM21.5674 8.58789C21.4852 10.2132 20.1819 11.5161 18.5566 11.5986L18.3926 11.6035C16.8956 11.6035 15.6409 10.5682 15.3037 9.1748H3.82129V7.6748H15.3037C15.6408 6.28131 16.8955 5.24616 18.3926 5.24609L18.5566 5.25C20.2359 5.3353 21.5713 6.7243 21.5713 8.4248L21.5674 8.58789Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Single stories ─────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'sm — enabled',
};

export const SizeMd: Story = {
  name: 'md — enabled',
  args: { size: 'md' },
};

export const Disabled: Story = {
  name: 'sm — disabled',
  args: { state: 'disabled' },
};

export const Error: Story = {
  name: 'sm — error',
  args: { state: 'error' },
};

export const Readonly: Story = {
  name: 'sm — readonly',
  args: { state: 'readonly' },
};

export const WithBadge: Story = {
  name: 'With badge counter',
  args: {
    badgeCount: 2,
    placeholder: 'Filter',
    leftIcon: <IcFilter size={16} />,
  },
};

export const WithLeftIcon: Story = {
  name: 'With left icon',
  args: { leftIcon: <IcBlank size={16} /> },
};

// ── All Variants ───────────────────────────────────────────────────────────────

const STATES: SelectTriggerState[] = ['enabled', 'disabled', 'error', 'readonly'];

const SAMPLE_OPTIONS = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

type RowDef = {
  label: string;
  size: SelectTriggerSize;
  badge?: number;
  leftIcon?: ReactNode;
  placeholder?: string;
};

const ROWS: RowDef[] = [
  { label: 'sm', size: 'sm', placeholder: 'Select' },
  { label: 'sm + icon + badge', size: 'sm', badge: 2, leftIcon: <IcFilter size={16} />, placeholder: 'Filter' },
  { label: 'md', size: 'md', placeholder: 'Select' },
  { label: 'md + icon + badge', size: 'md', badge: 2, leftIcon: <IcFilter size={20} />, placeholder: 'Filter' },
];

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <table className="border-separate border-spacing-0 rounded-4 bg-surface-default text-left">
      <thead>
        <tr>
          <th className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary w-36" />
          {STATES.map((state) => (
            <th
              key={state}
              className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-tertiary"
            >
              {state}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(({ label, size, badge, leftIcon, placeholder }, rowIdx) => (
          <tr key={label} className={rowIdx % 2 === 0 ? 'bg-surface-container-lowest' : ''}>
            <td className="px-4 py-3 text-text-xs leading-text-xs font-regular text-element-quaternary whitespace-nowrap">
              {label}
            </td>
            {STATES.map((state) => (
              <td key={state} className="px-4 py-3">
                <SelectTrigger
                  size={size}
                  state={state}
                  placeholder={placeholder}
                  options={SAMPLE_OPTIONS}
                  badgeCount={badge}
                  leftIcon={leftIcon}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
