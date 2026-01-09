import storageService from '../src/services/storageService';
import {MeasurementLog, ValidationResult} from '../src/types';

describe('Storage Service', () => {
  beforeEach(async () => {
    // Clear all data before each test
    await storageService.clearAll();
  });

  describe('Measurement Logs', () => {
    it('should save and retrieve measurement logs', async () => {
      const log: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        pinId: 'u1_p1',
        measuredValue: 5.02,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
        notes: 'Voltage within range',
      };

      await storageService.saveMeasurementLog(log);
      const logs = await storageService.getMeasurementLogs();

      expect(logs).toHaveLength(1);
      expect(logs[0]).toEqual(log);
    });

    it('should filter measurement logs by component', async () => {
      const log1: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      const log2: MeasurementLog = {
        id: 'log2',
        timestamp: '2026-01-09T20:05:00Z',
        mode: 'measurement',
        componentId: 'reg1',
        measuredValue: 5.1,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      await storageService.saveMeasurementLog(log1);
      await storageService.saveMeasurementLog(log2);

      const u1Logs = await storageService.getMeasurementLogsByComponent('u1');
      expect(u1Logs).toHaveLength(1);
      expect(u1Logs[0].componentId).toBe('u1');
    });

    it('should filter measurement logs by date range', async () => {
      const log1: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      const log2: MeasurementLog = {
        id: 'log2',
        timestamp: '2026-01-10T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      await storageService.saveMeasurementLog(log1);
      await storageService.saveMeasurementLog(log2);

      const logs = await storageService.getMeasurementLogsByDateRange(
        '2026-01-09T00:00:00Z',
        '2026-01-09T23:59:59Z',
      );

      expect(logs).toHaveLength(1);
      expect(logs[0].id).toBe('log1');
    });
  });

  describe('Validation Results', () => {
    it('should save and retrieve validation results', async () => {
      const result: ValidationResult = {
        id: 'result1',
        timestamp: '2026-01-09T20:00:00Z',
        testId: 'vt1',
        testName: 'Power Supply Validation',
        passed: true,
        results: [
          {
            measurementId: 'm1',
            passed: true,
            measuredValue: 5.02,
            expectedValue: '5V',
          },
        ],
      };

      await storageService.saveValidationResult(result);
      const results = await storageService.getValidationResults();

      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(result);
    });

    it('should filter validation results by test ID', async () => {
      const result1: ValidationResult = {
        id: 'result1',
        timestamp: '2026-01-09T20:00:00Z',
        testId: 'vt1',
        testName: 'Test 1',
        passed: true,
        results: [],
      };

      const result2: ValidationResult = {
        id: 'result2',
        timestamp: '2026-01-09T20:05:00Z',
        testId: 'vt2',
        testName: 'Test 2',
        passed: false,
        results: [],
      };

      await storageService.saveValidationResult(result1);
      await storageService.saveValidationResult(result2);

      const vt1Results = await storageService.getValidationResultsByTest('vt1');
      expect(vt1Results).toHaveLength(1);
      expect(vt1Results[0].testId).toBe('vt1');
    });

    it('should get recent validation results', async () => {
      // Add multiple results
      for (let i = 0; i < 15; i++) {
        const result: ValidationResult = {
          id: `result${i}`,
          timestamp: `2026-01-09T20:${i.toString().padStart(2, '0')}:00Z`,
          testId: 'vt1',
          testName: 'Test',
          passed: true,
          results: [],
        };
        await storageService.saveValidationResult(result);
      }

      const recent = await storageService.getRecentValidationResults(10);
      expect(recent).toHaveLength(10);
      // Check that most recent is first
      expect(recent[0].timestamp > recent[1].timestamp).toBe(true);
    });

    it('should calculate validation statistics', async () => {
      const result1: ValidationResult = {
        id: 'result1',
        timestamp: '2026-01-09T20:00:00Z',
        testId: 'vt1',
        testName: 'Test 1',
        passed: true,
        results: [],
      };

      const result2: ValidationResult = {
        id: 'result2',
        timestamp: '2026-01-09T20:05:00Z',
        testId: 'vt2',
        testName: 'Test 2',
        passed: false,
        results: [],
      };

      const result3: ValidationResult = {
        id: 'result3',
        timestamp: '2026-01-09T20:10:00Z',
        testId: 'vt3',
        testName: 'Test 3',
        passed: true,
        results: [],
      };

      await storageService.saveValidationResult(result1);
      await storageService.saveValidationResult(result2);
      await storageService.saveValidationResult(result3);

      const stats = await storageService.getValidationStatistics();

      expect(stats.totalTests).toBe(3);
      expect(stats.passedTests).toBe(2);
      expect(stats.failedTests).toBe(1);
      expect(stats.passRate).toBeCloseTo(66.67, 1);
    });
  });

  describe('Clear Operations', () => {
    it('should clear measurement logs', async () => {
      const log: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      await storageService.saveMeasurementLog(log);
      await storageService.clearMeasurementLogs();
      const logs = await storageService.getMeasurementLogs();

      expect(logs).toHaveLength(0);
    });

    it('should clear validation results', async () => {
      const result: ValidationResult = {
        id: 'result1',
        timestamp: '2026-01-09T20:00:00Z',
        testId: 'vt1',
        testName: 'Test',
        passed: true,
        results: [],
      };

      await storageService.saveValidationResult(result);
      await storageService.clearValidationResults();
      const results = await storageService.getValidationResults();

      expect(results).toHaveLength(0);
    });

    it('should clear all data', async () => {
      const log: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      const result: ValidationResult = {
        id: 'result1',
        timestamp: '2026-01-09T20:00:00Z',
        testId: 'vt1',
        testName: 'Test',
        passed: true,
        results: [],
      };

      await storageService.saveMeasurementLog(log);
      await storageService.saveValidationResult(result);
      await storageService.clearAll();

      const logs = await storageService.getMeasurementLogs();
      const results = await storageService.getValidationResults();

      expect(logs).toHaveLength(0);
      expect(results).toHaveLength(0);
    });
  });

  describe('Export and Import', () => {
    it('should export logs as JSON', async () => {
      const log: MeasurementLog = {
        id: 'log1',
        timestamp: '2026-01-09T20:00:00Z',
        mode: 'measurement',
        componentId: 'u1',
        measuredValue: 5.0,
        expectedValue: '5V',
        unit: 'V',
        passed: true,
      };

      await storageService.saveMeasurementLog(log);
      const exported = await storageService.exportLogs();

      expect(exported).toBeDefined();
      const data = JSON.parse(exported);
      expect(data.measurementLogs).toHaveLength(1);
      expect(data.exportedAt).toBeDefined();
    });

    it('should import logs from JSON', async () => {
      const data = {
        measurementLogs: [
          {
            id: 'log1',
            timestamp: '2026-01-09T20:00:00Z',
            mode: 'measurement',
            componentId: 'u1',
            measuredValue: 5.0,
            expectedValue: '5V',
            unit: 'V',
            passed: true,
          },
        ],
        validationResults: [],
      };

      await storageService.importLogs(JSON.stringify(data));
      const logs = await storageService.getMeasurementLogs();

      expect(logs).toHaveLength(1);
      expect(logs[0].id).toBe('log1');
    });

    it('should throw error on invalid import data', async () => {
      await expect(storageService.importLogs('invalid json')).rejects.toThrow(
        'Invalid import data format',
      );
    });
  });
});
