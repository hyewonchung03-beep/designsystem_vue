import SkeletonItem from './SkeletonItem';

export type SkeletonVariant = 'card' | 'text' | 'bar';

export type SkeletonProps = {
  variant?: SkeletonVariant;
  className?: string;
};

function CardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      {/* Rectangle thumbnail */}
      <SkeletonItem type="rectangle" className="size-[82px] rounded-[3px]" />
      {/* Text bars */}
      <div className="flex flex-1 flex-col gap-2">
        <SkeletonItem className="w-full" />
        <SkeletonItem className="w-[85px]" />
        <SkeletonItem className="w-[85px]" />
      </div>
    </div>
  );
}

function TextSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header row: circle + bar */}
      <div className="flex items-center gap-2">
        <SkeletonItem type="circle" className="size-9" />
        <SkeletonItem className="w-[120px]" />
      </div>
      {/* Two columns of bars */}
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-1 flex-col gap-2">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    </div>
  );
}

export default function Skeleton({ variant = 'card', className }: SkeletonProps) {
  return (
    <div className={`w-full rounded-4 ${className ?? ''}`}>
      {variant === 'card' && <CardSkeleton />}
      {variant === 'text' && <TextSkeleton />}
      {variant === 'bar'  && <SkeletonItem type="bar" className="w-full" />}
    </div>
  );
}
