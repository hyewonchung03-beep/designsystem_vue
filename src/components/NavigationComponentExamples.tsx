import React from 'react';
import SideNavigation from '@site/src/components/SideNavigation/SideNavigation';
import {
  IcDashboard01,
  IcHeadquarter,
  IcPipeline,
  IcUserProfile,
  ImgSolum,
} from '@site/src/components/SideNavigation/icons';
import Tabs from '@site/src/components/Tab/Tab';

type BreadcrumbProps = {
  overflow?: boolean;
  currentOnly?: boolean;
};

type TabDemoProps = {
  count?: boolean;
  padded?: boolean;
  sectionTitle?: boolean;
  disabled?: boolean;
};

type IndicatorDemoProps = {
  total?: number;
  active?: number;
  disabled?: boolean;
  carousel?: boolean;
  interactive?: boolean;
};

type StepperStatus = 'active' | 'inactive' | 'completed' | 'error';

type ProgressStepperDemoProps = {
  steps?: string[];
  activeIndex?: number;
  completed?: number[];
  errorIndex?: number;
};

type SideNavigationDemoProps = {
  collapsed?: boolean;
  active?: 'users' | 'dashboard' | 'company';
  showSubnav?: boolean;
};

function Chevron(): React.ReactElement {
  return <span className="nav-demo-chevron" aria-hidden="true">›</span>;
}

function OverflowMenu({items = ['SOLUM', 'My project']}: {items?: string[]}): React.ReactElement {
  return (
    <span className="breadcrumb-demo__overflow-wrap">
      <button type="button" className="breadcrumb-demo__overflow" aria-label="Show hidden breadcrumb items">...</button>
      <span className="breadcrumb-demo__menu">
        {items.map((item) => <span key={item}>{item}</span>)}
      </span>
    </span>
  );
}

export function BreadcrumbDemo({overflow = false, currentOnly = false}: BreadcrumbProps): React.ReactElement {
  if (currentOnly) {
    return (
      <nav className="breadcrumb-demo" aria-label="Breadcrumb">
        <a href="#breadcrumb-home">Home</a>
        <Chevron />
        <span aria-current="page">User Detail</span>
      </nav>
    );
  }

  return (
    <nav className="breadcrumb-demo" aria-label="Breadcrumb">
      <a href="#breadcrumb-home">Home</a>
      <Chevron />
      {overflow ? (
        <>
          <OverflowMenu items={['SOLUM', 'My content', 'Feed']} />
          <Chevron />
        </>
      ) : (
        <>
          <a href="#breadcrumb-solum">SOLUM</a>
          <Chevron />
          <a href="#breadcrumb-project">My project</a>
          <Chevron />
        </>
      )}
      <span aria-current="page">{overflow ? 'Issue #7123' : 'Setting'}</span>
    </nav>
  );
}

export function BreadcrumbBasicExample(): React.ReactElement {
  return <BreadcrumbDemo />;
}

export function BreadcrumbOverflowExample(): React.ReactElement {
  return <BreadcrumbDemo overflow />;
}

export function BreadcrumbCurrentPageExample(): React.ReactElement {
  return <BreadcrumbDemo currentOnly />;
}

type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  padding?: 0 | 12 | 24;
  tone?: 'grey150' | 'grey100';
};

export function DividerDemo({orientation = 'horizontal', padding = 12, tone = 'grey150'}: DividerProps): React.ReactElement {
  return (
    <div className={`divider-demo divider-demo--${orientation}`} style={{'--divider-padding': `${padding}px`} as React.CSSProperties}>
      <div className="divider-demo__block" />
      <span className={`divider-demo__line divider-demo__line--${tone}`} />
      <div className="divider-demo__content">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function DividerHorizontalExample(): React.ReactElement {
  return <DividerDemo orientation="horizontal" padding={12} tone="grey150" />;
}

export function DividerVerticalExample(): React.ReactElement {
  return <DividerDemo orientation="vertical" padding={24} tone="grey100" />;
}

export function DividerInsetExample(): React.ReactElement {
  return <DividerDemo orientation="horizontal" padding={24} tone="grey100" />;
}

type PaginationProps = {
  page?: number;
  total?: number;
  compact?: boolean;
  withInput?: boolean;
};

function PageButton({children, active, disabled}: {children: React.ReactNode; active?: boolean; disabled?: boolean}): React.ReactElement {
  return (
    <button type="button" className={`pagination-demo__item${active ? ' pagination-demo__item--active' : ''}`} disabled={disabled}>
      {children}
    </button>
  );
}

export function PaginationDemo({page = 1, total = 20, compact = false, withInput = false}: PaginationProps): React.ReactElement {
  const pages = compact ? [1, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 10];

  return (
    <nav className="pagination-demo" aria-label="Pagination">
      <PageButton disabled>«</PageButton>
      <PageButton disabled>‹</PageButton>
      {compact && <PageButton>1</PageButton>}
      {compact && <span className="pagination-demo__ellipsis">...</span>}
      {pages.filter((item) => !compact || item !== 1).map((item) => (
        <PageButton key={item} active={item === page}>{item}</PageButton>
      ))}
      <PageButton>›</PageButton>
      <PageButton>»</PageButton>
      {withInput && (
        <label className="pagination-demo__field">
          <input value={page} readOnly aria-label="Page number" />
          <span>of {total} page</span>
        </label>
      )}
    </nav>
  );
}

export function PaginationBasicExample(): React.ReactElement {
  return <PaginationDemo page={1} />;
}

export function PaginationWithInputExample(): React.ReactElement {
  return <PaginationDemo page={1} withInput />;
}

export function PaginationCompactExample(): React.ReactElement {
  return <PaginationDemo page={10} compact />;
}

export function TabDemo({count = false, padded = false, sectionTitle = false, disabled = false}: TabDemoProps): React.ReactElement {
  const labels = count ? ['ESL (3)', 'Gateway (11)', 'Power Rail (5)', 'Newton'] : ['Overview', 'General', 'Limit', 'Design'];
  const tabItems = labels.map((label, index) => ({
    label: label.replace(/\s\(\d+\)/, ''),
    badge: count ? Number(label.match(/\((\d+)\)/)?.[1] ?? 0) : undefined,
    disabled: disabled && index === labels.length - 1,
  }));

  return (
    <div>
      {sectionTitle && (
        <div className="component-section-copy">
          <strong>Devices</strong>
          <br />
          View and manage connected devices.
        </div>
      )}
      <Tabs items={tabItems} size={padded ? 'md' : 'sm'} />
    </div>
  );
}

export function BasicTabExample(): React.ReactElement {
  return <TabDemo />;
}

export function TabWithCountExample(): React.ReactElement {
  return <TabDemo count />;
}

export function TabWithHorizontalPaddingExample(): React.ReactElement {
  return <TabDemo padded />;
}

export function TabWithSectionTitleExample(): React.ReactElement {
  return <TabDemo count sectionTitle />;
}

export function DisabledTabExample(): React.ReactElement {
  return <TabDemo disabled />;
}

export function IndicatorDemo({total = 3, active = 0, disabled = false, carousel = false, interactive = false}: IndicatorDemoProps): React.ReactElement {
  const dots = Array.from({length: total}, (_, index) => index);

  return (
    <div className={carousel ? 'tree-menu-example-wrap' : undefined}>
      {carousel && (
        <div className="button-guide-artwork">
          <span className="example-card__preview-empty">Image</span>
        </div>
      )}
      <div className="button-radio-list" role={interactive ? 'radiogroup' : undefined} aria-label={interactive ? 'Slide indicator' : undefined}>
        {dots.map((item) => (
          <label className="button-radio-option" key={item} aria-label={item === active ? `Current slide ${item + 1} of ${total}` : `Go to slide ${item + 1}`}>
            <input type="radio" name="indicator-demo" checked={item === active} readOnly disabled={disabled} />
            <span className="button-radio-indicator" aria-hidden="true" />
          </label>
        ))}
      </div>
    </div>
  );
}

export function BasicIndicatorExample(): React.ReactElement {
  return <IndicatorDemo />;
}

export function IndicatorSizeExample(): React.ReactElement {
  return (
    <div className="tree-menu-example-wrap tree-menu-example-wrap--split">
      <IndicatorDemo total={3} active={0} />
      <IndicatorDemo total={3} active={0} />
    </div>
  );
}

export function IndicatorInCarouselExample(): React.ReactElement {
  return <IndicatorDemo carousel total={3} active={0} />;
}

export function InteractiveIndicatorExample(): React.ReactElement {
  return <IndicatorDemo interactive total={4} active={1} />;
}

export function DisabledIndicatorExample(): React.ReactElement {
  return <IndicatorDemo total={4} active={0} disabled />;
}

export function SideNavigationDemo({
  collapsed = false,
  active = 'users',
  showSubnav = true,
}: SideNavigationDemoProps): React.ReactElement {
  const activeId = active === 'users' && showSubnav ? 'users-list' : active;
  const items = [
    {id: 'dashboard', label: 'Dashboard', icon: <IcDashboard01 />},
    {id: 'company', label: 'Company management', icon: <IcHeadquarter />},
    {
      id: 'users',
      label: 'User management',
      icon: <IcUserProfile />,
      children: showSubnav
        ? [
          {id: 'users-list', label: 'Users'},
          {id: 'si-partner', label: 'SI Partner'},
          {id: 'access-control', label: 'Access Control'},
        ]
        : undefined,
    },
    {id: 'data', label: 'Data management', icon: <IcPipeline />},
  ];

  return (
    <div className="side-nav-demo">
      <SideNavigation
        items={items}
        profileName="SOLUM"
        profileLogo={<ImgSolum size={36} />}
        defaultActiveId={activeId}
        defaultCollapsed={collapsed}
      />
    </div>
  );
}

export function BasicSideNavigationExample(): React.ReactElement {
  return <SideNavigationDemo />;
}

export function CollapsedSideNavigationExample(): React.ReactElement {
  return <SideNavigationDemo collapsed />;
}

export function SideNavigationWithSubnavExample(): React.ReactElement {
  return <SideNavigationDemo active="users" showSubnav />;
}

function StepperStep({label, index, status}: {label: string; index: number; status: StepperStatus}): React.ReactElement {
  const icon = status === 'completed' ? '✓' : status === 'error' ? '!' : index + 1;

  return (
    <span className={`progress-stepper-demo__step progress-stepper-demo__step--${status}`}>
      <span className="progress-stepper-demo__icon">{icon}</span>
      <span className="progress-stepper-demo__label">{label}</span>
    </span>
  );
}

export function ProgressStepperDemo({
  steps = ['Sign Up', 'Verify', 'Details', 'Complete'],
  activeIndex = 0,
  completed = [],
  errorIndex,
}: ProgressStepperDemoProps): React.ReactElement {
  return (
    <div className="progress-stepper-demo" role="list" aria-label="Progress stepper">
      {steps.map((step, index) => {
        const status: StepperStatus =
          errorIndex === index ? 'error' : completed.includes(index) ? 'completed' : index === activeIndex ? 'active' : 'inactive';

        return <StepperStep key={`${step}-${index}`} label={step} index={index} status={status} />;
      })}
    </div>
  );
}

export function BasicProgressStepperExample(): React.ReactElement {
  return <ProgressStepperDemo steps={['Create', 'Review', 'Submit']} activeIndex={0} />;
}

export function CompletedProgressStepperExample(): React.ReactElement {
  return <ProgressStepperDemo steps={['Setup', 'Verify', 'Complete']} activeIndex={2} completed={[0, 1]} />;
}

export function ErrorProgressStepperExample(): React.ReactElement {
  return <ProgressStepperDemo steps={['Sign Up', 'Verify', 'Details']} activeIndex={1} completed={[0]} errorIndex={1} />;
}

export function MultiStepProgressStepperExample(): React.ReactElement {
  return <ProgressStepperDemo steps={['Setup', 'Verify', 'Details', 'Options']} activeIndex={1} completed={[0]} />;
}

export const navigationComponentSourceMap = {
  breadcrumbBasic: `<nav className="breadcrumb" aria-label="Breadcrumb">
  <a href="/home">Home</a>
  <span aria-hidden="true">›</span>
  <a href="/home/solum">SOLUM</a>
  <span aria-hidden="true">›</span>
  <a href="/home/solum/project">My project</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page">Setting</span>
</nav>`,
  breadcrumbOverflow: `<nav className="breadcrumb" aria-label="Breadcrumb">
  <a href="/home">Home</a>
  <span aria-hidden="true">›</span>
  <button type="button" aria-label="Show hidden breadcrumb items">...</button>
  <span aria-hidden="true">›</span>
  <span aria-current="page">Issue #7123</span>
</nav>`,
  breadcrumbCurrent: `<nav className="breadcrumb" aria-label="Breadcrumb">
  <a href="/home">Home</a>
  <span aria-hidden="true">›</span>
  <span aria-current="page">User Detail</span>
</nav>`,
  dividerHorizontal: `<Divider orientation="horizontal" padding={12} color="grey150" />`,
  dividerVertical: `<Divider orientation="vertical" padding={24} color="grey100" />`,
  dividerInset: `<Divider orientation="horizontal" padding={24} color="grey100" />`,
  paginationBasic: `<Pagination currentPage={1} totalPages={20} />`,
  paginationWithInput: `<Pagination currentPage={1} totalPages={20} showPageInput />`,
  paginationCompact: `<Pagination currentPage={10} totalPages={20} siblingCount={2} />`,
  tabBasic: `<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="general">General</Tabs.Tab>
    <Tabs.Tab value="limit">Limit</Tabs.Tab>
    <Tabs.Tab value="design">Design</Tabs.Tab>
  </Tabs.List>
</Tabs>`,
  tabWithCount: `<Tabs defaultValue="esl">
  <Tabs.List>
    <Tabs.Tab value="esl">ESL (3)</Tabs.Tab>
    <Tabs.Tab value="gateway">Gateway (11)</Tabs.Tab>
    <Tabs.Tab value="power">Power Rail (5)</Tabs.Tab>
  </Tabs.List>
</Tabs>`,
  tabHorizontalPadding: `<Tabs defaultValue="overview" horizontalPadding>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="general">General</Tabs.Tab>
  </Tabs.List>
</Tabs>`,
  tabSectionTitle: `<section>
  <h2>Devices</h2>
  <p>View and manage connected devices.</p>
  <Tabs defaultValue="esl">
    <Tabs.List>
      <Tabs.Tab value="esl">ESL (3)</Tabs.Tab>
      <Tabs.Tab value="gateway">Gateway (11)</Tabs.Tab>
    </Tabs.List>
  </Tabs>
</section>`,
  tabDisabled: `<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="general">General</Tabs.Tab>
    <Tabs.Tab value="limit" disabled>Limit</Tabs.Tab>
  </Tabs.List>
</Tabs>`,
  indicatorBasic: `<Indicator current={0} total={3} />`,
  indicatorSize: `<Indicator current={0} total={3} size="small" />
<Indicator current={0} total={3} size="medium" />`,
  indicatorCarousel: `<Carousel>
  <Carousel.Item />
  <Indicator current={0} total={3} />
</Carousel>`,
  indicatorInteractive: `<Indicator current={1} total={4} interactive />`,
  indicatorDisabled: `<Indicator current={0} total={4} disabled />`,
  sideNavigationBasic: `<SideNavigation>
  <SideNavigation.Brand>SOLUM</SideNavigation.Brand>
  <SideNavigation.Item icon="dashboard">Dashboard</SideNavigation.Item>
  <SideNavigation.Item icon="company">Company management</SideNavigation.Item>
  <SideNavigation.Item icon="users" active>
    User management
  </SideNavigation.Item>
</SideNavigation>`,
  sideNavigationCollapsed: `<SideNavigation collapsed>
  <SideNavigation.Item icon="dashboard">Dashboard</SideNavigation.Item>
  <SideNavigation.Item icon="company">Company management</SideNavigation.Item>
  <SideNavigation.Item icon="users" active>User management</SideNavigation.Item>
</SideNavigation>`,
  sideNavigationSubnav: `<SideNavigation>
  <SideNavigation.Item icon="users" active expanded>
    User management
    <SideNavigation.SubItem active>Users</SideNavigation.SubItem>
    <SideNavigation.SubItem>SI Partner</SideNavigation.SubItem>
    <SideNavigation.SubItem>Access Control</SideNavigation.SubItem>
  </SideNavigation.Item>
</SideNavigation>`,
  progressStepperBasic: `<ProgressStepper activeStep={0} steps={['Create', 'Review', 'Submit']} />`,
  progressStepperCompleted: `<ProgressStepper activeStep={2} completedSteps={[0, 1]} steps={['Setup', 'Verify', 'Complete']} />`,
  progressStepperError: `<ProgressStepper activeStep={1} errorStep={1} completedSteps={[0]} steps={['Sign Up', 'Verify', 'Details']} />`,
  progressStepperMultiStep: `<ProgressStepper activeStep={1} completedSteps={[0]} steps={['Setup', 'Verify', 'Details', 'Options']} />`,
};
