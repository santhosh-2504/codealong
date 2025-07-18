import { useState, useRef, useEffect } from 'react';

export default function ResizablePanel({ 
  topContent, 
  bottomContent, 
  initialTopHeight = 60, // percentage
  minTopHeight = 30,
  maxTopHeight = 80,
  className = "" 
}) {
  const [topHeight, setTopHeight] = useState(initialTopHeight);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = topHeight;
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaY = e.clientY - dragStartY.current;
      const deltaHeightPercent = (deltaY / containerRect.height) * 100;
      
      const newHeight = Math.min(
        maxTopHeight,
        Math.max(minTopHeight, dragStartHeight.current + deltaHeightPercent)
      );
      
      setTopHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, maxTopHeight, minTopHeight]);

  return (
    <div ref={containerRef} className={`flex flex-col h-full ${className}`}>
      {/* Top Panel */}
      <div 
        style={{ height: `${topHeight}%` }}
        className="flex flex-col min-h-0"
      >
        {topContent}
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          group relative h-2 bg-slate-700/30 hover:bg-slate-600/50 cursor-ns-resize 
          transition-colors duration-200 flex items-center justify-center
          ${isDragging ? 'bg-blue-500/50' : ''}
        `}
      >
        {/* Visual drag indicator */}
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-300 transition-colors"></div>
          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-300 transition-colors"></div>
          <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:bg-slate-300 transition-colors"></div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Drag to resize
        </div>
      </div>

      {/* Bottom Panel */}
      <div 
        style={{ height: `${100 - topHeight}%` }}
        className="flex flex-col min-h-0"
      >
        {bottomContent}
      </div>
    </div>
  );
}
