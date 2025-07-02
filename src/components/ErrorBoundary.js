import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Suppress known Pyodide errors
    const errorMessage = error.message || '';
    const stackTrace = errorInfo.componentStack || '';
    
    if (errorMessage.includes('Duplicate definition of module') ||
        errorMessage.includes('stackframe.js') ||
        errorMessage.includes('error-stack-parser') ||
        errorMessage.includes('pyodide.asm.js') ||
        stackTrace.includes('RunButton') ||
        stackTrace.includes('loadPyodide')) {
      
      console.warn('Suppressed known Pyodide error in ErrorBoundary:', error);
      // Reset the error state to prevent showing error UI
      this.setState({ hasError: false, error: null, errorInfo: null });
      return;
    }

    // Log genuine errors
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI for genuine errors
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-4">
              An error occurred while loading the page. Please refresh to try again.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
            {this.props.showDetails && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-gray-500 text-sm">
                  Show error details
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto max-h-32 bg-gray-100 p-2 rounded">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;