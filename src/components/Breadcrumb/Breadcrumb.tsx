import { useState, useRef, useEffect } from 'react';

export type BreadcrumbItemDef = {
  label: string;
  href?: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItemDef[];
  maxItems?: number;
};

function ChevronRightIcon() {
  // 16px 사이즈에서 regular variant 렌더링 이슈로 임시로 bold 사용, 추후 수정 필요
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.7959 11.2041C16.2352 11.6434 16.2352 12.3566 15.7959 12.7959L9.7959 18.7959L8.2041 17.2041L13.4082 12L8.2041 6.7959L9.7959 5.2041L15.7959 11.2041Z" fill="currentColor" />
    </svg>
  );
}

function MoreHorizIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="4" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ItemTooltip({ label }: { label: string }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-0 top-6 z-20 flex max-w-[240px] flex-col items-start"
    >
      <span className="flex items-center justify-center rounded-2 bg-surface-inverse px-[6px] py-[2px] backdrop-blur-[2px]">
        <span className="whitespace-nowrap text-text-xs leading-text-xs text-element-inverse">
          {label}
        </span>
      </span>
    </span>
  );
}

function useTruncated(label: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
  }, [label]);

  return { ref, isTruncated };
}

function BreadcrumbLink({ label, href }: { label: string; href?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { ref: textRef, isTruncated } = useTruncated(label);

  return (
    <span className="relative flex items-center">
      <a
        href={href ?? '#'}
        className="relative flex items-center no-underline text-element-quaternary focus:outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span
          ref={textRef}
          className={`text-text-sm leading-text-sm max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap${isHovered || isFocused ? ' underline' : ''}`}
        >
          {label}
        </span>
        {isFocused && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -inset-x-0.5 rounded-4 border-2 border-primary"
          />
        )}
      </a>
      {(isHovered || isFocused) && isTruncated && <ItemTooltip label={label} />}
    </span>
  );
}

function BreadcrumbCurrent({ label }: { label: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { ref: textRef, isTruncated } = useTruncated(label);

  return (
    <span className="relative flex items-center">
      <span
        aria-current="page"
        tabIndex={0}
        className="relative flex items-center focus:outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span
          ref={textRef}
          className={`text-text-sm leading-text-sm font-semibold text-element-brand-variant max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap${isHovered || isFocused ? ' underline' : ''}`}
        >
          {label}
        </span>
        {isFocused && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -inset-x-0.5 rounded-4 border-2 border-primary"
          />
        )}
      </span>
      {(isHovered || isFocused) && isTruncated && <ItemTooltip label={label} />}
    </span>
  );
}

export default function Breadcrumb({ items, maxItems }: BreadcrumbProps) {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const overflowRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setOverflowOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  if (!items.length) return null;

  const current = items[items.length - 1];
  const links = items.slice(0, -1);

  const shouldCollapse = maxItems !== undefined && links.length > maxItems;
  const visibleLinks = shouldCollapse ? links.slice(0, maxItems) : links;
  const hiddenLinks  = shouldCollapse ? links.slice(maxItems)  : [];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1">
        {visibleLinks.map((item, i) => (
          <li key={i} className="flex items-center gap-1 text-element-quaternary">
            <BreadcrumbLink label={item.label} href={item.href} />
            <ChevronRightIcon />
          </li>
        ))}

        {hiddenLinks.length > 0 && (
          <li ref={overflowRef} className="relative flex items-center gap-1 text-element-quaternary">
            <button
              type="button"
              aria-label="더 보기"
              aria-expanded={overflowOpen}
              onClick={() => setOverflowOpen(v => !v)}
              className="flex items-center justify-center size-5 rounded-full hover:bg-fill-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <MoreHorizIcon />
            </button>
            <ChevronRightIcon />
            {overflowOpen && (
              <ul className="absolute left-0 top-7 z-10 min-w-[146px] rounded-4 bg-surface-container-high p-1 shadow-emphasize">
                {hiddenLinks.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href ?? '#'}
                      onClick={() => setOverflowOpen(false)}
                      className="flex items-center min-h-8 px-2 py-1.5 rounded-2 text-text-sm leading-text-sm text-element-primary hover:bg-fill-subtle"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}

        <li>
          <BreadcrumbCurrent label={current.label} />
        </li>
      </ol>
    </nav>
  );
}
