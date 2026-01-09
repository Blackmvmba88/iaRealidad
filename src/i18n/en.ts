import {Translation} from './types';

export const en: Translation = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },

  home: {
    title: 'Electronics Repair Assistant',
    subtitle: 'Select a mode to start AR-guided electronics work',
    startButton: 'Start AR Mode',
    featuresTitle: 'Features:',
    features: [
      'Real-time component overlay and identification',
      'Pin highlighting (VCC, GND, GPIO, etc.)',
      'Multimeter probing guidance',
      'Module installation instructions',
      'Circuit validation and testing',
    ],
  },

  modes: {
    inspection: {
      title: 'Inspection',
      description:
        'Identify components, pins, and connections on circuit boards',
      shortLabel: 'Inspect',
    },
    measurement: {
      title: 'Measurement',
      description:
        'Guide multimeter probing with expected voltage/resistance ranges',
      shortLabel: 'Measure',
    },
    repair: {
      title: 'Repair',
      description:
        'Step-by-step repair instructions with component highlighting',
      shortLabel: 'Repair',
    },
    creation: {
      title: 'Creation',
      description: 'Guide adding Bluetooth/WiFi modules and new components',
      shortLabel: 'Create',
    },
    validation: {
      title: 'Validation',
      description: 'Test circuit functionality and verify connections',
      shortLabel: 'Validate',
    },
  },

  arCamera: {
    title: 'AR View',
    noCameraPermission: 'Camera permission is required to use AR features',
    requestingPermission: 'Requesting camera permission...',
    noDevice: 'No camera device available',
    tapToCapture: 'Tap to capture',
  },

  measurements: {
    voltage: 'Voltage',
    current: 'Current',
    resistance: 'Resistance',
    frequency: 'Frequency',
    continuity: 'Continuity',
    expected: 'Expected',
    measured: 'Measured',
    tolerance: 'Tolerance',
    passed: 'Passed',
    failed: 'Failed',
  },

  components: {
    resistor: 'Resistor',
    capacitor: 'Capacitor',
    ic: 'Integrated Circuit',
    connector: 'Connector',
    module: 'Module',
    pin: 'Pin',
    testpoint: 'Test Point',
    regulator: 'Voltage Regulator',
    microcontroller: 'Microcontroller',
  },

  pins: {
    vcc: 'VCC (Power)',
    gnd: 'GND (Ground)',
    data: 'Data',
    gpio: 'GPIO',
    analog: 'Analog',
    vin: 'Voltage Input',
    vout: 'Voltage Output',
    io: 'Input/Output',
    tx: 'Transmit',
    rx: 'Receive',
  },

  repair: {
    inspect: 'Inspect',
    measure: 'Measure',
    replace: 'Replace',
    solder: 'Solder',
    test: 'Test',
    warning: 'Warning',
    expectedResult: 'Expected Result',
  },

  validation: {
    testName: 'Test Name',
    testDescription: 'Description',
    passCriteria: 'Pass Criteria',
    failureActions: 'Failure Actions',
    runTest: 'Run Test',
    testPassed: 'Test Passed',
    testFailed: 'Test Failed',
  },

  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    units: 'Units',
    notifications: 'Notifications',
    about: 'About',
  },

  errors: {
    generic: 'An error occurred. Please try again.',
    networkError: 'Network error. Please check your connection.',
    permissionDenied: 'Permission denied',
    deviceNotSupported: 'This device is not supported',
    saveFailed: 'Failed to save data',
    loadFailed: 'Failed to load data',
  },
};
