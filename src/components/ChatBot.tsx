import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios, { AxiosError } from 'axios';

// Types
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // TODO: Replace with your actual n8n webhook URL
  // You can find this in your n8n workflow under the "Webhook" or "Chat Trigger" node
  const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook/60515ea9-611e-4d53-958f-342bbea51a5c/chat';

  const quickActions = [
    'What is crowdfunding?',
    'How do I invest?',
    'Starting a startup guide',
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to send message to n8n webhook using axios
  const sendMessageToN8N = async (message: string): Promise<string> => {
    try {
      const response = await axios.post(
        N8N_WEBHOOK_URL,
        {
          chatInput: message,
          sessionId: `session-${Date.now()}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      const data = response.data;
      
      // Adjust this based on your n8n workflow's response structure
      return data.output || data.response || data.message || data.text || 'I received your message.';
      
    } catch (error) {
      console.error('Error communicating with n8n:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          // Server responded with error status
          console.error('Server Error:', axiosError.response.status, axiosError.response.data);
          throw new Error(`Server error: ${axiosError.response.status}`);
        } else if (axiosError.request) {
          // Request was made but no response received
          console.error('No Response:', axiosError.request);
          throw new Error('No response from server');
        } else if (axiosError.code === 'ECONNABORTED') {
          // Request timeout
          throw new Error('Request timeout');
        }
      }
      
      throw error;
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to n8n workflow
      const botResponseText = await sendMessageToN8N(currentInput);

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Fallback response if n8n is unavailable
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    if (isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: action,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setIsLoading(true);

    try {
      // Send quick action to n8n workflow
      const botResponseText = await sendMessageToN8N(action);

      const botResponse: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      // Fallback response if n8n is unavailable
      const errorResponse: Message = {
        id: messages.length + 2,
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-50 group"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          <div className="bg-slate-800 p-6 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">UpFund AI Assistant</h3>
                <p className="text-xs text-slate-400">
                  Ask me anything about startups, investments, or how our platform works
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  disabled={isLoading}
                  className={`px-3 py-2 bg-slate-700 text-slate-300 text-xs rounded-full transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'
                  }`}
                >
                  {action}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="w-10 h-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}