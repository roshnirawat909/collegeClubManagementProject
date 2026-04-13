import React, { useState, useRef } from "react";

function Profile({ user, setUser, setActiveSection }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
  });
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState(user.profilePic || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=center');
  const fileInputRef = useRef(null);

  const stats = [
    { label: "Clubs Joined", value: "3", icon: "🎯", color: "bg-blue-100" },
    { label: "Events Attended", value: "8", icon: "🎉", color: "bg-green-100" },
    { label: "Certificates", value: "5", icon: "🏆", color: "bg-yellow-100" },
    { label: "Hours Contributed", value: "24", icon: "⏰", color: "bg-purple-100" },
  ];

  const clubsJoined = [
    { name: "Shikhar Club", role: "Member", status: "Active" },
    { name: "Tarang Club", role: "Member", status: "Active" },
    { name: "Arjun Club", role: "Member", status: "Active" },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditForm({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Simulate API call
      const updatedUser = { ...user, ...editForm, profilePic };
      setUser(updatedUser);
      setIsEditing(false);
      setSaving(false);
    } catch (err) {
      console.error('Update failed', err);
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={profilePic} 
              alt="Profile" 
              className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-lg"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=center';
              }}
            />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info / Edit Form */}
          <div className="text-center lg:text-left flex-1">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Name</label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-6 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors flex-1 min-w-[100px] disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors flex-1 min-w-[100px] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2 inline-block"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                <p className="text-blue-100 mb-3">{user.email}</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                    Student
                  </span>
                  <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                    Computer Science
                  </span>
                  <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
                    Year 3
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Edit & Upload Buttons */}
          {!isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 self-start ml-auto">
              <button 
                onClick={triggerFileInput}
                className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">📸</span>
                Change Photo
              </button>
              <button 
                onClick={handleEdit}
                className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">✏️</span>
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center text-xl`}>
                {stat.icon}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Joined Clubs */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">🎯</span> My Clubs
          </h3>
          <div className="space-y-3">
            {clubsJoined.map((club, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center text-white font-semibold mr-3">
                    {club.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{club.name}</p>
                    <p className="text-sm text-slate-500">{club.role}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {club.status}
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => setActiveSection('clubs')} className="w-full mt-4 py-2 text-blue-500 hover:text-blue-700 font-medium transition-colors">
            View All Clubs →
          </button>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span> Recent Achievements
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-yellow-50 rounded-xl">
              <span className="text-2xl mr-3">🥇</span>
              <div>
                <p className="font-medium text-slate-800">Coding Challenge 2024</p>
                <p className="text-sm text-slate-500">1st Place</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-xl">
              <span className="text-2xl mr-3">🏃</span>
              <div>
                <p className="font-medium text-slate-800">Sports Day</p>
                <p className="text-sm text-slate-500">Participant</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-xl">
              <span className="text-2xl mr-3">🥈</span>
              <div>
                <p className="font-medium text-slate-800">Tech Quiz Competition</p>
                <p className="text-sm text-slate-500">2nd Place</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <span className="mr-2">📊</span> Activity Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">This Month</p>
            <p className="text-xl font-bold text-slate-800">5 Events</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">This Semester</p>
            <p className="text-xl font-bold text-slate-800">12 Events</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-sm text-slate-500 mb-1">Total Hours</p>
            <p className="text-xl font-bold text-slate-800">24 Hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

