/**
 * BadgeStatus (badge_status)
 *
 * Figma: badge_status (YqKny45xSmjr76WGIXeL7P)
 *   - All variants: node 1920-114195
 *
 * 상태 변화나 주의/액션이 필요할 때 사용하는 알림 배지.
 */

import type { CSSProperties } from 'react';

export type BadgeStatusType = 'dot' | 'number' | 'new';
export type BadgeStatusSize = 'sm' | 'md';

export type BadgeStatusProps = {
  type?: BadgeStatusType;
  size?: BadgeStatusSize;
  /** type="number"일 때 표시할 숫자. 99 초과 시 "99+" 표시. */
  count?: number;
  /** true: 64px 컨테이너 위에 우상단 오버레이로 표시 (레이아웃 데모용) */
  showBox?: boolean;
};

// ─── Size config ──────────────────────────────────────────────────────────────

const PILL_CLS: Record<BadgeStatusSize, string> = {
  sm: 'min-w-sol-18 px-sol-4 py-sol-2 text-text-xxs leading-text-xxs',
  md: 'min-w-sol-18 px-sol-6 py-sol-2 text-text-xs leading-text-xs',
};

// dot 크기: sm=4px, md=6px
// --spacing-sol-* 계열이 size/w/h 유틸리티에서 미생성되는 이슈 →
// CLAUDE.md 허용 방식인 CSS 변수 참조 inline style 사용
const DOT_STYLE: Record<BadgeStatusSize, CSSProperties> = {
  sm: { width: 'var(--sol-gap-4)', height: 'var(--sol-gap-4)' },
  md: { width: 'var(--sol-gap-6)', height: 'var(--sol-gap-6)' },
};

// ─── Inner indicator ─────────────────────────────────────────────────────────

function Indicator({
  type,
  size,
  count,
  inBox,
}: {
  type: BadgeStatusType;
  size: BadgeStatusSize;
  count: number;
  inBox: boolean;
}) {
  if (type === 'dot') {
    if (!inBox) {
      // standalone: 항상 6×6
      return (
        <span
          className="block rounded-full bg-error"
          style={{ width: 'var(--sol-gap-6)', height: 'var(--sol-gap-6)' }}
          aria-hidden="true"
        />
      );
    }
    // overlay: 20×20 투명 컨테이너 + 중앙에 sm=4×4 / md=6×6 dot
    return (
      <span className="inline-flex size-5 items-center justify-center" aria-hidden="true">
        <span className="block rounded-full bg-error" style={DOT_STYLE[size]} />
      </span>
    );
  }

  const label = type === 'new' ? 'N' : count > 99 ? '99+' : String(count);

  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'rounded-circle bg-error text-element-inverse font-regular whitespace-nowrap',
        PILL_CLS[size],
      ].join(' ')}
    >
      {label}
    </span>
  );
}

// ─── BadgeStatus ──────────────────────────────────────────────────────────────

export function BadgeStatus({
  type = 'dot',
  size = 'sm',
  count = 1,
  showBox = false,
}: BadgeStatusProps) {
  const indicator = <Indicator type={type} size={size} count={count} inBox={showBox} />;

  if (!showBox) return indicator;

  // 뱃지 중심을 64px 박스의 우상단 모서리에 정렬 (반씩 걸침)
  // left: '100%' → 뱃지 왼쪽 끝 = 박스 오른쪽 끝
  // translate(-50%, -50%) → 뱃지 중심 = 박스 우상단 모서리
  return (
    <div style={{ position: 'relative', display: 'inline-flex', width: '64px', height: '64px' }}>
      <div style={{ position: 'absolute', top: 0, left: '100%', transform: 'translate(-50%, -50%)' }}>
        {indicator}
      </div>
    </div>
  );
}
