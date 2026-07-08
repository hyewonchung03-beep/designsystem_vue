import React from 'react';

type TextStyleRow = {
  token: string;
  size: string;
  foundations: string;
  weight: 'semibold' | 'regular';
  cssVarSize: string;
  cssVarLH: string;
};

type TextStyleGroup = {
  group: string;
  rows: TextStyleRow[];
};

const TEXT_STYLE_GROUPS: TextStyleGroup[] = [
  {
    group: 'HEADLINE',
    rows: [
      { token: 'Headline/lg-emphasized', size: '48/52', foundations: 'Display md',  weight: 'semibold', cssVarSize: '--font-size/display-md',  cssVarLH: '--line-height/display-md'   },
      { token: 'Headline/md-emphasized', size: '36/40', foundations: 'Headline xl', weight: 'semibold', cssVarSize: '--font-size/headline-xl', cssVarLH: '--line-height/headline-xl'  },
      { token: 'Headline/md',            size: '36/40', foundations: 'Headline xl', weight: 'regular',  cssVarSize: '--font-size/headline-xl', cssVarLH: '--line-height/headline-xl'  },
      { token: 'Headline/sm-emphasized', size: '24/28', foundations: 'Headline sm', weight: 'semibold', cssVarSize: '--font-size/headline-sm', cssVarLH: '--line-height/headline-sm'  },
      { token: 'Headline/sm',            size: '24/28', foundations: 'Headline sm', weight: 'regular',  cssVarSize: '--font-size/headline-sm', cssVarLH: '--line-height/headline-sm'  },
    ],
  },
  {
    group: 'SECTION-TITLE',
    rows: [
      { token: 'Section-title/lg',       size: '20/26', foundations: 'Text xl', weight: 'semibold', cssVarSize: '--font-size/text-xl', cssVarLH: '--line-height/text-xl' },
      { token: 'Section-title/md',       size: '18/24', foundations: 'Text lg', weight: 'semibold', cssVarSize: '--font-size/text-lg', cssVarLH: '--line-height/text-lg' },
      { token: 'Section-title/sm',       size: '16/22', foundations: 'Text md', weight: 'semibold', cssVarSize: '--font-size/text-md', cssVarLH: '--line-height/text-md' },
      { token: 'Section-title/xs',       size: '14/20', foundations: 'Text sm', weight: 'semibold', cssVarSize: '--font-size/text-sm', cssVarLH: '--line-height/text-sm' },
      { token: 'Section-title/xs-light', size: '14/20', foundations: 'Text sm', weight: 'regular',  cssVarSize: '--font-size/text-sm', cssVarLH: '--line-height/text-sm' },
    ],
  },
  {
    group: 'BODY',
    rows: [
      { token: 'Body/lg-emphasized', size: '16/22', foundations: 'Text md',  weight: 'semibold', cssVarSize: '--font-size/text-md', cssVarLH: '--line-height/text-md'         },
      { token: 'Body/lg',            size: '16/22', foundations: 'Text md',  weight: 'regular',  cssVarSize: '--font-size/text-md', cssVarLH: '--line-height/text-md'         },
      { token: 'Body/lg-compact',    size: '16/20', foundations: '— (별도)', weight: 'regular',  cssVarSize: '--font-size/text-md', cssVarLH: '--line-height/text-md-compact' },
      { token: 'Body/md-emphasized', size: '14/20', foundations: 'Text sm',  weight: 'semibold', cssVarSize: '--font-size/text-sm', cssVarLH: '--line-height/text-sm'         },
      { token: 'Body/md',            size: '14/20', foundations: 'Text sm',  weight: 'regular',  cssVarSize: '--font-size/text-sm', cssVarLH: '--line-height/text-sm'         },
      { token: 'Body/md-compact',    size: '14/16', foundations: '— (별도)', weight: 'regular',  cssVarSize: '--font-size/text-sm', cssVarLH: '--line-height/text-sm-compact' },
    ],
  },
  {
    group: 'LABEL',
    rows: [
      { token: 'Label/md-emphasized', size: '12/14', foundations: 'Text xs',  weight: 'semibold', cssVarSize: '--font-size/text-xs',  cssVarLH: '--line-height/text-xs'  },
      { token: 'Label/md',            size: '12/14', foundations: 'Text xs',  weight: 'regular',  cssVarSize: '--font-size/text-xs',  cssVarLH: '--line-height/text-xs'  },
      { token: 'Label/sm-emphasized', size: '11/13', foundations: 'Text xxs', weight: 'semibold', cssVarSize: '--font-size/text-xxs', cssVarLH: '--line-height/text-xxs' },
      { token: 'Label/sm',            size: '11/13', foundations: 'Text xxs', weight: 'regular',  cssVarSize: '--font-size/text-xxs', cssVarLH: '--line-height/text-xxs' },
    ],
  },
];

// ─── Typeface ──────────────────────────────────────────────────────────────────

function TypefaceSample({ text, label, semibold }: { text: string; label: string; semibold: boolean }) {
  return (
    <div className="typo-typeface__sample">
      <span className={`typo-typeface__text ${semibold ? 'typo-typeface__text--semibold' : 'typo-typeface__text--regular'}`}>
        {text}
      </span>
      <div className="typo-typeface__bracket" />
      <span className="typo-typeface__sublabel">{label}</span>
    </div>
  );
}

export function TypographyTypeface(): React.ReactElement {
  return (
    <div className="typo-typeface">
      <div className="typo-typeface__row">
        <TypefaceSample text="Pretendard" label="Semibold" semibold />
        <TypefaceSample text="프리텐다드" label="Regular" semibold={false} />
      </div>
    </div>
  );
}

// ─── Type Scale Matrix ─────────────────────────────────────────────────────────

const SIZE_TOKEN_MAP: Record<number, string> = {
  48: 'display-md', 36: 'headline-xl', 24: 'headline-sm',
  20: 'text-xl', 18: 'text-lg', 16: 'text-md',
  14: 'text-sm', 12: 'text-xs', 11: 'text-xxs',
};

const LH_TOKEN_MAP: Record<string, string> = {
  '48/52': 'display-md',  '36/40': 'headline-xl', '24/28': 'headline-sm',
  '20/26': 'text-xl',     '18/24': 'text-lg',     '16/22': 'text-md',
  '16/20': 'text-md-compact', '14/20': 'text-sm', '14/16': 'text-sm-compact',
  '12/14': 'text-xs',     '11/13': 'text-xxs',
};

export function TypographyStyleTable(): React.ReactElement {
  return (
    <div className="typo-scale">
      {TEXT_STYLE_GROUPS.map((group) => (
        <div key={group.group} className="typo-scale__group">
          <p className="typo-scale__group-label">{group.group.charAt(0) + group.group.slice(1).toLowerCase()}</p>
          <div className="typo-scale__table">
            {group.rows.map((row, i) => {
              const [sizePart] = row.size.split('/');
              const size = parseInt(sizePart, 10);
              const fsToken = SIZE_TOKEN_MAP[size];
              const lhToken = LH_TOKEN_MAP[row.size];
              return (
                <React.Fragment key={row.token}>
                  <div className="typo-scale__row">
                    <span className="typo-scale__name typo-scale__col--name">{row.token.split('/')[1]}</span>
                    <span
                      className="typo-scale__preview typo-scale__col--preview"
                      style={{
                        fontSize: fsToken ? `var(--sol-font-size-${fsToken})` : `${size}px`,
                        lineHeight: lhToken ? `var(--sol-line-height-${lhToken})` : 'normal',
                        fontWeight: row.weight === 'semibold' ? 'var(--sol-font-weight-semibold)' : 'var(--sol-font-weight-regular)',
                      }}
                    >
                      Typography
                    </span>
                    <span className="typo-scale__usage typo-scale__col--usage">
                      {row.size.replace('/', ' / ')} · {row.weight === 'semibold' ? 'SemiBold' : 'Regular'}
                    </span>
                  </div>
                  {i < group.rows.length - 1 && <div className="typo-scale__divider" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Font Weight ───────────────────────────────────────────────────────────────

export function TypographyFontWeight(): React.ReactElement {
  return (
    <div className="typo-weight">
      <div className="typo-weight__row">
        <span className="typo-weight__token">--font-weight-regular</span>
        <span className="typo-weight__value">400</span>
      </div>
      <div className="typo-weight__divider" />
      <div className="typo-weight__row">
        <span className="typo-weight__token typo-weight__token--bold">--font-weight-semibold</span>
        <span className="typo-weight__value">600</span>
      </div>
    </div>
  );
}

// ─── Use Case ──────────────────────────────────────────────────────────────────

function CalloutRight({ label }: { label: string }) {
  return (
    <div className="typo-callout typo-callout--right">
      <div className="typo-callout__diamond" />
      <div className="typo-callout__line" />
      <div className="typo-callout__badge">{label}</div>
    </div>
  );
}

function CalloutLeft({ label }: { label: string }) {
  return (
    <div className="typo-callout typo-callout--left">
      <div className="typo-callout__badge">{label}</div>
      <div className="typo-callout__line" />
      <div className="typo-callout__diamond" />
    </div>
  );
}

function PanelUserList() {
  return (
    <div className="typo-uc-panel">
      <div className="typo-uc-mock typo-uc-mock--userlist">
        <div className="typo-uc-mock__toolbar">
          <div className="typo-uc-mock__breadcrumb">
            <span className="typo-uc-mock__crumb-store">Solum</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9.06 6.691a.875.875 0 010 1.238l-3.5 3.5-.619-.619L8.133 7 4.941 3.81l.619-.619 3.5 3.5z" fill="#D0D0D0"/></svg>
            <span className="typo-uc-mock__crumb-child">Gusung Store</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.354 6.355L8.354 10.355a.5.5 0 01-.708 0L3.646 6.355l.708-.707L8 9.295l3.646-3.647.708.707z" fill="#161616"/></svg>
          </div>
        </div>
        <div className="typo-uc-mock__section">
          <span className="typo-uc-mock__page-title">User List</span>
        </div>
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--ul">
        <CalloutRight label="Headline md" />
      </div>
    </div>
  );
}

function PanelDailyVisitors() {
  return (
    <div className="typo-uc-panel">
      <div className="typo-uc-mock typo-uc-mock--widget">
        <div className="typo-uc-mock__widget-header">
          <span className="typo-uc-mock__widget-title">Daily Visitors</span>
        </div>
        <div className="typo-uc-mock__widget-body">
          <div className="typo-uc-mock__metric-label-row">
            <span className="typo-uc-mock__metric-label">Label</span>
            <div className="typo-uc-mock__weather-badge">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="2.625" stroke="#636363" strokeWidth="0.875" />
                <line x1="7" y1="1.3125" x2="7" y2="3.2374" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="7" y1="10.7626" x2="7" y2="12.6875" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="1.3125" y1="7" x2="3.2374" y2="7" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="10.7626" y1="7" x2="12.6875" y2="7" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="2.963" y1="2.963" x2="4.015" y2="4.015" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="9.985" y1="9.985" x2="11.037" y2="11.037" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="11.037" y1="2.963" x2="9.985" y2="4.015" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
                <line x1="4.015" y1="9.985" x2="2.963" y2="11.037" stroke="#636363" strokeWidth="0.875" strokeLinecap="round" />
              </svg>
              <span>16°C</span>
            </div>
          </div>
          <div className="typo-uc-mock__metric-num">27,777</div>
        </div>
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--dv-header">
        <CalloutRight label="Text xl" />
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--dv-value">
        <CalloutLeft label="Headline lg" />
      </div>
    </div>
  );
}

function PanelAddMember() {
  return (
    <div className="typo-uc-panel typo-uc-panel--tall">
      <div className="typo-uc-mock typo-uc-mock--modal">
        <div className="typo-uc-mock__modal-header">
          <span className="typo-uc-mock__modal-title">Add A Member</span>
        </div>
        <div className="typo-uc-mock__modal-body">
          <div className="typo-uc-mock__avatar-wrap">
            <div className="typo-uc-mock__avatar-container">
              <div className="typo-uc-mock__avatar">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="18" r="9" fill="#d0d0d0" />
                  <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="#d0d0d0" />
                </svg>
              </div>
              <div className="typo-uc-mock__camera-btn">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.75 4.375A1.75 1.75 0 013.5 2.625h.656a1.75 1.75 0 001.575-.984l.219-.438A.875.875 0 016.734 1h.532c.336 0 .643.193.784.578l.219.438a1.75 1.75 0 001.575.984H10.5a1.75 1.75 0 011.75 1.75v5.25A1.75 1.75 0 0110.5 11.375h-7a1.75 1.75 0 01-1.75-1.75V4.375z" stroke="#858585" strokeWidth="0.875" />
                  <circle cx="7" cy="6.562" r="2.188" stroke="#858585" strokeWidth="0.875" />
                </svg>
              </div>
            </div>
          </div>
          <div className="typo-uc-mock__fields">
            <div className="typo-uc-mock__field">
              <span className="typo-uc-mock__field-label">Full name <span className="typo-uc-mock__required">*</span></span>
              <div className="typo-uc-mock__input">Enter full name</div>
            </div>
            <div className="typo-uc-mock__field">
              <span className="typo-uc-mock__field-label">Email (ID) <span className="typo-uc-mock__required">*</span></span>
              <div className="typo-uc-mock__input">Enter email address</div>
            </div>
          </div>
        </div>
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--am-title">
        <CalloutRight label="Text xl" />
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--am-label">
        <CalloutRight label="Text sm" />
      </div>
    </div>
  );
}

function PanelDonutChart() {
  const r = 100;
  const circ = 2 * Math.PI * r;
  return (
    <div className="typo-uc-panel typo-uc-panel--tall">
      <div className="typo-uc-mock typo-uc-mock--chart">
        <div className="typo-uc-mock__chart-body">
          <div className="typo-uc-mock__donut-wrap">
            <svg width="240" height="240" viewBox="0 0 240 240" className="typo-uc-mock__donut-svg">
              <circle cx="120" cy="120" r={r} fill="none" stroke="#e8e8e8" strokeWidth="40" />
              {/* Yellow: 62.5%, from 1 o'clock → 8:30 clockwise. offset = (1−0.833)*circ */}
              <circle cx="120" cy="120" r={r} fill="none" stroke="#d4ae00" strokeWidth="40"
                strokeDasharray={`${circ * 0.625} ${circ * 0.375}`}
                strokeDashoffset={circ * 0.167} strokeLinecap="round" />
              {/* Red: 20.8%, from 8:30 → 11:00 clockwise. offset = (1−0.458)*circ */}
              <circle cx="120" cy="120" r={r} fill="none" stroke="#e76067" strokeWidth="40"
                strokeDasharray={`${circ * 0.208} ${circ * 0.792}`}
                strokeDashoffset={circ * 0.542} strokeLinecap="round" />
              <circle cx="120" cy="120" r="80" fill="white" />
            </svg>
            <div className="typo-uc-mock__donut-center">
              <span className="typo-uc-mock__donut-label">Issue Detected</span>
              <span className="typo-uc-mock__donut-num">100</span>
              <span className="typo-uc-mock__donut-sub">Total Devices <strong>6,124</strong></span>
            </div>
          </div>
        </div>
      </div>
      <div className="typo-uc-callout-anchor typo-uc-callout-anchor--donut">
        <CalloutRight label="Headline lg" />
      </div>
    </div>
  );
}

export function TypographyUseCase(): React.ReactElement {
  return (
    <div className="typo-usecase">
      <PanelUserList />
      <PanelDailyVisitors />
      <PanelAddMember />
      <PanelDonutChart />
    </div>
  );
}
