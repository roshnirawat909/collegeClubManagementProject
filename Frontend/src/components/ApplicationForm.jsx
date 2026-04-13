import React, { useState } from "react";

function ApplicationForm() {
  const [form, setForm] = useState({ name: '', branch: '', year: '', email: '', reason: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', form);
    setIsSubmitted(true);
    setTimeout(() => {
      setForm({ name: '', branch: '', year: '', email: '', reason: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const updateForm = (field, value) => setForm({ ...form, [field]: value });

  const inputFields = [
    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name', icon: '👤' },
    { id: 'branch', label: 'Branch/Department', type: 'text', placeholder: 'e.g., Computer Science', icon: '📚' },
    { id: 'year', label: 'Year of Study', type: 'number', placeholder: '1, 2, 3, or 4', icon: '📅' },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@university.edu', icon: '✉️' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Club Application</h2>
        <p className="text-slate-500">Apply to join your desired club and be part of something amazing!</p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <p className="font-semibold text-green-700">Application Submitted!</p>
            <p className="text-sm text-green-600">We'll review your application and get back to you soon.</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-xl">{field.icon}</span>
                </div>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.id]}
                  onChange={(e) => updateForm(field.id, e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 placeholder-slate-400"
                  required
                />
              </div>
            </div>
          ))}

          {/* Reason Textarea */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-2">
              Why do you want to join?
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <span className="text-xl">💭</span>
              </div>
              <textarea
                id="reason"
                placeholder="Tell us about your interests and why you'd be a great fit..."
                value={form.reason}
                onChange={(e) => updateForm('reason', e.target.value)}
                rows={4}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 placeholder-slate-400 resize-none"
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {form.reason.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          >
            Submit Application
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">💡 Tip:</span> Make your application stand out by highlighting your unique skills and experiences!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationForm;

