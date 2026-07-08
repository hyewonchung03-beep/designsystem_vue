import type { ReactNode } from 'react';
import BtnIcon from '../Button/BtnIcon';
import Divider from '../Divider/Divider';
import { BadgeStatus } from '../Badge/BadgeStatus';
import { Select } from '../Select/Select';
import type { SelectOption } from '../Select/Select';

// ── Icons ─────────────────────────────────────────────────────────────────────

function IcGlobe({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.37583 10.6016C4.29318 11.0552 4.25 11.5225 4.25 12C4.25 12.664 4.3335 13.3085 4.49058 13.9235C4.54249 13.9122 4.59641 13.9062 4.65173 13.9062H7.62153C7.56221 13.2897 7.53125 12.6519 7.53125 12C7.53125 11.5336 7.5471 11.0743 7.57784 10.625H4.5625C4.49806 10.625 4.43551 10.6169 4.37583 10.6016ZM4.80077 9.125H7.74055C7.93491 7.83198 8.25823 6.66063 8.68333 5.68898C8.8212 5.37385 8.97193 5.0748 9.13548 4.7966C7.1628 5.58173 5.5887 7.15374 4.80077 9.125ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM12 4.25C11.7347 4.25 11.4228 4.36974 11.0738 4.70718C10.7211 5.04811 10.3693 5.57766 10.0576 6.29021C9.71475 7.07379 9.43825 8.03791 9.259 9.125H14.741C14.5617 8.03791 14.2853 7.07379 13.9424 6.29021C13.6307 5.57766 13.2789 5.04811 12.9262 4.70718C12.5772 4.36974 12.2653 4.25 12 4.25ZM16.2595 9.125C16.0651 7.83198 15.7418 6.66063 15.3167 5.68898C15.1788 5.37385 15.0281 5.0748 14.8645 4.7966C16.8372 5.58173 18.4113 7.15374 19.1992 9.125H16.2595ZM14.9184 10.625H9.08162C9.04859 11.0705 9.03125 11.5299 9.03125 12C9.03125 12.6594 9.06536 13.2976 9.12903 13.9062H14.871C14.9346 13.2976 14.9688 12.6594 14.9688 12C14.9688 11.5299 14.9514 11.0705 14.9184 10.625ZM16.3785 13.9062C16.4378 13.2897 16.4688 12.6519 16.4688 12C16.4688 11.5336 16.4529 11.0743 16.4222 10.625H19.4375C19.5019 10.625 19.5645 10.6169 19.6242 10.6016C19.7068 11.0552 19.75 11.5225 19.75 12C19.75 12.6577 19.6681 13.2963 19.5138 13.9062H16.3785ZM14.6438 15.4062H9.35621C9.53192 16.2773 9.77168 17.0563 10.0576 17.7098C10.3693 18.4223 10.7211 18.9519 11.0738 19.2928C11.4228 19.6303 11.7347 19.75 12 19.75C12.2653 19.75 12.5772 19.6303 12.9262 19.2928C13.2789 18.9519 13.6307 18.4223 13.9424 17.7098C14.2283 17.0563 14.4681 16.2773 14.6438 15.4062ZM14.8645 19.2034C15.0281 18.9252 15.1788 18.6261 15.3167 18.311C15.6828 17.4742 15.9734 16.4893 16.1711 15.4062H18.9633C18.1197 17.1275 16.6566 18.4902 14.8645 19.2034ZM9.13548 19.2034C8.97193 18.9252 8.8212 18.6261 8.68333 18.311C8.31723 17.4742 8.02663 16.4893 7.82886 15.4062H5.03669C5.88031 17.1275 7.34344 18.4902 9.13548 19.2034Z" fill="currentColor"/>
    </svg>
  );
}

function IcBell({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15.4169 20.25V21.75H8.58295V20.25H15.4169ZM11.9999 2.25C16.1996 2.25 19.4531 6.06451 19.457 10.5732L19.4814 12.8271V12.835L19.4872 13.0889C19.5445 14.347 20.0183 15.4031 20.5165 16.1445L20.6132 16.3135C20.8052 16.7157 20.7718 17.1632 20.6513 17.4932C20.5203 17.8518 20.1563 18.375 19.4921 18.375H4.50776C3.84363 18.375 3.47956 17.8518 3.34858 17.4932C3.21084 17.116 3.18707 16.5855 3.48334 16.1445L3.67963 15.8311C4.13218 15.0628 4.5185 14.0339 4.5185 12.835V12.8271L4.54291 10.5732C4.54683 6.06451 7.80033 2.25 11.9999 2.25ZM11.9999 3.75C8.7938 3.75 6.04307 6.71933 6.04291 10.5811V10.5898L6.0185 12.8428C6.01667 14.5184 5.42134 15.9089 4.79486 16.875H19.205C18.5785 15.9089 17.9832 14.5184 17.9814 12.8428L17.957 10.5898V10.5811L17.9492 10.2217C17.7846 6.53663 15.1059 3.75 11.9999 3.75Z" fill="currentColor"/>
    </svg>
  );
}

function IcFlipBackward({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.2498 13.8077C20.2498 11.6358 18.5444 9.92355 16.4998 9.92355H4.76346L7.53982 12.7779L6.45975 13.8087L2.45975 9.69535C2.18009 9.40778 2.18008 8.95314 2.45975 8.66557L6.45975 4.55225L7.53982 5.58299L4.76248 8.43834H16.4998C19.4257 8.43834 21.7498 10.8688 21.7498 13.8077C21.7497 16.7465 19.4256 19.1771 16.4998 19.1771H11.9998V17.6919H16.4998C18.5444 17.6919 20.2497 15.9796 20.2498 13.8077Z" fill="currentColor"/>
    </svg>
  );
}

function IcFlipForward({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.25 13.8077C2.25 10.8688 4.57408 8.43834 7.5 8.43834H19.2373L16.46 5.58299L17.54 4.55225L21.54 8.66557C21.8197 8.95314 21.8197 9.40778 21.54 9.69535L17.54 13.8087L16.46 12.7779L19.2363 9.92355H7.5C5.45536 9.92355 3.75 11.6358 3.75 13.8077C3.75012 15.9796 5.45543 17.6919 7.5 17.6919H12V19.1771H7.5C4.57415 19.1771 2.25012 16.7465 2.25 13.8077Z" fill="currentColor"/>
    </svg>
  );
}

// ── IconTrigger ───────────────────────────────────────────────────────────────

function IconTrigger({
  icon,
  size,
  onClick,
}: {
  icon: ReactNode;
  size: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center justify-center shrink-0 cursor-pointer rounded-full text-element-primary"
      style={{ width: size, height: size }}
    >
      <span
        className="absolute rounded-full bg-interaction-neutral-normal group-hover:bg-interaction-neutral-hover group-active:bg-interaction-neutral-pressed transition-colors duration-150"
        style={{ inset: -4 }}
      />
      <span className="relative">{icon}</span>
    </button>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type HeaderType = 'default' | 'edit';
export type HeaderProfileVariant = 'empty' | 'user1' | 'user2' | 'upload';

export type HeaderProps = {
  type?:            HeaderType;
  storeName?:       string;
  storeOptions?:    SelectOption[];
  onStoreChange?:   (value: string) => void;
  showSelect?:      boolean;
  showNavigator?:   boolean;
  showText?:        boolean;
  text?:            string;
  badgeCount?:      number;
  profileVariant?:  HeaderProfileVariant;
  profileSrc?:      string;
  onBack?:          () => void;
  onForward?:       () => void;
  onClose?:         () => void;
  onSave?:          () => void;
  className?:       string;
};

// ── Header ────────────────────────────────────────────────────────────────────

export function Header({
  type             = 'default',
  storeName        = '',
  storeOptions     = [],
  onStoreChange,
  showSelect       = true,
  showNavigator    = true,
  showText         = true,
  text             = 'Mar 25, 2025(Tue) 14:00 saved',
  badgeCount,
  profileVariant   = 'empty',
  profileSrc,
  onBack,
  onForward,
  onClose,
  onSave,
  className        = '',
}: HeaderProps) {
  return (
    <div className={`bg-surface-default text-element-primary text-left flex flex-col w-full ${className}`}>
      <div className="flex items-center justify-end gap-5 h-16 px-6">

        {type === 'default' && (
          <>
            {showSelect && (
              <Select
                className="w-[260px] shrink-0"
                options={storeOptions}
                value={storeName || undefined}
                placeholder="{Store Name (max. 30 characters)}"
                size="md"
                onChange={onStoreChange}
              />
            )}

            <div className="flex-1 flex items-center justify-end gap-5 min-w-0">
              {/* Globe icon_trigger */}
              <IconTrigger icon={<IcGlobe size={24} />} size={24} />

              {/* Notification bell icon_trigger + badge */}
              <div className="relative shrink-0">
                <IconTrigger icon={<IcBell size={24} />} size={24} />
                {badgeCount !== undefined && badgeCount > 0 && (
                  <div className="absolute top-0 left-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <BadgeStatus type="number" size="sm" count={badgeCount} />
                  </div>
                )}
              </div>

              {/* Profile avatar */}
              <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden bg-fill-subtle flex items-center justify-center">
                {profileSrc ? (
                  <img src={profileSrc} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-element-quaternary">
                    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 14C8.68629 14 6 16.6863 6 20H18C18 16.6863 15.3137 14 12 14Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
            </div>
          </>
        )}

        {type === 'edit' && (
          <>
            {/* Breadcrumb */}
            <p className="flex-1 min-w-0 text-text-sm leading-text-sm text-element-tertiary truncate">
              {storeName}
            </p>

            {/* Right section */}
            <div className="flex gap-2 items-center shrink-0">
              {showNavigator && (
                <div className="flex items-center">
                  {/* Back icon_trigger */}
                  <div className="px-4 py-1">
                    <IconTrigger icon={<IcFlipBackward size={20} />} size={20} onClick={onBack} />
                  </div>
                  <div className="w-px h-4 bg-border-solid-variant shrink-0" />
                  {/* Forward icon_trigger */}
                  <div className="px-4 py-1">
                    <IconTrigger icon={<IcFlipForward size={20} />} size={20} onClick={onForward} />
                  </div>
                </div>
              )}

              {showText && (
                <span className="text-text-xs leading-text-xs text-element-tertiary whitespace-nowrap">
                  {text}
                </span>
              )}

              <div className="flex gap-2 items-center">
                <BtnIcon
                  label="Close"
                  type="secondary"
                  styleType="outline"
                  size="sm"
                  showLeftIcon={false}
                  onClick={onClose}
                />
                <BtnIcon
                  label="Save"
                  type="primary"
                  styleType="solid"
                  size="sm"
                  showLeftIcon={false}
                  onClick={onSave}
                />
              </div>
            </div>
          </>
        )}

      </div>

      {/* Border/solid */}
      <Divider type="horizontal" color="G150" />
    </div>
  );
}
