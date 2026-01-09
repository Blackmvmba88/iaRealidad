# iaRealidad - AR Electronics Repair Assistant

A cross-platform AR (Augmented Reality) assistant for electronics repair, measurement, and creation. This app uses the device camera to overlay real-time instructions on circuit boards, highlighting components, pins (GND/VCC), test points, and providing step-by-step guidance.

> 📍 **Current Status**: ERA I - 60% Complete | See [ROADMAP.md](./ROADMAP.md) for the complete development plan

## Features

### 🔍 Inspection Mode
- Identifies and highlights electronic components on circuit boards
- Shows pin labels (VCC, GND, DATA, GPIO, etc.)
- Displays component names and types
- Color-coded pin identification:
  - Red: VCC (Power)
  - Black: GND (Ground)
  - Blue: Data/Signal pins

### 📊 Measurement Mode
- Guides multimeter probe placement
- Shows expected voltage/resistance ranges
- Displays measurement instructions in real-time
- Highlights test points on the board
- Provides safety warnings and polarity checks

### 🔧 Repair Mode
- Step-by-step repair instructions
- Highlights components to inspect/replace
- Temperature and safety warnings
- Solder joint guidance
- Component replacement procedures

### ⚡ Creation Mode
- Guide for adding new modules:
  - Bluetooth modules (HC-05, etc.)
  - WiFi modules (ESP8266, ESP32)
  - GPS modules
  - Custom sensors
- Pin connection diagrams
- Voltage level warnings
- Testing procedures after installation

### ✓ Validation Mode
- Circuit functionality testing
- Voltage verification at multiple points
- Pass/fail indicators for each test
- Troubleshooting guidance for failures

## Technology Stack

- **Framework**: React Native 0.73.2
- **Language**: TypeScript
- **Camera/AR**: react-native-vision-camera
- **Graphics**: react-native-svg for overlays
- **Navigation**: React Navigation 6
- **Cross-platform**: iOS and Android

## Prerequisites

- Node.js >= 18
- npm or yarn
- For iOS development:
  - macOS
  - Xcode 14+
  - CocoaPods
- For Android development:
  - Android Studio
  - Android SDK (API level 21+)
  - Java Development Kit (JDK) 11+

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Blackmvmba88/iaRealidad.git
cd iaRealidad
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android
```bash
npm run android
# or
yarn android
```

### iOS
```bash
npm run ios
# or
yarn ios
```

### Start Metro Bundler
```bash
npm start
# or
yarn start
```

## Permissions

The app requires camera permissions to function:

- **Android**: Camera permission is requested at runtime
- **iOS**: Camera usage description is included in Info.plist

## Project Structure

```
iaRealidad/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AROverlay.tsx   # AR overlay rendering
│   │   └── ModeSelector.tsx # Mode selection component
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx  # Landing page with mode selection
│   │   └── ARCameraScreen.tsx # AR camera view
│   ├── services/            # Business logic and data
│   │   └── dataService.ts  # Sample data for different modes
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts        # Common types and interfaces
│   └── App.tsx              # Main app component
├── android/                 # Android native code
├── ios/                     # iOS native code
├── index.js                 # App entry point
└── package.json             # Dependencies and scripts
```

## Usage Guide

1. **Launch the app** - Select your desired mode from the home screen
2. **Grant camera permission** when prompted
3. **Point camera at circuit board** - The app will overlay AR information
4. **Switch modes** using the mode selector at the bottom of AR view
5. **Follow on-screen instructions** for measurements, repairs, or module installation

## Modes Explained

### Inspection Mode
Best for: Initial component identification and board exploration
- Automatically identifies visible components
- Shows component designators (U1, R1, C1, etc.)
- Highlights all pins with color coding

### Measurement Mode
Best for: Troubleshooting power issues
- Shows where to place multimeter probes
- Displays expected voltage/resistance values
- Includes safety warnings about polarity

### Repair Mode
Best for: Component replacement and fixing
- Step-by-step instructions
- Highlights faulty components
- Provides soldering temperature guidance
- Safety warnings for heat-sensitive components

### Creation Mode
Best for: Adding new functionality
- Guides for popular modules (Bluetooth, WiFi)
- Pin connection mapping
- Voltage level compatibility checks
- Testing procedures

### Validation Mode
Best for: Testing after repair/modification
- Multiple test points
- Pass/fail indicators
- Troubleshooting suggestions
- Complete circuit validation

## Development

### Adding New Components
Edit `src/services/dataService.ts` to add new component definitions, measurement points, or module guides.

### Customizing AR Overlays
Modify `src/components/AROverlay.tsx` to change how components are highlighted or add new visual elements.

### Adding New Modes
1. Add mode type to `src/types/index.ts`
2. Create rendering logic in `AROverlay.tsx`
3. Add mode button in `ModeSelector.tsx`
4. Update home screen with mode description

## Linting and Testing

```bash
# Run linter
npm run lint
# or
yarn lint

# Run tests
npm test
# or
yarn test
```

## Roadmap

This project follows a structured 4-era development plan:
- **ERA I** (Current - 60% complete): Instrumentación y Superposición (AR Base)
- **ERA II** (Planned): Comprensión y Validación (Percepción Técnica)
- **ERA III** (Planned): Inteligencia de Reparación y Creación (IA Técnica)
- **ERA IV** (Planned): Ecosistema y Memoria (Red & Comunidad)

See [ROADMAP.md](./ROADMAP.md) for the complete development plan, milestones, and vision.

## Future Enhancements

See [ROADMAP.md](./ROADMAP.md) for the complete list of planned features across all eras, including:
- Machine learning-based component recognition (ERA II)
- Real-time oscilloscope integration (ERA II)
- Cloud-based repair database (ERA IV)
- Multi-language support (ERA I)
- Save and share repair sessions (ERA IV)
- Integration with component datasheets (ERA IV)
- Advanced AR features (depth sensing, object recognition) (ERA II-III)
- Community-contributed repair guides (ERA IV)

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built with React Native and Vision Camera
- Icons and UI inspired by modern AR interfaces
- Component data structure based on electronics industry standards

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Note**: This is a prototype/demonstration app. For production use, integrate with actual AR recognition libraries and expand the component database.
