import fs from "fs";
import {
  seqC,
  capture,
  optional,
  many1Till,
  or,
  manyTillStr,
  count,
  iManyTillStr,
  sepBy,
  seq,
  many1,
  manyTillOneOf,
  str,
  spaces,
  word,
  char,
  eof,
  space,
  set,
  oneOf,
  Parser,
  ParserResult,
  success,
  parserDebug,
} from "tarsec";

/* Still a work in progress */

/* Types */
type InlineMarkdown =
  | InlineText
  | InlineBold
  | InlineItalic
  | InlineLink
  | InlineCode;

type InlineText = {
  type: "inline-text";
  content: string;
};

type InlineBold = {
  type: "inline-bold";
  content: string;
};

type InlineItalic = {
  type: "inline-italic";
  content: string;
};

type InlineLink = {
  type: "inline-link";
  content: string;
  url: string;
};

type InlineCode = {
  type: "inline-code";
  content: string;
};

type Paragraph = {
  type: "paragraph";
  content: InlineMarkdown[];
};

type Heading = {
  type: "heading";
  level: number;
  content: string;
};

type CodeBlock = {
  type: "code-block";
  content: string;
  language: string | null;
};

type BlockQuote = {
  type: "block-quote";
  content: string;
};

type Image = {
  type: "image";
  url: string;
  alt: string;
};

type List = {
  type: "list";
  ordered: boolean;
  items: string[];
};

/* Parsers */
export const headingParser: Parser<Heading> = seqC(
  set("type", "heading"),
  capture(count(char("#")), "level"),
  spaces,
  capture(many1Till(or(char("\n"), eof)), "content")
);

export const codeBlockParser: Parser<CodeBlock> = seqC(
  set("type", "code-block"),
  str("```"),
  capture(optional(word), "language"),
  optional(spaces),
  capture(manyTillStr("```"), "content"),
  str("```")
);

export const blockQuoteParser: Parser<BlockQuote> = seqC(
  set("type", "block-quote"),
  str(">"),
  spaces,
  capture(manyTillStr("\n"), "content")
);

/*    export const listParser: Parser<List> = many1(
    seqC(oneOf("-*"), spaces, capture(manyTillStr("\n"), "items"))
  );
 */

export const imageParser: Parser<Image> = seqC(
  set("type", "image"),
  str("!["),
  capture(iManyTillStr("]("), "alt"),
  str("]("),
  capture(iManyTillStr(")"), "url"),
  str(")")
);

const stops = (chars: string[]) => (input: string) => {
  return or(...chars.map(char))(input);
};

/* Inline Parsers */

export const inlineTextParser: Parser<InlineText> = seqC(
  set("type", "inline-text"),
  capture(many1Till(stops(["*", "`", "[", "\n"])), "content")
);

export const inlineBoldParser: Parser<InlineBold> = seqC(
  set("type", "inline-bold"),
  str("**"),
  capture(manyTillStr("**"), "content"),
  str("**")
);

export const inlineItalicParser: Parser<InlineItalic> = seqC(
  set("type", "inline-italic"),
  str("*"),
  capture(manyTillStr("*"), "content"),
  str("*")
);

export const inlineLinkParser: Parser<InlineLink> = seqC(
  set("type", "inline-link"),
  str("["),
  capture(iManyTillStr("]("), "content"),
  str("]("),
  capture(iManyTillStr(")"), "url"),
  str(")")
);

export const inlineCodeParser: Parser<InlineCode> = seqC(
  set("type", "inline-code"),
  str("`"),
  capture(manyTillStr("`"), "content"),
  str("`")
);

export const inlineMarkdownParser: Parser<InlineMarkdown> = or(
  inlineBoldParser,
  inlineItalicParser,
  inlineLinkParser,
  inlineCodeParser,
  inlineTextParser
);

export function paragraphParser(input: string): ParserResult<Paragraph> {
  const inline = many1(inlineMarkdownParser)(input);
  if (!inline.success) {
    return inline;
  }
  return success(
    {
      type: "paragraph",
      content: inline.result,
    },
    inline.rest
  );
}

/* Markdown Parser */
export const markdownParser = seqC(
  optional(spaces),
  capture(
    sepBy(
      spaces,
      or(
        headingParser,
        codeBlockParser,
        blockQuoteParser,
        /*         listParser,
         */ paragraphParser,
        imageParser
      )
    ),
    "content"
  ),
  optional(spaces)
);

const contents = fs.readFileSync("./TEST.md", "utf-8").trim();
console.log(contents);
//parserDebug("markdownParser", () => {
const res = markdownParser(contents);
console.log(res);

if (res.success) {
  console.log(JSON.stringify(res.result, null, 2));
}
