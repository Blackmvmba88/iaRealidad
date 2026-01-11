# Platform Compatibility Guide

## Supported Platforms

iaRealidad is designed to be a cross-platform AR assistant that works on multiple operating systems:

| Platform | Status | Notes |
|----------|--------|-------|
| 📱 Android | ✅ Fully Supported | API 21+ (Android 5.0+) |
| 📱 iOS | ✅ Fully Supported | iOS 13.0+ |
| 🪟 Windows | ⚙️ In Development | React Native for Windows |
| 🍎 macOS | ⚙️ In Development | React Native for macOS |
| 🐧 Linux | 🔄 Planned | Via React Native Web/Electron |

## Platform-Specific Features

### Mobile Platforms (Android & iOS)

#### Fully Supported Features
- ✅ **Camera/AR Functionality**: Full access to device camera for AR overlays
- ✅ **Bluetooth**: Hardware sensor integration (multimeters, temperature sensors)
- ✅ **Storage**: Local data persistence via AsyncStorage
- ✅ **Navigation**: Full gesture support and navigation
- ✅ **Sensing**: Audio analysis, microphone input
- ✅ **Permissions**: Camera, microphone, Bluetooth, storage

#### Platform Requirements

**Android:**
- Minimum SDK: API 21 (Android 5.0 Lollipop)
- Recommended: API 29+ (Android 10+)
- Camera permission
- Internet permission
- Bluetooth permission (for hardware sensors)
- Storage permission (for data persistence)

**iOS:**
- Minimum: iOS 13.0
- Recommended: iOS 15.0+
- Camera usage description in Info.plist
- Microphone usage description
- Bluetooth permission (for hardware sensors)

### Desktop Platforms (Windows, macOS, Linux)

#### Currently Supported Features
- ✅ **Core UI**: React Native UI components
- ✅ **Storage**: Data persistence
- ✅ **Navigation**: Keyboard and mouse navigation
- ✅ **Diagnostics**: Full diagnostic engine support
- ✅ **Case Management**: Repair case documentation

#### Limited/Future Features
- ⚠️ **Camera/AR**: Limited support (webcam-based, not AR)
- ⚠️ **Bluetooth**: Partial support (varies by platform)
- 🔄 **Hardware Sensing**: Future implementation
- 🔄 **Mobile-optimized UI**: Desktop UI adaptation needed

#### Platform Requirements

**Windows:**
- Windows 10 version 1809 (October 2018 Update) or higher
- React Native for Windows
- Visual Studio 2019 or later (for development)
- Node.js 18+

**macOS:**
- macOS 10.14 (Mojave) or higher
- React Native for macOS
- Xcode 14+ (for development)
- Node.js 18+

**Linux:**
- Modern Linux distribution (Ubuntu 20.04+, Fedora 35+, etc.)
- React Native Web or Electron framework
- Node.js 18+
- X11 or Wayland display server

## Installation by Platform

### Android

```bash
# Install dependencies
npm install

# Run on Android device/emulator
npm run android
```

### iOS

```bash
# Install dependencies
npm install

# Install CocoaPods dependencies
cd ios && pod install && cd ..

# Run on iOS device/simulator
npm run ios
```

### Windows

```bash
# Install dependencies
npm install

# Initialize React Native Windows (first time only)
npx react-native-windows-init --overwrite

# Run on Windows
npm run windows
```

### macOS

```bash
# Install dependencies
npm install

# Initialize React Native macOS (first time only)
npx react-native-macos-init --overwrite

# Install CocoaPods dependencies
cd macos && pod install && cd ..

# Run on macOS
npm run macos
```

### Linux

> **Note**: Linux support is planned via React Native Web or Electron. Stay tuned for updates!

```bash
# Install dependencies
npm install

# Build for web (works on Linux desktop)
npm run web
```

## Development Requirements

### All Platforms

- **Node.js**: 18 or higher
- **npm** or **yarn**: Latest version
- **Git**: For version control

### Android Development

- **Android Studio**: Latest version
- **Android SDK**: API 21+ installed
- **Android Emulator** or physical device
- **Java Development Kit (JDK)**: 11 or higher

### iOS Development

- **macOS**: Required (iOS development only possible on macOS)
- **Xcode**: 14 or higher
- **CocoaPods**: Latest version
- **iOS Simulator** or physical device

### Windows Development

- **Windows 10/11**: Version 1809 or higher
- **Visual Studio 2019/2022**: With C++ development tools
- **React Native Tools**: For Visual Studio
- **Windows SDK**: 10.0.18362.0 or higher

### macOS Development

- **macOS**: 10.14 (Mojave) or higher
- **Xcode**: 14 or higher
- **CocoaPods**: Latest version

### Linux Development

- **Linux Distribution**: Ubuntu 20.04+, Fedora 35+, or equivalent
- **Build tools**: gcc, make, etc.
- **Display server**: X11 or Wayland

## Platform Detection

The app includes platform detection utilities to provide platform-specific behavior:

```typescript
import { 
  getPlatformInfo, 
  isMobile, 
  isDesktop 
} from './src/utils/platformUtils';

// Get comprehensive platform information
const platform = getPlatformInfo();
console.log(`Running on: ${platform.platformName}`);
console.log(`Is mobile: ${platform.isMobile}`);
console.log(`Is desktop: ${platform.isDesktop}`);

// Quick checks
if (isMobile()) {
  // Enable AR features
}

if (isDesktop()) {
  // Show desktop-optimized UI
}
```

## Feature Availability by Platform

| Feature | Android | iOS | Windows | macOS | Linux |
|---------|---------|-----|---------|-------|-------|
| AR Overlay | ✅ | ✅ | ⚠️ | ⚠️ | 🔄 |
| Component Detection | ✅ | ✅ | ⚠️ | ⚠️ | 🔄 |
| Measurement Mode | ✅ | ✅ | ⚠️ | ⚠️ | 🔄 |
| Repair Mode | ✅ | ✅ | ✅ | ✅ | ✅ |
| Diagnostic Mode | ✅ | ✅ | ✅ | ✅ | ✅ |
| Case Management | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bluetooth Sensors | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| Audio Analysis | ✅ | ✅ | ⚠️ | ⚠️ | 🔄 |
| Data Persistence | ✅ | ✅ | ✅ | ✅ | ✅ |
| Internationalization | ✅ | ✅ | ✅ | ✅ | ✅ |
| Firmware Generator | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legend:**
- ✅ Fully Supported
- ⚠️ Limited/Partial Support
- 🔄 Planned/In Development
- ❌ Not Supported

## Performance Considerations

### Mobile (Android/iOS)
- **Optimized for**: Touch interactions, camera processing
- **Battery impact**: Medium (camera and AR processing)
- **Storage**: ~100-200MB including media
- **Network**: Optional (for future cloud features)

### Desktop (Windows/macOS/Linux)
- **Optimized for**: Keyboard/mouse input, larger screens
- **CPU impact**: Low to medium (no AR processing)
- **Storage**: ~150-250MB
- **Network**: Optional

## Building for Production

### Android

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk
```

### iOS

1. Open `ios/iaRealidad.xcworkspace` in Xcode
2. Select "Any iOS Device" or your connected device
3. Product → Archive
4. Follow App Store distribution steps

### Windows

```bash
# Build release bundle
npx react-native run-windows --release

# Create installer (requires additional setup)
# See: https://microsoft.github.io/react-native-windows/docs/native-modules-setup
```

### macOS

```bash
# Build release bundle
npx react-native run-macos --release

# Create .app bundle and DMG (requires additional setup)
```

## Continuous Integration

The project supports building for all platforms via CI/CD:

```yaml
# Example GitHub Actions workflow
jobs:
  android:
    runs-on: ubuntu-latest
    # Build Android APK
    
  ios:
    runs-on: macos-latest
    # Build iOS IPA
    
  windows:
    runs-on: windows-latest
    # Build Windows MSIX
    
  macos:
    runs-on: macos-latest
    # Build macOS app
```

## Troubleshooting

### Common Issues

#### Android
- **Problem**: Build fails with SDK errors
- **Solution**: Ensure Android SDK is properly installed and `ANDROID_HOME` is set

#### iOS
- **Problem**: CocoaPods installation fails
- **Solution**: Run `pod repo update` and `pod install --repo-update`

#### Windows
- **Problem**: Visual Studio tools not found
- **Solution**: Install Visual Studio with C++ desktop development workload

#### macOS
- **Problem**: Code signing issues
- **Solution**: Configure development team in Xcode

## Contributing

When contributing platform-specific code:

1. Use `Platform.OS` or platform utilities to detect platform
2. Test on all supported platforms when possible
3. Document platform-specific behavior
4. Use platform-specific file extensions when needed:
   - `.android.ts` / `.android.tsx`
   - `.ios.ts` / `.ios.tsx`
   - `.windows.ts` / `.windows.tsx`
   - `.macos.ts` / `.macos.tsx`

## Future Platform Support

### React Native Web (Linux/Web)
- Full web browser support
- Progressive Web App (PWA) capabilities
- Desktop Linux via browser

### Electron (Desktop)
- Alternative desktop solution
- Full Node.js integration
- Native desktop features

### React Native for Windows + macOS
- Native desktop applications
- OS-level integration
- Better performance than web-based solutions

## Resources

- [React Native](https://reactnative.dev/)
- [React Native for Windows](https://microsoft.github.io/react-native-windows/)
- [React Native for macOS](https://microsoft.github.io/react-native-windows/docs/rnm-getting-started)
- [React Native Web](https://necolas.github.io/react-native-web/)

## Support

For platform-specific issues, please:
1. Check this guide first
2. Search existing GitHub issues
3. Create a new issue with platform details
4. Include device/OS version information

---

**Last Updated**: January 2026  
**Version**: 2.0  
**Platforms**: Android, iOS, Windows, macOS, Linux (planned)
