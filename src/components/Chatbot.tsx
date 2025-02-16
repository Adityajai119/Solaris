import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbot: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm C.H.I.T.T.I, your Solar Thermal Systems assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateGeminiResponse = async (prompt: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are C.H.I.T.T.I, an expert in solar thermal systems. 
                     Previous conversation: ${messages.map(m => `${m.isBot ? 'Assistant' : 'User'}: ${m.text}`).join('\n')}
                     User: ${prompt}
                     Assistant:`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini API');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setIsTyping(true);
    setInput('');

    try {
      const response = await generateGeminiResponse(input);
      setMessages(prev => [...prev, { text: response, isBot: true }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble processing your request right now. Please try again.", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg transition-colors ${
          isDark 
            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' 
            : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }`}
      >
        <MessageSquare />
      </button>

      {isOpen && (
        <div className={`fixed bottom-20 right-4 w-96 rounded-lg shadow-xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className={`flex justify-between items-center p-4 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>C.H.I.T.T.I Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <X />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? isDark 
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                      : 'bg-yellow-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about solar thermal systems..."
                className={`flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300 placeholder-gray-500'
                }`}
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className={`px-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600 disabled:bg-gray-600'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-gray-400'
                } disabled:cursor-not-allowed`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;