import fs from "fs";
import { seqC, capture, optional, many1Till, or, manyTillStr, count, iManyTillStr, sepBy, many1, str, spaces, word, char, eof, set, success } from "tarsec";
/* Parsers */
export const headingParser = seqC(set("type", "heading"), capture(count(char("#")), "level"), spaces, capture(many1Till(or(char("\n"), eof)), "content"));
export const codeBlockParser = seqC(set("type", "code-block"), str("```"), capture(optional(word), "language"), optional(spaces), capture(manyTillStr("```"), "content"), str("```"));
export const blockQuoteParser = seqC(set("type", "block-quote"), str(">"), spaces, capture(manyTillStr("\n"), "content"));
/* export const listParser: Parser<List> = many1(
  seqC(oneOf("-*"), spaces, capture(manyTillStr("\n"), "item"))
);

 */
export const imageParser = seqC(set("type", "image"), str("!["), capture(iManyTillStr("]("), "alt"), str("]("), capture(iManyTillStr(")"), "url"), str(")"));
const stops = (chars) => (input) => {
    return or(...chars.map(char))(input);
};
/* Inline Parsers */
export const inlineTextParser = seqC(set("type", "inline-text"), capture(many1Till(stops(["*", "`", "[", "\n"])), "content"));
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
export const markdownParser = seqC(optional(spaces), capture(sepBy(spaces, or(headingParser, codeBlockParser, blockQuoteParser, 
/*         listParser,
 */ paragraphParser, imageParser)), "content"), optional(spaces));
const contents = fs.readFileSync("./TEST.md", "utf-8").trim();
console.log(contents);
//parserDebug("markdownParser", () => {
const res = markdownParser(contents);
console.log(res);
if (res.success) {
    console.log(JSON.stringify(res.result, null, 2));
}
//})
