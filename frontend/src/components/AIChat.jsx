import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open, loading]);

  const quickPrompts = [
    "What technologies is Manju skilled in?",
    "Tell me about her full-stack projects.",
    "What is her educational background & CGPA?"
  ];

  const handleSend = async (queryText) => {
    const question = (queryText || message).trim();
    if (!question || loading) return;

    setMessages((current) => [...current, { role: 'user', text: question }]);
    setMessage('');
    setLoading(true);

    try {
      const result = await sendChatMessage(question);
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: result.response || "I'm ready to answer any questions about Manju's portfolio!" }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: 'The AI assistant backend is currently resting. You can reach Manju directly at manju.pappuru678@gmail.com!'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <button
        className="chat-toggle-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle AI Assistant"
      >
        {open ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Close</span>
          </>
        ) : (
          <>
            <svg className="chat-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>Ask AI Assistant</span>
          </>
        )}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-avatar">🤖</div>
              <div>
                <div className="chat-header-title">Portfolio AI</div>
                <div className="chat-header-subtitle">● Ready to answer questions</div>
              </div>
            </div>
            <button
              className="chat-header-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat window"
            >
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <div className="chat-welcome-icon">⚡</div>
                <h4>Ask anything about Manju</h4>
                <p>Curious about projects, skills, or problem-solving experience?</p>

                <div className="chat-prompt-chips">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="prompt-chip"
                      onClick={() => handleSend(prompt)}
                    >
                      💬 {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((item, index) => (
              <div className={`chat-bubble ${item.role}`} key={`${item.role}-${index}`}>
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble assistant">
                <div className="chat-loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="chat-input-bar"
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question about Manju..."
              aria-label="Ask a question"
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!message.trim() || loading}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
