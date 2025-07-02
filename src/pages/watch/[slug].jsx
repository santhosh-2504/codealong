// // import { useRouter } from 'next/router';
// // import { useEffect, useState } from 'react';
// // import playlists from '../../../public/playlists.json';
// // import VideoPlayer from '@/components/player/VideoPlayer';
// // import PlaylistSidebar from '@/components/player/PlaylistSidebar';
// // import LanguageSelector from '@/components/code/LanguageSelector';
// // import CodeEditor from '@/components/code/CodeEditor';
// // import RunButton from '@/components/code/RunButton';
// // import OutputBox from '@/components/code/OutputBox';
// // import { languageMap } from '@/utils/languageMap';
// // import { getCompletedVideos, markVideoComplete } from '@/utils/storage';

// // export default function PlaylistWatchPage() {
// //   const router = useRouter();
// //   const { slug } = router.query;

// //   const [playlist, setPlaylist] = useState(null);
// //   const [videoIndex, setVideoIndex] = useState(0);
// //   const [language, setLanguage] = useState('javascript');
// //   const [code, setCode] = useState(languageMap['javascript'].starterCode);
// //   const [output, setOutput] = useState('');
// //   const [completed, setCompleted] = useState([]);

// //   useEffect(() => {
// //     if (!slug) return;
// //     const match = playlists.find((p) => p.slug === slug);
// //     if (match) {
// //       setPlaylist(match);
// //       setCompleted(getCompletedVideos(slug));
// //     }
// //   }, [slug]);

// //   const handleVideoSelect = (index) => {
// //     setVideoIndex(index);
// //     setOutput('');
// //     markVideoComplete(slug, index);
// //     setCompleted(getCompletedVideos(slug));
// //   };

// //   if (!playlist) return <div className="p-6">Loading...</div>;

// //   return (
// //     <div className="flex flex-col md:flex-row h-screen">
// //       {/* Left: Video + Playlist */}
// //       <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
// //         <div className="h-2/3 p-2">
// //           <VideoPlayer videoUrl={playlist.videos[videoIndex].url} />
// //         </div>
// //         <div className="h-1/3 p-2 overflow-y-auto">
// //           <PlaylistSidebar
// //             videos={playlist.videos}
// //             current={videoIndex}
// //             completed={completed}
// //             onSelect={handleVideoSelect}
// //           />
// //         </div>
// //       </div>

// //       {/* Right: Editor */}
// //       <div className="w-full md:w-1/2 h-1/2 md:h-full p-2 flex flex-col gap-2">
// //         <LanguageSelector
// //           language={language}
// //           setLanguage={(lang) => {
// //             setLanguage(lang);
// //             setCode(languageMap[lang].starterCode);
// //             setOutput('');
// //           }}
// //         />
// //         <CodeEditor code={code} onChange={setCode} language={language} />
// //         <RunButton language={language} code={code} setOutput={setOutput} />
// //         <OutputBox output={output} />
// //       </div>
// //     </div>
// //   );
// // }


// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import playlists from '../../../public/playlists.json';
// import VideoPlayer from '@/components/player/VideoPlayer';
// import PlaylistSidebar from '@/components/player/PlaylistSidebar';
// import LanguageSelector from '@/components/code/LanguageSelector';
// import CodeEditor from '@/components/code/CodeEditor';
// import RunButton from '@/components/code/RunButton';
// import OutputBox from '@/components/code/OutputBox';
// import { languageMap } from '@/utils/languageMap';
// import { getCompletedVideos, markVideoComplete, clearVideoComplete } from '@/utils/storage';

// export default function PlaylistWatchPage() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [playlist, setPlaylist] = useState(null);
//   const [videoIndex, setVideoIndex] = useState(0);
//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState(languageMap['javascript'].starterCode);
//   const [output, setOutput] = useState('');
//   const [completed, setCompleted] = useState([]);

//   useEffect(() => {
//     if (!slug) return;
//     const match = playlists.find((p) => p.slug === slug);
//     if (match) {
//       setPlaylist(match);
//       setCompleted(getCompletedVideos(slug));
//     }
//   }, [slug]);

//   const handleMarkComplete = () => {
//     markVideoComplete(slug, videoIndex);
//     setCompleted(getCompletedVideos(slug));
//   };

//   const handleClearComplete = () => {
//     clearVideoComplete(slug, videoIndex);
//     setCompleted(getCompletedVideos(slug));
//   };

//   const handlePrev = () => {
//     if (videoIndex > 0) setVideoIndex(videoIndex - 1);
//   };

//   const handleNext = () => {
//     if (videoIndex < playlist.videos.length - 1) setVideoIndex(videoIndex + 1);
//   };

//   if (!playlist) return <div className="p-6">Loading...</div>;

//   const currentVideo = playlist.videos[videoIndex];
//   const isCompleted = completed.includes(videoIndex);

//   return (
//     <div className="flex flex-col md:flex-row h-screen">
//       {/* Left: Video + Playlist */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//         <div className="h-2/3 p-2">
//           <VideoPlayer videoUrl={currentVideo.url} />
//         </div>

//         {/* Controls + Playlist */}
//         <div className="h-1/3 p-2 flex flex-col">
//           {/* Control Buttons Row */}
//           <div className="flex items-center justify-between mb-2">
//             <button
//               onClick={handlePrev}
//               disabled={videoIndex === 0}
//               className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//             >
//               ⬅️ Prev
//             </button>

//             {isCompleted ? (
//               <button
//                 onClick={handleClearComplete}
//                 className="px-4 py-1 bg-red-200 rounded hover:bg-red-300"
//               >
//                 ❌ Clear Completion
//               </button>
//             ) : (
//               <button
//                 onClick={handleMarkComplete}
//                 className="px-4 py-1 bg-green-200 rounded hover:bg-green-300"
//               >
//                 ✅ Mark as Completed
//               </button>
//             )}

//             <button
//               onClick={handleNext}
//               disabled={videoIndex === playlist.videos.length - 1}
//               className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//             >
//               Next ➡️
//             </button>
//           </div>

//           {/* Playlist list */}
//           <div className="overflow-y-auto">
//             <PlaylistSidebar
//               videos={playlist.videos}
//               current={videoIndex}
//               completed={completed}
//               onSelect={(i) => setVideoIndex(i)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Right: Editor */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full p-2 flex flex-col gap-2">
//         <LanguageSelector
//           language={language}
//           setLanguage={(lang) => {
//             setLanguage(lang);
//             setCode(languageMap[lang].starterCode);
//             setOutput('');
//           }}
//         />
//         <CodeEditor code={code} onChange={setCode} language={language} />
//         <RunButton language={language} code={code} setOutput={setOutput} />
//         <OutputBox output={output} />
//       </div>
//     </div>
//   );
// }

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import playlists from '../../../public/playlists.json';
// import VideoPlayer from '@/components/player/VideoPlayer';
// import PlaylistSidebar from '@/components/player/PlaylistSidebar';
// import LanguageSelector from '@/components/code/LanguageSelector';
// import CodeEditor from '@/components/code/CodeEditor';
// import RunButton from '@/components/code/RunButton';
// import OutputBox from '@/components/code/OutputBox';
// import { languageMap } from '@/utils/languageMap';
// import { getCompletedVideos, markVideoComplete, clearVideoComplete } from '@/utils/storage';

// export default function PlaylistWatchPage() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [playlist, setPlaylist] = useState(null);
//   const [videoIndex, setVideoIndex] = useState(0);
//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');
//   const [completed, setCompleted] = useState([]);

//   // Initialize playlist and completed videos
//   useEffect(() => {
//     if (!slug) return;
//     const match = playlists.find((p) => p.slug === slug);
//     if (match) {
//       setPlaylist(match);
//       setCompleted(getCompletedVideos(slug));
//     }
//   }, [slug]);

//   // Initialize code when component mounts
//   useEffect(() => {
//     setCode(languageMap['javascript'].starterCode);
//   }, []);

//   const handleMarkComplete = () => {
//     markVideoComplete(slug, videoIndex);
//     setCompleted(getCompletedVideos(slug));
//   };

//   const handleClearComplete = () => {
//     clearVideoComplete(slug, videoIndex);
//     setCompleted(getCompletedVideos(slug));
//   };

//   const handlePrev = () => {
//     if (videoIndex > 0) {
//       setVideoIndex(videoIndex - 1);
//       setOutput(''); // Clear output when switching videos
//     }
//   };

//   const handleNext = () => {
//     if (videoIndex < playlist.videos.length - 1) {
//       setVideoIndex(videoIndex + 1);
//       setOutput(''); // Clear output when switching videos
//     }
//   };

//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     setCode(languageMap[newLanguage].starterCode);
//     setOutput('');
//   };

//   const handleVideoSelect = (index) => {
//     setVideoIndex(index);
//     setOutput(''); // Clear output when switching videos
//   };

//   if (!playlist) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading playlist...</p>
//         </div>
//       </div>
//     );
//   }

//   const currentVideo = playlist.videos[videoIndex];
//   const isCompleted = completed.includes(videoIndex);
//   const progressPercent = Math.round((completed.length / playlist.videos.length) * 100);

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-50">
//       {/* Left: Video + Playlist */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
//         {/* Video Player Section */}
//         <div className="h-2/3 p-4">
//           <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
//             <VideoPlayer videoUrl={currentVideo.url} />
//           </div>
          
//           {/* Video Info */}
//           <div className="mt-3">
//             <h2 className="text-lg font-semibold text-gray-800 truncate">
//               {currentVideo.title}
//             </h2>
//             <p className="text-sm text-gray-600">
//               Video {videoIndex + 1} of {playlist.videos.length} • {playlist.title}
//             </p>
//           </div>
//         </div>

//         {/* Controls + Playlist */}
//         <div className="h-1/3 p-4 flex flex-col bg-white border-t border-gray-200">
//           {/* Progress Bar */}
//           <div className="mb-3">
//             <div className="flex justify-between text-sm text-gray-600 mb-1">
//               <span>Progress</span>
//               <span>{completed.length}/{playlist.videos.length} completed ({progressPercent}%)</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div 
//                 className="bg-green-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progressPercent}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Control Buttons Row */}
//           <div className="flex items-center justify-between mb-3">
//             <button
//               onClick={handlePrev}
//               disabled={videoIndex === 0}
//               className="px-3 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               ⬅️ Previous
//             </button>

//             {isCompleted ? (
//               <button
//                 onClick={handleClearComplete}
//                 className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
//               >
//                 ❌ Mark Incomplete
//               </button>
//             ) : (
//               <button
//                 onClick={handleMarkComplete}
//                 className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
//               >
//                 ✅ Mark Complete
//               </button>
//             )}

//             <button
//               onClick={handleNext}
//               disabled={videoIndex === playlist.videos.length - 1}
//               className="px-3 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next ➡️
//             </button>
//           </div>

//           {/* Playlist Sidebar */}
//           <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
//             <PlaylistSidebar
//               videos={playlist.videos}
//               current={videoIndex}
//               completed={completed}
//               onSelect={handleVideoSelect}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Right: Code Editor */}
//       <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-3 bg-white md:border-l border-gray-200">
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
//           <div className="text-sm text-gray-500">
//             Practice while learning
//           </div>
//         </div>

//         <LanguageSelector
//           language={language}
//           setLanguage={handleLanguageChange}
//         />
        
//         <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
//           <CodeEditor 
//             code={code} 
//             onChange={setCode} 
//             language={language} 
//           />
//         </div>
        
//         <RunButton 
//           language={language} 
//           code={code} 
//           setOutput={setOutput} 
//         />
        
//         <OutputBox output={output} />
//       </div>
//     </div>
//   );
// }

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import playlists from '../../../public/playlists.json';
import VideoPlayer from '@/components/player/VideoPlayer';
import PlaylistSidebar from '@/components/player/PlaylistSidebar';
import LanguageSelector from '@/components/code/LanguageSelector';
import CodeEditor from '@/components/code/CodeEditor';
import RunButton from '@/components/code/RunButton';
import OutputBox from '@/components/code/OutputBox';
import ErrorBoundary from '@/components/ErrorBoundary';
import { languageMap } from '@/utils/languageMap';
import { getCompletedVideos, markVideoComplete, clearVideoComplete } from '@/utils/storage';

export default function PlaylistWatchPage() {
  const router = useRouter();
  const { slug } = router.query;

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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading playlist...</p>
        </div>
      </div>
    );
  }

  const currentVideo = playlist.videos[videoIndex];
  const isCompleted = completed.includes(videoIndex);
  const progressPercent = Math.round((completed.length / playlist.videos.length) * 100);

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        {/* Left: Video + Playlist */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col">
          {/* Video Player Section */}
          <div className="h-2/3 p-4">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              <VideoPlayer videoUrl={currentVideo.url} />
            </div>
            
            {/* Video Info */}
            <div className="mt-3">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {currentVideo.title}
              </h2>
              <p className="text-sm text-gray-600">
                Video {videoIndex + 1} of {playlist.videos.length} • {playlist.title}
              </p>
            </div>
          </div>

          {/* Controls + Playlist */}
          <div className="h-1/3 p-4 flex flex-col bg-white border-t border-gray-200">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{completed.length}/{playlist.videos.length} completed ({progressPercent}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Control Buttons Row */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={handlePrev}
                disabled={videoIndex === 0}
                className="px-3 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ⬅️ Previous
              </button>

              {isCompleted ? (
                <button
                  onClick={handleClearComplete}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                >
                  ❌ Mark Incomplete
                </button>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                >
                  ✅ Mark Complete
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={videoIndex === playlist.videos.length - 1}
                className="px-3 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next ➡️
              </button>
            </div>

            {/* Playlist Sidebar */}
            <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
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
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-3 bg-white md:border-l border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
            <div className="text-sm text-gray-500">
              Practice while learning
            </div>
          </div>

          <LanguageSelector
            language={language}
            setLanguage={handleLanguageChange}
          />
          
          <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
            <ErrorBoundary>
              <CodeEditor 
                code={code} 
                onChange={setCode} 
                language={language} 
              />
            </ErrorBoundary>
          </div>
          
          <ErrorBoundary>
            <RunButton 
              language={language} 
              code={code} 
              setOutput={setOutput} 
            />
          </ErrorBoundary>
          
          <OutputBox output={output} />
        </div>
      </div>
    </ErrorBoundary>
  );
}