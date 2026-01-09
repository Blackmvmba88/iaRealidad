# Quick Start Guide

Get up and running with the AR Electronics Repair Assistant in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- For testing: Physical Android or iOS device with camera

## Installation

```bash
# Clone the repository
git clone https://github.com/Blackmvmba88/iaRealidad.git
cd iaRealidad

# Install dependencies
npm install
```

## Running the App

### Android (Recommended for Quick Start)

```bash
# Make sure you have an Android device connected or emulator running
npm run android
```

### iOS (macOS only)

```bash
# Install iOS dependencies
cd ios && pod install && cd ..

# Run the app
npm run ios
```

## First Steps

1. **Launch the app** - You'll see the home screen with 5 modes
2. **Select a mode** - Try "Inspection" first
3. **Tap "Start AR Mode"**
4. **Grant camera permission** when prompted
5. **Point at any circuit board** - You'll see AR overlays

## Testing Without Hardware

The app includes sample data, so you can test all features by pointing the camera at:
- Any flat surface
- A blank piece of paper
- Even just the desk

The overlays will appear at predefined positions, allowing you to:
- See how component highlighting works
- Read measurement instructions
- View repair steps
- Explore module installation guides

## Try Each Mode

### 🔍 Inspection Mode
- Shows component labels (U1, R1, C1)
- Color-coded pins (Red=VCC, Black=GND, Blue=Data)

### 📊 Measurement Mode
- Orange circles show probe points
- Instructions for multimeter use
- Expected voltage ranges

### 🔧 Repair Mode
- Step-by-step repair instructions
- Highlighted components to replace
- Safety warnings

### ⚡ Creation Mode
- Bluetooth module guide (HC-05)
- WiFi module guide (ESP8266)
- Pin connection diagrams

### ✓ Validation Mode
- Test results (✓ pass, ⚠ warning)
- Troubleshooting suggestions

## Next Steps

- Read [README.md](README.md) for full feature documentation
- Check [EXAMPLES.md](EXAMPLES.md) for detailed usage scenarios
- See [SETUP.md](SETUP.md) for detailed installation instructions
- Read [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Common Issues

**Camera not working?**
- Use a physical device (emulators have limited camera support)
- Check camera permissions in device settings

**App won't build?**
- Clear cache: `npm start -- --reset-cache`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**For Android on Windows/Linux:**
- Set `ANDROID_HOME` environment variable
- Ensure Android SDK is installed

## Getting Help

- Open an issue on GitHub
- Check existing issues for solutions
- Read the full documentation

---

**Note**: This is a demonstration app with sample data. Real AR component recognition would require integration with ML models and computer vision libraries.

Enjoy exploring AR-guided electronics repair! 🔧⚡
