import type { Meta, StoryObj } from '@storybook/react';
import { IcTrigger, type IcTriggerSize } from '../components/Icon/IcTrigger';
import { IcBlank } from '../components/Icon/IcBlank';

const meta = {
  title: 'Foundation/Icon/IcTrigger',
  component: IcTrigger,
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IcTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Sizes ─────────────────────────────────────────────────────────────────

const triggerSizes: IcTriggerSize[] = [24, 20, 16, 14, 12];

export const IconSizes: Story = {
  name: 'Icon Sizes',
  args: { size: 24, 'aria-label': 'trigger' },
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] p-6">
      <p className="text-text-xs leading-text-xs font-regular text-element-quaternary">
        주요 동작을 실행하거나 메뉴, 패널, 추가 옵션을 열 때 사용하는 인터랙션
        컴포넌트입니다.
      </p>

      {/* 1:1 Default */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          1:1
        </span>
        <div className="flex items-end gap-6">
          {triggerSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IcTrigger size={size} aria-label={`trigger ${size}`}>
                <IcBlank size={size} />
              </IcTrigger>
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
                {size}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 1:2 */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          1:2
        </span>
        <div className="flex items-end gap-6">
          {triggerSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IcTrigger size={size} ratio="1:2" aria-label={`trigger 1:2 ${size}`}>
                <svg
                  width={size}
                  height={size * 2}
                  viewBox={`0 0 ${size} ${size * 2}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d={`M${size / 2} 1L${size / 2} ${size * 2 - 1}`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </IcTrigger>
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
                {size}×{size * 2}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inverse */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          Inverse
        </span>
        <div className="flex items-end gap-6 rounded-1 bg-surface-inverse p-4">
          {triggerSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IcTrigger size={size} inverse aria-label={`inverse ${size}`}>
                <IcBlank size={size} />
              </IcTrigger>
              <span className="text-text-xs leading-text-xs font-regular text-element-inverse-variant">
                {size}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Disabled */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          Disabled
        </span>
        <div className="flex items-end gap-6">
          {triggerSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IcTrigger size={size} aria-label={`disabled ${size}`} disabled>
                <IcBlank size={size} />
              </IcTrigger>
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
                {size}px
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
