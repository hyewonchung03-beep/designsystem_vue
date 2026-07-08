import { type ReactElement, useState, useEffect } from 'react';
import {useColorMode} from '@docusaurus/theme-common';
import { storyRegistry } from '@site/src/components/storyRegistry';
import { storySourceMap } from '@site/src/components/storySourceMap';
import {getStorybookStory} from '@site/src/components/storybookStoryManifest';
import {STORYBOOK_BASE_URL, getStorybookIframeUrl, getStorybookUrl} from '@site/src/components/storybookUrls';

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 9.5V2.5A1 1 0 0 1 3 1.5H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7l4 4 6-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 9l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ExampleCardProps = {
  title?: string;
  storyId: string;
  useStorybookIframe?: boolean;
  storybookBaseUrl?: string;
  storybookPathMode?: 'docs' | 'story';
};

export function ExampleCard({
  title,
  storyId,
  useStorybookIframe = false,
  storybookBaseUrl = STORYBOOK_BASE_URL,
  storybookPathMode = 'docs',
}: ExampleCardProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeHeight, setIframeHeight] = useState<number>();
  const {colorMode} = useColorMode();

  const storybookStory = getStorybookStory(storyId);
  const sourceCode = storybookStory?.source || storySourceMap[storyId] || '';
  const entry = storyRegistry[storyId];
  const PreviewComponent = entry?.component;
  const previewArgs = entry?.args ?? {};
  const previewClassName = `example-card__preview${entry?.previewClassName ? ` ${entry.previewClassName}` : ''}`;
  const storybookTheme = colorMode === 'dark' ? 'dark' : 'light';
  const storybookIframeSrc = (storybookPathMode === 'story'
    ? getStorybookIframeUrl({
        storyId,
        theme: storybookTheme,
        embed: 'component',
      })
    : getStorybookUrl({
        storyId,
        storyTitle: storybookStory?.title,
        theme: storybookTheme,
      })
  ).replace(STORYBOOK_BASE_URL, storybookBaseUrl);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sourceCode);
      // Keep the "Copied" UI state until the user clicks Copy again.
      setCopied(true);
      // Notify other ExampleCard instances so only one shows "Copied"
      window.dispatchEvent(new CustomEvent('example-card-copy', { detail: { storyId } }));
    } catch {
      // clipboard API unavailable — silently ignore
    }
  }

  // Listen for copy events from other ExampleCard instances and
  // toggle `copied` only for the matching storyId.
  useEffect(() => {
    const onOtherCopy = (e: Event) => {
      const detail = (e as CustomEvent).detail as { storyId: string } | undefined;
      if (!detail) return;
      setCopied(detail.storyId === storyId);
    };

    window.addEventListener('example-card-copy', onOtherCopy as EventListener);
    return () => window.removeEventListener('example-card-copy', onOtherCopy as EventListener);
  }, [storyId]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; storyId?: string; height?: number } | undefined;
      if (data?.type !== 'storybook-embed-height' || data.storyId !== storyId || typeof data.height !== 'number') return;
      setIframeHeight(Math.ceil(data.height));
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [storyId]);

  return (
    <div className="example-card">
      {title && <h3 className="example-card__heading">{title}</h3>}
      <div className="example-card__frame">

        {/* ── Preview ──────────────────────────────────────────── */}
        <div className={previewClassName}>
          {useStorybookIframe || storybookStory
            ? (
              <iframe
                title={`${title ?? storyId} Storybook preview`}
                src={storybookIframeSrc}
                className="example-card__storybook-iframe"
                style={iframeHeight ? {height: iframeHeight} : undefined}
                loading="lazy"
              />
            )
            : PreviewComponent
            ? <PreviewComponent {...previewArgs} />
            : <span className="example-card__preview-empty">Preview unavailable</span>}
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div className="example-card__divider" />

        {/* ── Code section ─────────────────────────────────────── */}
        {sourceCode && (
          <div className="example-card__code-section">
            <div className={`example-card__code-block${expanded ? ' example-card__code-block--expanded' : ''}`}>

              {/* Header row: Code label + copy button (icon + text) */}
              <div className="example-card__code-top">
                <span className="example-card__code-label">Code</span>
                <button
                  type="button"
                  className={`example-card__copy-btn${copied ? ' example-card__copy-btn--copied' : ''}`}
                  onClick={handleCopy}
                  aria-label={copied ? 'Copied!' : 'Copy source code'}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Collapsible code body */}
              <div className="example-card__code-body">
                <pre className="example-card__pre"><code>{sourceCode}</code></pre>
              </div>

              {/* Show more / Show less */}
              <div className="example-card__show-row">
                <button
                  type="button"
                  className="example-card__show-btn"
                  onClick={() => setExpanded(prev => !prev)}
                >
                  <span>{expanded ? 'Show Less' : 'Show More'}</span>
                  {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
