# ERA II: Sensing Capabilities Guide

## 🎯 Overview

ERA II introduces comprehensive **sensing capabilities** to iaRealidad, transforming the app from a passive overlay system into an active, intelligent assistant that can "listen" to and understand the physical electronics world.

> **"La cámara ya no solo muestra — ahora también escucha, siente y comprende."**

This guide covers all ERA II features, including passive and active sensing, hardware integration, and anomaly detection.

---

## 📊 Sensing Architecture

### Two Routes of Sensing

#### 1. **Entrada Pasiva (Passive Input)**
- **Audio Analysis**: Detects electrical noise patterns (humming, buzzing, static)
- **Microphone**: Captures mechanical clicks (relays, switches)
- **Temperature**: Monitors component heat (preparation for thermography)
- **Visual Topology**: Recognizes circuit traces and component relationships

#### 2. **Entrada Activa (Active Hardware Input)**
- **Bluetooth Multimeters**: Real-time voltage, current, resistance readings
- **UART Debug**: Serial communication monitoring and logging
- **I2C Sensors**: External sensor integration
- **SPI Sensors**: High-speed data acquisition

---

## 🔧 Available Sensors

### Audio Sensor
Analyzes electrical noise to detect problems:

```typescript
import {sensingService} from './services/sensingService';

// Initialize audio sensor
const audioSensor = sensingService.initializeSensor('audio');

// Start monitoring
await sensingService.startSensor(audioSensor.id);

// Analyze audio data
const audioData = [...]; // Your audio samples
const analysis = sensingService.analyzeAudioNoise(audioData);

console.log(`Frequency: ${analysis.frequency} Hz`);
console.log(`Pattern: ${analysis.pattern}`); // humming, buzzing, clicking, static, clean
console.log(`Quality: ${analysis.quality}%`);
```

**Detectable Patterns:**
- **Humming** (100-200 Hz): Likely 50/60 Hz mains hum
- **Buzzing** (>1000 Hz): High-frequency noise
- **Clicking**: Intermittent noise spikes
- **Static**: High amplitude random noise
- **Clean**: Minimal noise detected

### Microphone Sensor
Detects mechanical sounds:

```typescript
const micSensor = sensingService.initializeSensor('microphone');
await sensingService.startSensor(micSensor.id);

// Check for clicks
if (micSensor.clickDetected) {
  console.log(`Click pattern: ${micSensor.clickPattern}`);
  console.log(`Clicks detected: ${micSensor.clickCount}`);
}
```

**Detectable Patterns:**
- **Relay**: Characteristic relay click sound
- **Switch**: Mechanical switch activation
- **Mechanical**: Generic mechanical movement
- **Unknown**: Unclassified click sound

### Temperature Sensor
Monitors component temperature:

```typescript
const tempSensor = sensingService.initializeSensor('temperature');
await sensingService.startSensor(tempSensor.id);

// Record temperature measurement
const measurement = sensingService.recordMeasurement(
  tempSensor.id,
  75.5, // Temperature in Celsius
  'regulator_001' // Component ID
);

// Check for overheating
if (tempSensor.currentTemp > tempSensor.threshold.warning) {
  console.log('Warning: Component overheating!');
}
```

**Features:**
- Real-time temperature monitoring
- Warning and critical thresholds
- Trend analysis (rising, falling, stable)
- Component-specific tracking

### Bluetooth Multimeter
Integrate Bluetooth-enabled multimeters:

```typescript
const multimeter = sensingService.initializeSensor('bluetooth_multimeter');

// Configure measurement type
multimeter.measurementType = 'voltage';
multimeter.autoRange = true;

await sensingService.startSensor(multimeter.id);

// Record measurement
const reading = sensingService.recordMeasurement(
  multimeter.id,
  5.02, // Measured value
  'u1', // Component ID
  'u1_p1' // Pin ID
);

console.log(`Measured: ${reading.value} ${reading.unit}`);
```

**Supported Measurements:**
- Voltage (V)
- Current (A)
- Resistance (Ω)
- Continuity

**Features:**
- Auto-ranging
- Real-time streaming
- Multiple device support
- Calibration

### UART Debug Interface
Monitor serial communication:

```typescript
const uart = sensingService.initializeSensor('uart_debug');

// Configure UART
uart.baudRate = 115200;
uart.dataBits = 8;
uart.stopBits = 1;
uart.parity = 'none';

await sensingService.startSensor(uart.id);

// Access serial buffer
console.log('Recent messages:', uart.buffer);
console.log('Total logs:', uart.logCount);
```

**Use Cases:**
- Debug embedded firmware
- Monitor communication protocols
- Log system messages
- Analyze serial data

### I2C Sensor
Interface with I2C devices:

```typescript
const i2c = sensingService.initializeSensor('i2c_sensor');
await sensingService.startSensor(i2c.id);

// Scan for I2C devices
const discovery = await sensingService.discoverSensors();
console.log('I2C devices found:', discovery.availableSensors.i2c);

// Read from specific address
i2c.address = '0x48';
console.log('Device type:', i2c.deviceType);
```

**Features:**
- Device scanning
- Register reading/writing
- Multi-device support
- Address conflict detection

### SPI Sensor
High-speed SPI communication:

```typescript
const spi = sensingService.initializeSensor('spi_sensor');

// Configure SPI
spi.clockSpeed = 1000000; // 1 MHz
spi.mode = 0;
spi.bitOrder = 'MSB';

await sensingService.startSensor(spi.id);

// Access data buffer
console.log('Data received:', spi.dataBuffer);
```

**Features:**
- Multiple SPI modes (0-3)
- Configurable clock speed
- Bit order control (MSB/LSB)
- Full-duplex communication

### Visual Topology Sensor
Analyze circuit board layout:

```typescript
const visual = sensingService.initializeSensor('visual_topology');
await sensingService.startSensor(visual.id);

// Get detected components
console.log('Components:', visual.detectedComponents);
console.log('Traces:', visual.tracesDetected);
console.log('Confidence:', visual.confidenceLevel);
```

**Features:**
- Component detection
- Trace mapping
- Topology analysis
- Connection identification

---

## 📈 Sensing Sessions

### Starting a Session

```typescript
// Start a new sensing session
const session = sensingService.startSession('sensing', 'arduino_uno_001');

console.log('Session ID:', session.id);
console.log('Active sensors:', session.activeSensors.length);
```

### Recording Measurements

```typescript
// Record various measurements
sensingService.recordMeasurement(tempSensor.id, 45.2, 'regulator_001');
sensingService.recordMeasurement(multimeter.id, 5.01, 'u1', 'u1_p1');
sensingService.recordMeasurement(audioSensor.id, 120);

// Get all measurements
const measurements = sensingService.getMeasurements();
console.log(`Recorded ${measurements.length} measurements`);
```

### Stopping a Session

```typescript
// Stop session and get summary
const completedSession = sensingService.stopSession();

console.log(`Duration: ${completedSession.duration} seconds`);
console.log(`Measurements: ${completedSession.measurements.length}`);
```

---

## 🚨 Anomaly Detection

### Detecting Anomalies

```typescript
// Define expected range
const expectedRange = {min: 4.75, max: 5.25}; // Expected 5V ±5%

// Get measurements
const measurements = sensingService.getMeasurementsBySensor(multimeter.id);

// Detect anomalies
const anomalies = sensingService.detectAnomalies(measurements, expectedRange);

anomalies.forEach(anomaly => {
  console.log(`⚠️ Anomaly detected: ${anomaly.description}`);
  console.log(`   Severity: ${anomaly.severity}`);
  console.log(`   Confidence: ${anomaly.confidence}%`);
  console.log(`   Suggested actions:`);
  anomaly.suggestedActions.forEach(action => {
    console.log(`   - ${action}`);
  });
});
```

### Severity Levels

- **Low**: 10-25% deviation from expected range
- **Medium**: 25-50% deviation
- **High**: 50-100% deviation
- **Critical**: >100% deviation

### Anomaly Types

- **out_of_range**: Value outside expected range
- **noise**: Excessive noise detected
- **unstable**: Fluctuating measurements
- **unexpected_pattern**: Unusual signal pattern

---

## 🔍 Sensor Discovery

### Discovering Available Sensors

```typescript
const discovery = await sensingService.discoverSensors();

console.log('Bluetooth devices:');
discovery.availableSensors.bluetooth.forEach(device => {
  console.log(`  - ${device.name} (${device.type})`);
  console.log(`    RSSI: ${device.rssi} dBm`);
  console.log(`    Paired: ${device.paired}`);
});

console.log('UART ports:');
discovery.availableSensors.uart.forEach(port => {
  console.log(`  - ${port.port} (${port.manufacturer})`);
});

console.log('I2C devices:');
discovery.availableSensors.i2c.forEach(device => {
  console.log(`  - Address: ${device.address} (${device.type})`);
});
```

---

## 💡 Usage Examples

### Example 1: Power Supply Diagnosis

```typescript
// Initialize sensors
const multimeter = sensingService.initializeSensor('bluetooth_multimeter');
const audio = sensingService.initializeSensor('audio');
const temp = sensingService.initializeSensor('temperature');

// Start session
const session = sensingService.startSession('repair', 'power_supply_001');

// Start all sensors
await Promise.all([
  sensingService.startSensor(multimeter.id),
  sensingService.startSensor(audio.id),
  sensingService.startSensor(temp.id),
]);

// Take measurements
sensingService.recordMeasurement(multimeter.id, 4.89, 'reg1', 'reg1_p3');
sensingService.recordMeasurement(temp.id, 82, 'reg1');

// Analyze audio for noise
const audioData = [...]; // Get audio samples
const analysis = sensingService.analyzeAudioNoise(audioData);

if (analysis.pattern === 'humming') {
  console.log('⚠️ Mains hum detected - check ground connection');
}

// Check for anomalies
const measurements = sensingService.getMeasurements();
const anomalies = sensingService.detectAnomalies(measurements, {min: 4.75, max: 5.25});

if (anomalies.length > 0) {
  console.log('🚨 Issues detected:');
  anomalies.forEach(a => console.log(`   - ${a.description}`));
}

// Stop session
const summary = sensingService.stopSession();
console.log(`✅ Diagnosis complete. Duration: ${summary.duration}s`);
```

### Example 2: I2C Device Testing

```typescript
// Initialize I2C sensor
const i2c = sensingService.initializeSensor('i2c_sensor');
await sensingService.startSensor(i2c.id);

// Discover I2C devices
const discovery = await sensingService.discoverSensors();
console.log('Found I2C devices:', discovery.availableSensors.i2c);

// Test specific device
i2c.address = '0x48';
i2c.deviceType = 'Temperature Sensor';

// Record readings
for (let i = 0; i < 10; i++) {
  const value = sensingService.simulateSensorReading('i2c_sensor');
  sensingService.recordMeasurement(i2c.id, value);
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Analyze measurements
const measurements = sensingService.getMeasurementsBySensor(i2c.id);
console.log(`Collected ${measurements.length} I2C readings`);
```

### Example 3: Continuous Monitoring

```typescript
// Setup multiple sensors
const sensors = [
  sensingService.initializeSensor('temperature'),
  sensingService.initializeSensor('bluetooth_multimeter'),
  sensingService.initializeSensor('audio'),
];

// Start all
await Promise.all(sensors.map(s => sensingService.startSensor(s.id)));

// Start monitoring session
sensingService.startSession('validation', 'esp32_001');

// Continuous monitoring loop
setInterval(() => {
  sensors.forEach(sensor => {
    const value = sensingService.simulateSensorReading(sensor.type);
    sensingService.recordMeasurement(sensor.id, value);
  });

  // Check for anomalies every iteration
  const measurements = sensingService.getMeasurements();
  const anomalies = sensingService.detectAnomalies(measurements, {min: 20, max: 30});
  
  if (anomalies.length > 0) {
    console.log('🚨 Alert:', anomalies[0].description);
  }
}, 1000);
```

---

## 🎓 Best Practices

### 1. Always Initialize Before Use
```typescript
// ✅ Good
const sensor = sensingService.initializeSensor('temperature');
await sensingService.startSensor(sensor.id);

// ❌ Bad
await sensingService.startSensor('invalid_id'); // Will fail
```

### 2. Use Sessions for Organized Data
```typescript
// ✅ Good - Use sessions
sensingService.startSession('repair', 'board_001');
// ... perform measurements ...
const summary = sensingService.stopSession();

// ❌ Bad - No session tracking
// Just recording measurements without context
```

### 3. Handle Sensor Errors
```typescript
// ✅ Good - Error handling
try {
  const started = await sensingService.startSensor(sensor.id);
  if (!started) {
    console.error('Failed to start sensor');
  }
} catch (error) {
  console.error('Sensor error:', error);
}
```

### 4. Clean Up After Use
```typescript
// ✅ Good - Clean up
sensingService.stopSession();
sensors.forEach(s => sensingService.stopSensor(s.id));
sensingService.clearAll();

// ❌ Bad - Leave sensors running
// (wastes resources and battery)
```

### 5. Use Anomaly Detection
```typescript
// ✅ Good - Check for anomalies
const anomalies = sensingService.detectAnomalies(measurements, expectedRange);
if (anomalies.length > 0) {
  // Handle anomalies
}

// ❌ Bad - Ignore anomalies
// Just collect data without validation
```

---

## 🔮 Future Enhancements (ERA III)

The sensing system in ERA II provides the foundation for ERA III features:

- **Machine Learning Integration**: Train models on sensor data
- **Predictive Maintenance**: Predict component failures before they happen
- **Intelligent Recommendations**: AI-powered repair suggestions
- **Pattern Libraries**: Build databases of known failure patterns
- **Remote Expert Mode**: Share sensor data with remote technicians

---

## 📚 API Reference

### SensingService Methods

#### Sensor Management
- `initializeSensor(type, config?)`: Initialize a new sensor
- `startSensor(sensorId)`: Start a sensor
- `stopSensor(sensorId)`: Stop a sensor
- `getSensorStatus(sensorId)`: Get sensor status
- `getActiveSensors()`: Get all active sensors
- `getSensorsByType(type)`: Get sensors by type
- `removeSensor(sensorId)`: Remove a sensor

#### Session Management
- `startSession(mode, boardId?)`: Start a sensing session
- `stopSession()`: Stop current session
- `getCurrentSession()`: Get current session

#### Measurements
- `recordMeasurement(sensorId, value, componentId?, pinId?)`: Record a measurement
- `getMeasurements()`: Get all measurements
- `getMeasurementsBySensor(sensorId)`: Get measurements by sensor

#### Analysis
- `detectAnomalies(measurements, expectedRange?)`: Detect anomalies
- `analyzeAudioNoise(audioData)`: Analyze audio for noise patterns
- `discoverSensors()`: Discover available sensors

#### Utilities
- `simulateSensorReading(type, componentId?)`: Simulate a sensor reading
- `clearAll()`: Clear all sensors and data

---

## 🤝 Contributing

Want to add support for new sensors? See our [CONTRIBUTING.md](./CONTRIBUTING.md) guide.

Sensor integration wishlist:
- Oscilloscopes
- Logic analyzers
- Thermal cameras
- Network analyzers
- Power analyzers

---

## 📞 Support

For questions about ERA II sensing:
- Open an issue on GitHub
- Tag with `ERA-II` and `sensing`
- Include sensor type and error details

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Status**: ERA II - Active Development
