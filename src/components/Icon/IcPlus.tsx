/**
 * IcPlus — + 아이콘
 *
 * 소스: static/img/foundation/iconography/ic_plus_regular.svg
 */
import type { IconSize } from './IcResponsive';

export function IcPlus({ size = 24 }: { size?: IconSize }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11.0713 12.75H3.57129V11.25H11.0713V3.75H12.5713V11.25H20.0713V12.75H12.5713V20.25H11.0713V12.75Z"
        fill="currentColor"
      />
    </svg>
  );
}
