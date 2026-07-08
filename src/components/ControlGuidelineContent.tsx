import React, {type ReactNode, useState} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {ControlGroupDemo, ControlMark, ControlOption} from '@site/src/components/ControlExamples';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type ControlPageType = 'checkbox' | 'radio' | 'control-group' | 'switch';
type OptionKind = 'checkbox' | 'radio' | 'switch';

type PageConfig = {
  category: string;
  title: string;
  description: string;
  kind: OptionKind;
  anatomy: string[];
  variants: Array<{name: string; values: string[]}>;
  hasSize: boolean;
  states: string[];
  usage: Array<{do: string; dont: string; doPreview: ReactNode; dontPreview: ReactNode}>;
  examples: Array<{title: string; storyId: string}>;
};

function SectionBlock({title, children, className}: {title: string; children: ReactNode; className?: string}): React.ReactElement {
  return (
    <section className={`button-guide-section${className ? ` ${className}` : ''}`}>
      <h2>{title}</h2>
      <div className="button-guide-section__content">{children}</div>
    </section>
  );
}

function DontExampleHeader(): React.ReactElement {
  return (
    <div className="button-example-header button-example-header--dont" data-type="red">
      <div className="button-example-header__row">
        <span className="button-example-header__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.75 12C19.75 7.71979 16.2802 4.25 12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" />
            <path d="M16.0609 8.99995L9.00044 16.0605L7.93988 15L15.0004 7.9394L16.0609 8.99995Z" />
          </svg>
        </span>
        <span className="button-example-header__text">Don&apos;t</span>
      </div>
      <div className="button-example-header__divider" />
    </div>
  );
}

function DoExampleHeader(): React.ReactElement {
  return (
    <div className="button-example-header button-example-header--do" data-type="green">
      <div className="button-example-header__row">
        <span className="button-example-header__icon" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 4.25C7.71979 4.25 4.25 7.71979 4.25 12C4.25 16.2802 7.71979 19.75 12 19.75C16.2802 19.75 19.75 16.2802 19.75 12C19.75 7.71979 16.2802 4.25 12 4.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12ZM16.3553 9.98033L11.2553 15.0803C10.9624 15.3732 10.4876 15.3732 10.1947 15.0803L7.64467 12.5303L8.70533 11.4697L10.725 13.4893L15.2947 8.91967L16.3553 9.98033Z" />
          </svg>
        </span>
        <span className="button-example-header__text">Do</span>
      </div>
      <div className="button-example-header__divider" />
    </div>
  );
}

function DoDontCard({type, title, children}: {type: 'do' | 'dont'; title: string; children: ReactNode}): React.ReactElement {
  return (
    <article className={`button-guide-card button-guide-card--${type}`}>
      {type === 'dont' ? <DontExampleHeader /> : <DoExampleHeader />}
      <h3>{title}</h3>
      <div className="button-guide-card__artwork">{children}</div>
    </article>
  );
}

function VariantExplorer({config}: {config: PageConfig}): React.ReactElement {
  const [description, setDescription] = useState(true);
  const [required, setRequired] = useState(config.title === 'Checkbox');
  const [type, setType] = useState(config.variants[0]?.values[0] ?? 'Single');
  const {colorMode} = useColorMode();
  const currentKind = config.title === 'Control group'
    ? type.toLowerCase() === 'switch' ? 'switch' : type.toLowerCase() === 'checkbox' ? 'checkbox' : 'radio'
    : config.kind;
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookId = config.title === 'Control group'
    ? currentKind === 'switch'
      ? 'components-controls-controlgroup--switch-group-example'
      : currentKind === 'radio'
        ? 'components-controls-controlgroup--radio-group-example'
        : 'components-controls-controlgroup--default'
    : config.kind === 'switch'
      ? 'components-controls-switch--default'
      : config.kind === 'radio'
        ? 'components-controls-radio--default'
        : 'components-controls-checkbox--default';
  const storybookArgs = config.title === 'Control group'
    ? [
        'legend:Group label',
        `helperText:${description ? 'Description' : ''}`,
        `required:${required}`,
      ].join(';')
    : config.kind === 'switch'
      ? [
          'checked:true',
          'size:md',
          'label:Option',
        ].join(';')
      : config.kind === 'radio'
        ? [
            'value:option1',
            'disabled:false',
          ].join(';')
        : [
            'checked:true',
            'label:Option',
          ].join(';');
  const storybookControlSrc = getStorybookIframeUrl({
    storyId: storybookId,
    args: storybookArgs,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer control-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title={`${config.title} Storybook preview`}
          src={storybookControlSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <div className="button-control-group">
          <span>{config.title === 'Control group' ? 'Type' : 'Type'}</span>
          <div className="button-radio-list" role="radiogroup" aria-label={`${config.title} type`}>
            {config.variants[0].values.map((value) => (
              <label key={value} className="button-radio-option">
                <input type="radio" name={`${config.title}-type`} checked={type === value} onChange={() => setType(value)} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="button-control-group">
          <span>Description</span>
          <div className="button-radio-list" role="radiogroup" aria-label={`${config.title} description`}>
            {['True', 'False'].map((value) => (
              <label key={value} className="button-radio-option">
                <input type="radio" name={`${config.title}-description`} checked={description === (value === 'True')} onChange={() => setDescription(value === 'True')} />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
        {config.title === 'Checkbox' && (
          <div className="button-control-group">
            <span>Required Indicator</span>
            <div className="button-radio-list" role="radiogroup" aria-label="Checkbox required indicator">
              {['True', 'False'].map((value) => (
                <label key={value} className="button-radio-option">
                  <input type="radio" name="checkbox-required" checked={required === (value === 'True')} onChange={() => setRequired(value === 'True')} />
                  <span className="button-radio-indicator" aria-hidden="true" />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnatomyPreview({config}: {config: PageConfig}): React.ReactElement {
  return (
    <div className="button-anatomy control-anatomy">
      <div className="button-guide-artwork button-anatomy__preview">
        {config.title === 'Checkbox' ? (
          <img src="/img/components/checkbox-anatomy.svg" alt="Checkbox anatomy" className="button-guide-artwork-img" />
        ) : config.title === 'Radio' ? (
          <img src="/img/components/radio-anatomy.svg" alt="Radio anatomy" className="button-guide-artwork-img" />
        ) : config.title === 'Switch' ? (
          <img src="/img/components/switch-anatomy.svg" alt="Switch anatomy" className="button-guide-artwork-img" />
        ) : config.title === 'Control group' ? (
          <img src="/img/components/control-group-anatomy.svg" alt="Control group anatomy" className="button-guide-artwork-img" />
        ) : (
          <ControlOption kind={config.kind} label="Option" description="Description" required={config.title === 'Checkbox'} checked />
        )}
      </div>
      <div className="button-anatomy__legend">
        {config.anatomy.map((item, index) => (
          <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
        ))}
      </div>
    </div>
  );
}

function SizePreview({kind}: {kind: OptionKind}): React.ReactElement {
  return (
    <div className="button-guide-artwork control-size-row">
      {kind === 'radio' ? (
        <img src="/img/components/radio-size.svg" alt="Radio size" className="button-guide-artwork-img" />
      ) : kind === 'switch' ? (
        <img src="/img/components/switch-size.svg" alt="Switch size" className="button-guide-artwork-img" />
      ) : (
        <>
          <div className="control-size-item"><span>16</span><ControlOption kind={kind} size="sm" label="Option" checked /></div>
          <div className="control-size-item"><span>20</span><ControlOption kind={kind} size="md" label="Option" checked /></div>
        </>
      )}
    </div>
  );
}

function StatePreview({config}: {config: PageConfig}): React.ReactElement {
  return (
    <div className="accordion-state-table control-state-table">
      {config.title === 'Checkbox' ? (
        <img src="/img/components/checkbox-state.svg" alt="Checkbox state" className="button-guide-artwork-img" />
      ) : config.title === 'Radio' ? (
        <img src="/img/components/radio-state.svg" alt="Radio state" className="button-guide-artwork-img" />
      ) : config.title === 'Switch' ? (
        <img src="/img/components/switch-state.svg" alt="Switch state" className="button-guide-artwork-img" />
      ) : config.states.map((state) => {
        const normalized = state.toLowerCase().replace(' ', '') as 'readonly' | 'enabled' | 'hover' | 'pressed' | 'focused' | 'error' | 'disabled';
        return (
          <div className="accordion-state-table__row" key={state}>
            <span>{state}</span>
            <div className="accordion-state-table__content control-state-table__content">
              <ControlOption kind={config.kind} state={normalized} label="Option" disabled={normalized === 'disabled'} readOnly={normalized === 'readonly'} />
              <ControlOption kind={config.kind} state={normalized} label="Option" checked disabled={normalized === 'disabled'} readOnly={normalized === 'readonly'} />
              {config.kind === 'checkbox' && <ControlOption kind="checkbox" state={normalized} label="Option" checked indeterminate disabled={normalized === 'disabled'} readOnly={normalized === 'readonly'} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GuidancePreview({children}: {children: ReactNode}): React.ReactElement {
  return <div className="control-guidance-preview">{children}</div>;
}

function makeConfig(type: ControlPageType): PageConfig {
  const baseExamples = {
    checkbox: [
      ['Basic checkbox', 'components-controls-checkbox--basic'],
      ['Checkbox with description', 'components-controls-checkbox--with-description'],
      ['Checkbox group', 'components-controls-checkbox--group'],
      ['Required checkbox group', 'components-controls-checkbox--required-group'],
      ['Error checkbox group', 'components-controls-checkbox--error-group'],
      ['Disabled checkbox', 'components-controls-checkbox--disabled'],
      ['Read only checkbox', 'components-controls-checkbox--read-only'],
      ['Indeterminate checkbox', 'components-controls-checkbox--indeterminate'],
    ],
    radio: [
      ['Basic radio', 'components-controls-radio--basic'],
      ['Radio with description', 'components-controls-radio--with-description'],
      ['Radio group', 'components-controls-radio--group'],
      ['Required radio group', 'components-controls-radio--required-group'],
      ['Error radio group', 'components-controls-radio--error-group'],
      ['Disabled radio', 'components-controls-radio--disabled'],
      ['Horizontal radio group', 'components-controls-radio--horizontal-group'],
    ],
    'control-group': [
      ['Radio control group', 'components-control-group--radio'],
      ['Checkbox control group', 'components-control-group--checkbox'],
      ['Switch control group', 'components-control-group--switch'],
      ['Control group with description', 'components-control-group--with-description'],
      ['Required control group', 'components-control-group--required'],
      ['Error control group', 'components-control-group--error'],
      ['Multi-column control group', 'components-control-group--multi-column'],
    ],
    switch: [
      ['Basic switch', 'components-controls-switch--basic'],
      ['Switch with description', 'components-controls-switch--with-description'],
      ['Switch group', 'components-controls-switch--group'],
      ['Disabled switch', 'components-controls-switch--disabled'],
      ['Read only switch', 'components-controls-switch--read-only'],
      ['Settings list with switches', 'components-controls-switch--settings-list'],
    ],
  } as const;

  const common = (items: readonly (readonly [string, string])[]) => items.map(([title, storyId]) => ({title, storyId}));

  if (type === 'radio') {
    return {
      category: 'Control',
      title: 'Radio',
      description: '라디오는 제한된 여러 옵션 중 하나만 선택할 수 있도록 제공하는 컨트롤입니다.',
      kind: 'radio',
      anatomy: ['Checkmark', 'Text', 'Description'],
      variants: [{name: 'Type', values: ['Single', 'Group']}, {name: 'Description', values: ['True', 'False']}],
      hasSize: true,
      states: ['Enabled', 'Hover', 'Pressed', 'Focused', 'Error', 'Disabled'],
      usage: [
        {do: '여러 옵션 중 하나만 선택해야 하는 경우 Radio를 사용합니다.', dont: '중복 선택이 가능한 항목에 Radio를 사용하지 않습니다.', doPreview: <img src="/img/components/radio-do-01.svg" alt="단일 선택 Radio 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/radio-dont-01.svg" alt="중복 선택 Radio 사용 비권장 예시" className="button-guide-artwork-img" />},
        {do: '사용자가 반드시 하나를 선택해야 하는 경우 기본 선택값을 제공합니다.', dont: '기본값이 필요한 항목에서 아무 항목도 선택되지 않은 상태로 제공하지 않습니다.', doPreview: <img src="/img/components/radio-do-02.svg" alt="Radio 기본 선택값 제공 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/radio-dont-02.svg" alt="Radio 기본 선택값 미제공 비권장 예시" className="button-guide-artwork-img" />},
        {do: '필수 항목에는 required indicator와 error message를 함께 제공합니다.', dont: '오류 상태를 색상만으로 전달하지 않습니다.', doPreview: <img src="/img/components/radio-do-03.svg" alt="Radio 필수 항목과 오류 메시지 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/radio-dont-03.svg" alt="Radio 오류 상태 색상 단독 표현 비권장 예시" className="button-guide-artwork-img" />},
      ],
      examples: common(baseExamples.radio),
    };
  }

  if (type === 'control-group') {
    return {
      category: 'Control',
      title: 'Control group',
      description: '선택 컨트롤과 라벨, 설명, 그룹 구조를 조합해 선택형 입력 패턴을 구성하는 컨트롤 그룹입니다.',
      kind: 'radio',
      anatomy: ['Label', 'Control', 'Option text', 'Description'],
      variants: [{name: 'Type', values: ['Radio', 'Checkbox', 'Switch']}, {name: 'Description', values: ['Label', 'Description']}],
      hasSize: false,
      states: [],
      usage: [
        {do: '관련된 선택 항목은 하나의 Control group으로 묶고 group label을 제공합니다.', dont: '관련 없는 항목을 같은 그룹으로 묶지 않습니다.', doPreview: <img src="/img/components/control-group-do-01.svg" alt="관련 선택 항목을 Control group으로 구성한 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/control-group-dont-01.svg" alt="관련 없는 항목을 같은 Control group으로 구성한 비권장 예시" className="button-guide-artwork-img" />},
        {do: '필수 입력이 필요한 그룹에는 required indicator와 error message를 함께 제공합니다.', dont: '필수 상태나 오류 상태를 개별 option에만 표시하지 않습니다.', doPreview: <img src="/img/components/control-group-do-02.svg" alt="Control group 필수 상태와 오류 메시지 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/control-group-dont-02.svg" alt="Control group 필수 상태와 오류 표시 비권장 예시" className="button-guide-artwork-img" />},
        {do: '옵션의 의미가 복잡한 경우 description을 함께 제공합니다.', dont: '모든 옵션에 불필요하게 긴 description을 제공하지 않습니다.', doPreview: <img src="/img/components/control-group-do-03.svg" alt="Control group description 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/control-group-dont-03.svg" alt="불필요하게 긴 Control group description 비권장 예시" className="button-guide-artwork-img" />},
        {do: '선택지가 많은 경우 2열 이상의 grid 구조를 사용해 탐색성을 높입니다.', dont: '너무 많은 항목을 한 줄 또는 좁은 영역에 밀집시켜 표시하지 않습니다.', doPreview: <img src="/img/components/control-group-do-04.svg" alt="Control group grid 구성 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/control-group-dont-04.svg" alt="Control group 선택지 밀집 배치 비권장 예시" className="button-guide-artwork-img" />},
        {do: 'Radio, Checkbox, Switch를 같은 그룹 안에 섞어 사용할 때는 기능 단위를 명확히 구분합니다.', dont: '서로 다른 선택 방식의 컨트롤을 구분 없이 혼합하지 않습니다.', doPreview: <ControlGroupDemo kind="switch" label="Features" description options={['Option', 'Option', 'Option']} />, dontPreview: <ControlGroupDemo kind="switch" label="Features" options={['Option', 'Option', 'Option']} />},
        {do: '그룹 안의 컨트롤은 정렬 기준을 일관되게 유지합니다.', dont: 'label, control, description의 정렬이 항목마다 달라지지 않도록 합니다.', doPreview: <ControlGroupDemo kind="switch" label="" options={['Gateway', 'BLE']} />, dontPreview: <ControlGroupDemo kind="switch" label="" options={['Gateway', 'BLE']} />},
      ],
      examples: common(baseExamples['control-group']),
    };
  }

  if (type === 'switch') {
    return {
      category: 'Control',
      title: 'Switch',
      description: '스위치는 설정이나 기능의 활성·비활성 상태를 즉시 전환하는 선택 컨트롤입니다.',
      kind: 'switch',
      anatomy: ['Text', 'Description', 'Background', 'Thumb'],
      variants: [{name: 'Type', values: ['Single', 'Group']}, {name: 'Description', values: ['True', 'False']}],
      hasSize: true,
      states: ['Enabled', 'Focused', 'Disabled', 'Read only'],
      usage: [
        {do: '설정이나 기능을 즉시 켜고 끄는 경우 Switch를 사용합니다.', dont: '여러 옵션 중 하나를 선택해야 하는 경우 Switch를 사용하지 않습니다.', doPreview: <img src="/img/components/switch-do-01.svg" alt="Switch 즉시 전환 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/switch-dont-01.svg" alt="선택 옵션에 Switch 사용 비권장 예시" className="button-guide-artwork-img" />},
        {do: '변경 즉시 적용되는 설정에 사용합니다.', dont: '저장 버튼을 눌러야 반영되는 선택 항목에는 Radio button이나 Checkbox를 사용합니다.', doPreview: <img src="/img/components/switch-do-02.svg" alt="Switch 즉시 적용 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/switch-dont-02.svg" alt="저장 후 반영 항목에 Switch 사용 비권장 예시" className="button-guide-artwork-img" />},
        {do: 'Switch label은 기능의 상태가 아니라 제어 대상의 이름을 작성합니다.', dont: 'label을 On / Off처럼 상태값만으로 작성하지 않습니다.', doPreview: <img src="/img/components/switch-do-03.svg" alt="Switch 제어 대상 label 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/switch-dont-03.svg" alt="Switch 상태값 label 사용 비권장 예시" className="button-guide-artwork-img" />},
        {do: '여러 Switch를 그룹으로 제공할 때는 관련 설정끼리 묶습니다.', dont: '서로 관련 없는 설정을 하나의 그룹으로 묶지 않습니다.', doPreview: <img src="/img/components/switch-do-04.svg" alt="관련 Switch 그룹 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/switch-dont-04.svg" alt="관련 없는 Switch 그룹 사용 비권장 예시" className="button-guide-artwork-img" />},
        {do: '사용자가 판단하기 어려운 설정에는 description을 제공합니다.', dont: '설명이 필요한 설정을 label만으로 제공하지 않습니다.', doPreview: <img src="/img/components/switch-do-05.svg" alt="Switch description 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/switch-dont-05.svg" alt="Switch description 미제공 비권장 예시" className="button-guide-artwork-img" />},
      ],
      examples: common(baseExamples.switch),
    };
  }

  return {
    category: 'Control',
    title: 'Checkbox',
    description: '체크박스는 여러 옵션 중 하나 이상의 선택사항을 지정할 수 있는 컨트롤입니다.',
    kind: 'checkbox',
    anatomy: ['Checkbox', 'Text', 'Required Indicator', 'Description'],
    variants: [{name: 'Type', values: ['Single', 'Group']}, {name: 'Description', values: ['True', 'False']}, {name: 'Required Indicator', values: ['True', 'False']}],
    hasSize: true,
    states: ['Enabled', 'Hover', 'Pressed', 'Focused', 'Error', 'Read only', 'Disabled'],
    usage: [
      {do: '여러 항목 중 복수 선택이 가능한 경우 Checkbox를 사용합니다.', dont: '하나만 선택해야 하는 항목에 Checkbox를 사용하지 않습니다.', doPreview: <img src="/img/components/checkbox-do-01.svg" alt="복수 선택 Checkbox 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/checkbox-dont-01.svg" alt="단일 선택 Checkbox 사용 비권장 예시" className="button-guide-artwork-img" />},
      {do: 'Checkbox group은 명확한 group label과 함께 사용합니다.', dont: '관련 없는 선택지를 하나의 Checkbox group으로 묶지 않습니다.', doPreview: <img src="/img/components/checkbox-do-02.svg" alt="Checkbox group label 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/checkbox-dont-02.svg" alt="관련 없는 Checkbox group 사용 비권장 예시" className="button-guide-artwork-img" />},
      {do: '전체 선택 또는 일부 선택 상태가 필요한 경우 indeterminate 상태를 사용합니다.', dont: '일부만 선택된 상태를 checked 상태로 표시하지 않습니다.', doPreview: <img src="/img/components/checkbox-do-03.svg" alt="Checkbox indeterminate 상태 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/checkbox-dont-03.svg" alt="일부 선택 상태 표시 비권장 예시" className="button-guide-artwork-img" />},
      {do: '긴 설명이 필요한 경우 label 아래 description을 함께 제공합니다.', dont: 'label에 지나치게 긴 설명을 넣어 선택 항목을 읽기 어렵게 만들지 않습니다.', doPreview: <img src="/img/components/checkbox-do-04.svg" alt="Checkbox description 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/checkbox-dont-04.svg" alt="긴 Checkbox label 사용 비권장 예시" className="button-guide-artwork-img" />},
      {do: '약관 동의처럼 반드시 확인이 필요한 단일 선택에는 single checkbox를 사용합니다.', dont: '사용자의 명시적 동의가 필요한 항목을 기본 선택 상태로 제공하지 않습니다.', doPreview: <img src="/img/components/checkbox-do-05.svg" alt="단일 동의 Checkbox 사용 권장 예시" className="button-guide-artwork-img" />, dontPreview: <img src="/img/components/checkbox-dont-05.svg" alt="동의 Checkbox 기본 선택 비권장 예시" className="button-guide-artwork-img" />},
    ],
    examples: common(baseExamples.checkbox),
  };
}

export default function ControlGuidelineContent({type}: {type: ControlPageType}): React.ReactElement {
  const config = makeConfig(type);

  return (
    <ComponentGuideLayout
        category={config.category}
        title={config.title}
        description={config.description}
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <AnatomyPreview config={config} />
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantExplorer config={config} />
              </SectionBlock>

              {config.hasSize && (
                <SectionBlock title="Size">
                  <SizePreview kind={config.kind} />
                </SectionBlock>
              )}

              {config.states.length > 0 && (
                <SectionBlock title="State">
                  <StatePreview config={config} />
                </SectionBlock>
              )}

              <SectionBlock title="Usage Guidelines" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  {config.usage.map((item, index) => (
                    <React.Fragment key={`${config.title}-${index}`}>
                      <DoDontCard type="do" title={item.do}><GuidancePreview>{item.doPreview}</GuidancePreview></DoDontCard>
                      <DoDontCard type="dont" title={item.dont}><GuidancePreview>{item.dontPreview}</GuidancePreview></DoDontCard>
                    </React.Fragment>
                  ))}
                </div>
              </SectionBlock>
          </>}
          example={
            <StorybookExampleList
              storyTitles={[
                type === 'checkbox'
                  ? 'Components/Controls/Checkbox'
                  : type === 'radio'
                    ? 'Components/Controls/Radio'
                    : type === 'control-group'
                      ? 'Components/Controls/ControlGroup'
                      : 'Components/Controls/Switch',
              ]}
              storybookPathMode="story"
            />
          }
        />
      </ComponentGuideLayout>
  );
}
