import {
  getBoardConfiguration,
  getAllBoardConfigurations,
  calculateToleranceRange,
  arduinoUnoConfig,
  esp32DevKitConfig,
  esp8266NodeMCUConfig,
} from '../src/config/boardConfigurations';

describe('Board Configurations', () => {
  describe('getBoardConfiguration', () => {
    it('should return Arduino Uno configuration', () => {
      const config = getBoardConfiguration('arduino_uno');
      expect(config).not.toBeNull();
      expect(config?.name).toBe('Arduino Uno R3');
      expect(config?.type).toBe('arduino_uno');
    });

    it('should return ESP32 configuration', () => {
      const config = getBoardConfiguration('esp32_devkit');
      expect(config).not.toBeNull();
      expect(config?.name).toBe('ESP32 DevKit V1');
      expect(config?.type).toBe('esp32_devkit');
    });

    it('should return ESP8266 configuration', () => {
      const config = getBoardConfiguration('esp8266_nodemcu');
      expect(config).not.toBeNull();
      expect(config?.name).toBe('ESP8266 NodeMCU V3');
      expect(config?.type).toBe('esp8266_nodemcu');
    });

    it('should return null for invalid board type', () => {
      const config = getBoardConfiguration('invalid' as any);
      expect(config).toBeNull();
    });
  });

  describe('getAllBoardConfigurations', () => {
    it('should return all board configurations', () => {
      const configs = getAllBoardConfigurations();
      expect(configs).toHaveLength(3);
      expect(configs).toContain(arduinoUnoConfig);
      expect(configs).toContain(esp32DevKitConfig);
      expect(configs).toContain(esp8266NodeMCUConfig);
    });
  });

  describe('Arduino Uno Configuration', () => {
    it('should have correct default tolerances', () => {
      expect(arduinoUnoConfig.defaultTolerances.voltage).toBe(5);
      expect(arduinoUnoConfig.defaultTolerances.resistance).toBe(10);
      expect(arduinoUnoConfig.defaultTolerances.current).toBe(10);
    });

    it('should have correct power requirements', () => {
      expect(arduinoUnoConfig.powerRequirements.inputVoltage.min).toBe(7);
      expect(arduinoUnoConfig.powerRequirements.inputVoltage.max).toBe(12);
      expect(arduinoUnoConfig.powerRequirements.outputVoltage).toBe(5);
      expect(arduinoUnoConfig.powerRequirements.maxCurrent).toBe(500);
    });

    it('should have components with pins', () => {
      expect(arduinoUnoConfig.components.length).toBeGreaterThan(0);
      const microcontroller = arduinoUnoConfig.components.find(
        c => c.type === 'microcontroller',
      );
      expect(microcontroller).toBeDefined();
      expect(microcontroller?.pins).toBeDefined();
      expect(microcontroller?.pins?.length).toBeGreaterThan(0);
    });

    it('should have measurement points', () => {
      expect(arduinoUnoConfig.measurementPoints.length).toBeGreaterThan(0);
      const vccMeasurement = arduinoUnoConfig.measurementPoints.find(
        m => m.pinId === 'u1_uno_vcc',
      );
      expect(vccMeasurement).toBeDefined();
      expect(vccMeasurement?.expectedValue).toBe('5V');
    });
  });

  describe('ESP32 Configuration', () => {
    it('should have correct voltage level (3.3V)', () => {
      expect(esp32DevKitConfig.powerRequirements.outputVoltage).toBe(3.3);
      const vccPin = esp32DevKitConfig.components[0].pins?.find(
        p => p.type === 'VCC',
      );
      expect(vccPin?.voltage).toBe(3.3);
    });

    it('should have ESP32 specific components', () => {
      const esp32Module = esp32DevKitConfig.components.find(
        c => c.name === 'ESP32-WROOM-32',
      );
      expect(esp32Module).toBeDefined();
      expect(esp32Module?.type).toBe('microcontroller');
    });
  });

  describe('ESP8266 Configuration', () => {
    it('should have correct voltage level (3.3V)', () => {
      expect(esp8266NodeMCUConfig.powerRequirements.outputVoltage).toBe(3.3);
    });

    it('should have lower max current than ESP32', () => {
      expect(esp8266NodeMCUConfig.powerRequirements.maxCurrent).toBeLessThan(
        esp32DevKitConfig.powerRequirements.maxCurrent,
      );
    });
  });

  describe('calculateToleranceRange', () => {
    it('should calculate correct tolerance range for 5% tolerance', () => {
      const range = calculateToleranceRange(5, 5);
      expect(range.min).toBeCloseTo(4.75, 2);
      expect(range.max).toBeCloseTo(5.25, 2);
    });

    it('should calculate correct tolerance range for 10% tolerance', () => {
      const range = calculateToleranceRange(100, 10);
      expect(range.min).toBe(90);
      expect(range.max).toBe(110);
    });

    it('should handle zero value', () => {
      const range = calculateToleranceRange(0, 5);
      expect(range.min).toBe(0);
      expect(range.max).toBe(0);
    });

    it('should handle large values', () => {
      const range = calculateToleranceRange(10000, 5);
      expect(range.min).toBe(9500);
      expect(range.max).toBe(10500);
    });
  });
});
