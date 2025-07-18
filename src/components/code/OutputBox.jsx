// export default function OutputBox({ output }) {
//   const getOutputStyle = () => {
//     if (!output) return '';
    
//     if (output.includes('❌')) {
//       return 'text-red-700 bg-red-50 border-red-200';
//     } else if (output.includes('⚠️')) {
//       return 'text-amber-700 bg-amber-50 border-amber-200';
//     } else if (output.includes('✅')) {
//       return 'text-green-700 bg-green-50 border-green-200';
//     } else if (output.includes('⏳')) {
//       return 'text-blue-700 bg-blue-50 border-blue-200';
//     }
    
//     return 'text-gray-800 bg-gray-50 border-gray-200';
//   };

//   const isEmpty = !output || output.trim() === '';

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex items-center justify-between">
//         <label className="text-sm font-medium text-gray-700">
//           Output
//         </label>
//         {output && (
//           <button
//             onClick={() => navigator.clipboard.writeText(output)}
//             className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
//             title="Copy output to clipboard"
//           >
//             📋 Copy
//           </button>
//         )}
//       </div>
      
//       <div 
//         className={`border p-3 h-32 rounded-lg overflow-y-auto whitespace-pre-wrap font-mono text-sm ${
//           isEmpty 
//             ? 'bg-gray-50 border-gray-200 text-gray-500' 
//             : `border ${getOutputStyle()}`
//         }`}
//       >
//         {isEmpty ? (
//           <div className="flex items-center justify-center h-full">
//             <div className="text-center">
//               <div className="text-2xl mb-1">⚡</div>
//               <div>Output will appear here</div>
//             </div>
//           </div>
//         ) : (
//           output
//         )}
//       </div>
//     </div>
//   );
// }

export default function OutputBox({ output }) {
  const getOutputStyle = () => {
    if (!output) return 'border border-gray-200 bg-gray-50 text-gray-500';

    if (output.toLowerCase().includes('error')) {
      return 'text-red-700 bg-red-50 border border-red-200';
    } else if (output.toLowerCase().includes('warning')) {
      return 'text-yellow-700 bg-yellow-50 border border-yellow-200';
    } else if (output.toLowerCase().includes('success')) {
      return 'text-green-700 bg-green-50 border border-green-200';
    } else if (output.toLowerCase().includes('loading') || output.toLowerCase().includes('pending')) {
      return 'text-blue-700 bg-blue-50 border border-blue-200';
    }

    return 'text-gray-700 bg-gray-50 border border-gray-200';
  };

  const isEmpty = !output || output.trim() === '';

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between p-3 border-b border-slate-600/30">
        <label className="text-sm font-medium text-gray-300">
          Output
        </label>
        {output && (
          <button
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-sm text-gray-400 hover:text-gray-200 px-2 py-1 rounded-md hover:bg-slate-700/50 transition-colors"
            title="Copy output to clipboard"
          >
            Copy
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0 p-4 overflow-y-auto whitespace-pre-wrap font-mono text-sm bg-slate-900/50 text-gray-300">
        {isEmpty ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-500">
            Output will appear here.
          </div>
        ) : (
          <div className={`${getOutputStyle().includes('text-red') ? 'text-red-400' : 
                          getOutputStyle().includes('text-yellow') ? 'text-yellow-400' : 
                          getOutputStyle().includes('text-green') ? 'text-green-400' : 
                          getOutputStyle().includes('text-blue') ? 'text-blue-400' : 'text-gray-300'}`}>
            {output}
          </div>
        )}
      </div>
    </div>
  );
}
