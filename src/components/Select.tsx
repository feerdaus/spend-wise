import { FC } from "react";
import { HTMLDivAttributes } from "./Input";

export interface SelectOption {
  value: string;
  label: string;
}

export type HTMLSelectAttributes = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export interface FCISelect {
  name: string;
  label?: string;
  placeholder?: string;
  selectProps?: HTMLSelectAttributes;
  selectContainerProps?: HTMLDivAttributes;
  options: SelectOption[];
}

const Select: FC<FCISelect> = ({
  name,
  selectProps,
  selectContainerProps,
  label,
  options,
}) => {
  return (
    <div {...selectContainerProps}>
      {Boolean(label) && (
        <div>
          <label htmlFor={name} className="text-body text-base">
            {label}
          </label>
        </div>
      )}
      <div className={`relative ${label ? "mt-1.5" : ""}`}>
        <select
          id={name}
          name={name}
          className={`form-control`}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
