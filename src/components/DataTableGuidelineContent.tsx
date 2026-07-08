import React, {type ReactNode} from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import {StorybookExampleList} from '@site/src/components/StorybookExampleList';
import {ComponentGuideLayout, ComponentGuideTabs} from '@site/src/components/ComponentGuidelinePrimitives';
import {TableDemo, TableToolbarDemo, TableTreeDemo} from '@site/src/components/DataTableExamples';
import {getStorybookIframeUrl} from '@site/src/components/storybookUrls';

type DataTablePageType = 'table' | 'table-tree' | 'table-toolbar';

type PageConfig = {
  title: string;
  description: string;
  anatomy: string[];
  sections: Array<{title: string; preview: ReactNode; copy: string[]}>;
  usage: Array<{do: string; dont: string; doPreview: ReactNode; dontPreview: ReactNode}>;
  accessibility: string[];
  content: string[];
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

function AnatomyPreview({config, type}: {config: PageConfig; type: DataTablePageType}): React.ReactElement {
  return (
    <div className="button-anatomy data-table-anatomy">
      <div className="button-guide-artwork button-anatomy__preview">
        {type === 'table' && <img src="/img/components/datatable-anatomy.svg" alt="Data table anatomy" className="button-guide-artwork-img" />}
        {type === 'table-tree' && <TableTreeDemo badge levels={3} />}
        {type === 'table-toolbar' && <TableToolbarDemo search actions />}
      </div>
      <div className="button-anatomy__legend">
        {config.anatomy.map((item, index) => (
          <span className="button-anatomy__legend-item" key={item}><b>{index + 1}</b> {item}</span>
        ))}
      </div>
    </div>
  );
}

function OptionPanel({groups}: {groups: Array<{name: string; values: string[]}>}): React.ReactElement {
  return (
    <div className="data-table-option-panel">
      {groups.map((group) => (
        <div className="button-control-group" key={group.name}>
          <span>{group.name}</span>
          <div className="button-radio-list" role="radiogroup" aria-label={group.name}>
            {group.values.map((value, index) => (
              <label key={value} className="button-radio-option">
                <input type="radio" name={`${group.name}-${value}`} checked={index === group.values.length - 1} readOnly />
                <span className="button-radio-indicator" aria-hidden="true" />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function VariantExplorer({type}: {type: DataTablePageType}): React.ReactElement {
  const {colorMode} = useColorMode();
  const groups = type === 'table-tree'
    ? [{name: 'Badge counter', values: ['True', 'False']}, {name: 'Badge', values: ['True', 'False']}]
    : type === 'table-toolbar'
      ? [{name: 'Style', values: ['Metadata', 'Control']}, {name: 'Button', values: ['1', '2', '3']}, {name: 'Search field', values: ['True', 'False']}]
      : [{name: 'Style', values: ['Metadata', 'Control']}, {name: 'Header cell size', values: ['Small', 'Medium']}, {name: 'Body cell size', values: ['Small', 'Medium']}, {name: 'Right column fixed', values: ['True', 'False']}];
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookId = type === 'table-tree'
    ? 'components-data-table-datatabletree--default'
    : type === 'table-toolbar'
      ? 'components-data-table-datatabletoolbar--default'
      : 'components-data-table-datatable--default';
  const storybookSrc = getStorybookIframeUrl({
    storyId: storybookId,
    theme: storybookTheme,
    embed: 'component',
  });

  return (
    <div className="button-variant-explorer data-table-variant-explorer">
      <div className="button-guide-artwork button-variant-explorer__preview">
        <iframe
          title={`${type === 'table-tree' ? 'Data table tree' : type === 'table-toolbar' ? 'Data table toolbar' : 'Data table'} Storybook preview`}
          src={storybookSrc}
          className="button-variant-explorer__iframe"
          loading="lazy"
        />
      </div>
      <div className="button-variant-explorer__panel">
        <OptionPanel groups={groups} />
      </div>
    </div>
  );
}

function GuidePanel({preview, copy}: {preview: ReactNode; copy: string[]}): React.ReactElement {
  return (
    <div className="data-table-guide-panel">
      <div className="button-guide-artwork">{preview}</div>
      <ul>
        {copy.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function TextList({items}: {items: string[]}): React.ReactElement {
  return (
    <div className="data-table-text-list">
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function makeConfig(type: DataTablePageType): PageConfig {
  if (type === 'table-tree') {
    return {
      title: 'Data table tree',
      description: '계층형 데이터를 테이블 구조 안에서 펼치거나 접어 탐색할 수 있도록 제공하는 컴포넌트입니다. 조직, 매장, 카테고리, 권한, 디바이스 그룹처럼 상하위 관계가 있는 데이터를 한 화면에서 구조적으로 확인할 때 사용합니다.',
      anatomy: ['Group header', 'Expand / collapse control', 'Tree row', 'Header cell', 'Body cell', 'Indentation'],
      sections: [
        {title: 'Interaction', preview: <TableTreeDemo selected levels={3} />, copy: ['Hover는 현재 탐색 중인 행을 표시합니다.', 'Pressed는 expand/collapse 또는 row click이 발생하는 순간의 피드백으로 사용합니다.', 'Selected는 사용자가 선택한 항목을 명확하게 표시합니다.', 'Expanded는 하위 항목이 열린 상태를 의미하며 collapse control의 방향도 함께 변경되어야 합니다.']},
        {title: 'Hierarchy', preview: <TableTreeDemo badge levels={4} />, copy: ['계층은 indentation으로 구분합니다.', '최대 depth가 깊어질수록 텍스트 영역이 줄어들기 때문에 필요한 depth만 사용합니다.', '3단계 이상의 계층에서는 label, icon, badge가 서로 겹치지 않도록 충분한 공간을 확보합니다.', '너무 깊은 계층은 가능한 3~4 depth 이내로 제한합니다.']},
      ],
      usage: [
        {do: '상위-하위 관계가 명확한 데이터에만 Data table tree를 사용합니다.', dont: '계층이 없는 평면 데이터를 억지로 Tree 구조로 표현하지 않습니다.', doPreview: <TableTreeDemo levels={3} />, dontPreview: <TableDemo rows={3} />},
        {do: '각 row label은 항목을 식별할 수 있도록 짧고 명확하게 작성합니다.', dont: '첫 번째 컬럼에 긴 설명을 넣어 hierarchy 파악을 어렵게 만들지 않습니다.', doPreview: <TableTreeDemo badge levels={3} />, dontPreview: <TableTreeDemo levels={4} />},
        {do: '사용자가 한눈에 이해할 수 있는 수준의 depth만 제공합니다.', dont: '너무 많은 depth를 중첩하여 탐색 부담을 높이지 않습니다.', doPreview: <TableTreeDemo levels={3} />, dontPreview: <TableTreeDemo levels={4} />},
        {do: '펼침/접힘 상태를 icon과 row 상태로 명확하게 표시합니다.', dont: '펼칠 수 있는 항목과 펼칠 수 없는 항목을 동일하게 표현하지 않습니다.', doPreview: <TableTreeDemo selected levels={3} />, dontPreview: <TableDemo rows={3} />},
        {do: 'level 간 indentation 간격을 일관되게 유지합니다.', dont: 'level마다 다른 간격을 사용해 구조를 혼란스럽게 만들지 않습니다.', doPreview: <TableTreeDemo levels={4} />, dontPreview: <TableTreeDemo badge levels={4} />},
      ],
      accessibility: ['Expand / collapse control은 keyboard로 조작 가능해야 합니다.', '펼침/접힘 상태는 접근성 속성으로 전달되어야 합니다.', '선택된 row와 focus된 row는 시각적으로 명확하게 구분되어야 합니다.', '계층 구조는 screen reader가 상하위 관계를 이해할 수 있도록 의미 구조를 유지해야 합니다.', '색상만으로 선택 상태나 계층을 구분하지 않습니다.'],
      content: ['Tree row label은 짧고 명확하게 작성합니다.', '같은 depth의 항목은 동일한 명명 규칙을 사용합니다.', 'Group header는 하위 항목의 공통 기준을 설명해야 합니다.', 'Badge나 counter는 보조 정보로만 사용하고 주요 label을 대체하지 않습니다.', '너무 긴 label은 말줄임 처리하고 필요 시 tooltip으로 전체 내용을 제공합니다.'],
      examples: [
        {title: 'Basic data table tree', storyId: 'components-table-tree--basic'},
        {title: 'Data table tree with badge', storyId: 'components-table-tree--with-badge'},
        {title: 'Data table tree with selected row', storyId: 'components-table-tree--selected-row'},
        {title: 'Expanded data table tree', storyId: 'components-table-tree--expanded'},
        {title: 'Multi-level hierarchy', storyId: 'components-table-tree--multi-level'},
      ],
    };
  }

  if (type === 'table-toolbar') {
    return {
      title: 'Data table toolbar',
      description: '테이블 상단에서 데이터 탐색, 필터, 표시 개수, 컬럼 구성, 액션 버튼 등 테이블 조작 기능을 제공하는 컴포넌트입니다. 사용자가 현재 보고 있는 데이터의 기준을 이해하고, 필요한 방식으로 데이터를 탐색하거나 조정할 수 있도록 돕습니다.',
      anatomy: ['Result count', 'Page size selector', 'Column visibility selector', 'Search field', 'Action button area'],
      sections: [
        {title: 'Size', preview: <TableToolbarDemo />, copy: ['Data table toolbar의 가로 길이는 Data table container의 width를 기준으로 맞춥니다.', 'Header, data table, pagination과 동일한 alignment를 유지합니다.', '요소가 많아질 경우 우선순위가 낮은 action은 overflow menu 또는 secondary action으로 이동합니다.', '좁은 화면에서는 검색, 필터, action 영역의 줄바꿈 또는 축약 방식을 정의해야 합니다.']},
        {title: 'Placement', preview: <TableDemo actions pagination rows={3} />, copy: ['Data table toolbar는 기본적으로 Data table 상단에 배치합니다.', '데이터 탐색 조건과 action이 테이블에 직접 영향을 주는 경우 Data table과 가까운 위치에 배치합니다.', '페이지 전체 필터와 Data table toolbar의 역할이 중복되지 않도록 구분합니다.', 'Pagination은 Data table 하단에 배치하고 Toolbar는 데이터 표시 조건과 조작 기능을 담당합니다.']},
      ],
      usage: [
        {do: '결과 수, page size, column visibility 등 테이블 상태를 이해하는 데 필요한 정보를 제공합니다.', dont: '테이블과 직접 관련 없는 전역 정보를 toolbar에 넣지 않습니다.', doPreview: <TableToolbarDemo />, dontPreview: <TableToolbarDemo search />},
        {do: '사용 빈도가 높고 중요한 action만 toolbar에 배치합니다.', dont: '모든 action을 toolbar에 나열해 복잡하게 만들지 않습니다.', doPreview: <TableToolbarDemo search actions />, dontPreview: <TableToolbarDemo search actions />},
        {do: '사용자가 필요한 column을 직접 선택할 수 있게 제공합니다.', dont: '컬럼 옵션을 너무 많이 제공해 선택 부담을 높이지 않습니다.', doPreview: <TableToolbarDemo />, dontPreview: <TableToolbarDemo />},
        {do: '검색 대상과 placeholder를 명확하게 작성합니다.', dont: '검색 가능한 범위가 불명확한 search field를 제공하지 않습니다.', doPreview: <TableToolbarDemo search />, dontPreview: <TableToolbarDemo search />},
        {do: 'Toolbar와 Data table의 좌우 alignment를 일치시킵니다.', dont: 'Toolbar 요소가 Data table width를 벗어나거나 시각적으로 분리되어 보이게 만들지 않습니다.', doPreview: <TableDemo pagination rows={2} />, dontPreview: <TableToolbarDemo actions />},
      ],
      accessibility: ['Toolbar 안의 모든 control은 keyboard로 접근 가능해야 합니다.', 'Search field에는 명확한 placeholder 또는 aria-label을 제공합니다.', 'Column visibility selector는 선택된 항목과 선택 가능한 항목을 구분해야 합니다.', 'Action button은 아이콘만 사용할 경우 tooltip 또는 accessible label을 함께 제공합니다.', 'Focus 이동 순서는 화면의 시각적 순서와 일치해야 합니다.'],
      content: ['Result count는 간결한 숫자와 label로 표시합니다.', 'Page size selector label은 사용자가 의미를 빠르게 이해할 수 있게 작성합니다.', 'Search placeholder는 검색 가능한 대상을 명확히 설명합니다.', 'Action button label은 작업 결과를 예측할 수 있는 동사형으로 작성합니다.', 'Column visibility 항목명은 실제 data table header label과 동일하게 유지합니다.'],
      examples: [
        {title: 'Metadata toolbar', storyId: 'components-table-toolbar--metadata'},
        {title: 'Toolbar with search', storyId: 'components-table-toolbar--with-search'},
        {title: 'Toolbar with actions', storyId: 'components-table-toolbar--with-actions'},
        {title: 'Toolbar with column visibility', storyId: 'components-table-toolbar--column-visibility'},
        {title: 'Toolbar with table', storyId: 'components-table-toolbar--with-table'},
      ],
    };
  }

  return {
    title: 'Data table',
    description: 'Data table은 다양한 데이터를 행과 열로 구조화하여 비교, 탐색, 선택, 상태 확인이 가능하도록 제공하는 컴포넌트입니다. 사용자가 많은 정보를 빠르게 스캔하고 필요한 항목을 찾을 수 있도록 정렬, 선택, 페이지네이션, 상태 표시와 함께 사용할 수 있습니다.',
    anatomy: ['Toolbar', 'Data table header', 'Row', 'Column', 'Cell', 'Pagination', 'Empty state', 'Selection checkbox'],
    sections: [
      {title: 'Header & Cell size', preview: <img src="/img/components/datatable-header-cell-size.svg" alt="Data table header and cell size" className="button-guide-artwork-img" />, copy: ['Header와 Body cell의 높이는 데이터 밀도와 가독성에 맞춰 선택합니다.', '같은 테이블 안에서는 Header size와 Body cell size의 조합을 일관되게 유지합니다.', '지나치게 작은 셀 높이는 스캔성을 떨어뜨릴 수 있으므로 복잡한 데이터에는 Medium size를 우선 사용합니다.']},
      {title: 'Row interaction', preview: <TableDemo selectable rows={5} />, copy: ['Hover는 사용자가 현재 탐색 중인 행을 인지할 수 있도록 표시합니다.', 'Pressed는 행 선택 또는 클릭이 발생하는 순간의 피드백으로 사용합니다.', 'Selected 상태는 선택된 행을 명확하게 구분해야 합니다.', 'Disabled 상태의 행은 선택, 클릭, 편집이 불가능해야 합니다.']},
      {title: 'Overflow', preview: <TableDemo status rows={4} />, copy: ['셀 안의 텍스트가 길어질 경우 줄바꿈, 말줄임, tooltip 제공 여부를 데이터 성격에 맞게 결정합니다.', '중요한 식별 정보는 가능한 한 잘리지 않도록 컬럼 폭을 우선 확보합니다.', '보조 정보나 설명성 텍스트는 말줄임 처리 후 tooltip으로 전체 내용을 확인할 수 있도록 합니다.', '동일한 컬럼 안에서는 overflow 처리 방식을 일관되게 유지합니다.']},
      {title: 'Selection', preview: <TableDemo selectable rows={4} />, copy: ['여러 행을 선택해야 하는 경우 checkbox selection을 사용합니다.', '선택된 행은 checkbox와 row background로 함께 표시합니다.', '일부 행만 선택 가능한 경우 disabled checkbox 상태를 명확히 구분합니다.', 'bulk action이 필요한 경우 Data table toolbar와 함께 사용합니다.']},
      {title: 'Header', preview: <TableDemo rows={2} />, copy: ['Header는 컬럼의 의미를 짧고 명확하게 설명해야 합니다.', '정렬 가능한 컬럼에는 sort indicator를 함께 표시합니다.', 'Header label은 동일한 테이블 안에서 문장형/명사형 스타일을 일관되게 유지합니다.']},
      {title: 'Cell', preview: <TableDemo status actions rows={3} />, copy: ['Cell은 데이터의 성격에 맞는 표현 방식을 사용합니다.', '상태값은 Badge 또는 Status Indicator를 사용해 빠르게 구분할 수 있게 합니다.', '숫자, 날짜, 시간 등은 정렬 기준과 표시 포맷을 일관되게 유지합니다.', '행 단위 action은 가능한 오른쪽 column에 배치합니다.']},
      {title: 'Align', preview: <TableDemo status actions rows={3} />, copy: ['텍스트 데이터는 기본적으로 left align을 사용합니다.', '숫자 데이터는 비교가 쉽도록 right align을 사용할 수 있습니다.', '상태, 아이콘, 액션 버튼은 center align을 사용할 수 있습니다.', '같은 컬럼 안에서는 align 방식을 혼합하지 않습니다.']},
    ],
    usage: [
      {do: '데이터 양과 가독성에 맞는 row height를 사용합니다.', dont: '좁은 공간에 너무 많은 정보를 넣어 행의 가독성을 낮추지 않습니다.', doPreview: <TableDemo rows={3} />, dontPreview: <TableDemo rows={5} />},
      {do: '주요 식별 정보는 앞쪽 컬럼에 배치하고, 보조 정보는 뒤쪽에 배치합니다.', dont: '중요도가 낮은 정보를 첫 번째 컬럼에 배치하지 않습니다.', doPreview: <TableDemo status rows={3} />, dontPreview: <TableDemo status rows={3} />},
      {do: '데이터가 없는 경우 명확한 empty state와 필요한 안내 문구를 제공합니다.', dont: '빈 테이블만 보여주어 사용자가 상태를 이해하기 어렵게 만들지 않습니다.', doPreview: <TableDemo empty />, dontPreview: <TableDemo empty />},
      {do: '상태 정보는 badge, color, label을 함께 사용해 의미를 명확히 전달합니다.', dont: '색상만으로 상태를 구분하지 않습니다.', doPreview: <TableDemo status rows={3} />, dontPreview: <TableDemo rows={3} />},
    ],
    accessibility: ['Data table header는 각 column의 의미를 명확히 전달해야 합니다.', 'checkbox selection은 keyboard로 접근 가능해야 합니다.', '선택 상태, disabled 상태, sort 상태는 시각적 표현뿐 아니라 접근성 속성으로도 구분되어야 합니다.', '색상만으로 상태를 전달하지 말고 label 또는 icon을 함께 사용합니다.', 'keyboard focus가 row, checkbox, action button에서 명확하게 표시되어야 합니다.'],
    content: ['Header label은 짧고 명확하게 작성합니다.', '동일한 데이터 유형은 동일한 포맷으로 표시합니다.', '날짜, 시간, 숫자, 단위 표기는 시스템 전체 기준을 따릅니다.', 'Cell 안에 긴 문장을 넣기보다 핵심 정보를 우선 노출합니다.', 'action label은 사용자가 수행할 작업을 명확히 알 수 있는 동사형으로 작성합니다.'],
    examples: [
      {title: 'Basic data table', storyId: 'components-table--basic'},
      {title: 'Selectable data table', storyId: 'components-table--selectable'},
      {title: 'Data table with status', storyId: 'components-table--with-status'},
      {title: 'Data table with pagination', storyId: 'components-table--with-pagination'},
      {title: 'Data table with fixed action column', storyId: 'components-table--fixed-action-column'},
    ],
  };
}

export default function DataTableGuidelineContent({type}: {type: DataTablePageType}): React.ReactElement {
  const config = makeConfig(type);

  return (
    <ComponentGuideLayout
        category="Data table"
        title={config.title}
        description={config.description}
        className="data-table-guide-page"
      >
        <ComponentGuideTabs
          guideline={<>
              <SectionBlock title="Anatomy">
                <AnatomyPreview config={config} type={type} />
              </SectionBlock>

              <SectionBlock title="Variants">
                <VariantExplorer type={type} />
              </SectionBlock>

              {config.sections.map((section) => (
                <SectionBlock title={section.title} key={section.title}>
                  <GuidePanel preview={section.preview} copy={section.copy} />
                </SectionBlock>
              ))}

              <SectionBlock title="Usage Guideline" className="button-guide-section--usage">
                <div className="button-do-dont-grid button-usage-guideline-grid">
                  {config.usage.flatMap((item) => [
                    <DoDontCard key={`${item.do}-do`} type="do" title={item.do}>{item.doPreview}</DoDontCard>,
                    <DoDontCard key={`${item.dont}-dont`} type="dont" title={item.dont}>{item.dontPreview}</DoDontCard>,
                  ])}
                </div>
              </SectionBlock>

              <SectionBlock title="Accessibility">
                <TextList items={config.accessibility} />
              </SectionBlock>

              <SectionBlock title="Content Guidelines">
                <TextList items={config.content} />
              </SectionBlock>
          </>}
          example={
            type === 'table'
              ? <StorybookExampleList storyTitles={['Components/Data table/DataTable']} storybookPathMode="story" />
              : type === 'table-toolbar'
                ? <StorybookExampleList storyTitles={['Components/Data table/DataTableToolbar']} storybookPathMode="story" />
                : <StorybookExampleList storyTitles={['Components/Data table/DataTableTree']} storybookPathMode="story" />
          }
        />
      </ComponentGuideLayout>
  );
}
