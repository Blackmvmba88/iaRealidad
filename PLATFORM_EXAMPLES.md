# Platform-Specific Development Examples

This guide shows how to use the platform utilities to create platform-specific features and behaviors.

## Basic Platform Detection

### Example 1: Import and Use Platform Utilities

```typescript
import {
  getPlatformInfo,
  isMobile,
  isDesktop,
  isAndroid,
  isIOS,
  isWindows,
  isMacOS,
  selectPlatform,
} from './src/utils/platformUtils';

// Get comprehensive platform info
const platformInfo = getPlatformInfo();
console.log(`Running on ${platformInfo.platformName}`);
console.log(`Is mobile: ${platformInfo.isMobile}`);
console.log(`Is desktop: ${platformInfo.isDesktop}`);

// Quick checks
if (isMobile()) {
  console.log('Running on mobile device');
}

if (isDesktop()) {
  console.log('Running on desktop platform');
}

// Specific platform checks
if (isAndroid()) {
  console.log('Running on Android');
} else if (isIOS()) {
  console.log('Running on iOS');
} else if (isWindows()) {
  console.log('Running on Windows');
} else if (isMacOS()) {
  console.log('Running on macOS');
}
```

## Platform-Specific Styling

### Example 2: Different Styles for Mobile vs Desktop

```typescript
import {StyleSheet} from 'react-native';
import {selectPlatform, isMobile} from './src/utils/platformUtils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: selectPlatform({
      mobile: 16,
      desktop: 32,
      default: 16,
    }),
  },
  button: {
    height: selectPlatform({
      android: 48,
      ios: 44,
      desktop: 40,
      default: 44,
    }),
    borderRadius: selectPlatform({
      ios: 10,
      android: 8,
      desktop: 6,
      default: 8,
    }),
  },
});
```

### Example 3: Platform-Specific Component Layout

```typescript
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {isDesktop, isMobile} from './src/utils/platformUtils';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      {isDesktop() ? (
        // Desktop layout - horizontal
        <View style={styles.desktopLayout}>
          <View style={styles.sidebar}>
            <Text>Sidebar Content</Text>
          </View>
          <View style={styles.main}>
            <Text>Main Content</Text>
          </View>
        </View>
      ) : (
        // Mobile layout - vertical
        <View style={styles.mobileLayout}>
          <View style={styles.header}>
            <Text>Header</Text>
          </View>
          <View style={styles.content}>
            <Text>Content</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  desktopLayout: {
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    padding: 20,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  mobileLayout: {
    flexDirection: 'column',
  },
  header: {
    height: 60,
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
```

## Feature Availability

### Example 4: Conditional Feature Rendering

```typescript
import React from 'react';
import {View, Text, Button} from 'react-native';
import {isCameraAvailable, getPlatformDisplayName} from './src/utils/platformUtils';

const FeatureScreen = () => {
  const cameraAvailable = isCameraAvailable();
  const platformName = getPlatformDisplayName();

  return (
    <View>
      <Text>Platform: {platformName}</Text>
      {cameraAvailable ? (
        <View>
          <Text>Camera features available</Text>
          <Button title="Start AR Mode" onPress={() => {/* ... */}} />
        </View>
      ) : (
        <View>
          <Text>Camera features not available on this platform</Text>
          <Text>Use diagnostic and case management features instead</Text>
        </View>
      )}
    </View>
  );
};
```

### Example 5: Platform-Specific Permissions

```typescript
import {getCameraPermissionMessage, isMobile} from './src/utils/platformUtils';

async function requestCameraPermission() {
  if (!isMobile()) {
    console.log('Camera permissions not needed on desktop');
    return true;
  }

  const message = getCameraPermissionMessage();
  console.log(message);

  // Request camera permission
  // ... permission request logic
}
```

## Platform-Specific Navigation

### Example 6: Different Navigation for Desktop

```typescript
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {isDesktop} from './src/utils/platformUtils';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: isDesktop(),
          gestureEnabled: !isDesktop(),
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AR" component={ARScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

## Platform-Specific Configuration

### Example 7: Different API Endpoints

```typescript
import {selectPlatform} from './src/utils/platformUtils';

const API_CONFIG = {
  baseUrl: selectPlatform({
    mobile: 'https://mobile-api.example.com',
    desktop: 'https://desktop-api.example.com',
    default: 'https://api.example.com',
  }),
  timeout: selectPlatform({
    mobile: 5000,
    desktop: 10000,
    default: 5000,
  }),
};
```

### Example 8: Platform-Specific Feature Flags

```typescript
import {getPlatformInfo} from './src/utils/platformUtils';

const FEATURES = {
  arEnabled: false,
  bluetoothSensors: false,
  audioAnalysis: false,
  diagnostics: true,
  caseManagement: true,
};

// Enable features based on platform
const platform = getPlatformInfo();

if (platform.isMobile) {
  FEATURES.arEnabled = true;
  FEATURES.bluetoothSensors = true;
  FEATURES.audioAnalysis = true;
}

export default FEATURES;
```

## Platform-Specific Components

### Example 9: Platform-Specific File Extensions

You can create platform-specific files using file extensions:

```
components/
├── Button.tsx              # Default implementation
├── Button.android.tsx      # Android-specific
├── Button.ios.tsx          # iOS-specific
├── Button.windows.tsx      # Windows-specific
└── Button.macos.tsx        # macOS-specific
```

React Native automatically picks the correct file based on the platform.

### Example 10: Conditional Imports

```typescript
import {Platform} from 'react-native';

// Load platform-specific modules
const CameraModule = Platform.select({
  ios: () => require('./camera/CameraIOS'),
  android: () => require('./camera/CameraAndroid'),
  default: () => require('./camera/CameraStub'),
})();
```

## Testing Platform-Specific Code

### Example 11: Mocking Platform in Tests

```typescript
import {Platform} from 'react-native';

describe('Platform-specific feature', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    // Restore original platform
    Object.defineProperty(Platform, 'OS', {
      value: originalPlatform,
      writable: true,
    });
  });

  it('should work on Android', () => {
    Object.defineProperty(Platform, 'OS', {
      value: 'android',
      writable: true,
    });

    // Test Android-specific behavior
  });

  it('should work on Windows', () => {
    Object.defineProperty(Platform, 'OS', {
      value: 'windows',
      writable: true,
    });

    // Test Windows-specific behavior
  });
});
```

## Best Practices

### 1. Progressive Enhancement

Start with a basic implementation that works everywhere, then enhance for specific platforms:

```typescript
import {selectPlatform} from './src/utils/platformUtils';

const handleButtonPress = () => {
  // Basic functionality that works on all platforms
  saveData();

  // Enhanced functionality for specific platforms
  selectPlatform({
    mobile: () => {
      triggerHapticFeedback();
    },
    desktop: () => {
      showNotification();
    },
    default: () => {},
  })();
};
```

### 2. Graceful Degradation

Always provide fallbacks for features not available on all platforms:

```typescript
import {isCameraAvailable} from './src/utils/platformUtils';

const startSession = () => {
  if (isCameraAvailable()) {
    startARSession();
  } else {
    startManualSession();
  }
};
```

### 3. Consistent UX

Keep the user experience consistent across platforms while respecting platform conventions:

```typescript
import {selectPlatform} from './src/utils/platformUtils';

const buttonText = selectPlatform({
  ios: 'Done',
  android: 'OK',
  desktop: 'Confirm',
  default: 'OK',
});
```

### 4. Performance Optimization

Only load platform-specific code when needed:

```typescript
import {isDesktop} from './src/utils/platformUtils';

// Only import heavy desktop-specific modules when on desktop
const HeavyDesktopModule = isDesktop() 
  ? require('./HeavyDesktopModule') 
  : null;
```

## Common Patterns

### Pattern 1: Feature Detection

```typescript
const hasFeature = (feature: string): boolean => {
  const platform = getPlatformInfo();
  
  const featureMap = {
    camera: platform.isMobile,
    bluetooth: platform.isMobile,
    diagnostics: true,
    keyboard: platform.isDesktop,
  };
  
  return featureMap[feature] ?? false;
};
```

### Pattern 2: Responsive Layout

```typescript
const useResponsiveLayout = () => {
  const platform = getPlatformInfo();
  
  return {
    columns: platform.isDesktop ? 3 : 1,
    spacing: platform.isDesktop ? 32 : 16,
    fontSize: platform.isDesktop ? 16 : 14,
  };
};
```

## Resources

- [Platform Utilities API Documentation](./src/utils/platformUtils.ts)
- [Platform Compatibility Guide](./PLATFORM_COMPATIBILITY.md)
- [React Native Platform Specific Code](https://reactnative.dev/docs/platform-specific-code)

---

**Last Updated**: January 2026  
**Version**: 1.0
