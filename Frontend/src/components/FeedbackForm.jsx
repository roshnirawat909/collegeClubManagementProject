import React, { useState } from "react";

function FeedbackForm() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { message, rating });
    setIsSubmitted(true);
    setTimeout(() => {
      setMessage('');
      setRating(0);
      setIsSubmitted(false);
    }, 3000);
  };

  const maxChars = 500;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Submit Feedback</h2>
        <p className="text-slate-500">Help us improve! Share your thoughts and suggestions.</p>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
          <span className="text-2xl mr-3">✅</span>
          <div>
            <p className="font-semibold text-green-700">Thank you for your feedback!</p>
            <p className="text-sm text-green-600">We appreciate your input in making our system better.</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              How would you rate your experience?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
              <span className="ml-3 text-sm text-slate-500">
                {rating > 0 ? `${rating} out of 5 stars` : 'Tap to rate'}
              </span>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
              Your Feedback
            </label>
            <div className="relative">
              <textarea
                id="message"
                placeholder="Share your thoughts, suggestions, or report any issues..."
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxChars))}
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-slate-700 placeholder-slate-400 resize-none"
                required
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                {message.length}/{maxChars}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
          >
            <span className="mr-2">📤</span>
            Submit Feedback
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-700">
            <span className="font-semibold">💡 Note:</span> Your feedback is anonymous and helps us improve the college club experience for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;

