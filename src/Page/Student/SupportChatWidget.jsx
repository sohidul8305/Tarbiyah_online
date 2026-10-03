// src/Page/Student-dashboard/SupportChatWidget.jsx
import React, { useState, useEffect } from "react";
import {
  FaHeadset,
  FaPaperPlane,
  FaTimes,
  FaSync,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const API = "https://api.tarbiyahonline.com/api";

const SupportChatWidget = () => {
  const [tickets, setTickets] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const getStudentInfo = () => {
    try {
      const s =
        localStorage.getItem("studentInfo") ||
        localStorage.getItem("campusStudentInfo");
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  };

  const fetchTickets = async () => {
    const s = getStudentInfo();
    if (!s) return setLoading(false);

    const params = new URLSearchParams();
    if (s.studentId) params.append("studentId", s.studentId);
    if (s.phone) params.append("phone", s.phone);
    if (s.email) params.append("email", s.email);

    try {
      const res = await fetch(`${API}/support/my-tickets?${params}`);
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets || []);
        setUnread(data.unread || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const t = setInterval(fetchTickets, 30000);
    return () => clearInterval(t);
  }, []);

  const openTicket = async (t) => {
    setSelected(t);
    // Mark as seen
    try {
      await fetch(`${API}/support/ticket/${t._id}/student-seen`, {
        method: "PUT",
      });
      setUnread((u) => Math.max(0, u - 1));
      setTickets((prev) =>
        prev.map((x) =>
          x._id === t._id ? { ...x, hasUnreadAdminReply: false } : x,
        ),
      );
    } catch (e) {}
  };

  const sendReply = async () => {
    if (!replyText.trim() || !selected) return;
    setSending(true);
    try {
      const res = await fetch(`${API}/support/ticket/${selected._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText, role: "user" }),
      });
      const data = await res.json();
      if (data.success) {
        setSelected(data.ticket);
        setReplyText("");
        fetchTickets();
      }
    } finally {
      setSending(false);
    }
  };

  const getStatusColor = (s) => {
    if (s === "Resolved") return "bg-green-100 text-green-700";
    if (s === "In Progress") return "bg-blue-100 text-blue-700";
    if (s === "Closed") return "bg-gray-100 text-gray-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed bottom-6 right-6 z-[60] bg-teal-600 hover:bg-teal-700 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center relative"
      >
        <FaHeadset size={22} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {unread}
          </span>
        )}
      </button>

      {/* Panel */}
      {showPanel && (
        <div className="fixed bottom-24 right-6 z-[60] w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="p-3 bg-teal-600 text-white rounded-t-2xl flex justify-between items-center">
            <div>
              <p className="font-bold text-sm flex items-center gap-2">
                <FaHeadset size={14} /> Support Tickets
              </p>
              <p className="text-[10px] opacity-80">
                {tickets.length} total • {unread} unread
              </p>
            </div>
            <div className="flex gap-1">
              <Link
                to="/student-support"
                className="p-1.5 hover:bg-white/20 rounded"
                title="New ticket"
              >
                <FaPlusCircle size={14} />
              </Link>
              <button
                onClick={fetchTickets}
                className="p-1.5 hover:bg-white/20 rounded"
              >
                <FaSync size={12} className={loading ? "animate-spin" : ""} />
              </button>
              <button
                onClick={() => setShowPanel(false)}
                className="p-1.5 hover:bg-white/20 rounded"
              >
                <FaTimes size={14} />
              </button>
            </div>
          </div>

          {/* Body */}
          {selected ? (
            <>
              <div className="p-3 border-b bg-gray-50">
                <button
                  onClick={() => setSelected(null)}
                  className="text-[10px] text-teal-600 font-bold mb-1"
                >
                  ← Back
                </button>
                <p className="text-xs font-bold">{selected.subject}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${getStatusColor(selected.status)}`}
                  >
                    {selected.status}
                  </span>
                  <span className="text-[9px] text-gray-500">
                    #{selected._id}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                <div className="bg-blue-50 p-2 rounded text-[11px]">
                  <strong>Problem:</strong> {selected.problemDetails}
                </div>

                {(selected.replies || []).map((r, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      r.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-2 rounded-lg text-[11px] ${
                        r.role === "user"
                          ? "bg-teal-100 border-l-2 border-teal-500"
                          : "bg-white border-l-2 border-blue-500 shadow-sm"
                      }`}
                    >
                      <p className="text-[9px] font-bold mb-0.5">
                        {r.role === "user" ? "👤 You" : "👨‍💼 Admin"}
                      </p>
                      <p>{r.message}</p>
                      <p className="text-[8px] text-gray-500 mt-1">{r.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t flex gap-2">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  placeholder="Reply..."
                  className="flex-1 border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={sendReply}
                  disabled={sending}
                  className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg disabled:opacity-50"
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="p-6 text-center text-xs text-gray-500">
                  Loading...
                </p>
              ) : tickets.length === 0 ? (
                <div className="p-6 text-center">
                  <FaHeadset className="text-3xl text-gray-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-gray-700">
                    No support tickets
                  </p>
                  <Link
                    to="/student-support"
                    className="text-[10px] text-teal-600 underline mt-1 inline-block"
                  >
                    Create your first ticket
                  </Link>
                </div>
              ) : (
                tickets.map((t) => (
                  <button
                    key={t._id}
                    onClick={() => openTicket(t)}
                    className={`w-full text-left p-3 border-b hover:bg-teal-50 transition-colors ${
                      t.hasUnreadAdminReply ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {t.hasUnreadAdminReply && (
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          )}
                          <p className="text-xs font-bold text-gray-800 truncate">
                            {t.subject}
                          </p>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                          {t.department} • {(t.replies || []).length} replies
                        </p>
                      </div>
                      <span
                        className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 ${getStatusColor(t.status)}`}
                      >
                        {t.status}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SupportChatWidget;
