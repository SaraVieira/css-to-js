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
  "xmp"
];

function checker(value) {
  for (var i = 0; i < htmlTags.length; i++) {
    if (value.startsWith(htmlTags[i])) {
      return true;
    }
  }
  return false;
}

export default c => {
  let code = c.trim();

  if (checker(code)) {
    code = c.split("{")[1];
  }

  if (code.startsWith("{")) {
    code = c.substr(1);
  }

  if (code.startsWith(".") || code.startsWith("#")) {
    code = c.split("{")[1];
  }
  const newCode = code ? code.trim().split(";") : [];

  const tokens = newCode.map(token => {
    const both = token.trim().split(":");
    let value = both[1];
    let prop = both[0];

    if (both[1]) {
      if (both[1].includes("px")) {
        value = parseInt(both[1].split("px")[0]);
      } else {
        value = `"${both[1].trim()}"`;
      }

      if (both[0].startsWith("-")) {
        prop = `"${both[0]}"`;
      }
      if (!both[0].startsWith("-") && both[0].includes("-")) {
        prop = both[0].replace(/-([a-z])/g, g => g[1].toUpperCase());
      }

      return `  ${prop}: ${value},\n`;
    }
  });

  console.log(tokens);
  return "{\n" + tokens.join("") + "}";
};
