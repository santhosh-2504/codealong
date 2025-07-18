import { useState } from 'react';
import { runJs } from "@/lib/runner/runJs";
import { runJudge0, getLanguageDisplayName } from "@/lib/runner/runJudge0";

export default function RunButton({ language, code, setOutput }) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setOutput('Executing...');
    setIsRunning(true);

    try {
      let result;

      console.log('Executing code:', code);
      console.log('Selected language:', language);

      if (!code || code.trim() === '') {
        setOutput('WARNING: No code to execute');
        return;
      }

      // Use browser JavaScript execution for JavaScript
      if (language === 'javascript') {
        result = await Promise.resolve(runJs(code));
      } 
      // Use Judge0 API for other languages
      else if (['python', 'java', 'cpp', 'c'].includes(language)) {
        setOutput(`Executing ${getLanguageDisplayName(language)} code...`);
        result = await runJudge0(code, language);
      } 
      else {
        result = `ERROR: ${language} execution not supported yet. Supported languages: JavaScript, Python, Java, C++, C`;
      }

      setOutput(result);
    } catch (err) {
      console.error('Execution error:', err);
      setOutput(`ERROR: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className={`px-6 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
        isRunning 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-md'
      }`}
    >
      {isRunning ? 'Executing...' : 'Run Code'}
    </button>
  );
}
