"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import styles from './chat.module.css';
import ChatWindow from './ChatWindow';

function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chat} onClick={toggleChat}>
      <FontAwesomeIcon icon={faComments} size="2x" />
      {isOpen && <ChatWindow />}
    </div>
  );
}


export default ChatIcon;