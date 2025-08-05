# Desktop Widget Guide - Binaural Beats for Studying

## What is the Desktop Widget?

The desktop widget is a small, floating control panel that allows you to quickly start and stop different study modes without having to switch to the main application window. It's perfect for when you want to change study modes while working in other applications.

## Features

✅ **Always on top** - Stays visible above all other windows  
✅ **Quick presets** - One-click access to all four study modes  
✅ **Real-time status** - Shows what's currently playing  
✅ **Draggable** - Position anywhere on your screen  
✅ **Transparent background** - Minimal visual distraction  

## How to Use

### Opening the Widget

1. **From Menu Bar**: 
   - Go to `Binaural Beats` > `Show Desktop Widget`
   - Or use keyboard shortcut: `⌘⇧W`

2. **First Launch**:
   - The widget will appear as a small floating window
   - It shows 4 preset buttons and a stop button
   - Status display shows current playback state

### Controlling Audio

**Start a Study Mode:**
- Click any of the four preset buttons:
  - **Focus Mode**: 40Hz + 10Hz beat (Gamma + Alpha waves)
  - **Deep Focus**: 40Hz + 8Hz beat (Gamma + Alpha waves)
  - **Alert Study**: 200Hz + 10Hz beat (Higher frequency + Alpha)
  - **Calm Focus**: 150Hz + 6Hz beat (Moderate frequency + Theta)

**Stop Audio:**
- Click the "Stop" button to stop all audio

**Status Display:**
- Shows "Status: Stopped" when no audio is playing
- Shows "Status: Playing [Mode Name]" when audio is active

### Positioning the Widget

- **Move**: Click and drag the widget to any position on your screen
- **Resize**: The widget has a fixed optimal size for the controls
- **Stays on top**: The widget remains visible even when other apps are in focus
- **Multi-workspace**: The widget appears on all macOS Spaces/Desktops

### Closing the Widget

1. **From Menu**: Go to `Binaural Beats` > `Hide Desktop Widget`
2. **Close Button**: Click the close button on the widget window
3. **Right-click**: Right-click the widget and select close (if available)

## Tips for Best Use

### Workflow Integration
1. **Position** the widget in a corner where it won't interfere with your work
2. **Start your study session** by clicking a preset before diving into focused work
3. **Switch modes** during breaks without disrupting your workflow
4. **Use timer** in the main app for structured study sessions

### Study Session Workflow
1. Open main app and set your study timer
2. Show the desktop widget and position it conveniently
3. Start your preferred study mode from the widget
4. Focus on your work - change modes as needed from the widget
5. When timer completes, use widget to stop or switch to a break mode

### Recommended Positions
- **Top-right corner**: Easy access, doesn't block most content
- **Bottom-left corner**: Out of the way but easily clickable
- **Secondary monitor**: If you have dual monitors, place on the secondary screen

## Troubleshooting

### Widget Not Responding
- Try closing and reopening the widget
- Restart the main application if needed

### Widget Behind Other Windows
- Click on the widget to bring it to front
- The widget should automatically stay on top, but some apps might override this

### Audio Not Starting from Widget
- Ensure the main application window is still open (can be minimized)
- Check that your headphones/audio output is working
- Try controlling audio from the main app first to test the connection

### Widget Disappeared
- Use `⌘⇧W` to show it again
- Or go to menu `Binaural Beats` > `Show Desktop Widget`

## Technical Details

- **Communication**: Widget communicates with main app via Electron IPC
- **Audio Processing**: All audio generation happens in the main application
- **State Sync**: Widget and main app automatically sync playback status
- **Memory Usage**: Widget uses minimal system resources

## Keyboard Shortcuts

- `⌘⇧W` - Show/focus desktop widget
- `⌘Q` - Quit entire application (closes widget too)

---

**Enjoy seamless study session control! 🎧✨**
