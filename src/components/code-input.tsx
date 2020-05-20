import React from "react";
import Editor from "react-simple-code-editor";
import { Code } from "./code";
import { Language } from "prism-react-renderer";

// TODO: change appearance to distinguish from output
// TODO: cursor not visible

interface InputProps {
  value: string;
  language: Language;
  onChange: (newValue: string) => void;
}
export const CodeInput: React.FC<InputProps> = (props) => {
  const { value, language, onChange } = props;
  const highlight = (code) => <Code code={code} language={language} />;

  return (
    <Editor value={value} onValueChange={onChange} highlight={highlight} />
  );
};
CodeInput.defaultProps = {
  value: "",
  onChange: () => undefined,
};
