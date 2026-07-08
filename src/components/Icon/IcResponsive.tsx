/**
 * IcResponsive — 아이콘 크기 슬롯/래퍼
 *
 * Figma: ic_responsive (YqKny45xSmjr76WGIXeL7P, node 5571-244029)
 * 허용된 7가지 크기: 12 | 14 | 16 | 20 | 24 | 28 | 32 (px)
 *
 * 사용법:
 *   <IcResponsive size={16}><MyIcon /></IcResponsive>
 *   <IcResponsive size={16} />  ← children 없으면 IcBlank 렌더링
 */
import type { ReactNode } from 'react';
import { IcBlank } from './IcBlank';

export type IconSize = 12 | 14 | 16 | 20 | 24 | 28 | 32;

// 문자열 리터럴 형태로 작성해 Tailwind v4 content scan이 모든 클래스를 인식하게 함
const sizeClass: Record<IconSize, string> = {
  12: 'size-icon-12',
  14: 'size-icon-14',
  16: 'size-icon-16',
  20: 'size-icon-20',
  24: 'size-icon-24',
  28: 'size-icon-28',
  32: 'size-icon-32',
};

export type IcResponsiveProps = {
  size: IconSize;
  children?: ReactNode;
  className?: string;
};

export function IcResponsive({ size, children, className = '' }: IcResponsiveProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${sizeClass[size]} ${className}`}
    >
      {children ?? <IcBlank size={size} />}
    </span>
  );
}
