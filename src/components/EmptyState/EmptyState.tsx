import type { ReactNode } from 'react';
import { IcBlank } from '../Icon/IcBlank';

export type EmptyStateType = 'widget' | 'data' | 'event' | 'store';

export type EmptyStateProps = {
  /** 아이콘 종류 */
  type?: EmptyStateType;
  /** 텍스트. ReactNode로 인라인 bold/링크 표현 가능 */
  text?: ReactNode;
  /** CTA 버튼 등 액션 영역 */
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  type = 'widget',
  text,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ padding: 'var(--sol-spacing-24)', gap: 'var(--sol-spacing-4)' }}
    >
      <span className="shrink-0 text-element-quaternary">
        <IcBlank size={32} />
      </span>
      {text && (
        <p
          className="text-element-disabled font-regular text-center [&_strong]:font-semibold"
          style={{
            fontSize: 'var(--sol-font-size-text-sm)',
            lineHeight: 'var(--sol-line-height-text-xs-2line)',
          }}
        >
          {text}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
