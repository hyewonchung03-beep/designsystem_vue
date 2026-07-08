export type TextHelperType = 'enabled' | 'error';

export type TextHelperProps = {
  helperText: string;
  type?: TextHelperType;
  id?: string;
};

export function TextHelper({ helperText, type = 'enabled', id }: TextHelperProps) {
  return (
    <p
      id={id}
      className={`mt-2 text-text-xs leading-text-xs font-regular ${
        type === 'error' ? 'text-error-dim' : 'text-element-tertiary'
      }`}
    >
      {helperText}
    </p>
  );
}
