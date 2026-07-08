/**
 * IcBlank — 아이콘 placeholder
 *
 * Figma: ic_blank (YqKny45xSmjr76WGIXeL7P, node 5571-243172)
 * 소스: static/img/foundation/iconography/ic_blank.svg
 *
 * ic_responsive 안에 실제 아이콘이 지정되지 않았을 때 기본으로 표시되는 컴포넌트.
 * 직접 SVG를 새로 그리지 말고 반드시 이 컴포넌트를 사용할 것.
 */
import type { IconSize } from './IcResponsive';

export function IcBlank({ size = 24 }: { size?: IconSize }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.25 18V16H4.75V18C4.75 18.6904 5.30964 19.25 6 19.25H8V20.75H6C4.48122 20.75 3.25 19.5188 3.25 18ZM14 19.25V20.75H10V19.25H14ZM19.25 18V16H20.75V18C20.75 19.5188 19.5188 20.75 18 20.75H16V19.25H18C18.6904 19.25 19.25 18.6904 19.25 18ZM4.75 10V14H3.25V10H4.75ZM20.75 10V14H19.25V10H20.75ZM3.25 6C3.25 4.48122 4.48122 3.25 6 3.25H8V4.75H6C5.30964 4.75 4.75 5.30964 4.75 6V8H3.25V6ZM19.25 6C19.25 5.30964 18.6904 4.75 18 4.75H16V3.25H18C19.5188 3.25 20.75 4.48122 20.75 6V8H19.25V6ZM14 3.25V4.75H10V3.25H14Z"
        fill="currentColor"
      />
    </svg>
  );
}
