import {Component, MeasurementPoint} from '../types';

/**
 * Board type definition
 */
export type BoardType =
  | 'arduino_uno'
  | 'esp32_devkit'
  | 'esp8266_nodemcu'
  | 'generic';

/**
 * Board configuration interface
 */
export interface BoardConfiguration {
  id: string;
  name: string;
  type: BoardType;
  description: string;
  components: Component[];
  measurementPoints: MeasurementPoint[];
  defaultTolerances: {
    voltage: number; // percentage
    resistance: number; // percentage
    current: number; // percentage
  };
  powerRequirements: {
    inputVoltage: {min: number; max: number};
    outputVoltage: number;
    maxCurrent: number;
  };
}

/**
 * Arduino Uno R3 configuration
 */
export const arduinoUnoConfig: BoardConfiguration = {
  id: 'arduino_uno_r3',
  name: 'Arduino Uno R3',
  type: 'arduino_uno',
  description: 'Standard Arduino Uno R3 board based on ATmega328P',
  defaultTolerances: {
    voltage: 5, // ±5%
    resistance: 10, // ±10%
    current: 10, // ±10%
  },
  powerRequirements: {
    inputVoltage: {min: 7, max: 12},
    outputVoltage: 5,
    maxCurrent: 500, // mA
  },
  components: [
    {
      id: 'u1_uno',
      name: 'ATmega328P',
      type: 'microcontroller',
      position: {x: 150, y: 200},
      description: 'Main microcontroller IC',
      pins: [
        {
          id: 'u1_uno_vcc',
          name: 'VCC',
          type: 'VCC',
          position: {x: 140, y: 190},
          voltage: 5,
        },
        {
          id: 'u1_uno_gnd',
          name: 'GND',
          type: 'GND',
          position: {x: 160, y: 190},
          voltage: 0,
        },
        {
          id: 'u1_uno_d0',
          name: 'D0/RX',
          type: 'DATA',
          position: {x: 140, y: 210},
        },
        {
          id: 'u1_uno_d1',
          name: 'D1/TX',
          type: 'DATA',
          position: {x: 160, y: 210},
        },
      ],
    },
    {
      id: 'reg1_uno',
      name: 'LM7805',
      type: 'regulator',
      position: {x: 80, y: 150},
      description: '5V voltage regulator',
      value: '5V/1A',
      pins: [
        {
          id: 'reg1_uno_vin',
          name: 'VIN',
          type: 'VIN',
          position: {x: 60, y: 150},
          voltage: 12,
        },
        {
          id: 'reg1_uno_gnd',
          name: 'GND',
          type: 'GND',
          position: {x: 80, y: 150},
          voltage: 0,
        },
        {
          id: 'reg1_uno_vout',
          name: 'VOUT',
          type: 'VOUT',
          position: {x: 100, y: 150},
          voltage: 5,
        },
      ],
    },
  ],
  measurementPoints: [
    {
      id: 'm1_uno',
      componentId: 'u1_uno',
      pinId: 'u1_uno_vcc',
      expectedValue: '5V',
      expectedRange: {min: 4.75, max: 5.25},
      unit: 'V',
      description: 'Measure VCC voltage at ATmega328P',
      measurementType: 'voltage',
    },
    {
      id: 'm2_uno',
      componentId: 'reg1_uno',
      pinId: 'reg1_uno_vout',
      expectedValue: '5V',
      expectedRange: {min: 4.75, max: 5.25},
      unit: 'V',
      description: 'Measure regulator output voltage',
      measurementType: 'voltage',
    },
  ],
};

/**
 * ESP32 DevKit configuration
 */
export const esp32DevKitConfig: BoardConfiguration = {
  id: 'esp32_devkit_v1',
  name: 'ESP32 DevKit V1',
  type: 'esp32_devkit',
  description: 'ESP32 development board with WiFi and Bluetooth',
  defaultTolerances: {
    voltage: 5,
    resistance: 10,
    current: 10,
  },
  powerRequirements: {
    inputVoltage: {min: 3.3, max: 5},
    outputVoltage: 3.3,
    maxCurrent: 500,
  },
  components: [
    {
      id: 'u1_esp32',
      name: 'ESP32-WROOM-32',
      type: 'microcontroller',
      position: {x: 150, y: 200},
      description: 'ESP32 WiFi + Bluetooth module',
      pins: [
        {
          id: 'u1_esp32_3v3',
          name: '3V3',
          type: 'VCC',
          position: {x: 140, y: 190},
          voltage: 3.3,
        },
        {
          id: 'u1_esp32_gnd',
          name: 'GND',
          type: 'GND',
          position: {x: 160, y: 190},
          voltage: 0,
        },
        {
          id: 'u1_esp32_tx',
          name: 'TX',
          type: 'DATA',
          position: {x: 140, y: 210},
        },
        {
          id: 'u1_esp32_rx',
          name: 'RX',
          type: 'DATA',
          position: {x: 160, y: 210},
        },
        {
          id: 'u1_esp32_gpio2',
          name: 'GPIO2',
          type: 'GPIO',
          position: {x: 140, y: 230},
        },
      ],
    },
    {
      id: 'reg1_esp32',
      name: 'AMS1117-3.3',
      type: 'regulator',
      position: {x: 80, y: 150},
      description: '3.3V voltage regulator',
      value: '3.3V/1A',
      pins: [
        {
          id: 'reg1_esp32_vin',
          name: 'VIN',
          type: 'VIN',
          position: {x: 60, y: 150},
          voltage: 5,
        },
        {
          id: 'reg1_esp32_gnd',
          name: 'GND',
          type: 'GND',
          position: {x: 80, y: 150},
          voltage: 0,
        },
        {
          id: 'reg1_esp32_vout',
          name: 'VOUT',
          type: 'VOUT',
          position: {x: 100, y: 150},
          voltage: 3.3,
        },
      ],
    },
  ],
  measurementPoints: [
    {
      id: 'm1_esp32',
      componentId: 'u1_esp32',
      pinId: 'u1_esp32_3v3',
      expectedValue: '3.3V',
      expectedRange: {min: 3.135, max: 3.465},
      unit: 'V',
      description: 'Measure 3.3V power rail',
      measurementType: 'voltage',
    },
    {
      id: 'm2_esp32',
      componentId: 'reg1_esp32',
      pinId: 'reg1_esp32_vout',
      expectedValue: '3.3V',
      expectedRange: {min: 3.135, max: 3.465},
      unit: 'V',
      description: 'Measure regulator output',
      measurementType: 'voltage',
    },
  ],
};

/**
 * ESP8266 NodeMCU configuration
 */
export const esp8266NodeMCUConfig: BoardConfiguration = {
  id: 'esp8266_nodemcu_v3',
  name: 'ESP8266 NodeMCU V3',
  type: 'esp8266_nodemcu',
  description: 'ESP8266 development board with WiFi',
  defaultTolerances: {
    voltage: 5,
    resistance: 10,
    current: 10,
  },
  powerRequirements: {
    inputVoltage: {min: 3.3, max: 5},
    outputVoltage: 3.3,
    maxCurrent: 300,
  },
  components: [
    {
      id: 'u1_esp8266',
      name: 'ESP8266-12E',
      type: 'microcontroller',
      position: {x: 150, y: 200},
      description: 'ESP8266 WiFi module',
      pins: [
        {
          id: 'u1_esp8266_3v3',
          name: '3V3',
          type: 'VCC',
          position: {x: 140, y: 190},
          voltage: 3.3,
        },
        {
          id: 'u1_esp8266_gnd',
          name: 'GND',
          type: 'GND',
          position: {x: 160, y: 190},
          voltage: 0,
        },
        {
          id: 'u1_esp8266_tx',
          name: 'TX',
          type: 'DATA',
          position: {x: 140, y: 210},
        },
        {
          id: 'u1_esp8266_rx',
          name: 'RX',
          type: 'DATA',
          position: {x: 160, y: 210},
        },
      ],
    },
  ],
  measurementPoints: [
    {
      id: 'm1_esp8266',
      componentId: 'u1_esp8266',
      pinId: 'u1_esp8266_3v3',
      expectedValue: '3.3V',
      expectedRange: {min: 3.135, max: 3.465},
      unit: 'V',
      description: 'Measure 3.3V power supply',
      measurementType: 'voltage',
    },
  ],
};

/**
 * Get board configuration by type
 */
export const getBoardConfiguration = (
  type: BoardType,
): BoardConfiguration | null => {
  switch (type) {
    case 'arduino_uno':
      return arduinoUnoConfig;
    case 'esp32_devkit':
      return esp32DevKitConfig;
    case 'esp8266_nodemcu':
      return esp8266NodeMCUConfig;
    default:
      return null;
  }
};

/**
 * Get all available board configurations
 */
export const getAllBoardConfigurations = (): BoardConfiguration[] => {
  return [arduinoUnoConfig, esp32DevKitConfig, esp8266NodeMCUConfig];
};

/**
 * Calculate tolerance range based on board configuration
 */
export const calculateToleranceRange = (
  expectedValue: number,
  tolerancePercent: number,
): {min: number; max: number} => {
  const tolerance = expectedValue * (tolerancePercent / 100);
  return {
    min: expectedValue - tolerance,
    max: expectedValue + tolerance,
  };
};
