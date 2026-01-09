import {
  sampleComponents,
  measurementPoints,
  repairSteps,
  bluetoothModuleGuide,
  wifiModuleGuide,
  validationTests,
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
  });

  describe('getSampleDataForMode', () => {
    it('should return components for inspection mode', () => {
      const data = getSampleDataForMode('inspection');
      expect(data).toHaveProperty('components');
    });

    it('should return measurement points for measurement mode', () => {
      const data = getSampleDataForMode('measurement');
      expect(data).toHaveProperty('measurementPoints');
    });

    it('should return repair steps for repair mode', () => {
      const data = getSampleDataForMode('repair');
      expect(data).toHaveProperty('repairSteps');
    });

    it('should return module guides for creation mode', () => {
      const data = getSampleDataForMode('creation');
      expect(data).toHaveProperty('bluetoothGuide');
      expect(data).toHaveProperty('wifiGuide');
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
