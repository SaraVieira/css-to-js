import React from "react";
import SimpleEditor from "react-simple-code-editor";
import { Code } from "./code";
import { Language } from "prism-react-renderer";

// TODO: change appearance to distinguish from output
// TODO: cursor not visible

export interface EditorProps {
  value: string;
  language: Language;
  label?: string;
  onChange: (newValue: string) => void;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const { value, language, label, onChange } = props;
  const highlight = (code) => <Code code={code} language={language} />;

  return (
    <SimpleEditor
      value={value}
      highlight={highlight}
      onValueChange={onChange}
      title={label}
      aria-label={label}
    />
  );
};
Editor.defaultProps = {
  value: "",
  onChange: () => undefined,
};
