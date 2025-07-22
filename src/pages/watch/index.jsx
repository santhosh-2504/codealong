import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import VideoPlayer from '@/components/player/VideoPlayer';
import CodeToolbar from '@/components/code/CodeToolbar';
import CodeEditor from '@/components/code/CodeEditor';
import OutputBox from '@/components/code/OutputBox';
import ErrorBoundary from '@/components/ErrorBoundary';
import ResizablePanel from '@/components/layout/ResizablePanel';
import Navbar from '@/components/layout/Navbar';
import { languageMap } from '@/utils/languageMap';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Watch - Code Along</title>
      </Head>
      <Navbar />
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
          <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
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
              <CodeToolbar
                language={language}
                setLanguage={handleLanguageChange}
                code={code}
                setOutput={setOutput}
              />
              
              <div className="flex-1 min-h-0">
                <ResizablePanel
                  topContent={
                    <div className="h-full relative">
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
                  }
                  bottomContent={
                    <div className="flex flex-col h-full min-h-0">
                      <div className="flex-1 relative min-h-0">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg blur opacity-20"></div>
                        <div className="relative h-full bg-slate-800/50 backdrop-blur-xl rounded-lg border border-slate-700/50 overflow-hidden">
                          <OutputBox output={output} />
                        </div>
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