import React from 'react';

type UploadDemoProps = {
  state?: 'default' | 'drag' | 'uploading' | 'done' | 'error' | 'disabled';
  helper?: boolean;
  file?: boolean;
  progress?: number;
  className?: string;
};

function UploadIcon(): React.ReactElement {
  return (
    <span className="upload-demo__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 15V5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 9l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 16.5V18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function FileIcon(): React.ReactElement {
  return (
    <span className="upload-demo__file-icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M4 2.5h5l3 3v8H4v-11Z" fill="currentColor" opacity=".16" />
        <path d="M9 2.5v3h3" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

export function UploadDemo({
  state = 'default',
  helper = true,
  file = true,
  progress = state === 'done' ? 100 : state === 'uploading' ? 58 : 36,
  className = '',
}: UploadDemoProps): React.ReactElement {
  const hasError = state === 'error';
  const disabled = state === 'disabled';

  return (
    <div className={`upload-demo upload-demo--${state} ${className}`}>
      <div className="upload-demo__dropzone">
        <UploadIcon />
        <p>Drag &amp; Drop files here or <span>Browse file</span></p>
        {helper && <small>Supported formats: JPG, PNG, PDF, DOC. Max 25 MB.</small>}
      </div>
      {file && (
        <div className="upload-demo__file">
          <FileIcon />
          <div className="upload-demo__file-main">
            <div className="upload-demo__file-row">
              <strong>File name</strong>
              <span>{hasError ? 'Failed' : disabled ? 'Ready' : `${progress}%`}</span>
            </div>
            <div className="upload-demo__progress" aria-hidden="true">
              <span style={{width: `${hasError ? 100 : progress}%`}} />
            </div>
            {hasError && <em>Upload failed. Please try again.</em>}
          </div>
          <button type="button" aria-label={hasError ? 'Retry upload' : 'Remove file'} disabled={disabled}>
            {hasError ? '↻' : '×'}
          </button>
        </div>
      )}
    </div>
  );
}

export function BasicUploadExample(): React.ReactElement {
  return <UploadDemo state="default" />;
}

export function DragUploadExample(): React.ReactElement {
  return <UploadDemo state="drag" />;
}

export function UploadingExample(): React.ReactElement {
  return <UploadDemo state="uploading" />;
}

export function ErrorUploadExample(): React.ReactElement {
  return <UploadDemo state="error" progress={100} />;
}

export const uploadSourceMap = {
  basic: `<Upload helperText="Supported formats: JPG, PNG, PDF, DOC. Max 25 MB." />`,
  drag: `<Upload state="drag" />`,
  uploading: `<Upload fileName="File name" progress={58} />`,
  error: `<Upload fileName="File name" state="error" errorText="Upload failed. Please try again." />`,
};
