import {
  FC,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef, useState
} from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";

import { io } from "socket.io-client";

import { ILoaderFunctionResult } from "~/routes/chat";

import { IMessage, IUser } from "~/utils/typedefs";

import { styles } from "./styles";

const socket = io();

export const ChatIndexView: FC = () => {
  const { messages, chat, authUser } = useLoaderData<ILoaderFunctionResult>();
  const [chatMessages, setChatMessages] = useState(messages);

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const newestMessages = useMemo(() => {
    return chatMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [chatMessages]);

  const getAuthorName = useCallback((message: IMessage) => {
    if (message.authorId === authUser.id) return 'You';
    const participant = chat.participants.find((participant) => participant.id === message.authorId) as IUser;

    return participant.fullName;
  }, [chat, authUser]);

  useEffect(() => {
    socket.emit("joinChat", chat.id);
    socket.on("receiveMessage", (payload: IMessage) => {
      setChatMessages((prev) => [...prev, payload])
    });

    return () => {
      socket.off("receiveMessage");
    }
  }, [chat.id]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    socket.emit("sendMessage", {
      id: `${Date.now()} ${authUser.id}`,
      chatId: chat.id,
      text: formData.get('message'),
      authorId: authUser.id,
      cratedAt: new Date(),
    });

    e.currentTarget.reset();
  }, [chat.id, authUser.id]);

  const handleKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    const textarea = textareaRef.current!;

    if (event.key === "Enter") {
      if (event.ctrlKey) {
        // Ctrl + Enter: Add newline
        const cursorPos = textarea.selectionStart;
        const text = textarea.value;
        textarea.value = text.slice(0, cursorPos) + "\n" + text.slice(cursorPos);
        textarea.selectionStart = textarea.selectionEnd = cursorPos + 1; // Move cursor after newline
        event.preventDefault();
      } else if (!event.shiftKey) {
        // Enter without Shift or Ctrl: Submit form
        event.preventDefault();
        if (textarea.value.trim().length) {
          formRef.current!.requestSubmit();
        }
      }
    }
  }

  return (
    <div style={styles.root}>
      <h1 style={styles.header}>
        Welcome to Remix Chat
      </h1>

      <div style={styles.messagesContainer}>
        <div style={styles.messagesList}>
          {
            newestMessages.map((message) => (
              <div key={message.id} style={{
                ...styles.messageItem,
                ...(message.authorId === authUser.id ? styles.selfCreatedMessage : {})
              }}>
                <span style={{
                  ...styles.additionalText,
                  ...styles.author,
                }}>
                  {getAuthorName(message)}
                </span>

                <div style={styles.text}>{message.text}</div>

                <span style={{
                  ...styles.additionalText,
                  ...styles.time,
                }}>
                  {message.createdAt}
                </span>
              </div>
            ))
          }
        </div>

        <Form
          ref={formRef}
          style={{ display: 'flex' }}
          onSubmit={handleSubmit}
          navigate={false}
        >
          <textarea
            ref={textareaRef}
            style={styles.textarea}
            rows={3}
            name="message"
            placeholder={'Enter message ... '}
            onKeyDown={handleKeydown}
          >
        </textarea>
        </Form>
      </div>

      <Link style={styles.logout} to="/auth/logout">Logout</Link>
    </div>
  )
}