import React from "react";

function Dashboard({ user, setActiveSection }) {
  const stats = [
    { label: "Total Clubs", value: "5", icon: "🎯", color: "from-blue-500 to-blue-600" },
    { label: "Total Members", value: "120", icon: "👥", color: "from-green-500 to-green-600" },
    { label: "Total Events", value: "15", icon: "🎉", color: "from-purple-500 to-purple-600" },
  ];

  const recentActivities = [
    { id: 1, title: "Coding Challenge 2024", date: "Dec 15, 2024", status: "Completed" },
    { id: 2, title: "Annual Sports Day", date: "Dec 10, 2024", status: "Completed" },
    { id: 3, title: "Cultural Fest", date: "Dec 5, 2024", status: "Upcoming" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h2>
        <p className="text-blue-100">
          Here's what's happening in your college clubs today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">📅</span> Recent Activities
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-800">{activity.title}</p>
                  <p className="text-sm text-slate-500">{activity.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">⚡</span> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setActiveSection('application')} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-left cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform">
              <span className="text-2xl block mb-1">📝</span>
              <span className="font-medium text-blue-700">Apply for Club</span>
            </button>
            <button onClick={() => setActiveSection('attendance')} className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors text-left cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform">
              <span className="text-2xl block mb-1">✅</span>
              <span className="font-medium text-green-700">Mark Attendance</span>
            </button>
            <button onClick={() => setActiveSection('certificates')} className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors text-left cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform">
              <span className="text-2xl block mb-1">🏆</span>
              <span className="font-medium text-purple-700">View Certificates</span>
            </button>
            <button onClick={() => setActiveSection('feedback')} className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors text-left cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transform">
              <span className="text-2xl block mb-1">💬</span>
              <span className="font-medium text-orange-700">Give Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campus Image Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src="https://placehold.co/1200x400/1e3a5f/ffffff?text=College+Campus+Activities"
          alt="College campus activities"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 text-white">
            <p className="text-lg font-semibold">Join our vibrant campus community!</p>
            <p className="text-sm text-white/80">Participate in clubs, events, and activities</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
