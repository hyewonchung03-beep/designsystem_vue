import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface ElevationType {
  name: string;
  token: string;
  shadow: string;
  usage: string;
}

const ELEVATIONS: ElevationType[] = [
  {
    name: 'Extra Light',
    token: '--sol-shadow-extralight',
    shadow: 'var(--sol-shadow-extralight)',
    usage: '페이지 배경 위 subtle 구분, 최소한의 입체감',
  },
  {
    name: 'Light',
    token: '--sol-shadow-light',
    shadow: 'var(--sol-shadow-light)',
    usage: '카드, 리스트 아이템',
  },
  {
    name: 'Normal',
    token: '--sol-shadow-normal',
    shadow: 'var(--sol-shadow-normal)',
    usage: '기본 부유 요소, 일반 컨테이너',
  },
  {
    name: 'Emphasize',
    token: '--sol-shadow-emphasize',
    shadow: 'var(--sol-shadow-emphasize)',
    usage: '드롭다운, 팝오버',
  },
  {
    name: 'Strong',
    token: '--sol-shadow-strong',
    shadow: 'var(--sol-shadow-strong)',
    usage: '모달, 다이얼로그',
  },
  {
    name: 'Heavy',
    token: '--sol-shadow-heavy',
    shadow: 'var(--sol-shadow-heavy)',
    usage: '토스트, 알림',
  },
];

const SURFACE_ROWS = [
  {
    token: 'surface',
    purpose: '전체 UI의 기준이 되는 기본 표면 레이어입니다.',
  },
  {
    token: 'surface-container-low',
    purpose: '기본 surface 위에서 콘텐츠를 은은하게 구분하기 위한 낮은 단계의 보조 표면입니다.',
  },
  {
    token: 'surface-container',
    purpose:
      '기본 컨테이너 표면으로 카드, 위젯, 사이드바처럼 그룹화된 콘텐츠 영역이나 독립된 내비게이션 영역에 사용합니다.',
  },
  {
    token: 'surface-container-high',
    purpose:
      '시각적 우선순위와 영역 구분을 더 강하게 강조하기 위한 상위 컨테이너 표면입니다. 일시적으로 노출되는 정보나 선택 UI에 적합합니다.',
  },
  {
    token: 'surface-container-highest',
    purpose:
      '플로팅 UI, 중요 액션, 오버레이 등 가장 높은 강조가 필요한 UI에 사용하는 최상위 표면입니다.',
  },
];

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#3d8a53" strokeWidth="1.5" />
    <path d="M7 12l3.5 3.5L17 9" stroke="#3d8a53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CrossIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#b84451" strokeWidth="1.5" />
    <path d="M8 8l8 8M16 8l-8 8" stroke="#b84451" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function ElevationTypeGrid() {
  return (
    <div className="elevation-type-grid">
      {ELEVATIONS.map((el) => (
        <div key={el.name} className="elevation-type-item">
          <div className="elevation-type-item__swatch" style={{ boxShadow: el.shadow }} />
          <p className="elevation-type-item__label">{el.name}</p>
        </div>
      ))}
    </div>
  );
}

export function ElevationLayerStructure() {
  const lightSrc = useBaseUrl('/img/foundation/elevation/layer_1.png');
  const darkSrc  = useBaseUrl('/img/foundation/elevation/layer_2.png');
  return (
    <div className="elevation-layer-structure">
      <div className="elevation-layer-canvas">
        <img src={lightSrc} alt="Elevation layer structure light" width="100%" style={{ display: 'block' }} />
      </div>
      <p className="elevation-layer-desc">
        Elevation 쉐도우 레이어의 레벨에 따라 요소의 위계를 보여줍니다.
      </p>
      <div className="elevation-layer-canvas elevation-layer-canvas--dark">
        <img src={darkSrc} alt="Elevation layer structure dark" width="100%" style={{ display: 'block' }} />
      </div>
      <p className="elevation-layer-desc">
        어두운 테마에서는 그림자가 잘 보이지 않으므로, 표면 색상을 다르게 하여 입체감을 표현합니다.
      </p>
    </div>
  );
}

function formatToken(t: string): string {
  return t.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('-');
}

export function ElevationTable() {
  return (
    <div className="bg-surface-container rounded-sm outline outline-1 -outline-offset-1 outline-border-solid inline-flex flex-col w-full overflow-hidden">
      {/* Header */}
      <div className="bg-surface-container-low border-b border-border-solid-variant flex">
        <div className="w-60 shrink-0 min-h-11 py-3 px-2 flex items-center">
          <span className="text-element-tertiary text-base font-semibold leading-5">Token</span>
        </div>
        <div className="flex-1 min-h-11 py-3 px-2 flex items-center">
          <span className="text-element-tertiary text-base font-semibold leading-5">Purpose</span>
        </div>
      </div>
      {/* Rows */}
      <div className="flex flex-col">
        {SURFACE_ROWS.map((row) => (
          <div key={row.token} className="flex flex-col">
            <div className="flex items-center">
              <div className="w-60 shrink-0 py-2 px-2 flex items-center self-stretch">
                <span className="text-element-secondary text-sm font-normal leading-5">{row.token}</span>
              </div>
              <div className="flex-1 py-2 px-2 flex items-center">
                <span className="text-element-secondary text-sm font-normal leading-5">{row.purpose}</span>
              </div>
            </div>
            <div className="h-px bg-border-solid-variant" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ElevationSurfaceSubsection() {
  const perspSrc  = useBaseUrl('/img/foundation/elevation/elevations_surface-container-low.png');
  const lightSrc  = useBaseUrl('/img/foundation/elevation/elevations_light.png');
  const darkSrc   = useBaseUrl('/img/foundation/elevation/elevations_dark.png');
  return (
    <div className="esfc-subsection">
      <p className="esfc-subsection__heading">surface-container-low</p>
      <div className="esfc-image-frame">
        <img src={perspSrc} alt="surface-container-low perspective" width="100%" className="elevation-perspective-img" style={{ display: 'block' }} />
      </div>
      <p className="esfc-subsection__desc">
        surface-container-low는 기본 surface 위에 배치되는 낮은 단계의 보조 표면입니다.
        <br />
        콘텐츠 그룹을 은은하게 구분하거나, 최소한의 elevation을 표현할 때 사용합니다.
      </p>
      <div className="elevation-examples">
        <div className="elevation-example-card">
          <div className="elevation-example-card__frame">
            <img src={lightSrc} alt="Light mode elevation example" width="100%" style={{ display: 'block' }} />
          </div>
        </div>
        <div className="elevation-example-card elevation-example-card--dark">
          <div className="elevation-example-card__frame">
            <img src={darkSrc} alt="Dark mode elevation example" width="100%" style={{ display: 'block' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ElevationUXGuide() {
  return (
    <div className="elevation-ux-guide">
      <div className="elevation-ux-guide__grid">

        <div className="elevation-ux-example">
          <div className="elevation-ux-example__header">
            <div className="elevation-ux-example__badge elevation-ux-example__badge--do">
              <CheckIcon />
              <span>Do</span>
            </div>
            <div className="elevation-ux-example__divider elevation-ux-example__divider--do" />
          </div>
          <div className="elevation-ux-example__canvas">
            <div className="elevation-ux-table">
              <div className="elevation-ux-table__head">
                <span className="elevation-ux-table__head-label">Last sign in</span>
                <span className="elevation-ux-table__sort">↓≡</span>
              </div>
              {['2026-11-24 11:34:31', '2026-11-24 11:34:31', '2026-11-24 11:34:31'].map((date, index) => (
                <div key={index} className="elevation-ux-table__row">
                  <span>{date}</span>
                  <span className={`elevation-ux-table__more${index === 0 ? ' elevation-ux-table__more--active' : ''}`}>
                    ⋮
                  </span>
                </div>
              ))}
            </div>
            <div className="elevation-ux-menu">
              <div className="elevation-ux-menu__item">Reset Password</div>
              <div className="elevation-ux-menu__item elevation-ux-menu__item--danger">Delete</div>
            </div>
          </div>
          <p className="elevation-ux-example__caption">
            레이어 구분이 필요한 드롭다운, 팝오버와 같은 컴포넌트에 쉐도우를 사용합니다.
          </p>
        </div>

        <div className="elevation-ux-example">
          <div className="elevation-ux-example__header">
            <div className="elevation-ux-example__badge elevation-ux-example__badge--dont">
              <CrossIcon />
              <span>Don't</span>
            </div>
            <div className="elevation-ux-example__divider elevation-ux-example__divider--dont" />
          </div>
          <div className="elevation-ux-example__canvas">
            <div className="elevation-ux-form">
              <div className="elevation-ux-form__group elevation-ux-form__group--muted">
                <p className="elevation-ux-form__label">Label</p>
                <div className="elevation-ux-form__field">Enter full name</div>
              </div>
              <div className="elevation-ux-form__group">
                <p className="elevation-ux-form__label">Label</p>
                <div className="elevation-ux-form__field elevation-ux-form__field--shadow">Enter email address</div>
              </div>
              <div className="elevation-ux-form__group elevation-ux-form__group--muted">
                <p className="elevation-ux-form__label elevation-ux-form__label--required">Password</p>
                <div className="elevation-ux-form__option">
                  <span className="elevation-ux-form__radio" />
                  <span>Auto-generated temporary password</span>
                </div>
              </div>
            </div>
          </div>
          <p className="elevation-ux-example__caption">
            시각적 강조를 위해 인풋, 버튼 등에 쉐도우를 사용하지 않습니다.
          </p>
        </div>

      </div>
    </div>
  );
}
