export type HTMLDivAttributes = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type HTMLInputAttributes = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  inputProps?: HTMLInputAttributes;
  inputContainerProps?: HTMLDivAttributes;
  otherChildren?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  inputProps,
  inputContainerProps,
  otherChildren,
}) => {
  return (
    <div {...inputContainerProps}>
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          className={`form-control`}
          {...inputProps}
        />
        {otherChildren}
      </div>
    </div>
  );
};
