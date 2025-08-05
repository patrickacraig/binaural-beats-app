# 🎧 Binaural Beats for Studying

A simple, effective web application that generates binaural beats optimized for studying and focus. Built with vanilla HTML, CSS, and JavaScript using the Web Audio API.

## What are Binaural Beats?

Binaural beats are an auditory illusion created when two slightly different frequencies are played separately into each ear. Your brain processes the difference between these frequencies, creating a perceived "beat" that can influence brainwave activity and mental states.

## Features

### 🎯 Study-Optimized Presets
- **Focus Mode**: 40Hz + 10Hz beat (Gamma + Alpha waves)
- **Deep Focus**: 40Hz + 8Hz beat (Gamma + Alpha waves) 
- **Alert Study**: 200Hz + 10Hz beat (Higher frequency + Alpha waves)
- **Calm Focus**: 150Hz + 6Hz beat (Moderate frequency + Theta waves)

### ⚙️ Custom Controls
- Adjustable base frequency (40-400 Hz)
- Adjustable beat frequency (1-20 Hz)
- Volume control
- Real-time frequency adjustment while playing

### ⏰ Built-in Study Timer
- Pomodoro-friendly timer (1-120 minutes)
- Visual countdown display
- Color-coded time warnings
- Audio notification when complete
- Automatic session management

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Clean, modern interface
- Accessible controls and clear labeling

### 🪟 Desktop Widget (macOS App Only)
- Floating desktop widget for quick control
- Start/stop study modes without opening main app
- Always-on-top widget stays accessible
- Real-time status updates

## How to Use

1. **Open the App**: Simply open `index.html` in any modern web browser
2. **Choose Your Mode**: 
   - Click a preset button for quick start
   - Or use custom sliders for precise control
3. **Put on Headphones**: Binaural beats require stereo separation to work effectively
4. **Start Audio**: Click the "Start" button to begin generating beats
5. **Set Timer** (optional): Enter study duration and start the timer
6. **Study**: Focus on your work while the beats play in the background

### Using the Desktop Widget (macOS App)

1. **Show Widget**: Go to menu "Binaural Beats" > "Show Desktop Widget" (⌘⇧W)
2. **Position Widget**: Drag the widget to your preferred screen location
3. **Quick Control**: Click preset buttons directly from the widget
4. **Status Display**: See current playing status in the widget
5. **Hide Widget**: Use menu "Binaural Beats" > "Hide Desktop Widget" or close widget window

## Frequency Guide

### Beat Frequencies (What You'll Hear)
- **1-4 Hz (Delta)**: Deep relaxation, meditation
- **4-8 Hz (Theta)**: Creativity, light meditation, calm focus
- **8-12 Hz (Alpha)**: Relaxed focus, learning, stress reduction
- **13-30 Hz (Beta)**: Active concentration, analytical thinking
- **30+ Hz (Gamma)**: High-level cognitive processing, memory

### Base Frequencies (Carrier Tones)
- **40-100 Hz**: Low, subtle tones (less intrusive)
- **100-200 Hz**: Mid-range, balanced
- **200-400 Hz**: Higher pitched, more noticeable

## Best Practices

1. **Use Headphones**: Essential for proper binaural effect
2. **Start Low**: Begin with lower volumes and shorter sessions
3. **Take Breaks**: 45-60 minute sessions with 10-15 minute breaks
4. **Stay Hydrated**: Drink water during longer study sessions
5. **Find Your Sweet Spot**: Experiment with different frequencies to find what works best for you

## Technical Requirements

- Modern web browser with Web Audio API support
- Headphones or earbuds (required for binaural effect)
- JavaScript enabled

### Supported Browsers
- Chrome 34+
- Firefox 25+
- Safari 14.1+
- Edge 79+

## File Structure

```
binaural-beats-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How It Works

The app uses the Web Audio API to create two separate oscillators:
- Left ear: Base frequency
- Right ear: Base frequency + beat frequency

Your brain perceives the difference as a rhythmic beating sound at the beat frequency, which can help synchronize brainwaves and enhance focus.

## Customization

The app is built with clean, modular code that's easy to modify:

- **Add New Presets**: Modify the preset buttons in `index.html` and update the event listeners in `script.js`
- **Change Frequency Ranges**: Adjust the min/max values on the range sliders
- **Modify Timer Options**: Update the timer validation and display logic
- **Style Changes**: All visual styling is contained in `styles.css`

## Safety Notes

- Start with low volumes to avoid hearing damage
- Take regular breaks during extended use
- Stop using if you experience headaches or discomfort
- Not recommended for people with epilepsy or seizure disorders
- Consult a healthcare provider if you have concerns

## License

This project is open source and free to use, modify, and distribute.

## Contributing

Feel free to fork this project and submit improvements! Some ideas for enhancements:

- Additional preset modes for different activities
- Visual frequency spectrum display
- Session logging and statistics
- Background noise options (white/brown noise)
- Progressive frequency shifts during sessions
- Integration with productivity apps

---

**Happy Studying! 📚🎧**
