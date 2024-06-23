import { Parser, ParserResult } from "tarsec";
type InlineMarkdown = InlineText | InlineBold | InlineItalic | InlineLink | InlineCode;
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
export declare const headingParser: Parser<Heading>;
export declare const codeBlockParser: Parser<CodeBlock>;
export declare const blockQuoteParser: Parser<BlockQuote>;
export declare const imageParser: Parser<Image>;
export declare const inlineTextParser: Parser<InlineText>;
export declare const inlineBoldParser: Parser<InlineBold>;
export declare const inlineItalicParser: Parser<InlineItalic>;
export declare const inlineLinkParser: Parser<InlineLink>;
export declare const inlineCodeParser: Parser<InlineCode>;
export declare const inlineMarkdownParser: Parser<InlineMarkdown>;
export declare function paragraphParser(input: string): ParserResult<Paragraph>;
export declare const markdownParser: Parser<{
    content: (Paragraph | Heading | CodeBlock | BlockQuote | Image)[];
}>;
export {};
