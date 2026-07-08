import type { Meta, StoryObj, Decorator } from '@storybook/react';
import Button, { getBtnClassNames } from '../components/Button/BtnIcon';
import type { BtnType, BtnSize, BtnStyleType, BtnState } from '../components/Button/BtnIcon';

const interactiveSurfaceClass =
  '[&>button]:overflow-hidden [&>button>span:last-child]:inset-0 [&>button>span:last-child]:!rounded-2';
const ghostLinkCompactClass =
  '[&>button]:p-0.5 [&>button]:h-auto [&>button]:min-h-0';
const focusedRingClass =
  '[&>button]:shadow-focus-button-ring';
const linkFocusedRingClass =
  '[&>button]:outline [&>button]:outline-offset-0 [&>button]:outline-[length:var(--sol-focus-ring-link-outline-width)] [&>button]:outline-[color:var(--sol-focus-ring-link-outline-color)]';

function buttonStoryFrameClass(styleType?: BtnStyleType, state?: BtnState): string {
  return [
    interactiveSurfaceClass,
    styleType === 'ghost' || styleType === 'link' ? ghostLinkCompactClass : '',
    state === 'focused'
      ? styleType === 'link'
        ? linkFocusedRingClass
        : focusedRingClass
      : '',
  ].filter(Boolean).join(' ');
}

// ── Helper: build the "source" code block shown in Storybook Docs ──────────

function buildSourceCode(
  props: {
    type?:         BtnType;
    size?:         BtnSize;
    styleType?:    BtnStyleType;
    state?:        BtnState;
    label?:        string;
    showLabel?:    boolean;
    showLeftIcon?: boolean;
    showRightIcon?:boolean;
    showLoading?:  boolean;
  },
  options: { includeStoryFrame?: boolean } = {},
): string {
  const {
    type      = 'primary',
    size      = 'lg',
    styleType = 'solid',
    state     = 'enabled',
    label     = 'Label',
    showLabel    = true,
    showLeftIcon = true,
    showRightIcon = false,
    showLoading  = false,
  } = props;

  const className = getBtnClassNames(type, size, styleType, state);
  const frameClassName = options.includeStoryFrame
    ? buttonStoryFrameClass(styleType, state)
    : '';

  const jsxProps = [
    `type="${type}"`,
    `styleType="${styleType}"`,
    `size="${size}"`,
    state !== 'enabled' ? `state="${state}"` : '',
    `label="${label}"`,
    !showLabel    ? 'showLabel={false}'    : '',
    !showLeftIcon ? 'showLeftIcon={false}' : '',
    showRightIcon ? 'showRightIcon'        : '',
    showLoading   ? 'showLoading'          : '',
  ].filter(Boolean).join('\n  ');
  const componentUsage = `<Button
  ${jsxProps}
/>`;
  const usage = frameClassName
    ? `<div className="${frameClassName}">
  ${componentUsage.split('\n').join('\n  ')}
</div>`
    : componentUsage;

  return `// ① Component usage
${usage}

// ② Rendered <button> className
// ${className}${frameClassName ? `\n\n// ③ Story frame className\n// ${frameClassName}` : ''}`;
}

// ── Meta ───────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Button/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type:          { control: 'select',   options: ['primary', 'secondary', 'tertiary', 'white'],                      description: 'Visual type' },
    size:          { control: 'select',   options: ['sm', 'md', 'lg'],                                                description: 'Button size' },
    styleType:     { control: 'select',   options: ['solid', 'outline', 'ghost', 'link', 'danger', 'text'],          description: 'Fill style' },
    state:         { control: 'select',   options: ['enabled', 'hover', 'focused', 'pressed', 'disabled', 'loading'], description: 'Forced interaction state' },
    label:         { control: 'text',                                                                                  description: 'Button label' },
    showLabel:     { control: 'boolean',  description: 'Show label text' },
    showLeftIcon:  { control: 'boolean',  description: 'Show icon on the left' },
    showRightIcon: { control: 'boolean',  description: 'Show icon on the right' },
    showLoading:   { control: 'boolean',  description: 'Show loading spinner' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Factory ────────────────────────────────────────────────────────────────

function makeStory(args: Story['args'], options: { includeStoryFrame?: boolean } = {}): Story {
  return {
    args,
    parameters: {
      docs: {
        source: {
          code: buildSourceCode(args ?? {}, options),
          language: 'tsx',
        },
      },
    },
  };
}

// Canvas background for inverse (white-type) stories
const inverseCanvas: Decorator = (Story) => (
  <div className="flex min-h-[240px] w-full items-center p-6 bg-black/80">
    <Story />
  </div>
);

function renderButtonStory(args: Story['args']) {
  return (
    <div className={buttonStoryFrameClass(args?.styleType, args?.state)}>
      <Button {...(args as any)} />
    </div>
  );
}

// ── Stories ────────────────────────────────────────────────────────────────

export const PrimarySolid: Story = {
  name: 'Primary',
  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Primary', showLeftIcon: false }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const OutlinedButton: Story = {
  name: 'Secondary',
  ...makeStory({ type: 'secondary', styleType: 'outline', size: 'lg', label: 'Secondary', showLeftIcon: false }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const Tertiary: Story = {
  name: 'Tertiary',
  ...makeStory({
    type: 'tertiary',
    styleType: 'solid',
    size: 'lg',
    state: 'enabled',
    label: 'Tertiary',
    showLabel: true,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: false,
  }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const PrimaryGhost: Story = {
  name: 'Ghost Primary',
  ...makeStory({ type: 'primary', styleType: 'ghost', size: 'lg', label: 'Ghost Primary', showLeftIcon: false }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const GhostSecondary: Story = {
  name: 'Ghost Secondary',
  ...makeStory({
    type: 'secondary',
    styleType: 'ghost',
    size: 'lg',
    state: 'enabled',
    label: 'Ghost Secondary',
    showLabel: true,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: false,
  }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const GhostInverse: Story = {
  name: 'Ghost Inverse',
  decorators: [inverseCanvas],
  ...makeStory({
    type: 'white',
    styleType: 'ghost',
    size: 'lg',
    state: 'enabled',
    label: 'Ghost Inverse',
    showLabel: true,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: false,
  }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const Link: Story = {
  name: 'Link Primary',
  ...makeStory({ type: 'primary', styleType: 'link', size: 'lg', label: 'Link Primary', showLeftIcon: false }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const LinkInverse: Story = {
  name: 'Link Inverse',
  decorators: [inverseCanvas],
  ...makeStory({
    type: 'white',
    styleType: 'link',
    size: 'lg',
    state: 'enabled',
    label: 'Link Inverse',
    showLabel: true,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: false,
  }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const Danger: Story = {
  name: 'Danger',
  ...makeStory({
    type: 'primary',
    styleType: 'danger',
    size: 'lg',
    state: 'enabled',
    label: 'Danger',
    showLabel: true,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: false,
  }, { includeStoryFrame: true }),
  render: renderButtonStory,
};

export const Loading: Story = {
  name: 'Loading',
  ...makeStory({
    type: 'primary',
    styleType: 'solid',
    size: 'lg',
    state: 'enabled',
    label: 'label',
    showLabel: false,
    showLeftIcon: false,
    showRightIcon: false,
    showLoading: true,
  }),
};

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <Button
        type="primary"
        styleType="solid"
        size="sm"
        state="enabled"
        label="Small"
        showLabel
        showLeftIcon={false}
        showRightIcon={false}
        showLoading={false}
      />
      <Button
        type="primary"
        styleType="solid"
        size="md"
        state="enabled"
        label="Medium"
        showLabel
        showLeftIcon={false}
        showRightIcon={false}
        showLoading={false}
      />
      <Button
        type="primary"
        styleType="solid"
        size="lg"
        state="enabled"
        label="Large"
        showLabel
        showLeftIcon={false}
        showRightIcon={false}
        showLoading={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// ① Component usage
<div className="flex items-center gap-4">
  <Button type="primary" styleType="solid" size="sm" state="enabled" label="Small" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />
  <Button type="primary" styleType="solid" size="md" state="enabled" label="Medium" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />
  <Button type="primary" styleType="solid" size="lg" state="enabled" label="Large" showLabel showLeftIcon={false} showRightIcon={false} showLoading={false} />
</div>`,
        language: 'tsx',
      },
    },
  },
};

export const State: Story = {
  name: 'State',
  render: () => {
    const states: Array<{ label: string; state: BtnState }> = [
      { label: 'Hover', state: 'hover' },
      { label: 'Pressed', state: 'pressed' },
      { label: 'Focused', state: 'focused' },
      { label: 'Disabled', state: 'disabled' },
    ];
    const rows: Array<{ label: string; type: BtnType; styleType: BtnStyleType; inverse?: boolean; showLeftIcon?: boolean }> = [
      { label: 'Primary', type: 'primary', styleType: 'solid' },
      { label: 'Secondary', type: 'secondary', styleType: 'outline' },
      { label: 'Tertiary', type: 'tertiary', styleType: 'solid' },
      { label: 'Ghost Primary', type: 'primary', styleType: 'ghost' },
      { label: 'Ghost Secondary', type: 'secondary', styleType: 'ghost' },
      { label: 'Ghost Inverse', type: 'white', styleType: 'ghost', inverse: true },
      { label: 'Link Primary', type: 'primary', styleType: 'link' },
      { label: 'Link Inverse', type: 'white', styleType: 'link', inverse: true, showLeftIcon: false },
    ];
    const focusedTargets = ['Primary', 'Secondary', 'Tertiary', 'Ghost Primary', 'Ghost Secondary', 'Ghost Inverse', 'Link Primary', 'Link Inverse'];

    return (
      <div className="flex w-fit flex-col gap-[36px]">
        <div className="grid grid-cols-[repeat(4,90px)] items-center gap-12 px-3">
          {states.map(({ label }) => (
            <div key={label} className="w-[90px] text-center text-[length:var(--sol-font-size-text-sm)] font-semibold leading-[var(--sol-line-height-text-sm)] text-element-quaternary">
              {label}
            </div>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.label}
            className={`grid grid-cols-[repeat(4,90px)] items-center gap-12 ${row.inverse ? 'bg-primary p-3' : 'px-3'}`}
          >
            {states.map(({ label, state }) => (
              <div
                key={`${row.label}-${label}`}
                className={[
                  'inline-flex w-[90px] items-center justify-start [&>button]:w-[90px] [&>button]:text-[length:var(--sol-font-size-text-sm)] [&>button]:font-semibold [&>button]:leading-[var(--sol-line-height-text-sm)]',
                  interactiveSurfaceClass,
                  (row.styleType === 'ghost' || row.styleType === 'link') ? ghostLinkCompactClass : '',
                  state === 'focused' && focusedTargets.includes(row.label)
                    ? row.styleType === 'link'
                      ? linkFocusedRingClass
                      : focusedRingClass
                    : '',
                ].filter(Boolean).join(' ')}
              >
                <Button
                  type={row.type}
                  styleType={row.styleType}
                  size="lg"
                  state={state}
                  label={label}
                  showLabel
                  showLeftIcon={row.showLeftIcon ?? false}
                  showRightIcon={false}
                  showLoading={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// ① Component usage
const states = [
  { label: 'Hover', state: 'hover' },
  { label: 'Pressed', state: 'pressed' },
  { label: 'Focused', state: 'focused' },
  { label: 'Disabled', state: 'disabled' },
];

const rows = [
  { label: 'Primary', type: 'primary', styleType: 'solid' },
  { label: 'Secondary', type: 'secondary', styleType: 'outline' },
  { label: 'Tertiary', type: 'tertiary', styleType: 'solid' },
  { label: 'Ghost Primary', type: 'primary', styleType: 'ghost' },
  { label: 'Ghost Secondary', type: 'secondary', styleType: 'ghost' },
  { label: 'Ghost Inverse', type: 'white', styleType: 'ghost', inverse: true },
  { label: 'Link Primary', type: 'primary', styleType: 'link' },
  { label: 'Link Inverse', type: 'white', styleType: 'link', inverse: true, showLeftIcon: false },
];

const interactiveSurfaceClass =
  '[&>button]:overflow-hidden [&>button>span:last-child]:inset-0 [&>button>span:last-child]:!rounded-2';
const ghostLinkCompactClass =
  '[&>button]:p-0.5 [&>button]:h-auto [&>button]:min-h-0';
const focusedRingClass =
  '[&>button]:shadow-focus-button-ring';
const linkFocusedRingClass =
  '[&>button]:outline [&>button]:outline-offset-0 [&>button]:outline-[length:var(--sol-focus-ring-link-outline-width)] [&>button]:outline-[color:var(--sol-focus-ring-link-outline-color)]';
const focusedTargets = ['Primary', 'Secondary', 'Tertiary', 'Ghost Primary', 'Ghost Secondary', 'Ghost Inverse', 'Link Primary', 'Link Inverse'];

<div className="flex w-fit flex-col gap-4">
  <div className="grid grid-cols-[repeat(4,90px)] items-center gap-12 px-3">
    {states.map(({ label }) => (
      <div key={label} className="w-[90px] text-center text-[length:var(--sol-font-size-text-sm)] font-semibold leading-[var(--sol-line-height-text-sm)] text-element-quaternary">{label}</div>
    ))}
  </div>
  {rows.map((row) => (
    <div
      key={row.label}
      className={\`grid grid-cols-[repeat(4,90px)] items-center gap-12 \${row.inverse ? 'bg-primary p-3' : 'px-3'}\`}
    >
      {states.map(({ label, state }) => (
        <div
          key={row.label + '-' + label}
          className={[
            'inline-flex w-[90px] items-center justify-start [&>button]:w-[90px] [&>button]:text-[length:var(--sol-font-size-text-sm)] [&>button]:font-semibold [&>button]:leading-[var(--sol-line-height-text-sm)]',
            interactiveSurfaceClass,
            (row.styleType === 'ghost' || row.styleType === 'link') ? ghostLinkCompactClass : '',
            state === 'focused' && focusedTargets.includes(row.label)
              ? row.styleType === 'link'
                ? linkFocusedRingClass
                : focusedRingClass
              : '',
          ].filter(Boolean).join(' ')}
        >
          <Button
            type={row.type}
            styleType={row.styleType}
            size="lg"
            state={state}
            label={label}
            showLabel
            showLeftIcon={row.showLeftIcon ?? false}
            showRightIcon={false}
            showLoading={false}
          />
        </div>
      ))}
    </div>
  ))}
</div>`,
        language: 'tsx',
      },
    },
  },
};

export const LeftIcon: Story = {
  name: 'Left Icon',
  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Left Icon', showLeftIcon: true, showRightIcon: false }),
};

export const RightIcon: Story = {
  name: 'Right Icon',
  ...makeStory({ type: 'primary', styleType: 'solid', size: 'lg', label: 'Right Icon', showLeftIcon: false, showRightIcon: true }),
};
