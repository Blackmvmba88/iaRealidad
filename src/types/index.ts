export type RepairMode = 'inspection' | 'measurement' | 'repair' | 'creation' | 'validation';

export interface Component {
  id: string;
  name: string;
  type: 'resistor' | 'capacitor' | 'ic' | 'connector' | 'module' | 'pin' | 'testpoint';
  position: {x: number; y: number};
  pins?: Pin[];
  description?: string;
  value?: string;
}

export interface Pin {
  id: string;
  name: string;
  type: 'VCC' | 'GND' | 'DATA' | 'GPIO' | 'ANALOG';
  position: {x: number; y: number};
  voltage?: number;
}

export interface MeasurementPoint {
  id: string;
  componentId: string;
  pinId?: string;
  expectedValue: string;
  expectedRange: {min: number; max: number};
  unit: 'V' | 'A' | 'Ω' | 'Hz';
  description: string;
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
    pinType: 'VCC' | 'GND' | 'TX' | 'RX' | 'SCL' | 'SDA' | 'MISO' | 'MOSI' | 'SCK';
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
