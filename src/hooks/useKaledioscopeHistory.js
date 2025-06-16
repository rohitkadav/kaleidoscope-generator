import { useState, useCallback } from 'react';

export const useKaleidoscopeHistory = () => {
  const [strokes, setStrokes] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addStroke = useCallback((stroke) => {
    const newStrokes = [...strokes, stroke];
    setStrokes(newStrokes);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newStrokes);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [strokes, history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setStrokes(history[newIndex] || []);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setStrokes([]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setStrokes(history[newIndex]);
    }
  }, [history, historyIndex]);

  const clear = useCallback(() => {
    setStrokes([]);
    const newHistory = [...history.slice(0, historyIndex + 1), []];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    strokes,
    addStroke,
    undo,
    redo,
    clear,
    canUndo,
    canRedo,
  };
};