# Installation Guide - Binaural Beats for Studying (macOS App)

## Quick Install (Recommended)

1. **Download the DMG file**:
   - For Intel Macs: `Binaural Beats for Studying-1.0.0.dmg`
   - For Apple Silicon Macs (M1/M2/M3): `Binaural Beats for Studying-1.0.0-arm64.dmg`

2. **Install the app**:
   - Double-click the DMG file to mount it
   - Drag "Binaural Beats for Studying" to your Applications folder
   - Eject the DMG file

3. **Launch the app**:
   - Open Applications folder
   - Double-click "Binaural Beats for Studying"
   - If macOS shows a security warning, go to System Preferences > Security & Privacy and click "Open Anyway"

## Alternative Installation (ZIP)

If you prefer ZIP files:
- For Intel Macs: `Binaural Beats for Studying-1.0.0-mac.zip`
- For Apple Silicon Macs: `Binaural Beats for Studying-1.0.0-arm64-mac.zip`

1. Download and extract the ZIP file
2. Move the app to Applications folder
3. Launch from Applications

## System Requirements

- macOS 10.14 (Mojave) or later
- Headphones or earbuds (required for binaural beats effect)
- Audio output capability

## First Run

When you first launch the app:
1. macOS may ask for microphone permissions (you can deny this - it's not needed)
2. The app will open and display the binaural beats interface
3. Put on headphones for the best experience
4. Start with a preset or customize your own frequencies

## Features Available in the App

- ✅ Study-optimized presets (Focus Mode, Deep Focus, Alert Study, Calm Focus)
- ✅ Custom frequency controls (base frequency 40-400 Hz, beat frequency 1-20 Hz)
- ✅ Volume control
- ✅ Built-in study timer with Pomodoro support
- ✅ Native macOS app with proper menu bar integration
- ✅ Works offline (no internet connection required)

## Troubleshooting

### App won't open
- **Security warning**: Go to System Preferences > Security & Privacy, and click "Open Anyway"
- **Corrupted download**: Re-download the DMG/ZIP file
- **Wrong architecture**: Make sure you downloaded the correct version for your Mac (Intel vs Apple Silicon)

### No sound
- Check that headphones/speakers are connected
- Verify system volume is not muted
- Try adjusting the volume slider in the app
- Ensure the correct audio output device is selected in System Preferences

### Performance issues
- Close other audio applications
- Restart the app if it becomes unresponsive
- Check Activity Monitor for high CPU usage

## Uninstalling

To remove the app:
1. Open Applications folder
2. Drag "Binaural Beats for Studying" to Trash
3. Empty Trash

## Development Mode

If you want to run from source code:
```bash
cd /Users/patrickcraig/Repos/binaural-beats-app
npm start
```

To rebuild the app:
```bash
npm run build-mac
```

## File Locations

- **App builds**: `dist/` folder
- **Source code**: Root directory of the project
- **DMG installers**: `dist/*.dmg`
- **ZIP packages**: `dist/*-mac.zip`

---

**Enjoy your focused study sessions! 🎧📚**
