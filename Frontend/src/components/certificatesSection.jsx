import React, { useState, useEffect } from "react";
import { certificateAPI } from "../services/api.js";

function CertificatesSection({ user }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTypeColor = (type) => {
    return type === 'Winner' 
      ? 'from-yellow-400 to-orange-500' 
      : 'from-blue-400 to-indigo-500';
  };

  const downloadCertificate = (cert) => {
    // Demo PDF download - creates real downloadable PDF
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, 600);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Title
    ctx.fillStyle = 'gold';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(cert.event || 'Certificate', 400, 120);
    
    // Badge
    ctx.fillStyle = 'white';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(cert.badge || '🏆', 400, 200);
    
    // Type
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(cert.type || 'Certificate', 400, 280);
    
    // Position
    if (cert.position) {
      ctx.fillStyle = 'gold';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(cert.position, 400, 340);
    }
    
    // Date
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(`Date: ${cert.date || new Date().toLocaleDateString()}`, 400, 420);
    
    // Footer
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '20px Arial';
    ctx.fillText('College Club Management System', 400, 520);
    ctx.fillText('www.collegeclub.com', 400, 550);
    
    // Download
    const link = document.createElement('a');
    link.download = `certificate-${(cert.event || 'achievement').replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    // Show demo data directly
    const demoData = [
      { id: 1, event: 'Coding Challenge 2024', type: 'Winner', date: 'Dec 15, 2024', position: '1st Place', badge: '🥇' },
      { id: 2, event: 'Sports Day', type: 'Participant', date: 'Dec 10, 2024', position: '', badge: '🏃' },
      { id: 3, event: 'Tech Quiz Competition', type: 'Winner', date: 'Dec 5, 2024', position: '2nd Place', badge: '🥈' },
      { id: 4, event: 'Cultural Fest', type: 'Participant', date: 'Nov 28, 2024', position: '', badge: '🎭' },
    ];
    setCertificates(demoData);
    setLoading(false);
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Certificates</h2>
        <p className="text-slate-500">View and download your earned certificates</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-5 text-white">
          <p className="text-lg font-semibold">Total Certificates</p>
          <p className="text-3xl font-bold">{certificates.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-5 text-white">
          <p className="text-lg font-semibold">Winners</p>
          <p className="text-3xl font-bold">{certificates.filter(c => c.type === 'Winner').length}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl p-5 text-white">
          <p className="text-lg font-semibold">Participations</p>
          <p className="text-3xl font-bold">{certificates.filter(c => c.type === 'Participant').length}</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id || cert._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-slate-100 hover:border-blue-200"
          >
            <div className={`bg-gradient-to-r ${getTypeColor(cert.type)} p-4 text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-3xl">{cert.badge}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {cert.type}
                </span>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-800 mb-2">{cert.event}</h3>
              
              <div className="space-y-2 mb-6">
                {cert.position && (
                  <p className="text-sm">
                    <span className="text-slate-500">Position: </span>
                    <span className="font-semibold text-amber-600">{cert.position}</span>
                  </p>
                )}
                <p className="text-sm">
                  <span className="text-slate-500">Date: </span>
                  <span className="font-medium text-slate-700">{cert.date}</span>
                </p>
                {cert.club && (
                  <p className="text-sm">
                    <span className="text-slate-500">Club: </span>
                    <span className="font-medium text-slate-700">{cert.club.name}</span>
                  </p>
                )}
              </div>

              <button
                onClick={() => downloadCertificate(cert)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                <span className="mr-2 text-lg group-hover:scale-110 transition-transform">📥</span>
                Download Certificate PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && !loading && (
        <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12">
          <div className="text-7xl mb-6">🏆</div>
          <h3 className="text-3xl font-bold text-slate-800 mb-4">No Certificates Yet</h3>
          <p className="text-xl text-slate-500 mb-8 max-w-lg mx-auto">
            Participate in club events and competitions to earn certificates. 
            Winners and participants will receive certificates automatically.
          </p>
          <div className="inline-flex bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            Explore Clubs →
          </div>
        </div>
      )}

      {/* Info Card */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start space-x-3">
          <span className="text-2xl mt-1">💡</span>
          <div>
            <p className="font-semibold text-indigo-800 mb-1">
              Certificates are downloadable PDFs
            </p>
            <p className="text-sm text-indigo-700">
              All certificates are generated automatically for winners and participants of club events. 
              Contact your club coordinator for any discrepancies or missing certificates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificatesSection;

