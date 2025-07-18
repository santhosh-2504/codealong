import { getSelectedKey, incrementUsage } from '../keyManager';

// Judge0 language IDs for supported languages
const LANGUAGE_IDS = {
  javascript: 63,   // Node.js
  python: 71,       // Python 3
  java: 62,         // Java
  cpp: 54,          // C++ (GCC 9.2.0)
  c: 50,            // C (GCC 9.2.0)
};

export async function runJudge0(code, language) {
  const selectedKey = getSelectedKey();
  
  if (!selectedKey) {
    throw new Error('ERROR: No API key selected. Please go to Keys page and select an API key.');
  }

  const languageId = LANGUAGE_IDS[language];
  if (!languageId) {
    throw new Error(`ERROR: Language "${language}" is not supported yet.`);
  }

  try {
    // Step 1: Submit the code for execution
    const submissionResponse = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': selectedKey.key,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      body: JSON.stringify({
        language_id: languageId,
        source_code: code,
        stdin: '',
      }),
    });

    if (!submissionResponse.ok) {
      if (submissionResponse.status === 429) {
        throw new Error('ERROR: API rate limit exceeded. Please try again later or use a different API key.');
      } else if (submissionResponse.status === 401) {
        throw new Error('ERROR: Invalid API key. Please check your API key configuration.');
      }
      throw new Error(`ERROR: Submission failed: ${submissionResponse.statusText}`);
    }

    const submissionData = await submissionResponse.json();
    const submissionId = submissionData.token;

    // Step 2: Poll for results
    let attempts = 0;
    const maxAttempts = 20; // Maximum 20 seconds wait time
    
    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      attempts++;

      const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${submissionId}?base64_encoded=false`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': selectedKey.key,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      });

      if (!resultResponse.ok) {
        throw new Error(`ERROR: Failed to get results: ${resultResponse.statusText}`);
      }

      const resultData = await resultResponse.json();
      
      // Check if execution is complete
      if (resultData.status.id >= 3) { // 3 and above means completed
        // Increment usage count
        incrementUsage(selectedKey.id);
        
        return formatOutput(resultData);
      }
    }
    
    throw new Error('ERROR: Execution timeout. The code took too long to execute.');
    
  } catch (error) {
    if (error.message.includes('ERROR:')) {
      throw error; // Re-throw formatted errors
    }
    throw new Error(`ERROR: Network error: ${error.message}`);
  }
}

function formatOutput(resultData) {
  const { status, stdout, stderr, compile_output, time, memory } = resultData;
  
  let output = '';
  
  // Add execution info
  if (time && memory) {
    output += `Execution time: ${time}s | Memory: ${memory}KB\n\n`;
  }
  
  // Handle different status cases
  switch (status.id) {
    case 3: // Accepted
      if (stdout) {
        output += `SUCCESS: Program executed successfully\n\nOutput:\n${stdout}`;
      } else {
        output += 'SUCCESS: Program executed successfully (no output)';
      }
      break;
      
    case 4: // Wrong Answer (shouldn't happen for our use case, but treat as success)
      output += `SUCCESS: Program executed\n\nOutput:\n${stdout || '(no output)'}`;
      break;
      
    case 5: // Time Limit Exceeded
      output += 'ERROR: Time Limit Exceeded\nYour code took too long to execute.';
      if (stdout) output += `\n\nPartial output:\n${stdout}`;
      break;
      
    case 6: // Compilation Error
      output += 'COMPILATION ERROR:\n';
      output += compile_output || stderr || 'Unknown compilation error';
      break;
      
    case 7: // Runtime Error (SIGSEGV)
    case 8: // Runtime Error (SIGXFSZ)
    case 9: // Runtime Error (SIGFPE)
    case 10: // Runtime Error (SIGABRT)
    case 11: // Runtime Error (NZEC)
    case 12: // Runtime Error (Other)
      output += 'RUNTIME ERROR:\n';
      output += stderr || 'The program crashed during execution';
      if (stdout) output += `\n\nOutput before crash:\n${stdout}`;
      break;
      
    case 13: // Memory Limit Exceeded
      output += 'ERROR: Memory Limit Exceeded\nYour code used too much memory.';
      if (stdout) output += `\n\nPartial output:\n${stdout}`;
      break;
      
    default:
      output += `EXECUTION FAILED: ${status.description}\n`;
      if (stderr) output += `Error: ${stderr}\n`;
      if (stdout) output += `Output: ${stdout}`;
  }
  
  return output;
}

// Helper function to get language display name
export function getLanguageDisplayName(language) {
  const names = {
    javascript: 'JavaScript (Node.js)',
    python: 'Python 3',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
  };
  return names[language] || language;
}
