import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    pauseDuration?: number;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 100,
    className = '',
    pauseDuration = 5000
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        if (isTyping) {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(prev => prev + text[currentIndex]);
                    setCurrentIndex(prev => prev + 1);
                }, speed);
                return () => clearTimeout(timeout);
            } else {
                // Finished typing, hide cursor and wait
                setIsTyping(false);
            }
        } else {
            // Waiting period
            const timeout = setTimeout(() => {
                setDisplayedText('');
                setCurrentIndex(0);
                setIsTyping(true);
            }, pauseDuration);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, isTyping, pauseDuration]);

    // Reset animation if text changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsTyping(true);
    }, [text]);

    return (
        <span className={className}>
            {displayedText}
            <span className={`animate-pulse ${!isTyping ? 'invisible' : ''}`}>|</span>
        </span>
    );
};
