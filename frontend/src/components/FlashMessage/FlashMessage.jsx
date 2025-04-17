import React, { useEffect } from 'react';
import './FlashMessage.css';

const FlashMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`flash-message ${type}`}>
      <span>{message}</span>
      <div className="timer-bar" />
    </div>
  );
};

export default FlashMessage;
