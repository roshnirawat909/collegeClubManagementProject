import React, { useState } from "react";

function AttendanceSection() {
  const [studentId, setStudentId] = useState("");
  const [isMarked, setIsMarked] = useState(false);
  const [mode, setMode] = useState("manual"); // 'manual' or 'qr'

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attendance marked for:", studentId);
    setIsMarked(true);
    setTimeout(() => {
      setStudentId("");
      setIsMarked(false);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Mark Attendance</h2>
        <p className="text-slate-500">
          Quickly mark your attendance for club events and meetings.
        </p>
      </div>

      {/* Success Message */}
      {isMarked && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <p className="font-semibold text-green-700">Attendance Marked!</p>
            <p className="text-sm text-green-600">
              Your attendance has been successfully recorded.
            </p>
          </div>
        </div>
      )}

      {/* Mode Selection */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode("manual")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === "manual"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            📝 Manual Entry
          </button>
          <button
            type="button"
            onClick={() => setMode("qr")}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              mode === "qr"
                ? "bg-white text-blue-600 shadow-md"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            📱 QR Code
          </button>
        </div>
      </div>

      {/* Attendance Form */}
      {mode === "manual" ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Student ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-xl">🎫</span>
                </div>
                <input
                  id="studentId"
                  type="text"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
            >
              <span className="mr-2">✅</span>
              Mark Attendance
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <div className="w-48 h-48 mx-auto mb-4 bg-slate-100 rounded-xl flex items-center justify-center">
            <span className="text-6xl">📷</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Scan QR Code
          </h3>
          <p className="text-slate-500 mb-4">
            Point your camera at the QR code displayed at the event venue.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
            Open Camera
          </button>
          <p className="text-xs text-slate-400 mt-4">
            For QR code scanning, integrate a QR reader library in production.
          </p>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-sm text-amber-700">
          <span className="font-semibold">⚠️ Note:</span> Please ensure you
          mark attendance within the designated time frame of the event.
        </p>
      </div>
    </div>
  );
}

export default AttendanceSection;

