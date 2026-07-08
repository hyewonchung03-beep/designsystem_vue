export type TextLabelSize = 'md' | 'sm';

export type TextLabelProps = {
  label: string;
  required?: boolean;
  size?: TextLabelSize;
};

export function TextLabel({ label, required = false, size = 'md' }: TextLabelProps) {
  const isMd = size === 'md';
  return (
    <div className={`flex items-center gap-1 ${isMd ? 'mb-2' : 'mb-1'}`}>
      <span
        className={`font-regular text-element-tertiary ${
          isMd ? 'text-text-sm leading-text-sm' : 'text-text-xs leading-text-xs'
        }`}
      >
        {label}
      </span>
      {required && (
        <span
          className={`font-regular text-error ${
            isMd ? 'text-text-sm leading-text-sm' : 'text-text-xs leading-text-xs'
          }`}
        >
          *
        </span>
      )}
    </div>
  );
}
