import React, { useState, useEffect } from 'react';

interface DecryptTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  revealDirection?: 'random' | 'forward';
  className?: string;
  animateOnMount?: boolean;
}

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const DecryptText: React.FC<DecryptTextProps> = ({ 
  text, 
  speed = 40, 
  maxIterations = 15,
  className = '',
  animateOnMount = true
}) => {
  const [displayText, setDisplayText] = useState(animateOnMount ? '' : text);
  const [isDone, setIsDone] = useState(!animateOnMount);

  useEffect(() => {
    if (!animateOnMount) {
        setDisplayText(text);
        return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      // Non-linear pacing: start fast, end slow-ish
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsDone(true);
        setDisplayText(text);
      }

      iteration += 1 / 2; // Slower resolve
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, animateOnMount]);

  return (
    <span className={`${className} ${isDone ? '' : 'font-mono'}`}>
      {displayText}
    </span>
  );
};