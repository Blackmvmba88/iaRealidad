export type RepairMode =
  | 'inspection'
  | 'measurement'
  | 'repair'
  | 'creation'
  | 'validation';

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
