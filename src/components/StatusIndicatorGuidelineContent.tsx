import React, {useState, type ReactNode} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {
  BadgeCounterDemo,
  BadgeDemo,
  BadgeStatusDemo,
  ChipDemo,
  EmptyStateDemo,
} from '@site/src/components/StatusIndicatorExamples';

type StatusIndicatorKind = 'badge' | 'badge-counter' | 'badge-status' | 'chip' | 'empty-state';

type PageConfig = {
  title: string;
  description: string;
  examples: Array<{title: string; storyId: string}>;
};

const pageConfig: Record<StatusIndicatorKind, PageConfig> = {
  badge: {
    title: 'Badge',
    description: 'Badge는 상세 정보나 속성을 간결하게 전달하는 컴포넌트입니다.',
    examples: [
      {title: 'Basic badge', storyId: 'components-status-indicator-badge--basic'},
      {title: 'Badge with icon', storyId: 'components-status-indicator-badge--with-icon'},
      {title: 'Badge color', storyId: 'components-status-indicator-badge--color'},
    ],
  },
  'badge-counter': {
    title: 'Badge counter',
    description: '배지는 구성 요소와 속성 개수를 전달하는 컴포넌트입니다. 짧은 텍스트, 색상 및 아이콘을 사용하여 빠르게 인식할 수 있도록 하며 관련 콘텐츠에 배치합니다.',
    examples: [
      {title: 'Basic badge counter', storyId: 'components-badge-counter--basic'},
      {title: 'Badge counter size', storyId: 'components-badge-counter--size'},
      {title: 'Grey badge counter', storyId: 'components-badge-counter--grey'},
    ],
  },
  'badge-status': {
    title: 'Badge status',
    description: 'Badge Status는 알림, 업데이트, 상태 변화를 보조적으로 표시하여 사용자의 빠른 인지를 돕습니다.',
    examples: [
      {title: 'Number badge status', storyId: 'components-badge-status--number'},
      {title: 'Dot badge status', storyId: 'components-badge-status--dot'},
      {title: 'New badge status', storyId: 'components-badge-status--new'},
    ],
  },
  chip: {
    title: 'Chip',
    description: '칩은 여러 옵션을 선택하거나 해제할 수 있도록 제공되는 컴포넌트입니다.',
    examples: [
      {title: 'Basic chip', storyId: 'components-status-indicator-chip--basic'},
      {title: 'Chip size', storyId: 'components-status-indicator-chip--size'},
      {title: 'Chip state', storyId: 'components-status-indicator-chip--state'},
    ],
  },
  'empty-state': {
    title: 'Empty state',
    description: '데이터, 검색 결과, 또는 표시 가능한 콘텐츠가 없을 때 사용자에게 현재 상태를 명확하게 전달합니다.',
    examples: [
      {title: 'Basic empty state', storyId: 'components-empty-state--basic'},
      {title: 'Search empty state', storyId: 'components-empty-state--search'},
    ],
  },
};

function AnatomyMarker({children, className = ''}: {children: ReactNode; className?: string}): React.ReactElement {
  return <span className={`status-anatomy-marker ${className}`}>{children}</span>;
}

function AnatomyLegend({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="button-anatomy__legend">
      {items.map((item, index) => (
        <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
      ))}
    </div>
  );
}

function RadioOption({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}): React.ReactElement {
  return (
    <label className="button-radio-option">
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="button-radio-indicator" aria-hidden="true" />
      <span>{label}</span>
    </label>
  );
}

function BadgeVariantExplorer(): React.ReactElement {
  const [style, setStyle] = useState<'outlined' | 'filled'>('outlined');
  const [leading, setLeading] = useState<'none' | 'icon' | 'indicator' | 'avatar'>('none');
  const [trailing, setTrailing] = useState<'none' | 'icon'>('none');

  return (
    <div className="button-variant-explorer status-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <BadgeDemo styleType={style} leading={leading !== 'none'} trailing={trailing === 'icon'}>Badge</BadgeDemo>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Badge style">
            <RadioOption label="Outlined" name="badge-style" checked={style === 'outlined'} onChange={() => setStyle('outlined')} />
            <RadioOption label="Filled" name="badge-style" checked={style === 'filled'} onChange={() => setStyle('filled')} />
          </div>
        </div>
        <div className="button-control-group">
          <span>Leading contents</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Badge leading contents">
            {(['none', 'icon', 'indicator', 'avatar'] as const).map((value) => (
              <RadioOption key={value} label={value === 'none' ? 'None' : value[0].toUpperCase() + value.slice(1)} name="badge-leading" checked={leading === value} onChange={() => setLeading(value)} />
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Trailing content</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Badge trailing content">
            <RadioOption label="None" name="badge-trailing" checked={trailing === 'none'} onChange={() => setTrailing('none')} />
            <RadioOption label="Icon" name="badge-trailing" checked={trailing === 'icon'} onChange={() => setTrailing('icon')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeCounterVariantExplorer(): React.ReactElement {
  const [tone, setTone] = useState<'brand' | 'grey'>('brand');

  return (
    <div className="button-variant-explorer status-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <BadgeCounterDemo tone={tone}>1</BadgeCounterDemo>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Badge counter style">
            <RadioOption label="Brand color" name="counter-style" checked={tone === 'brand'} onChange={() => setTone('brand')} />
            <RadioOption label="Grey" name="counter-style" checked={tone === 'grey'} onChange={() => setTone('grey')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeStatusVariantExplorer(): React.ReactElement {
  const [type, setType] = useState<'none' | 'number' | 'dot' | 'new'>('number');

  return (
    <div className="button-variant-explorer status-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <BadgeStatusDemo type={type} value="1" />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Style</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Badge status style">
            {(['none', 'number', 'dot', 'new'] as const).map((value) => (
              <RadioOption key={value} label={value === 'new' ? 'New' : value[0].toUpperCase() + value.slice(1)} name="badge-status-style" checked={type === value} onChange={() => setType(value)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChipVariantExplorer(): React.ReactElement {
  const [leading, setLeading] = useState<'none' | 'icon'>('icon');
  const [trailing, setTrailing] = useState<'none' | 'icon'>('icon');

  return (
    <div className="button-variant-explorer status-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <ChipDemo leading={leading === 'icon'} trailing={trailing === 'icon'}>Chip</ChipDemo>
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>Leading content</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Chip leading content">
            <RadioOption label="None" name="chip-leading" checked={leading === 'none'} onChange={() => setLeading('none')} />
            <RadioOption label="Icon" name="chip-leading" checked={leading === 'icon'} onChange={() => setLeading('icon')} />
          </div>
        </div>
        <div className="button-control-group">
          <span>Trailing content</span>
          <div className="button-radio-list" role="radiogroup" aria-label="Chip trailing content">
            <RadioOption label="None" name="chip-trailing" checked={trailing === 'none'} onChange={() => setTrailing('none')} />
            <RadioOption label="Icon" name="chip-trailing" checked={trailing === 'icon'} onChange={() => setTrailing('icon')} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderArtwork(): React.ReactElement {
  return (
    <span className="status-header-artwork">
      <span aria-hidden="true">◎</span>
      <BadgeStatusDemo type="number" value="24" size="sm" />
      <span className="status-avatar" aria-hidden="true" />
    </span>
  );
}

function StatusUsageFrame({children}: {children: ReactNode}): React.ReactElement {
  return <div className="status-usage-frame">{children}</div>;
}

function renderAnatomy(kind: StatusIndicatorKind): React.ReactElement {
  if (kind === 'badge') {
    return (
      <div className="button-anatomy">
        <div className="button-guide-artwork button-anatomy__preview status-anatomy-preview">
          <BadgeDemo>Badge</BadgeDemo>
          <AnatomyMarker className="status-anatomy-marker--top">1</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--right">2</AnatomyMarker>
        </div>
        <AnatomyLegend items={['Label', 'Container']} />
      </div>
    );
  }

  if (kind === 'badge-counter') {
    return (
      <div className="button-anatomy">
        <div className="button-guide-artwork button-anatomy__preview status-anatomy-preview">
          <BadgeCounterDemo>1</BadgeCounterDemo>
          <AnatomyMarker className="status-anatomy-marker--left">1</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--top">2</AnatomyMarker>
        </div>
        <AnatomyLegend items={['Value', 'Container']} />
      </div>
    );
  }

  if (kind === 'badge-status') {
    return (
      <div className="button-anatomy">
        <div className="button-guide-artwork button-anatomy__preview status-anatomy-preview">
          <div className="status-example-row">
            <BadgeStatusDemo type="none" />
            <BadgeStatusDemo type="dot" />
            <BadgeStatusDemo type="number" value="99+" />
            <BadgeStatusDemo type="new" />
          </div>
          <AnatomyMarker className="status-anatomy-marker--left">1</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--top-left">2</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--top">3</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--top-right">4</AnatomyMarker>
        </div>
        <AnatomyLegend items={['Base icon', 'Dot', 'Number badge', 'Text badge']} />
      </div>
    );
  }

  if (kind === 'chip') {
    return (
      <div className="button-anatomy">
        <div className="button-guide-artwork button-anatomy__preview status-anatomy-preview">
          <ChipDemo leading trailing>Label</ChipDemo>
          <AnatomyMarker className="status-anatomy-marker--top">1</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--left">2</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--right">3</AnatomyMarker>
          <AnatomyMarker className="status-anatomy-marker--bottom">4</AnatomyMarker>
        </div>
        <AnatomyLegend items={['Container', 'Leading content', 'Trailing content', 'Label']} />
      </div>
    );
  }

  return (
    <div className="button-anatomy">
      <div className="button-guide-artwork button-anatomy__preview status-anatomy-preview">
        <EmptyStateDemo title="Sorry, there is not enough data for that date" description="" />
        <AnatomyMarker className="status-anatomy-marker--left">1</AnatomyMarker>
        <AnatomyMarker className="status-anatomy-marker--right">2</AnatomyMarker>
      </div>
      <AnatomyLegend items={['Icon', 'Label']} />
    </div>
  );
}

function renderVariants(kind: StatusIndicatorKind): React.ReactElement | null {
  if (kind === 'badge') return <BadgeVariantExplorer />;
  if (kind === 'badge-counter') return <BadgeCounterVariantExplorer />;
  if (kind === 'badge-status') return <BadgeStatusVariantExplorer />;
  if (kind === 'chip') return <ChipVariantExplorer />;
  return null;
}

function renderSize(kind: StatusIndicatorKind): React.ReactElement | null {
  if (kind === 'empty-state') return null;
  if (kind === 'badge-counter') {
    return (
      <div className="button-guide-artwork status-size-row">
        <BadgeCounterDemo size="sm">1</BadgeCounterDemo>
        <BadgeCounterDemo size="md" tone="danger">16</BadgeCounterDemo>
        <BadgeCounterDemo size="lg" tone="danger">99+</BadgeCounterDemo>
      </div>
    );
  }
  if (kind === 'badge-status') {
    return (
      <div className="button-guide-artwork status-size-row">
        <BadgeStatusDemo type="dot" size="sm" />
        <BadgeStatusDemo type="number" size="sm" value="6" />
        <BadgeStatusDemo type="new" size="md" />
        <BadgeStatusDemo type="number" size="lg" value="20" />
      </div>
    );
  }
  if (kind === 'chip') {
    return (
      <div className="button-guide-artwork status-size-row">
        <ChipDemo size="sm" leading selected>Small</ChipDemo>
        <ChipDemo size="md" leading selected>Medium</ChipDemo>
        <ChipDemo size="lg" leading trailing selected>Large</ChipDemo>
      </div>
    );
  }
  return (
    <div className="button-guide-artwork status-size-row">
      <BadgeDemo>small</BadgeDemo>
      <BadgeDemo tone="red">medium</BadgeDemo>
      <BadgeDemo tone="indigo">Large</BadgeDemo>
    </div>
  );
}

function renderColor(kind: StatusIndicatorKind): React.ReactElement | null {
  if (kind !== 'badge') return null;
  return (
    <div className="button-guide-artwork status-color-row">
      {(['neutral', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'pink'] as const).map((tone) => (
        <BadgeDemo key={tone} tone={tone}>Badge</BadgeDemo>
      ))}
    </div>
  );
}

function renderState(kind: StatusIndicatorKind): React.ReactElement | null {
  if (kind !== 'chip') return null;
  return (
    <div className="button-guide-artwork status-state-table">
      {(['Enabled', 'Hover', 'Pressed', 'Error', 'Disabled'] as const).map((state) => (
        <div className="status-state-table__row" key={state}>
          <span>{state}</span>
          <div className="status-example-row">
            <ChipDemo selected state={state.toLowerCase() as 'enabled' | 'hover' | 'pressed' | 'error' | 'disabled'} leading>Chip</ChipDemo>
            <ChipDemo state={state.toLowerCase() as 'enabled' | 'hover' | 'pressed' | 'error' | 'disabled'} leading trailing>Chip</ChipDemo>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderUsage(kind: StatusIndicatorKind): React.ReactElement {
  if (kind === 'badge') {
    return (
      <div className="button-do-dont-grid button-usage-guideline-grid">
        <DoDontCard type="do" title="'Outlined' 타입을 기본으로 사용합니다."><div className="status-example-row"><BadgeDemo tone="yellow">Low Battery</BadgeDemo><BadgeDemo tone="red">Out Of Stock</BadgeDemo></div></DoDontCard>
        <DoDontCard type="dont" title="'Filled' 타입과 'Outlined' 타입 배지를 혼용하지 않습니다."><div className="status-example-row"><BadgeDemo tone="yellow">Low Battery</BadgeDemo><BadgeDemo tone="red" styleType="filled">Out Of Stock</BadgeDemo></div></DoDontCard>
        <DoDontCard type="do" title="레이블은 1-2단어로 간결하게 작성합니다."><div className="status-example-row"><BadgeDemo tone="red">Connection Lost</BadgeDemo><BadgeDemo tone="red">Update Failed</BadgeDemo></div></DoDontCard>
        <DoDontCard type="dont" title="필터나 선택, 전환 등 사용자 액션을 수행하는 용도로 사용하지 않습니다."><div className="status-example-row"><BadgeDemo tone="indigo">All</BadgeDemo><BadgeDemo tone="indigo">ESL</BadgeDemo><BadgeDemo tone="indigo">LCD</BadgeDemo></div></DoDontCard>
        <DoDontCard type="do" title="컬러는 의미와 사용 맥락에 맞게 적용합니다."><div className="status-example-row status-example-row--wrap"><BadgeDemo tone="green">Active</BadgeDemo><BadgeDemo>Inactive</BadgeDemo><BadgeDemo tone="pink">Out of zone</BadgeDemo><BadgeDemo tone="blue">Connected</BadgeDemo><BadgeDemo tone="red">Disconnected</BadgeDemo></div></DoDontCard>
        <DoDontCard type="dont" title="디자인 시스템에서 정의된 의미 체계를 벗어나는 레이블은 사용하지 않습니다."><div className="status-example-row"><BadgeDemo tone="green">Connected</BadgeDemo><BadgeDemo tone="red">Complete</BadgeDemo></div></DoDontCard>
      </div>
    );
  }

  if (kind === 'badge-counter') {
    return (
      <div className="button-do-dont-grid button-usage-guideline-grid">
        <DoDontCard type="do" title="텍스트 우측에 배치합니다."><div className="status-inline-title">Title <BadgeCounterDemo>7</BadgeCounterDemo></div></DoDontCard>
        <DoDontCard type="dont" title="텍스트 좌측에 배치하지 않습니다."><div className="status-inline-title"><BadgeCounterDemo>7</BadgeCounterDemo> Title</div></DoDontCard>
        <DoDontCard type="do" title="기본 색상을 사용합니다."><div className="status-inline-title"><MiniLabel /> Columns <BadgeCounterDemo>1</BadgeCounterDemo></div></DoDontCard>
        <DoDontCard type="dont" title="지정된 색상을 임의로 변경하지 않습니다."><div className="status-inline-title"><MiniLabel /> Columns <BadgeCounterDemo tone="danger">1</BadgeCounterDemo></div></DoDontCard>
        <DoDontCard type="do" title="숫자와 함께 일부 특수 문자를 사용할 수 있습니다."><div className="status-example-row"><BadgeCounterDemo>+82</BadgeCounterDemo><BadgeCounterDemo tone="grey">-6</BadgeCounterDemo><BadgeCounterDemo>+12</BadgeCounterDemo></div></DoDontCard>
        <DoDontCard type="dont" title="텍스트를 함께 사용하지 않습니다."><div className="status-example-row"><BadgeCounterDemo>Columns 7</BadgeCounterDemo><span className="status-muted-pill">Title 12</span></div></DoDontCard>
      </div>
    );
  }

  if (kind === 'badge-status') {
    return (
      <div className="button-do-dont-grid button-usage-guideline-grid">
        <DoDontCard type="do" title="기본 색상을 사용합니다."><StatusUsageFrame><HeaderArtwork /></StatusUsageFrame></DoDontCard>
        <DoDontCard type="dont" title="지정된 색상을 임의로 변경하지 않습니다."><StatusUsageFrame><HeaderArtwork /></StatusUsageFrame></DoDontCard>
        <DoDontCard type="do" title="아이콘 등 주요 요소와 함께 사용합니다."><StatusUsageFrame><HeaderArtwork /></StatusUsageFrame></DoDontCard>
        <DoDontCard type="dont" title="단독으로 사용하지 않습니다."><StatusUsageFrame><BadgeCounterDemo tone="danger">24</BadgeCounterDemo><span className="status-avatar" /></StatusUsageFrame></DoDontCard>
        <DoDontCard type="do" title="짧은 숫자 또는 간단한 상태만 표시합니다."><StatusUsageFrame><span>◎</span><BadgeStatusDemo type="number" value="99+" /><span className="status-avatar" /></StatusUsageFrame></DoDontCard>
        <DoDontCard type="dont" title="긴 숫자나 복잡한 정보를 표시하지 않습니다."><StatusUsageFrame><span>◎</span><BadgeStatusDemo type="number" value="9999" /><span className="status-avatar" /></StatusUsageFrame></DoDontCard>
      </div>
    );
  }

  if (kind === 'chip') {
    return (
      <div className="button-do-dont-grid button-usage-guideline-grid">
        <DoDontCard type="do" title="필터 요소로 사용합니다."><div className="status-example-row"><ChipDemo>All</ChipDemo><ChipDemo selected>ESL</ChipDemo><ChipDemo selected>Signage</ChipDemo><ChipDemo>Newton Eye</ChipDemo><ChipDemo>Sensor</ChipDemo></div></DoDontCard>
        <DoDontCard type="dont" title="단일 칩으로 사용하지 않습니다."><ChipDemo selected>Filter</ChipDemo></DoDontCard>
        <DoDontCard type="do" title="짧고 식별 가능한 텍스트를 사용합니다."><div className="status-example-row"><ChipDemo>ESL</ChipDemo><ChipDemo>Signage</ChipDemo><ChipDemo>Sensor</ChipDemo></div></DoDontCard>
        <DoDontCard type="dont" title="긴 문장은 Chip 내부에 사용하지 않습니다."><div className="status-example-column"><ChipDemo>Real-Time Data Visualization</ChipDemo><ChipDemo>Customer Experience Optimization</ChipDemo></div></DoDontCard>
        <DoDontCard type="do" title="Input chip 요소로 사용합니다."><div className="status-chip-input"><ChipDemo selected>Chip</ChipDemo><ChipDemo selected>Chip</ChipDemo><ChipDemo selected>Chip</ChipDemo><span>+99 More</span></div></DoDontCard>
        <DoDontCard type="dont" title="선택된 항목을 Unselected 상태로 표시하지 않습니다."><div className="status-chip-input"><ChipDemo>Chip</ChipDemo><ChipDemo>Chip</ChipDemo><ChipDemo>Chip</ChipDemo><span>+99 More</span></div></DoDontCard>
      </div>
    );
  }

  return (
    <div className="button-do-dont-grid button-usage-guideline-grid">
      <DoDontCard type="do" title="현재 상태를 명확히 설명하고 다음 행동을 간결하게 안내합니다."><StatusUsageFrame><EmptyStateDemo /></StatusUsageFrame></DoDontCard>
      <DoDontCard type="dont" title="상태만 전달하고 해결 방법을 제공하지 않습니다."><StatusUsageFrame><EmptyStateDemo title="There have been no events added" description="" /></StatusUsageFrame></DoDontCard>
    </div>
  );
}

function MiniLabel(): React.ReactElement {
  return <span className="status-mini-label" aria-hidden="true" />;
}

export default function StatusIndicatorGuidelineContent({kind}: {kind: StatusIndicatorKind}): React.ReactElement {
  const config = pageConfig[kind];
  const variants = renderVariants(kind);
  const size = renderSize(kind);
  const color = renderColor(kind);
  const state = renderState(kind);

  return (
    <ComponentGuideLayout
        category="Status indicator"
        title={config.title}
        description={config.description}
        className="status-indicator-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">{renderAnatomy(kind)}</SectionBlock>
              {variants && <SectionBlock title="Variants">{variants}</SectionBlock>}
              {size && <SectionBlock title="Size">{size}</SectionBlock>}
              {color && <SectionBlock title="Color">{color}</SectionBlock>}
              {state && <SectionBlock title="State">{state}</SectionBlock>}
              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">{renderUsage(kind)}</SectionBlock>
          </>}
          example={
            kind === 'chip'
              ? <StorybookExampleList storyTitles={['Components/Chip']} />
              : <>
                  {config.examples.map((example) => (
                    <ExampleCard key={example.storyId} title={example.title} storyId={example.storyId} />
                  ))}
                </>
          }
        />
      </ComponentGuideLayout>
  );
}
