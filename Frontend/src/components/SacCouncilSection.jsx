 import React from "react";

function SacCouncilSection() {
  const members = [
    { 
      name: 'Dr. John Doe', 
      designation: 'Chairperson', 
      contact: '123-456-7890', 
      email: 'john@univ.edu',
      image: '👨‍💼'
    },
    { 
      name: 'Prof. Jane Smith', 
      designation: 'Vice Chairperson', 
      contact: '123-456-7891', 
      email: 'jane@univ.edu',
      image: '👩‍🏫'
    },
    { 
      name: 'Mr. Robert Brown', 
      designation: 'Secretary', 
      contact: '123-456-7892', 
      email: 'robert@univ.edu',
      image: '👨‍💻'
    },
    { 
      name: 'Ms. Emily White', 
      designation: 'Treasurer', 
      contact: '123-456-7893', 
      email: 'emily@univ.edu',
      image: '👩‍💼'
    },
  ];

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">SAC Council Details</h2>
        <p className="text-slate-500">No council members available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">SAC Council Details</h2>
        <p className="text-slate-500">Meet the Student Activity Council members</p>
      </div>

      {/* Council Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((mem, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Member Header */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center text-4xl mb-3">
                {mem.image}
              </div>
              <h3 className="text-lg font-bold text-white">{mem.name}</h3>
              <p className="text-blue-100 text-sm">{mem.designation}</p>
            </div>

            {/* Member Details */}
            <div className="p-5 space-y-3">
              <div className="flex items-center text-sm">
                <span className="w-8 text-slate-400">📞</span>
                <span className="text-slate-600">{mem.contact}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="w-8 text-slate-400">✉️</span>
                <span className="text-slate-600 truncate">{mem.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table View (Hidden on small screens) */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hidden md:block">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Council Members List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {members.map((mem, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {mem.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800">{mem.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{mem.designation}</td>
                  <td className="px-6 py-4 text-slate-600">{mem.contact}</td>
                  <td className="px-6 py-4 text-slate-600">{mem.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SacCouncilSection;

