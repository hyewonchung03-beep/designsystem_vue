import { MapviewPinBg } from './MapviewPinBg';
import { MapviewPinIcon, type MapviewPinIconType, type MapviewPinIconOption } from './MapviewPinIcon';

export type MapviewPinType = 'icon' | 'occupancy' | 'Issues';
export type MapviewPinAlertColor = 'red' | 'yellow';

export type MapviewPinProps = {
  type?: MapviewPinType;
  selected?: boolean;
  showAlert?: boolean;
  alertColor?: MapviewPinAlertColor;
  text?: string;
  iconType?: MapviewPinIconType;
  iconOption?: MapviewPinIconOption;
  showIconNumber?: boolean;
  iconCount?: number;
  className?: string;
};

function IcWarningRed({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.4638 5.12823C10.085 2.49046 13.9158 2.49046 15.537 5.12823C15.5435 5.13878 15.5496 5.1496 15.5556 5.16045L21.2167 15.4964C21.5864 16.1034 21.9181 16.957 21.6581 17.8538C21.1566 19.5833 19.562 20.8499 17.6699 20.8499H6.33001C4.43803 20.8497 2.84424 19.5831 2.34271 17.8538C2.08269 16.957 2.41447 16.1034 2.78411 15.4964L8.44525 5.16045C8.4512 5.14959 8.45732 5.13878 8.4638 5.12823Z" fill="#E76067"/>
      <path d="M11.25 15.5278H12.75V17.0679H11.25V15.5278ZM11.25 7.61963H12.75V13.6616H11.25V7.61963Z" fill="white"/>
    </svg>
  );
}

function IcWarningYellow({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.4638 5.12823C10.085 2.49046 13.9158 2.49046 15.537 5.12823C15.5435 5.13878 15.5496 5.1496 15.5556 5.16045L21.2167 15.4964C21.5864 16.1034 21.9181 16.957 21.6581 17.8538C21.1566 19.5833 19.562 20.8499 17.6699 20.8499H6.33001C4.43803 20.8497 2.84424 19.5831 2.34271 17.8538C2.08269 16.957 2.41447 16.1034 2.78411 15.4964L8.44525 5.16045C8.4512 5.14959 8.45732 5.13878 8.4638 5.12823Z" fill="#D4AE00"/>
      <path d="M11.25 15.5278H12.75V17.0679H11.25V15.5278ZM11.25 7.61963H12.75V13.6616H11.25V7.61963Z" fill="white"/>
    </svg>
  );
}

export function MapviewPin({
  type = 'icon',
  selected = false,
  showAlert = false,
  alertColor = 'red',
  text = 'NN',
  iconType = 'device',
  iconOption = 'gateway',
  showIconNumber = false,
  iconCount = 2,
  className = '',
}: MapviewPinProps) {
  const isLarge = selected && (type === 'icon' || type === 'Issues');
  const size = isLarge ? 84 : 66;

  const pinBgInsetPct = isLarge
    ? { top: 0.0947, side: 0.1548 }
    : { top: 0.0909, side: 0.1515 };
  const pinTop = size * pinBgInsetPct.top;
  const pinSide = size * pinBgInsetPct.side;
  const pinW = size - pinSide * 2;
  const pinH = pinW * (54 / 46);

  const circleRadius = pinW / 2;
  const circleCenterX = pinSide + circleRadius;
  const circleCenterY = pinTop + circleRadius;

  const iconSize = isLarge ? 36 : 28;
  const iconTop = circleCenterY - iconSize / 2;
  const iconLeft = circleCenterX - iconSize / 2;

  const textTailOffset = isLarge ? 5 : 4;
  const textTop = size / 2 - textTailOffset;
  const textWidth = isLarge ? 58 : 46;

  const alertSize = isLarge ? 30 : 24;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Bottom shadow oval */}
      <div
        className="absolute"
        style={{
          left: '39%',
          right: '39%',
          bottom: '6%',
          height: 5,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 100%)',
          opacity: 0.8,
        }}
      />

      {/* Pin background */}
      <div
        className="absolute"
        style={{
          top: pinTop,
          left: pinSide,
          width: pinW,
          height: pinH,
          filter: 'drop-shadow(0px 2px 6px rgba(0,0,0,0.16))',
        }}
      >
        <MapviewPinBg />
      </div>

      {/* Icon */}
      {type === 'icon' && (
        <div
          className="absolute overflow-clip"
          style={{ top: iconTop, left: iconLeft, width: iconSize, height: iconSize }}
        >
          <MapviewPinIcon
            type={iconType}
            option={iconOption}
            showNumber={showIconNumber}
            count={iconCount}
            size={iconSize}
          />
        </div>
      )}

      {/* Text (occupancy / Issues) */}
      {(type === 'occupancy' || type === 'Issues') && (
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: textTop,
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            width: textWidth,
            padding: 'var(--sol-spacing-4)',
          }}
        >
          <span
            className={`text-center w-full ${type === 'Issues' ? (alertColor === 'yellow' ? 'text-yellow' : 'text-error') : 'text-element-tertiary'}`}
            style={{
              fontSize: isLarge ? 'var(--sol-font-size-text-xl)' : 'var(--sol-font-size-text-md)',
              lineHeight: isLarge ? 'var(--sol-line-height-text-xl)' : 'var(--sol-line-height-text-sm)',
              fontWeight: 'var(--sol-font-weight-semibold)',
            }}
          >
            {text}
          </span>
        </div>
      )}

      {/* Alert badge */}
      {showAlert && (
        <div
          className="absolute"
          style={{ top: 0, right: 3, width: alertSize, height: alertSize }}
        >
          {alertColor === 'red'
            ? <IcWarningRed size={alertSize} />
            : <IcWarningYellow size={alertSize} />
          }
        </div>
      )}
    </div>
  );
}
