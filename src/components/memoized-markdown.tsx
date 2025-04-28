import { marked } from 'marked';
import type { Tokens } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens: TokensList = marked.lexer(markdown);
  return tokens.map((token: Tokens.Generic) => token.raw);
}

type TokensList = Array<Tokens.Generic & { raw: string }>;

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => <ReactMarkdown>{content}</ReactMarkdown>,
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = 'MemoizedMarkdownBlock';

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);
    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
    ));
  }
);

MemoizedMarkdown.displayName = 'MemoizedMarkdown'; 