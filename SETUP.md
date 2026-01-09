# Setup Guide

This guide will help you get the AR Electronics Repair Assistant up and running on your development machine.

## Quick Start

### Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js 18 or later installed
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] For iOS: macOS with Xcode 14+
- [ ] For Android: Android Studio with SDK tools

### Step-by-Step Setup

#### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/Blackmvmba88/iaRealidad.git
cd iaRealidad

# Install Node dependencies
npm install

# For iOS development (macOS only)
cd ios && pod install && cd ..
```

#### 2. Environment Setup

##### Android Setup

1. Install Android Studio from https://developer.android.com/studio
2. Open Android Studio → SDK Manager
3. Install:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android NDK 25.1.8937393
4. Set up environment variables in `~/.bash_profile` or `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

5. Start an Android emulator or connect a physical device with USB debugging enabled

##### iOS Setup (macOS only)

1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
```bash
xcode-select --install
```
3. Install CocoaPods:
```bash
sudo gem install cocoapods
```
4. Accept Xcode license:
```bash
sudo xcodebuild -license accept
```

#### 3. Running the App

##### On Android

```bash
# Start Metro bundler in one terminal
npm start

# In another terminal, run the app
npm run android

# Or run both in one command
npx react-native run-android
```

##### On iOS

```bash
# Start Metro bundler in one terminal
npm start

# In another terminal, run the app
npm run ios

# Or specify a simulator
npx react-native run-ios --simulator="iPhone 15"
```

#### 4. Granting Permissions

When you first run the app:
- **Android**: Tap "Allow" when prompted for camera permission
- **iOS**: Tap "OK" to grant camera access

## Common Issues and Solutions

### Issue: Metro bundler won't start
**Solution**: Clear cache and restart
```bash
npm start -- --reset-cache
```

### Issue: Android build fails with "SDK location not found"
**Solution**: Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### Issue: iOS pods won't install
**Solution**: Update CocoaPods and clean install
```bash
cd ios
pod deintegrate
pod cache clean --all
pod install
cd ..
```

### Issue: "Unable to resolve module" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules
npm install
```

### Issue: Camera not working on Android emulator
**Solution**: Use a physical device. Most Android emulators don't support camera well. Alternatively, use an emulator with camera support enabled.

### Issue: App crashes on iOS simulator
**Solution**: Use a physical iOS device. Camera features require actual hardware.

## Development Workflow

### Making Changes

1. Edit source files in `src/`
2. The app will hot-reload automatically
3. For native changes (Android/iOS), rebuild the app

### Adding Dependencies

```bash
# Add a JavaScript dependency
npm install package-name

# For dependencies with native code, also:
cd ios && pod install && cd ..
```

### Debugging

#### React Native Debugger
```bash
# Open developer menu
# Android: Cmd+M (macOS) or Ctrl+M (Windows/Linux)
# iOS: Cmd+D

# Select "Debug" to open Chrome DevTools
```

#### View Logs
```bash
# Android logs
npx react-native log-android

# iOS logs
npx react-native log-ios
```

## Project Structure Explained

```
iaRealidad/
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/         # Full-screen views
│   ├── services/        # Business logic, data services
│   ├── types/           # TypeScript definitions
│   └── App.tsx          # Root component
├── android/             # Android native project
├── ios/                 # iOS native project
├── index.js            # App entry point
└── package.json        # Dependencies
```

## Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### iOS IPA

1. Open `ios/iaRealidad.xcworkspace` in Xcode
2. Select Product → Archive
3. Follow the wizard to export IPA

## Testing the App

### Manual Testing Checklist

- [ ] Home screen displays all 5 modes
- [ ] Can select different modes
- [ ] "Start AR Mode" button navigates to camera
- [ ] Camera permission request appears
- [ ] Camera view displays after granting permission
- [ ] Mode selector shows at bottom of AR view
- [ ] Can switch between modes in AR view
- [ ] Each mode shows different overlays
- [ ] "Back" button returns to home screen

### Testing Without Physical Electronics

The app includes sample data and simulated components, so you can test all features without pointing the camera at actual circuit boards.

## Next Steps

After setup:
1. Read the main README.md for feature documentation
2. Try all 5 modes (Inspection, Measurement, Repair, Creation, Validation)
3. Explore the code to understand the architecture
4. Consider contributing enhancements!

## Getting Help

- Check GitHub Issues for known problems
- Review React Native documentation: https://reactnative.dev
- Check Vision Camera docs: https://github.com/mrousavy/react-native-vision-camera

## Performance Tips

- Use a physical device for best performance
- Keep Metro bundler running during development
- Clear cache if experiencing strange behavior
- Update dependencies regularly for bug fixes
