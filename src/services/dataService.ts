import {
  Component,
  MeasurementPoint,
  RepairStep,
  ModuleGuide,
  ValidationTest,
  PowerOnChecklist,
  FirmwareStub,
} from '../types';
import {firmwareGeneratorService} from './firmwareGeneratorService';

// Sample components that would be recognized in AR
export const sampleComponents: Component[] = [
  {
    id: 'u1',
    name: 'ATmega328P',
    type: 'microcontroller',
    position: {x: 150, y: 200},
    description: 'Main microcontroller IC',
    pins: [
      {
        id: 'u1_p1',
        name: 'VCC',
        type: 'VCC',
        position: {x: 140, y: 190},
        voltage: 5,
      },
      {
        id: 'u1_p2',
        name: 'GND',
        type: 'GND',
        position: {x: 160, y: 190},
        voltage: 0,
      },
      {id: 'u1_p3', name: 'TX', type: 'DATA', position: {x: 140, y: 210}},
      {id: 'u1_p4', name: 'RX', type: 'DATA', position: {x: 160, y: 210}},
      {id: 'u1_p5', name: 'D2', type: 'IO', position: {x: 140, y: 230}},
      {id: 'u1_p6', name: 'D3', type: 'IO', position: {x: 160, y: 230}},
    ],
  },
  {
    id: 'reg1',
    name: 'LM7805',
    type: 'regulator',
    position: {x: 80, y: 150},
    description: '5V voltage regulator',
    value: '5V/1A',
    pins: [
      {
        id: 'reg1_p1',
        name: 'VIN',
        type: 'VIN',
        position: {x: 60, y: 150},
        voltage: 12,
      },
      {
        id: 'reg1_p2',
        name: 'GND',
        type: 'GND',
        position: {x: 80, y: 150},
        voltage: 0,
      },
      {
        id: 'reg1_p3',
        name: 'VOUT',
        type: 'VOUT',
        position: {x: 100, y: 150},
        voltage: 5,
      },
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
    measurementType: 'voltage',
  },
  {
    id: 'm2',
    componentId: 'u1',
    pinId: 'u1_p2',
    expectedValue: '0V',
    expectedRange: {min: -0.1, max: 0.1},
    unit: 'V',
    description: 'Verify ground connection',
    measurementType: 'voltage',
  },
  {
    id: 'm3',
    componentId: 'r1',
    expectedValue: '10kΩ',
    expectedRange: {min: 9500, max: 10500},
    unit: 'Ω',
    description: 'Measure resistor value',
    measurementType: 'resistance',
  },
  {
    id: 'm4',
    componentId: 'reg1',
    pinId: 'reg1_p1',
    expectedValue: '7-12V',
    expectedRange: {min: 7, max: 12},
    unit: 'V',
    description: 'Measure regulator input voltage (VIN)',
    measurementType: 'voltage',
  },
  {
    id: 'm5',
    componentId: 'reg1',
    pinId: 'reg1_p3',
    expectedValue: '5V',
    expectedRange: {min: 4.75, max: 5.25},
    unit: 'V',
    description: 'Measure regulator output voltage (VOUT)',
    measurementType: 'voltage',
  },
  {
    id: 'm6',
    componentId: 'u1',
    pinId: 'u1_p2',
    expectedValue: 'Connected',
    expectedRange: {min: 0, max: 10},
    unit: 'continuity',
    description: 'Continuity test: GND to regulator GND',
    measurementType: 'continuity',
  },
];

// Repair steps for fixing common issues
export const repairSteps: RepairStep[] = [
  {
    id: 'rs1',
    order: 1,
    title: 'Visual Inspection',
    description:
      'Check for burned components, broken traces, or cold solder joints',
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
    description:
      'Carefully solder new capacitor, check polarity if electrolytic',
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

// Firmware stub generation for HC-05 Bluetooth Module
export const hc05FirmwareStub: FirmwareStub = {
  id: 'fw_hc05_1',
  moduleName: 'HC-05 Bluetooth',
  moduleType: 'Bluetooth',
  platform: 'arduino',
  code: `// HC-05 Bluetooth Module - Arduino Code
// Connections:
// HC-05 VCC  -> Arduino 5V (or 3.3V depending on module)
// HC-05 GND  -> Arduino GND
// HC-05 TX   -> Arduino RX (Pin 0) or SoftwareSerial RX
// HC-05 RX   -> Arduino TX (Pin 1) or SoftwareSerial TX (via voltage divider)

#include <SoftwareSerial.h>

// Define pins for software serial (recommended to protect hardware serial)
#define BT_RX_PIN 10  // Connect to HC-05 TX
#define BT_TX_PIN 11  // Connect to HC-05 RX (via voltage divider)

// Create software serial object
SoftwareSerial bluetoothSerial(BT_RX_PIN, BT_TX_PIN);

void setup() {
  // Initialize hardware serial for debugging
  Serial.begin(9600);
  Serial.println("HC-05 Bluetooth Module Initialized");
  
  // Initialize bluetooth serial
  bluetoothSerial.begin(9600);  // HC-05 default baud rate is 9600 or 38400
  
  Serial.println("Bluetooth ready. Waiting for connections...");
}

void loop() {
  // Check if data received from Bluetooth
  if (bluetoothSerial.available()) {
    char received = bluetoothSerial.read();
    Serial.print("Bluetooth received: ");
    Serial.println(received);
    
    // Echo back to Bluetooth
    bluetoothSerial.print("Echo: ");
    bluetoothSerial.println(received);
  }
  
  // Check if data received from Serial Monitor
  if (Serial.available()) {
    char sent = Serial.read();
    bluetoothSerial.write(sent);
  }
}

// AT Command Mode Configuration (optional)
// To enter AT mode, connect HC-05 EN/KEY pin to 3.3V before power-up
// Then use 38400 baud rate for AT commands:
// AT - Test command (should respond "OK")
// AT+NAME=MyDevice - Set device name
// AT+PSWD=1234 - Set pairing password
// AT+UART=9600,0,0 - Set baud rate`,
  dependencies: ['SoftwareSerial (built-in Arduino library)'],
  instructions: [
    'Install Arduino IDE if not already installed',
    'Select your Arduino board from Tools > Board menu',
    'Select the correct COM port from Tools > Port menu',
    'Copy the code to Arduino IDE',
    'Adjust BT_RX_PIN and BT_TX_PIN if using different pins',
    'Click Upload to flash the code to your Arduino',
    'Open Serial Monitor (Tools > Serial Monitor) at 9600 baud',
    'Pair your phone/computer with HC-05 (default PIN: 1234)',
    'Use a Bluetooth serial app to send/receive data',
    'IMPORTANT: Use voltage divider (1kΩ and 2kΩ) for HC-05 RX pin if using 5V Arduino',
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
  {
    id: 'vt4',
    name: 'Regulator Voltage Check',
    description: 'Verify voltage regulator is functioning correctly',
    measurementPoints: [measurementPoints[3], measurementPoints[4]],
    passCriteria: 'VIN: 7-12V, VOUT: 5V ±5%',
    failureActions: [
      'Check input voltage source',
      'Verify regulator is not overheating',
      'Replace regulator if output is incorrect',
      'Check for short circuit on output',
    ],
  },
];

// Power-on checklist for systematic startup verification
export const powerOnChecklist: PowerOnChecklist = {
  id: 'poc1',
  name: 'Basic Power-On Checklist',
  description: 'Systematic verification before powering on the circuit',
  steps: [
    {
      id: 'poc1_s1',
      order: 1,
      description:
        'Visual inspection: Check for reversed components, solder bridges, or damaged parts',
      checkType: 'visual',
    },
    {
      id: 'poc1_s2',
      order: 2,
      description: 'Continuity test: Verify GND connections across the board',
      checkType: 'continuity',
    },
    {
      id: 'poc1_s3',
      order: 3,
      description:
        'Continuity test: Check for shorts between VCC and GND (should be open)',
      checkType: 'continuity',
    },
    {
      id: 'poc1_s4',
      order: 4,
      description:
        'Measurement: Verify regulator input voltage (VIN) is within range (7-12V)',
      checkType: 'measurement',
    },
    {
      id: 'poc1_s5',
      order: 5,
      description:
        'Measurement: Check regulator output voltage (VOUT) is 5V ±5%',
      checkType: 'measurement',
    },
    {
      id: 'poc1_s6',
      order: 6,
      description: 'Measurement: Verify microcontroller VCC is stable at 5V',
      checkType: 'measurement',
    },
    {
      id: 'poc1_s7',
      order: 7,
      description: 'Visual inspection: Verify no components are overheating',
      checkType: 'visual',
    },
  ],
};

// Guide for adding ESP32 WiFi/Bluetooth module
export const esp32ModuleGuide: ModuleGuide = {
  id: 'mod_esp32',
  moduleName: 'ESP32 DevKit',
  moduleType: 'WiFi',
  pinConnections: [
    {modulePin: '3V3', boardPin: '3.3V', pinType: 'VCC'},
    {modulePin: 'GND', boardPin: 'GND', pinType: 'GND'},
    {modulePin: 'TX', boardPin: 'RX (GPIO)', pinType: 'TX'},
    {modulePin: 'RX', boardPin: 'TX (GPIO)', pinType: 'RX'},
    {modulePin: 'GPIO2', boardPin: 'LED/Sensor', pinType: 'GPIO'},
  ],
  connectionSteps: [
    {
      id: 'esp32s1',
      order: 1,
      title: 'Check Power Requirements',
      description: 'ESP32 requires 3.3V with at least 500mA current',
      componentIds: [],
      type: 'inspect',
      warning: 'Do NOT connect GPIO directly to 5V - will damage module!',
    },
    {
      id: 'esp32s2',
      order: 2,
      title: 'Connect Power',
      description: 'Wire 3.3V and GND pins securely',
      componentIds: [],
      type: 'solder',
      expectedResult: 'Blue LED on ESP32 should light up',
    },
    {
      id: 'esp32s3',
      order: 3,
      title: 'Connect Serial Interface',
      description: 'Connect TX/RX for programming and debugging',
      componentIds: [],
      type: 'solder',
    },
  ],
  testingSteps: [
    {
      id: 'esp32t1',
      order: 1,
      title: 'Power Test',
      description: 'Verify ESP32 powers on and LED is visible',
      componentIds: [],
      type: 'test',
      expectedResult: 'Power LED on, no smoke or overheating',
    },
    {
      id: 'esp32t2',
      order: 2,
      title: 'Upload Test Firmware',
      description: 'Upload blink sketch to verify programming works',
      componentIds: [],
      type: 'test',
      expectedResult: 'LED blinks every second',
    },
  ],
};

export const getSampleDataForMode = (mode: string) => {
  switch (mode) {
    case 'inspection':
      return {components: sampleComponents};
    case 'measurement':
      return {
        measurementPoints,
        powerOnChecklist,
      };
    case 'repair':
      return {repairSteps};
    case 'creation':
      return {
        bluetoothGuide: bluetoothModuleGuide,
        wifiGuide: wifiModuleGuide,
        esp32Guide: esp32ModuleGuide,
        firmwareStub: hc05FirmwareStub,
        esp32WiFiFirmware: firmwareGeneratorService.generateESP32WiFiFirmware(),
        esp32BluetoothFirmware:
          firmwareGeneratorService.generateESP32BluetoothFirmware(),
        esp8266Firmware: firmwareGeneratorService.generateESP8266WiFiFirmware(),
      };
    case 'validation':
      return {validationTests};
    default:
      return {};
  }
};
