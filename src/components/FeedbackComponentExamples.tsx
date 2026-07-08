import React from 'react';

type FeedbackTone = 'error' | 'warning' | 'info' | 'success' | 'brand' | 'announcement' | 'activity';

type ToastDemoProps = {
  tone?: FeedbackTone;
  title?: string;
  description?: string;
  action?: string;
  progress?: boolean;
};

type SectionMessageDemoProps = {
  tone?: FeedbackTone;
  title?: string;
  description?: string;
  action?: string;
  dismissible?: boolean;
};

type BannerDemoProps = {
  tone?: FeedbackTone;
  text?: string;
  action?: string;
  dismissible?: boolean;
};

function StatusIcon({tone = 'error'}: {tone?: FeedbackTone}): React.ReactElement {
  return <span className={`feedback-demo-icon feedback-demo-icon--${tone}`} aria-hidden="true">!</span>;
}

function CloseButton({small = false}: {small?: boolean}): React.ReactElement {
  return <button type="button" className={`feedback-demo-close${small ? ' feedback-demo-close--sm' : ''}`} aria-label="Close">×</button>;
}

export function ToastDemo({
  tone = 'success',
  title = 'Changes saved.',
  description,
  action,
  progress = false,
}: ToastDemoProps): React.ReactElement {
  return (
    <div className={`feedback-toast feedback-tone--${tone}${description ? ' feedback-toast--with-description' : ''}`}>
      <div className="feedback-toast__body">
        <StatusIcon tone={tone} />
        <div className="feedback-toast__content">
          <strong>{title}</strong>
          {description && <span>{description}</span>}
        </div>
        {action && <button type="button" className="feedback-demo-action">{action}</button>}
        <CloseButton />
      </div>
      {progress && <span className="feedback-toast__progress" />}
    </div>
  );
}

export function SectionMessageDemo({
  tone = 'error',
  title = 'Unable to load data',
  description,
  action,
  dismissible = true,
}: SectionMessageDemoProps): React.ReactElement {
  return (
    <section className={`feedback-section-message feedback-tone--${tone}`}>
      <StatusIcon tone={tone} />
      <div className="feedback-section-message__content">
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </div>
      {action && <button type="button" className="feedback-demo-action">{action}</button>}
      {dismissible && <CloseButton small />}
    </section>
  );
}

export function BannerDemo({
  tone = 'announcement',
  text = 'Service maintenance is scheduled for tonight.',
  action,
  dismissible = true,
}: BannerDemoProps): React.ReactElement {
  return (
    <aside className={`feedback-banner feedback-tone--${tone}`}>
      <StatusIcon tone={tone} />
      <strong>{text}</strong>
      {action && <button type="button" className="feedback-banner__action">{action}</button>}
      {dismissible && <CloseButton small />}
    </aside>
  );
}

export function BasicToastExample(): React.ReactElement {
  return <ToastDemo title="Changes saved." />;
}

export function ToastWithDescriptionExample(): React.ReactElement {
  return <ToastDemo title="Notification" description="This is a notification" />;
}

export function ToastWithActionExample(): React.ReactElement {
  return <ToastDemo tone="error" title="Upload failed." action="Try Again" />;
}

export function ToastWithProgressExample(): React.ReactElement {
  return <ToastDemo title="Notification" description="This is a notification" progress />;
}

export function SuccessToastExample(): React.ReactElement {
  return <ToastDemo tone="success" title="Profile updated successfully." />;
}

export function ErrorToastExample(): React.ReactElement {
  return <ToastDemo tone="error" title="Failed to save changes." />;
}

export function BasicSectionMessageExample(): React.ReactElement {
  return <SectionMessageDemo title="Unable to load data" />;
}

export function SectionMessageWithDescriptionExample(): React.ReactElement {
  return <SectionMessageDemo title="Unable to load data" description="This section cannot be displayed right now. Please refresh the page or try again later." />;
}

export function SectionMessageWithLinkExample(): React.ReactElement {
  return <SectionMessageDemo tone="brand" title="You are not allowed to change these restrictions." action="Request Edit Access" />;
}

export function SectionMessageWithDismissExample(): React.ReactElement {
  return <SectionMessageDemo tone="info" title="Setup is complete. You can now invite team members." action="Invite Members" dismissible />;
}

export function ErrorSectionMessageExample(): React.ReactElement {
  return <SectionMessageDemo tone="error" title="Unable to load data" description="The data could not be loaded because the server failed to respond." />;
}

export function SuccessSectionMessageExample(): React.ReactElement {
  return <SectionMessageDemo tone="success" title="Setup is complete. You can now invite team members." action="Invite Members" />;
}

export function BasicBannerExample(): React.ReactElement {
  return <BannerDemo />;
}

export function ErrorBannerExample(): React.ReactElement {
  return <BannerDemo tone="error" text="We are unable to save changes right now." action="Try Again" />;
}

export function WarningBannerExample(): React.ReactElement {
  return <BannerDemo tone="warning" text="Service maintenance is scheduled for tonight." action="Learn More" />;
}

export function AnnouncementBannerExample(): React.ReactElement {
  return <BannerDemo tone="announcement" text="A new update is available." action="Learn More" />;
}

export function BannerWithLinkExample(): React.ReactElement {
  return <BannerDemo tone="brand" text="You do not have permission to edit this page." action="Request Access" />;
}

export function DismissibleBannerExample(): React.ReactElement {
  return <BannerDemo tone="announcement" text="A new update is available." action="Learn More" dismissible />;
}

export const feedbackComponentSourceMap = {
  basicToast: `<ToastMessage title="Changes saved." />`,
  toastDescription: `<ToastMessage
  title="Notification"
  description="This is a notification"
/>`,
  toastAction: `<ToastMessage
  type="error"
  title="Upload failed."
  actionLabel="Try Again"
/>`,
  toastProgress: `<ToastMessage
  title="Notification"
  description="This is a notification"
  showProgress
/>`,
  toastSuccess: `<ToastMessage type="success" title="Profile updated successfully." />`,
  toastError: `<ToastMessage type="error" title="Failed to save changes." />`,
  sectionBasic: `<SectionMessage title="Unable to load data" />`,
  sectionDescription: `<SectionMessage
  title="Unable to load data"
  description="This section cannot be displayed right now. Please refresh the page or try again later."
/>`,
  sectionLink: `<SectionMessage
  type="brand"
  title="You are not allowed to change these restrictions."
  linkLabel="Request Edit Access"
/>`,
  sectionDismiss: `<SectionMessage
  type="info"
  title="Setup is complete. You can now invite team members."
  dismissible
/>`,
  sectionError: `<SectionMessage
  type="error"
  title="Unable to load data"
  description="The data could not be loaded because the server failed to respond."
/>`,
  sectionSuccess: `<SectionMessage
  type="success"
  title="Setup is complete. You can now invite team members."
  linkLabel="Invite Members"
/>`,
  bannerBasic: `<Banner text="Service maintenance is scheduled for tonight." />`,
  bannerError: `<Banner type="error" text="We are unable to save changes right now." linkLabel="Try Again" />`,
  bannerWarning: `<Banner type="warning" text="Service maintenance is scheduled for tonight." linkLabel="Learn More" />`,
  bannerAnnouncement: `<Banner type="announcement" text="A new update is available." linkLabel="Learn More" />`,
  bannerLink: `<Banner type="brand" text="You do not have permission to edit this page." linkLabel="Request Access" />`,
  bannerDismissible: `<Banner text="A new update is available." linkLabel="Learn More" dismissible />`,
};
