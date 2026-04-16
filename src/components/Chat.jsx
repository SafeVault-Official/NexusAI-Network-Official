import { useState } from 'react';

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am NexusAI. Ask me anything about Web3, Solana, or AI workflows.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();

    const text = input.trim();
    if (!text || isLoading) return;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      setError('Missing VITE_GEMINI_API_KEY. Add it to your local .env file.');
      return;
    }

    const userMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text }]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach Gemini API.');
      }

      const data = await response.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .filter(Boolean)
          .join('\n') || 'I could not generate a response right now.';

      setMessages((prev) => [...prev, { role: 'assistant', text: aiText }]);
    } catch (requestError) {
      setError(requestError.message || 'Unexpected error while sending message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-log">
        {messages.map((message, index) => (
          <article key={`${message.role}-${index}`} className={`message ${message.role}`}>
            <p className="message-role">{message.role === 'assistant' ? 'NexusAI' : 'You'}</p>
            <p>{message.text}</p>
          </article>
        ))}
        {isLoading && <p className="typing-indicator">NexusAI is thinking...</p>}
      </div>

      {error && <p className="error-text">{error}</p>}

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your prompt for Gemini..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chat;
