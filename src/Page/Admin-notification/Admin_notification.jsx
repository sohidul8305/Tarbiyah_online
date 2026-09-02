import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSpinner,
  FaEye,
  FaTrash,
  FaCheck,
  FaSync,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Admin_notification = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/support/tickets");
      const data = await response.json();
      if (data.success) setTickets(data.tickets);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id) => {
    await fetch(`http://localhost:5000/api/support/ticket/${id}/read`, {
      method: "PUT",
    });
    setTickets(tickets.map((t) => (t._id === id ? { ...t, isRead: true } : t)));
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/support/ticket/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setTickets(
      tickets.map((t) => (t._id === id ? { ...t, status: newStatus } : t)),
    );
  };

  const deleteTicket = async (id) => {
    const result = await Swal.fire({
      title: "Delete this ticket?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await fetch(`http://localhost:5000/api/support/ticket/${id}`, {
        method: "DELETE",
      });
      setTickets(tickets.filter((t) => t._id !== id));
    }
  };

  // ✅ অ্যাডমিন রিপ্লাই মোডাল
  const viewTicket = (ticket) => {
    Swal.fire({
      title: `📋 Support Ticket: ${ticket.subject}`,
      html: `
        <div style="text-align: left; font-size: 13px; max-height: 500px; overflow-y: auto;">
          <p><strong>নাম:</strong> ${ticket.name}</p>
          <p><strong>ফোন:</strong> ${ticket.phone}</p>
          <p><strong>ইমেইল:</strong> ${ticket.email}</p>
          <p><strong>ডিপার্টমেন্ট:</strong> ${ticket.department}</p>
          <hr>
          <p><strong>সমস্যা বিবরণ:</strong></p>
          <p style="background: #f3f4f6; padding: 10px; border-radius: 8px;">${ticket.problemDetails}</p>
          <hr>
          <div style="margin-top: 15px;">
             <p><strong>📝 আপনার রিপ্লাই লিখুন:</strong></p>
             <textarea id="swal-reply-input" class="swal2-textarea" placeholder="এখানে রিপ্লাই লিখুন..."></textarea>
          </div>
        </div>
      `,
      width: 700,
      showCancelButton: true,
      confirmButtonText: "রিপ্লাই পাঠান",
      cancelButtonText: "বন্ধ করুন",
      preConfirm: async () => {
        const replyMessage = document.getElementById("swal-reply-input").value;
        if (!replyMessage.trim()) {
          Swal.showValidationMessage("রিপ্লাই লিখুন");
          return false;
        }
        try {
          const response = await fetch(
            `http://localhost:5000/api/support/ticket/${ticket._id}/reply`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: replyMessage }),
            },
          );
          const data = await response.json();
          if (data.success) {
            setTickets((prev) =>
              prev.map((t) =>
                t._id === ticket._id
                  ? {
                      ...t,
                      status: "In Progress",
                      replies: data.ticket.replies,
                    }
                  : t,
              ),
            );
            return true;
          } else {
            Swal.showValidationMessage(data.message || "রিপ্লাই যায়নি!");
            return false;
          }
        } catch (error) {
          Swal.showValidationMessage("সার্ভার এরর!");
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed)
        Swal.fire({
          icon: "success",
          title: "রিপ্লাই পাঠানো হয়েছে!",
          timer: 1500,
          showConfirmButton: false,
        });
    });
  };

  const filteredTickets = tickets
    .filter((t) =>
      filter === "all" ? true : filter === "unread" ? !t.isRead : t.isRead,
    )
    .filter((t) => (statusFilter === "all" ? true : t.status === statusFilter));

  const unreadCount = tickets.filter((t) => !t.isRead).length;

  return (
    <div className="h-full flex flex-col space-y-3 overflow-hidden">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
          <FaBell className="text-yellow-600" /> Support Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse">
              {unreadCount} New
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchTickets}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs"
          >
            <FaSync size={12} /> Refresh
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 border rounded-lg text-xs"
        >
          <option value="all">All Tickets</option>
          <option value="unread">Unread ({unreadCount})</option>
          <option value="read">Read</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-2 py-1 border rounded-lg text-xs"
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No tickets found
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">
                  Student
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">
                  Department
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">
                  Subject
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">
                  Status
                </th>
                <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTickets.map((ticket) => (
                <tr key={ticket._id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <p className="text-xs font-medium">{ticket.name}</p>
                    <p className="text-[10px] text-gray-500">{ticket.phone}</p>
                  </td>
                  <td className="px-3 py-2 text-xs">{ticket.department}</td>
                  <td className="px-3 py-2 text-xs">{ticket.subject}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[8px] px-1.5 py-0.5 rounded-full ${ticket.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ticket.status === "In Progress" ? "bg-blue-100 text-blue-700" : ticket.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => viewTicket(ticket)}
                        className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                        title="View/Reply"
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        onClick={() => deleteTicket(ticket._id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin_notification;
