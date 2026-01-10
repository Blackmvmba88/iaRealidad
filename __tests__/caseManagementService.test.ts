/**
 * Tests for ERA III Case Management Service
 */

import caseManagementService from '../src/services/caseManagementService';
import {
  Symptom,
  DiagnosticResult,
  RepairStep,
  ComponentReplacement,
  ValidationTest,
  ValidationResult,
} from '../src/types';

describe('CaseManagementService', () => {
  beforeEach(() => {
    // Clear all cases before each test
    caseManagementService.clearAllCases();
  });

  describe('createCase', () => {
    it('should create a new repair case', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V',
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

      const repairCase = caseManagementService.createCase(
        'ESP32 DevKit V1',
        symptoms,
        diagnosticResult,
        'board_001',
      );

      expect(repairCase.id).toBeDefined();
      expect(repairCase.caseNumber).toBe(1);
      expect(repairCase.boardType).toBe('ESP32 DevKit V1');
      expect(repairCase.boardId).toBe('board_001');
      expect(repairCase.failurePattern).toBe('voltage_regulator_failure');
      expect(repairCase.repairSuccess).toBe(false);
      expect(repairCase.tags).toBeDefined();
    });

    it('should auto-increment case numbers', () => {
      const symptoms: Symptom[] = [
        {id: 'symptom_1', type: 'no_voltage', description: 'Problem', severity: 'high'},
      ];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'no_power',
        confidence: 75,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'easy',
        estimatedTime: 15,
        estimatedCost: 0.5,
      };

      const case1 = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const case2 = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const case3 = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      expect(case1.caseNumber).toBe(1);
      expect(case2.caseNumber).toBe(2);
      expect(case3.caseNumber).toBe(3);
    });

    it('should generate appropriate tags', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'Critical problem',
          severity: 'critical',
        },
        {
          id: 'symptom_2',
          type: 'overheating',
          description: 'Hot component',
          severity: 'high',
        },
      ];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('Arduino Uno', symptoms, diagnosticResult);

      expect(repairCase.tags).toContain('arduino uno');
      expect(repairCase.tags).toContain('voltage_regulator_failure');
      expect(repairCase.tags).toContain('no_voltage');
      expect(repairCase.tags).toContain('overheating');
      expect(repairCase.tags).toContain('critical');
    });
  });

  describe('getCase', () => {
    it('should retrieve a case by ID', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'no_power',
        confidence: 75,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'easy',
        estimatedTime: 15,
        estimatedCost: 0.5,
      };

      const created = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const retrieved = caseManagementService.getCase(created.id);

      expect(retrieved).toBeDefined();
      expect(retrieved?.id).toBe(created.id);
    });

    it('should return undefined for non-existent case', () => {
      const retrieved = caseManagementService.getCase('nonexistent');
      expect(retrieved).toBeUndefined();
    });
  });

  describe('getCaseByNumber', () => {
    it('should retrieve a case by case number', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'no_power',
        confidence: 75,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'easy',
        estimatedTime: 15,
        estimatedCost: 0.5,
      };

      const created = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const retrieved = caseManagementService.getCaseByNumber(created.caseNumber);

      expect(retrieved).toBeDefined();
      expect(retrieved?.caseNumber).toBe(created.caseNumber);
    });
  });

  describe('addRepairStep', () => {
    it('should add repair steps to a case', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      const step: RepairStep = {
        id: 'step_1',
        order: 1,
        title: 'Measure voltage',
        description: 'Measure 3.3V rail',
        componentIds: ['regulator_1'],
        type: 'measure',
      };

      const success = caseManagementService.addRepairStep(repairCase.id, step);
      const updated = caseManagementService.getCase(repairCase.id);

      expect(success).toBe(true);
      expect(updated?.repairSteps.length).toBe(1);
      expect(updated?.repairSteps[0].title).toBe('Measure voltage');
    });
  });

  describe('recordComponentReplacement', () => {
    it('should record component replacements', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      const replacement: ComponentReplacement = {
        id: 'replace_1',
        componentId: 'regulator_1',
        componentType: 'AMS1117-3.3',
        reason: 'No output voltage',
        cost: 0.76,
      };

      const success = caseManagementService.recordComponentReplacement(
        repairCase.id,
        replacement,
      );
      const updated = caseManagementService.getCase(repairCase.id);

      expect(success).toBe(true);
      expect(updated?.replacedComponents?.length).toBe(1);
      expect(updated?.actualCost).toBe(0.76);
    });

    it('should accumulate costs for multiple replacements', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      caseManagementService.recordComponentReplacement(repairCase.id, {
        id: 'replace_1',
        componentId: 'regulator_1',
        componentType: 'AMS1117-3.3',
        reason: 'Failed',
        cost: 0.76,
      });

      caseManagementService.recordComponentReplacement(repairCase.id, {
        id: 'replace_2',
        componentId: 'cap_1',
        componentType: 'Capacitor 22uF',
        reason: 'Replace with regulator',
        cost: 0.15,
      });

      const updated = caseManagementService.getCase(repairCase.id);

      expect(updated?.actualCost).toBeCloseTo(0.91, 2);
    });
  });

  describe('completeCase', () => {
    it('should complete a case with validation results', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      const validationTest: ValidationTest = {
        id: 'test_1',
        name: 'Power validation',
        description: 'Check all voltages',
        measurementPoints: [],
        passCriteria: '3.3V present',
        failureActions: ['Recheck connections'],
      };

      const validationResult: ValidationResult = {
        id: 'result_1',
        timestamp: new Date().toISOString(),
        testId: 'test_1',
        testName: 'Power validation',
        passed: true,
        results: [],
      };

      const success = caseManagementService.completeCase(
        repairCase.id,
        validationTest,
        validationResult,
        45,
        'Replaced regulator successfully',
      );

      const updated = caseManagementService.getCase(repairCase.id);

      expect(success).toBe(true);
      expect(updated?.repairSuccess).toBe(true);
      expect(updated?.actualTime).toBe(45);
      expect(updated?.technicianNotes).toBe('Replaced regulator successfully');
    });
  });

  describe('addLearningData', () => {
    it('should add learning metadata to a case', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);

      const success = caseManagementService.addLearningData(
        repairCase.id,
        'Cheap power supply caused voltage spike',
        ['Use quality power supplies', 'Add protection circuit'],
        'Aliexpress cheap PSU',
        92,
      );

      const updated = caseManagementService.getCase(repairCase.id);

      expect(success).toBe(true);
      expect(updated?.rootCause).toBe('Cheap power supply caused voltage spike');
      expect(updated?.preventiveMeasures?.length).toBe(2);
      expect(updated?.clientSource).toBe('Aliexpress cheap PSU');
      expect(updated?.futureRiskProbability).toBe(92);
    });
  });

  describe('searchByBoardType', () => {
    it('should find cases by board type', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];
      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'no_power',
        confidence: 75,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'easy',
        estimatedTime: 15,
        estimatedCost: 0.5,
      };

      caseManagementService.createCase('ESP32 DevKit V1', symptoms, diagnosticResult);
      caseManagementService.createCase('ESP32 WROOM', symptoms, diagnosticResult);
      caseManagementService.createCase('Arduino Uno', symptoms, diagnosticResult);

      const esp32Cases = caseManagementService.searchByBoardType('ESP32');

      expect(esp32Cases.length).toBe(2);
    });
  });

  describe('searchByFailurePattern', () => {
    it('should find cases by failure pattern', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const diagnosticResult1: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const diagnosticResult2: DiagnosticResult = {
        ...diagnosticResult1,
        id: 'diag_2',
        failurePattern: 'firmware_corruption',
      };

      caseManagementService.createCase('ESP32', symptoms, diagnosticResult1);
      caseManagementService.createCase('ESP32', symptoms, diagnosticResult1);
      caseManagementService.createCase('ESP32', symptoms, diagnosticResult2);

      const regulatorCases = caseManagementService.searchByFailurePattern('voltage_regulator_failure');

      expect(regulatorCases.length).toBe(2);
    });
  });

  describe('findSimilarCases', () => {
    it('should find similar cases with high similarity score', () => {
      const symptoms: Symptom[] = [
        {id: 'symptom_1', type: 'no_voltage', description: 'No 3.3V', severity: 'critical'},
        {id: 'symptom_2', type: 'overheating', description: 'Hot regulator', severity: 'high'},
      ];

      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      // Create existing case
      caseManagementService.createCase('ESP32 DevKit', symptoms, diagnosticResult);

      // Search for similar case
      const similarCases = caseManagementService.findSimilarCases('ESP32 DevKit', symptoms);

      expect(similarCases.length).toBeGreaterThan(0);
      expect(similarCases[0].similarity).toBeGreaterThan(80);
    });

    it('should limit results to specified number', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'no_power',
        confidence: 75,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'easy',
        estimatedTime: 15,
        estimatedCost: 0.5,
      };

      // Create multiple cases
      for (let i = 0; i < 10; i++) {
        caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      }

      const similarCases = caseManagementService.findSimilarCases('ESP32', symptoms, 3);

      expect(similarCases.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Statistics', () => {
    it('should calculate success rate for failure pattern', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const validationTest: ValidationTest = {
        id: 'test_1',
        name: 'Test',
        description: 'Test',
        measurementPoints: [],
        passCriteria: 'Pass',
        failureActions: [],
      };

      // Create 3 successful and 1 failed repair
      for (let i = 0; i < 3; i++) {
        const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
        caseManagementService.completeCase(
          repairCase.id,
          validationTest,
          {
            id: 'result_1',
            timestamp: new Date().toISOString(),
            testId: 'test_1',
            testName: 'Test',
            passed: true,
            results: [],
          },
        );
      }

      const failedCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      caseManagementService.completeCase(
        failedCase.id,
        validationTest,
        {
          id: 'result_2',
          timestamp: new Date().toISOString(),
          testId: 'test_1',
          testName: 'Test',
          passed: false,
          results: [],
        },
      );

      const successRate = caseManagementService.getSuccessRateForPattern('voltage_regulator_failure');

      expect(successRate).toBe(75); // 3 out of 4
    });

    it('should get most common failures', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const createCaseWithPattern = (pattern: any) => {
        const diagnosticResult: DiagnosticResult = {
          id: `diag_${Date.now()}`,
          timestamp: new Date().toISOString(),
          symptoms,
          failurePattern: pattern,
          confidence: 75,
          probableCauses: [],
          affectedComponents: [],
          recommendations: [],
          estimatedDifficulty: 'easy',
          estimatedTime: 15,
          estimatedCost: 0.5,
        };
        caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      };

      // Create multiple cases with different patterns
      createCaseWithPattern('voltage_regulator_failure');
      createCaseWithPattern('voltage_regulator_failure');
      createCaseWithPattern('voltage_regulator_failure');
      createCaseWithPattern('firmware_corruption');
      createCaseWithPattern('firmware_corruption');
      createCaseWithPattern('no_power');

      const commonFailures = caseManagementService.getMostCommonFailures(3);

      expect(commonFailures.length).toBe(3);
      expect(commonFailures[0].pattern).toBe('voltage_regulator_failure');
      expect(commonFailures[0].count).toBe(3);
      expect(commonFailures[1].count).toBe(2);
    });
  });

  describe('Import/Export', () => {
    it('should export case as JSON', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const repairCase = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const exported = caseManagementService.exportCase(repairCase.id);

      expect(exported).toBeDefined();
      expect(typeof exported).toBe('string');
      
      const parsed = JSON.parse(exported!);
      expect(parsed.id).toBe(repairCase.id);
    });

    it('should import case from JSON', () => {
      const symptoms: Symptom[] = [{
        id: 'symptom_1',
        type: 'no_voltage',
        description: 'Test',
        severity: 'high',
      }];

      const diagnosticResult: DiagnosticResult = {
        id: 'diag_1',
        timestamp: new Date().toISOString(),
        symptoms,
        failurePattern: 'voltage_regulator_failure',
        confidence: 85,
        probableCauses: [],
        affectedComponents: [],
        recommendations: [],
        estimatedDifficulty: 'medium',
        estimatedTime: 30,
        estimatedCost: 1.5,
      };

      const original = caseManagementService.createCase('ESP32', symptoms, diagnosticResult);
      const exported = caseManagementService.exportCase(original.id)!;
      
      caseManagementService.clearAllCases();
      
      const imported = caseManagementService.importCase(exported);

      expect(imported).toBeDefined();
      expect(imported?.id).toBe(original.id);
      expect(imported?.caseNumber).toBe(original.caseNumber);
    });
  });
});
