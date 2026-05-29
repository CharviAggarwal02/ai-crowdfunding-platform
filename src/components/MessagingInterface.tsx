import { X, Send, Phone, Image, Paperclip } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  sender: "investor" | "entrepreneur";
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface MessagingInterfaceProps {
  startupName: string;
  onClose: () => void;
  userRole: "investor" | "entrepreneur" | "admin" | null;
  userName?: string;
}

export default function MessagingInterface({
  startupName,
  onClose,
  userRole,
  userName = "You"
}: MessagingInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "entrepreneur",
      name: "Startup Team",
      message: "Hi! Thanks for your interest in our startup.",
      timestamp: "10:30 AM",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      sender: "investor",
      name: "You",
      message: "Great! Tell me more about your product.",
      timestamp: "10:32 AM",
      avatar: "👤"
    },
    {
      id: 3,
      sender: "entrepreneur",
      name: "Startup Team",
      message: "We're building an AI-powered platform for business automation. Our MVP already has 100+ users.",
      timestamp: "10:35 AM",
      avatar: "👨‍💼"
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: userRole === "investor" ? "investor" : "entrepreneur",
        name: userName,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        }),
        avatar: userRole === "investor" ? "👤" : "👨‍💼"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl h-[600px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-cyan-500/20 shadow-2xl flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Messaging
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {startupName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-cyan-400">
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MESSAGES CONTAINER */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "investor" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-xs ${
                  msg.sender === "investor" ? "flex-row-reverse" : ""
                }`}
              >
                {/* AVATAR */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                    msg.sender === "investor"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                      : "bg-gradient-to-r from-purple-600 to-pink-500"
                  }`}
                >
                  {msg.avatar}
                </div>

                {/* MESSAGE BUBBLE */}
                <div
                  className={`${
                    msg.sender === "investor"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-white/10 border border-white/20 text-gray-100"
                  } rounded-lg px-4 py-3 break-words`}
                >
                  <p className="text-xs font-semibold text-gray-300 mb-1">
                    {msg.name}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "investor"
                        ? "text-blue-100/60"
                        : "text-gray-400"
                    }`}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="border-t border-cyan-500/20 px-6 py-4 bg-slate-900/50">
          <div className="flex gap-3">
            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-cyan-400">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition text-gray-400 hover:text-cyan-400">
                <Image className="w-5 h-5" />
              </button>
            </div>

            {/* INPUT FIELD */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 rounded-lg transition text-white"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* TYPING INDICATOR INFO */}
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
