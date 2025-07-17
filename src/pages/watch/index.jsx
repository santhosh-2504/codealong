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

  // Initialize video URL and code when component mounts or video query changes
  useEffect(() => {
    if (video) {
      setVideoUrl(video);
    }
  }, [video]);

  // Initialize code when component mounts
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
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        {/* Left Side - Video Player */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-4">
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
            {videoUrl ? (
              <VideoPlayer videoUrl={videoUrl} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-4xl mb-2">📺</div>
                  <p>Enter a YouTube URL below to start watching</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Video URL Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              onClick={handleLoadNewVideo}
              disabled={!inputUrl.trim()}
            >
              Load
            </button>
          </div>
        </div>

        {/* Right Side - Code Editor */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 flex flex-col gap-3 bg-white md:border-l border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
            <div className="text-sm text-gray-500">
              Practice coding while watching
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