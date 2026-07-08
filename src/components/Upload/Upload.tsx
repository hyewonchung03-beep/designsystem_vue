import { UploadArea, type UploadAreaState } from './UploadArea';
import { UploadItem, type UploadItemState } from './UploadItem';

export type UploadFileItem = {
  id: string;
  fileName: string;
  fileSize: string;
  timeLeft?: string;
  showSubtext?: boolean;
  value: number;
  state: UploadItemState;
  onPause?: () => void;
  onRemove?: () => void;
};

export type UploadProps = {
  hint?: string;
  browseLabel?: string;
  barState?: UploadAreaState;
  files?: UploadFileItem[];
  onChange?: (files: FileList) => void;
  className?: string;
};

export function Upload({
  hint,
  browseLabel,
barState = 'default',
  files = [],
  onChange,
  className = '',
}: UploadProps) {
  return (
    <div className={`flex flex-col w-full ${className}`} style={{ gap: 'var(--sol-spacing-8)' }}>
      <UploadArea
        hint={hint}
        browseLabel={browseLabel}
        state={barState}
        onChange={onChange}
      />
      {files.length > 0 && (
        <div className="flex flex-col w-full" style={{ gap: 'var(--sol-spacing-8)' }}>
          {files.map((file) => (
            <UploadItem
              key={file.id}
              fileName={file.fileName}
              fileSize={file.fileSize}
              timeLeft={file.timeLeft}
              showSubtext={file.showSubtext}
              value={file.value}
              state={file.state}
              onPause={file.onPause}
              onRemove={file.onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
