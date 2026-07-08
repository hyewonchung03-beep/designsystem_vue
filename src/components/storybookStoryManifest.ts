// Generated from Storybook's built index. Keep IDs and displayed source aligned with registered stories.
export type StorybookStory = {
  id: string;
  title: string;
  name: string;
  source: string;
};

export const storybookStories: StorybookStory[] = [
  {
    "id": "components-accordion--basic",
    "title": "Components/Accordion",
    "name": "Basic",
    "source": "export const Basic: Story = {\n  name: 'Basic',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      { label: 'Section 1' },\n      { label: 'Section 2' },\n      { label: 'Section 3' },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--with-content",
    "title": "Components/Accordion",
    "name": "With Content",
    "source": "export const WithContent: Story = {\n  name: 'With Content',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      {\n        label: 'Account Settings',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Profile</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Security</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Notifications</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Preferences',\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Theme</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Language</AccordionPanelItem>\n          </>\n        ),\n      },\n      { label: 'About' },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--size-md",
    "title": "Components/Accordion",
    "name": "Size - md",
    "source": "export const SizeMd: Story = {\n  name: 'Size - md',\n  args: {\n    size: 'md',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      {\n        label: 'Category A',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"md\">Item 1</AccordionPanelItem>\n            <AccordionPanelItem size=\"md\">Item 2</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Category B',\n        children: (\n          <>\n            <AccordionPanelItem size=\"md\">Item 3</AccordionPanelItem>\n            <AccordionPanelItem size=\"md\">Item 4</AccordionPanelItem>\n          </>\n        ),\n      },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--size-lg",
    "title": "Components/Accordion",
    "name": "Size - lg",
    "source": "export const SizeLg: Story = {\n  name: 'Size - lg',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      {\n        label: 'Category A',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Item 1</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Item 2</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Category B',\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Item 3</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Item 4</AccordionPanelItem>\n          </>\n        ),\n      },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--allow-multiple",
    "title": "Components/Accordion",
    "name": "Allow Multiple",
    "source": "export const AllowMultiple: Story = {\n  name: 'Allow Multiple',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: true,\n    items: [\n      {\n        label: 'Section 1',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Content A</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Content B</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Section 2',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Content C</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Content D</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Section 3',\n        children: <AccordionPanelItem size=\"lg\">Content E</AccordionPanelItem>,\n      },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--no-divider",
    "title": "Components/Accordion",
    "name": "No Divider",
    "source": "export const NoDivider: Story = {\n  name: 'No Divider',\n  args: {\n    size: 'lg',\n    showDivider: false,\n    allowMultiple: false,\n    items: [\n      {\n        label: 'Section 1',\n        defaultExpanded: true,\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Content A</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Content B</AccordionPanelItem>\n          </>\n        ),\n      },\n      { label: 'Section 2' },\n      { label: 'Section 3' },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--with-disabled",
    "title": "Components/Accordion",
    "name": "With Disabled",
    "source": "export const WithDisabled: Story = {\n  name: 'With Disabled',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      {\n        label: 'Enabled Section',\n        children: (\n          <>\n            <AccordionPanelItem size=\"lg\">Content A</AccordionPanelItem>\n            <AccordionPanelItem size=\"lg\">Content B</AccordionPanelItem>\n          </>\n        ),\n      },\n      {\n        label: 'Disabled Section',\n        disabled: true,\n        children: <AccordionPanelItem size=\"lg\">Hidden content</AccordionPanelItem>,\n      },\n      { label: 'Another Section' },\n    ],\n  },\n};"
  },
  {
    "id": "components-accordion--long-labels",
    "title": "Components/Accordion",
    "name": "Long Labels (ellipsis)",
    "source": "export const LongLabels: Story = {\n  name: 'Long Labels (ellipsis)',\n  args: {\n    size: 'lg',\n    showDivider: true,\n    allowMultiple: false,\n    items: [\n      { label: 'This is a very long accordion header that should be truncated with ellipsis when collapsed' },\n      { label: 'Another extremely long section title for testing overflow behavior in the accordion component' },\n      { label: 'Short' },\n    ],\n  },\n};"
  },
  {
    "id": "components-feedback-banner--error",
    "title": "Components/Feedback/Banner",
    "name": "Error",
    "source": "export const Error: Story = {\n  args: { color: 'error' },\n};"
  },
  {
    "id": "components-feedback-banner--warning",
    "title": "Components/Feedback/Banner",
    "name": "Warning",
    "source": "export const Warning: Story = {\n  args: { color: 'warning' },\n};"
  },
  {
    "id": "components-feedback-banner--brand",
    "title": "Components/Feedback/Banner",
    "name": "Brand",
    "source": "export const Brand: Story = {\n  args: { color: 'brand' },\n};"
  },
  {
    "id": "components-feedback-banner--announcement",
    "title": "Components/Feedback/Banner",
    "name": "Announcement",
    "source": "export const Announcement: Story = {\n  args: { color: 'announcement', showIcon: false },\n};"
  },
  {
    "id": "components-feedback-banner--without-action",
    "title": "Components/Feedback/Banner",
    "name": "Without Action",
    "source": "export const WithoutAction: Story = {\n  args: { color: 'brand', showAction: false },\n};"
  },
  {
    "id": "components-feedback-banner--all-colors",
    "title": "Components/Feedback/Banner",
    "name": "All Colors",
    "source": "export const AllColors: Story = {\n  render: () => (\n    <div className=\"inline-flex w-72 flex-col items-start gap-5 overflow-hidden rounded-4 bg-surface-default p-5\">\n      {colors.map((color) => (\n        <Banner key={color} color={color} showIcon={color !== 'announcement'} />\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-navigation-breadcrumb--default",
    "title": "Components/Navigation/Breadcrumb",
    "name": "Default",
    "source": "<Breadcrumb\n  items={[\n    { label: 'Home',     href: '#' },\n    { label: 'Category', href: '#' },\n    { label: 'Current Page' },\n  ]}\n/>"
  },
  {
    "id": "components-navigation-breadcrumb--deep",
    "title": "Components/Navigation/Breadcrumb",
    "name": "Deep Path",
    "source": "<Breadcrumb\n  items={[\n    { label: 'Home',        href: '#' },\n    { label: 'Category',    href: '#' },\n    { label: 'Subcategory', href: '#' },\n    { label: 'Section',     href: '#' },\n    { label: 'Current Page' },\n  ]}\n/>"
  },
  {
    "id": "components-navigation-breadcrumb--collapsed",
    "title": "Components/Navigation/Breadcrumb",
    "name": "Collapsed (maxItems)",
    "source": "<Breadcrumb\n  maxItems={2}\n  items={[\n    { label: 'Home',        href: '#' },\n    { label: 'Category',    href: '#' },\n    { label: 'Subcategory', href: '#' },\n    { label: 'Section',     href: '#' },\n    { label: 'Current Page' },\n  ]}\n/>"
  },
  {
    "id": "components-navigation-breadcrumb--minimal",
    "title": "Components/Navigation/Breadcrumb",
    "name": "Minimal (2 items)",
    "source": "<Breadcrumb\n  items={[\n    { label: 'Home', href: '#' },\n    { label: 'Current Page' },\n  ]}\n/>"
  },
  {
    "id": "components-navigation-breadcrumb--long-labels",
    "title": "Components/Navigation/Breadcrumb",
    "name": "Long Labels (ellipsis)",
    "source": "<Breadcrumb\n  items={[\n    { label: 'Very Long Category Name',       href: '#' },\n    { label: 'Another Very Long Section Name', href: '#' },\n    { label: 'Current Page with Long Title' },\n  ]}\n/>"
  },
  {
    "id": "components-button-button--primary-solid",
    "title": "Components/Button/Button",
    "name": "Primary",
    "source": "export const PrimarySolid: Story = {\n  name: 'Primary',\n  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Primary', showLeftIcon: false }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--outlined-button",
    "title": "Components/Button/Button",
    "name": "Secondary",
    "source": "export const OutlinedButton: Story = {\n  name: 'Secondary',\n  ...makeStory({ type: 'secondary', styleType: 'outline', size: 'lg', label: 'Secondary', showLeftIcon: false }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--tertiary",
    "title": "Components/Button/Button",
    "name": "Tertiary",
    "source": "export const Tertiary: Story = {\n  name: 'Tertiary',\n  ...makeStory({\n    type: 'tertiary',\n    styleType: 'solid',\n    size: 'lg',\n    state: 'enabled',\n    label: 'Tertiary',\n    showLabel: true,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: false,\n  }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--primary-ghost",
    "title": "Components/Button/Button",
    "name": "Ghost Primary",
    "source": "export const PrimaryGhost: Story = {\n  name: 'Ghost Primary',\n  ...makeStory({ type: 'primary', styleType: 'ghost', size: 'lg', label: 'Ghost Primary', showLeftIcon: false }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--ghost-secondary",
    "title": "Components/Button/Button",
    "name": "Ghost Secondary",
    "source": "export const GhostSecondary: Story = {\n  name: 'Ghost Secondary',\n  ...makeStory({\n    type: 'secondary',\n    styleType: 'ghost',\n    size: 'lg',\n    state: 'enabled',\n    label: 'Ghost Secondary',\n    showLabel: true,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: false,\n  }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--ghost-inverse",
    "title": "Components/Button/Button",
    "name": "Ghost Inverse",
    "source": "export const GhostInverse: Story = {\n  name: 'Ghost Inverse',\n  decorators: [inverseCanvas],\n  ...makeStory({\n    type: 'white',\n    styleType: 'ghost',\n    size: 'lg',\n    state: 'enabled',\n    label: 'Ghost Inverse',\n    showLabel: true,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: false,\n  }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--link",
    "title": "Components/Button/Button",
    "name": "Link Primary",
    "source": "export const Link: Story = {\n  name: 'Link Primary',\n  ...makeStory({ type: 'primary', styleType: 'link', size: 'lg', label: 'Link Primary', showLeftIcon: false }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--link-inverse",
    "title": "Components/Button/Button",
    "name": "Link Inverse",
    "source": "export const LinkInverse: Story = {\n  name: 'Link Inverse',\n  decorators: [inverseCanvas],\n  ...makeStory({\n    type: 'white',\n    styleType: 'link',\n    size: 'lg',\n    state: 'enabled',\n    label: 'Link Inverse',\n    showLabel: true,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: false,\n  }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--danger",
    "title": "Components/Button/Button",
    "name": "Danger",
    "source": "export const Danger: Story = {\n  name: 'Danger',\n  ...makeStory({\n    type: 'primary',\n    styleType: 'danger',\n    size: 'lg',\n    state: 'enabled',\n    label: 'Danger',\n    showLabel: true,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: false,\n  }, { includeStoryFrame: true }),\n  render: renderButtonStory,\n};"
  },
  {
    "id": "components-button-button--loading",
    "title": "Components/Button/Button",
    "name": "Loading",
    "source": "export const Loading: Story = {\n  name: 'Loading',\n  ...makeStory({\n    type: 'primary',\n    styleType: 'solid',\n    size: 'lg',\n    state: 'enabled',\n    label: 'label',\n    showLabel: false,\n    showLeftIcon: false,\n    showRightIcon: false,\n    showLoading: true,\n  }),\n};"
  },
  {
    "id": "components-button-button--sizes",
    "title": "Components/Button/Button",
    "name": "Sizes",
    "source": "// ① Component usage\n<div className=\"flex items-center gap-4\">\n  <Button type=\"primary\" styleType=\"solid\" size=\"sm\" state=\"enabled\" label=\"Small\" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />\n  <Button type=\"primary\" styleType=\"solid\" size=\"md\" state=\"enabled\" label=\"Medium\" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />\n  <Button type=\"primary\" styleType=\"solid\" size=\"lg\" state=\"enabled\" label=\"Large\" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />\n</div>"
  },
  {
    "id": "components-button-button--state",
    "title": "Components/Button/Button",
    "name": "State",
    "source": "// ① Component usage\nconst states = [\n  { label: 'Hover', state: 'hover' },\n  { label: 'Pressed', state: 'pressed' },\n  { label: 'Focused', state: 'focused' },\n  { label: 'Disabled', state: 'disabled' },\n];\n\nconst rows = [\n  { label: 'Primary', type: 'primary', styleType: 'solid' },\n  { label: 'Secondary', type: 'secondary', styleType: 'outline' },\n  { label: 'Tertiary', type: 'tertiary', styleType: 'solid' },\n  { label: 'Ghost Primary', type: 'primary', styleType: 'ghost' },\n  { label: 'Ghost Secondary', type: 'secondary', styleType: 'ghost' },\n  { label: 'Ghost Inverse', type: 'white', styleType: 'ghost', inverse: true },\n  { label: 'Link Primary', type: 'primary', styleType: 'link' },\n  { label: 'Link Inverse', type: 'white', styleType: 'link', inverse: true, showLeftIcon: false },\n];\n\nconst interactiveSurfaceClass =\n  '[&>button]:overflow-hidden [&>button>span:last-child]:inset-0 [&>button>span:last-child]:!rounded-2';\nconst ghostLinkCompactClass =\n  '[&>button]:p-0.5 [&>button]:h-auto [&>button]:min-h-0';\nconst focusedRingClass =\n  '[&>button]:shadow-focus-button-ring';\nconst linkFocusedRingClass =\n  '[&>button]:outline [&>button]:outline-offset-0 [&>button]:outline-[length:var(--sol-focus-ring-link-outline-width)] [&>button]:outline-[color:var(--sol-focus-ring-link-outline-color)]';\nconst focusedTargets = ['Primary', 'Secondary', 'Tertiary', 'Ghost Primary', 'Ghost Secondary', 'Ghost Inverse', 'Link Primary', 'Link Inverse'];\n\n<div className=\"flex w-fit flex-col gap-4\">\n  <div className=\"grid grid-cols-[repeat(4,90px)] items-center gap-12 px-3\">\n    {states.map(({ label }) => (\n      <div key={label} className=\"w-[90px] text-center text-[length:var(--sol-font-size-text-sm)] font-semibold leading-[var(--sol-line-height-text-sm)] text-element-quaternary\">{label}</div>\n    ))}\n  </div>\n  {rows.map((row) => (\n    <div\n      key={row.label}\n      className={`grid grid-cols-[repeat(4,90px)] items-center gap-12 ${row.inverse ? 'bg-primary p-3' : 'px-3'}`}\n    >\n      {states.map(({ label, state }) => (\n        <div\n          key={row.label + '-' + label}\n          className={[\n            'inline-flex w-[90px] items-center justify-start [&>button]:w-[90px] [&>button]:text-[length:var(--sol-font-size-text-sm)] [&>button]:font-semibold [&>button]:leading-[var(--sol-line-height-text-sm)]',\n            interactiveSurfaceClass,\n            (row.styleType === 'ghost' || row.styleType === 'link') ? ghostLinkCompactClass : '',\n            state === 'focused' && focusedTargets.includes(row.label)\n              ? row.styleType === 'link'\n                ? linkFocusedRingClass\n                : focusedRingClass\n              : '',\n          ].filter(Boolean).join(' ')}\n        >\n          <Button\n            type={row.type}\n            styleType={row.styleType}\n            size=\"lg\"\n            state={state}\n            label={label}\n            showLabel\n            showLeftIcon={row.showLeftIcon ?? false}\n            showRightIcon={false}\n            showLoading={false}\n          />\n        </div>\n      ))}\n    </div>\n  ))}\n</div>"
  },
  {
    "id": "components-button-button--left-icon",
    "title": "Components/Button/Button",
    "name": "Left Icon",
    "source": "export const LeftIcon: Story = {\n  name: 'Left Icon',\n  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Left Icon', showLeftIcon: true, showRightIcon: false }),\n};"
  },
  {
    "id": "components-button-button--right-icon",
    "title": "Components/Button/Button",
    "name": "Right Icon",
    "source": "export const RightIcon: Story = {\n  name: 'Right Icon',\n  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Right Icon', showLeftIcon: false, showRightIcon: true }),\n};"
  },
  {
    "id": "components-card--horizontal-md",
    "title": "Components/Card",
    "name": "Horizontal — md",
    "source": "export const HorizontalMd: Story = {\n  name: 'Horizontal — md',\n  args: { type: 'horizontal', size: 'md' },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--horizontal-sm",
    "title": "Components/Card",
    "name": "Horizontal — sm",
    "source": "export const HorizontalSm: Story = {\n  name: 'Horizontal — sm',\n  args: { type: 'horizontal', size: 'sm' },\n  render: (args) => <Card {...args} className=\"w-[360px]\" />,\n};"
  },
  {
    "id": "components-card--vertical-sm",
    "title": "Components/Card",
    "name": "Vertical — sm",
    "source": "export const VerticalSm: Story = {\n  name: 'Vertical — sm',\n  args: { type: 'vertical', size: 'sm' },\n  render: (args) => <Card {...args} className=\"w-[240px]\" />,\n};"
  },
  {
    "id": "components-card--vertical-md",
    "title": "Components/Card",
    "name": "Vertical — md",
    "source": "export const VerticalMd: Story = {\n  name: 'Vertical — md',\n  args: { type: 'vertical', size: 'md' },\n  render: (args) => <Card {...args} className=\"w-[288px]\" />,\n};"
  },
  {
    "id": "components-card--with-thumbnail-image",
    "title": "Components/Card",
    "name": "With thumbnail image",
    "source": "export const WithThumbnailImage: Story = {\n  name: 'With thumbnail image',\n  args: { thumbnailSrc: 'https://placehold.co/248x200/e8e8e8/999?text=Image' },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--without-thumbnail",
    "title": "Components/Card",
    "name": "Without thumbnail",
    "source": "export const WithoutThumbnail: Story = {\n  name: 'Without thumbnail',\n  args: { showThumbnail: false },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--without-meta",
    "title": "Components/Card",
    "name": "Without meta",
    "source": "export const WithoutMeta: Story = {\n  name: 'Without meta',\n  args: { showMeta: false },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--without-description",
    "title": "Components/Card",
    "name": "Without description",
    "source": "export const WithoutDescription: Story = {\n  name: 'Without description',\n  args: { showDescription: false },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--title-only",
    "title": "Components/Card",
    "name": "Title only",
    "source": "export const TitleOnly: Story = {\n  name: 'Title only',\n  args: { showThumbnail: false, showMeta: false, showDescription: false },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--disabled",
    "title": "Components/Card",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: { state: 'disabled' },\n  render: (args) => <Card {...args} className=\"w-[420px]\" />,\n};"
  },
  {
    "id": "components-card--all-variants",
    "title": "Components/Card",
    "name": "All variants",
    "source": "export const AllVariants: Story = {\n  name: 'All variants',\n  render: () => <div className=\"flex flex-col gap-10 p-6\">...</div>,\n};"
  },
  {
    "id": "components-controls-checkbox--default",
    "title": "Components/Controls/Checkbox",
    "name": "Default (Checked)",
    "source": "export const Default: Story = {\n  name: 'Default (Checked)',\n  args: {\n    checked: true,\n    label: 'Checkbox label',\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--unchecked",
    "title": "Components/Controls/Checkbox",
    "name": "Unchecked",
    "source": "export const Unchecked: Story = {\n  name: 'Unchecked',\n  args: {\n    checked: false,\n    label: 'Checkbox label',\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--indeterminate",
    "title": "Components/Controls/Checkbox",
    "name": "Indeterminate",
    "source": "export const Indeterminate: Story = {\n  name: 'Indeterminate',\n  args: {\n    indeterminate: true,\n    label: 'Indeterminate',\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--disabled",
    "title": "Components/Controls/Checkbox",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    checked: true,\n    disabled: true,\n    label: 'Disabled checked',\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--without-label",
    "title": "Components/Controls/Checkbox",
    "name": "Without Label",
    "source": "export const WithoutLabel: Story = {\n  name: 'Without Label',\n  args: {\n    checked: true,\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--interactive",
    "title": "Components/Controls/Checkbox",
    "name": "Interactive",
    "source": "export const Interactive: Story = {\n  name: 'Interactive',\n  args: { label: '' },\n  render: () => {\n    const [checked, setChecked] = useState(false);\n    return (\n      <Checkbox\n        checked={checked}\n        onChange={setChecked}\n        label={checked ? 'Checked' : 'Unchecked'}\n      />\n    );\n  },\n};"
  },
  {
    "id": "components-controls-checkbox--all-variants",
    "title": "Components/Controls/Checkbox",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  args: { label: '' },\n  render: () => (\n    <div className=\"flex flex-col gap-4\">\n      <p className=\"text-text-sm text-element-secondary\">Enabled</p>\n      <div className=\"flex items-center gap-6\">\n        <Checkbox checked={false} label=\"Unchecked\" />\n        <Checkbox checked label=\"Checked\" />\n        <Checkbox indeterminate label=\"Indeterminate\" />\n      </div>\n      <p className=\"mt-4 text-text-sm text-element-secondary\">Disabled</p>\n      <div className=\"flex items-center gap-6\">\n        <Checkbox checked={false} disabled label=\"Unchecked\" />\n        <Checkbox checked disabled label=\"Checked\" />\n        <Checkbox indeterminate disabled label=\"Indeterminate\" />\n      </div>\n      <p className=\"mt-4 text-text-sm text-element-secondary\">Without Label</p>\n      <div className=\"flex items-center gap-6\">\n        <Checkbox checked={false} />\n        <Checkbox checked />\n        <Checkbox indeterminate />\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-status-indicator-chip--sm-selected",
    "title": "Components/Status indicator/Chip",
    "name": "sm — selected",
    "source": "export const SmSelected: Story = {\n  name: 'sm — selected',\n  args: { size: 'sm', selected: true, leftIcon: <IcBlank size={14} />, rightIcon: <IcBlank size={14} /> },\n};"
  },
  {
    "id": "components-status-indicator-chip--sm-default",
    "title": "Components/Status indicator/Chip",
    "name": "sm — default",
    "source": "export const SmDefault: Story = {\n  name: 'sm — default',\n  args: { size: 'sm', selected: false, leftIcon: <IcBlank size={14} />, rightIcon: <IcBlank size={14} /> },\n};"
  },
  {
    "id": "components-status-indicator-chip--md-selected",
    "title": "Components/Status indicator/Chip",
    "name": "md — selected",
    "source": "export const MdSelected: Story = {\n  name: 'md — selected',\n  args: { size: 'md', selected: true, leftIcon: <IcBlank size={16} />, rightIcon: <IcBlank size={16} /> },\n};"
  },
  {
    "id": "components-status-indicator-chip--md-default",
    "title": "Components/Status indicator/Chip",
    "name": "md — default",
    "source": "export const MdDefault: Story = {\n  name: 'md — default',\n  args: { size: 'md', selected: false, leftIcon: <IcBlank size={16} />, rightIcon: <IcBlank size={16} /> },\n};"
  },
  {
    "id": "components-status-indicator-chip--all-variants",
    "title": "Components/Status indicator/Chip",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-8 rounded-[5px] bg-surface-default p-6\">\n      {sizes.map((size) => (\n        <div key={size} className=\"flex flex-col gap-4\">\n          <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n            {size}\n          </span>\n          <div className=\"grid grid-cols-3 gap-6\">\n            {states.map((state) => (\n              <div key={state} className=\"flex flex-col gap-3\">\n                <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary\">\n                  {state}\n                </span>\n                <div className=\"flex flex-col gap-2 items-start\">\n                  <Chip\n                    label=\"Chip\"\n                    size={size}\n                    state={state}\n                    selected\n                    leftIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}\n                    rightIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}\n                  />\n                  <Chip\n                    label=\"Chip\"\n                    size={size}\n                    state={state}\n                    selected={false}\n                    leftIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}\n                    rightIcon={<IcBlank size={size === 'sm' ? 14 : 16} />}\n                  />\n                </div>\n              </div>\n            ))}\n          </div>\n        </div>\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-status-indicator-chip--icon-variants",
    "title": "Components/Status indicator/Chip",
    "name": "Icon Variants",
    "source": "export const IconVariants: Story = {\n  name: 'Icon Variants',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-4 rounded-[5px] bg-surface-default p-6\">\n      <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n        icon 조합\n      </span>\n      <div className=\"flex flex-wrap gap-3 items-start\">\n        <Chip label=\"Both icons\" selected leftIcon={<IcBlank size={16} />} rightIcon={<IcBlank size={16} />} />\n        <Chip label=\"Left only\" selected leftIcon={<IcBlank size={16} />} />\n        <Chip label=\"Right only\" selected rightIcon={<IcBlank size={16} />} />\n        <Chip label=\"No icon\" selected />\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--default",
    "title": "Components/Controls/ControlGroup",
    "name": "Default (Checkbox Group)",
    "source": "export const Default: Story = {\n  name: 'Default (Checkbox Group)',\n  args: {\n    legend: 'Notification',\n    children: null,\n  },\n  render: (args) => {\n    const [values, setValues] = useState<Record<string, boolean>>({\n      email: true,\n      sms: false,\n      push: true,\n    });\n    const toggle = (key: string) =>\n      setValues((prev) => ({ ...prev, [key]: !prev[key] }));\n    return (\n      <ControlGroup {...args}>\n        <Checkbox checked={values.email} onChange={() => toggle('email')} label=\"Email\" />\n        <Checkbox checked={values.sms} onChange={() => toggle('sms')} label=\"SMS\" />\n        <Checkbox checked={values.push} onChange={() => toggle('push')} label=\"Push\" />\n      </ControlGroup>\n    );\n  },\n};"
  },
  {
    "id": "components-controls-controlgroup--radio-group-example",
    "title": "Components/Controls/ControlGroup",
    "name": "Radio Group",
    "source": "export const RadioGroupExample: Story = {\n  name: 'Radio Group',\n  args: {\n    legend: 'User Role',\n    children: null,\n  },\n  render: (args) => {\n    const [value, setValue] = useState('admin');\n    return (\n      <ControlGroup {...args}>\n        <RadioGroup value={value} onChange={setValue}>\n          <Radio value=\"admin\" label=\"Admin\" />\n          <Radio value=\"editor\" label=\"Editor\" />\n          <Radio value=\"viewer\" label=\"Viewer\" />\n        </RadioGroup>\n      </ControlGroup>\n    );\n  },\n};"
  },
  {
    "id": "components-controls-controlgroup--switch-group-example",
    "title": "Components/Controls/ControlGroup",
    "name": "Switch Group",
    "source": "export const SwitchGroupExample: Story = {\n  name: 'Switch Group',\n  args: {\n    legend: 'Features',\n    children: null,\n  },\n  render: (args) => {\n    const [values, setValues] = useState<Record<string, boolean>>({\n      gateway: true,\n      ble: false,\n      private: true,\n    });\n    const toggle = (key: string) =>\n      setValues((prev) => ({ ...prev, [key]: !prev[key] }));\n    return (\n      <ControlGroup {...args}>\n        <Switch checked={values.gateway} onChange={() => toggle('gateway')} label=\"Gateway\" />\n        <Switch checked={values.ble} onChange={() => toggle('ble')} label=\"BLE\" />\n        <Switch checked={values.private} onChange={() => toggle('private')} label=\"Private Mode\" />\n      </ControlGroup>\n    );\n  },\n};"
  },
  {
    "id": "components-controls-controlgroup--required",
    "title": "Components/Controls/ControlGroup",
    "name": "Required",
    "source": "export const Required: Story = {\n  name: 'Required',\n  args: {\n    legend: 'Permission',\n    required: true,\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox label=\"View\" />\n      <Checkbox label=\"Edit\" />\n      <Checkbox label=\"Delete\" />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--error",
    "title": "Components/Controls/ControlGroup",
    "name": "Error",
    "source": "export const Error: Story = {\n  name: 'Error',\n  args: {\n    legend: 'Label',\n    required: true,\n    error: true,\n    helperText: 'Helper text',\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--disabled",
    "title": "Components/Controls/ControlGroup",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    legend: 'Notification',\n    disabled: true,\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox checked label=\"Email\" disabled />\n      <Checkbox label=\"SMS\" disabled />\n      <Checkbox label=\"Push\" disabled />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--horizontal",
    "title": "Components/Controls/ControlGroup",
    "name": "Horizontal",
    "source": "export const Horizontal: Story = {\n  name: 'Horizontal',\n  args: {\n    legend: 'Select Option',\n    orientation: 'horizontal',\n    children: null,\n  },\n  render: (args) => {\n    const [value, setValue] = useState('a');\n    return (\n      <ControlGroup {...args}>\n        <RadioGroup value={value} onChange={setValue}>\n          <div className=\"flex flex-row gap-6\">\n            <Radio value=\"a\" label=\"Option A\" />\n            <Radio value=\"b\" label=\"Option B\" />\n            <Radio value=\"c\" label=\"Option C\" />\n          </div>\n        </RadioGroup>\n      </ControlGroup>\n    );\n  },\n};"
  },
  {
    "id": "components-controls-controlgroup--multi-column",
    "title": "Components/Controls/ControlGroup",
    "name": "Multi Column (2 cols)",
    "source": "export const MultiColumn: Story = {\n  name: 'Multi Column (2 cols)',\n  args: {\n    legend: 'Multifunction',\n    columns: 2,\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--three-column",
    "title": "Components/Controls/ControlGroup",
    "name": "Multi Column (3 cols)",
    "source": "export const ThreeColumn: Story = {\n  name: 'Multi Column (3 cols)',\n  args: {\n    legend: 'Select Option',\n    columns: 3,\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n      <Checkbox label=\"Option\" />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--with-helper-text",
    "title": "Components/Controls/ControlGroup",
    "name": "With Helper Text",
    "source": "export const WithHelperText: Story = {\n  name: 'With Helper Text',\n  args: {\n    legend: 'Notification',\n    helperText: 'Select at least one notification method.',\n    children: null,\n  },\n  render: (args) => (\n    <ControlGroup {...args}>\n      <Checkbox checked label=\"Email\" />\n      <Checkbox label=\"SMS\" />\n      <Checkbox label=\"Push\" />\n    </ControlGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-controlgroup--all-control-types",
    "title": "Components/Controls/ControlGroup",
    "name": "All Control Types",
    "source": "export const AllControlTypes: Story = {\n  name: 'All Control Types',\n  args: {\n    legend: '',\n    children: null,\n  },\n  render: () => {\n    const [radioValue, setRadioValue] = useState('email');\n    const [checks, setChecks] = useState({ a: true, b: false, c: true });\n    const [switches, setSwitches] = useState({ x: true, y: false, z: false });\n    const toggleCheck = (k: string) =>\n      setChecks((p) => ({ ...p, [k]: !p[k as keyof typeof p] }));\n    const toggleSwitch = (k: string) =>\n      setSwitches((p) => ({ ...p, [k]: !p[k as keyof typeof p] }));\n\n    return (\n      <div className=\"flex flex-col gap-8\">\n        {/* Checkbox */}\n        <ControlGroup legend=\"Checkbox Group\">\n          <Checkbox checked={checks.a} onChange={() => toggleCheck('a')} label=\"Email\" />\n          <Checkbox checked={checks.b} onChange={() => toggleCheck('b')} label=\"SMS\" />\n          <Checkbox checked={checks.c} onChange={() => toggleCheck('c')} label=\"Push\" />\n        </ControlGroup>\n\n        {/* Radio */}\n        <ControlGroup legend=\"Radio Group\">\n          <RadioGroup value={radioValue} onChange={setRadioValue}>\n            <Radio value=\"email\" label=\"Email\" />\n            <Radio value=\"notification\" label=\"Notification\" />\n            <Radio value=\"option\" label=\"Option\" />\n          </RadioGroup>\n        </ControlGroup>\n\n        {/* Switch */}\n        <ControlGroup legend=\"Switch Group\">\n          <Switch checked={switches.x} onChange={() => toggleSwitch('x')} label=\"Gateway\" />\n          <Switch checked={switches.y} onChange={() => toggleSwitch('y')} label=\"BLE\" />\n          <Switch checked={switches.z} onChange={() => toggleSwitch('z')} label=\"Private Mode\" />\n        </ControlGroup>\n\n        {/* Required + Error */}\n        <ControlGroup legend=\"Required + Error\" required error helperText=\"Please select an option.\">\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n        </ControlGroup>\n\n        {/* Disabled */}\n        <ControlGroup legend=\"Disabled Group\" disabled>\n          <Checkbox checked label=\"Option A\" disabled />\n          <Checkbox label=\"Option B\" disabled />\n        </ControlGroup>\n\n        {/* Multi Column */}\n        <ControlGroup legend=\"Multi Column (3 cols)\" columns={3}>\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n          <Checkbox label=\"Option\" />\n        </ControlGroup>\n      </div>\n    );\n  },\n};"
  },
  {
    "id": "components-data-table-datatable--default",
    "title": "Components/Data table/DataTable",
    "name": "Default",
    "source": "export const Default: Story = {\n  render: (args) => (\n    <DataTable {...args} columns={columns} data={sampleData} />\n  ),\n};"
  },
  {
    "id": "components-data-table-datatable--few-rows",
    "title": "Components/Data table/DataTable",
    "name": "Few rows (no pagination)",
    "source": "export const FewRows: Story = {\n  name: 'Few rows (no pagination)',\n  render: (args) => (\n    <DataTable\n      {...args}\n      columns={columns}\n      data={sampleData.slice(0, 5)}\n      perPage={10}\n    />\n  ),\n};"
  },
  {
    "id": "components-data-table-datatable--without-toolbar",
    "title": "Components/Data table/DataTable",
    "name": "Without toolbar",
    "source": "export const WithoutToolbar: Story = {\n  name: 'Without toolbar',\n  args: { showToolbar: false },\n  render: (args) => (\n    <DataTable {...args} columns={columns} data={sampleData} />\n  ),\n};"
  },
  {
    "id": "components-data-table-datatable--per-page-5",
    "title": "Components/Data table/DataTable",
    "name": "5 per page",
    "source": "export const PerPage5: Story = {\n  name: '5 per page',\n  args: { perPage: 5 },\n  render: (args) => (\n    <DataTable {...args} columns={columns} data={sampleData} />\n  ),\n};"
  },
  {
    "id": "components-data-table-datatable--three-columns",
    "title": "Components/Data table/DataTable",
    "name": "Three columns",
    "source": "export const ThreeColumns: Story = {\n  name: 'Three columns',\n  render: (args) => (\n    <DataTable\n      {...args}\n      columns={columns.slice(0, 3)}\n      data={sampleData}\n    />\n  ),\n};"
  },
  {
    "id": "components-data-table-datatabletoolbar--default",
    "title": "Components/Data table/DataTableToolbar",
    "name": "Default",
    "source": "export const Default: Story = {};"
  },
  {
    "id": "components-data-table-datatabletoolbar--without-columns",
    "title": "Components/Data table/DataTableToolbar",
    "name": "Without column selector",
    "source": "export const WithoutColumns: Story = {\n  name: 'Without column selector',\n  args: {\n    columns: [],\n  },\n};"
  },
  {
    "id": "components-data-table-datatabletoolbar--large-count",
    "title": "Components/Data table/DataTableToolbar",
    "name": "Large total count",
    "source": "export const LargeCount: Story = {\n  name: 'Large total count',\n  args: {\n    totalCount: 12450,\n    perPage: 50,\n  },\n};"
  },
  {
    "id": "components-data-table-datatabletoolbar--all-columns-visible",
    "title": "Components/Data table/DataTableToolbar",
    "name": "All columns visible",
    "source": "export const AllColumnsVisible: Story = {\n  name: 'All columns visible',\n  args: {\n    visibleColumns: sampleColumns,\n  },\n};"
  },
  {
    "id": "components-data-table-datatabletoolbar--few-columns",
    "title": "Components/Data table/DataTableToolbar",
    "name": "Few columns visible",
    "source": "export const FewColumns: Story = {\n  name: 'Few columns visible',\n  args: {\n    visibleColumns: ['Name', 'Status'],\n  },\n};"
  },
  {
    "id": "components-data-table-datatabletree--default",
    "title": "Components/Data table/DataTableTree",
    "name": "Default",
    "source": "export const Default: Story = {\n  render: (args) => <DataTableTree {...args} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-data-table-datatabletree--with-actions",
    "title": "Components/Data table/DataTableTree",
    "name": "With Action Buttons",
    "source": "export const WithActions: Story = {\n  name: 'With Action Buttons',\n  args: {\n    primaryAction: { label: 'Main Button' },\n    secondaryAction: { label: 'Sub Button' },\n  },\n  render: (args) => <DataTableTree {...args} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-data-table-datatabletree--no-search",
    "title": "Components/Data table/DataTableTree",
    "name": "Without Search",
    "source": "export const NoSearch: Story = {\n  name: 'Without Search',\n  args: { showSearch: false },\n  render: (args) => <DataTableTree {...args} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-data-table-datatabletree--no-pagination",
    "title": "Components/Data table/DataTableTree",
    "name": "Without Pagination",
    "source": "export const NoPagination: Story = {\n  name: 'Without Pagination',\n  args: { showPagination: false },\n  render: (args) => <DataTableTree {...args} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-data-table-datatabletree--expanded-tree",
    "title": "Components/Data table/DataTableTree",
    "name": "Expanded Tree",
    "source": "export const ExpandedTree: Story = {\n  name: 'Expanded Tree',\n  render: () => <DataTableTree columns={treeColumns} rows={treeRows} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-data-table-datatabletree--paginated",
    "title": "Components/Data table/DataTableTree",
    "name": "With Pagination (25 rows)",
    "source": "export const Paginated: Story = {\n  name: 'With Pagination (25 rows)',\n  args: { rows: manyRows, perPage: 10, showPagination: true },\n  render: (args) => <DataTableTree {...args} className=\"w-[900px]\" />,\n};"
  },
  {
    "id": "components-divider--horizontal-default",
    "title": "Components/Divider",
    "name": "Horizontal · Default",
    "source": "export const HorizontalDefault: Story = {\n  name: 'Horizontal · Default',\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--horizontal-round",
    "title": "Components/Divider",
    "name": "Horizontal · Round cap",
    "source": "export const HorizontalRound: Story = {\n  name: 'Horizontal · Round cap',\n  args: { cap: 'round' },\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--horizontal-g-150",
    "title": "Components/Divider",
    "name": "Horizontal · G150 (darker)",
    "source": "export const HorizontalG150: Story = {\n  name: 'Horizontal · G150 (darker)',\n  args: { color: 'G150' },\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--horizontal-non-solid",
    "title": "Components/Divider",
    "name": "Horizontal · Non-solid",
    "source": "export const HorizontalNonSolid: Story = {\n  name: 'Horizontal · Non-solid',\n  args: { solid: false },\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--horizontal-spacing-12",
    "title": "Components/Divider",
    "name": "Horizontal · Spacing 12px",
    "source": "export const HorizontalSpacing12: Story = {\n  name: 'Horizontal · Spacing 12px',\n  args: { spacing: '12' },\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--horizontal-spacing-24",
    "title": "Components/Divider",
    "name": "Horizontal · Spacing 24px",
    "source": "export const HorizontalSpacing24: Story = {\n  name: 'Horizontal · Spacing 24px',\n  args: { spacing: '24' },\n  decorators: [\n    (Story) => (\n      <div className=\"w-80 bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--vertical-default",
    "title": "Components/Divider",
    "name": "Vertical · Default",
    "source": "export const VerticalDefault: Story = {\n  name: 'Vertical · Default',\n  args: { type: 'vertical' },\n  decorators: [\n    (Story) => (\n      <div className=\"flex h-24 items-stretch bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--vertical-round",
    "title": "Components/Divider",
    "name": "Vertical · Round cap",
    "source": "export const VerticalRound: Story = {\n  name: 'Vertical · Round cap',\n  args: { type: 'vertical', cap: 'round' },\n  decorators: [\n    (Story) => (\n      <div className=\"flex h-24 items-stretch bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--vertical-g-150",
    "title": "Components/Divider",
    "name": "Vertical · G150 (darker)",
    "source": "export const VerticalG150: Story = {\n  name: 'Vertical · G150 (darker)',\n  args: { type: 'vertical', color: 'G150' },\n  decorators: [\n    (Story) => (\n      <div className=\"flex h-24 items-stretch bg-surface-default p-6\">\n        <Story />\n      </div>\n    ),\n  ],\n};"
  },
  {
    "id": "components-divider--all-variants",
    "title": "Components/Divider",
    "name": "All variants",
    "source": "export const AllVariants: Story = {\n  name: 'All variants',\n  render: () => (\n    <div className=\"flex flex-col gap-8 rounded-4 bg-surface-default p-6\">\n      {/* Horizontal variants */}\n      <div>\n        <p className=\"mb-4 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Horizontal\n        </p>\n        <div className=\"flex flex-col gap-6\">\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Square · G100 · Solid\n            </span>\n            <Divider />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G100 · Solid\n            </span>\n            <Divider cap=\"round\" />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Square · G150 · Solid\n            </span>\n            <Divider color=\"G150\" />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G150 · Solid\n            </span>\n            <Divider cap=\"round\" color=\"G150\" />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Square · G100 · Non-solid\n            </span>\n            <Divider solid={false} />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G100 · Spacing 12px\n            </span>\n            <Divider cap=\"round\" spacing=\"12\" />\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G100 · Spacing 24px\n            </span>\n            <Divider cap=\"round\" spacing=\"24\" />\n          </div>\n        </div>\n      </div>\n\n      {/* Vertical variants */}\n      <div>\n        <p className=\"mb-4 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Vertical\n        </p>\n        <div className=\"flex h-24 items-stretch gap-10\">\n          <div className=\"flex flex-col items-center gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Square · G100\n            </span>\n            <div className=\"flex flex-1 items-stretch\">\n              <Divider type=\"vertical\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col items-center gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G100\n            </span>\n            <div className=\"flex flex-1 items-stretch\">\n              <Divider type=\"vertical\" cap=\"round\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col items-center gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Square · G150\n            </span>\n            <div className=\"flex flex-1 items-stretch\">\n              <Divider type=\"vertical\" color=\"G150\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col items-center gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Round · G150\n            </span>\n            <div className=\"flex flex-1 items-stretch\">\n              <Divider type=\"vertical\" cap=\"round\" color=\"G150\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col items-center gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">\n              Non-solid\n            </span>\n            <div className=\"flex flex-1 items-stretch\">\n              <Divider type=\"vertical\" solid={false} />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--default",
    "title": "Components/Dropdown/Dropdown",
    "name": "Default",
    "source": "export const Default: Story = {\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.map((item, i) => (\n        <DropdownItem key={item} label={item} compact={args.compact} />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--with-selected-item",
    "title": "Components/Dropdown/Dropdown",
    "name": "Selected item",
    "source": "export const WithSelectedItem: Story = {\n  name: 'Selected item',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.map((item, i) => (\n        <DropdownItem\n          key={item}\n          label={item}\n          compact={args.compact}\n          selected={i === 2}\n        />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--with-disabled-item",
    "title": "Components/Dropdown/Dropdown",
    "name": "Disabled items",
    "source": "export const WithDisabledItem: Story = {\n  name: 'Disabled items',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.map((item, i) => (\n        <DropdownItem\n          key={item}\n          label={item}\n          compact={args.compact}\n          disabled={i === 3 || i === 5}\n        />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--non-compact",
    "title": "Components/Dropdown/Dropdown",
    "name": "Non-compact (md)",
    "source": "export const NonCompact: Story = {\n  name: 'Non-compact (md)',\n  args: { compact: false },\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.map((item) => (\n        <DropdownItem key={item} label={item} compact={false} />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--checkbox-type",
    "title": "Components/Dropdown/Dropdown",
    "name": "Checkbox type",
    "source": "export const CheckboxType: Story = {\n  name: 'Checkbox type',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.slice(0, 6).map((item, i) => (\n        <DropdownItem\n          key={item}\n          label={`Select Item ${i + 1}`}\n          type=\"checkbox\"\n          compact={args.compact}\n          selected={i === 1 || i === 4}\n        />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--with-description",
    "title": "Components/Dropdown/Dropdown",
    "name": "With description",
    "source": "export const WithDescription: Story = {\n  name: 'With description',\n  args: { compact: false },\n  render: (args) => (\n    <Dropdown {...args} className=\"w-72\">\n      {items.slice(0, 5).map((item, i) => (\n        <DropdownItem\n          key={item}\n          label={item}\n          description=\"Description text\"\n          compact={false}\n          selected={i === 1}\n        />\n      ))}\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--with-group-labels",
    "title": "Components/Dropdown/Dropdown",
    "name": "Group labels",
    "source": "export const WithGroupLabels: Story = {\n  name: 'Group labels',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-72\">\n      <DropdownGroupLabel label=\"Group A\" compact={args.compact} />\n      <DropdownItem label=\"Item A-1\" compact={args.compact} />\n      <DropdownItem label=\"Item A-2\" compact={args.compact} />\n      <DropdownItem label=\"Item A-3\" compact={args.compact} />\n      <DropdownGroupLabel label=\"Group B\" compact={args.compact} />\n      <DropdownItem label=\"Item B-1\" compact={args.compact} />\n      <DropdownItem label=\"Item B-2\" compact={args.compact} />\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--control-footer",
    "title": "Components/Dropdown/Dropdown",
    "name": "With control footer",
    "source": "export const ControlFooter: Story = {\n  name: 'With control footer',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-72\">\n      {items.slice(0, 5).map((item, i) => (\n        <DropdownItem\n          key={item}\n          label={item}\n          type=\"checkbox\"\n          compact={args.compact}\n          selected={i === 0 || i === 2}\n        />\n      ))}\n      <DropdownFooter variant=\"control\" />\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--add-footer",
    "title": "Components/Dropdown/Dropdown",
    "name": "With add footer",
    "source": "export const AddFooter: Story = {\n  name: 'With add footer',\n  render: (args) => (\n    <Dropdown {...args} className=\"w-48\">\n      {items.slice(0, 4).map((item) => (\n        <DropdownItem key={item} label={item} compact={args.compact} />\n      ))}\n      <DropdownFooter variant=\"add\" addLabel=\"Add\" />\n    </Dropdown>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdown--all-item-states",
    "title": "Components/Dropdown/Dropdown",
    "name": "All item states",
    "source": "export const AllItemStates: Story = {\n  name: 'All item states',\n  render: () => (\n    <div className=\"flex flex-col gap-8 rounded-4 bg-surface-default p-6\">\n      {/* Default type — compact */}\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Default type · Compact\n        </p>\n        <div className=\"flex items-start gap-4\">\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Enabled</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Selected</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" selected />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Disabled</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" disabled />\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Default type — non-compact */}\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Default type · Non-compact\n        </p>\n        <div className=\"flex items-start gap-4\">\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Enabled</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" compact={false} />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Selected</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" compact={false} selected />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Disabled</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Dropdown Item\" compact={false} disabled />\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Checkbox type */}\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Checkbox type · Compact\n        </p>\n        <div className=\"flex items-start gap-4\">\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Unchecked</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Select Item\" type=\"checkbox\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Checked</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Select Item\" type=\"checkbox\" selected />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Disabled</span>\n            <div className=\"w-44 rounded-4 bg-surface-container-high p-1 shadow-normal\">\n              <DropdownItem label=\"Select Item\" type=\"checkbox\" disabled />\n            </div>\n          </div>\n        </div>\n      </div>\n\n      {/* Footers */}\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Footers\n        </p>\n        <div className=\"flex items-start gap-4\">\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Control</span>\n            <div className=\"w-56 rounded-4 bg-surface-container-high shadow-normal\">\n              <DropdownFooter variant=\"control\" />\n            </div>\n          </div>\n          <div className=\"flex flex-col gap-1\">\n            <span className=\"text-text-xxs text-element-quaternary\">Add</span>\n            <div className=\"w-56 rounded-4 bg-surface-container-high shadow-normal\">\n              <DropdownFooter variant=\"add\" />\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--default",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Default",
    "source": "export const Default: Story = {};"
  },
  {
    "id": "components-dropdown-dropdownitem--selected",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Selected",
    "source": "export const Selected: Story = {\n  args: { selected: true },\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--focused",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Focused",
    "source": "export const Focused: Story = {\n  args: { state: 'focused' },\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--disabled",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  args: { state: 'disabled' },\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--radio",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Radio",
    "source": "export const Radio: Story = {\n  args: { type: 'radio', selected: true },\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--checkbox",
    "title": "Components/Dropdown/DropdownItem",
    "name": "Checkbox",
    "source": "export const Checkbox: Story = {\n  args: { type: 'checkbox', selected: true },\n};"
  },
  {
    "id": "components-dropdown-dropdownitem--all-variants",
    "title": "Components/Dropdown/DropdownItem",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  render: () => (\n    <div className=\"grid w-[623px] grid-cols-3 gap-x-5 gap-y-6 rounded-[5px] border border-surface-default bg-surface-default p-6\">\n      {sizes.map((size) =>\n        types.map((type) =>\n          [false, true].map((selected) =>\n            states.map((state) => (\n              <DropdownItem\n                key={`${size}-${type}-${selected}-${state}`}\n                type={type}\n                size={size}\n                state={state}\n                selected={selected}\n              />\n            )),\n          ),\n        ),\n      )}\n    </div>\n  ),\n  parameters: {\n    layout: 'fullscreen',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--default",
    "title": "Components/Button/IconButton",
    "name": "Default",
    "source": "export const Default: Story = {\n  name: 'Default',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'md',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--primary",
    "title": "Components/Button/IconButton",
    "name": "Primary",
    "source": "export const Primary: Story = {\n  name: 'Primary',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--secondary",
    "title": "Components/Button/IconButton",
    "name": "Secondary",
    "source": "export const Secondary: Story = {\n  name: 'Secondary',\n  args: {\n    buttonStyle: 'square',\n    variant: 'secondary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--tertiary",
    "title": "Components/Button/IconButton",
    "name": "Tertiary",
    "source": "export const Tertiary: Story = {\n  name: 'Tertiary',\n  args: {\n    buttonStyle: 'square',\n    variant: 'tertiary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--circle",
    "title": "Components/Button/IconButton",
    "name": "Circle",
    "source": "export const Circle: Story = {\n  name: 'Circle',\n  args: {\n    buttonStyle: 'circle',\n    variant: 'primary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--square",
    "title": "Components/Button/IconButton",
    "name": "Square",
    "source": "export const Square: Story = {\n  name: 'Square',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--size-sm",
    "title": "Components/Button/IconButton",
    "name": "Size - sm",
    "source": "export const SizeSm: Story = {\n  name: 'Size - sm',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'sm',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--size-md",
    "title": "Components/Button/IconButton",
    "name": "Size - md",
    "source": "export const SizeMd: Story = {\n  name: 'Size - md',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'md',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--size-lg",
    "title": "Components/Button/IconButton",
    "name": "Size - lg",
    "source": "export const SizeLg: Story = {\n  name: 'Size - lg',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'lg',\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--disabled",
    "title": "Components/Button/IconButton",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    buttonStyle: 'square',\n    variant: 'primary',\n    size: 'lg',\n    disabled: true,\n  },\n};"
  },
  {
    "id": "components-button-iconbutton--all-variants",
    "title": "Components/Button/IconButton",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"flex flex-col gap-6\">\n      {/* Square */}\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Square</p>\n        <div className=\"flex items-end gap-3\">\n          <IconButton aria-label=\"primary sm\" buttonStyle=\"square\" variant=\"primary\" size=\"sm\" />\n          <IconButton aria-label=\"primary md\" buttonStyle=\"square\" variant=\"primary\" size=\"md\" />\n          <IconButton aria-label=\"primary lg\" buttonStyle=\"square\" variant=\"primary\" size=\"lg\" />\n          <IconButton aria-label=\"secondary lg\" buttonStyle=\"square\" variant=\"secondary\" size=\"lg\" />\n          <IconButton aria-label=\"tertiary lg\" buttonStyle=\"square\" variant=\"tertiary\" size=\"lg\" />\n          <IconButton aria-label=\"disabled lg\" buttonStyle=\"square\" variant=\"primary\" size=\"lg\" disabled />\n        </div>\n      </div>\n\n      {/* Circle */}\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Circle</p>\n        <div className=\"flex items-end gap-3\">\n          <IconButton aria-label=\"primary sm\" buttonStyle=\"circle\" variant=\"primary\" size=\"sm\" />\n          <IconButton aria-label=\"primary md\" buttonStyle=\"circle\" variant=\"primary\" size=\"md\" />\n          <IconButton aria-label=\"primary lg\" buttonStyle=\"circle\" variant=\"primary\" size=\"lg\" />\n          <IconButton aria-label=\"secondary lg\" buttonStyle=\"circle\" variant=\"secondary\" size=\"lg\" />\n          <IconButton aria-label=\"tertiary lg\" buttonStyle=\"circle\" variant=\"tertiary\" size=\"lg\" />\n          <IconButton aria-label=\"disabled lg\" buttonStyle=\"circle\" variant=\"primary\" size=\"lg\" disabled />\n        </div>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-overlaying-surface-modal--default",
    "title": "Components/Overlaying surface/Modal",
    "name": "size=md, align=left (web)",
    "source": "export const Default: Story = {\n  name: 'size=md, align=left (web)',\n  args: {\n    title: 'Title',\n    size: 'md',\n    align: 'left',\n    width: 480,\n  },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--sm-left",
    "title": "Components/Overlaying surface/Modal",
    "name": "size=sm, align=left (web)",
    "source": "export const SmLeft: Story = {\n  name: 'size=sm, align=left (web)',\n  args: { title: 'Title', size: 'sm', align: 'left', width: 360 },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--md-center",
    "title": "Components/Overlaying surface/Modal",
    "name": "size=md, align=center (web)",
    "source": "export const MdCenter: Story = {\n  name: 'size=md, align=center (web)',\n  args: { title: 'Title', size: 'md', align: 'center', width: 480 },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--sm-center",
    "title": "Components/Overlaying surface/Modal",
    "name": "size=sm, align=center (web)",
    "source": "export const SmCenter: Story = {\n  name: 'size=sm, align=center (web)',\n  args: { title: 'Title', size: 'sm', align: 'center', width: 360 },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--mobile",
    "title": "Components/Overlaying surface/Modal",
    "name": "size=md, align=center (mobile)",
    "source": "export const Mobile: Story = {\n  name: 'size=md, align=center (mobile)',\n  args: { title: 'Title', size: 'md', align: 'center', type: 'mobile', width: 360 },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--with-divider",
    "title": "Components/Overlaying surface/Modal",
    "name": "With Divider",
    "source": "export const WithDivider: Story = {\n  name: 'With Divider',\n  args: { title: 'Title', size: 'md', align: 'left', width: 480, showHeaderDivider: true, showFooterDivider: true },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--with-left-action",
    "title": "Components/Overlaying surface/Modal",
    "name": "With Left Action (link + step)",
    "source": "export const WithLeftAction: Story = {\n  name: 'With Left Action (link + step)',\n  args: { title: 'Title', size: 'md', align: 'left', width: 480, showLeftAction: true, showLinkBtn: true, showStep: true },\n};"
  },
  {
    "id": "components-overlaying-surface-modal--header-variants",
    "title": "Components/Overlaying surface/Modal",
    "name": "Header — All Variants",
    "source": "export const HeaderVariants: Story = {\n  name: 'Header — All Variants',\n  render: () => <div className=\"flex flex-col\">...</div>,\n};"
  },
  {
    "id": "components-overlaying-surface-modal--footer-variants",
    "title": "Components/Overlaying surface/Modal",
    "name": "Footer — All Variants",
    "source": "export const FooterVariants: Story = {\n  name: 'Footer — All Variants',\n  render: () => <div className=\"flex flex-col\">...</div>,\n};"
  },
  {
    "id": "components-overlaying-surface-popover--default",
    "title": "Components/Overlaying surface/Popover",
    "name": "Default",
    "source": "export const Default: Story = {};"
  },
  {
    "id": "components-overlaying-surface-popover--md-bottom",
    "title": "Components/Overlaying surface/Popover",
    "name": "size=md, placement=bottom",
    "source": "export const MdBottom: Story = {\n  name: 'size=md, placement=bottom',\n  args: { size: 'md', placement: 'bottom' },\n};"
  },
  {
    "id": "components-overlaying-surface-popover--lg-bottom",
    "title": "Components/Overlaying surface/Popover",
    "name": "size=lg, placement=bottom",
    "source": "export const LgBottom: Story = {\n  name: 'size=lg, placement=bottom',\n  args: { size: 'lg', placement: 'bottom' },\n};"
  },
  {
    "id": "components-overlaying-surface-popover--popover-component",
    "title": "Components/Overlaying surface/Popover",
    "name": "popover",
    "source": "export const PopoverComponent: Story = {\n  name: 'popover',\n  render: () => <div style={{ position: 'relative', width: 694, height: 1138 }}>...</div>,\n};"
  },
  {
    "id": "components-overlaying-surface-popover--without-footer",
    "title": "Components/Overlaying surface/Popover",
    "name": "Without footer",
    "source": "export const WithoutFooter: Story = {\n  name: 'Without footer',\n  args: { showFooter: false },\n};"
  },
  {
    "id": "components-overlaying-surface-popover--custom-content",
    "title": "Components/Overlaying surface/Popover",
    "name": "Custom content",
    "source": "export const CustomContent: Story = {\n  name: 'Custom content',\n  render: () => <Popover size=\"lg\" placement=\"bottom\">...</Popover>,\n};"
  },
  {
    "id": "components-loading-progressbar--small",
    "title": "Components/Loading/ProgressBar",
    "name": "Size - sm",
    "source": "<ProgressBar value={50} size=\"sm\" label=\"Label\" />"
  },
  {
    "id": "components-loading-progressbar--medium",
    "title": "Components/Loading/ProgressBar",
    "name": "Size - md",
    "source": "<ProgressBar value={50} size=\"md\" label=\"Label\" />"
  },
  {
    "id": "components-loading-progressbar--states",
    "title": "Components/Loading/ProgressBar",
    "name": "States",
    "source": "<ProgressBar value={50} state=\"normal\"  label=\"Normal\" />\n<ProgressBar value={50} state=\"info\"    label=\"Info\" />\n<ProgressBar value={50} state=\"success\" label=\"Success\" />\n<ProgressBar value={50} state=\"warning\" label=\"Warning\" />\n<ProgressBar value={50} state=\"error\"   label=\"Error\" />"
  },
  {
    "id": "components-loading-progressbar--no-label",
    "title": "Components/Loading/ProgressBar",
    "name": "No Label",
    "source": "<ProgressBar value={50} showLabel={false} />"
  },
  {
    "id": "components-loading-progressbar--no-value",
    "title": "Components/Loading/ProgressBar",
    "name": "No Value",
    "source": "<ProgressBar value={50} showValue={false} />"
  },
  {
    "id": "components-loading-progressbar--table-sizes",
    "title": "Components/Loading/ProgressBar",
    "name": "Data table - Sizes",
    "source": "<DataTableProgressBar value={50} size=\"xs\" showValue />\n<DataTableProgressBar value={50} size=\"sm\" showValue />\n<DataTableProgressBar value={50} size=\"md\" showValue />"
  },
  {
    "id": "components-loading-progressbar--table-with-number",
    "title": "Components/Loading/ProgressBar",
    "name": "Data table - With Number",
    "source": "<DataTableProgressBar value={50} size=\"xs\" showValue showNumber currentNumber=\"5\" totalNumber=\"10\" />\n<DataTableProgressBar value={50} size=\"sm\" showValue showNumber currentNumber=\"5\" totalNumber=\"10\" />\n<DataTableProgressBar value={50} size=\"md\" showValue showNumber currentNumber=\"5\" totalNumber=\"10\" />"
  },
  {
    "id": "components-loading-progressbar--table-values",
    "title": "Components/Loading/ProgressBar",
    "name": "Data table - Values",
    "source": "<DataTableProgressBar value={0}   size=\"xs\" showValue />\n<DataTableProgressBar value={25}  size=\"xs\" showValue />\n<DataTableProgressBar value={50}  size=\"xs\" showValue />\n<DataTableProgressBar value={75}  size=\"xs\" showValue />\n<DataTableProgressBar value={100} size=\"xs\" showValue />"
  },
  {
    "id": "components-controls-radio--default",
    "title": "Components/Controls/Radio",
    "name": "Default",
    "source": "export const Default: Story = {\n  name: 'Default',\n  args: { value: 'option1' },\n  render: (args) => (\n    <RadioGroup value={args.value} disabled={args.disabled}>\n      <Radio value=\"option1\" label=\"Option 1\" />\n      <Radio value=\"option2\" label=\"Option 2\" />\n      <Radio value=\"option3\" label=\"Option 3\" />\n    </RadioGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-radio--disabled",
    "title": "Components/Controls/Radio",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: { value: 'option1', disabled: true },\n  render: (args) => (\n    <RadioGroup value={args.value} disabled={args.disabled}>\n      <Radio value=\"option1\" label=\"Selected disabled\" />\n      <Radio value=\"option2\" label=\"Unselected disabled\" />\n    </RadioGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-radio--without-label",
    "title": "Components/Controls/Radio",
    "name": "Without Label",
    "source": "export const WithoutLabel: Story = {\n  name: 'Without Label',\n  args: { value: 'a' },\n  render: (args) => (\n    <RadioGroup value={args.value}>\n      <div className=\"flex items-center gap-4\">\n        <Radio value=\"a\" />\n        <Radio value=\"b\" />\n        <Radio value=\"c\" />\n      </div>\n    </RadioGroup>\n  ),\n};"
  },
  {
    "id": "components-controls-radio--interactive",
    "title": "Components/Controls/Radio",
    "name": "Interactive",
    "source": "export const Interactive: Story = {\n  name: 'Interactive',\n  args: { value: '' },\n  render: () => {\n    const [value, setValue] = useState('apple');\n    return (\n      <RadioGroup value={value} onChange={setValue}>\n        <Radio value=\"apple\" label=\"Apple\" />\n        <Radio value=\"banana\" label=\"Banana\" />\n        <Radio value=\"cherry\" label=\"Cherry\" />\n      </RadioGroup>\n    );\n  },\n};"
  },
  {
    "id": "components-controls-radio--all-variants",
    "title": "Components/Controls/Radio",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  args: { value: '' },\n  render: () => (\n    <div className=\"flex flex-col gap-6\">\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Enabled</p>\n        <RadioGroup value=\"selected\">\n          <Radio value=\"selected\" label=\"Selected\" />\n          <Radio value=\"unselected\" label=\"Unselected\" />\n        </RadioGroup>\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Disabled</p>\n        <RadioGroup value=\"selected\" disabled>\n          <Radio value=\"selected\" label=\"Selected disabled\" />\n          <Radio value=\"unselected\" label=\"Unselected disabled\" />\n        </RadioGroup>\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Without Label</p>\n        <RadioGroup value=\"a\">\n          <div className=\"flex items-center gap-4\">\n            <Radio value=\"a\" />\n            <Radio value=\"b\" />\n          </div>\n        </RadioGroup>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-feedback-sectionmessage--neutral",
    "title": "Components/Feedback/SectionMessage",
    "name": "Neutral",
    "source": "export const Neutral: Story = {\n  args: { status: 'neutral' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--info",
    "title": "Components/Feedback/SectionMessage",
    "name": "Info",
    "source": "export const Info: Story = {\n  args: { status: 'info' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--success",
    "title": "Components/Feedback/SectionMessage",
    "name": "Success",
    "source": "export const Success: Story = {\n  args: { status: 'success' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--warning",
    "title": "Components/Feedback/SectionMessage",
    "name": "Warning",
    "source": "export const Warning: Story = {\n  args: { status: 'warning' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--error",
    "title": "Components/Feedback/SectionMessage",
    "name": "Error",
    "source": "export const Error: Story = {\n  args: { status: 'error' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--brand-light",
    "title": "Components/Feedback/SectionMessage",
    "name": "Brand Light",
    "source": "export const BrandLight: Story = {\n  args: { status: 'brand-light' },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--without-actions",
    "title": "Components/Feedback/SectionMessage",
    "name": "Without Actions",
    "source": "export const WithoutActions: Story = {\n  args: {\n    status: 'info',\n    showLink: false,\n    showClose: false,\n  },\n};"
  },
  {
    "id": "components-feedback-sectionmessage--all-statuses",
    "title": "Components/Feedback/SectionMessage",
    "name": "All Statuses",
    "source": "export const AllStatuses: Story = {\n  render: () => (\n    <div className=\"inline-flex w-80 flex-col items-start gap-5 rounded-4 bg-surface-default p-5\">\n      {allStatuses.map((status) => (\n        <SectionMessage key={status} status={status} heading=\"Heading\" />\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-button-segmentedcontrol--default",
    "title": "Components/Button/SegmentedControl",
    "name": "Default (2 Segments)",
    "source": "export const Default: Story = {\n  name: 'Default (2 Segments)',\n  args: {\n    items: [{ label: 'Segment 1' }, { label: 'Segment 2' }],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol--three-segments",
    "title": "Components/Button/SegmentedControl",
    "name": "3 Segments",
    "source": "export const ThreeSegments: Story = {\n  name: '3 Segments',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol--four-segments",
    "title": "Components/Button/SegmentedControl",
    "name": "4 Segments",
    "source": "export const FourSegments: Story = {\n  name: '4 Segments',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n      { label: 'Segment 4' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol--disabled",
    "title": "Components/Button/SegmentedControl",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n    ],\n    selectedIndex: 0,\n    disabled: true,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol--all-variants",
    "title": "Components/Button/SegmentedControl",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"flex flex-col gap-6\">\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">2 Segments</p>\n        <SegmentedControl\n          items={[{ label: 'Active' }, { label: 'Inactive' }]}\n          selectedIndex={0}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">3 Segments</p>\n        <SegmentedControl\n          items={[\n            { label: 'Day' },\n            { label: 'Week' },\n            { label: 'Month' },\n          ]}\n          selectedIndex={1}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">4 Segments</p>\n        <SegmentedControl\n          items={[\n            { label: 'All' },\n            { label: 'Active' },\n            { label: 'Pending' },\n            { label: 'Archived' },\n          ]}\n          selectedIndex={2}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Disabled</p>\n        <SegmentedControl\n          items={[\n            { label: 'Segment 1' },\n            { label: 'Segment 2' },\n            { label: 'Segment 3' },\n          ]}\n          selectedIndex={0}\n          disabled\n        />\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-button-segmentedcontrol-solid--default",
    "title": "Components/Button/SegmentedControl Solid",
    "name": "Default (2 Segments)",
    "source": "export const Default: Story = {\n  name: 'Default (2 Segments)',\n  args: {\n    items: [{ label: 'Segment 1' }, { label: 'Segment 2' }],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol-solid--three-segments",
    "title": "Components/Button/SegmentedControl Solid",
    "name": "3 Segments",
    "source": "export const ThreeSegments: Story = {\n  name: '3 Segments',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol-solid--four-segments",
    "title": "Components/Button/SegmentedControl Solid",
    "name": "4 Segments",
    "source": "export const FourSegments: Story = {\n  name: '4 Segments',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n      { label: 'Segment 4' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol-solid--disabled",
    "title": "Components/Button/SegmentedControl Solid",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    items: [\n      { label: 'Segment 1' },\n      { label: 'Segment 2' },\n      { label: 'Segment 3' },\n    ],\n    selectedIndex: 0,\n    disabled: true,\n  },\n};"
  },
  {
    "id": "components-button-segmentedcontrol-solid--all-variants",
    "title": "Components/Button/SegmentedControl Solid",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"flex flex-col gap-6\">\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">2 Segments</p>\n        <SegmentedControl\n          type=\"solid\"\n          items={[{ label: 'Active' }, { label: 'Inactive' }]}\n          selectedIndex={0}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">3 Segments</p>\n        <SegmentedControl\n          type=\"solid\"\n          items={[\n            { label: 'Day' },\n            { label: 'Week' },\n            { label: 'Month' },\n          ]}\n          selectedIndex={1}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">4 Segments</p>\n        <SegmentedControl\n          type=\"solid\"\n          items={[\n            { label: 'All' },\n            { label: 'Active' },\n            { label: 'Pending' },\n            { label: 'Archived' },\n          ]}\n          selectedIndex={2}\n        />\n      </div>\n      <div>\n        <p className=\"mb-2 text-text-sm text-element-secondary\">Disabled</p>\n        <SegmentedControl\n          type=\"solid\"\n          items={[\n            { label: 'Segment 1' },\n            { label: 'Segment 2' },\n            { label: 'Segment 3' },\n          ]}\n          selectedIndex={0}\n          disabled\n        />\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--placeholder",
    "title": "Components/Select/Select",
    "name": "Single — Placeholder",
    "source": "export const Placeholder: Story = {\n  name: 'Single — Placeholder',\n  args: { label: 'Label', placeholder: 'placeholder' },\n};"
  },
  {
    "id": "components-select-select--done",
    "title": "Components/Select/Select",
    "name": "Single — Done",
    "source": "export const Done: Story = {\n  name: 'Single — Done',\n  args: { label: 'Label', defaultValue: 'opt1' },\n};"
  },
  {
    "id": "components-select-select--error",
    "title": "Components/Select/Select",
    "name": "Single — Error",
    "source": "export const Error: Story = {\n  name: 'Single — Error',\n  args: {\n    label: 'Label',\n    defaultValue: 'opt1',\n    state: 'error',\n    helperText: 'Helper text',\n  },\n};"
  },
  {
    "id": "components-select-select--disabled",
    "title": "Components/Select/Select",
    "name": "Single — Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Single — Disabled',\n  args: { label: 'Label', defaultValue: 'opt1', state: 'disabled' },\n};"
  },
  {
    "id": "components-select-select--readonly",
    "title": "Components/Select/Select",
    "name": "Single — Readonly",
    "source": "export const Readonly: Story = {\n  name: 'Single — Readonly',\n  args: { label: 'Label', defaultValue: 'opt1', state: 'readonly' },\n};"
  },
  {
    "id": "components-select-select--with-helper-text",
    "title": "Components/Select/Select",
    "name": "Single — With Helper Text",
    "source": "export const WithHelperText: Story = {\n  name: 'Single — With Helper Text',\n  args: { label: 'Label', helperText: 'Helper text' },\n};"
  },
  {
    "id": "components-select-select--required",
    "title": "Components/Select/Select",
    "name": "Single — Required",
    "source": "export const Required: Story = {\n  name: 'Single — Required',\n  args: { label: 'Label', required: true, placeholder: 'Select an option' },\n};"
  },
  {
    "id": "components-select-select--all-states",
    "title": "Components/Select/Select",
    "name": "All Single States",
    "source": "export const AllStates: Story = {\n  name: 'All Single States',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-6 rounded-[5px] bg-surface-default p-6\">\n      <div className=\"grid grid-cols-4 gap-4\">\n        {states.map((state) => (\n          <div key={state} className=\"flex flex-col\">\n            <span className=\"mb-3 text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n              {stateLabels[state]}\n            </span>\n            <Select\n              options={basicOptions}\n              label=\"Label\"\n              placeholder=\"placeholder\"\n              state={state}\n              helperText={state === 'error' ? 'Helper text' : undefined}\n            />\n          </div>\n        ))}\n      </div>\n      <div className=\"grid grid-cols-4 gap-4\">\n        {states.map((state) => (\n          <div key={state} className=\"flex flex-col\">\n            <span className=\"mb-3 text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n              {stateLabels[state]} (done)\n            </span>\n            <Select\n              options={basicOptions}\n              label=\"Label\"\n              defaultValue=\"opt1\"\n              state={state}\n              helperText={state === 'error' ? 'Helper text' : undefined}\n            />\n          </div>\n        ))}\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--multi-placeholder",
    "title": "Components/Select/Select",
    "name": "Multi — Placeholder",
    "source": "export const MultiPlaceholder: Story = {\n  name: 'Multi — Placeholder',\n  render: () => (\n    <div className=\"w-[360px]\">\n      <MultiSelect\n        options={basicOptions}\n        label=\"Label\"\n        placeholder=\"placeholder\"\n      />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--multi-done",
    "title": "Components/Select/Select",
    "name": "Multi — Done (chips)",
    "source": "export const MultiDone: Story = {\n  name: 'Multi — Done (chips)',\n  render: () => (\n    <div className=\"w-[360px]\">\n      <MultiSelect\n        options={basicOptions}\n        label=\"Label\"\n        defaultValue={['opt1', 'opt2', 'opt3']}\n      />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--multi-error",
    "title": "Components/Select/Select",
    "name": "Multi — Error",
    "source": "export const MultiError: Story = {\n  name: 'Multi — Error',\n  render: () => (\n    <div className=\"w-[360px]\">\n      <MultiSelect\n        options={basicOptions}\n        label=\"Label\"\n        defaultValue={['opt1', 'opt2']}\n        state=\"error\"\n        helperText=\"Helper text\"\n      />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--multi-disabled",
    "title": "Components/Select/Select",
    "name": "Multi — Disabled",
    "source": "export const MultiDisabled: Story = {\n  name: 'Multi — Disabled',\n  render: () => (\n    <div className=\"w-[360px]\">\n      <MultiSelect\n        options={basicOptions}\n        label=\"Label\"\n        defaultValue={['opt1', 'opt2', 'opt3']}\n        state=\"disabled\"\n      />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--all-multi-states",
    "title": "Components/Select/Select",
    "name": "All Multi States",
    "source": "export const AllMultiStates: Story = {\n  name: 'All Multi States',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-6 rounded-[5px] bg-surface-default p-6\">\n      {states.map((state) => (\n        <div key={state} className=\"flex flex-col gap-2\">\n          <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n            {stateLabels[state]}\n          </span>\n          <div className=\"grid grid-cols-2 gap-4\">\n            <MultiSelect\n              options={basicOptions}\n              label=\"Label\"\n              placeholder=\"placeholder\"\n              state={state}\n              helperText={state === 'error' ? 'Helper text' : undefined}\n            />\n            <MultiSelect\n              options={basicOptions}\n              label=\"Label\"\n              defaultValue={['opt1', 'opt2', 'opt3']}\n              state={state}\n              helperText={state === 'error' ? 'Helper text' : undefined}\n            />\n          </div>\n        </div>\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--with-long-options",
    "title": "Components/Select/Select",
    "name": "With Long Options",
    "source": "export const WithLongOptions: Story = {\n  name: 'With Long Options',\n  render: () => (\n    <div className=\"w-[240px]\">\n      <Select\n        options={countryOptions}\n        label=\"Country\"\n        placeholder=\"Select a country\"\n        helperText=\"Choose your country of residence\"\n      />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-select-select--sm-vs-md",
    "title": "Components/Select/Select",
    "name": "Size — sm vs md",
    "source": "export const SmVsMd: Story = {\n  name: 'Size — sm vs md',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-6 rounded-[5px] bg-surface-default p-6\">\n      <div className=\"grid grid-cols-2 gap-6\">\n        {sizes.map((size) => (\n          <div key={size} className=\"flex flex-col gap-2\">\n            <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n              {sizeHeightLabel[size]}\n            </span>\n            <Select options={basicOptions} label=\"Label\" placeholder=\"placeholder\" size={size} />\n          </div>\n        ))}\n      </div>\n      <div className=\"grid grid-cols-2 gap-6\">\n        {sizes.map((size) => (\n          <div key={size} className=\"flex flex-col gap-2\">\n            <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n              {sizeHeightLabel[size]} (done)\n            </span>\n            <Select options={basicOptions} label=\"Label\" defaultValue=\"opt1\" size={size} />\n          </div>\n        ))}\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-navigation-sidenavigation--expanded",
    "title": "Components/Navigation/SideNavigation",
    "name": "Expanded — submenu open",
    "source": "export const Expanded: Story = {\n  name: 'Expanded — submenu open',\n  args: {\n    profileName: 'SOLUM',\n    profileLogo: <SolumLogo />,\n    defaultActiveId: 'users-list',\n    defaultCollapsed: false,\n    items: sampleItems,\n  },\n};"
  },
  {
    "id": "components-navigation-sidenavigation--expanded-flat",
    "title": "Components/Navigation/SideNavigation",
    "name": "Expanded — flat items",
    "source": "export const ExpandedFlat: Story = {\n  name: 'Expanded — flat items',\n  args: {\n    profileName: 'SOLUM',\n    profileLogo: <SolumLogo />,\n    defaultActiveId: 'dashboard',\n    defaultCollapsed: false,\n    items: [\n      { id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 /> },\n      { id: 'company', label: 'Company management', icon: <IcHeadquarter /> },\n      { id: 'users', label: 'User management', icon: <IcUserProfile /> },\n      { id: 'data', label: 'Data management', icon: <IcPipeline /> },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-sidenavigation--collapsed",
    "title": "Components/Navigation/SideNavigation",
    "name": "Collapsed — icon only",
    "source": "export const Collapsed: Story = {\n  name: 'Collapsed — icon only',\n  args: {\n    profileName: 'SOLUM',\n    profileLogo: <SolumLogo />,\n    defaultActiveId: 'users-list',\n    defaultCollapsed: true,\n    items: sampleItems,\n  },\n};"
  },
  {
    "id": "components-navigation-sidenavigation--with-disabled",
    "title": "Components/Navigation/SideNavigation",
    "name": "With Disabled Items",
    "source": "export const WithDisabled: Story = {\n  name: 'With Disabled Items',\n  args: {\n    profileName: 'SOLUM',\n    profileLogo: <SolumLogo />,\n    defaultActiveId: 'dashboard',\n    defaultCollapsed: false,\n    items: [\n      { id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 /> },\n      { id: 'company', label: 'Company management', icon: <IcHeadquarter />, disabled: true },\n      {\n        id: 'users',\n        label: 'User management',\n        icon: <IcUserProfile />,\n        children: [\n          { id: 'users-list', label: 'Users' },\n          { id: 'si-partner', label: 'SI Partner', disabled: true },\n          { id: 'access-control', label: 'Access Control' },\n        ],\n      },\n      { id: 'data', label: 'Data management', icon: <IcPipeline />, disabled: true },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-sidenavigation--multiple-groups",
    "title": "Components/Navigation/SideNavigation",
    "name": "Multiple Groups",
    "source": "export const MultipleGroups: Story = {\n  name: 'Multiple Groups',\n  args: {\n    profileName: 'SOLUM',\n    profileLogo: <SolumLogo />,\n    defaultActiveId: 'data-ingestion',\n    defaultCollapsed: false,\n    items: sampleItems,\n  },\n};"
  },
  {
    "id": "components-loading-skeleton--items",
    "title": "Components/Loading/Skeleton",
    "name": "Items",
    "source": "<SkeletonItem type=\"bar\" className=\"w-[120px]\" />\n<SkeletonItem type=\"rectangle\" />\n<SkeletonItem type=\"circle\" />"
  },
  {
    "id": "components-loading-skeleton--card",
    "title": "Components/Loading/Skeleton",
    "name": "Variant - Card",
    "source": "<Skeleton variant=\"card\" />"
  },
  {
    "id": "components-loading-skeleton--text",
    "title": "Components/Loading/Skeleton",
    "name": "Variant - Text",
    "source": "<Skeleton variant=\"text\" />"
  },
  {
    "id": "components-loading-skeleton--list",
    "title": "Components/Loading/Skeleton",
    "name": "List",
    "source": "{Array.from({ length: 4 }).map((_, i) => (\n  <Skeleton key={i} variant=\"card\" />\n))}"
  },
  {
    "id": "components-loading-spinner--below-sm",
    "title": "Components/Loading/Spinner",
    "name": "Below / sm",
    "source": "<Spinner size=\"sm\" labelPosition=\"below\" />"
  },
  {
    "id": "components-loading-spinner--below-md",
    "title": "Components/Loading/Spinner",
    "name": "Below / md",
    "source": "<Spinner size=\"md\" labelPosition=\"below\" />"
  },
  {
    "id": "components-loading-spinner--below-lg",
    "title": "Components/Loading/Spinner",
    "name": "Below / lg",
    "source": "<Spinner size=\"lg\" labelPosition=\"below\" />"
  },
  {
    "id": "components-loading-spinner--right-sm",
    "title": "Components/Loading/Spinner",
    "name": "Right / sm",
    "source": "<Spinner size=\"sm\" labelPosition=\"right\" />"
  },
  {
    "id": "components-loading-spinner--right-md",
    "title": "Components/Loading/Spinner",
    "name": "Right / md",
    "source": "<Spinner size=\"md\" labelPosition=\"right\" />"
  },
  {
    "id": "components-loading-spinner--right-lg",
    "title": "Components/Loading/Spinner",
    "name": "Right / lg",
    "source": "<Spinner size=\"lg\" labelPosition=\"right\" />"
  },
  {
    "id": "components-loading-spinner--sizes",
    "title": "Components/Loading/Spinner",
    "name": "Sizes",
    "source": "<Spinner size=\"sm\" labelPosition=\"below\" />\n<Spinner size=\"md\" labelPosition=\"below\" />\n<Spinner size=\"lg\" labelPosition=\"below\" />"
  },
  {
    "id": "components-loading-spinner--inverse",
    "title": "Components/Loading/Spinner",
    "name": "Inverse",
    "source": "<Spinner size=\"sm\" labelPosition=\"below\" inverse />\n<Spinner size=\"md\" labelPosition=\"below\" inverse />\n<Spinner size=\"lg\" labelPosition=\"below\" inverse />"
  },
  {
    "id": "components-loading-spinner--no-label",
    "title": "Components/Loading/Spinner",
    "name": "No Label",
    "source": "<Spinner size=\"sm\" showLoaderText={false} />\n<Spinner size=\"md\" showLoaderText={false} />\n<Spinner size=\"lg\" showLoaderText={false} />"
  },
  {
    "id": "components-button-splitbutton--default",
    "title": "Components/Button/SplitButton",
    "name": "Default",
    "source": "export const Default: Story = {\n  name: 'Default',\n  args: {\n    label: 'Add',\n    showIcon: true,\n  },\n};"
  },
  {
    "id": "components-button-splitbutton--without-icon",
    "title": "Components/Button/SplitButton",
    "name": "Without Icon",
    "source": "export const WithoutIcon: Story = {\n  name: 'Without Icon',\n  args: {\n    label: 'Action',\n    showIcon: false,\n  },\n};"
  },
  {
    "id": "components-button-splitbutton--trigger-open",
    "title": "Components/Button/SplitButton",
    "name": "Trigger Open",
    "source": "export const TriggerOpen: Story = {\n  name: 'Trigger Open',\n  args: {\n    label: 'Add',\n    showIcon: true,\n    triggerOpen: true,\n  },\n};"
  },
  {
    "id": "components-button-splitbutton--disabled",
    "title": "Components/Button/SplitButton",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    label: 'Add',\n    showIcon: true,\n    disabled: true,\n  },\n};"
  },
  {
    "id": "components-button-splitbutton--all-variants",
    "title": "Components/Button/SplitButton",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"flex flex-col gap-4\">\n      <SplitButton label=\"Add\" showIcon />\n      <SplitButton label=\"Action\" showIcon={false} />\n      <SplitButton label=\"Add\" showIcon triggerOpen />\n      <SplitButton label=\"Add\" showIcon disabled />\n    </div>\n  ),\n};"
  },
  {
    "id": "components-structured-list-structuredlist--vertical",
    "title": "Components/Structured list/StructuredList",
    "name": "Vertical",
    "source": "export const Vertical: Story = {\n  args: { header: 'Header', orientation: 'vertical', rows: verticalRows, showDivider: true },\n};"
  },
  {
    "id": "components-structured-list-structuredlist--vertical-no-divider",
    "title": "Components/Structured list/StructuredList",
    "name": "Vertical No Divider",
    "source": "export const VerticalNoDivider: Story = {\n  args: { header: 'Header', orientation: 'vertical', rows: verticalRows, showDivider: false },\n};"
  },
  {
    "id": "components-structured-list-structuredlist--horizontal",
    "title": "Components/Structured list/StructuredList",
    "name": "Horizontal",
    "source": "export const Horizontal: Story = {\n  args: { header: 'Header', orientation: 'horizontal', columns: horizontalColumns, rows: horizontalRows, showDivider: true },\n};"
  },
  {
    "id": "components-structured-list-structuredlist--horizontal-no-divider",
    "title": "Components/Structured list/StructuredList",
    "name": "Horizontal No Divider",
    "source": "export const HorizontalNoDivider: Story = {\n  args: { header: 'Header', orientation: 'horizontal', columns: horizontalColumns, rows: horizontalRows, showDivider: false },\n};"
  },
  {
    "id": "components-structured-list-structuredlistcell--default",
    "title": "Components/Structured list/StructuredListCell",
    "name": "Default",
    "source": "export const Default: Story = {};"
  },
  {
    "id": "components-structured-list-structuredlistcell--small-left",
    "title": "Components/Structured list/StructuredListCell",
    "name": "Small Left",
    "source": "export const SmallLeft: Story = {\n  args: { size: 'sm', align: 'left', text: 'Small Left' },\n};"
  },
  {
    "id": "components-structured-list-structuredlistcell--medium-center",
    "title": "Components/Structured list/StructuredListCell",
    "name": "Medium Center",
    "source": "export const MediumCenter: Story = {\n  args: { size: 'md', align: 'center', text: 'Medium Center' },\n};"
  },
  {
    "id": "components-structured-list-structuredlistcell--large-right",
    "title": "Components/Structured list/StructuredListCell",
    "name": "Large Right",
    "source": "export const LargeRight: Story = {\n  args: { size: 'lg', align: 'right', text: 'Large Right' },\n};"
  },
  {
    "id": "components-structured-list-structuredlistcell--all-variants",
    "title": "Components/Structured list/StructuredListCell",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  render: () => (\n    <div className=\"flex flex-col gap-6 p-4\">\n      {/* Column headers */}\n      <div className=\"grid grid-cols-[80px_1fr_1fr_1fr] gap-4\">\n        <div />\n        {aligns.map((a) => (\n          <div key={a} className=\"text-xs font-semibold text-gray-500 uppercase text-center\">\n            {alignLabels[a]}\n          </div>\n        ))}\n      </div>\n\n      {/* Rows per size */}\n      {sizes.map((s) => (\n        <div key={s} className=\"grid grid-cols-[80px_1fr_1fr_1fr] gap-4 items-center\">\n          {/* Row label */}\n          <div className=\"text-xs font-semibold text-gray-500 uppercase\">\n            {sizeLabels[s]}\n          </div>\n\n          {/* Cells */}\n          {aligns.map((a) => (\n            <div\n              key={`${s}-${a}`}\n              className=\"border border-gray-200 rounded-md bg-white p-2 flex flex-col gap-1\"\n            >\n              <span className=\"text-[10px] text-gray-400 font-mono\">\n                {sizeLabels[s]} / {alignLabels[a]}\n              </span>\n              <StructuredListCell size={s} align={a} text=\"Sample Text\" />\n            </div>\n          ))}\n        </div>\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-controls-switch--default",
    "title": "Components/Controls/Switch",
    "name": "Default (Checked)",
    "source": "export const Default: Story = {\n  name: 'Default (Checked)',\n  args: {\n    checked: true,\n    size: 'md',\n    label: 'Switch label',\n  },\n};"
  },
  {
    "id": "components-controls-switch--unchecked",
    "title": "Components/Controls/Switch",
    "name": "Unchecked",
    "source": "export const Unchecked: Story = {\n  name: 'Unchecked',\n  args: {\n    checked: false,\n    size: 'md',\n    label: 'Switch label',\n  },\n};"
  },
  {
    "id": "components-controls-switch--with-icon",
    "title": "Components/Controls/Switch",
    "name": "With Icon (md)",
    "source": "export const WithIcon: Story = {\n  name: 'With Icon (md)',\n  args: {\n    checked: true,\n    size: 'md',\n    showIcon: true,\n    label: 'With icon',\n  },\n};"
  },
  {
    "id": "components-controls-switch--small-size",
    "title": "Components/Controls/Switch",
    "name": "Small Size",
    "source": "export const SmallSize: Story = {\n  name: 'Small Size',\n  args: {\n    checked: true,\n    size: 'sm',\n    label: 'Small switch',\n  },\n};"
  },
  {
    "id": "components-controls-switch--disabled",
    "title": "Components/Controls/Switch",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: {\n    checked: true,\n    disabled: true,\n    size: 'md',\n    label: 'Disabled checked',\n  },\n};"
  },
  {
    "id": "components-controls-switch--read-only",
    "title": "Components/Controls/Switch",
    "name": "Read Only",
    "source": "export const ReadOnly: Story = {\n  name: 'Read Only',\n  args: {\n    checked: true,\n    readOnly: true,\n    size: 'md',\n    label: 'Read only',\n  },\n};"
  },
  {
    "id": "components-controls-switch--interactive",
    "title": "Components/Controls/Switch",
    "name": "Interactive",
    "source": "export const Interactive: Story = {\n  name: 'Interactive',\n  args: { label: '' },\n  render: () => {\n    const [checked, setChecked] = useState(false);\n    return (\n      <Switch\n        checked={checked}\n        onChange={setChecked}\n        size=\"md\"\n        showIcon\n        label={checked ? 'Active' : 'Inactive'}\n      />\n    );\n  },\n};"
  },
  {
    "id": "components-controls-switch--all-variants",
    "title": "Components/Controls/Switch",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  args: { label: '' },\n  render: () => (\n    <div className=\"flex flex-col gap-6\">\n      {/* Size: md */}\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: md — Enabled</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} size=\"md\" label=\"Off\" />\n          <Switch checked size=\"md\" label=\"On\" />\n          <Switch checked={false} size=\"md\" showIcon label=\"Off (icon)\" />\n          <Switch checked size=\"md\" showIcon label=\"On (icon)\" />\n        </div>\n      </div>\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: md — Disabled</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} disabled size=\"md\" label=\"Off\" />\n          <Switch checked disabled size=\"md\" label=\"On\" />\n        </div>\n      </div>\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: md — Read Only</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} readOnly size=\"md\" label=\"Off\" />\n          <Switch checked readOnly size=\"md\" label=\"On\" />\n        </div>\n      </div>\n\n      {/* Size: sm */}\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: sm — Enabled</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} size=\"sm\" label=\"Off\" />\n          <Switch checked size=\"sm\" label=\"On\" />\n        </div>\n      </div>\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: sm — Disabled</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} disabled size=\"sm\" label=\"Off\" />\n          <Switch checked disabled size=\"sm\" label=\"On\" />\n        </div>\n      </div>\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Size: sm — Read Only</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} readOnly size=\"sm\" label=\"Off\" />\n          <Switch checked readOnly size=\"sm\" label=\"On\" />\n        </div>\n      </div>\n\n      {/* Without Label */}\n      <div>\n        <p className=\"mb-3 text-text-sm text-element-secondary\">Without Label</p>\n        <div className=\"flex items-center gap-6\">\n          <Switch checked={false} size=\"md\" />\n          <Switch checked size=\"md\" />\n          <Switch checked={false} size=\"sm\" />\n          <Switch checked size=\"sm\" />\n        </div>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-navigation-tabs--size-md",
    "title": "Components/Navigation/Tabs",
    "name": "Size - md (48px)",
    "source": "export const SizeMd: Story = {\n  name: 'Size - md (48px)',\n  args: {\n    size: 'md',\n    defaultIndex: 0,\n    items: [\n      { label: 'Tab 1' },\n      { label: 'Tab 2' },\n      { label: 'Tab 3' },\n      { label: 'Tab 4' },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--size-sm",
    "title": "Components/Navigation/Tabs",
    "name": "Size - sm (40px)",
    "source": "export const SizeSm: Story = {\n  name: 'Size - sm (40px)',\n  args: {\n    size: 'sm',\n    defaultIndex: 0,\n    items: [\n      { label: 'Tab 1' },\n      { label: 'Tab 2' },\n      { label: 'Tab 3' },\n      { label: 'Tab 4' },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--with-disabled",
    "title": "Components/Navigation/Tabs",
    "name": "With Disabled",
    "source": "export const WithDisabled: Story = {\n  name: 'With Disabled',\n  args: {\n    size: 'md',\n    defaultIndex: 0,\n    items: [\n      { label: 'Tab 1' },\n      { label: 'Tab 2' },\n      { label: 'Tab 3', disabled: true },\n      { label: 'Tab 4', disabled: true },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--disabled-selected",
    "title": "Components/Navigation/Tabs",
    "name": "Disabled + Selected (indicator: fill-disabled)",
    "source": "export const DisabledSelected: Story = {\n  name: 'Disabled + Selected (indicator: fill-disabled)',\n  args: {\n    size: 'md',\n    defaultIndex: 1,\n    items: [\n      { label: 'Tab 1' },\n      { label: 'Tab 2', disabled: true },\n      { label: 'Tab 3' },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--with-badge",
    "title": "Components/Navigation/Tabs",
    "name": "With Badge",
    "source": "export const WithBadge: Story = {\n  name: 'With Badge',\n  args: {\n    size: 'md',\n    defaultIndex: 0,\n    items: [\n      { label: 'All',     badge: 12 },\n      { label: 'Active',  badge: 5 },\n      { label: 'Pending', badge: 3 },\n      { label: 'Closed',  badge: 0 },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--with-dot",
    "title": "Components/Navigation/Tabs",
    "name": "With Dot (notification)",
    "source": "export const WithDot: Story = {\n  name: 'With Dot (notification)',\n  args: {\n    size: 'md',\n    defaultIndex: 0,\n    items: [\n      { label: 'Inbox',    dot: true },\n      { label: 'Sent' },\n      { label: 'Drafts',   dot: true },\n      { label: 'Archive' },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--mixed",
    "title": "Components/Navigation/Tabs",
    "name": "Mixed (badge + dot + disabled)",
    "source": "export const Mixed: Story = {\n  name: 'Mixed (badge + dot + disabled)',\n  args: {\n    size: 'md',\n    defaultIndex: 1,\n    items: [\n      { label: 'Overview' },\n      { label: 'Issues',   badge: 8, dot: true },\n      { label: 'Reports',  badge: 2 },\n      { label: 'Settings', disabled: true },\n    ],\n  },\n};"
  },
  {
    "id": "components-navigation-tabs--sm-with-badge",
    "title": "Components/Navigation/Tabs",
    "name": "sm + Badge",
    "source": "export const SmWithBadge: Story = {\n  name: 'sm + Badge',\n  args: {\n    size: 'sm',\n    defaultIndex: 0,\n    items: [\n      { label: 'All',    badge: 12 },\n      { label: 'Active', badge: 5 },\n      { label: 'Closed', badge: 0, disabled: true },\n    ],\n  },\n};"
  },
  {
    "id": "components-input-texthelper--default",
    "title": "Components/Input/TextHelper",
    "name": "default",
    "source": "export const Default: Story = {\n  name: 'default',\n  args: { type: 'enabled' },\n};"
  },
  {
    "id": "components-input-texthelper--error",
    "title": "Components/Input/TextHelper",
    "name": "error",
    "source": "export const Error: Story = {\n  name: 'error',\n  args: { type: 'error' },\n};"
  },
  {
    "id": "components-input-texthelper--all-variants",
    "title": "Components/Input/TextHelper",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-2 rounded-[5px] bg-surface-default p-6\">\n      {(['enabled', 'error'] as const).map((type) => (\n        <div key={type} className=\"flex flex-col\">\n          <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n            {type}\n          </span>\n          <TextHelper helperText=\"Helper text\" type={type} />\n        </div>\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-input-textlabel--md",
    "title": "Components/Input/TextLabel",
    "name": "md",
    "source": "export const Md: Story = {\n  name: 'md',\n  args: { size: 'md' },\n};"
  },
  {
    "id": "components-input-textlabel--md-required",
    "title": "Components/Input/TextLabel",
    "name": "md — Required",
    "source": "export const MdRequired: Story = {\n  name: 'md — Required',\n  args: { size: 'md', required: true },\n};"
  },
  {
    "id": "components-input-textlabel--sm",
    "title": "Components/Input/TextLabel",
    "name": "sm",
    "source": "export const Sm: Story = {\n  name: 'sm',\n  args: { size: 'sm' },\n};"
  },
  {
    "id": "components-input-textlabel--sm-required",
    "title": "Components/Input/TextLabel",
    "name": "sm — Required",
    "source": "export const SmRequired: Story = {\n  name: 'sm — Required',\n  args: { size: 'sm', required: true },\n};"
  },
  {
    "id": "components-input-textlabel--all-variants",
    "title": "Components/Input/TextLabel",
    "name": "All Variants",
    "source": "export const AllVariants: Story = {\n  name: 'All Variants',\n  render: () => (\n    <div className=\"inline-flex flex-col gap-8 rounded-[5px] bg-surface-default p-6\">\n      {(['md', 'sm'] as const).map((size) => (\n        <div key={size} className=\"flex flex-col gap-4\">\n          <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary uppercase tracking-wide\">\n            {size}\n          </span>\n          <div className=\"flex gap-10\">\n            <div className=\"flex flex-col gap-1\">\n              <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary\">default</span>\n              <TextLabel label=\"Label\" size={size} />\n            </div>\n            <div className=\"flex flex-col gap-1\">\n              <span className=\"text-text-xs leading-text-xs font-regular text-element-quaternary\">required</span>\n              <TextLabel label=\"Label\" size={size} required />\n            </div>\n          </div>\n        </div>\n      ))}\n    </div>\n  ),\n};"
  },
  {
    "id": "components-input-textarea--default",
    "title": "Components/Textarea",
    "name": "Default",
    "source": "export const Default: Story = {\n  render: (args) => <Textarea {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-input-textarea--with-label",
    "title": "Components/Textarea",
    "name": "With label",
    "source": "export const WithLabel: Story = {\n  name: 'With label',\n  render: (args) => (\n    <Textarea {...args} label=\"Label\" className=\"w-80\" />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--with-label-and-helper",
    "title": "Components/Textarea",
    "name": "With label & helper text",
    "source": "export const WithLabelAndHelper: Story = {\n  name: 'With label & helper text',\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--with-counter",
    "title": "Components/Textarea",
    "name": "With counter",
    "source": "export const WithCounter: Story = {\n  name: 'With counter',\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      showCounter\n      maxLength={100}\n      defaultValue=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--with-action-button",
    "title": "Components/Textarea",
    "name": "With action button",
    "source": "export const WithActionButton: Story = {\n  name: 'With action button',\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      showCounter\n      maxLength={100}\n      actionLabel=\"label\"\n      defaultValue=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--required",
    "title": "Components/Textarea",
    "name": "Required",
    "source": "export const Required: Story = {\n  name: 'Required',\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      required\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--error-state",
    "title": "Components/Textarea",
    "name": "Error",
    "source": "export const ErrorState: Story = {\n  name: 'Error',\n  args: { state: 'error' },\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Error message\"\n      defaultValue=\"Invalid input\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--disabled",
    "title": "Components/Textarea",
    "name": "Disabled",
    "source": "export const Disabled: Story = {\n  name: 'Disabled',\n  args: { state: 'disabled' },\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      defaultValue=\"Disabled content\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--readonly",
    "title": "Components/Textarea",
    "name": "Readonly",
    "source": "export const Readonly: Story = {\n  name: 'Readonly',\n  args: { state: 'readonly' },\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      defaultValue=\"Read-only content\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--no-resize",
    "title": "Components/Textarea",
    "name": "No resize",
    "source": "export const NoResize: Story = {\n  name: 'No resize',\n  args: { showResize: false },\n  render: (args) => (\n    <Textarea\n      {...args}\n      label=\"Label\"\n      helperText=\"Helper text\"\n      className=\"w-80\"\n    />\n  ),\n};"
  },
  {
    "id": "components-input-textarea--all-states",
    "title": "Components/Textarea",
    "name": "All states",
    "source": "export const AllStates: Story = {\n  name: 'All states',\n  render: () => (\n    <div className=\"flex flex-col gap-8 rounded-4 bg-surface-default p-6\">\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Default · Placeholder\n        </p>\n        <Textarea\n          label=\"Label\"\n          helperText=\"Helper text\"\n          showCounter\n          maxLength={100}\n          className=\"w-80\"\n        />\n      </div>\n\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Default · Filled with action\n        </p>\n        <Textarea\n          label=\"Label\"\n          helperText=\"Helper text\"\n          showCounter\n          maxLength={100}\n          actionLabel=\"label\"\n          defaultValue=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"\n          className=\"w-80\"\n        />\n      </div>\n\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Error\n        </p>\n        <Textarea\n          label=\"Label\"\n          helperText=\"Error message\"\n          state=\"error\"\n          showCounter\n          maxLength={100}\n          defaultValue=\"Invalid input\"\n          className=\"w-80\"\n        />\n      </div>\n\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Disabled\n        </p>\n        <Textarea\n          label=\"Label\"\n          helperText=\"Helper text\"\n          state=\"disabled\"\n          showCounter\n          maxLength={100}\n          defaultValue=\"Disabled content\"\n          className=\"w-80\"\n        />\n      </div>\n\n      <div>\n        <p className=\"mb-3 text-text-xs font-semibold uppercase text-element-tertiary\">\n          Readonly\n        </p>\n        <Textarea\n          label=\"Label\"\n          helperText=\"Helper text\"\n          state=\"readonly\"\n          defaultValue=\"Read-only content\"\n          className=\"w-80\"\n        />\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-feedback-toastmessage--default",
    "title": "Components/Feedback/ToastMessage",
    "name": "Default",
    "source": "export const Default: Story = {\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--success",
    "title": "Components/Feedback/ToastMessage",
    "name": "Success",
    "source": "export const Success: Story = {\n  name: 'Success',\n  args: { status: 'success' },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--warning",
    "title": "Components/Feedback/ToastMessage",
    "name": "Warning",
    "source": "export const Warning: Story = {\n  name: 'Warning',\n  args: { status: 'warning' },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--error",
    "title": "Components/Feedback/ToastMessage",
    "name": "Error",
    "source": "export const Error: Story = {\n  name: 'Error',\n  args: { status: 'error' },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--info",
    "title": "Components/Feedback/ToastMessage",
    "name": "Info",
    "source": "export const Info: Story = {\n  name: 'Info',\n  args: { status: 'info' },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--default-status",
    "title": "Components/Feedback/ToastMessage",
    "name": "Default (no icon)",
    "source": "export const DefaultStatus: Story = {\n  name: 'Default (no icon)',\n  args: { status: 'default' },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--inverse",
    "title": "Components/Feedback/ToastMessage",
    "name": "Inverse",
    "source": "export const Inverse: Story = {\n  name: 'Inverse',\n  args: { status: 'success', inverse: true },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--without-description",
    "title": "Components/Feedback/ToastMessage",
    "name": "Without description",
    "source": "export const WithoutDescription: Story = {\n  name: 'Without description',\n  args: { showDescription: false },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--without-action",
    "title": "Components/Feedback/ToastMessage",
    "name": "Without action",
    "source": "export const WithoutAction: Story = {\n  name: 'Without action',\n  args: { showAction: false },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--without-close",
    "title": "Components/Feedback/ToastMessage",
    "name": "Without close",
    "source": "export const WithoutClose: Story = {\n  name: 'Without close',\n  args: { showClose: false },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--title-only",
    "title": "Components/Feedback/ToastMessage",
    "name": "Title only",
    "source": "export const TitleOnly: Story = {\n  name: 'Title only',\n  args: { showDescription: false, showAction: false },\n  render: (args) => <ToastMessage {...args} className=\"w-80\" />,\n};"
  },
  {
    "id": "components-feedback-toastmessage--all-variants",
    "title": "Components/Feedback/ToastMessage",
    "name": "All variants",
    "source": "export const AllVariants: Story = {\n  name: 'All variants',\n  render: () => (\n    <div className=\"flex flex-col gap-10 p-6\">\n      <div>\n        <p className=\"mb-4 text-text-xs font-semibold uppercase tracking-wide text-element-tertiary\">\n          Light\n        </p>\n        <div className=\"flex flex-wrap gap-4\">\n          {statuses.map((s) => (\n            <ToastMessage key={s} status={s} className=\"w-60\" />\n          ))}\n        </div>\n      </div>\n\n      <div>\n        <p className=\"mb-4 text-text-xs font-semibold uppercase tracking-wide text-element-tertiary\">\n          Inverse\n        </p>\n        <div className=\"flex flex-wrap gap-4\">\n          {statuses.map((s) => (\n            <ToastMessage key={s} status={s} inverse className=\"w-60\" />\n          ))}\n        </div>\n      </div>\n    </div>\n  ),\n};"
  },
  {
    "id": "components-button-togglebuttongroup--default",
    "title": "Components/Button/ToggleButtonGroup",
    "name": "Default",
    "source": "export const Default: Story = {\n  name: 'Default',\n  args: {\n    items: [\n      { label: 'All', showChevron: true },\n      { label: 'Active' },\n      { label: 'Inactive' },\n      { label: 'Pending' },\n      { label: 'Archived' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-togglebuttongroup--with-badge",
    "title": "Components/Button/ToggleButtonGroup",
    "name": "With Badge",
    "source": "export const WithBadge: Story = {\n  name: 'With Badge',\n  args: {\n    items: [\n      { label: 'All', badge: 12, showChevron: true },\n      { label: 'Active', badge: 5 },\n      { label: 'Inactive', badge: 3 },\n      { label: 'Pending' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-togglebuttongroup--no-chevron",
    "title": "Components/Button/ToggleButtonGroup",
    "name": "No Chevron",
    "source": "export const NoChevron: Story = {\n  name: 'No Chevron',\n  args: {\n    items: [\n      { label: 'Tab 1' },\n      { label: 'Tab 2' },\n      { label: 'Tab 3' },\n    ],\n    selectedIndex: 0,\n  },\n};"
  },
  {
    "id": "components-button-togglebuttongroup--many-items",
    "title": "Components/Button/ToggleButtonGroup",
    "name": "Many Items",
    "source": "export const ManyItems: Story = {\n  name: 'Many Items',\n  args: {\n    items: [\n      { label: 'All' },\n      { label: 'Design' },\n      { label: 'Development' },\n      { label: 'Marketing' },\n      { label: 'Sales' },\n      { label: 'Support' },\n    ],\n    selectedIndex: 2,\n  },\n};"
  }
];

const storybookStoryMap = new Map(storybookStories.map((story) => [story.id, story]));

export function getStorybookStory(storyId: string): StorybookStory | undefined {
  return storybookStoryMap.get(storyId);
}
