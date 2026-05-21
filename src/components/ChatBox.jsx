// File: src/components/ChatBox.jsx (Updated)

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBox.css';

const ChatBox = () => {
  // ===== NEW STATE FOR CONVERSATION MEMORY =====
  const [conversationId] = useState(() => {
    // Generate unique ID for this conversation
    const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    // Save to localStorage to persist across page reloads
    localStorage.setItem('lastConversationId', id);
    return id;
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI assistant. I can now remember our conversation. Try telling me something and then asking about it later!',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageCount, setMessageCount] = useState(1); // NEW: Track message count
  const messagesEndRef = useRef(null);

  const API_BASE_URL = 'http://localhost:5190/api';

  // Scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text, type = 'user') => {
    const newMessage = {
      id: messages.length + 1,
      type: type,
      text: text,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a message');
      return;
    }

    setError(null);
    addMessage(inputValue, 'user');

    const userMessage = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      console.log('📤 Sending message to conversation:', conversationId);

      // ===== SEND WITH CONVERSATION ID =====
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
        conversationId: conversationId, // NEW: Send conversation ID
      });

      const aiResponse = response.data.response;
      const newMessageCount = response.data.messageCount; // NEW: Get message count

      console.log('📥 Received response:', aiResponse);
      console.log('📊 Conversation has', newMessageCount, 'messages');

      addMessage(aiResponse, 'bot');
      setMessageCount(newMessageCount); // NEW: Update message count
    } catch (err) {
      console.error('❌ Error:', err);

      let errorMessage = 'Unable to get response';
      if (err.response?.status === 503) {
        errorMessage = '⚠️ AI service is unavailable';
      } else if (err.response?.status === 400) {
        errorMessage = '⚠️ Bad request';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = '❌ Network error - backend not running?';
      }

      setError(errorMessage);
      addMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1>🤖 SemanticKernel ChatBot</h1>
        <p className="subtitle">
          Powered by Azure OpenAI | 💾 Conversation Memory Enabled
        </p>
        {/* NEW: Show message count */}
        <p className="message-count">Messages in conversation: {messageCount}</p>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message message-${message.type}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message message-bot">
            <div className="message-content">
              <p className="loading-text">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="error-banner">
          {error}
          <button className="error-close" onClick={() => setError(null)}>
            ✕
          </button>
        </div>
      )}

      {/* Input */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <textarea
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send)"
            disabled={loading}
            rows="3"
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={loading || !inputValue.trim()}
          >
            {loading ? '⏳ Sending...' : '➤ Send'}
          </button>
        </div>

        {/* NEW: Display conversation ID */}
        <div className="chat-footer">
          <p>
            💡 This chatbot now remembers our conversation! Try telling me something, 
            then asking about it later.
          </p>
          <p className="conversation-info">
            💾 Conversation ID: <code>{conversationId.substring(0, 20)}...</code>
          </p>
          <p className="api-status">
            Backend: <span className="status-indicator">●</span>
            <a href="http://localhost:5000/api/chat/health" target="_blank" rel="noopener noreferrer">
              localhost:5000
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;