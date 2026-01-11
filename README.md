# iaRealidad - AR Electronics Repair Assistant

[![Release](https://img.shields.io/badge/release-v0.0.1-blue.svg)](https://github.com/Blackmvmba88/iaRealidad/releases/tag/v0.0.1)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Windows%20%7C%20macOS-lightgrey.svg)](./PLATFORM_COMPATIBILITY.md)

A cross-platform AR (Augmented Reality) assistant for electronics repair, measurement, and creation. This app uses the device camera to overlay real-time instructions on circuit boards, highlighting components, pins (GND/VCC), test points, and providing step-by-step guidance with **intelligent diagnostic capabilities**.

> 📍 **Current Version**: [v0.0.1 "El Despertar"](./CHANGELOG.md) | **Status**: ERA I - 60% Complete | ERA II - 40% Complete | **ERA III - 50% Complete** 🔥 | See [ROADMAP.md](./ROADMAP.md) for the complete development plan

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

### 🎧 Sensing Mode (ERA II - NEW!) 🔥
**The app now "listens" to and understands the physical world!**

#### Passive Sensing (Entrada Pasiva)
- **Audio Analysis**: Detects electrical noise patterns (humming, buzzing, static)
- **Microphone**: Captures mechanical clicks from relays and switches
- **Temperature**: Monitors component heat in real-time
- **Visual Topology**: Recognizes circuit traces and connections

#### Active Hardware Integration (Entrada Activa)
- **Bluetooth Multimeters**: Real-time voltage, current, resistance readings
- **UART Debug**: Serial communication monitoring and logging
- **I2C Sensors**: External sensor integration
- **SPI Sensors**: High-speed data acquisition

#### Intelligence
- **Anomaly Detection**: Automatically detects out-of-range values
- **Pattern Recognition**: Identifies noise patterns and mechanical sounds
- **Session Tracking**: Records and analyzes measurement sessions
- **Smart Alerts**: Provides severity-based warnings

📚 **See [ERA_II_SENSING_GUIDE.md](./ERA_II_SENSING_GUIDE.md) for complete sensing capabilities documentation**

### 🧠 Diagnostic Mode (ERA III - NEW!) 🔥
**The app now UNDERSTANDS failures and recommends intelligent repairs!**

#### Failure Pattern Detection
- **Automatic Diagnosis**: Analyzes symptoms to identify failure patterns
- **5 Common Patterns**: Voltage regulator failure, firmware corruption, microcontroller dead, power supply failure, short circuit
- **Confidence Scoring**: Provides probability-based diagnostic confidence
- **Power Route Analysis**: Traces power failures from input to microcontroller

#### Intelligent Recommendations
- **Prioritized Repair Actions**: Ranked by likelihood of success
- **Tool Requirements**: Lists exact tools needed for each repair
- **Cost & Time Estimates**: Based on historical repair data
- **Step-by-Step Procedures**: Detailed repair instructions

#### Case-Based Learning
- **Repair Case Documentation**: Every repair tracked as a clinical case
- **Historical Pattern Matching**: Find similar cases from past repairs
- **Success Rate Tracking**: Learn from repair outcomes
- **Component Failure Statistics**: Identify common failure points
- **Root Cause Analysis**: Document why failures happen and how to prevent them

#### Knowledge Base
- **Pre-loaded Failure Knowledge**: ESP32, Arduino, and common board failures
- **Inference Rules**: Logical reasoning from symptoms to diagnosis
- **Probable Causes**: Ranked list of likely failure causes with test procedures
- **Learning from Experience**: System improves with every documented repair

📚 **See [ERA_III_DIAGNOSTIC_GUIDE.md](./ERA_III_DIAGNOSTIC_GUIDE.md) for complete diagnostic capabilities documentation**

## Technology Stack

- **Framework**: React Native 0.73.2
- **Language**: TypeScript
- **Camera/AR**: react-native-vision-camera
- **Graphics**: react-native-svg for overlays
- **Navigation**: React Navigation 6
- **Cross-platform**: Android, iOS, Windows, macOS, and Linux (planned)

## Prerequisites

- Node.js >= 18
- npm or yarn

### Platform-Specific Requirements

- **For Android development**:
  - Android Studio
  - Android SDK (API level 21+)
  - Java Development Kit (JDK) 11+
- **For iOS development**:
  - macOS
  - Xcode 14+
  - CocoaPods
- **For Windows development**:
  - Windows 10 version 1809+
  - Visual Studio 2019+ with C++ tools
  - React Native for Windows
- **For macOS development**:
  - macOS 10.14+
  - Xcode 14+
  - CocoaPods
  - React Native for macOS

📚 See [PLATFORM_COMPATIBILITY.md](./PLATFORM_COMPATIBILITY.md) for detailed platform requirements and setup instructions.

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

### Windows
```bash
npm run windows
# or
yarn windows
```

### macOS
```bash
npm run macos
# or
yarn macos
```

### Start Metro Bundler
```bash
npm start
# or
yarn start
```

> **Note**: Desktop platforms (Windows, macOS) are in development. AR features work best on mobile devices (Android, iOS). Desktop versions will have limited AR capabilities but full diagnostic and case management features.

📚 For detailed platform-specific instructions, see [PLATFORM_COMPATIBILITY.md](./PLATFORM_COMPATIBILITY.md)

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
│   │   ├── dataService.ts  # Sample data for different modes
│   │   ├── storageService.ts # AsyncStorage integration for persistence
│   │   └── firmwareGeneratorService.ts # Firmware code generation
│   ├── config/              # Configuration files
│   │   └── boardConfigurations.ts # Board-specific configs and test points
│   ├── i18n/                # Internationalization
│   │   ├── index.ts        # i18n service and hooks
│   │   ├── types.ts        # Translation type definitions
│   │   ├── en.ts           # English translations
│   │   └── es.ts           # Spanish translations
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts        # Common types and interfaces
│   └── App.tsx              # Main app component
├── __tests__/               # Unit tests
│   ├── boardConfigurations.test.ts
│   ├── firmwareGeneratorService.test.ts
│   ├── i18n.test.ts
│   ├── dataService.test.ts
│   └── storageService.test.ts
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

### Board Configurations

The app now supports multiple board types with predefined configurations. Board configurations define:
- Component layouts and test points
- Expected voltage/resistance values
- Tolerance ranges for measurements
- Power requirements

Available board configurations:
- Arduino Uno R3
- ESP32 DevKit V1
- ESP8266 NodeMCU V3

To add a new board configuration, edit `src/config/boardConfigurations.ts`.

### Firmware Generation

The app includes a firmware generator service that creates ready-to-use code for:
- **ESP32 WiFi**: Basic WiFi connection with web server
- **ESP32 Bluetooth**: Bluetooth Serial communication
- **ESP32 Combined**: WiFi + Bluetooth integration
- **ESP8266 WiFi**: Basic WiFi for ESP8266 modules

Access firmware generators via `src/services/firmwareGeneratorService.ts`.

### Internationalization (i18n)

The app supports multiple languages through a built-in i18n system:
- **Supported Languages**: English, Spanish
- **Usage**: Import `useTranslation` hook from `src/i18n`
- **Adding Translations**: Edit `src/i18n/en.ts` and `src/i18n/es.ts`

Example usage:
```typescript
import {useTranslation} from '../i18n';

const {t} = useTranslation();
const title = t('home.title'); // Returns translated text
```

### Data Persistence

The app uses AsyncStorage for persistent local data storage:
- Measurement logs
- Validation results
- User settings

All data is automatically saved and restored between sessions. See `src/services/storageService.ts`.

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
- **ERA I** (60% complete): Instrumentación y Superposición (AR Base)
- **ERA II** (40% complete): Comprensión y Validación (Percepción Técnica)
- **ERA III** (50% complete): Inteligencia de Reparación y Creación (IA Técnica) 🔥 **NEW!**
- **ERA IV** (Planned): Ecosistema y Memoria (Red & Comunidad)

See [ROADMAP.md](./ROADMAP.md) for the complete development plan, milestones, and vision.

## Future Enhancements

See [ROADMAP.md](./ROADMAP.md) for the complete list of planned features across all eras, including:
- Machine learning-based component recognition (ERA II)
- Real-time oscilloscope integration (ERA II)
- Cloud-based repair database (ERA IV)
- ✅ **Multi-language support** (ERA I - Completed: English, Spanish)
- Save and share repair sessions (ERA IV)
- Integration with component datasheets (ERA IV)
- Advanced AR features (depth sensing, object recognition) (ERA II-III)
- Community-contributed repair guides (ERA IV)

### Recently Added Features

#### Cross-Platform Desktop Support 🆕 **NEW!**
- **Multi-Platform**: Now supports Android, iOS, Windows, macOS, and Linux (planned)
- **Platform Utilities**: Smart platform detection and conditional feature rendering
- **Desktop Compatibility**: Full diagnostic and case management on desktop platforms
- **Responsive UI**: Adapts to mobile and desktop screen sizes
- **Platform-Specific Features**: AR on mobile, enhanced diagnostics on desktop
- 217 comprehensive tests (all passing)
- Complete documentation in PLATFORM_COMPATIBILITY.md and PLATFORM_EXAMPLES.md

#### ERA III: Diagnostic Intelligence System 🔥
- **Diagnostic Engine**: Automatic failure pattern detection with 5 pre-loaded patterns
- **Inference Rules**: Logic-based reasoning from symptoms to diagnosis
- **Power Route Analysis**: Traces power failures through the circuit
- **Repair Recommendations**: Prioritized actions with tools, steps, and confidence scores
- **Case Management**: Clinical-style repair case documentation
- **Historical Pattern Matching**: Find similar cases with similarity scoring
- **Learning System**: Tracks success rates, costs, and times for continuous improvement
- **Knowledge Base**: Pre-loaded with ESP32/Arduino common failures and repair procedures
- Complete documentation in ERA_III_DIAGNOSTIC_GUIDE.md

#### Board Configuration System
- Pre-configured settings for popular development boards
- Arduino Uno R3, ESP32 DevKit, ESP8266 NodeMCU
- Automatic tolerance calculations
- Board-specific measurement points

#### Firmware Generator
- Auto-generate firmware for ESP32 and ESP8266
- WiFi and Bluetooth templates
- Customizable with SSID, passwords, and device names
- Ready-to-upload code with instructions

#### Internationalization (i18n)
- Full Spanish and English support
- Easy language switching
- Type-safe translation keys
- Extensible for additional languages

#### Enhanced Data Persistence
- AsyncStorage integration for local data
- Automatic save/restore of measurements
- Settings persistence
- Export/import functionality

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
