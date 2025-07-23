import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import playlists from '../../../public/playlists.json';

export default function PlaylistsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const router = useRouter();

  // Filter playlists based on search term and language
  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlist => {
      const matchesSearch = 
        playlist.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        playlist.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (playlist.language && playlist.language.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLanguage = selectedLanguage === 'all' || playlist.language === selectedLanguage;
      
      return matchesSearch && matchesLanguage;
    });
  }, [searchTerm, selectedLanguage]);

  // Get unique languages for filter
  const languages = useMemo(() => {
    const langs = [...new Set(playlists.map(p => p.language).filter(Boolean))];
    return langs.sort();
  }, []);

  const handlePlaylistClick = (slug) => {
    router.push(`/watch/${slug}`);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage('all');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Learning Playlists
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover comprehensive programming courses from top educators. Master new skills with our curated collection of tutorials.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="relative group mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Search Bar */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Search Playlists
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search by topic, creator, or language..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Language Filter */}
                  <div className="lg:w-64">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Filter by Language
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 text-white"
                    >
                      <option value="all">All Languages</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {(searchTerm || selectedLanguage !== 'all') && (
                    <div className="flex items-end">
                      <button
                        onClick={handleClearFilters}
                        className="px-6 py-3 bg-slate-600/50 hover:bg-slate-600/70 text-white rounded-lg transition-all duration-200 border border-slate-500/50 hover:border-slate-400/50 backdrop-blur-xl"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Results Summary */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-gray-300">
                      {filteredPlaylists.length === playlists.length 
                        ? `Showing all ${playlists.length} playlists`
                        : `Found ${filteredPlaylists.length} of ${playlists.length} playlists`
                      }
                    </p>
                    
                    {/* Language Pills */}
                    <div className="flex flex-wrap gap-2">
                      {languages.slice(0, 5).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(selectedLanguage === lang ? 'all' : lang)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            selectedLanguage === lang
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:bg-slate-600/50'
                          }`}
                        >
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Playlists Grid */}
          {filteredPlaylists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPlaylists.map((playlist, index) => (
                <div
                  key={playlist.slug}
                  onClick={() => handlePlaylistClick(playlist.slug)}
                  className="group cursor-pointer relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  
                  <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <Image
                        src={playlist.thumbnail}
                        alt={`${playlist.topic} by ${playlist.creator}`}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* Language Badge */}
                      {playlist.language && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-slate-900/80 text-white text-xs font-medium rounded-full border border-slate-700/50 backdrop-blur-xl">
                            {playlist.language.charAt(0).toUpperCase() + playlist.language.slice(1)}
                          </span>
                        </div>
                      )}
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-200 line-clamp-2">
                        {playlist.topic}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{playlist.creator}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {playlist.videos?.length || 0} videos
                        </span>
                        <span className="text-xs text-red-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Start Learning →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-600/50">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No playlists found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-slate-500/50 text-white rounded-lg transition-all duration-300 backdrop-blur-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
