import type { ReactNode } from 'react';
import { IcResponsive } from '../Icon/IcResponsive';
import { TooltipPointer } from './TooltipPointer';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  className?: string;
  placement?: TooltipPlacement;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  text?: string;
};

const pointerPositionByPlacement: Record<TooltipPlacement, React.CSSProperties> = {
  top: {
    bottom: -8,
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
    transformOrigin: 'center',
  },
  bottom: {
    top: -8,
    left: '50%',
    transform: 'translateX(-50%)',
    transformOrigin: 'center',
  },
  left: {
    top: '50%',
    right: -64,
    transform: 'translateY(-50%) rotate(90deg)',
    transformOrigin: 'center',
  },
  right: {
    top: '50%',
    left: -64,
    transform: 'translateY(-50%) rotate(-90deg)',
    transformOrigin: 'center',
  },
};

function TooltipIcon({ children }: { children?: ReactNode }) {
  return (
    <IcResponsive size={14} className="text-element-inverse">
      {children}
    </IcResponsive>
  );
}

export default function Tooltip({
  className = '',
  placement = 'bottom',
  showLeadingIcon = true,
  showTrailingIcon = true,
  leadingIcon,
  trailingIcon,
  text = 'text',
}: TooltipProps) {
  return (
    <span
      className={`relative inline-flex max-w-[360px] items-center text-element-inverse ${className}`}
      role="tooltip"
    >
      <span
        className="inline-flex min-w-0 items-center justify-center overflow-hidden bg-surface-inverse text-element-inverse"
        style={{
          gap: 'var(--sol-spacing-4)',
          maxWidth: 360,
          minHeight: 24,
          padding: 'var(--sol-spacing-4) var(--sol-spacing-8)',
          borderRadius: 'var(--sol-radius-4)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {showLeadingIcon && <TooltipIcon>{leadingIcon}</TooltipIcon>}
        <span
          className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-regular"
          style={{
            fontSize: 'var(--sol-font-size-text-sm)',
            lineHeight: 'var(--sol-line-height-text-xs-2line)',
          }}
        >
          {text}
        </span>
        {showTrailingIcon && <TooltipIcon>{trailingIcon}</TooltipIcon>}
      </span>
      <span
        className="pointer-events-none absolute flex items-center justify-center"
        style={pointerPositionByPlacement[placement]}
        aria-hidden="true"
      >
        <TooltipPointer color="black" size="sm" placement="center" fill="var(--sol-surface-inverse)" />
      </span>
    </span>
  );
}
