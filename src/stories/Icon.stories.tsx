/**
 * Icon stories
 *
 * Figma: ic_responsive / ic_blank (YqKny45xSmjr76WGIXeL7P)
 *   - ic_responsive: node 5571-244029
 *   - ic_blank:      node 5571-243172
 */
import type { Meta, StoryObj } from '@storybook/react';
import { IcBlank } from '../components/Icon/IcBlank';
import { IcResponsive } from '../components/Icon/IcResponsive';
import type { IconSize } from '../components/Icon/IcResponsive';

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Foundation/Icon',
  component: IcResponsive,
  tags: ['autodocs'],
  decorators: [
    (Story: React.FC) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IcResponsive>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Icon Sizes ─────────────────────────────────────────────────────────────────

const iconSizes: IconSize[] = [32, 28, 24, 20, 16, 14, 12];

export const IconSizes: Story = {
  name: 'Icon Sizes',
  args: { size: 24 },
  render: () => (
    <div className="inline-flex flex-col gap-6 rounded-[5px] p-6">
      <p className="text-text-xs leading-text-xs font-regular text-element-quaternary">
        Icons are provided in six predefined sizes — 32px, 28px, 24px, 20px, 16px, 14px, and 12px
        — to maintain visual consistency and scalability throughout the product.
      </p>

      {/* Default type */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          Default
        </span>
        <div className="flex items-end gap-6">
          {iconSizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <IcResponsive size={size} className="text-element-primary">
                <IcBlank size={size} />
              </IcResponsive>
              <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
                {size}px
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Color variants */}
      <div className="flex flex-col gap-3">
        <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
          Color (currentColor 상속)
        </span>
        <div className="flex items-center gap-4">
          {(['text-element-primary', 'text-element-brand', 'text-element-tertiary', 'text-error-dim', 'text-element-disabled'] as const).map((colorClass) => (
            <IcResponsive key={colorClass} size={24} className={colorClass}>
              <IcBlank size={24} />
            </IcResponsive>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ── IcResponsive with custom icon slot ────────────────────────────────────────

export const WithCustomIcon: Story = {
  name: 'IcResponsive — Custom icon slot',
  args: { size: 24 },
  render: () => (
    <div className="inline-flex flex-col gap-4 rounded-[5px] p-6">
      <span className="text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide">
        사용법: children으로 실제 아이콘 전달
      </span>
      <div className="flex items-end gap-4 text-element-primary">
        {iconSizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <IcResponsive size={size}>
              {/* 실제 서비스에서는 아이콘 컴포넌트를 children으로 전달 */}
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </IcResponsive>
            <span className="text-text-xs leading-text-xs font-regular text-element-quaternary">
              {size}px
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
