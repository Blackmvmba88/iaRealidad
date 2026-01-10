export type RepairMode =
  | 'inspection'
  | 'measurement'
  | 'repair'
  | 'creation'
  | 'validation'
  | 'sensing';

export interface Component {
  id: string;
  name: string;
  type:
    | 'resistor'
    | 'capacitor'
    | 'ic'
    | 'connector'
    | 'module'
    | 'pin'
    | 'testpoint'
    | 'regulator'
    | 'microcontroller';
  position: {x: number; y: number};
  pins?: Pin[];
  description?: string;
  value?: string;
}

export interface Pin {
  id: string;
  name: string;
  type: 'VCC' | 'GND' | 'DATA' | 'GPIO' | 'ANALOG' | 'VIN' | 'VOUT' | 'IO';
  position: {x: number; y: number};
  voltage?: number;
}

export interface MeasurementPoint {
  id: string;
  componentId: string;
  pinId?: string;
  expectedValue: string;
  expectedRange: {min: number; max: number};
  unit: 'V' | 'A' | 'Ω' | 'Hz' | 'continuity';
  description: string;
  measurementType?:
    | 'voltage'
    | 'current'
    | 'resistance'
    | 'continuity'
    | 'frequency';
}

export interface RepairStep {
  id: string;
  order: number;
  title: string;
  description: string;
  componentIds: string[];
  type: 'inspect' | 'measure' | 'replace' | 'solder' | 'test';
  warning?: string;
  expectedResult?: string;
}

export interface ModuleGuide {
  id: string;
  moduleName: string;
  moduleType: 'Bluetooth' | 'WiFi' | 'GPS' | 'Sensor';
  connectionSteps: RepairStep[];
  pinConnections: {
    modulePin: string;
    boardPin: string;
    pinType:
      | 'VCC'
      | 'GND'
      | 'TX'
      | 'RX'
      | 'SCL'
      | 'SDA'
      | 'MISO'
      | 'MOSI'
      | 'SCK';
  }[];
  testingSteps: RepairStep[];
}

export interface ValidationTest {
  id: string;
  name: string;
  description: string;
  measurementPoints: MeasurementPoint[];
  passCriteria: string;
  failureActions: string[];
}

export interface MeasurementLog {
  id: string;
  timestamp: string;
  mode: RepairMode;
  componentId: string;
  pinId?: string;
  measuredValue: number;
  expectedValue: string;
  unit: string;
  passed: boolean;
  notes?: string;
}

export interface ValidationResult {
  id: string;
  timestamp: string;
  testId: string;
  testName: string;
  passed: boolean;
  results: {
    measurementId: string;
    passed: boolean;
    measuredValue?: number;
    expectedValue: string;
  }[];
  notes?: string;
}

export interface FirmwareStub {
  id: string;
  moduleName: string;
  moduleType: string;
  platform: 'arduino' | 'esp32' | 'esp8266';
  code: string;
  dependencies: string[];
  instructions: string[];
}

export interface PowerOnChecklist {
  id: string;
  name: string;
  description: string;
  steps: {
    id: string;
    order: number;
    description: string;
    checkType: 'visual' | 'measurement' | 'continuity';
    passed?: boolean;
  }[];
}

// ==================== ERA II: SENSING TYPES ====================

// Sensor Types
export type SensorType =
  | 'audio'
  | 'temperature'
  | 'bluetooth_multimeter'
  | 'uart_debug'
  | 'i2c_sensor'
  | 'spi_sensor'
  | 'microphone'
  | 'visual_topology';

// Sensor Status
export type SensorStatus =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'calibrating'
  | 'active';

// Base Sensor Interface
export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  status: SensorStatus;
  lastUpdated: string;
  capabilities: string[];
}

// Audio Sensor for electrical noise detection
export interface AudioSensor extends Sensor {
  type: 'audio';
  frequency: number; // Hz
  amplitude: number; // dB
  noisePattern?: 'humming' | 'clicking' | 'buzzing' | 'static' | 'clean';
  signalQuality: number; // 0-100
}

// Microphone for mechanical sounds
export interface MicrophoneSensor extends Sensor {
  type: 'microphone';
  clickDetected: boolean;
  clickPattern?: 'relay' | 'switch' | 'mechanical' | 'unknown';
  clickCount: number;
}

// Temperature Sensor (preparation for thermography)
export interface TemperatureSensor extends Sensor {
  type: 'temperature';
  currentTemp: number; // Celsius
  targetComponentId?: string;
  threshold?: {warning: number; critical: number};
  trend?: 'rising' | 'falling' | 'stable';
}

// Bluetooth Multimeter
export interface BluetoothMultimeter extends Sensor {
  type: 'bluetooth_multimeter';
  deviceName: string;
  deviceId: string;
  measurementType: 'voltage' | 'current' | 'resistance' | 'continuity';
  currentValue: number;
  unit: string;
  autoRange: boolean;
  range?: {min: number; max: number};
}

// UART Debug Interface
export interface UARTDebugInterface extends Sensor {
  type: 'uart_debug';
  baudRate: number;
  dataBits: 8 | 7 | 6 | 5;
  stopBits: 1 | 2;
  parity: 'none' | 'even' | 'odd';
  buffer: string[]; // Recent messages
  logCount: number;
}

// I2C Sensor
export interface I2CSensor extends Sensor {
  type: 'i2c_sensor';
  address: string; // Hex address
  deviceType?: string;
  registers?: {[key: string]: number};
  scanResult?: string[];
}

// SPI Sensor
export interface SPISensor extends Sensor {
  type: 'spi_sensor';
  clockSpeed: number; // Hz
  mode: 0 | 1 | 2 | 3;
  bitOrder: 'MSB' | 'LSB';
  dataBuffer?: number[];
}

// Visual Topology Recognition
export interface VisualTopologySensor extends Sensor {
  type: 'visual_topology';
  detectedComponents: Component[];
  tracesDetected: Trace[];
  confidenceLevel: number; // 0-100
}

// Circuit Trace (for topology mapping)
export interface Trace {
  id: string;
  startComponentId: string;
  endComponentId: string;
  startPinId?: string;
  endPinId?: string;
  type: 'power' | 'ground' | 'signal' | 'unknown';
  width?: number; // mm
  length?: number; // mm
}

// Sensing Session
export interface SensingSession {
  id: string;
  timestamp: string;
  mode: RepairMode;
  activeSensors: Sensor[];
  measurements: SensingMeasurement[];
  duration: number; // seconds
  boardId?: string;
  notes?: string;
}

// Sensing Measurement
export interface SensingMeasurement {
  id: string;
  timestamp: string;
  sensorId: string;
  sensorType: SensorType;
  value: number | string | boolean;
  unit?: string;
  componentId?: string;
  pinId?: string;
  anomalyDetected?: boolean;
  anomalyType?: 'out_of_range' | 'noise' | 'unstable' | 'unexpected_pattern';
  confidence?: number; // 0-100
}

// Sensor Configuration
export interface SensorConfig {
  sensorType: SensorType;
  enabled: boolean;
  autoStart: boolean;
  samplingRate?: number; // Hz
  filterSettings?: {
    enabled: boolean;
    type: 'lowpass' | 'highpass' | 'bandpass';
    cutoffFrequency?: number;
  };
  alertThresholds?: {
    warning: number;
    critical: number;
  };
}

// Anomaly Detection Result
export interface AnomalyDetection {
  id: string;
  timestamp: string;
  sensorId: string;
  anomalyType: 'out_of_range' | 'noise' | 'unstable' | 'unexpected_pattern';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestedActions: string[];
  affectedComponents?: string[];
  confidence: number; // 0-100
}

// Sensor Discovery Result
export interface SensorDiscovery {
  availableSensors: {
    bluetooth: BluetoothDevice[];
    uart: UARTDevice[];
    i2c: I2CDevice[];
    spi: SPIDevice[];
  };
  timestamp: string;
}

// Bluetooth Device
export interface BluetoothDevice {
  id: string;
  name: string;
  type: 'multimeter' | 'oscilloscope' | 'logic_analyzer' | 'unknown';
  rssi?: number; // Signal strength
  paired: boolean;
}

// UART Device
export interface UARTDevice {
  id: string;
  port: string;
  description?: string;
  manufacturer?: string;
}

// I2C Device
export interface I2CDevice {
  address: string;
  type?: string;
  registers?: number;
}

// SPI Device
export interface SPIDevice {
  id: string;
  chipSelect: number;
  type?: string;
}
