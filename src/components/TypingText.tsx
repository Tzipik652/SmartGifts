import React, { FC, useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const renderTextWithLineBreaks = (text: string) =>
  text.split('\n').map((line, idx, arr) =>
    idx < arr.length - 1 ? (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ) : (
      line
    )
  );

const TypingText: FC<TypingTextProps> = ({ text, speed = 50, className }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {renderTextWithLineBreaks(displayedText)}
    </span>
  );
};

export default TypingText;