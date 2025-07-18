// export default function PlaylistSidebar({ videos, current, completed, onSelect }) {
//     return (
//       <div className="space-y-2">
//         {videos.map((video, idx) => (
//           <div
//             key={idx}
//             onClick={() => onSelect(idx)}
//             className={`p-2 border rounded cursor-pointer hover:bg-gray-100 transition
//               ${idx === current ? 'bg-blue-100' : ''}
//               ${completed.includes(idx) ? 'border-green-500' : 'border-gray-300'}`}
//           >
//             <div className="font-semibold text-sm">{video.title}</div>
//           </div>
//         ))}
//       </div>
//     );
//   }
  

export default function PlaylistSidebar({ videos, current, completed, onSelect }) {
  return (
    <div className="space-y-2 p-2">
      {videos.map((video, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          className={`p-3 border rounded-lg cursor-pointer transition-all duration-200
            ${idx === current 
              ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' 
              : 'border-slate-600/50 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500/50'
            }
            ${completed.includes(idx) ? 'border-green-500/50' : ''}`}
        >
          <div className="font-medium text-sm flex items-center gap-2">
            {completed.includes(idx) && <span className="text-green-400">✅</span>}
            <span className={idx === current ? 'text-white' : 'text-gray-200'}>
              {video.title}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
