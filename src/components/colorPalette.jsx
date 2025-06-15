import React from 'react';
import { Palette } from 'lucide-react';

const colorPresets = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#f43f5e', '#000000', '#374151', '#ffffff'
];

const ColorPalette = ({ color, onColorChange, isDarkMode }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/20 dark:border-gray-700/50">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <Palette size={16} />
        Color Palette
      </h3>
      
      {/* Current Color Display */}
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div 
            className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-md"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {color.toUpperCase()}
          </span>
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-10 rounded-lg border-2 border-gray-200 dark:border-gray-600 cursor-pointer"
        />
      </div>

      {/* Color Presets */}
      <div className="grid grid-cols-4 gap-2">
        {colorPresets.map(preset => (
          <button
            key={preset}
            onClick={() => onColorChange(preset)}
            className={`w-full h-10 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
              color === preset 
                ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200 dark:ring-indigo-800' 
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            style={{ backgroundColor: preset }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;