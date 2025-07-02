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
    <div className="space-y-2">
      {videos.map((video, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          className={`p-2 border rounded cursor-pointer hover:bg-gray-100 transition
            ${idx === current ? 'bg-blue-100' : ''}
            ${completed.includes(idx) ? 'border-green-500' : 'border-gray-300'}`}
        >
          <div className="font-semibold text-sm flex items-center gap-2">
            {completed.includes(idx) && <span>✅</span>}
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
}
