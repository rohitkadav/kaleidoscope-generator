import React, { useRef, useEffect, useCallback, useState } from 'react';

const KaleidoscopeCanvas = ({
  segments,
  color,
  strokeWidth,
  strokes,
  onStrokeAdd,
  showSegmentLines,
  isAnimating,
  animationSpeed,
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const [rotation, setRotation] = useState(0);

  // Animation loop
  useEffect(() => {
  let animationId;

  const animate = () => {
    if (!isAnimating) return; // 💡 check before scheduling next frame
    setRotation(prev => (prev + animationSpeed) % 360);
    animationId = requestAnimationFrame(animate);
  };

  if (isAnimating) {
    animationId = requestAnimationFrame(animate);
  }

  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}, [isAnimating, animationSpeed]);
  // Handle canvas resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = window.innerHeight - 200; // Account for header
        const maxSize = Math.min(containerWidth - 40, containerHeight - 40, 500);
        const minSize = 300;
        const size = Math.max(minSize, maxSize);
        setCanvasSize({ width: size, height: size });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const drawKaleidoscope = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    // Clear canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply rotation if animating
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    // Draw segment lines if enabled
    if (showSegmentLines) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      for (let i = 0; i < segments; i++) {
        const angle = (i * 2 * Math.PI) / segments;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + radius * Math.cos(angle),
          centerY + radius * Math.sin(angle)
        );
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // Create clipping mask for circular canvas
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();

    // Draw all strokes with kaleidoscope effect
    const allStrokes = [...strokes];
    if (currentStroke.length > 0) {
      allStrokes.push({
        points: currentStroke,
        color,
        width: strokeWidth,
      });
    }

    allStrokes.forEach(stroke => {
      if (stroke.points.length < 2) return;

      for (let segment = 0; segment < segments; segment++) {
        const segmentAngle = (segment * 2 * Math.PI) / segments;
        const isOddSegment = segment % 2 === 1;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(segmentAngle);
        if (isOddSegment) {
          ctx.scale(1, -1); // Mirror every other segment
        }
        ctx.translate(-centerX, -centerY);

        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        stroke.points.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();

        ctx.restore();
      }
    });

    ctx.restore();
  }, [strokes, currentStroke, segments, color, strokeWidth, showSegmentLines, rotation]);

  useEffect(() => {
    drawKaleidoscope();
  }, [drawKaleidoscope]);

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: ((clientX - rect.left) * canvas.width) / rect.width,
      y: ((clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const startDrawing = (e) => {
    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setIsDrawing(true);
    setCurrentStroke([{ ...coords, color, width: strokeWidth }]);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    if (!coords) return;

    setCurrentStroke(prev => [...prev, { ...coords, color, width: strokeWidth }]);
  };

  const stopDrawing = () => {
    if (!isDrawing || currentStroke.length === 0) return;

    onStrokeAdd({
      points: currentStroke,
      color,
      width: strokeWidth,
    });

    setIsDrawing(false);
    setCurrentStroke([]);
  };

  return (
    <div className="flex items-start justify-center w-full h-full p-4">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="border-2 border-gray-600 dark:border-gray-400 rounded-full shadow-2xl cursor-crosshair touch-none bg-black transition-all duration-300"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};

export default KaleidoscopeCanvas;