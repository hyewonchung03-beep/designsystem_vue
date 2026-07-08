import type { ReactNode } from 'react';

export type DragAndDropProps = {
  /** 안내 텍스트 */
  text?: ReactNode;
  className?: string;
};

export function DragAndDrop({
  text = 'Drag and drop widgets on your dashboard',
  className = '',
}: DragAndDropProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-surface-container border border-border-normal rounded-4 w-full ${className}`}
      style={{
        padding: 'var(--sol-spacing-24)',
        gap: 'var(--sol-spacing-8)',
        borderStyle: 'dashed',
      }}
    >
      <span aria-hidden="true" className="shrink-0 text-element-quaternary" style={{ display: 'block', width: 24, height: 24 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2.89844 18.3083V17.158H4.39844V18.3083C4.3985 18.9986 4.95812 19.5583 5.64844 19.5583H6.79883V21.0583H5.64844C4.1297 21.0583 2.8985 19.8271 2.89844 18.3083ZM15.5098 18.3083V17.3582H17.0098V18.3083C17.0097 19.827 15.7785 21.0583 14.2598 21.0583H13.1094V19.5583H14.2598C14.95 19.5583 15.5097 18.9986 15.5098 18.3083ZM2.89844 9.69702C2.89844 8.17824 4.12965 6.94702 5.64844 6.94702H6.59863V8.44702H5.64844C4.95808 8.44702 4.39844 9.00667 4.39844 9.69702V10.8474H2.89844V9.69702Z" fill="currentColor"/>
          <path d="M4.39844 15.6362H2.89844L2.89844 12.3687H4.39844L4.39844 15.6362Z" fill="currentColor"/>
          <path d="M8.31934 21.0582V19.5582H11.5889V21.0582H8.31934Z" fill="currentColor"/>
          <path d="M19.6016 5.69165C19.6016 5.00132 19.0419 4.44169 18.3516 4.44165H10.3115C9.62117 4.44165 9.06152 5.0013 9.06152 5.69165V13.7317C9.06156 14.422 9.62119 14.9817 10.3115 14.9817H18.3516C19.0419 14.9817 19.6015 14.422 19.6016 13.7317V5.69165ZM21.1016 13.7317C21.1015 15.2504 19.8703 16.4817 18.3516 16.4817H10.3115C8.79276 16.4817 7.56156 15.2504 7.56152 13.7317V5.69165C7.56152 4.17287 8.79274 2.94165 10.3115 2.94165H18.3516C19.8703 2.94169 21.1016 4.17289 21.1016 5.69165V13.7317Z" fill="currentColor"/>
        </svg>
      </span>
      {text && (
        <p
          className="text-element-quaternary font-regular text-center"
          style={{
            fontSize: 'var(--sol-font-size-text-sm)',
            lineHeight: 'var(--sol-line-height-text-xs-2line)',
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}
