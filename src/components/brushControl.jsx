import React from 'react';
import { Brush, RotateCcw, Rotate3D as RotateRw, Trash2, Download, Eye, EyeOff, Play, Pause, Sun, Moon } from 'lucide-react';

const BrushControls = ({
  segments,
  onSegmentsChange,
  strokeWidth,
  onStrokeWidthChange,
  onClear,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExport,
  showSegmentLines,
  onToggleSegmentLines,
  isAnimating,
  onToggleAnimation,
  animationSpeed,
  onAnimationSpeedChange,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <div className="space-y-4">
      {/* Theme Toggle */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
        <button
          onClick={onToggleTheme}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-200 hover:scale-105"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      {/* Brush Settings */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Brush size={16} />
          Brush Settings
        </h3>
        
        {/* Stroke Width */}
        <div className="mb-4">
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Stroke Width: {strokeWidth}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Mirror Segments */}
        <div>
          <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
            Mirror Segments
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[4, 6, 8, 12].map(seg => (
              <button
                key={seg}
                onClick={() => onSegmentsChange(seg)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  segments === seg
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Animation Controls */}
      {/* <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Animation</h3>
        <div className="space-y-3">
          <button
            onClick={onToggleAnimation}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 ${
              isAnimating
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isAnimating ? <Pause size={16} /> : <Play size={16} />}
            {isAnimating ? 'Pause' : 'Animate'}
          </button>
          
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Speed: {animationSpeed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => onAnimationSpeedChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div> */}

      {/* Actions */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Actions</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-500 transition-all duration-200 disabled:cursor-not-allowed text-sm"
          >
            <RotateCcw size={14} />
            Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white disabled:text-gray-500 transition-all duration-200 disabled:cursor-not-allowed text-sm"
          >
            <RotateRw size={14} />
            Redo
          </button>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={onToggleSegmentLines}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 text-sm ${
              showSegmentLines
                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {showSegmentLines ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSegmentLines ? 'Hide Lines' : 'Show Lines'}
          </button>
          
          <button
            onClick={onExport}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all duration-200 hover:scale-105 text-sm"
          >
            <Download size={16} />
            Export PNG
          </button>
          
          <button
            onClick={onClear}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-200 hover:scale-105 text-sm"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrushControls;