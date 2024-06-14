import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

const MarkdownWithLatex = ({ markdownText, streaming, highlightSpeedMultiplier, highlightOn }: { markdownText: string, streaming: boolean, highlightSpeedMultiplier: number, highlightOn: boolean }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);
    const words = markdownText.split(' ');
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Start with no highlighted word
    const baseSpeed = 63; // Base speed in milliseconds per character

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

    const preprocessMarkdown = (text: any) => {
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

    const isLatexWord = (word: any) => {
        const latexDelimiters = ['$$$', '\\(', '\\)', '\\[', '\\]'];
        return latexDelimiters.some(delimiter => word.includes(delimiter));
    };

    const highlightedText = displayText.split(' ')
        .map((word, idx) =>
            highlightOn && idx === highlightedIndex && !isLatexWord(word) ? `<span className="bg-red-200">${word}</span>` : word
        )
        .join(' ');

    useEffect(() => {
        if (highlightOn) {
            setHighlightedIndex(0); // Start from the beginning when highlightOn is turned on
        } else {
            setHighlightedIndex(-1); // Reset highlight when turned off
        }
    }, [highlightOn]);

    useEffect(() => {
        if (highlightOn && highlightedIndex < words.length && highlightedIndex >= 0) {
            const intervalId = setTimeout(() => {
                setHighlightedIndex((prevIndex) => prevIndex + 1);
            }, baseSpeed * words[highlightedIndex].length / highlightSpeedMultiplier); // Adjust speed based on word length and multiplier
            return () => clearTimeout(intervalId);
        }
    }, [highlightedIndex, highlightSpeedMultiplier, highlightOn, words]);

    return (
        <div>
            <ReactMarkdown
                className="markdown-content text-wrap break-words"
                remarkPlugins={[[remarkMath, remarkMathOptions], remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
            >
                {preprocessMarkdown(highlightedText)}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownWithLatex;
