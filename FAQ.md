# Frequently Asked Questions (FAQ)

## General Questions

### What is iaRealidad?
iaRealidad is a cross-platform mobile AR (Augmented Reality) application that assists with electronics repair, measurement, and creation. It overlays real-time instructions on circuit boards using your device's camera.

### What platforms does it support?
- **iOS**: iPhone/iPad with iOS 13.4+
- **Android**: Devices with Android 5.0 (API 21)+

### Is it free?
Yes, the app is open-source under the MIT License.

### Does it require an internet connection?
No, the current version works completely offline. All guides and data are included in the app.

## Features

### Does it really recognize components automatically?
The current version includes sample data for demonstration. Real-time component recognition would require:
- Machine learning models
- Computer vision processing
- Training data
These features are planned for future versions.

### What modes are available?
1. **Inspection**: Component and pin identification
2. **Measurement**: Multimeter probing guidance
3. **Repair**: Step-by-step repair instructions
4. **Creation**: Module installation guides (Bluetooth, WiFi)
5. **Validation**: Circuit testing and verification

### What electronic modules are supported?
Currently includes guides for:
- HC-05 Bluetooth module
- ESP8266 WiFi module
- Generic component identification

More modules can be added in future updates.

## Technical Questions

### What technology is used?
- React Native 0.73.2
- TypeScript
- react-native-vision-camera for camera access
- react-native-svg for AR overlays

### Why React Native?
React Native enables:
- Cross-platform development (one codebase for iOS and Android)
- Fast development and hot reloading
- Large ecosystem of libraries
- Native performance

### Can I use it with a simulator/emulator?
Limited functionality. Simulators/emulators typically:
- Don't have full camera support
- Lack AR capabilities
- Have performance limitations

**Recommendation**: Use a physical device for best experience.

### What camera features are required?
- Rear camera access
- Autofocus (optional but recommended)
- Decent lighting conditions

## Usage Questions

### How accurate are the measurements?
The app provides **guidance only**. You must:
- Use your own multimeter
- Read values yourself
- Compare to expected ranges

The app doesn't read multimeter displays.

### Can it detect faulty components?
No, the app provides guidance for testing. You must:
- Perform measurements manually
- Compare results to expected values
- Make decisions based on readings

### What if I don't have electronics experience?
The app is designed to assist, not replace electronics knowledge. Recommended:
- Basic understanding of circuits
- Familiarity with multimeters
- Knowledge of soldering (for repair mode)
- Understanding of electrical safety

### Is it safe to use while working on electronics?
Yes, but remember:
- **Always disconnect power** before repairs
- **Follow safety warnings** shown in the app
- **Use proper tools** (soldering iron, multimeter)
- **Work in ventilated areas** when soldering

## Development Questions

### Can I contribute?
Yes! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How do I add new modules?
1. Edit `src/services/dataService.ts`
2. Add new `ModuleGuide` object
3. Update `getSampleDataForMode` function
4. Test and submit PR

### How do I add new component types?
1. Update types in `src/types/index.ts`
2. Add sample data in `src/services/dataService.ts`
3. Update rendering in `src/components/AROverlay.tsx`

### Can I use this in my own project?
Yes! It's MIT licensed. You can:
- Use the code
- Modify it
- Include in commercial projects
- Just include the license file

### How do I build for production?

**Android:**
```bash
cd android
./gradlew assembleRelease
```

**iOS:**
- Open Xcode
- Product → Archive
- Follow export wizard

## Troubleshooting

### App crashes on startup
Try:
1. Clear cache: `npm start -- --reset-cache`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check React Native version compatibility

### Camera permission denied
- Go to device Settings → Apps → iaRealidad
- Enable Camera permission
- Restart app

### AR overlays not showing
Check:
- Camera is working
- Good lighting conditions
- Point at a flat surface
- Try different modes

### Build fails on Android
Common solutions:
1. Set `ANDROID_HOME` environment variable
2. Update Android SDK
3. Clean build: `cd android && ./gradlew clean`
4. Check `local.properties` file

### Build fails on iOS
Common solutions:
1. Run `pod install` in ios directory
2. Clean build folder in Xcode
3. Update Xcode to latest version
4. Check CocoaPods installation

### Metro bundler won't start
Try:
```bash
npm start -- --reset-cache
# or
watchman watch-del-all
```

## Performance

### App is slow/laggy
Try:
- Close other apps
- Restart device
- Ensure good lighting (reduces camera processing)
- Update to latest version

### High battery usage
Normal for AR apps due to:
- Continuous camera use
- Processing overlays
- Screen always on

Tips:
- Use shorter sessions
- Reduce screen brightness
- Close when not needed

## Future Features

### Will there be automatic component recognition?
Planned features include:
- ML-based component detection
- OCR for reading component values
- Real-time schematic generation

### Will it support more languages?
Internationalization is planned for future releases.

### Can it integrate with datasheets?
Yes, planned features include:
- Automatic datasheet lookup
- Pin configuration from datasheets
- Characteristic curves

### Will there be cloud features?
Potential cloud features:
- Save repair sessions
- Share custom guides
- Community repair database
- Cross-device sync

## Support

### Where can I get help?
- GitHub Issues: Report bugs and request features
- Documentation: README.md, SETUP.md, EXAMPLES.md
- Community: Discussions on GitHub

### How do I report a bug?
1. Check existing issues first
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device/OS information

### How do I request a feature?
1. Check existing feature requests
2. Open new issue with "Feature Request" label
3. Describe:
   - Desired functionality
   - Use case
   - Benefits
   - Technical considerations if applicable

### Is there a roadmap?
Check GitHub Issues with "enhancement" label for planned features.

## Legal

### Is it safe to use?
The app itself is safe, but electronics work carries inherent risks:
- Electric shock
- Burns from soldering
- Component damage

**Always follow proper safety procedures.**

### Any warranties?
No warranties provided. See LICENSE file for details. Use at your own risk.

### Can I use it commercially?
Yes, under MIT License terms. Must include license notice.

### Privacy policy?
Current version:
- No data collection
- No internet connectivity
- No tracking
- All processing is local

If future versions add cloud features, a privacy policy will be added.

---

**Have a question not answered here?** Open an issue on GitHub!
