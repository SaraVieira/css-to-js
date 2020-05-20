import React from "react";
import Highlight, { Language } from "prism-react-renderer";
import { defaultHighlightProps } from "../utils";

export type CodeProps = {
  code: string;
  language: Language;
  label?: string;
};

export const Code: React.FC<CodeProps> = ({ code, language, label }) => {
  return (
    <Highlight {...defaultHighlightProps} code={code} language={language}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre title={label} aria-label={label}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
