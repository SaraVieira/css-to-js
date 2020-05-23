import { formatObject } from "../formatters";

const htmlTags = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "bgsound",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "content",
  "data",
  "datalist",
  "dd",
  "decorator",
  "del",
  "details",
  "dfn",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "isindex",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "listing",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "nobr",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "plaintext",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "shadow",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "xmp",
];

function checker(value) {
  for (let i = 0; i < htmlTags.length; i++) {
    if (value.startsWith(htmlTags[i])) {
      return true;
    }
  }
  return false;
}

export function transform(css) {
  let code = css.trim() || "";
  if (checker(code) && css.includes("{")) {
    code = css.split("{")[1];
  }

  if (code.startsWith("{")) {
    code = css.substr(1);
  }

  if (code.startsWith(".") || code.startsWith("#")) {
    code = css.split("{")[1];
  }
  const newCode = code ? code.trim().split(";") : [];

  const rules = newCode.reduce((acc, curr) => {
    const both = curr.trim().split(":");
    let prop = both[0];
    let value = both[1];

    // Convert prop from CSS to JS
    if (prop) {
      if (prop.startsWith("-")) {
        prop = `"${prop}"`;
      } else if (prop.includes("-")) {
        prop = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      }
    }

    // Convert value from CSS to JS
    if (value) {
      if (value.includes("px")) {
        value = parseInt(value.split("px")[0]);
      } else if (value.includes('"')) {
        value = `${value.split('"').join("'")}`;
      } else {
        value = `${value.trim()}`;
      }
    }

    return {
      ...acc,
      ...(!!prop && {
        [prop]: typeof value === "string" ? `"${value.trim()}"` : value,
      }),
    };
  }, {});

  const objString = `{
    ${Object.keys(rules)
      .map((property) => `${property}: ${rules[property]},`)
      .join("\n")}
  }`;

  try {
    return formatObject(objString);
  } catch (e) {
    return objString;
  }
}
