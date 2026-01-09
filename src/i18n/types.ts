export interface Translation {
  // Common
  common: {
    ok: string;
    cancel: string;
    yes: string;
    no: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    next: string;
    loading: string;
    error: string;
    success: string;
  };

  // Home Screen
  home: {
    title: string;
    subtitle: string;
    startButton: string;
    featuresTitle: string;
    features: string[];
  };

  // Modes
  modes: {
    inspection: {
      title: string;
      description: string;
      shortLabel: string;
    };
    measurement: {
      title: string;
      description: string;
      shortLabel: string;
    };
    repair: {
      title: string;
      description: string;
      shortLabel: string;
    };
    creation: {
      title: string;
      description: string;
      shortLabel: string;
    };
    validation: {
      title: string;
      description: string;
      shortLabel: string;
    };
  };

  // AR Camera
  arCamera: {
    title: string;
    noCameraPermission: string;
    requestingPermission: string;
    noDevice: string;
    tapToCapture: string;
  };

  // Measurements
  measurements: {
    voltage: string;
    current: string;
    resistance: string;
    frequency: string;
    continuity: string;
    expected: string;
    measured: string;
    tolerance: string;
    passed: string;
    failed: string;
  };

  // Components
  components: {
    resistor: string;
    capacitor: string;
    ic: string;
    connector: string;
    module: string;
    pin: string;
    testpoint: string;
    regulator: string;
    microcontroller: string;
  };

  // Pins
  pins: {
    vcc: string;
    gnd: string;
    data: string;
    gpio: string;
    analog: string;
    vin: string;
    vout: string;
    io: string;
    tx: string;
    rx: string;
  };

  // Repair Steps
  repair: {
    inspect: string;
    measure: string;
    replace: string;
    solder: string;
    test: string;
    warning: string;
    expectedResult: string;
  };

  // Validation
  validation: {
    testName: string;
    testDescription: string;
    passCriteria: string;
    failureActions: string;
    runTest: string;
    testPassed: string;
    testFailed: string;
  };

  // Settings
  settings: {
    title: string;
    language: string;
    theme: string;
    units: string;
    notifications: string;
    about: string;
  };

  // Errors
  errors: {
    generic: string;
    networkError: string;
    permissionDenied: string;
    deviceNotSupported: string;
    saveFailed: string;
    loadFailed: string;
  };
}
