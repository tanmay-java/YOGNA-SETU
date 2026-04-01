import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, CreditCard, Bookmark, ArrowRight, LogOut, Calendar, Shield } from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { schemesAPI } from '../api';

const ICON_MAP = {
  Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [savedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const data = await schemesAPI.getSaved();
        setSavedSchemes(data.schemes);
      } catch (err) {
        console.error('Failed to fetch saved schemes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Profile Banner */}
      <div className="gradient-bg py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-20 -right-20"></div>
          <div className="absolute w-64 h-64 bg-white rounded-full -bottom-10 -left-10"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-xl">
              <span className="text-4xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">
                Welcome, {user?.name || 'User'}!
              </h1>
              <p className="text-white/80 text-lg">
                Manage your profile and saved government schemes
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
                  <Mail className="w-3.5 h-3.5" /> {user?.email}
                </span>
                {user?.aadhaar && (
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full">
                    <CreditCard className="w-3.5 h-3.5" /> Aadhaar: ****{user.aadhaar.slice(-4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-primary/10">
              <Bookmark className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{savedSchemes.length}</p>
              <p className="text-sm text-gray-500">Saved Schemes</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-secondary/10">
              <Shield className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Verified</p>
              <p className="text-sm text-gray-500">Account Status</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-orange-100">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A'}
              </p>
              <p className="text-sm text-gray-500">Member Since</p>
            </div>
          </motion.div>
        </div>

        {/* Saved Schemes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Bookmark className="w-6 h-6 text-primary" />
              Saved Schemes
            </h2>
            <Link to="/home" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              Browse More →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedSchemes.map((scheme, index) => {
                const IconComponent = ICON_MAP[scheme.icon] || Activity;
                return (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/scheme/${scheme.id}`}
                      className="block bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${scheme.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors truncate">
                            {scheme.title}
                          </h3>
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {scheme.category}
                          </span>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{scheme.description}</p>
                          <div className="mt-3 flex items-center text-sm font-semibold text-primary">
                            View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-2xl border border-gray-100 shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Bookmark className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No saved schemes yet</h3>
              <p className="mt-1 text-gray-500 mb-6">Start browsing and save schemes that interest you.</p>
              <Link
                to="/home"
                className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                Browse Schemes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-4 py-2 rounded-xl hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
