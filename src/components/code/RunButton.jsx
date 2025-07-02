import { useState } from 'react';
import { runJs } from "@/lib/runner/runJs";

export default function RunButton({ language, code, setOutput }) {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setOutput('Running...');
    setIsRunning(true);

    try {
      let result;

      console.log('Executing code:', code);
      console.log('Selected language:', language);

      if (!code || code.trim() === '') {
        setOutput('⚠️ No code to execute');
        return;
      }

      if (language === 'javascript') {
        result = await Promise.resolve(runJs(code));
      } else {
        result = `❌ ${language} execution not supported. Please select JavaScript.`;
      }

      setOutput(result);
    } catch (err) {
      console.error('Execution error:', err);
      setOutput(`❌ Runtime Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={handleRun}
      disabled={isRunning}
      className={`px-4 py-2 rounded text-white font-medium transition-colors ${
        isRunning 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
      }`}
    >
      {isRunning ? 'Running...' : 'Run Code'}
    </button>
  );
}
