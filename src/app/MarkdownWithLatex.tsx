import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

const MarkdownWithLatex = ({ markdownText }: any) => {

    const preprocessMarkdown = (markdownText: any) => {
        // Replace \[ with $$ and \] with $$ to ensure compatibility
        // console.log(markdownText)
        const processedText = markdownText
            .replace(/\\\[/g, '$$$')  // Replace all occurrences of \[ with $$
            .replace(/\\\]/g, '$$$') // Replace all occurrences of \] with $$
            // Replace all occurrences of \( with $$\(
            .replace(/\\\(/g, '$$$')
            // Replace all occurrences of \) with $$\)
            .replace(/\\\)/g, '$$$');

        return processedText;
    };

    const remarkMathOptions = {
        singleDollarTextMath: false,
    }


    return (
        <ReactMarkdown
            className="markdown-content text-wrap break-words"
            remarkPlugins={[[remarkMath, remarkMathOptions], remarkGfm]}  // Pass options as the second element of the array
            rehypePlugins={[rehypeRaw, rehypeKatex]} // Include rehypeRaw for HTML, rehypeKatex for LaTeX
        >
            {preprocessMarkdown(markdownText)}
        </ReactMarkdown>
    );
};

export default MarkdownWithLatex;