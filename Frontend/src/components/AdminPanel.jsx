import React, { useState } from "react";

function AdminPanel() {
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([
    { id: 1, text: "Club meeting scheduled for Friday at 3 PM", date: "Dec 18, 2024" },
    { id: 2, text: "Annual fest registrations open now!", date: "Dec 15, 2024" },
  ]);

  const postNotice = () => {
    if (notice.trim()) {
      console.log("Notice posted:", notice);
      setNotices([
        { id: Date.now(), text: notice, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
        ...notices,
      ]);
      setNotice("");
      alert("Notice posted!");
    }
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Admin Panel</h2>
        <p className="text-slate-500">Manage club applications, events, and post notices.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Pending Applications</p>
              <p className="text-2xl font-bold text-slate-800">12</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              📝
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Active Events</p>
              <p className="text-2xl font-bold text-slate-800">5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
              🎉
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Clubs</p>
              <p className="text-2xl font-bold text-slate-800">7</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
              🎯
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-slate-800">120</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
              👥
            </div>
          </div>
        </div>
      </div>

      {/* Post Notice Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="mr-2">📢</span> Post Notice/Update
        </h3>
        <div className="space-y-4">
          <textarea
            placeholder="Write your notice or update here..."
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 placeholder-slate-400 resize-none"
          />
          <button
            onClick={postNotice}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-200 flex items-center"
          >
            <span className="mr-2">📤</span>
            Post Notice
          </button>
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="mr-2">📋</span> Recent Notices
        </h3>
        <div className="space-y-3">
          {notices.length === 0 ? (
            <p className="text-slate-500 text-center py-4">No notices posted yet.</p>
          ) : (
            notices.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-slate-800 font-medium">{item.text}</p>
                  <p className="text-sm text-slate-400 mt-1">{item.date}</p>
                </div>
                <button
                  onClick={() => deleteNotice(item.id)}
                  className="text-red-400 hover:text-red-600 p-1 transition-colors"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-left group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              ✅
            </div>
            <div>
              <p className="font-semibold text-slate-800">Approve Applications</p>
              <p className="text-sm text-slate-500">Review pending requests</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-left group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              🎊
            </div>
            <div>
              <p className="font-semibold text-slate-800">Manage Events</p>
              <p className="text-sm text-slate-500">Create & edit events</p>
            </div>
          </div>
        </button>
        <button className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-left group">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <div>
              <p className="font-semibold text-slate-800">View Reports</p>
              <p className="text-sm text-slate-500">Analytics & insights</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;

