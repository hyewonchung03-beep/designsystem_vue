import React from 'react';

export type SegmentedControlVariant = 'solid' | 'outline';
export type SegmentedControlSize = 'sm' | 'md';
export type SegmentedControlState = 'enabled' | 'hover' | 'pressed' | 'disabled';

type SegmentedControlDemoProps = {
  labels?: string[];
  selectedIndex?: number;
  variant?: SegmentedControlVariant;
  size?: SegmentedControlSize;
  state?: SegmentedControlState;
  multiSelected?: number[];
};

export function SegmentedControlDemo({
  labels = ['label', 'label', 'label'],
  selectedIndex = 0,
  variant = 'solid',
  size = 'md',
  state = 'enabled',
  multiSelected,
}: SegmentedControlDemoProps): React.ReactElement {
  return (
    <div
      className={`segmented-control-demo segmented-control-demo--${variant} segmented-control-demo--${size} segmented-control-demo--${state}`}
      aria-disabled={state === 'disabled'}
    >
      {labels.map((label, index) => {
        const selected = multiSelected ? multiSelected.includes(index) : index === selectedIndex;

        return (
          <button
            key={`${label}-${index}`}
            type="button"
            className={selected ? 'segmented-control-demo__segment segmented-control-demo__segment--selected' : 'segmented-control-demo__segment'}
            disabled={state === 'disabled'}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function BasicSegmentedControlExample(): React.ReactElement {
  return (
    <SegmentedControlDemo
      labels={['Daily', 'Weekly', 'Monthly']}
      selectedIndex={0}
      variant="solid"
      size="md"
    />
  );
}

export const segmentedControlSourceMap = {
  basic: `<SegmentedControl
  value="daily"
  options={[
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ]}
/>`,
};
