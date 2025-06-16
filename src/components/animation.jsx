import React from 'react';
import { Brush, RotateCcw, Rotate3D as RotateRw, Trash2, Download, Eye, EyeOff, Play, Pause, Sun, Moon } from 'lucide-react';

const Animate= ({
    isAnimating,
    animationSpeed,
    onToggleAnimation,
    onAnimationSpeedChange,
}) => {
    return(
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
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
      </div>
    )
}

export default Animate;