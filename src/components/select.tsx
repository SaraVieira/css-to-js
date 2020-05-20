import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = (props) => {
  const { value, onChange, children } = props;
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <select className="select" value={value} onChange={onChange}>
        {children}
      </select>
      <div className="select-arrow">
        <KeyboardArrowDownIcon />
      </div>
    </div>
  );
};
