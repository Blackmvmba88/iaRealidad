import {
  Component,
  Pin,
  MeasurementPoint,
  RepairStep,
  ModuleGuide,
  ValidationTest,
} from '../types';

// Sample components that would be recognized in AR
export const sampleComponents: Component[] = [
  {
    id: 'u1',
    name: 'ATmega328P',
    type: 'ic',
    position: {x: 150, y: 200},
    description: 'Main microcontroller IC',
    pins: [
      {id: 'u1_p1', name: 'VCC', type: 'VCC', position: {x: 140, y: 190}, voltage: 5},
      {id: 'u1_p2', name: 'GND', type: 'GND', position: {x: 160, y: 190}, voltage: 0},
      {id: 'u1_p3', name: 'TX', type: 'DATA', position: {x: 140, y: 210}},
      {id: 'u1_p4', name: 'RX', type: 'DATA', position: {x: 160, y: 210}},
    ],
  },
  {
    id: 'r1',
    name: 'R1',
    type: 'resistor',
    position: {x: 100, y: 300},
    value: '10kΩ',
    description: 'Pull-up resistor',
  },
  {
    id: 'c1',
    name: 'C1',
    type: 'capacitor',
    position: {x: 200, y: 300},
    value: '100nF',
    description: 'Decoupling capacitor',
  },
];

// Measurement points for multimeter testing
export const measurementPoints: MeasurementPoint[] = [
  {
    id: 'm1',
    componentId: 'u1',
    pinId: 'u1_p1',
    expectedValue: '5V',
    expectedRange: {min: 4.75, max: 5.25},
    unit: 'V',
    description: 'Measure VCC voltage at microcontroller',
  },
  {
    id: 'm2',
    componentId: 'u1',
    pinId: 'u1_p2',
    expectedValue: '0V',
    expectedRange: {min: -0.1, max: 0.1},
    unit: 'V',
    description: 'Verify ground connection',
  },
  {
    id: 'm3',
    componentId: 'r1',
    expectedValue: '10kΩ',
    expectedRange: {min: 9500, max: 10500},
    unit: 'Ω',
    description: 'Measure resistor value',
  },
];

// Repair steps for fixing common issues
export const repairSteps: RepairStep[] = [
  {
    id: 'rs1',
    order: 1,
    title: 'Visual Inspection',
    description: 'Check for burned components, broken traces, or cold solder joints',
    componentIds: ['u1', 'r1', 'c1'],
    type: 'inspect',
    warning: 'Disconnect power before inspection',
  },
  {
    id: 'rs2',
    order: 2,
    title: 'Measure Power Supply',
    description: 'Verify voltage levels at VCC and GND pins',
    componentIds: ['u1'],
    type: 'measure',
    expectedResult: 'VCC: 5V ± 0.25V, GND: 0V',
  },
  {
    id: 'rs3',
    order: 3,
    title: 'Replace Faulty Capacitor',
    description: 'Remove and replace C1 if voltage is unstable',
    componentIds: ['c1'],
    type: 'replace',
    warning: 'Use correct capacitance value (100nF)',
  },
  {
    id: 'rs4',
    order: 4,
    title: 'Solder New Component',
    description: 'Carefully solder new capacitor, check polarity if electrolytic',
    componentIds: ['c1'],
    type: 'solder',
    warning: 'Set iron to 350°C, avoid overheating',
  },
  {
    id: 'rs5',
    order: 5,
    title: 'Test Repair',
    description: 'Power on and measure voltages again',
    componentIds: ['u1', 'c1'],
    type: 'test',
    expectedResult: 'Stable power supply, no oscillation',
  },
];

// Guide for adding Bluetooth module
export const bluetoothModuleGuide: ModuleGuide = {
  id: 'mod_bt1',
  moduleName: 'HC-05 Bluetooth',
  moduleType: 'Bluetooth',
  pinConnections: [
    {modulePin: 'VCC', boardPin: 'VCC (5V or 3.3V)', pinType: 'VCC'},
    {modulePin: 'GND', boardPin: 'GND', pinType: 'GND'},
    {modulePin: 'TX', boardPin: 'RX (GPIO)', pinType: 'TX'},
    {modulePin: 'RX', boardPin: 'TX (GPIO) via voltage divider', pinType: 'RX'},
  ],
  connectionSteps: [
    {
      id: 'bts1',
      order: 1,
      title: 'Prepare Module',
      description: 'Check HC-05 module voltage requirements (3.3V-5V)',
      componentIds: [],
      type: 'inspect',
      warning: 'RX pin is 3.3V only! Use voltage divider for 5V boards',
    },
    {
      id: 'bts2',
      order: 2,
      title: 'Connect Power',
      description: 'Wire VCC to board power rail and GND to ground',
      componentIds: [],
      type: 'solder',
      expectedResult: 'Module LED should blink when powered',
    },
    {
      id: 'bts3',
      order: 3,
      title: 'Connect Data Lines',
      description: 'Connect TX and RX pins with appropriate voltage levels',
      componentIds: [],
      type: 'solder',
      warning: 'Cross-connect: Module TX → Board RX, Module RX → Board TX',
    },
  ],
  testingSteps: [
    {
      id: 'btt1',
      order: 1,
      title: 'Power Test',
      description: 'Verify module receives power and LED blinks',
      componentIds: [],
      type: 'test',
      expectedResult: 'LED blinking indicates pairing mode',
    },
    {
      id: 'btt2',
      order: 2,
      title: 'Serial Communication Test',
      description: 'Send AT commands via serial monitor',
      componentIds: [],
      type: 'test',
      expectedResult: 'Module responds with "OK"',
    },
  ],
};

// Guide for adding WiFi module
export const wifiModuleGuide: ModuleGuide = {
  id: 'mod_wifi1',
  moduleName: 'ESP8266 WiFi',
  moduleType: 'WiFi',
  pinConnections: [
    {modulePin: 'VCC', boardPin: '3.3V', pinType: 'VCC'},
    {modulePin: 'GND', boardPin: 'GND', pinType: 'GND'},
    {modulePin: 'TX', boardPin: 'RX (GPIO)', pinType: 'TX'},
    {modulePin: 'RX', boardPin: 'TX (GPIO)', pinType: 'RX'},
    {modulePin: 'CH_PD', boardPin: '3.3V', pinType: 'VCC'},
  ],
  connectionSteps: [
    {
      id: 'wfs1',
      order: 1,
      title: 'Check Power Requirements',
      description: 'ESP8266 requires 3.3V with at least 300mA current',
      componentIds: [],
      type: 'inspect',
      warning: 'Do NOT connect to 5V - will damage module!',
    },
    {
      id: 'wfs2',
      order: 2,
      title: 'Connect Power and Enable',
      description: 'Wire VCC, GND, and CH_PD (chip enable) pins',
      componentIds: [],
      type: 'solder',
      expectedResult: 'Module should power on',
    },
    {
      id: 'wfs3',
      order: 3,
      title: 'Connect Serial Interface',
      description: 'Connect TX/RX for AT command communication',
      componentIds: [],
      type: 'solder',
    },
  ],
  testingSteps: [
    {
      id: 'wft1',
      order: 1,
      title: 'Power and Communication Test',
      description: 'Send AT command to verify communication',
      componentIds: [],
      type: 'test',
      expectedResult: 'Module responds with "OK"',
    },
    {
      id: 'wft2',
      order: 2,
      title: 'WiFi Connection Test',
      description: 'Send AT+CWLAP to scan for networks',
      componentIds: [],
      type: 'test',
      expectedResult: 'List of available WiFi networks',
    },
  ],
};

// Validation tests
export const validationTests: ValidationTest[] = [
  {
    id: 'vt1',
    name: 'Power Supply Validation',
    description: 'Verify all power rails are within specification',
    measurementPoints: [measurementPoints[0], measurementPoints[1]],
    passCriteria: 'All voltages within ±5% of expected values',
    failureActions: [
      'Check power supply connections',
      'Verify voltage regulator operation',
      'Inspect for short circuits',
    ],
  },
  {
    id: 'vt2',
    name: 'Component Value Validation',
    description: 'Verify passive components have correct values',
    measurementPoints: [measurementPoints[2]],
    passCriteria: 'Values within component tolerance',
    failureActions: [
      'Replace components with incorrect values',
      'Check for counterfeit parts',
    ],
  },
  {
    id: 'vt3',
    name: 'Signal Integrity Test',
    description: 'Verify data lines are functioning correctly',
    measurementPoints: [],
    passCriteria: 'Clean square waves with proper voltage levels',
    failureActions: [
      'Check for broken traces',
      'Verify pull-up/pull-down resistors',
      'Test with oscilloscope',
    ],
  },
];

export const getSampleDataForMode = (mode: string) => {
  switch (mode) {
    case 'inspection':
      return {components: sampleComponents};
    case 'measurement':
      return {measurementPoints};
    case 'repair':
      return {repairSteps};
    case 'creation':
      return {
        bluetoothGuide: bluetoothModuleGuide,
        wifiGuide: wifiModuleGuide,
      };
    case 'validation':
      return {validationTests};
    default:
      return {};
  }
};
