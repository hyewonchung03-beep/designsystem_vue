import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from '../components/MenuItem/MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  parameters: { layout: 'centered' },
};
export default meta;

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, width: 200 }}>
      <div>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>default / not selected</p>
        <MenuItem label="Menu item" selected={false} onClick={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>default / selected</p>
        <MenuItem label="Menu item" selected onClick={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>default / selected + sublabel</p>
        <MenuItem label="Menu item" sublabel="Label" selected onClick={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>danger / not selected</p>
        <MenuItem label="Menu item" variant="danger" onClick={() => {}} />
      </div>
    </div>
  ),
};

export const Interactive: StoryObj<typeof MenuItem> = {
  args: {
    label: 'Menu item',
    sublabel: '',
    variant: 'default',
    selected: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'danger'] },
  },
};
