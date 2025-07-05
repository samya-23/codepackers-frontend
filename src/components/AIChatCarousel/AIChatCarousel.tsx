import React, { useEffect, useState, useRef, useMemo } from "react";
import "./AIChatCarousel.css";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface AIChatCarouselProps {
  onLoopComplete?: () => void;
  loopKey: number;
  run: boolean;
}

const AIChatCarousel: React.FC<AIChatCarouselProps> = ({
  onLoopComplete,
  loopKey,
  run,
}) => {
  const messages: Message[] = useMemo(
    () => [
      { sender: "user", text: "Show me the Q3 sales report for the Delhi region" },
      { sender: "ai", text: "I've found the Q3 sales report for Delhi. The region showed 23% growth with ₹2.4 crores in revenue." },
      { sender: "user", text: "Please, provide me a breakdown of top three product categories" },
    ],
    []
  );

  const FAST_AI_TYPING_SPEED = 0.6;
  const SLOW_USER_TYPING_SPEED = 3;
  const TOTAL_LOOP_TIME = 5000;
  const TYPING_INDICATOR_DURATION = 400;
  const FADE_OUT_DURATION = 300;
  const POST_MSG_HOLD = 100;

  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const chatBubbleWrapperRef = useRef<HTMLDivElement>(null);

  const createMessage = (sender: "user" | "ai", text: string): Message => ({ sender, text });

  useEffect(() => {
    if (!run) return;
    let isCancelled = false;

    const typeMessage = async (
      msg: Message,
      typingSpeed: number,
      isAI: boolean
    ) => {
      if (!isAI) {
        setSendClicked(true);
      } else {
        setBotTyping(true);
        await new Promise((r) => setTimeout(r, TYPING_INDICATOR_DURATION));
        setBotTyping(false);
      }

      let typed = "";
      for (let c of msg.text) {
        if (isCancelled) return;
        typed += c;

        if (isAI) {
          setDisplayedMessages((prev) => {
            const updated = [...prev];
            if (updated[updated.length - 1]?.sender === "ai") {
              updated[updated.length - 1] = createMessage("ai", typed);
            } else {
              updated.push(createMessage("ai", typed));
            }
            return updated.slice(-3);
          });
        } else {
          setInputText(typed);
        }

        await new Promise((r) => setTimeout(r, typingSpeed));
      }

      if (!isAI) {
        await new Promise((r) => setTimeout(r, 80));
        setDisplayedMessages((prev) => [...prev, createMessage("user", typed)].slice(-3));
        setInputText("");
        setSendClicked(false);
      }
    };

    const playChat = async () => {
      const startTime = performance.now();

      await typeMessage(messages[0], SLOW_USER_TYPING_SPEED, false);
      await new Promise((r) => setTimeout(r, POST_MSG_HOLD));

      await typeMessage(messages[1], FAST_AI_TYPING_SPEED, true);
      await new Promise((r) => setTimeout(r, POST_MSG_HOLD));

      await typeMessage(messages[2], SLOW_USER_TYPING_SPEED, false);
      await new Promise((r) => setTimeout(r, POST_MSG_HOLD));

      const timeSpent = performance.now() - startTime;
      const remaining = Math.max(0, TOTAL_LOOP_TIME - timeSpent - FADE_OUT_DURATION);
      await new Promise((r) => setTimeout(r, remaining));

      if (isCancelled) return;
      
      // First trigger fade-out
      setFadeOut(true);
      
      // Then clear messages after fade-out starts
      setTimeout(() => {
        if (isCancelled) return;
        setDisplayedMessages([]);
        setInputText("");
        setFadeOut(false);
        onLoopComplete?.();
      }, FADE_OUT_DURATION);
    };

    playChat();
    return () => {
      isCancelled = true;
    };
  }, [loopKey, run]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollTop = inputRef.current.scrollHeight;
    }
    if (chatBubbleWrapperRef.current) {
      chatBubbleWrapperRef.current.scrollTop = chatBubbleWrapperRef.current.scrollHeight;
    }
  }, [inputText, displayedMessages]);

  return (
    <div
      className={`chat-carousel-container fixed-height ${fadeOut ? "fade-out" : ""}`}
      key={loopKey}
    >
      <div className="chat-header">
        <div className="avatar-icon" aria-hidden="true">💬</div>
        <div>
          <div className="chat-title">Paul - My Enterprise AI Agent</div>
          <div className="chat-subtitle">Multilingual • Secure • Scalable</div>
        </div>
      </div>

      <div 
        className="chat-bubble-wrapper fixed-3" 
        role="log" 
        aria-live="polite"
        ref={chatBubbleWrapperRef}
      >
        {displayedMessages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {botTyping && (
          <div className="chat-bubble ai typing-indicator" aria-label="AI is typing">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <div
          className="fake-input"
          contentEditable={false}
          tabIndex={-1}
          ref={inputRef}
          aria-label="Typing simulation area"
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

        <button
          className={`send-btn ${sendClicked ? "clicked" : ""}`}
          disabled
          aria-label="Send button"
        >
          ➤
        </button>
      </div>

      <div className="chat-footer">
        <span className="powered-text">Powered by Alaap platform</span>
      </div>
    </div>
  );
};

export default AIChatCarousel;