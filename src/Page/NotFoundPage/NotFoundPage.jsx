import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass, ArrowLeft, BookOpen } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
        {/* Visual Icon / Illustration */}
        <div className="relative flex justify-center">
          <div className="absolute -inset-1 rounded-full bg-emerald-100 blur-sm opacity-75"></div>
          <div className="relative w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-12 h-12" />
          </div>
        </div>

        {/* Error Code & Title */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-700 bg-emerald-50 rounded-full uppercase">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            Page Not Found <span className="text-2xl">😔</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-sm mx-auto">
            Oops! It looks like the page you are looking for on Tarbiyah Online
            has been moved, removed, or never existed.
          </p>
        </div>

        {/* Quick Links / Navigation Suggestions */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-400 mb-4 uppercase tracking-wider">
            Here are some helpful links
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/courses"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all border border-slate-200"
            >
              <Compass className="w-4 h-4" />
              All Courses
            </Link>
            <Link
              to="/student/dashboard"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all border border-slate-200"
            >
              <BookOpen className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => window.history.back()}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
