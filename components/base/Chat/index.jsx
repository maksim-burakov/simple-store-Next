import { useCallback, useState } from "react";

import { useChat } from "../../../hooks/useChat";
import {
  CHAT_BUTTON_ID,
  CHAT_ID,
  CHAT_MESSAGE_INPUT_ID,
  CHAT_SEND_MESSAGE_ID,
  CHAT_LIST_ID,
  CHAT_CLOSE_BUTTON_ID,
} from "../../../constants";

import styles from "../../../styles/Chat.module.scss";

export const ChatButton = () => {
  const [selected, setSelected] = useState(false);
  const [message, setMessage] = useState("");
  const { chatHistory, onSubmitMessage, listRef } = useChat();

  const toggleChat = useCallback(
    () => setSelected((prevValue) => !prevValue),
    []
  );

  const handleSend = useCallback(
    (event) => {
      event.preventDefault();
      onSubmitMessage(message);
      setMessage("");
    },
    [message, onSubmitMessage]
  );

  const handleMessageChange = useCallback(({ target: { value } }) => {
    setMessage(value);
  }, []);

  return (
    <>
      <button
        id={CHAT_BUTTON_ID}
        onClick={toggleChat}
        className={
          selected
            ? `${styles.chatButton} ${styles.chatButton__selected}`
            : styles.chatButton
        }
      >
        Chat
      </button>
      <div
        id={CHAT_ID}
        className={
          selected ? `${styles.chat} ${styles.chat__selected}` : styles.chat
        }
      >
        <div className={styles.chat__header}>
          <h3>Chat</h3>
          <button id={CHAT_CLOSE_BUTTON_ID} onClick={toggleChat}>
            X
          </button>
        </div>
        <ul id={CHAT_LIST_ID} ref={listRef} className={styles.chat__list}>
          {chatHistory.map(({ id, message, isUser }) => (
            <li key={id} className={isUser ? styles.userMessage : ""}>
              {message}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSend} className={styles.chat__footer}>
          <input
            id={CHAT_MESSAGE_INPUT_ID}
            onChange={handleMessageChange}
            value={message}
            placeholder="Ask a question..."
            name="message-input"
          />
          <button id={CHAT_SEND_MESSAGE_ID} type="submit" onClick={handleSend}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};
