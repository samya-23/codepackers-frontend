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
      {
        sender: "user",
        text: "Show me the Q3 sales report for the Delhi region",
      },
      {
        sender: "ai",
        text:
          "I've found the Q3 sales report for Delhi. The region showed 23% growth with ₹2.4 crores in revenue.",
      },
      {
        sender: "user",
        text: "Please, provide me a breakdown of top three product categories",
      },
    ],
    []
  );

  const FAST_AI_TYPING_SPEED = 0.6;
  const SLOW_USER_TYPING_SPEED = 3;
  const TYPING_INDICATOR_DURATION = 400;
  const POST_MSG_HOLD = 100;

  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null);
  const chatBubbleWrapperRef = useRef<HTMLDivElement>(null);

  const createMessage = (sender: "user" | "ai", text: string): Message => ({
    sender,
    text,
  });

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
        setDisplayedMessages((prev) =>
          [...prev, createMessage("user", typed)].slice(-3)
        );
        setInputText("");
        setSendClicked(false);
      }
    };

    const playChat = async () => {
      setDisplayedMessages([]);
      setInputText("");
      setBotTyping(false);
      setSendClicked(false);

      await typeMessage(messages[0], SLOW_USER_TYPING_SPEED, false);
      await new Promise((r) => setTimeout(r, POST_MSG_HOLD));

      await typeMessage(messages[1], FAST_AI_TYPING_SPEED, true);
      await new Promise((r) => setTimeout(r, POST_MSG_HOLD));

      await typeMessage(messages[2], SLOW_USER_TYPING_SPEED, false);

      onLoopComplete?.();
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
      chatBubbleWrapperRef.current.scrollTop =
        chatBubbleWrapperRef.current.scrollHeight;
    }
  }, [inputText, displayedMessages]);

  return (
    <div
      className="chat-carousel-container flex flex-col justify-between px-6 py-6 md:px-8 md:py-8 max-w-md rounded-3xl shadow-xl bg-white space-y-4"
      key={loopKey}
    >
      {/* Header */}
      <div className="chat-header flex items-center gap-3">
        <div className="avatar-icon text-2xl" aria-hidden="true">
          💬
        </div>
        <div>
          <div className="chat-title font-semibold text-base">
            Paul - My Enterprise AI Agent
          </div>
          <div className="chat-subtitle text-sm text-gray-500">
            Multilingual • Secure • Scalable
          </div>
        </div>
      </div>

      {/* Chat bubbles */}
      <div
        className="chat-bubble-wrapper flex-1 overflow-y-auto max-h-64 space-y-3 pr-1"
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
          <div
            className="chat-bubble ai typing-indicator"
            aria-label="AI is typing"
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
      </div>

      {/* Input simulation */}
      <div className="chat-input-area">
        <div
          className="fake-input border rounded-xl px-4 py-2 min-h-[40px] text-sm flex items-center"
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
              <span className="placeholder-text text-gray-400">
                Ask me anything...
              </span>
            </>
          )}
        </div>

        <button
          className={`send-btn ${sendClicked ? "clicked" : ""} ml-2 text-lg`}
          disabled
          aria-label="Send button"
        >
          ➤
        </button>
      </div>

      {/* Footer */}
      <div className="chat-footer text-xs text-gray-400 text-right">
        Powered by Alaap platform
      </div>
    </div>
  );
};

export default AIChatCarousel;
