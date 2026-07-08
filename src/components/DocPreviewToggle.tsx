import { type ReactElement, useState } from 'react';

type DocPreviewToggleProps = {
  iframeSrc: string;
  iframeHeight?: number;
  code: string;
};

export function DocPreviewToggle({ iframeSrc, iframeHeight = 360, code }: DocPreviewToggleProps): ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="doc-preview-toggle">
      <div className="doc-preview-toggle__frame">
        <div className="doc-preview-toggle__preview" style={{ minHeight: iframeHeight }}>
          <iframe title="Button preview" src={iframeSrc} width="100%" height={iframeHeight} className="doc-preview-toggle__iframe" />
        </div>

        <div className="doc-preview-toggle__controls">
          <div className="doc-preview-toggle__label">Code</div>
          <button
            type="button"
            className="button button--secondary button--sm doc-preview-toggle__toggle"
            aria-expanded={showCode}
            onClick={() => setShowCode((prev) => !prev)}
          >
            {showCode ? 'Hide code' : 'Show code'}
          </button>
        </div>

        {showCode && (
          <div className="doc-preview-toggle__code-section">
            <pre className="doc-preview-toggle__code-block">
              <code className="language-tsx">{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
