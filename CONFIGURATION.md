# Configuration Guide

This document explains how to use and extend the configuration system in iaRealidad.

## Table of Contents
- [Board Configurations](#board-configurations)
- [Firmware Generation](#firmware-generation)
- [Internationalization](#internationalization)
- [Storage and Persistence](#storage-and-persistence)

## Board Configurations

### Overview

Board configurations provide predefined settings for popular development boards, including:
- Component layouts
- Test points and measurement locations
- Expected voltage/resistance values
- Tolerance ranges
- Power requirements

### Available Boards

#### Arduino Uno R3
- **Voltage**: 5V
- **Input Range**: 7-12V
- **Max Current**: 500mA
- **Tolerances**: ±5% voltage, ±10% resistance

#### ESP32 DevKit V1
- **Voltage**: 3.3V
- **Input Range**: 3.3-5V
- **Max Current**: 500mA
- **Features**: WiFi + Bluetooth

#### ESP8266 NodeMCU V3
- **Voltage**: 3.3V
- **Input Range**: 3.3-5V
- **Max Current**: 300mA
- **Features**: WiFi

### Using Board Configurations

```typescript
import {getBoardConfiguration, getAllBoardConfigurations} from './config/boardConfigurations';

// Get a specific board configuration
const arduinoConfig = getBoardConfiguration('arduino_uno');
console.log(arduinoConfig?.name); // "Arduino Uno R3"

// Get all available boards
const allBoards = getAllBoardConfigurations();
console.log(`Available boards: ${allBoards.length}`);
```

### Tolerance Calculations

```typescript
import {calculateToleranceRange} from './config/boardConfigurations';

// Calculate ±5% tolerance for 5V
const range = calculateToleranceRange(5, 5);
console.log(range); // {min: 4.75, max: 5.25}
```

### Adding a New Board

To add a new board configuration, edit `src/config/boardConfigurations.ts`:

```typescript
export const myBoardConfig: BoardConfiguration = {
  id: 'my_board_v1',
  name: 'My Custom Board',
  type: 'generic',
  description: 'Custom board description',
  defaultTolerances: {
    voltage: 5,    // ±5%
    resistance: 10, // ±10%
    current: 10,   // ±10%
  },
  powerRequirements: {
    inputVoltage: {min: 7, max: 12},
    outputVoltage: 5,
    maxCurrent: 1000, // mA
  },
  components: [
    // Add your components here
  ],
  measurementPoints: [
    // Add your test points here
  ],
};
```

## Firmware Generation

### Overview

The firmware generator creates ready-to-use code for popular microcontroller modules:
- ESP32 (WiFi, Bluetooth, Combined)
- ESP8266 (WiFi)

### Usage

```typescript
import {firmwareGeneratorService} from './services/firmwareGeneratorService';

// Generate ESP32 WiFi firmware
const wifiFirmware = firmwareGeneratorService.generateESP32WiFiFirmware(
  'MyNetwork',    // SSID
  'MyPassword123' // Password
);

console.log(wifiFirmware.code);
console.log(wifiFirmware.instructions);

// Generate ESP32 Bluetooth firmware
const btFirmware = firmwareGeneratorService.generateESP32BluetoothFirmware('MyESP32');

// Generate combined WiFi + Bluetooth
const combinedFirmware = firmwareGeneratorService.generateESP32CombinedFirmware(
  'MyNetwork',
  'MyPassword',
  'MyESP32_Device'
);
```

### Firmware Structure

Each generated firmware includes:
- **id**: Unique identifier
- **moduleName**: Module description
- **moduleType**: WiFi, Bluetooth, etc.
- **platform**: esp32, esp8266, arduino
- **code**: Full Arduino/PlatformIO code
- **dependencies**: Required libraries
- **instructions**: Step-by-step upload guide

### Generated Code Features

All generated firmware includes:
- Serial debugging output
- LED control (built-in LED)
- Basic error handling
- Setup and loop functions
- Hardware-specific optimizations

### Example: ESP32 WiFi Features

- WiFi connection with retry logic
- Web server on port 80
- LED control via web interface
- Status endpoint (JSON)
- Connection monitoring
- RSSI signal strength reporting

## Internationalization

### Overview

iaRealidad supports multiple languages through a type-safe i18n system.

### Supported Languages
- **English** (en)
- **Spanish** (es)

### Using Translations in Components

```typescript
import {useTranslation} from './i18n';

function MyComponent() {
  const {t, locale, setLocale} = useTranslation();
  
  return (
    <View>
      <Text>{t('home.title')}</Text>
      <Text>{t('common.ok')}</Text>
      <Button 
        title="Switch to Spanish" 
        onPress={() => setLocale('es')}
      />
    </View>
  );
}
```

### Translation Structure

Translations are organized by sections:
- **common**: Buttons and common UI elements
- **home**: Home screen text
- **modes**: Mode descriptions
- **arCamera**: AR camera screen
- **measurements**: Measurement-related terms
- **components**: Component type names
- **pins**: Pin type descriptions
- **repair**: Repair step terminology
- **validation**: Testing and validation
- **settings**: Settings screen
- **errors**: Error messages

### Adding a New Language

1. Create a new file: `src/i18n/fr.ts` (for French)
2. Implement the Translation interface:

```typescript
import {Translation} from './types';

export const fr: Translation = {
  common: {
    ok: 'D\'accord',
    cancel: 'Annuler',
    // ... all other keys
  },
  // ... implement all sections
};
```

3. Update `src/i18n/index.ts`:

```typescript
import {fr} from './fr';

export type Locale = 'en' | 'es' | 'fr';

const translations: Record<Locale, Translation> = {
  en,
  es,
  fr,
};
```

### Translation Keys

Access nested keys using dot notation:
- `t('home.title')` → Home screen title
- `t('modes.inspection.description')` → Inspection mode description
- `t('errors.networkError')` → Network error message

## Storage and Persistence

### Overview

The app uses AsyncStorage for persistent local data storage.

### Stored Data

1. **Measurement Logs**
   - Timestamp
   - Component ID
   - Measured value
   - Expected value
   - Pass/fail status
   - Notes

2. **Validation Results**
   - Test ID and name
   - Timestamp
   - Overall pass/fail
   - Individual measurement results
   - Notes

3. **User Settings**
   - Language preference
   - Theme settings
   - Unit preferences

### Using Storage Service

```typescript
import {storageService} from './services/storageService';

// Initialize storage (done automatically on first use)
await storageService.initialize();

// Save a measurement log
await storageService.saveMeasurementLog({
  id: 'log_1',
  timestamp: new Date().toISOString(),
  mode: 'measurement',
  componentId: 'u1',
  measuredValue: 5.02,
  expectedValue: '5V',
  unit: 'V',
  passed: true,
});

// Get all logs
const logs = await storageService.getMeasurementLogs();

// Get logs by component
const componentLogs = await storageService.getMeasurementLogsByComponent('u1');

// Get statistics
const stats = await storageService.getValidationStatistics();
console.log(`Pass rate: ${stats.passRate}%`);

// Export all data
const jsonExport = await storageService.exportLogs();

// Import data
await storageService.importLogs(jsonExport);

// Clear all data
await storageService.clearAll();
```

### Storage Keys

The following AsyncStorage keys are used:
- `@iaRealidad:measurementLogs`
- `@iaRealidad:validationResults`
- `@iaRealidad:settings`

### Data Export/Import

Data can be exported as JSON and imported on another device or after reinstallation:

```typescript
// Export
const exportData = await storageService.exportLogs();
// Share via email, cloud storage, etc.

// Import
await storageService.importLogs(exportData);
```

### Testing with Storage

AsyncStorage is automatically mocked in tests. See `jest.setup.js` for the mock configuration.

## Best Practices

### Board Configurations
- Always provide realistic tolerance ranges
- Include comments for non-obvious measurement points
- Test configurations with actual hardware when possible

### Firmware Generation
- Keep generated code simple and well-commented
- Include safety warnings in instructions
- Provide default values that work out of the box

### Internationalization
- Keep translations concise for UI elements
- Maintain consistent terminology across languages
- Test UI layout with longer translations (German, Spanish)

### Storage
- Always handle storage errors gracefully
- Implement data migration strategies for format changes
- Regularly test export/import functionality

## Troubleshooting

### Board Configuration Issues
- **Problem**: Tolerance range too strict
- **Solution**: Use `calculateToleranceRange()` to compute appropriate ranges

### Firmware Generation
- **Problem**: Generated code doesn't compile
- **Solution**: Check Arduino IDE version and board support package versions

### i18n
- **Problem**: Missing translation key warning
- **Solution**: Ensure all translation files have the same structure

### Storage
- **Problem**: AsyncStorage not working in tests
- **Solution**: Verify jest.setup.js has the AsyncStorage mock

## Further Reading

- [React Native AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)
- [ESP32 Arduino Core](https://github.com/espressif/arduino-esp32)
- [ESP8266 Arduino Core](https://github.com/esp8266/Arduino)
- [React Native Localization Best Practices](https://github.com/stefalda/ReactNativeLocalization)
