# Kaleidoscope Generator

A beautiful, interactive kaleidoscope effect generator built with React.js  and JavaScript. Create stunning mirror patterns with real-time drawing and customizable effects.

![Kaleidoscope Generator](https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?auto=compress&cs=tinysrgb&w=800)

## ✨ Features

### Core Features
- **Interactive Canvas Drawing**: Freehand drawing with mouse and touch support
- **Mirror Segments**: Choose from 4, 6, 8, or 12 mirror segments
- **Real-Time Kaleidoscope Effect**: See your patterns emerge as you draw
- **Color Picker**: Custom color selection with 20 preset colors
- **Stroke Width Control**: Adjustable brush size from 1-20px
- **Undo/Redo**: Full drawing history management
- **Clear Canvas**: Start fresh anytime
- **Responsive Design**: Works seamlessly on desktop and mobile

### Bonus Features
- **PNG Export**: Download your creations as high-quality images
- **Preset Color Palettes**: Quick access to beautiful color combinations
- **Segment Lines Toggle**: Show/hide reference lines
- **Animation Mode**: Rotating pattern animation with speed control
- **Dark/Light Theme**: Toggle between beautiful theme variants
- **Glass Morphism UI**: Modern, elegant interface design

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kaleidoscope-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 How to Use

### Drawing
- Click and drag on the circular canvas to draw
- Your strokes will be automatically mirrored across all segments
- Use touch gestures on mobile devices for drawing

### Controls
- **Mirror Segments**: Select 4, 6, 8, or 12 segments for different patterns
- **Colors**: Choose from preset colors or use the custom color picker
- **Stroke Width**: Adjust brush size with the slider control
- **Undo/Redo**: Navigate through your drawing history

### Animation
- Toggle animation to rotate your pattern continuously
- Adjust animation speed from 0.1x to 3x
- Show/hide segment reference lines

### Export & Theme
- Export your masterpiece as a PNG image
- Switch between dark and light themes
- Clear canvas to start a new creation

## 🏗️ Project Structure

```
src/
├── components/
│   ├── KaleidoscopeCanvas.tsx    # Main canvas component
│   └── ControlPanel.tsx          # UI controls and settings
├── hooks/
│   └── useKaleidoscopeHistory.ts # Undo/redo functionality
├── utils/
│   └── exportCanvas.ts           # Image export utility
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles and utilities
```

## 🛠️ Technical Implementation

### Kaleidoscope Algorithm
The kaleidoscope effect is achieved by:
1. Dividing the canvas into equal segments (like pizza slices)
2. For each drawing stroke, creating mirrored copies across all segments
3. Alternating between normal and vertically flipped segments for the classic kaleidoscope look
4. Using canvas transformations (rotation and scaling) for precise positioning

### Key Technologies
- **React 18** with functional components and hooks
- **TypeScript** for type safety and better development experience
- **HTML5 Canvas** for high-performance drawing and rendering
- **Tailwind CSS** for styling and responsive design
- **Lucide React** for beautiful, consistent icons

### Performance Optimizations
- Efficient canvas rendering with minimal redraws
- Optimized touch event handling for mobile devices
- Debounced resize handling for responsive canvas
- Memory-efficient history management

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 🎯 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License


## 🙏 Acknowledgments

- Built with Vite for fast development experience
- Icons provided by Lucide React
- Gradient inspirations from various design systems
- Color palettes inspired by modern design trends

---

**Enjoy creating beautiful kaleidoscope patterns!** ✨