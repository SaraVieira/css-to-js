import React from "react";
import Highlight, { Language } from "prism-react-renderer";
import SimpleEditor from "react-simple-code-editor";
import { defaultHighlightProps } from "../utils/defaultHightlightProps";

export interface EditorProps {
  value: string;
  language: Language;
  label?: string;
  onChange: (newValue: string) => void;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const { value, language, label, onChange } = props;
  const highlight = (code) => (
    <Highlight {...defaultHighlightProps} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </>
      )}
    </Highlight>
  );

  return (
    <SimpleEditor
      className="editor"
      value={value}
      highlight={highlight}
      onValueChange={onChange}
      title={label}
      aria-label={label}
      padding={20}
    />
  );
};
Editor.defaultProps = {
  value: "",
  onChange: () => undefined,
};
