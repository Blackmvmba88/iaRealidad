import {
  sampleComponents,
  measurementPoints,
  repairSteps,
  bluetoothModuleGuide,
  wifiModuleGuide,
  validationTests,
  powerOnChecklist,
  hc05FirmwareStub,
  getSampleDataForMode,
} from '../src/services/dataService';

describe('Data Service', () => {
  describe('Sample Components', () => {
    it('should have component definitions', () => {
      expect(sampleComponents).toBeDefined();
      expect(sampleComponents.length).toBeGreaterThan(0);
    });

    it('should have valid component structure', () => {
      const component = sampleComponents[0];
      expect(component).toHaveProperty('id');
      expect(component).toHaveProperty('name');
      expect(component).toHaveProperty('type');
      expect(component).toHaveProperty('position');
    });

    it('should include regulator component', () => {
      const regulator = sampleComponents.find(c => c.type === 'regulator');
      expect(regulator).toBeDefined();
      expect(regulator?.name).toBe('LM7805');
    });

    it('should include microcontroller component', () => {
      const microcontroller = sampleComponents.find(
        c => c.type === 'microcontroller',
      );
      expect(microcontroller).toBeDefined();
      expect(microcontroller?.name).toBe('ATmega328P');
    });

    it('should have VIN and VOUT pins on regulator', () => {
      const regulator = sampleComponents.find(c => c.type === 'regulator');
      const vinPin = regulator?.pins?.find(p => p.type === 'VIN');
      const voutPin = regulator?.pins?.find(p => p.type === 'VOUT');
      expect(vinPin).toBeDefined();
      expect(voutPin).toBeDefined();
    });

    it('should have IO pins on microcontroller', () => {
      const microcontroller = sampleComponents.find(
        c => c.type === 'microcontroller',
      );
      const ioPin = microcontroller?.pins?.find(p => p.type === 'IO');
      expect(ioPin).toBeDefined();
    });
  });

  describe('Measurement Points', () => {
    it('should have measurement definitions', () => {
      expect(measurementPoints).toBeDefined();
      expect(measurementPoints.length).toBeGreaterThan(0);
    });

    it('should have valid measurement structure', () => {
      const measurement = measurementPoints[0];
      expect(measurement).toHaveProperty('id');
      expect(measurement).toHaveProperty('componentId');
      expect(measurement).toHaveProperty('expectedValue');
      expect(measurement).toHaveProperty('expectedRange');
      expect(measurement).toHaveProperty('unit');
    });

    it('should include regulator voltage measurements', () => {
      const regulatorMeasurements = measurementPoints.filter(
        m => m.componentId === 'reg1',
      );
      expect(regulatorMeasurements.length).toBeGreaterThan(0);
    });

    it('should include continuity test', () => {
      const continuityTest = measurementPoints.find(
        m => m.measurementType === 'continuity',
      );
      expect(continuityTest).toBeDefined();
      expect(continuityTest?.unit).toBe('continuity');
    });

    it('should have measurement types', () => {
      const voltageMeasurement = measurementPoints.find(
        m => m.measurementType === 'voltage',
      );
      expect(voltageMeasurement).toBeDefined();
    });
  });

  describe('Repair Steps', () => {
    it('should have repair step definitions', () => {
      expect(repairSteps).toBeDefined();
      expect(repairSteps.length).toBeGreaterThan(0);
    });

    it('should have ordered steps', () => {
      const orders = repairSteps.map(step => step.order);
      const sortedOrders = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sortedOrders);
    });
  });

  describe('Module Guides', () => {
    it('should have Bluetooth guide', () => {
      expect(bluetoothModuleGuide).toBeDefined();
      expect(bluetoothModuleGuide.moduleName).toContain('Bluetooth');
      expect(bluetoothModuleGuide.pinConnections.length).toBeGreaterThan(0);
    });

    it('should have WiFi guide', () => {
      expect(wifiModuleGuide).toBeDefined();
      expect(wifiModuleGuide.moduleName).toContain('WiFi');
      expect(wifiModuleGuide.pinConnections.length).toBeGreaterThan(0);
    });
  });

  describe('Validation Tests', () => {
    it('should have validation test definitions', () => {
      expect(validationTests).toBeDefined();
      expect(validationTests.length).toBeGreaterThan(0);
    });

    it('should include regulator voltage check test', () => {
      const regulatorTest = validationTests.find(
        t => t.name === 'Regulator Voltage Check',
      );
      expect(regulatorTest).toBeDefined();
    });
  });

  describe('Power-On Checklist', () => {
    it('should have power-on checklist', () => {
      expect(powerOnChecklist).toBeDefined();
      expect(powerOnChecklist.steps.length).toBeGreaterThan(0);
    });

    it('should have ordered steps', () => {
      const orders = powerOnChecklist.steps.map(step => step.order);
      const sortedOrders = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sortedOrders);
    });

    it('should include continuity checks', () => {
      const continuityStep = powerOnChecklist.steps.find(
        s => s.checkType === 'continuity',
      );
      expect(continuityStep).toBeDefined();
    });

    it('should include measurement checks', () => {
      const measurementStep = powerOnChecklist.steps.find(
        s => s.checkType === 'measurement',
      );
      expect(measurementStep).toBeDefined();
    });

    it('should include visual inspections', () => {
      const visualStep = powerOnChecklist.steps.find(
        s => s.checkType === 'visual',
      );
      expect(visualStep).toBeDefined();
    });
  });

  describe('Firmware Stub', () => {
    it('should have HC-05 firmware stub', () => {
      expect(hc05FirmwareStub).toBeDefined();
      expect(hc05FirmwareStub.moduleName).toContain('HC-05');
    });

    it('should have Arduino code', () => {
      expect(hc05FirmwareStub.code).toBeDefined();
      expect(hc05FirmwareStub.code.length).toBeGreaterThan(0);
      expect(hc05FirmwareStub.code).toContain('SoftwareSerial');
    });

    it('should have dependencies', () => {
      expect(hc05FirmwareStub.dependencies).toBeDefined();
      expect(hc05FirmwareStub.dependencies.length).toBeGreaterThan(0);
    });

    it('should have instructions', () => {
      expect(hc05FirmwareStub.instructions).toBeDefined();
      expect(hc05FirmwareStub.instructions.length).toBeGreaterThan(0);
    });

    it('should target Arduino platform', () => {
      expect(hc05FirmwareStub.platform).toBe('arduino');
    });
  });

  describe('getSampleDataForMode', () => {
    it('should return components for inspection mode', () => {
      const data = getSampleDataForMode('inspection');
      expect(data).toHaveProperty('components');
    });

    it('should return measurement points for measurement mode', () => {
      const data = getSampleDataForMode('measurement');
      expect(data).toHaveProperty('measurementPoints');
      expect(data).toHaveProperty('powerOnChecklist');
    });

    it('should return repair steps for repair mode', () => {
      const data = getSampleDataForMode('repair');
      expect(data).toHaveProperty('repairSteps');
    });

    it('should return module guides for creation mode', () => {
      const data = getSampleDataForMode('creation');
      expect(data).toHaveProperty('bluetoothGuide');
      expect(data).toHaveProperty('wifiGuide');
      expect(data).toHaveProperty('firmwareStub');
    });

    it('should return validation tests for validation mode', () => {
      const data = getSampleDataForMode('validation');
      expect(data).toHaveProperty('validationTests');
    });

    it('should return empty object for unknown mode', () => {
      const data = getSampleDataForMode('unknown');
      expect(data).toEqual({});
    });
  });
});
