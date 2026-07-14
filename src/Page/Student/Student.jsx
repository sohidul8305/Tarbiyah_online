import React from 'react';

const Student = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {/* লোগো বা হেডার */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Student Login</h2>
          <p className="text-gray-500 mt-2">Log in to access your courses and dashboard.</p>
        </div>

        {/* লগইন ফর্ম */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID / Email</label>
            <input 
              type="text" 
              placeholder="Enter your Student ID" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-600 font-semibold hover:underline">Forgot?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          New student? <a href="#" className="text-blue-600 font-bold hover:underline">Register Now</a>
        </div>
      </div>
    </div>
  );
};

export default Student;