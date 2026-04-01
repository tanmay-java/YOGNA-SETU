import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, BookmarkCheck, ExternalLink, Calendar, Building2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { schemesAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const ICON_MAP = {
  Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor
};

const SchemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateSavedSchemes } = useAuth();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isSaved = user?.savedSchemes?.includes(parseInt(id));

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const data = await schemesAPI.getById(id);
        setScheme(data.scheme);
      } catch (err) {
        setError('Failed to load scheme details.');
      } finally {
        setLoading(false);
      }
    };
    fetchScheme();
  }, [id]);

  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    setSaving(true);
    try {
      const data = await schemesAPI.toggleSave(parseInt(id));
      updateSavedSchemes(data.savedSchemes);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Scheme Not Found</h3>
          <p className="text-gray-500 mb-6">{error || 'The scheme you are looking for does not exist.'}</p>
          <Link to="/home" className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
            Browse All Schemes
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = ICON_MAP[scheme.icon] || Activity;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="gradient-bg py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute w-96 h-96 bg-white rounded-full -top-20 -right-20"></div>
          <div className="absolute w-64 h-64 bg-white rounded-full -bottom-10 -left-10"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <Link to="/home" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to All Schemes
          </Link>
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-2xl bg-white/20 backdrop-blur-sm`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {scheme.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{scheme.title}</h1>
              <p className="text-white/80 text-lg">{scheme.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Key Benefits
              </h2>
              <ul className="space-y-3">
                {scheme.benefits?.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-secondary" />
                Eligibility Criteria
              </h2>
              <p className="text-gray-700 bg-secondary/5 rounded-xl p-4 border border-secondary/10">
                {scheme.eligibility}
              </p>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Required Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheme.documents?.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full flex justify-center items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 mb-4 ${
                  isSaved
                    ? 'bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/20'
                    : 'gradient-bg text-white shadow-lg shadow-primary/25 hover:opacity-90 hover:-translate-y-0.5'
                } disabled:opacity-50`}
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin"></div>
                ) : isSaved ? (
                  <>
                    <BookmarkCheck className="w-5 h-5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5" />
                    Save Scheme
                  </>
                )}
              </button>

              {scheme.website && (
                <a
                  href={scheme.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-50 ring-1 ring-gray-200 hover:bg-gray-100 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Official Website
                </a>
              )}

              <div className="mt-6 space-y-4 pt-6 border-t border-gray-100">
                {scheme.ministry && (
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Ministry</p>
                      <p className="text-sm text-gray-900 font-medium">{scheme.ministry}</p>
                    </div>
                  </div>
                )}
                {scheme.launchDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Launch Date</p>
                      <p className="text-sm text-gray-900 font-medium">
                        {new Date(scheme.launchDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {!isAuthenticated && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-xs text-yellow-800 font-medium">
                    <Link to="/signin" className="text-primary font-semibold hover:underline">Sign in</Link> to save schemes and track your applications.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SchemeDetail;
