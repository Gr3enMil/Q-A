"use client";
import styles from './chat.module.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Import Firebase konfigurace
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const chatRef = collection(db, 'chats', 'chat-id', 'messages');
    const unsubscribe = onSnapshot(chatRef, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => doc.data());
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, 'chats', 'chat-id', 'messages'), {
      text: newMessage,
      sender: 'user',
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <p key={index}>{msg.sender}: {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Napište zprávu..."
      />
      <button onClick={sendMessage}>Odeslat</button>
    </div>
  );
}

export default ChatWindow;