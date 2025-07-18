export function runJs(code) {
  try {
    const consoleOutput = [];
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Capture all console outputs
    console.log = (...args) => {
      consoleOutput.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    
    console.error = (...args) => {
      consoleOutput.push('ERROR: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };
    
    console.warn = (...args) => {
      consoleOutput.push('WARNING: ' + args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    // Execute the code
    const result = eval(code);
    
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    
    // Return output or result
    if (consoleOutput.length > 0) {
      return consoleOutput.join('\n');
    } else if (result !== undefined) {
      return typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
    } else {
      return 'SUCCESS: Code executed successfully (no output)';
    }
    
  } catch (err) {
    // Restore console in case of error
    console.log = console.log.originalLog || console.log;
    console.error = console.error.originalError || console.error;
    console.warn = console.warn.originalWarn || console.warn;
    
    // Handle specific JavaScript errors
    if (err instanceof SyntaxError) {
      return `❌ JavaScript Syntax Error:\n${err.message}`;
    } else if (err instanceof ReferenceError) {
      return `❌ JavaScript Reference Error:\n${err.message}`;
    } else if (err instanceof TypeError) {
      return `❌ JavaScript Type Error:\n${err.message}`;
    }
    
    return `❌ JavaScript Runtime Error:\n${err.message}`;
  }
}