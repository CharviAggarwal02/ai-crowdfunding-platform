import {
  X, Send, Phone, Image, Paperclip,
  Search, MessageCircle, AlertCircle
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import socket from "../socket"; // ← shared socket instance

interface Message {
  id: number;
  sender: "investor" | "entrepreneur";
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface InvestedStartup {
  id?: number;
  startup?: {
    id?: number;
    name?: string;
    description?: string;
    fundingGoal?: number;
    currentFunding?: number;
  };
  amount?: number;
  date?: string;
}

interface InvestorMessagingModalProps {
  investedStartups: InvestedStartup[];
  userName?: string;
  onClose: () => void;
}

export default function InvestorMessagingModal({
  investedStartups,
  userName = "You",
  onClose
}: InvestorMessagingModalProps) {

  const validStartups = investedStartups.filter((item) => item?.startup?.name);

  const [selectedStartup, setSelectedStartup] = useState<InvestedStartup | null>(
    validStartups.length > 0 ? validStartups[0] : null
  );
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ JOIN ROOM + LISTEN FOR INCOMING MESSAGES
  useEffect(() => {
    if (!selectedStartup?.startup?.id) return;

    const startup_id = selectedStartup.startup.id;
    const key = selectedStartup.startup.name || "chat";

    // Join the room for this startup
    socket.emit("join_room", { startup_id });

    // Fetch existing messages from REST API
    const loadMessages = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/messages/${startup_id}`);
        const data = await res.json();
        setMessages((prev) => ({
          ...prev,
          [key]: data.length > 0 ? data : [
            {
              id: 1,
              sender: "entrepreneur",
              name: "Team",
              message: "Hi! Thanks for investing in us.",
              timestamp: "10:00 AM",
              avatar: "👨‍💼"
            }
          ]
        }));
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();

    // ✅ LISTEN for messages coming FROM the entrepreneur
    const handleReceive = (data: Message & { startup_id: number }) => {
      if (data.startup_id !== startup_id) return; // safety check
      if (data.sender === "investor") return; // ignore our own echoed message
      const msgKey = selectedStartup.startup?.name || "chat";
      setMessages((prev) => ({
        ...prev,
        [msgKey]: [...(prev[msgKey] || []), data]
      }));
    };

    socket.on("receive_message", handleReceive);

    // Cleanup: leave listener when switching startups
    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [selectedStartup]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedStartup]);

  const handleSendMessage = async () => {
    if (!selectedStartup?.startup?.id || !selectedStartup?.startup?.name || !newMessage.trim()) return;

    const startup_id = selectedStartup.startup.id;
    const key = selectedStartup.startup.name;

    const msg: Message = {
      id: Date.now(),
      sender: "investor",
      name: userName,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      avatar: "👤"
    };

    // ✅ Instant local update
    setMessages((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), msg]
    }));

    // ✅ EMIT via Socket.io to entrepreneur in real time
    socket.emit("send_message", { ...msg, startup_id });

    // ✅ Also persist to your REST API
    try {
      await fetch("http://127.0.0.1:8000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startup_id,
          sender: "investor",
          name: userName,
          message: newMessage
        })
      });
    } catch (error) {
      console.error(error);
    }

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const filteredStartups = validStartups.filter((item) =>
    item.startup?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedStartup?.startup?.name
    ? messages[selectedStartup.startup.name] || []
    : [];

  if (validStartups.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0A0E1A] rounded-xl p-10 border border-white/10 text-center max-w-md w-full">
          <AlertCircle className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Investments Yet</h2>
          <p className="text-gray-400 mb-6">Invest in startups to unlock messaging.</p>
          <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full h-[90vh] max-h-[800px] bg-[#0A0E1A] rounded-2xl border border-white/10 flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="w-72 border-r border-white/10 flex flex-col">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              Messages
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredStartups.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedStartup(item)}
                className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 ${
                  selectedStartup?.startup?.id === item.startup?.id ? "bg-cyan-500/10" : ""
                }`}
              >
                <h3 className="text-white text-sm font-semibold">{item.startup?.name}</h3>
                <p className="text-xs text-gray-400 truncate">Invested ${Number(item.amount).toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT */}
        <div className="flex-1 flex flex-col">
          <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold text-lg">{selectedStartup?.startup?.name}</h2>
              <p className="text-xs text-gray-400">Startup Founder</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><Phone className="w-5 h-5" /></button>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentMessages.map((msg, index) => (
              <div key={`${msg.id}-${index}`} className={`flex ${msg.sender === "investor" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-3 rounded-lg ${msg.sender === "investor" ? "bg-blue-600 text-white" : "bg-white/10 text-white"}`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:bg-white/10 rounded-lg"><Paperclip className="w-5 h-5" /></button>
              <button className="p-2 text-gray-400 hover:bg-white/10 rounded-lg"><Image className="w-5 h-5" /></button>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
              />
              <button onClick={handleSendMessage} className="p-2 bg-blue-600 text-white rounded-lg">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}