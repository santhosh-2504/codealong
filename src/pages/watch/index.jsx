// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';
// import VideoPlayer from '@/components/player/VideoPlayer';
// import LanguageSelector from '@/components/code/LanguageSelector';
// import CodeEditor from '@/components/code/CodeEditor';
// import RunButton from '@/components/code/RunButton';
// import OutputBox from '@/components/code/OutputBox';
// import ErrorBoundary from '@/components/ErrorBoundary';
// import { languageMap } from '@/utils/languageMap';

// export default function WatchPage() {
//   const router = useRouter();
//   const { video } = router.query;

//   const [videoUrl, setVideoUrl] = useState('');
//   const [inputUrl, setInputUrl] = useState('');
//   const [language, setLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');

//   // Error suppression for known Pyodide issues
//   useEffect(() => {
//     const originalError = console.error;
//     const originalWarn = console.warn;
    
//     // Override console methods to suppress known Pyodide errors
//     console.error = (...args) => {
//       const message = args.join(' ');
//       if (!message.includes('Duplicate definition of module') && 
//           !message.includes('stackframe.js') &&
//           !message.includes('error-stack-parser') &&
//           !message.includes('pyodide.asm.js')) {
//         originalError.apply(console, args);
//       }
//     };
    
//     console.warn = (...args) => {
//       const message = args.join(' ');
//       if (!message.includes('Duplicate definition of module') && 
//           !message.includes('stackframe.js') &&
//           !message.includes('error-stack-parser') &&
//           !message.includes('pyodide.asm.js')) {
//         originalWarn.apply(console, args);
//       }
//     };

//     // Global error event handler
//     const handleGlobalError = (event) => {
//       const error = event.error;
//       if (error && error.message) {
//         if (error.message.includes('Duplicate definition of module') ||
//             error.message.includes('stackframe.js') ||
//             error.message.includes('error-stack-parser') ||
//             error.message.includes('pyodide.asm.js')) {
//           event.preventDefault();
//           event.stopPropagation();
//           console.warn('Suppressed known Pyodide error:', error.message);
//           return false;
//         }
//       }
//     };

//     window.addEventListener('error', handleGlobalError, true);
//     window.addEventListener('unhandledrejection', handleGlobalError, true);

//     return () => {
//       console.error = originalError;
//       console.warn = originalWarn;
//       window.removeEventListener('error', handleGlobalError, true);
//       window.removeEventListener('unhandledrejection', handleGlobalError, true);
//     };
//   }, []);

//   // Initialize video URL and code when component mounts or video query changes
//   useEffect(() => {
//     if (video) {
//       setVideoUrl(video);
//     }
//   }, [video]);

//   // Initialize code when component mounts
//   useEffect(() => {
//     setCode(languageMap['javascript'].starterCode);
//   }, []);

//   const handleLoadNewVideo = () => {
//     if (inputUrl.trim() !== '') {
//       setVideoUrl(inputUrl.trim());
//       setInputUrl('');
//     }
//   };

//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//     setCode(languageMap[newLanguage].starterCode);
//     setOutput('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleLoadNewVideo();
//     }
//   };

//   return (
//     <ErrorBoundary>
//       <div className="flex flex-col md:flex-row h-screen bg-gray-50">
//         {/* Left Side - Video Player */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4">
//           <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
//             {videoUrl ? (
//               <VideoPlayer videoUrl={videoUrl} />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-white">
//                 <div className="text-center">
//                   <div className="text-4xl mb-2">📺</div>
//                   <p>Enter a YouTube URL below to start watching</p>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Video URL Input */}
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={inputUrl}
//               onChange={(e) => setInputUrl(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//               onClick={handleLoadNewVideo}
//               disabled={!inputUrl.trim()}
//             >
//               Load
//             </button>
//           </div>
//         </div>

//         {/* Right Side - Code Editor */}
//         <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-3 bg-white md:border-l border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
//             <div className="text-sm text-gray-500">
//               Practice coding while watching
//             </div>
//           </div>
          
//           <LanguageSelector
//             language={language}
//             setLanguage={handleLanguageChange}
//           />
          
//           <div className="flex-1 border border-gray-200 rounded-lg overflow-hidden">
//             <ErrorBoundary>
//               <CodeEditor 
//                 code={code} 
//                 onChange={setCode} 
//                 language={language} 
//               />
//             </ErrorBoundary>
//           </div>
          
//           <ErrorBoundary>
//             <RunButton 
//               language={language} 
//               code={code} 
//               setOutput={setOutput} 
//             />
//           </ErrorBoundary>
          
//           <OutputBox output={output} />
//         </div>
//       </div>
//     </ErrorBoundary>
//   );
// }


import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/player/VideoPlayer';
import LanguageSelector from '@/components/code/LanguageSelector';
import CodeEditor from '@/components/code/CodeEditor';
import RunButton from '@/components/code/RunButton';
import OutputBox from '@/components/code/OutputBox';
import ErrorBoundary from '@/components/ErrorBoundary';
import { languageMap } from '@/utils/languageMap';

export default function WatchPage() {
  const router = useRouter();
  const { video } = router.query;

  const [videoUrl, setVideoUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  // Error suppression for known Pyodide issues
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
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

  useEffect(() => {
    if (video) {
      setVideoUrl(video);
    }
  }, [video]);

  useEffect(() => {
    setCode(languageMap['javascript'].starterCode);
  }, []);

  const handleLoadNewVideo = () => {
    if (inputUrl.trim() !== '') {
      setVideoUrl(inputUrl.trim());
      setInputUrl('');
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(languageMap[newLanguage].starterCode);
    setOutput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoadNewVideo();
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex flex-col lg:flex-row h-screen">
          {/* Left Side - Video Player */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-6 flex flex-col gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
                {videoUrl ? (
                  <VideoPlayer videoUrl={videoUrl} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">🎬</div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-medium">Ready to Learn?</h3>
                        <p className="text-gray-300 text-sm">Enter a YouTube URL to start your coding journey</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Video URL Input */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20"></div>
              <div className="relative flex gap-3 bg-slate-800/50 backdrop-blur-xl p-4 rounded-lg border border-slate-700/50">
                <input
                  type="text"
                  placeholder="Paste YouTube URL here..."
                  className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleLoadNewVideo}
                  disabled={!inputUrl.trim()}
                >
                  Load
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Code Editor */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full p-6 flex flex-col gap-4">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg blur opacity-20"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl p-4 rounded-lg border border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white font-medium ml-2">Code Editor</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Practice while you learn
                  </div>
                </div>
                
                <LanguageSelector
                  language={language}
                  setLanguage={handleLanguageChange}
                />
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg blur opacity-20"></div>
              <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-lg border border-slate-700/50 overflow-hidden shadow-2xl">
                <ErrorBoundary>
                  <CodeEditor 
                    code={code} 
                    onChange={setCode} 
                    language={language} 
                  />
                </ErrorBoundary>
              </div>
            </div>
            
            <ErrorBoundary>
              <RunButton 
                language={language} 
                code={code} 
                setOutput={setOutput} 
              />
            </ErrorBoundary>
            
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg blur opacity-20"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-lg border border-slate-700/50 overflow-hidden">
                <OutputBox output={output} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}