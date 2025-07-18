import { useState, useEffect } from 'react';
import { getKeys } from '@/lib/keyManager';
import LanguageSelector from './LanguageSelector';
import RunButton from './RunButton';

export default function CodeToolbar({ language, setLanguage, code, setOutput }) {
  const [hasApiKeys, setHasApiKeys] = useState(false);

  useEffect(() => {
    const keys = getKeys();
    setHasApiKeys(keys.length > 0);
  }, []);

  const needsApiKey = ['python', 'java', 'cpp', 'c'].includes(language);
  const showWarning = needsApiKey && !hasApiKeys;

  return (
    <div className="flex flex-col gap-2">
      {/* Language Selector and Run Button Row */}
      <div className="flex items-end justify-between gap-4">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />
        <div className="flex-shrink-0">
          <RunButton 
            language={language} 
            code={code} 
            setOutput={setOutput} 
          />
        </div>
      </div>

      {/* API Key Warning (only shown when needed) */}
      {showWarning && (
        <div className="text-xs text-amber-400 bg-amber-500/10 p-2 rounded border border-amber-500/20">
          <strong>Note:</strong> {language.charAt(0).toUpperCase() + language.slice(1)} requires Judge0 API key. 
          <span className="block mt-1">
            Please add an API key in the Keys page to execute code.
          </span>
        </div>
      )}
    </div>
  );
}
