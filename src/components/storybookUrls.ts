export const STORYBOOK_BASE_URL = 'http://localhost:6006';

const storybookDocsPathByTitle: Record<string, string> = {
  'Components/Accordion': 'components-accordion--docs',
  'Components/Status indicator/Badge': 'components-status-indicator-badge--docs',
  'Components/Status indicator/BadgeCounter': 'components-status-indicator-badgecounter--docs',
  'Components/Status indicator/BadgeRank': 'components-status-indicator-badgerank--docs',
  'Components/Status indicator/BadgeStatus': 'components-status-indicator-badgestatus--docs',
  'Components/Feedback/Banner': 'components-feedback-banner--docs',
  'Components/Navigation/Breadcrumb': 'components-navigation-breadcrumb--docs',
  'Components/Button/Button': 'components-button-button--docs',
  'Components/Card': 'components-card--docs',
  'Components/CardWidget': 'components-cardwidget--docs',
  'Components/Controls/Checkbox': 'components-controls-checkbox--docs',
  'Components/Status indicator/Chip': 'components-status-indicator-chip--docs',
  'Components/Controls/ControlGroup': 'components-controls-controlgroup--docs',
  'Components/Data table/DataTable': 'components-data-table-datatable--docs',
  'Components/Data table/DataTableBodyCell': 'components-data-table-datatablebodycell--docs',
  'Components/Data table/DataTableHeader': 'components-data-table-datatableheader--docs',
  'Components/Data table/DataTableHeaderCell': 'components-data-table-datatableheadercell--docs',
  'Components/Data table/DataTableRow': 'components-data-table-datatablerow--docs',
  'Components/Data table/DataTableSelectCell': 'components-data-table-datatableselectcell--docs',
  'Components/Data table/DataTableToolbar': 'components-data-table-datatabletoolbar--docs',
  'Components/Data table/DataTableTree': 'components-data-table-datatabletree--docs',
  'Components/Data table/DataTableTreeCell': 'components-data-table-datatabletreecell--docs',
  'Components/Divider': 'components-divider--docs',
  'Components/DragAndDrop': 'components-draganddrop--docs',
  'Components/Dropdown/Dropdown': 'components-dropdown-dropdown--docs',
  'Components/Dropdown/DropdownItem': 'components-dropdown-dropdownitem--docs',
  'Components/Status indicator/EmptyState': 'components-status-indicator-emptystate--docs',
  'Components/Button/IconButton': 'components-button-iconbutton--docs',
  'Components/Overlaying surface/Modal': 'components-overlaying-surface-modal--docs',
  'Components/Overlaying surface/Popover': 'components-overlaying-surface-popover--docs',
  'Components/Overlaying surface/Utilities': 'components-overlaying-surface-utilities--docs',
  'Components/Loading/ProgressBar': 'components-loading-progressbar--docs',
  'Components/Controls/Radio': 'components-controls-radio--docs',
  'Components/Feedback/SectionMessage': 'components-feedback-sectionmessage--docs',
  'Components/Button/SegmentedControl': 'components-button-segmentedcontrol--docs',
  'Components/Button/SegmentedControl Solid': 'components-button-segmentedcontrol-solid--docs',
  'Components/Select/Select': 'components-select-select--docs',
  'Components/Select/SelectTrigger': 'components-select-selecttrigger--docs',
  'Components/Navigation/SideNavigation': 'components-navigation-sidenavigation--docs',
  'Components/Loading/Skeleton': 'components-loading-skeleton--docs',
  'Components/Loading/Spinner': 'components-loading-spinner--docs',
  'Components/Button/SplitButton': 'components-button-splitbutton--docs',
  'Components/Structured list/StructuredList': 'components-structured-list-structuredlist--docs',
  'Components/Structured list/StructuredListCell': 'components-structured-list-structuredlistcell--docs',
  'Components/Controls/Switch': 'components-controls-switch--docs',
  'Components/Navigation/Tabs': 'components-navigation-tabs--docs',
  'Components/Input/TextArea': 'components-input-textarea--docs',
  'Components/Input/Textarea': 'components-input-textarea--docs',
  'Components/Input/TextHelper': 'components-input-texthelper--docs',
  'Components/Input/TextInput': 'components-input-textinput--docs',
  'Components/Input/TextLabel': 'components-input-textlabel--docs',
  'Components/Feedback/ToastMessage': 'components-feedback-toastmessage--docs',
  'Components/Button/ToggleButtonGroup': 'components-button-togglebuttongroup--docs',
  'Components/Overlaying surface/Tooltip Pointer': 'components-overlaying-surface-tooltip-pointer--docs',
  'Components/Overlaying surface/Tooltip': 'components-overlaying-surface-tooltip--docs',
  'Components/Overlaying surface/Tooltip Info': 'components-overlaying-surface-tooltip-info--docs',
  'Foundation/Icon': 'foundation-icon--docs',
  'Foundation/Icon/IcTrigger': 'foundation-icon-ictrigger--docs',
};

type StorybookUrlOptions = {
  storyId: string;
  storyTitle?: string;
  args?: string;
  theme?: 'light' | 'dark';
  docPreview?: string;
};

type StorybookIframeUrlOptions = {
  storyId: string;
  args?: string;
  theme?: 'light' | 'dark';
  embed?: 'component';
};

export function getStorybookPath({storyId, storyTitle}: Pick<StorybookUrlOptions, 'storyId' | 'storyTitle'>): string {
  const docsId = storyTitle ? storybookDocsPathByTitle[storyTitle] : undefined;
  return docsId ? `/docs/${docsId}` : `/story/${storyId}`;
}

export function getStorybookUrl({storyId, storyTitle, args, theme, docPreview}: StorybookUrlOptions): string {
  const params = [`path=${getStorybookPath({storyId, storyTitle})}`];

  if (args) params.push(`args=${encodeURIComponent(args)}`);
  if (theme) params.push(`theme=${encodeURIComponent(theme)}`);
  if (docPreview) params.push(`docPreview=${encodeURIComponent(docPreview)}`);

  return `${STORYBOOK_BASE_URL}/?${params.join('&')}`;
}

export function getStorybookIframeUrl({storyId, args, theme, embed}: StorybookIframeUrlOptions): string {
  const params = [
    `id=${encodeURIComponent(storyId)}`,
    'viewMode=story',
  ];

  if (args) params.push(`args=${encodeURIComponent(args)}`);
  if (theme) params.push(`theme=${encodeURIComponent(theme)}`);
  if (embed) params.push(`embed=${encodeURIComponent(embed)}`);

  return `${STORYBOOK_BASE_URL}/iframe.html?${params.join('&')}`;
}
