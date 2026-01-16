# iaRealidad - AR Electronics Repair Assistant

[![Release](https://img.shields.io/badge/release-v0.0.1-blue.svg)](https://github.com/Blackmvmba88/iaRealidad/releases/tag/v0.0.1)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS%20%7C%20Windows%20%7C%20macOS-lightgrey.svg)](./PLATFORM_COMPATIBILITY.md)
[![ERA I](https://img.shields.io/badge/ERA%20I-60%25-yellow.svg)](./ROADMAP.md)
[![ERA II](https://img.shields.io/badge/ERA%20II-40%25-orange.svg)](./ERA_II_SENSING_GUIDE.md)
[![ERA III](https://img.shields.io/badge/ERA%20III-50%25-red.svg)](./ERA_III_DIAGNOSTIC_GUIDE.md)
[![ERA IV](https://img.shields.io/badge/ERA%20IV-25%25-blue.svg)](./ERA_IV_FEATURES_GUIDE.md)

A cross-platform AR (Augmented Reality) assistant for electronics repair, measurement, and creation. This app uses the device camera to overlay real-time instructions on circuit boards, highlighting components, pins (GND/VCC), test points, and providing step-by-step guidance with **intelligent diagnostic capabilities** and **community knowledge sharing**.

> 📍 **Current Version**: [v0.0.1 "El Despertar"](./CHANGELOG.md) | **Status**: ERA I - 60% | ERA II - 40% | ERA III - 50% | **ERA IV - 25%** 🔥 | See [ROADMAP.md](./ROADMAP.md) for the complete development plan

## 🎯 Why This Project?

iaRealidad sits at a **unique intersection of domains** that creates natural opportunities for diverse collaboration:

| Domain | What It Brings | Why It Matters |
|--------|----------------|----------------|
| 🟦 **Real Electronics** | Physical hardware knowledge, component behavior, circuit analysis | Bridges digital tools with real-world repair scenarios |
| 🟩 **Practical AR** | Visual overlay, real-time guidance, spatial understanding | Makes technical knowledge accessible through intuitive visualization |
| 🟨 **Diagnostics** | Failure pattern detection, troubleshooting logic, root cause analysis | Transforms experience into actionable intelligence |
| 🟧 **Firmware** | Code generation, protocol implementation, embedded systems | Enables creation and customization, not just repair |
| 🟥 **Knowledge Infrastructure** | Learning systems, case documentation, community memory | Ensures knowledge compounds over time and benefits everyone |

**The Result**: Few people can cover all these layers—which makes this project a natural magnet for spontaneous collaboration. Each contributor brings expertise from their domain, and together we build something no single person could create alone.

## 👥 Who Is This For?

<details>
<summary><b>🔧 Electronics Repair Technicians</b></summary>

- Quick component identification in the field
- Standardized diagnostic procedures
- Documentation of repair cases for learning
- Access to collective repair knowledge
</details>

<details>
<summary><b>🎓 Students & Educators</b></summary>

- Interactive learning tool for electronics courses
- Visual aids for understanding circuit topology
- Practice environment for measurement techniques
- Teaching resource for hands-on labs
</details>

<details>
<summary><b>🛠️ Makers & Hobbyists</b></summary>

- Guidance for adding modules to projects
- Validation of breadboard circuits
- Firmware generation for common tasks
- Community sharing of successful builds
</details>

<details>
<summary><b>💻 Developers</b></summary>

- **AR/Mobile Developers**: Push the boundaries of practical AR applications
- **ML Engineers**: Train models on real electronics datasets
- **Embedded Engineers**: Contribute firmware templates and protocols
- **Full-Stack Developers**: Build the community infrastructure (ERA IV)
</details>

<details>
<summary><b>🏭 Makerspaces & Tech Labs</b></summary>

- Training tool for new members
- Standardized procedures across the facility
- Documentation system for equipment
- Educational workshops and events
</details>

## 📋 Supported Hardware

iaRealidad currently supports the following development boards with pre-configured test points and diagnostics:

| Board | Status | Test Points | Diagnostic Patterns | Firmware Support |
|-------|--------|-------------|---------------------|------------------|
| **Arduino Uno R3** | ✅ Full Support | 12+ | Power, Firmware, Short Circuit | Templates Available |
| **ESP32 DevKit V1** | ✅ Full Support | 15+ | Power, WiFi, Bluetooth, Firmware | WiFi + BT Templates |
| **ESP8266 NodeMCU V3** | ✅ Full Support | 10+ | Power, WiFi, Firmware | WiFi Templates |
| **Generic MCU Boards** | 🔄 Partial | Manual Config | Basic Power Analysis | Custom Templates |

**📚 See [HARDWARE_COMPATIBILITY.md](./HARDWARE_COMPATIBILITY.md) for detailed board configurations and [CONFIGURATION.md](./CONFIGURATION.md) for adding new boards.**

### 🎯 Adding Your Board

Contributing a board configuration takes ~30 minutes and helps the entire community. You need:
1. Board schematic or pinout diagram
2. Test point locations (VCC, GND, key signals)
3. Expected voltage ranges
4. Common failure modes (optional but valuable)

See [CONTRIBUTING.md](./CONTRIBUTING.md#adding-new-board-configurations) for step-by-step instructions.

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

### 🌐 Community & Knowledge Sharing (ERA IV - NEW!) 🔥
**The app now enables offline community knowledge sharing!**

#### Case Export/Import
- **JSON Export**: Export repair cases for backup or sharing
- **Batch Operations**: Export/import multiple cases at once
- **Advanced Query**: Filter, sort, and search through repair history
- **Statistics**: Track success rates, costs, and repair times

#### Community SDK
- **Board Registry**: Add new board configurations via JSON/YAML
- **Pattern Registry**: Contribute failure patterns without code changes
- **Plugin System**: Extend iaRealidad with community contributions
- **Validation**: Automatic validation of configurations

#### Offline Sharing
- **Case Packages**: Bundle multiple cases for sharing
- **Multiple Formats**: JSON, Data URI, QR-friendly formats
- **Preview Mode**: Review packages before importing
- **No Cloud Required**: Share knowledge without internet

#### Knowledge Base Navigation
- **Query System**: Find cases by board, pattern, cost, date
- **Similar Cases**: Discover related repairs from history
- **Statistics Dashboard**: Comprehensive analytics on repairs
- **Tag Search**: Organize and find cases by custom tags

📚 **See [ERA_IV_FEATURES_GUIDE.md](./ERA_IV_FEATURES_GUIDE.md) for complete community features documentation**

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     iaRealidad Platform                      │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   📱 Mobile AR          🖥️ Desktop            ☁️ Future Cloud
   (iOS/Android)      (Win/macOS/Linux)        (ERA IV+)
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐         ┌─────┴─────┐
   │         │           │         │         │           │
  ERA I    ERA II      ERA III   ERA IV    Future      API
  AR Base  Sensing   Diagnostics  SDK     Cloud     Integration
                                          Sync
```

### Module Interaction

```
Camera Feed → Vision Processing → Component Detection
     ↓              ↓                     ↓
  Overlays    ←  Mode Logic    →    Diagnostic Engine
     ↓              ↓                     ↓
  Display    ←  Data Service   →    Knowledge Base
                    ↓                     ↓
              Case Management  ←→   Registry Service
                    ↓                     ↓
              Share Service    ←→   Community SDK
```

**📚 Full technical details in [ARCHITECTURE.md](./ARCHITECTURE.md)**

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

## 🚀 Quick Start Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  Step 1: Choose Your Path                                   │
└─────────────────────────────────────────────────────────────┘
           │
    ┌──────┴──────┬──────────────┬─────────────┐
    │             │              │             │
  📱 User      🔧 Hardware    💻 Developer  📚 Researcher
    │             │              │             │
    │             │              │             │
  Install      Add Board      Fork Repo    Read Docs
  & Run        Config         & Setup      & Analyze
    │             │              │             │
    ↓             ↓              ↓             ↓
┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│Run App  │  │Document  │  │Pick ERA  │  │Study     │
│Try Modes│→ │Failure   │→ │& Issue   │→ │Cases &   │
│Learn    │  │Patterns  │  │Contribute│  │Patterns  │
└─────────┘  └──────────┘  └──────────┘  └──────────┘
```

### For Users (5 minutes)
```bash
git clone https://github.com/Blackmvmba88/iaRealidad.git
cd iaRealidad
npm install
npm run android  # or ios
```
Then: Select mode → Point camera → Follow AR guidance

### For Contributors (10 minutes)
```bash
# 1. Fork & clone
git clone https://github.com/YOUR-USERNAME/iaRealidad.git
cd iaRealidad

# 2. Install & verify
npm install
npm test

# 3. Pick your area (see ROADMAP.md)
# - ERA I: AR/UI improvements
# - ERA II: ML/Sensing features  
# - ERA III: Diagnostics/AI
# - ERA IV: Community/Cloud

# 4. Create feature branch
git checkout -b feature/your-contribution
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution guidelines.

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

## 📊 Feature Matrix

| Feature | Mobile (iOS/Android) | Desktop (Win/macOS) | Status | ERA |
|---------|---------------------|---------------------|--------|-----|
| **Core AR Features** | | | | |
| Component Identification | ✅ Full | 🔄 Limited | Implemented | I |
| Real-time Overlays | ✅ Full | 🔄 Limited | Implemented | I |
| Pin Labeling (VCC/GND) | ✅ Full | 🔄 Limited | Implemented | I |
| Mode Switching | ✅ Full | ✅ Full | Implemented | I |
| **Sensing Capabilities** | | | | |
| Audio Analysis | ✅ Full | ✅ Full | Implemented | II |
| Temperature Monitoring | ✅ Full | ✅ Full | Implemented | II |
| Bluetooth Multimeter | ✅ Full | ✅ Full | Implemented | II |
| UART/I2C/SPI | ✅ Full | ✅ Full | Implemented | II |
| Anomaly Detection | ✅ Full | ✅ Full | Implemented | II |
| Visual ML Recognition | 📋 Planned | 📋 Planned | In Progress | II |
| **Diagnostic Intelligence** | | | | |
| Failure Pattern Detection | ✅ Full | ✅ Full | Implemented | III |
| Power Route Analysis | ✅ Full | ✅ Full | Implemented | III |
| Repair Recommendations | ✅ Full | ✅ Full | Implemented | III |
| Case Management | ✅ Full | ✅ Full | Implemented | III |
| Historical Matching | ✅ Full | ✅ Full | Implemented | III |
| Soldering Assistant | 📋 Planned | 📋 Planned | Roadmap | III |
| **Creation & Firmware** | | | | |
| Module Guides | ✅ Full | ✅ Full | Implemented | I |
| Firmware Generation | ✅ Full | ✅ Full | Implemented | I |
| Compatibility Checks | 📋 Planned | 📋 Planned | Roadmap | III |
| **Community Features** | | | | |
| Repair Database | 📋 Planned | 📋 Planned | Roadmap | IV |
| Knowledge Sharing | 📋 Planned | 📋 Planned | Roadmap | IV |
| Collaborative AR | 📋 Planned | ⛔ Not Planned | Roadmap | IV |

**Legend**: ✅ Full Support | 🔄 Partial/Limited | 📋 Planned | ⛔ Not Planned

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

### Community SDK

The app includes a plugin-based SDK for community contributions:

#### Adding Board Configurations
```typescript
import registryService from './services/registryService';

const boardConfig = `{
  "name": "My Board",
  "board": {"id": "my_board", ...},
  "testPoints": [...]
}`;

registryService.addBoardConfig(boardConfig, 'user', 'YourName');
```

See `examples/boards/` for complete examples.

#### Adding Failure Patterns
```typescript
const failurePattern = `{
  "name": "My Pattern",
  "pattern": {"id": "my_pattern", ...},
  "symptoms": [...],
  "diagnosticSteps": [...]
}`;

registryService.addFailurePattern(failurePattern, 'community');
```

See `examples/failure-patterns/` for complete examples.

### Case Management & Sharing

#### Query and Export Cases
```typescript
import caseManagementService from './services/caseManagementService';

// Query cases
const cases = caseManagementService.queryCases({
  boardType: 'ESP32',
  repairSuccess: true,
  sortBy: 'date'
});

// Export cases
const exported = caseManagementService.exportAllCases();
```

#### Share Cases
```typescript
import shareCaseService from './services/shareCaseService';

// Create shareable link
const link = shareCaseService.generateShareLink(caseId);

// Share multiple cases
const pkg = shareCaseService.shareCases(
  ['case1', 'case2'],
  'Author',
  'Description'
);
```

See [ERA_IV_FEATURES_GUIDE.md](./ERA_IV_FEATURES_GUIDE.md) for complete documentation.

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

We welcome contributions from all domains! The project's unique multi-domain nature means there's a place for everyone.

### 🎯 Contribution Pathways

<details>
<summary><b>🎨 UI/UX Designers</b></summary>

- Improve AR overlay clarity and aesthetics
- Design mode-switching interfaces
- Create icons and visual elements
- Enhance accessibility features
- Mobile vs desktop UX optimization

**Entry Point**: Check issues labeled `ui`, `ux`, or `design`
</details>

<details>
<summary><b>📱 Mobile/AR Developers</b></summary>

- Enhance AR tracking and stability
- Optimize camera performance
- Implement advanced vision features
- Platform-specific optimizations
- React Native expertise

**Entry Point**: ERA I (AR Base) and ERA II (Vision ML) - see [ROADMAP.md](./ROADMAP.md)
</details>

<details>
<summary><b>🤖 ML/AI Engineers</b></summary>

- Component recognition models
- OCR for board text
- Anomaly detection algorithms
- Pattern matching optimization
- Diagnostic intelligence

**Entry Point**: ERA II (Sensing) and ERA III (Diagnostics) - see [ERA_II_SENSING_GUIDE.md](./ERA_II_SENSING_GUIDE.md)
</details>

<details>
<summary><b>⚡ Electronics Engineers</b></summary>

- Add board configurations
- Contribute diagnostic patterns
- Document failure modes
- Create measurement procedures
- Validate technical accuracy

**Entry Point**: [HARDWARE_COMPATIBILITY.md](./HARDWARE_COMPATIBILITY.md) and [CONFIGURATION.md](./CONFIGURATION.md)
</details>

<details>
<summary><b>💻 Embedded/Firmware Developers</b></summary>

- Create firmware templates
- Add protocol implementations
- Contribute bootloader patterns
- Document communication interfaces
- ESP32/Arduino expertise

**Entry Point**: `src/services/firmwareGeneratorService.ts` and [NEW_FEATURES_GUIDE.md](./NEW_FEATURES_GUIDE.md)
</details>

<details>
<summary><b>🏗️ Backend/Infrastructure</b></summary>

- Design cloud architecture (ERA IV)
- Build API infrastructure
- Implement data storage
- Create sync mechanisms
- Community platform

**Entry Point**: ERA IV planning - see [ROADMAP.md](./ROADMAP.md#era-iv--ecosistema-y-memoria-red--comunidad)
</details>

<details>
<summary><b>📚 Technical Writers</b></summary>

- Improve documentation
- Create tutorials and guides
- Translate content
- Write case studies
- API documentation

**Entry Point**: Any `.md` file - check issues labeled `documentation`
</details>

<details>
<summary><b>🧪 QA/Testing</b></summary>

- Write test cases
- Perform device testing
- Validate board configurations
- Test diagnostic accuracy
- Cross-platform verification

**Entry Point**: `__tests__/` directory and [VERIFICATION.md](./VERIFICATION.md)
</details>

### 🚀 Getting Started as a Contributor

1. **Explore the codebase**: Start with [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
2. **Pick your ERA**: Check [ROADMAP.md](./ROADMAP.md) to see what's being worked on
3. **Find an issue**: Look for `good-first-issue` or `help-wanted` labels
4. **Read the guides**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
5. **Join the discussion**: Open an issue to discuss your ideas before major changes

### 📖 Essential Reading for Contributors

| Document | Purpose | When to Read |
|----------|---------|--------------|
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contribution guidelines | Before your first PR |
| [ROADMAP.md](./ROADMAP.md) | Project vision & phases | To understand long-term goals |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical design | Before code changes |
| [EXAMPLES.md](./EXAMPLES.md) | Usage examples | To understand user workflows |
| [ERA_II_SENSING_GUIDE.md](./ERA_II_SENSING_GUIDE.md) | Sensing system | For sensor/ML work |
| [ERA_III_DIAGNOSTIC_GUIDE.md](./ERA_III_DIAGNOSTIC_GUIDE.md) | Diagnostic engine | For AI/diagnostic work |

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 🌍 Community & Support

### Getting Help

- **📖 Documentation**: Start with [QUICKSTART.md](./QUICKSTART.md) and [FAQ.md](./FAQ.md)
- **🐛 Bug Reports**: Open an issue with the `bug` label
- **💡 Feature Requests**: Open an issue with the `enhancement` label
- **❓ Questions**: Open an issue with the `question` label

### Project Communication

- **Issues**: Primary channel for bugs, features, and discussions
- **Pull Requests**: Code contributions and technical discussions
- **Discussions**: Coming soon in ERA IV (community platform)

### Stay Updated

- **⭐ Star this repo** to follow development
- **👁️ Watch releases** for new versions
- **📋 Check [ROADMAP.md](./ROADMAP.md)** for upcoming features
- **📝 Read [CHANGELOG.md](./CHANGELOG.md)** for release notes

### Recognition

Contributors are recognized in:
- GitHub contributors list
- Release notes for their contributions
- Special mentions for major features

We value all contributions, whether code, documentation, testing, or community support!

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
