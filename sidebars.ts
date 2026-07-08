import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  introductionSidebar: [
    {
      type: 'doc',
      id: 'overview/overview',
      label: 'Overview',
    },
  ],
  foundationSidebar: [
    {
      type: 'doc',
      id: 'foundation/overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Color',
      link: { type: 'doc', id: 'foundation/color' },
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'foundation/color-primitive',
          label: 'Primitive Token',
          className: 'sidebar-item-hidden',
        },
      ],
    },
    'foundation/elevation',
    {type: 'doc', id: 'foundation/typography', label: 'Typography'},
    {type: 'doc', id: 'foundation/spacing', label: 'Spacing'},
    {type: 'doc', id: 'foundation/iconography', label: 'Iconography'},
  ],
  componentsSidebar: [
    {
      type: 'doc',
      id: 'components/overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'components/accordion',
      label: 'Accordion',
    },
    {
      type: 'category',
      label: 'Button',
      items: [
        {type: 'doc', id: 'components/button/button', label: 'Button'},
        {type: 'doc', id: 'components/button/IconButton', label: 'Icon button'},
        {type: 'doc', id: 'components/button/SegmentedControl', label: 'Segmented control'},
        {type: 'doc', id: 'components/button/SplitButton', label: 'Split button'},
        {type: 'doc', id: 'components/button/ToggleButton', label: 'Toggle button'},
      ],
    },
    {
      type: 'doc',
      id: 'components/card',
      label: 'Card',
    },
    {
      type: 'category',
      label: 'Chart',
      className: 'sidebar-item-tbd',
      items: [
        {type: 'doc', id: 'components/Chart/BarChartHorizon', label: 'Bar chart horizon'},
        {type: 'doc', id: 'components/Chart/BarChartVertical', label: 'Bar chart vertical'},
        {type: 'doc', id: 'components/Chart/Tooltip', label: 'Chart tooltip'},
        {type: 'doc', id: 'components/Chart/DonutChart', label: 'Donut chart'},
        {type: 'doc', id: 'components/Chart/Grid', label: 'Grid'},
        {type: 'doc', id: 'components/Chart/Legends', label: 'Legends'},
        {type: 'doc', id: 'components/Chart/LineChart', label: 'Line chart'},
        {type: 'doc', id: 'components/Chart/MetricDesign', label: 'Metric design'},
        {type: 'doc', id: 'components/Chart/Widget', label: 'Widget'},
      ],
    },
    {
      type: 'category',
      label: 'Control',
      items: [
        {type: 'doc', id: 'components/Controls/Checkbox', label: 'Checkbox'},
        {type: 'doc', id: 'components/Controls/Radio', label: 'Radio'},
        {type: 'doc', id: 'components/Controls/Switch', label: 'Switch'},
        {type: 'doc', id: 'components/Controls/ControlGroup', label: 'Control group'},
      ],
    },
    {
      type: 'category',
      label: 'Data table',
      items: [
        {type: 'doc', id: 'components/Data table/Table', label: 'Data table'},
        {type: 'doc', id: 'components/Data table/TableToolbar', label: 'Data table toolbar'},
        {type: 'doc', id: 'components/Data table/TableTree', label: 'Data table tree'},
      ],
    },
    {
      type: 'doc',
      id: 'components/dropdown',
      label: 'Dropdown',
    },
    {
      type: 'doc',
      id: 'components/divider',
      label: 'Divider',
    },
    {
      type: 'category',
      label: 'Feedback',
      items: [
        {type: 'doc', id: 'components/Feedback/Banner', label: 'Banner'},
        {type: 'doc', id: 'components/Feedback/SectionMessage', label: 'Section message'},
        {type: 'doc', id: 'components/Feedback/ToastMessage', label: 'Toast message'},
      ],
    },
    {
      type: 'category',
      label: 'Input',
      items: [
        {type: 'doc', id: 'components/Input/TextInput', label: 'Text input'},
        {type: 'doc', id: 'components/Input/TextArea', label: 'Text area'},
      ],
    },
    {
      type: 'category',
      label: 'Loading',
      items: [
        {type: 'doc', id: 'components/Loading/Progress-bar', label: 'Progress bar'},
        {type: 'doc', id: 'components/Loading/Spinner', label: 'Spinner'},
        {type: 'doc', id: 'components/Loading/Skeleton', label: 'Skeleton'},
      ],
    },
    {
      type: 'doc',
      id: 'components/menu',
      label: 'Menu',
    },
    {
      type: 'category',
      label: 'Navigation',
      items: [
        {type: 'doc', id: 'components/Navigation/Breadcrumb', label: 'Breadcrumb'},
        {type: 'doc', id: 'components/Navigation/PageIndicator', label: 'Indicator'},
        {type: 'doc', id: 'components/Navigation/Pagination', label: 'Pagination'},
        {type: 'doc', id: 'components/Navigation/ProgressStepper', label: 'Progress stepper'},
        {type: 'doc', id: 'components/Navigation/Sidebar', label: 'Side navigation'},
        {type: 'doc', id: 'components/Navigation/Tab', label: 'Tab'},
      ],
    },
    {
      type: 'category',
      label: 'Overlaying surface',
      items: [
        {type: 'doc', id: 'components/Overlaying surface/Modal', label: 'Modal'},
        {type: 'doc', id: 'components/Overlaying surface/Popover', label: 'Popover'},
        {type: 'doc', id: 'components/Overlaying surface/Sidesheet', label: 'Sidesheet', className: 'sidebar-item-tbd'},
        {type: 'doc', id: 'components/Overlaying surface/Tooltip', label: 'Tooltip'},
      ],
    },
    {
      type: 'category',
      label: 'Picker',
      items: [
        {type: 'doc', id: 'components/Picker/ColorPicker', label: 'Color picker'},
        {type: 'doc', id: 'components/Picker/DateSinglePicker', label: 'Date single picker'},
        {type: 'doc', id: 'components/Picker/DateRangePicker', label: 'Date range picker'},
        {type: 'doc', id: 'components/Picker/TimePicker', label: 'Time picker'},
      ],
    },
    {
      type: 'doc',
      id: 'components/select',
      label: 'Select',
    },
    {
      type: 'category',
      label: 'Status indicator',
      items: [
        {type: 'doc', id: 'components/Status indicator/Badge', label: 'Badge'},
        {type: 'doc', id: 'components/Status indicator/BadgeCounter', label: 'Badge counter'},
        {type: 'doc', id: 'components/Status indicator/BadgeStatus', label: 'Badge status'},
        {type: 'doc', id: 'components/Status indicator/Chip', label: 'Chip'},
        {type: 'doc', id: 'components/Status indicator/EmptyState', label: 'Empty state'},
      ],
    },
    {
      type: 'doc',
      id: 'components/structured-list',
      label: 'Structured list',
    },
    {
      type: 'doc',
      id: 'components/tree-menu',
      label: 'Tree menu',
    },
    {
      type: 'doc',
      id: 'components/upload',
      label: 'Upload',
    },
  ],
};

export default sidebars;
