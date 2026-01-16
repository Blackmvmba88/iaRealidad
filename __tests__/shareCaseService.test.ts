/**
 * Tests for Share Case Service
 */

import shareCaseService from '../src/services/shareCaseService';
import caseManagementService from '../src/services/caseManagementService';
import {Symptom, DiagnosticResult} from '../src/types';

describe('ShareCaseService', () => {
  beforeEach(() => {
    // Clear all cases before each test
    caseManagementService.clearAllCases();
  });

  // Helper to create a test case
  const createTestCase = () => {
    const symptoms: Symptom[] = [
      {
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'No 3.3V output',
        severity: 'critical',
      },
    ];

    const diagnosticResult: DiagnosticResult = {
      id: 'diag_1',
      timestamp: new Date().toISOString(),
      symptoms,
      failurePattern: 'voltage_regulator_failure',
      confidence: 85,
      probableCauses: [],
      affectedComponents: ['regulator_1'],
      recommendations: [],
      estimatedDifficulty: 'medium',
      estimatedTime: 30,
      estimatedCost: 1.5,
    };

    return caseManagementService.createCase(
      'ESP32 DevKit V1',
      symptoms,
      diagnosticResult,
      'board_001',
    );
  };

  describe('createCasePackage', () => {
    it('should create a package for a single case', () => {
      const repairCase = createTestCase();

      const pkg = shareCaseService.createCasePackage([repairCase.id]);

      expect(pkg).toBeDefined();
      expect(pkg?.cases).toHaveLength(1);
      expect(pkg?.metadata.totalCases).toBe(1);
      expect(pkg?.metadata.boardTypes).toContain('ESP32 DevKit V1');
    });

    it('should create a package for multiple cases', () => {
      const case1 = createTestCase();
      const case2 = createTestCase();

      const pkg = shareCaseService.createCasePackage([case1.id, case2.id]);

      expect(pkg).toBeDefined();
      expect(pkg?.cases).toHaveLength(2);
      expect(pkg?.metadata.totalCases).toBe(2);
    });

    it('should include author and description', () => {
      const repairCase = createTestCase();

      const pkg = shareCaseService.createCasePackage(
        [repairCase.id],
        'John Doe',
        'Test description',
      );

      expect(pkg?.author).toBe('John Doe');
      expect(pkg?.description).toBe('Test description');
    });

    it('should extract metadata correctly', () => {
      const case1 = createTestCase();

      const pkg = shareCaseService.createCasePackage([case1.id]);

      expect(pkg?.metadata.boardTypes).toContain('ESP32 DevKit V1');
      expect(pkg?.metadata.failurePatterns).toContain(
        'voltage_regulator_failure',
      );
    });

    it('should return null for empty case list', () => {
      const pkg = shareCaseService.createCasePackage([]);

      expect(pkg).toBeNull();
    });

    it('should return null for non-existent cases', () => {
      const pkg = shareCaseService.createCasePackage(['non_existent_id']);

      expect(pkg).toBeNull();
    });
  });

  describe('shareCase', () => {
    it('should share a case as JSON', () => {
      const repairCase = createTestCase();

      const result = shareCaseService.shareCase(repairCase.id, {
        format: 'json',
      });

      expect(result.success).toBe(true);
      expect(result.format).toBe('json');
      expect(result.data).toContain('ESP32 DevKit V1');
      expect(result.size).toBeGreaterThan(0);
    });

    it('should share a case as data URI', () => {
      const repairCase = createTestCase();

      const result = shareCaseService.shareCase(repairCase.id, {
        format: 'datauri',
      });

      expect(result.success).toBe(true);
      expect(result.format).toBe('datauri');
      expect(result.data).toMatch(/^data:application\/json;base64,/);
    });

    it('should share a case as QR format', () => {
      const repairCase = createTestCase();

      const result = shareCaseService.shareCase(repairCase.id, {
        format: 'qr',
      });

      expect(result.success).toBe(true);
      expect(result.format).toBe('qr');
      // QR format should be smaller
      expect(result.size).toBeLessThan(1000);
    });

    it('should fail for non-existent case', () => {
      const result = shareCaseService.shareCase('non_existent', {
        format: 'json',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Case not found');
    });

    it('should compress JSON when requested', () => {
      const repairCase = createTestCase();

      const uncompressed = shareCaseService.shareCase(repairCase.id, {
        format: 'json',
        compress: false,
      });

      const compressed = shareCaseService.shareCase(repairCase.id, {
        format: 'json',
        compress: true,
      });

      expect(compressed.size).toBeLessThan(uncompressed.size);
    });
  });

  describe('shareCases', () => {
    it('should share multiple cases', () => {
      const case1 = createTestCase();
      const case2 = createTestCase();

      const result = shareCaseService.shareCases(
        [case1.id, case2.id],
        'Author',
        'Description',
        {format: 'json'},
      );

      expect(result.success).toBe(true);
      expect(result.data).toContain('Author');
      expect(result.data).toContain('Description');
    });

    it('should fail when no cases found', () => {
      const result = shareCaseService.shareCases(['non_existent'], undefined, undefined, {
        format: 'json',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('No cases found');
    });
  });

  describe('importSharedPackage', () => {
    it('should import a JSON package', () => {
      const repairCase = createTestCase();
      const shareResult = shareCaseService.shareCase(repairCase.id, {
        format: 'json',
      });

      // Clear cases to simulate fresh import
      caseManagementService.clearAllCases();

      const importResult = shareCaseService.importSharedPackage(
        shareResult.data,
      );

      expect(importResult.success).toBe(true);
      expect(importResult.imported).toBe(1);
      expect(importResult.failed).toBe(0);
      expect(importResult.packageId).toBeDefined();
    });

    it('should import a data URI package', () => {
      const repairCase = createTestCase();
      const shareResult = shareCaseService.shareCase(repairCase.id, {
        format: 'datauri',
      });

      // Clear cases
      caseManagementService.clearAllCases();

      const importResult = shareCaseService.importSharedPackage(
        shareResult.data,
      );

      expect(importResult.success).toBe(true);
      expect(importResult.imported).toBe(1);
    });

    it('should fail for invalid JSON', () => {
      const importResult = shareCaseService.importSharedPackage(
        'invalid json',
      );

      expect(importResult.success).toBe(false);
      expect(importResult.error).toBeDefined();
    });

    it('should fail for invalid package structure', () => {
      const invalidPackage = JSON.stringify({invalid: 'structure'});

      const importResult = shareCaseService.importSharedPackage(invalidPackage);

      expect(importResult.success).toBe(false);
      expect(importResult.error).toContain('Invalid package');
    });

    it('should import multiple cases', () => {
      const case1 = createTestCase();
      const case2 = createTestCase();

      const shareResult = shareCaseService.shareCases([case1.id, case2.id]);

      // Clear cases
      caseManagementService.clearAllCases();

      const importResult = shareCaseService.importSharedPackage(
        shareResult.data,
      );

      expect(importResult.success).toBe(true);
      expect(importResult.imported).toBe(2);
      expect(importResult.failed).toBe(0);
    });
  });

  describe('generateShareLink', () => {
    it('should generate a shareable link', () => {
      const repairCase = createTestCase();

      const link = shareCaseService.generateShareLink(repairCase.id);

      expect(link).toBeDefined();
      expect(link).toMatch(/^data:application\/json;base64,/);
    });

    it('should return null for non-existent case', () => {
      const link = shareCaseService.generateShareLink('non_existent');

      expect(link).toBeNull();
    });

    it('should generate link for multiple cases', () => {
      const case1 = createTestCase();
      const case2 = createTestCase();

      const link = shareCaseService.generateShareLinkMultiple([
        case1.id,
        case2.id,
      ]);

      expect(link).toBeDefined();
      expect(link).toMatch(/^data:application\/json;base64,/);
    });
  });

  describe('previewSharedPackage', () => {
    it('should preview a package without importing', () => {
      const repairCase = createTestCase();
      const shareResult = shareCaseService.shareCase(repairCase.id, {
        format: 'json',
      });

      const preview = shareCaseService.previewSharedPackage(shareResult.data);

      expect(preview.success).toBe(true);
      expect(preview.totalCases).toBe(1);
      expect(preview.boardTypes).toContain('ESP32 DevKit V1');
      expect(preview.packageId).toBeDefined();
    });

    it('should preview data URI package', () => {
      const repairCase = createTestCase();
      const shareResult = shareCaseService.shareCase(repairCase.id, {
        format: 'datauri',
      });

      const preview = shareCaseService.previewSharedPackage(shareResult.data);

      expect(preview.success).toBe(true);
      expect(preview.totalCases).toBe(1);
    });

    it('should include author and description in preview', () => {
      const repairCase = createTestCase();
      const shareResult = shareCaseService.shareCases(
        [repairCase.id],
        'Test Author',
        'Test Description',
      );

      const preview = shareCaseService.previewSharedPackage(shareResult.data);

      expect(preview.author).toBe('Test Author');
      expect(preview.description).toBe('Test Description');
    });

    it('should fail for invalid package', () => {
      const preview = shareCaseService.previewSharedPackage('invalid');

      expect(preview.success).toBe(false);
      expect(preview.error).toBeDefined();
    });
  });

  describe('getPackageStats', () => {
    it('should calculate package statistics', () => {
      const case1 = createTestCase();
      // Mark case as successful with cost and time
      caseManagementService.completeCase(
        case1.id,
        {
          id: 'test_1',
          name: 'Test',
          description: 'Test',
          measurementPoints: [],
          passCriteria: 'Test',
          failureActions: [],
        },
        {
          id: 'result_1',
          timestamp: new Date().toISOString(),
          testId: 'test_1',
          testName: 'Test',
          passed: true,
          results: [],
        },
        45, // actual time
      );

      const pkg = shareCaseService.createCasePackage([case1.id]);
      expect(pkg).toBeDefined();

      const stats = shareCaseService.getPackageStats(pkg!);

      expect(stats.totalCases).toBe(1);
      expect(stats.successRate).toBe(100);
      expect(stats.averageTime).toBe(45);
      expect(stats.uniqueBoards).toBe(1);
    });

    it('should handle multiple cases with mixed results', () => {
      const case1 = createTestCase();
      const case2 = createTestCase();

      // Complete first case successfully
      caseManagementService.completeCase(
        case1.id,
        {
          id: 'test_1',
          name: 'Test',
          description: 'Test',
          measurementPoints: [],
          passCriteria: 'Test',
          failureActions: [],
        },
        {
          id: 'result_1',
          timestamp: new Date().toISOString(),
          testId: 'test_1',
          testName: 'Test',
          passed: true,
          results: [],
        },
      );

      // Complete second case unsuccessfully
      caseManagementService.completeCase(
        case2.id,
        {
          id: 'test_2',
          name: 'Test',
          description: 'Test',
          measurementPoints: [],
          passCriteria: 'Test',
          failureActions: [],
        },
        {
          id: 'result_2',
          timestamp: new Date().toISOString(),
          testId: 'test_2',
          testName: 'Test',
          passed: false,
          results: [],
        },
      );

      const pkg = shareCaseService.createCasePackage([case1.id, case2.id]);
      expect(pkg).toBeDefined();

      const stats = shareCaseService.getPackageStats(pkg!);

      expect(stats.totalCases).toBe(2);
      expect(stats.successRate).toBe(50);
    });
  });

  describe('Round-trip Test', () => {
    it('should export and import cases successfully', () => {
      // Create original cases
      const case1 = createTestCase();
      const case2 = createTestCase();

      // Export
      const exported = shareCaseService.shareCases([case1.id, case2.id]);
      expect(exported.success).toBe(true);

      // Clear all cases
      caseManagementService.clearAllCases();
      expect(caseManagementService.getTotalCases()).toBe(0);

      // Import
      const imported = shareCaseService.importSharedPackage(exported.data);
      expect(imported.success).toBe(true);
      expect(imported.imported).toBe(2);

      // Verify cases exist
      expect(caseManagementService.getTotalCases()).toBe(2);
    });

    it('should preserve case data through export/import', () => {
      const originalCase = createTestCase();
      const originalData = caseManagementService.getCase(originalCase.id);

      // Export and import
      const exported = shareCaseService.shareCase(originalCase.id);
      caseManagementService.clearAllCases();
      shareCaseService.importSharedPackage(exported.data);

      // Get imported case
      const importedCase = caseManagementService.getCase(originalCase.id);

      expect(importedCase).toBeDefined();
      expect(importedCase?.boardType).toBe(originalData?.boardType);
      expect(importedCase?.failurePattern).toBe(originalData?.failurePattern);
      expect(importedCase?.symptoms).toHaveLength(
        originalData?.symptoms.length || 0,
      );
    });
  });
});
