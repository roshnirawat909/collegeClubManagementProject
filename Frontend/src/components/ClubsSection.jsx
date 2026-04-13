import React, { useState, useEffect } from "react";
import { clubsAPI } from "../services/api.js"; 

function ClubsSection({ user }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isJoining, setIsJoining] = useState({});
  const [selectedClub, setSelectedClub] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [membersLoading, setMembersLoading] = useState({});

  const toggleJoin = async (clubId) => {
    setIsJoining(prev => ({ ...prev, [clubId]: true }));
    try {
      // Local state toggle (works with demo data)
      setClubs(prevClubs => 
        prevClubs.map(club => 
          club._id === clubId 
            ? {
                ...club,
                members: club.members.some(m => m._id === user.id)
                  ? club.members.filter(m => m._id !== user.id)
                  : [...club.members, { _id: user.id, name: user.name }]
              }
            : club
        ).sort((a, b) => a.name.localeCompare(b.name))
      );
    } catch (err) {
      console.error('Join/leave failed', err);
    } finally {
      setIsJoining(prev => ({ ...prev, [clubId]: false }));
    }
  };

  const openClubDetails = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  const loadMembers = async (clubId) => {
    if (membersLoading[clubId]) return;
    setMembersLoading(prev => ({ ...prev, [clubId]: true }));
    // Members already populated from API
    setMembersLoading(prev => ({ ...prev, [clubId]: false }));
  };

  useEffect(() => {
    clubsAPI.getAll().then(res => {
      setClubs(res.data.sort((a, b) => a.name.localeCompare(b.name)));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []); 

  if (loading) return <div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div></div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Clubs & Committees</h2>
        <p className="text-slate-500">Explore and join various clubs to enhance your college experience</p>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            onClick={() => openClubDetails(club)}
          >
            {/* Club Header with Gradient */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-4xl">🎯</span>
                {club.members.some(m => m._id === user.id) && (
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Joined
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mt-3">{club.name}</h3>
            </div>

            {/* Club Content */}
            <div className="p-5">
              <p className="text-slate-600 mb-4 line-clamp-2">{club.description || 'Club description'}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 mr-3">👑</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">President</p>
                    <p className="font-semibold text-slate-800">{club.president || 'TBA'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 mr-3">👥</span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Members</p>
                    <p className="font-semibold text-slate-800">{club.members.length}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleJoin(club._id);
                }}
                disabled={isJoining[club._id]}
                className={`w-full py-2.5 px-4 rounded-xl font-medium transition-all duration-200 ${
                  isJoining[club._id]
                    ? "bg-slate-300 cursor-not-allowed"
                    : club.members.some(m => m._id === user.id)
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {isJoining[club._id] ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : club.members.some(m => m._id === user.id) ? 'Leave Club' : 'Join Club'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Club Details Modal */}
      {showModal && selectedClub && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b bg-gradient-to-r from-orange-400 to-red-500 rounded-t-2xl text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{selectedClub.name}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Description</h4>
                <p className="text-slate-600 leading-relaxed">{selectedClub.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">President</h4>
                  <p className="text-slate-700 font-medium">{selectedClub.president || 'TBA'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Total Members</h4>
                  <p className="text-slate-700 font-medium text-2xl">{selectedClub.members.length}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3 flex items-center">
                  Members <span className="ml-2 text-sm text-slate-400">(showing first 10)</span>
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {selectedClub.members.slice(0, 10).map((member) => (
                    <div key={member._id} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto text-white font-semibold text-sm mb-1">
                        {member.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <p className="text-xs text-slate-700 font-medium truncate">{member.name}</p>
                    </div>
                  ))}
                </div>
                {selectedClub.members.length > 10 && (
                  <p className="text-sm text-slate-500 mt-3 text-center">
                    +{selectedClub.members.length - 10} more members
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t bg-slate-50 rounded-b-2xl flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => {
                  toggleJoin(selectedClub._id);
                  setShowModal(false);
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 flex-1 min-w-[120px] text-center"
              >
                {selectedClub.members.some(m => m._id === user.id) ? 'Leave Club' : 'Join Club'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 bg-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-300 transition-colors flex-1 min-w-[120px] text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {clubs.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No Clubs Available</h3>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">Check back later for new clubs or contact admin.</p>
        </div>
      )}
    </div>
  );
}

export default ClubsSection;
