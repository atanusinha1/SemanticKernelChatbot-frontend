// File: src/components/ChatBox.jsx
// This is the main chat component that displays messages and handles user input

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBox.css';

const ChatBox = () => {
  // ===== STATE MANAGEMENT =====
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // ===== CONSTANTS =====
  // Point this to your backend API
  const API_BASE_URL = 'http://localhost:5190/api';

  // ===== EFFECTS =====
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ===== HELPER FUNCTIONS =====
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

  // ===== MAIN CHAT FUNCTION =====
  const handleSendMessage = async () => {
    // Validate input
    if (!inputValue.trim()) {
      setError('Please enter a message');
      return;
    }

    // Reset error state
    setError(null);

    // Add user message to chat
    addMessage(inputValue, 'user');

    // Store the message and clear input
    const userMessage = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      console.log('📤 Sending message to backend:', userMessage);

      // ===== API CALL =====
      // Send message to backend
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: userMessage,
      });

      // Extract AI response
      const aiResponse = response.data.response;
      console.log('📥 Received response from backend:', aiResponse);

      // Add AI response to chat
      addMessage(aiResponse, 'bot');
    } catch (err) {
      console.error('❌ Error:', err);

      // Determine error message
      let errorMessage = 'Unable to get response. Please try again.';

      if (err.response?.status === 503) {
        errorMessage = '⚠️ AI service is unavailable. Check your Azure OpenAI credentials.';
      } else if (err.response?.status === 400) {
        errorMessage = '⚠️ Bad request. Please check your input.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = '❌ Network error. Is the backend running on port 5000?';
      } else if (err.response?.data?.error) {
        errorMessage = `❌ Error: ${err.response.data.error}`;
      }

      setError(errorMessage);
      addMessage(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ===== EVENT HANDLERS =====
  const handleKeyPress = (e) => {
    // Send message on Enter key (but not on Shift+Enter for multiline)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ===== RENDER =====
  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1>🤖 SemanticKernel ChatBot</h1>
        <p className="subtitle">Powered by Azure OpenAI</p>
      </div>

      {/* Messages Display Area */}
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

        {/* Loading Indicator */}
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

        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          {error}
          <button
            className="error-close"
            onClick={() => setError(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="chat-input-area">
        <div className="input-wrapper">
          <textarea
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
            disabled={loading}
            rows="3"
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={loading || !inputValue.trim()}
            title="Send message"
          >
            {loading ? '⏳ Sending...' : '➤ Send'}
          </button>
        </div>

        {/* Info Footer */}
        <div className="chat-footer">
          <p>
            💡 Tip: This chatbot uses Semantic Kernel + Azure OpenAI. Your messages are sent to
            the backend API.
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
