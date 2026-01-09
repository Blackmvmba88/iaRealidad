# Architecture Documentation

## Overview

iaRealidad is a cross-platform mobile AR application built with React Native, designed to assist with electronics repair, measurement, and creation tasks. The app uses the device camera to overlay real-time instructions and component identification on circuit boards.

## Technology Stack

### Core Framework
- **React Native 0.73.2**: Cross-platform mobile framework
- **TypeScript 5.0.4**: Type-safe JavaScript with enhanced developer experience
- **React 18.2.0**: UI library with hooks and functional components

### Key Libraries
- **react-native-vision-camera 3.6.0**: High-performance camera library with AR capabilities
- **react-native-svg 14.1.0**: SVG rendering for AR overlays
- **React Navigation 6.x**: Navigation and routing
- **React Native Gesture Handler**: Touch gesture handling
- **React Native Reanimated**: Smooth animations

### Build Tools
- **Metro**: React Native bundler
- **Babel**: JavaScript transpiler
- **TypeScript Compiler**: Type checking
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Application Architecture

### Layer Structure

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Screens & UI Components)          │
├─────────────────────────────────────┤
│       Business Logic Layer          │
│  (Services & State Management)      │
├─────────────────────────────────────┤
│         Data Layer                  │
│  (Types, Models, Sample Data)       │
├─────────────────────────────────────┤
│       Native Platform Layer         │
│  (iOS & Android Native Modules)     │
└─────────────────────────────────────┘
```

## Component Architecture

### Screens

#### HomeScreen
- **Purpose**: Landing page for mode selection
- **Responsibilities**:
  - Display available modes
  - Handle mode selection
  - Navigate to AR camera view
  - Show feature overview
- **State**: Selected repair mode
- **Navigation**: Pushes to ARCameraScreen

#### ARCameraScreen
- **Purpose**: Main AR view with camera and overlays
- **Responsibilities**:
  - Request and manage camera permissions
  - Render camera preview
  - Manage AR overlays
  - Handle mode switching
  - Navigate back to home
- **State**: 
  - Current mode
  - Camera active status
  - Permission status
- **Components Used**:
  - Camera (from react-native-vision-camera)
  - AROverlay
  - ModeSelector

### Components

#### AROverlay
- **Purpose**: Render AR content over camera view
- **Responsibilities**:
  - Display mode-specific overlays
  - Highlight components and pins
  - Show measurement guides
  - Render repair instructions
  - Display validation results
- **Props**: Current repair mode
- **Rendering Strategy**: Switch-based rendering for different modes
- **Graphics**: Uses react-native-svg for vector overlays

#### ModeSelector
- **Purpose**: Mode switching interface
- **Responsibilities**:
  - Display available modes
  - Handle mode selection
  - Visual feedback for active mode
- **Props**: 
  - currentMode: Active repair mode
  - onModeChange: Callback for mode changes
- **UI Pattern**: Horizontal scrollable button list

## Data Flow

### Navigation Flow
```
HomeScreen → (mode selected) → ARCameraScreen
              ↑                       ↓
              └───── (back button) ───┘
```

### Mode Selection Flow
```
User selects mode on HomeScreen
     ↓
Mode stored in component state
     ↓
Navigate to ARCameraScreen
     ↓
AROverlay renders mode-specific content
     ↓
User can switch modes via ModeSelector
     ↓
AROverlay re-renders with new content
```

### Data Service Flow
```
Component needs data
     ↓
Call getSampleDataForMode(mode)
     ↓
Service returns relevant data
     ↓
Component renders data
```

## Type System

### Core Types

```typescript
// Mode definition
type RepairMode = 'inspection' | 'measurement' | 'repair' | 'creation' | 'validation';

// Component on circuit board
interface Component {
  id: string;
  name: string;
  type: ComponentType;
  position: {x: number; y: number};
  pins?: Pin[];
}

// Pin on a component
interface Pin {
  id: string;
  name: string;
  type: PinType;
  position: {x: number; y: number};
  voltage?: number;
}

// Measurement instruction
interface MeasurementPoint {
  id: string;
  componentId: string;
  expectedValue: string;
  expectedRange: {min: number; max: number};
  unit: MeasurementUnit;
}

// Repair instruction
interface RepairStep {
  id: string;
  order: number;
  title: string;
  description: string;
  type: StepType;
  warning?: string;
}

// Module installation guide
interface ModuleGuide {
  id: string;
  moduleName: string;
  moduleType: ModuleType;
  pinConnections: PinConnection[];
  connectionSteps: RepairStep[];
  testingSteps: RepairStep[];
}
```

## State Management

### Current Approach
- **Local Component State**: Using React hooks (useState, useEffect)
- **Props**: Data passed from parent to child components
- **No Global State**: Simple app doesn't require Redux/MobX

### State Location
- **HomeScreen**: Selected mode (for UI only)
- **ARCameraScreen**: Active mode, camera state, permissions
- **AROverlay**: No internal state (pure rendering)
- **ModeSelector**: No internal state (controlled component)

### Future Considerations
If app grows, consider:
- Context API for global app state
- Redux for complex state management
- Async storage for persisting user preferences

## Platform-Specific Considerations

### iOS
- **Camera Permissions**: NSCameraUsageDescription in Info.plist
- **Build System**: CocoaPods for dependency management
- **Minimum Version**: iOS 13.4+
- **Considerations**: 
  - Requires physical device for camera
  - Simulator has limited camera support

### Android
- **Camera Permissions**: Requested at runtime
- **Build System**: Gradle
- **Minimum SDK**: API 21 (Android 5.0)
- **Considerations**:
  - Camera2 API support required
  - Hardware camera feature check

## Performance Considerations

### Camera Performance
- Use hardware acceleration when available
- Optimize frame processing
- Minimize AR overlay complexity
- Consider frame rate limiting for battery life

### Rendering Performance
- Use React.memo for expensive components
- Optimize SVG rendering (minimize paths)
- Avoid unnecessary re-renders
- Use native driver for animations

### Memory Management
- Clean up camera resources on unmount
- Release AR processing resources
- Avoid memory leaks in useEffect

## Security Considerations

### Permissions
- Request only necessary permissions
- Explain permission usage to users
- Handle permission denial gracefully

### Data Privacy
- No user data collected currently
- Camera feed not stored or transmitted
- Consider adding privacy policy if features expand

## Testing Strategy

### Unit Tests
- Test data services
- Test utility functions
- Test type guards and validators

### Component Tests
- Test component rendering
- Test user interactions
- Test navigation flows
- Mock camera and permissions

### Integration Tests
- Test complete user flows
- Test mode switching
- Test navigation

### Manual Testing
- Test on real devices
- Test all modes
- Test permission flows
- Test on different screen sizes

## Future Architecture Considerations

### Scalability
- Add state management library if complexity grows
- Consider modularizing into separate packages
- Implement lazy loading for heavy components

### Features to Architect
- **ML Integration**: Component recognition model
- **Cloud Sync**: User data and custom guides
- **Offline Mode**: Cached data and guides
- **Analytics**: Usage tracking and crash reporting

### Potential Improvements
- WebAssembly for performance-critical operations
- Native modules for advanced AR features
- Backend API for dynamic content
- Database for local storage (SQLite/Realm)

## Development Workflow

### Adding Features
1. Define types in `src/types/`
2. Add business logic in `src/services/`
3. Create/modify components in `src/components/`
4. Update screens in `src/screens/`
5. Add tests in `__tests__/`
6. Update documentation

### Code Organization Principles
- **Separation of Concerns**: UI, logic, and data separated
- **Single Responsibility**: Each component has one job
- **Type Safety**: All components and functions typed
- **Reusability**: Components designed to be reusable
- **Testability**: Code structured for easy testing

## Build and Deployment

### Development Build
```bash
npm run android  # Android development
npm run ios      # iOS development
```

### Production Build
```bash
# Android
cd android && ./gradlew assembleRelease

# iOS
# Use Xcode Archive feature
```

### CI/CD Considerations
- Automated testing on PR
- Build verification
- Code quality checks
- Platform-specific builds

## Maintenance

### Dependency Updates
- Regular security updates
- React Native version updates
- Third-party library updates
- Test after each update

### Code Quality
- ESLint for code standards
- Prettier for formatting
- TypeScript for type safety
- Code reviews for all changes

---

This architecture supports the current features and is designed to scale as the application grows. The modular structure allows easy addition of new modes, components, and features.
