import type { Meta, StoryObj } from '@storybook/react';
import { StructuredListBodyCell } from '../components/StructuredList/StructuredListBodyCell';

const meta: Meta<typeof StructuredListBodyCell> = {
  title: 'Components/Structured list/StructuredListBodyCell',
  component: StructuredListBodyCell,
  parameters: { layout: 'centered' },
};
export default meta;

const cellWrap = (children: React.ReactNode) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 240 }}>
    {children}
  </div>
);

export const LeftAlign: StoryObj = {
  name: 'Left — all variants',
  render: () =>
    cellWrap(
      <>
        <StructuredListBodyCell align="left" text="Content" />
        <StructuredListBodyCell align="left" text="Content" showSubText subText="Sub text" />
        <StructuredListBodyCell align="left" text="Content" showLeftIcon />
        <StructuredListBodyCell align="left" text="Content" showLeftIcon showSubText subText="Sub text" />
        <StructuredListBodyCell align="left" text="Content" showTrendIndicator trendValue="5%" />
        <StructuredListBodyCell align="left" text="Content" showSubText subText="Sub text" showTrendIndicator trendValue="5%" />
      </>,
    ),
};

export const RightAlign: StoryObj = {
  name: 'Right — all variants',
  render: () =>
    cellWrap(
      <>
        <StructuredListBodyCell align="right" text="Content" />
        <StructuredListBodyCell align="right" text="Content" showSubText subText="Data" />
        <StructuredListBodyCell align="right" text="Content" showLeftIcon />
        <StructuredListBodyCell align="right" text="Content" showTrendIndicator trendValue="5%" />
        <StructuredListBodyCell align="right" text="Content" showSubText subText="Data" showTrendIndicator trendValue="5%" />
      </>,
    ),
};

export const CenterAlign: StoryObj = {
  name: 'Center — all variants',
  render: () =>
    cellWrap(
      <>
        <StructuredListBodyCell align="center" text="Content" />
        <StructuredListBodyCell align="center" text="Content" showSubText subText="Data" />
        <StructuredListBodyCell align="center" text="Content" showLeftIcon />
        <StructuredListBodyCell align="center" text="Content" showTrendIndicator trendValue="5%" />
      </>,
    ),
};

export const Condensed: StoryObj = {
  name: 'Condensed — left / center / right',
  render: () =>
    cellWrap(
      <>
        <StructuredListBodyCell condensed align="left" text="Content" />
        <StructuredListBodyCell condensed align="left" text="Content" showLeftIcon showTrendIndicator trendValue="5%" />
        <StructuredListBodyCell condensed align="center" text="Content" />
        <StructuredListBodyCell condensed align="right" text="Content" />
        <StructuredListBodyCell condensed align="right" text="Content" showTrendIndicator trendValue="5%" />
      </>,
    ),
};

export const CustomSlot: StoryObj = {
  name: 'Custom center slot',
  render: () =>
    cellWrap(
      <>
        <StructuredListBodyCell align="center" custom>
          <span style={{ fontSize: 12, color: '#888' }}>custom slot content</span>
        </StructuredListBodyCell>
        <StructuredListBodyCell align="center" custom condensed>
          <span style={{ fontSize: 12, color: '#888' }}>condensed custom slot</span>
        </StructuredListBodyCell>
      </>,
    ),
};

export const Interactive: StoryObj<typeof StructuredListBodyCell> = {
  args: {
    text: 'Content',
    subText: 'Data',
    align: 'left',
    condensed: false,
    custom: false,
    showText: true,
    showSubText: false,
    showLeftIcon: false,
    showTrendIndicator: false,
    trendValue: '5%',
    trendDirection: 'up',
  },
  argTypes: {
    align: { control: 'radio', options: ['left', 'center', 'right'] },
    trendDirection: { control: 'radio', options: ['up', 'down'] },
  },
  render: (args) => (
    <div style={{ width: 240 }}>
      <StructuredListBodyCell {...args} />
    </div>
  ),
};
