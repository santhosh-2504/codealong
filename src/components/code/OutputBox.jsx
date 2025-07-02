// export default function OutputBox({ output }) {
//     return (
//       <div className="border text-black p-2 h-24 bg-gray-100 rounded overflow-y-auto whitespace-pre-wrap">
//         {output || "Output will appear here"}
//       </div>
//     );
//   }
  
export default function OutputBox({ output }) {
  const getOutputStyle = () => {
    if (!output) return '';
    
    if (output.includes('❌')) {
      return 'text-red-700 bg-red-50 border-red-200';
    } else if (output.includes('⚠️')) {
      return 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (output.includes('✅')) {
      return 'text-green-700 bg-green-50 border-green-200';
    } else if (output.includes('⏳')) {
      return 'text-blue-700 bg-blue-50 border-blue-200';
    }
    
    return 'text-gray-800 bg-gray-50 border-gray-200';
  };

  const isEmpty = !output || output.trim() === '';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Output
        </label>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
            title="Copy output to clipboard"
          >
            📋 Copy
          </button>
        )}
      </div>
      
      <div 
        className={`border p-3 h-32 rounded-lg overflow-y-auto whitespace-pre-wrap font-mono text-sm ${
          isEmpty 
            ? 'bg-gray-50 border-gray-200 text-gray-500' 
            : `border ${getOutputStyle()}`
        }`}
      >
        {isEmpty ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div>Output will appear here</div>
            </div>
          </div>
        ) : (
          output
        )}
      </div>
    </div>
  );
}