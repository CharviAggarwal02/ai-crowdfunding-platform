import { X, Send, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import socket from "../socket";

interface Message {
  id: number;
  sender: "investor" | "entrepreneur";
  name: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

interface Investor {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  amount?: number;
  investmentDate?: string;
}

interface Props {
  investors?: Investor[];
  startupId: number;
  userName?: string;
  onClose: () => void;
}

export default function EntrepreneurMessagingModal({
  startupId,
  userName = "You",
  onClose
}: Props) {

  const [investorsList, setInvestorsList] = useState<Investor[]>([]);
  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ FETCH INVESTORS FOR THIS STARTUP
  useEffect(() => {
    if (!startupId) return;

    const fetchInvestors = async () => {
      try {
        console.log(`[ENTREPRENEUR] Fetching investors for startup: ${startupId}`);
        const res = await fetch(`http://127.0.0.1:8000/api/investors/${startupId}`);
        const data = await res.json();
        console.log("[ENTREPRENEUR] Investors fetched:", data);
        setInvestorsList(data);
        
        // Auto-select first investor
        if (data.length > 0) {
          setSelectedInvestor(data[0]);
        }
      } catch (error) {
        console.error("[ENTREPRENEUR] Error fetching investors:", error);
        setInvestorsList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestors();
  }, [startupId]);

  // ✅ CONNECT + JOIN ROOM
  useEffect(() => {
    if (!startupId) return;

    if (!socket.connected) socket.connect();

    const joinRoom = () => {
      console.log("[ENTREPRENEUR] Joining room:", startupId);
      socket.emit("join_room", { startup_id: startupId });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
    }

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [startupId]);

  // ✅ SOCKET LISTENER (STABLE)
  useEffect(() => {

    const handleReceive = (data: Message & { startup_id: number }) => {
      console.log("[ENTREPRENEUR] Message received from socket:", data);

      if (data.startup_id !== startupId) return;
      if (data.sender === "entrepreneur") return; // ignore our own echoed message

      const investorId = selectedInvestor?.id;
      if (!investorId) return;

      setMessages((prev) => ({
        ...prev,
        [investorId]: [...(prev[investorId] || []), data]
      }));
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };

  }, [startupId, selectedInvestor]);

  // ✅ LOAD MESSAGES FOR SELECTED INVESTOR
  useEffect(() => {
    if (!selectedInvestor?.id || !startupId) return;

    const loadMessages = async () => {
      try {
        console.log(`[ENTREPRENEUR] Loading messages for startup ${startupId}`);
        const res = await fetch(`http://127.0.0.1:8000/api/messages/${startupId}`);
        const data = await res.json();
        
        setMessages((prev) => ({
          ...prev,
          [selectedInvestor.id]: data || []
        }));
      } catch (error) {
        console.error("[ENTREPRENEUR] Error loading messages:", error);
      }
    };

    loadMessages();
  }, [selectedInvestor?.id, startupId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedInvestor]);

  // ✅ SEND MESSAGE
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedInvestor) return;

    const message: Message = {
      id: Date.now(),
      sender: "entrepreneur",
      name: userName,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => ({
      ...prev,
      [selectedInvestor.id]: [...(prev[selectedInvestor.id] || []), message]
    }));

    socket.emit("send_message", {
      ...message,
      startup_id: startupId
    });

    fetch("http://127.0.0.1:8000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startup_id: startupId,
        sender: "entrepreneur",
        name: userName,
        message: newMessage
      })
    }).catch(err => console.error("[ENTREPRENEUR] Error saving message:", err));

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const filteredInvestors = investorsList.filter((investor) =>
    `${investor.firstName || ""} ${investor.lastName || ""}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedInvestor
    ? messages[selectedInvestor.id] || []
    : [];

  // ❗ ONLY block if startupId missing
  if (!startupId) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        No Startup Selected
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#0A0E1A] rounded-xl p-10 border border-white/10 text-center">
          <p className="text-white">Loading investors...</p>
        </div>
      </div>
    );
  }

  if (investorsList.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0A0E1A] rounded-xl p-10 border border-white/10 text-center max-w-md w-full">
          <AlertCircle className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Investors Yet</h2>
          <p className="text-gray-400 mb-6">Your startup hasn't received any investments yet.</p>
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
          <div className="p-4 border-b border-white/10">
            <input
              placeholder="Search investors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredInvestors.map((investor) => (
              <button
                key={investor.id}
                onClick={() => setSelectedInvestor(investor)}
                className={`block w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/10 transition ${
                  selectedInvestor?.id === investor.id ? "bg-blue-500/20" : ""
                }`}
              >
                <p className="text-white font-semibold text-sm">
                  {investor.firstName} {investor.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">{investor.email}</p>
                {investor.amount && (
                  <p className="text-xs text-green-400 mt-1">Invested: ₹{investor.amount}</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CHAT */}
        <div className="flex-1 flex flex-col">

          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <div>
              <h2 className="text-white font-bold text-lg">
                {selectedInvestor?.firstName} {selectedInvestor?.lastName}
              </h2>
              <p className="text-xs text-gray-400">Investor</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg, idx) => (
              <div
                key={`${msg.id}-${idx}`}
                className={`flex ${msg.sender === "entrepreneur" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.sender === "entrepreneur"
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500"
              />
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}