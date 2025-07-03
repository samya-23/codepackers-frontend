import React, { useEffect, useState, useRef, useMemo } from 'react';
import './AIChatCarousel.css';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface AIChatCarouselProps {
  onLoopComplete?: () => void; // ✅ Callback for carousel loop
}

const AIChatCarousel: React.FC<AIChatCarouselProps> = ({ onLoopComplete }) => {
  const messages: Message[] = useMemo(() => [
    { sender: 'user', text: "Show me the Q3 sales report for the Delhi region" },
    { sender: 'ai', text: "I've found the Q3 sales report for Delhi. The region showed 23% growth with ₹2.4 crores in revenue." },
    { sender: 'user', text: "Please, provide me a breakdown of top three product categories" },
  ], []);

  const HUMAN_TYPING_SPEED = 100;
  const BOT_TYPING_SPEED = 20;
  const RESET_LOOP_DELAY = 5000;
  const BOT_TYPING_INDICATOR_DELAY = 800;

  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);
  const [loopKey, setLoopKey] = useState(0);
  const [showPause, setShowPause] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;

    const playChatSequence = async () => {
      for (let i = 0; i < messages.length; i++) {
        const currentMsg = messages[i];
        if (isCancelled) return;

        if (currentMsg.sender === 'ai') {
          setBotTyping(true);
          setShowPause(true);
          await new Promise((r) => setTimeout(r, BOT_TYPING_INDICATOR_DELAY));
          setBotTyping(false);

          let aiText = '';
          for (let c = 0; c < currentMsg.text.length; c++) {
            if (isCancelled) return;
            aiText += currentMsg.text[c];
            setDisplayedMessages((prev) => {
              const updated = [...prev];
              if (updated[updated.length - 1]?.sender === 'ai') {
                updated[updated.length - 1] = { ...updated[updated.length - 1], text: aiText };
              } else {
                updated.push({ sender: 'ai', text: aiText });
              }
              return updated;
            });
            await new Promise((r) => setTimeout(r, BOT_TYPING_SPEED));
          }
          setShowPause(false);
        }

        if (currentMsg.sender === 'user') {
          setIsTyping(true);
          let userInput = '';
          for (let c = 0; c < currentMsg.text.length; c++) {
            if (isCancelled) return;
            userInput += currentMsg.text[c];
            setInputText(userInput);
            await new Promise((r) => setTimeout(r, HUMAN_TYPING_SPEED));
          }

          setSendClicked(true);
          await new Promise((r) => setTimeout(r, 400));
          setDisplayedMessages((prev) => [...prev, { sender: 'user', text: userInput }]);
          setInputText('');
          setSendClicked(false);
          setIsTyping(false);
        }
      }

      setTimeout(() => {
        if (isCancelled) return;
        setDisplayedMessages([]);
        setInputText('');
        setLoopKey((prev) => prev + 1);
        onLoopComplete?.(); // ✅ Notify carousel to move forward
      }, RESET_LOOP_DELAY);
    };

    playChatSequence();

    return () => {
      isCancelled = true;
    };
  }, [loopKey, messages, onLoopComplete]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
  }, [inputText]);

  return (
    <div className="chat-carousel-container fixed-height" key={loopKey}>
      <div className="chat-header">
        <div className="avatar-icon">💬</div>
        <div>
          <div className="chat-title">Paul - My Enterprise AI Agent</div>
          <div className="chat-subtitle">Multilingual • Secure • Scalable</div>
        </div>
      </div>

      <div className="chat-bubble-wrapper" aria-live="polite">
        {displayedMessages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {botTyping && (
          <div className="chat-bubble ai typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <div
          className="fake-input"
          contentEditable={false}
          tabIndex={-1}
          ref={inputRef}
        >
          {inputText ? (
            <>
              <span className="typing-content">{inputText}</span>
              <span className="cursor" />
            </>
          ) : (
            <>
              <span className="cursor" />
              <span className="placeholder-text">Ask me anything...</span>
            </>
          )}
        </div>

        <button className={`send-btn ${sendClicked ? 'clicked' : ''}`} disabled>
          {showPause ? (
            <svg width="18" height="18" viewBox="0 0 18 18" className="pause-square-icon">
              <rect x="3" y="3" width="12" height="12" rx="3" fill="white" />
            </svg>
          ) : '➤'}
        </button>
      </div>

      <div className="chat-footer">
        <span className="powered-text">Powered by Alaap platform</span>
      </div>
    </div>
  );
};

export default AIChatCarousel;