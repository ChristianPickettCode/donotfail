import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

const MarkdownWithLatex = ({ markdownText }: any) => {

    const preprocessMarkdown = (markdownText: any) => {
        // Replace \[ with $$ and \] with $$ to ensure compatibility
        // console.log(markdownText)
        const processedText = markdownText
            .replace(/\\\[/g, '$$$')  // Replace all occurrences of \[ with $$
            .replace(/\\\]/g, '$$$'); // Replace all occurrences of \] with $$

        return processedText;
    };

    const remarkMathOptions = {
        singleDollarTextMath: false,
    }


    return (
        <ReactMarkdown
            className="markdown-content"
            children={preprocessMarkdown(markdownText)}
            remarkPlugins={[[remarkMath, remarkMathOptions]]} // Pass options as the second element of the array
            rehypePlugins={[rehypeRaw, rehypeKatex]} // Include rehypeRaw for HTML, rehypeKatex for LaTeX
        />
    );
};

export default MarkdownWithLatex;