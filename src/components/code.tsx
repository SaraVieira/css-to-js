import React from "react";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";

export type CodeProps = {
  code: string;
  language: Language;
  label?: string;
};

export const Code: React.FC<CodeProps> = ({ code, language, label }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={nightOwl}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={style}
          title={label}
          aria-label={label}
        >
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
