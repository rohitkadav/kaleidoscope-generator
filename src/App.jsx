/*
 * © 2025 Rohit Kadav
 * Project: Kaleidoscope Pattern Generator for DevifyX
 * This code is for assignment/demo purposes only. Do not reuse, redistribute, or republish without permission.
 */
import React, { useState } from 'react';
import KaleidoscopeCanvas from './components/kaledioscopeCanvas.jsx';
import ColorPalette from './components/colorPalette.jsx';
import BrushControls from './components/brushControl.jsx';
import Animate from './components/animation.jsx';
import { useKaleidoscopeHistory } from './hooks/useKaledioscopeHistory.js';
import { exportCanvasAsImage } from './utils/exportCanvas';
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

function App() {
  const [segments, setSegments] = useState(8);
  const [color, setColor] = useState('#6366f1');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [showSegmentLines, setShowSegmentLines] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const {
    strokes,
    addStroke,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  } = useKaleidoscopeHistory();

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      exportCanvasAsImage(canvas, 'kaleidoscope-pattern');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    
   

    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ?  'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]'
        : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'
    }`}>
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl md:text-5xl font-bold mb-2 transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Kaleidoscope
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {' '}Generator
            </span>
          </h1>
          <p className={`text-base md:text-lg transition-colors duration-500 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Create beautiful mirror patterns with interactive drawing
          </p>
        </div>

        {/* Three-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Sidebar - Color Palette */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className=" top-6">
              <ColorPalette
                color={color}
                onColorChange={setColor}
                isDarkMode={isDarkMode}
              />
            </div>
            {/* animation controls */}
            <div className='mt-3'>
              <Animate
                isAnimating={isAnimating}
                onToggleAnimation={() => setIsAnimating(!isAnimating)}
                animationSpeed={animationSpeed}
                onAnimationSpeedChange={setAnimationSpeed}
              />
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="w-full h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center">
              <KaleidoscopeCanvas
                segments={segments}
                color={color}
                strokeWidth={strokeWidth}
                strokes={strokes}
                onStrokeAdd={addStroke}
                showSegmentLines={showSegmentLines}
                isAnimating={isAnimating}
                animationSpeed={animationSpeed}
              />
            </div>
          </div>

          {/* Right Sidebar - Brush Controls */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-6">
              <BrushControls
                segments={segments}
                onSegmentsChange={setSegments}
                strokeWidth={strokeWidth}
                onStrokeWidthChange={setStrokeWidth}
                onClear={clear}
                onUndo={undo}
                onRedo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
                onExport={handleExport}
                showSegmentLines={showSegmentLines}
                onToggleSegmentLines={() => setShowSegmentLines(!showSegmentLines)}
                isAnimating={isAnimating}
                onToggleAnimation={() => setIsAnimating(!isAnimating)}
                animationSpeed={animationSpeed}
                onAnimationSpeedChange={setAnimationSpeed}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleTheme}
              />
            </div>

          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 transition-colors duration-500`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-black' : 'text-gray-800'}  dark:text-yellow-50`}>
              How to Use
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className=''>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-black' : 'text-gray-700'} dark:text-white`}>Drawing</h3>
                <ul className={`space-y-1 ${isDarkMode ? 'text-black' : 'text-gray-600'}  dark:text-white`}>
                  <li>• Click and drag to draw on the black canvas</li>
                  <li>• Your strokes will be mirrored across all segments</li>
                  <li>• Use touch gestures on mobile devices</li>
                  <li>• Choose Colors form colorPalette</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-black' : 'text-gray-700'} dark:text-white`}>Controls</h3>
                <ul className={`space-y-1 ${isDarkMode ? 'text-black' : 'text-gray-600'} dark:text-white`}>
                  <li>• Choose colors from the left palette</li>
                  <li>• Adjust brush settings on the right</li>
                  <li>• Change mirror segments (4, 6, 8, or 12)</li>
                  <li>• Use undo/redo to manage your drawing</li>
                </ul>
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-black' : 'text-gray-700'} dark:text-white`}>Features</h3>
                <ul className={`space-y-1 ${isDarkMode ? 'text-black' : 'text-gray-600'} dark:text-white`}>
                  <li>• Toggle animation to rotate your pattern</li>
                  <li>• Show/hide segment lines for reference</li>
                  <li>• Export your creation as a PNG image</li>
                  <li>• Switch between dark and light themes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
    

      </div>
       <footer className={`w-full ${!isDarkMode ? 'text-black' : 'text-gray-400'} py-4 px-6 rounded-lg flex justify-between items-center`}>
        <p className="text-sm">
        © {new Date().getFullYear()} Rohit Kadav(TechSword). All rights reserved.
      </p>
      <div className={`flex gap-4 ${!isDarkMode ? 'text-black' : 'text-gray-400'}`}>
        <a href="#" className="hover:text-white" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="" className="hover:text-white" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-white" aria-label="Twitter">
          <FaXTwitter />
        </a>
        <a href="https://github.com/rohitkadav" className="hover:text-white" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="#" className="hover:text-white" aria-label="YouTube">
          <FaYoutube />
        </a>
      </div>
    </footer>
    </div>
  );
}

export default App;