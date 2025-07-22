import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import playlists from '../../../public/playlists.json';
import VideoPlayer from '@/components/player/VideoPlayer';
import PlaylistSidebar from '@/components/player/PlaylistSidebar';
import CodeToolbar from '@/components/code/CodeToolbar';
import CodeEditor from '@/components/code/CodeEditor';
import OutputBox from '@/components/code/OutputBox';
import ErrorBoundary from '@/components/ErrorBoundary';
import ResizablePanel from '@/components/layout/ResizablePanel';
import Navbar from '@/components/layout/Navbar';
import { languageMap } from '@/utils/languageMap';
import { getCompletedVideos, markVideoComplete, clearVideoComplete } from '@/utils/storage';
import Head from 'next/head';

export default function PlaylistWatchPage() {
  const router = useRouter();
  const { slug , topic} = router.query;
  console.log('Current slug:', slug);
  console.log('Current title:', topic);

  const [playlist, setPlaylist] = useState(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [completed, setCompleted] = useState([]);

  // Error suppression for known Pyodide issues
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Override console methods to suppress known Pyodide errors
    console.error = (...args) => {
      const message = args.join(' ');
      if (!message.includes('Duplicate definition of module') && 
          !message.includes('stackframe.js') &&
          !message.includes('error-stack-parser') &&
          !message.includes('pyodide.asm.js')) {
        originalError.apply(console, args);
      }
    };
    
    console.warn = (...args) => {
      const message = args.join(' ');
      if (!message.includes('Duplicate definition of module') && 
          !message.includes('stackframe.js') &&
          !message.includes('error-stack-parser') &&
          !message.includes('pyodide.asm.js')) {
        originalWarn.apply(console, args);
      }
    };

    // Global error event handler
    const handleGlobalError = (event) => {
      const error = event.error;
      if (error && error.message) {
        if (error.message.includes('Duplicate definition of module') ||
            error.message.includes('stackframe.js') ||
            error.message.includes('error-stack-parser') ||
            error.message.includes('pyodide.asm.js')) {
          event.preventDefault();
          event.stopPropagation();
          console.warn('Suppressed known Pyodide error:', error.message);
          return false;
        }
      }
    };

    window.addEventListener('error', handleGlobalError, true);
    window.addEventListener('unhandledrejection', handleGlobalError, true);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('error', handleGlobalError, true);
      window.removeEventListener('unhandledrejection', handleGlobalError, true);
    };
  }, []);

  // Initialize playlist and completed videos
  useEffect(() => {
    if (!slug) return;
    const match = playlists.find((p) => p.slug === slug);
    if (match) {
      setPlaylist(match);
      setCompleted(getCompletedVideos(slug));
    }
  }, [slug]);

  // Initialize code when component mounts
  useEffect(() => {
    setCode(languageMap['javascript'].starterCode);
  }, []);

  const handleMarkComplete = () => {
    markVideoComplete(slug, videoIndex);
    setCompleted(getCompletedVideos(slug));
  };

  const handleClearComplete = () => {
    clearVideoComplete(slug, videoIndex);
    setCompleted(getCompletedVideos(slug));
  };

  const handlePrev = () => {
    if (videoIndex > 0) {
      setVideoIndex(videoIndex - 1);
      setOutput(''); // Clear output when switching videos
    }
  };

  const handleNext = () => {
    if (videoIndex < playlist.videos.length - 1) {
      setVideoIndex(videoIndex + 1);
      setOutput(''); // Clear output when switching videos
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageMap[newLanguage].starterCode);
    setOutput('');
  };

  const handleVideoSelect = (index) => {
    setVideoIndex(index);
    setOutput(''); // Clear output when switching videos
  };

  if (!playlist) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading playlist...</p>
          </div>
        </div>
      </>
    );
  }

  const currentVideo = playlist.videos[videoIndex];
  const isCompleted = completed.includes(videoIndex);
  const progressPercent = Math.round((completed.length / playlist.videos.length) * 100);

  return (
    <>
    <Head>
      <title>{topic} - Code Along</title>
    </Head>
      <Navbar />
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
          <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
            {/* Left: Video + Playlist */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
              {/* Video Player Section */}
              <div className="h-2/3 p-4">
                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                  <VideoPlayer videoUrl={currentVideo.url} />
                </div>
                
                {/* Video Info
                <div className="mt-3">
                  <h2 className="text-lg font-semibold text-white truncate">
                    {currentVideo.title}
                  </h2>
                  <p className="text-sm text-gray-300">
                    Video {videoIndex + 1} of {playlist.videos.length} • {playlist.title}
                  </p>
                </div> */}
              </div>

              {/* Controls + Playlist */}
              <div className="h-1/3  flex flex-col bg-slate-800/50 backdrop-blur-xl border-t border-slate-700/50">
                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Progress</span>
                    <span>{completed.length}/{playlist.videos.length} completed ({progressPercent}%)</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={handlePrev}
                    disabled={videoIndex === 0}
                    className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-slate-600/50"
                  >
                    ⬅️ Previous
                  </button>

                  {isCompleted ? (
                    <button
                      onClick={handleClearComplete}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
                    >
                      ❌ Mark Incomplete
                    </button>
                  ) : (
                    <button
                      onClick={handleMarkComplete}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors border border-green-500/30"
                    >
                      ✅ Mark Complete
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={videoIndex === playlist.videos.length - 1}
                    className="px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-slate-600/50"
                  >
                    Next ➡️
                  </button>
                </div>

                {/* Playlist Sidebar */}
                <div className="flex-1 overflow-y-auto border text-white border-slate-700/50 rounded-lg bg-slate-900/50 backdrop-blur-xl">
                  <PlaylistSidebar
                    videos={playlist.videos}
                    current={videoIndex}
                    completed={completed}
                    onSelect={handleVideoSelect}
                  />
                </div>
              </div>
            </div>

            {/* Right: Code Editor */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-3 bg-slate-800/50 backdrop-blur-xl md:border-l border-slate-700/50">
              <CodeToolbar
                language={language}
                setLanguage={handleLanguageChange}
                code={code}
                setOutput={setOutput}
              />

              <div className="flex-1 min-h-0">
                <ResizablePanel
                  topContent={
                    <div className="h-full border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900/50 backdrop-blur-xl shadow-2xl">
                      <ErrorBoundary>
                        <CodeEditor 
                          code={code} 
                          onChange={setCode} 
                          language={language} 
                        />
                      </ErrorBoundary>
                    </div>
                  }
                  bottomContent={
                    <div className="flex flex-col h-full min-h-0">
                      <div className="flex-1 bg-slate-800/50 backdrop-blur-xl rounded-lg border border-slate-700/50 overflow-hidden min-h-0">
                        <OutputBox output={output} />
                      </div>
                    </div>
                  }
                  initialTopHeight={70}
                  minTopHeight={50}
                  maxTopHeight={85}
                />
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}