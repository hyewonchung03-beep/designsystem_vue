export type SkeletonType = 'bar' | 'rectangle' | 'circle';

export type SkeletonItemProps = {
  type?: SkeletonType;
  className?: string;
};

const SHIMMER = "after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent after:animate-sol-shimmer";
const BASE = `relative overflow-hidden bg-fill-disabled ${SHIMMER}`;

export default function SkeletonItem({ type = 'bar', className }: SkeletonItemProps) {
  if (type === 'bar') {
    return (
      <div className={`h-[22px] py-0.5 ${className ?? 'w-full'}`}>
        <div className={`${BASE} h-full rounded-[3px]`} />
      </div>
    );
  }

  if (type === 'circle') {
    return (
      <div className={`${BASE} shrink-0 rounded-full ${className ?? 'size-16'}`} />
    );
  }

  // rectangle
  return (
    <div className={`${BASE} shrink-0 rounded-[3px] ${className ?? 'size-16'}`} />
  );
}
