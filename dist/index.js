import fs from "fs";
import { seqC, capture, optional, many1Till, or, manyTillStr, count, iManyTillStr, sepBy, seq, many1, manyTillOneOf, str, spaces, word, char, eof, set, success, parserDebug } from "tarsec";
/* Parsers */
export const headingParser = seqC(set("type", "heading"), capture(count(char("#")), "level"), spaces, capture(many1Till(or(char("\n"), eof)), "content"));
export const codeBlockParser = seqC(set("type", "code-block"), str("```"), capture(optional(word), "language"), optional(spaces), capture(manyTillStr("```"), "content"), str("```"));
export const blockQuoteParser = seqC(set("type", "block-quote"), str(">"), spaces, capture(manyTillStr("\n"), "content"));
/* export const listParser: Parser<List> = many1(
  seqC(oneOf("-*"), spaces, capture(manyTillStr("\n"), "item"))
);

 */
export const imageParser = seqC(set("type", "image"), str("!["), capture(iManyTillStr("]("), "alt"), str("]("), capture(iManyTillStr(")"), "url"), str(")"));
/* Inline Parsers */
export const inlineTextParser = seqC(set("type", "inline-text"), capture(manyTillOneOf(["*", "`", "[", "\n"]), "content"));
export const inlineBoldParser = seqC(set("type", "inline-bold"), str("**"), capture(manyTillStr("**"), "content"), str("**"));
export const inlineItalicParser = seqC(set("type", "inline-italic"), str("*"), capture(manyTillStr("*"), "content"), str("*"));
export const inlineLinkParser = seqC(set("type", "inline-link"), str("["), capture(iManyTillStr("]("), "content"), str("]("), capture(iManyTillStr(")"), "url"), str(")"));
export const inlineCodeParser = seqC(set("type", "inline-code"), str("`"), capture(manyTillStr("`"), "content"), str("`"));
export const inlineMarkdownParser = or(inlineBoldParser, inlineItalicParser, inlineLinkParser, inlineCodeParser, inlineTextParser);
export function paragraphParser(input) {
    const inline = many1(inlineMarkdownParser)(input);
    if (!inline.success) {
        return inline;
    }
    return success({
        type: "paragraph",
        content: inline.result,
    }, inline.rest);
}
/* Markdown Parser */
export const markdownParser = seq([
    optional(spaces),
    sepBy(spaces, or(headingParser, codeBlockParser, blockQuoteParser, 
    /*         listParser,
     */ paragraphParser, imageParser)),
    optional(spaces),
], (r, c) => r[1]);
const contents = fs.readFileSync("./TEST.md", "utf-8");
console.log(contents);
parserDebug("markdownParser", () => {
    console.log(markdownParser(contents));
});
