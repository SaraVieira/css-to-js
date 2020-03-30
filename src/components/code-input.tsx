import React, { useRef } from "react";

interface InputProps {
  value: string;
  onChange?: (newValue: string) => void;
}
export const CodeInput: React.FC<InputProps> = ({ value, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key
    if (e.keyCode === 9) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + "\t" + value.substring(end);
      if (onChange) onChange(newValue);

      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
          start + 1;
      }
    }
  };

  return (
    <textarea
      value={value}
      ref={textareaRef}
      onChange={e => {
        if (onChange) onChange(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
};
CodeInput.defaultProps = {
  value: ""
};
