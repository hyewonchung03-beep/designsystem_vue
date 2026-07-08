import React from 'react';
import ProgressBar from '@site/src/components/ProgressBar/ProgressBar';
import TableProgressBar from '@site/src/components/ProgressBar/TableProgressBar';
import Skeleton from '@site/src/components/Skeleton/Skeleton';
import SkeletonItem from '@site/src/components/Skeleton/SkeletonItem';
import Spinner from '@site/src/components/Spinner/Spinner';

type ProgressType = 'default' | 'success' | 'error';
type SpinnerSize = 'sm' | 'md' | 'lg';
type SkeletonType = 'circle' | 'bar' | 'rectangle';

type ProgressBarDemoProps = {
  label?: string;
  helper?: string;
  value?: number;
  showPercent?: boolean;
  type?: ProgressType;
  size?: 'sm' | 'md';
};

type SpinnerDemoProps = {
  label?: string;
  size?: SpinnerSize;
  inverse?: boolean;
  position?: 'below' | 'right';
};

type SkeletonDemoProps = {
  type?: SkeletonType;
};

export function ProgressBarDemo({
  label,
  helper,
  value = 50,
  showPercent = true,
  type = 'default',
  size = 'md',
}: ProgressBarDemoProps): React.ReactElement {
  const state = type === 'default' ? 'normal' : type;
  return (
    <div className="loading-progress">
      <ProgressBar
        label={label}
        value={value}
        showLabel={Boolean(label)}
        showValue={showPercent}
        state={state}
        size={size}
      />
      {helper && <span className="loading-progress__helper">{helper}</span>}
    </div>
  );
}

export function SpinnerDemo({
  label,
  size = 'md',
  inverse = false,
  position = 'below',
}: SpinnerDemoProps): React.ReactElement {
  return (
    <Spinner
      size={size}
      label={label}
      inverse={inverse}
      labelPosition={position}
      showLoaderText={Boolean(label)}
    />
  );
}

export function SkeletonDemo({type = 'bar'}: SkeletonDemoProps): React.ReactElement {
  if (type === 'circle') {
    return <SkeletonItem type="circle" className="size-12" />;
  }

  if (type === 'rectangle') {
    return <SkeletonItem type="rectangle" className="h-28 w-40" />;
  }

  return (
    <div className="loading-skeleton-stack">
      <SkeletonItem type="bar" className="w-[220px]" />
      <SkeletonItem type="bar" className="w-[180px]" />
      <SkeletonItem type="bar" className="w-[120px]" />
    </div>
  );
}

export function BasicProgressBarExample(): React.ReactElement {
  return <ProgressBar value={50} size="sm" label="Label" />;
}

export function ProgressBarWithTopLabelExample(): React.ReactElement {
  return <ProgressBar value={50} size="md" label="Label" />;
}

export function ProgressBarWithHelperExample(): React.ReactElement {
  return (
    <div className="loading-progress-example-stack">
      <ProgressBar value={50} state="normal" label="Normal" />
      <ProgressBar value={50} state="info" label="Info" />
      <ProgressBar value={50} state="success" label="Success" />
      <ProgressBar value={50} state="warning" label="Warning" />
      <ProgressBar value={50} state="error" label="Error" />
    </div>
  );
}

export function ProgressBarWithPercentageExample(): React.ReactElement {
  return <ProgressBar value={50} showLabel={false} />;
}

export function SuccessProgressBarExample(): React.ReactElement {
  return <ProgressBar value={50} label="Label" showValue={false} />;
}

export function ErrorProgressBarExample(): React.ReactElement {
  return (
    <div className="loading-progress-example-stack loading-progress-example-stack--narrow">
      <TableProgressBar value={50} size="xs" showValue />
      <TableProgressBar value={50} size="sm" showValue />
      <TableProgressBar value={50} size="md" showValue />
    </div>
  );
}

export function BasicSpinnerExample(): React.ReactElement {
  return <Spinner size="sm" labelPosition="below" />;
}

export function SpinnerWithLabelExample(): React.ReactElement {
  return <Spinner size="md" labelPosition="below" />;
}

export function SpinnerWithLabelRightExample(): React.ReactElement {
  return <Spinner size="lg" labelPosition="below" />;
}

export function InverseSpinnerExample(): React.ReactElement {
  return <Spinner size="sm" labelPosition="right" />;
}

export function SmallSpinnerExample(): React.ReactElement {
  return <Spinner size="md" labelPosition="right" />;
}

export function LargeSpinnerExample(): React.ReactElement {
  return <Spinner size="lg" labelPosition="right" />;
}

export function SpinnerInContainerExample(): React.ReactElement {
  return (
    <div className="loading-spinner-example-row">
      <Spinner size="sm" labelPosition="below" />
      <Spinner size="md" labelPosition="below" />
      <Spinner size="lg" labelPosition="below" />
    </div>
  );
}

export function BasicSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-skeleton-items-example">
      <SkeletonItem type="bar" className="w-[120px]" />
      <SkeletonItem type="rectangle" />
      <SkeletonItem type="circle" />
    </div>
  );
}

export function CircleSkeletonExample(): React.ReactElement {
  return <Skeleton variant="card" />;
}

export function BarSkeletonExample(): React.ReactElement {
  return <Skeleton variant="text" />;
}

export function RectangleSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-skeleton-list">
      {Array.from({length: 4}).map((_, item) => (
        <Skeleton key={item} variant="card" />
      ))}
    </div>
  );
}

export function CardSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-skeleton-card">
      <SkeletonDemo type="rectangle" />
      <SkeletonDemo type="bar" />
    </div>
  );
}

export function ListSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-skeleton-list">
      {[0, 1, 2].map((item) => (
        <div className="loading-skeleton-list__row" key={item}>
          <SkeletonDemo type="circle" />
          <SkeletonDemo type="bar" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-skeleton-table">
      {[0, 1, 2, 3].map((row) => (
        <div className="loading-skeleton-table__row" key={row}>
          <SkeletonDemo type="bar" />
          <SkeletonDemo type="bar" />
          <SkeletonDemo type="bar" />
        </div>
      ))}
    </div>
  );
}

export function PageLayoutSkeletonExample(): React.ReactElement {
  return (
    <div className="loading-page-layout-skeleton">
      <span />
      <div>
        <SkeletonDemo type="bar" />
        <SkeletonDemo type="rectangle" />
        <SkeletonDemo type="bar" />
      </div>
    </div>
  );
}

export const loadingComponentSourceMap = {
  progressSmall: `<ProgressBar value={50} size="sm" label="Label" />`,
  progressMedium: `<ProgressBar value={50} size="md" label="Label" />`,
  progressStates: `<ProgressBar value={50} state="normal"  label="Normal" />
<ProgressBar value={50} state="info"    label="Info" />
<ProgressBar value={50} state="success" label="Success" />
<ProgressBar value={50} state="warning" label="Warning" />
<ProgressBar value={50} state="error"   label="Error" />`,
  progressNoLabel: `<ProgressBar value={50} showLabel={false} />`,
  progressNoValue: `<ProgressBar value={50} showValue={false} />`,
  progressTableSizes: `<TableProgressBar value={50} size="xs" showValue />
<TableProgressBar value={50} size="sm" showValue />
<TableProgressBar value={50} size="md" showValue />`,
  progressTableWithNumber: `<TableProgressBar value={50} size="xs" showValue showNumber currentNumber="5" totalNumber="10" />
<TableProgressBar value={50} size="sm" showValue showNumber currentNumber="5" totalNumber="10" />
<TableProgressBar value={50} size="md" showValue showNumber currentNumber="5" totalNumber="10" />`,
  progressTableValues: `<TableProgressBar value={0}   size="xs" showValue />
<TableProgressBar value={25}  size="xs" showValue />
<TableProgressBar value={50}  size="xs" showValue />
<TableProgressBar value={75}  size="xs" showValue />
<TableProgressBar value={100} size="xs" showValue />`,
  spinnerBelowSm: `<Spinner size="sm" labelPosition="below" />`,
  spinnerBelowMd: `<Spinner size="md" labelPosition="below" />`,
  spinnerBelowLg: `<Spinner size="lg" labelPosition="below" />`,
  spinnerRightSm: `<Spinner size="sm" labelPosition="right" />`,
  spinnerRightMd: `<Spinner size="md" labelPosition="right" />`,
  spinnerRightLg: `<Spinner size="lg" labelPosition="right" />`,
  spinnerSizes: `<Spinner size="sm" labelPosition="below" />
<Spinner size="md" labelPosition="below" />
<Spinner size="lg" labelPosition="below" />`,
  spinnerInverse: `<Spinner size="sm" labelPosition="below" inverse />
<Spinner size="md" labelPosition="below" inverse />
<Spinner size="lg" labelPosition="below" inverse />`,
  spinnerNoLabel: `<Spinner size="sm" showLoaderText={false} />
<Spinner size="md" showLoaderText={false} />
<Spinner size="lg" showLoaderText={false} />`,
  skeletonItems: `<SkeletonItem type="bar" className="w-[120px]" />
<SkeletonItem type="rectangle" />
<SkeletonItem type="circle" />`,
  skeletonCard: `<Skeleton variant="card" />`,
  skeletonText: `<Skeleton variant="text" />`,
  skeletonList: `{Array.from({ length: 4 }).map((_, i) => (
  <Skeleton key={i} variant="card" />
))}`,
};
