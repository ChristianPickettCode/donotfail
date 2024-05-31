import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

const MarkdownWithLatex = ({ markdownText, streaming }: { markdownText: string, streaming: boolean }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const words = markdownText.split(' ');

    useEffect(() => {
        if (streaming) {
            if (index < words.length) {
                const timer = setTimeout(() => {
                    setDisplayText(prev => prev + (prev ? ' ' : '') + words[index]);
                    setIndex(prev => prev + 1);
                }, 100); // Adjust the delay as needed for your streaming effect
                return () => clearTimeout(timer);
            }
        } else {
            setDisplayText(markdownText);
        }
    }, [index, streaming, words, markdownText]);

    const preprocessMarkdown = (text: string) => {
        return text
            .replace(/\\\[/g, '$$$')
            .replace(/\\\]/g, '$$$')
            .replace(/\\\(/g, '$$$')
            .replace(/\\\)/g, '$$$')
            .replace(/```/g, '');
    };

    const remarkMathOptions = {
        singleDollarTextMath: false,
    };

    return (
        <div>
            <ReactMarkdown
                className="markdown-content text-wrap break-words"
                remarkPlugins={[[remarkMath, remarkMathOptions], remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
            >
                {preprocessMarkdown(displayText)}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownWithLatex;
