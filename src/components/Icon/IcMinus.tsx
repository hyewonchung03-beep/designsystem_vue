/**
 * IcMinus — - 아이콘
 *
 * 소스: static/img/foundation/iconography/ic_minus.svg (regular variant)
 */
import type { IconSize } from './IcResponsive';

export function IcMinus({ size = 24 }: { size?: IconSize }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.25 11.25V12.75H3.75V11.25H20.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
