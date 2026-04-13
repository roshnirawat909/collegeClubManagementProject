import React, { useState, useEffect } from "react";
import { updatesAPI } from "../services/api.js";

function UpdatesSection({ user }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Demo data - shown directly
    const demoData = [
      {
        id: 1,
        title: "Winter Tech Fest Registration Open",
        desc: "Join our biggest tech event of the semester with hackathons, workshops, and competitions.",
        category: "Event",
        icon: "🎉",
        date: "2024-12-20"
      },
      {
        id: 2,
        title: "Executive Committee Meeting",
        desc: "Monthly SAC meeting to discuss upcoming events and club budgets. All presidents required.",
        category: "Meeting",
        icon: "📋",
        date: "2024-12-18"
      },
      {
        id: 3,
        title: "Sports Day Results Announced",
        desc: "Congratulations to all winners! Full results and certificates now available.",
        category: "Announcement",
        icon: "🏆",
        date: "2024-12-16"
      },
      {
        id: 4,
        title: "New Club Applications Due",
        desc: "Submit your new club proposals by Friday. Review committee meets next week.",
        category: "Announcement",
        icon: "📢",
        date: "2024-12-15"
      }
    ];
    setUpdates(demoData);
    setLoading(false);
  }, []); 

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Meeting': return 'bg-blue-100 text-blue-700';
      case 'Event': return 'bg-green-100 text-green-700';
      case 'Announcement': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) return <div className="text-center py-12"><div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div> <p className="mt-2 text-slate-500">Loading updates...</p></div>;

  // Modal - moved here to fix 'return outside function' error
  if (showModal && selectedUpdate) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">{selectedUpdate.title}</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">
                {selectedUpdate.icon || '📢'}
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedUpdate.category)}`}>
                {selectedUpdate.category}
              </div>
              <div className="space-y-3">
                <p className="text-slate-700 leading-relaxed">{selectedUpdate.content || selectedUpdate.desc}</p>
              </div>
              <p className="text-sm text-slate-500 flex items-center">
                <span className="mr-1">📆</span>
                {new Date(selectedUpdate.date || selectedUpdate.createdAt).toLocaleDateString("en-US", { 
                  weekday: "long", year: "numeric", month: "long", day: "numeric" 
                })}
              </p>
            </div>
          </div>
          <div className="p-6 border-t bg-slate-50 rounded-b-2xl">
            <button 
              onClick={() => setShowModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Updates & Announcements</h2>
        <p className="text-slate-500">Stay informed about the latest club activities and events</p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="space-y-6">
          {updates
            .filter(update => selectedCategory === "All" || update.category === selectedCategory)
            .map((update, idx) => (
            <div key={update.id} className="relative">
              {/* Timeline Line */}
              {idx !== updates.length - 1 && (
                <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-slate-200"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Date Badge */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="text-lg">{update.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-800">
                      {update.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(update.category)}`}>
                      {update.category}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-2">{update.desc}</p>
                  <p className="text-sm text-slate-400 flex items-center">
                    <span className="mr-1">📆</span>
                    {new Date(update.date).toLocaleDateString("en-US", { 
                      weekday: "long",
                      year: "numeric", 
                      month: "long", 
                      day: "numeric" 
                    })}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => {
                      setSelectedUpdate(update);
                      setShowModal(true);
                    }}
                    className="text-blue-500 hover:text-blue-700 font-medium text-sm hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <p className="text-sm text-slate-500 mb-3">Filter by category:</p>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "All" 
                ? "bg-blue-500 text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600"
            }`}>
            All
          </button>
          <button 
            onClick={() => setSelectedCategory("Meeting")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "Meeting" 
                ? "bg-blue-500 text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600"
            }`}>
            Meetings
          </button>
          <button 
            onClick={() => setSelectedCategory("Event")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "Event" 
                ? "bg-blue-500 text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600"
            }`}>
            Events
          </button>
          <button 
            onClick={() => setSelectedCategory("Announcement")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "Announcement" 
                ? "bg-blue-500 text-white shadow-md" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600"
            }`}>
            Announcements
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatesSection;





