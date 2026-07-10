export type TooltipInfoProps = {
  className?: string;
  text?: string;
};

export default function TooltipInfo({ className = '', text = 'text' }: TooltipInfoProps) {
  return (
    // NOTE: max-w-[360px] arbitrary value has no matching --sol-* token.
    // CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
    <span className={`inline-flex max-w-[360px] flex-col items-start justify-end ${className}`} role="tooltip">
      <span
        className="inline-flex min-w-0 items-center justify-center overflow-hidden"
        style={{
          // NOTE: maxWidth/minHeight below have no matching --sol-* token.
          // CLAUDE.md violation (no hardcoded px) — left as-is pending a token decision.
          maxWidth: 360,
          minHeight: 18,
          padding: 'var(--sol-spacing-2) var(--sol-spacing-6)',
          borderRadius: 'var(--sol-radius-2)',
          background: 'var(--sol-surface-inverse)',
          color: 'var(--sol-element-inverse)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <span
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-regular"
          style={{
            fontSize: 'var(--sol-font-size-text-xs)',
            lineHeight: 'var(--sol-line-height-text-xs)',
          }}
        >
          {text}
        </span>
      </span>
    </span>
  );
}
