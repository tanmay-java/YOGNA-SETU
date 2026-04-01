import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
import { Activity, Tractor, BookOpen, Briefcase, Home as HomeIcon, Heart, Hammer, Monitor } from 'lucide-react';
import { schemesAPI } from '../api';
import { useAuth } from '../context/AuthContext';

const ICON_MAP = {
  Activity, Tractor, BookOpen, Briefcase, Home: HomeIcon, Heart, Hammer, Monitor
};

const CATEGORIES = ['All', 'Health', 'Agriculture', 'Education', 'Business', 'Housing', 'Women & Child', 'Employment', 'Technology'];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated, updateSavedSchemes } = useAuth();

  useEffect(() => {
    const fetchSchemes = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;

        const data = await schemesAPI.getAll(params);
        setSchemes(data.schemes);
      } catch (err) {
        setError('Failed to load schemes. Make sure the backend server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSchemes, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory]);

  const handleSave = async (e, schemeId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    try {
      const data = await schemesAPI.toggleSave(schemeId);
      updateSavedSchemes(data.savedSchemes);
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const isSaved = (schemeId) => user?.savedSchemes?.includes(schemeId);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header section w/ Search */}
      <div className="gradient-bg py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <svg className="absolute w-[40rem] h-[40rem] -top-20 -right-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl drop-shadow-sm tracking-tight mb-4">
            Discover Government Schemes
          </h1>
          <p className="mt-2 text-xl text-white/90 font-medium">
            Find the right benefits for you, your family, or your business.
          </p>

          <div className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-4 rounded-xl border-transparent focus:ring-2 focus:ring-white focus:border-white shadow-xl text-lg text-gray-900 bg-white placeholder-gray-500 font-medium transition-shadow hover:shadow-2xl"
                placeholder="Search by scheme name or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="sm:hidden w-full bg-white text-primary font-bold py-4 rounded-xl shadow-xl flex justify-center items-center gap-2">
              <Filter className="w-5 h-5" /> Filter
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 text-lg flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-gray-500" /> Categories
              </h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium flex justify-between items-center ${
                      selectedCategory === category
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {category}
                    {selectedCategory === category && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Mobile Categories Scroll */}
            <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 no-scrollbar mb-6">
               {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
            </div>

            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'All' ? 'All Schemes' : `${selectedCategory} Schemes`}
                </h2>
                <p className="text-gray-500 mt-1">
                  {loading ? 'Loading schemes...' : `Found ${schemes.length} results matching your criteria`}
                </p>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
                <p className="font-medium">{error}</p>
                <p className="text-sm mt-1">Run <code className="bg-red-100 px-2 py-0.5 rounded">cd server && npm start</code> to start the backend.</p>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                      <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-full mt-4"></div>
                  </div>
                ))}
              </div>
            ) : schemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schemes.map((scheme, index) => {
                  const IconComponent = ICON_MAP[scheme.icon] || Activity;
                  return (
                    <motion.div
                      key={scheme.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${scheme.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          {isAuthenticated && (
                            <button
                              onClick={(e) => handleSave(e, scheme.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                isSaved(scheme.id) 
                                  ? 'text-primary bg-primary/10' 
                                  : 'text-gray-400 hover:text-primary hover:bg-primary/5'
                              }`}
                              title={isSaved(scheme.id) ? 'Unsave scheme' : 'Save scheme'}
                            >
                              {isSaved(scheme.id) ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                            </button>
                          )}
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {scheme.category}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {scheme.title}
                      </h3>
                      <p className="text-gray-600 flex-grow mb-4 text-sm leading-relaxed">
                        {scheme.description}
                      </p>
                      
                      <div className="border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                          <span className="font-semibold text-gray-700">Eligibility:</span>
                          <span className="truncate">{scheme.eligibility}</span>
                        </div>
                        <Link
                          to={`/scheme/${scheme.id}`}
                          className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-primary ring-1 ring-inset ring-gray-200 hover:bg-primary hover:text-white transition-all duration-200"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center bg-white p-12 rounded-2xl border border-gray-100 shadow-sm">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No schemes found</h3>
                <p className="mt-1 text-gray-500">We couldn't find anything matching your current filters and search term.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('All')}}
                  className="mt-6 text-primary hover:text-primary-dark font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
