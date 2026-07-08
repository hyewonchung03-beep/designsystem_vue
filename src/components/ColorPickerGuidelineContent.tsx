import React, {useState} from 'react';
import {ExampleCard} from '@site/src/components/ExampleCard';
import {DoDontCard, SectionBlock, ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {ColorPickerDemo} from '@site/src/components/PickerComponentExamples';

function Legend({items}: {items: string[]}): React.ReactElement {
  return <div className="button-anatomy__legend">{items.map((item, index) => <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>)}</div>;
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return <div className="data-table-text-list"><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export default function ColorPickerGuidelineContent(): React.ReactElement {
  const [label, setLabel] = useState(true);
  const [input, setInput] = useState(true);
  const [rows, setRows] = useState<1 | 2 | 3>(2);

  return (
    <ComponentGuideLayout
        category="Picker"
        title="Color picker"
        description="Color Picker는 사용자가 색상을 직접 선택하거나 입력하여 색상 값을 지정할 수 있도록 돕는 컴포넌트입니다. 브랜드 컬러, 차트 색상, 상태 색상, 테마 색상 등 사용자가 색상을 커스터마이징해야 하는 경우에 사용합니다."
        className="picker-guide-page color-picker-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <div className="button-anatomy color-picker-anatomy">
                  <div className="button-guide-artwork button-anatomy__preview">
                    <div className="picker-anatomy__stage">
                      <ColorPickerDemo label="Color" input rows={2} />
                      {[1, 2, 3].map((item) => <span className={`guide-marker guide-marker--${item}`} key={item}>{item}</span>)}
                    </div>
                  </div>
                  <Legend items={['Label', 'Color picker', 'Input field']} />
                </div>
              </SectionBlock>

              <SectionBlock title="Variants">
                <div className="button-variant-explorer picker-variant-explorer">
                  <div className="button-guide-artwork button-variant-explorer__preview">
                    <ColorPickerDemo label={label ? 'Color' : undefined} input={input} rows={rows} />
                  </div>
                  <div className="button-variant-explorer__panel">
                    {[
                      ['Label', [true, false], label, setLabel],
                      ['Input', [true, false], input, setInput],
                      ['Row', [1, 2, 3], rows, setRows],
                    ].map(([name, values, current, setter]) => (
                      <div className="button-control-group" key={name as string}>
                        <span>{name as string}</span>
                        <div className="button-radio-list" role="radiogroup" aria-label={name as string}>
                          {(values as Array<boolean | number>).map((value) => (
                            <label className="button-radio-option" key={String(value)}>
                              <input type="radio" name={`color-${name}`} checked={current === value} onChange={() => (setter as (value: never) => void)(value as never)} />
                              <span className="button-radio-indicator" aria-hidden="true" />
                              <span>{typeof value === 'boolean' ? (value ? 'True' : 'False') : value}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="component-section-copy">Label은 색상 선택의 목적을 명확히 보여줘야 할 때 사용합니다. Input은 정확한 HEX code 입력이나 확인이 필요할 때 제공하고, Row는 색상 수와 화면 너비에 따라 선택합니다.</p>
              </SectionBlock>

              <SectionBlock title="State">
                <div className="picker-state-table color-picker-state-table">
                  {['Enabled', 'Hover', 'Pressed', 'Selected', 'Disabled', 'Placeholder'].map((state, index) => (
                    <div className="button-state-table__row" key={state}>
                      <span>{state}</span>
                      <ColorPickerDemo input={index === 0 || index === 5} rows={1} disabled={state === 'Disabled'} placeholder={state === 'Placeholder'} />
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  <DoDontCard type="do" title="사용자가 색상을 직접 선택하거나 정확한 색상 값을 지정해야 하는 경우 Color Picker를 사용합니다."><ColorPickerDemo /></DoDontCard>
                  <DoDontCard type="dont" title="단순히 색상 정보를 보여주기만 하는 경우 Color Picker를 사용하지 않습니다. Color Swatch나 Badge를 사용합니다."><ColorPickerDemo /></DoDontCard>
                  <DoDontCard type="do" title="정확한 색상 입력이 필요한 경우 Input field를 함께 제공합니다."><ColorPickerDemo input /></DoDontCard>
                  <DoDontCard type="dont" title="사용자가 HEX 값을 알 필요가 없는 간단한 색상 선택 상황에서 불필요하게 Input field를 노출하지 않습니다."><ColorPickerDemo input /></DoDontCard>
                  <DoDontCard type="do" title="색상 선택의 의미가 명확하지 않은 경우 Label을 표시합니다."><ColorPickerDemo label="Background color" /></DoDontCard>
                  <DoDontCard type="dont" title="여러 Color Picker가 한 화면에 있을 때 Label 없이 배치하지 않습니다."><div className="picker-card-stack"><ColorPickerDemo input={false} rows={1} /><ColorPickerDemo input={false} rows={1} /></div></DoDontCard>
                  <DoDontCard type="do" title="선택 가능한 색상은 제품의 color token 또는 사전에 정의된 palette를 우선 사용합니다."><ColorPickerDemo rows={2} /></DoDontCard>
                  <DoDontCard type="dont" title="정의되지 않은 임의 색상을 과도하게 제공하여 제품 내 색상 일관성을 해치지 않습니다."><ColorPickerDemo rows={3} /></DoDontCard>
                  <DoDontCard type="do" title="선택된 색상은 selected state로 명확하게 표시합니다."><ColorPickerDemo rows={1} /></DoDontCard>
                  <DoDontCard type="dont" title="선택 상태와 hover 또는 pressed 상태가 구분되지 않게 만들지 않습니다."><ColorPickerDemo rows={1} /></DoDontCard>
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={['Color Picker의 각 색상 옵션은 keyboard로 이동하고 선택할 수 있어야 합니다.', 'selected, disabled, focused 상태는 색상만이 아니라 border, icon, label 등 비색상 정보로도 구분되어야 합니다.', '스크린 리더가 색상 값을 이해할 수 있도록 HEX code 또는 색상 이름을 accessible label로 제공합니다.', '색상만으로 의미를 전달하지 말고 label 또는 보조 텍스트를 함께 사용합니다.', 'input field가 있는 경우 올바르지 않은 HEX code 입력에 대한 error 상태와 안내 문구를 제공합니다.']} />
              </SectionBlock>

              <SectionBlock title="Content Guideline">
                <TextList items={['Label은 설정 대상이 명확하게 드러나도록 작성합니다.', 'HEX code는 #000000처럼 일관된 형식으로 표시합니다.', 'placeholder는 입력 가능한 값의 형식을 보여줘야 합니다.', '색상 이름을 제공하는 경우 제품 내 token 이름 또는 사용자에게 이해 가능한 이름을 사용합니다.', '여러 색상 설정이 있는 경우 label naming을 일관되게 유지합니다.']} />
              </SectionBlock>
          </>}
          example={<>
              <ExampleCard title="Basic Color Picker" storyId="components-color-picker--basic" />
              <ExampleCard title="Color Picker with Label" storyId="components-color-picker--with-label" />
              <ExampleCard title="Color Picker with Input Field" storyId="components-color-picker--with-input" />
              <ExampleCard title="Multi Row Color Picker" storyId="components-color-picker--multi-row" />
              <ExampleCard title="Disabled Color Picker" storyId="components-color-picker--disabled" />
          </>}
        />
      </ComponentGuideLayout>
  );
}
