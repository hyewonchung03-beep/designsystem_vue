const SLOT_FIGMA_URL =
  'https://www.figma.com/design/YqKny45xSmjr76WGIXeL7P/SOLUM---Component--Shared-?node-id=13907-178638&t=03oN3ZZp9MqCjXwa-4';

function RefreshIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.6141 12.1739L20.5365 12.92L20.4694 13.4209C20.0788 15.8315 18.7043 18.0601 16.5199 19.4375L16.2919 19.5762C12.4493 21.8373 7.60379 20.7269 5.05555 17.1446L4.85721 17.9024L4.66653 18.627L3.24463 18.2383L3.9987 15.3731L3.96708 15.3174L4.02265 15.2852L4.11176 14.9434L4.13476 14.8701C4.26721 14.5149 4.64446 14.3127 5.01243 14.4131L8.24621 15.2959L7.86487 16.7451L6.28486 16.3125C8.40578 19.2399 12.3907 20.1399 15.556 18.2774L15.9297 18.042C17.7533 16.8124 18.8543 14.8495 19.0724 12.7608L19.151 12.0157L20.6141 12.1739ZM8.09674 4.20804C11.8718 2.2395 16.4799 3.3933 18.9431 6.8555L19.1433 6.09769L19.334 5.37308L20.755 5.76175L20.5652 6.48636L20.0009 8.62796L20.0325 8.68265L19.9789 8.7139L19.8888 9.05667C19.8383 9.24881 19.7148 9.41327 19.5458 9.51273C19.3769 9.61192 19.1764 9.63827 18.9881 9.58695L15.7543 8.70413L16.1357 7.25491L17.7138 7.68558C15.6638 4.85796 11.8742 3.92274 8.76553 5.54398L8.44455 5.72269C6.39765 6.92717 5.15981 9.01151 4.92715 11.2393L4.84858 11.9844L3.38548 11.8262L3.46309 11.0801L3.53016 10.5791C3.93422 8.08558 5.39166 5.78729 7.70869 4.42386L8.09674 4.20804Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StorySlot() {
  return (
    <div
      className="flex w-full h-full flex-col items-start"
      style={{
        gap: 'var(--sol-spacing-4)',
        padding: 'var(--sol-spacing-10)',
        border: '1px solid #f640b2',
        background: 'rgba(246, 64, 178, 0.12)',
        color: '#f640b2',
      }}
    >
      <RefreshIcon />
      <a
        href={SLOT_FIGMA_URL}
        target="_blank"
        rel="noreferrer"
        className="font-regular underline"
        style={{
          fontSize: 'var(--sol-font-size-text-xxs)',
          lineHeight: 'var(--sol-line-height-text-xxs)',
          color: 'inherit',
        }}
      >
        ⓘ 슬롯 기능 유의사항
      </a>
    </div>
  );
}
