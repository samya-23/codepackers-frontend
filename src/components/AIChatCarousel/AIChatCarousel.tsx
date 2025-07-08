import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const messages: Message[] = useMemo(
    () => [
      {
        sender: "user",
        text: t("chat.messages.0"),
      },
      {
        sender: "ai",
        text: t("chat.messages.1"),
      },
      {
        sender: "user",
        text: t("chat.messages.2"),
      },
    ],
    [t]
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
      // Adjust typing speed for mobile
      const isMobile = window.innerWidth <= 600;
      const adjustedSpeed = typingSpeed; // same for all screens
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

        await new Promise((r) => setTimeout(r, adjustedSpeed));
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
await new Promise((r) => setTimeout(r, 600)); // buffer
if (typeof onLoopComplete === "function") onLoopComplete();

  onLoopComplete?.(); // Now fire transition
};


    playChat();
    return () => {
      isCancelled = true;
    };
  }, [loopKey, run, messages]);

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
      className="chat-carousel-container flex flex-col justify-between px-4 py-4 md:px-6 md:py-6 max-w-md rounded-2xl md:rounded-3xl shadow-xl bg-white space-y-3 md:space-y-4 h-[360px] md:h-[420px]"
      key={loopKey}
    >
      {/* Header */}
      <div className="chat-header flex items-center gap-2 md:gap-3">
        <div className="avatar-icon text-xl md:text-2xl" aria-hidden="true">
          💬
        </div>
        <div>
          <div className="chat-title font-semibold text-sm md:text-base">
            {t("chat.header.title")}
          </div>
          <div className="chat-subtitle text-xs md:text-sm text-gray-500">
            {t("chat.header.subtitle")}
          </div>
        </div>
      </div>

      {/* Chat bubbles */}
      <div
        className="chat-bubble-wrapper flex-1 overflow-y-auto max-h-[200px] md:max-h-64 space-y-2 md:space-y-3 pr-1"
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
            aria-label={t("chat.typing")}
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
          className="fake-input border rounded-xl px-3 py-1.5 md:px-4 md:py-2 min-h-[36px] md:min-h-[40px] text-xs md:text-sm flex items-center"
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
                {t("chat.placeholder")}
              </span>
            </>
          )}
        </div>

        <button
          className={`send-btn ${sendClicked ? "clicked" : ""} ml-2 text-base md:text-lg`}
          disabled
          aria-label={t("chat.send")}
        >
          ➤
        </button>
      </div>

      {/* Footer */}
      <div className="chat-footer text-[10px] md:text-xs text-gray-400 text-right">
        {t("chat.footer")}
      </div>
    </div>
  );
};

export default AIChatCarousel;