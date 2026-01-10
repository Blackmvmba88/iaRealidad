/**
 * Tests for ERA III Diagnostic Service
 */

import diagnosticService from '../src/services/diagnosticService';
import {Symptom, FailurePattern} from '../src/types';

describe('DiagnosticService', () => {
  describe('diagnose', () => {
    it('should diagnose voltage regulator failure with no 3.3V', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V at regulator output',
          measuredValue: 0.1,
          expectedValue: 3.3,
          componentId: 'regulator_1',
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.failurePattern).toBe('voltage_regulator_failure');
      expect(result.confidence).toBeGreaterThan(70);
      expect(result.probableCauses.length).toBeGreaterThan(0);
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should diagnose firmware corruption with UART failure and good power', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_communication',
          description: 'UART not responding',
          componentId: 'uart_1',
          severity: 'high',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.failurePattern).toBe('firmware_corruption');
      expect(result.confidence).toBeGreaterThan(60);
    });

    it('should diagnose component overheating as short circuit', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'overheating',
          description: 'MOSFET heating in idle',
          componentId: 'mosfet_1',
          measuredValue: 85,
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.failurePattern).toBe('short_circuit');
      expect(result.confidence).toBeGreaterThan(75);
    });

    it('should include power route analysis for power issues', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V output from regulator',
          measuredValue: 0.0,
          expectedValue: 3.3,
          componentId: 'regulator_1',
          severity: 'critical',
        },
        {
          id: 'symptom_2',
          type: 'no_voltage',
          description: '5V input present',
          measuredValue: 5.1,
          expectedValue: 5.0,
          componentId: 'input',
          severity: 'low',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.powerRouteAnalysis).toBeDefined();
      expect(result.powerRouteAnalysis?.recommendations.length).toBeGreaterThan(
        0,
      );
    });

    it('should calculate higher confidence with multiple symptoms', () => {
      const singleSymptom: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V',
          severity: 'high',
        },
      ];

      const multipleSymptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V',
          severity: 'critical',
        },
        {
          id: 'symptom_2',
          type: 'overheating',
          description: 'Regulator hot',
          severity: 'high',
        },
      ];

      const result1 = diagnosticService.diagnose(singleSymptom);
      const result2 = diagnosticService.diagnose(multipleSymptoms);

      expect(result2.confidence).toBeGreaterThan(result1.confidence);
    });
  });

  describe('getFailureKnowledge', () => {
    it('should return knowledge for voltage regulator failure', () => {
      const knowledge = diagnosticService.getFailureKnowledge(
        'voltage_regulator_failure',
      );

      expect(knowledge).toBeDefined();
      expect(knowledge?.commonSymptoms.length).toBeGreaterThan(0);
      expect(knowledge?.typicalCauses.length).toBeGreaterThan(0);
      expect(knowledge?.diagnosticSteps.length).toBeGreaterThan(0);
      expect(knowledge?.repairProcedures.length).toBeGreaterThan(0);
    });

    it('should return knowledge for firmware corruption', () => {
      const knowledge = diagnosticService.getFailureKnowledge(
        'firmware_corruption',
      );

      expect(knowledge).toBeDefined();
      expect(knowledge?.difficulty).toBe('easy');
      expect(knowledge?.estimatedCost.min).toBe(0);
    });

    it('should return knowledge for microcontroller failure', () => {
      const knowledge = diagnosticService.getFailureKnowledge(
        'microcontroller_dead',
      );

      expect(knowledge).toBeDefined();
      expect(knowledge?.difficulty).toBe('hard');
      expect(knowledge?.estimatedCost.min).toBeGreaterThan(0);
    });

    it('should return undefined for unknown pattern', () => {
      const knowledge = diagnosticService.getFailureKnowledge(
        'unknown' as FailurePattern,
      );

      expect(knowledge).toBeUndefined();
    });
  });

  describe('analyzeMeasurementsForSymptoms', () => {
    it('should convert anomaly measurements to symptoms', () => {
      const measurements = [
        {
          id: 'meas_1',
          timestamp: new Date().toISOString(),
          sensorId: 'sensor_1',
          sensorType: 'bluetooth_multimeter' as const,
          value: 2.5,
          unit: 'V',
          componentId: 'regulator_1',
          anomalyDetected: true,
          anomalyType: 'out_of_range' as const,
          confidence: 85,
        },
      ];

      const symptoms =
        diagnosticService.analyzeMeasurementsForSymptoms(measurements);

      expect(symptoms.length).toBe(1);
      expect(symptoms[0].componentId).toBe('regulator_1');
      expect(symptoms[0].measuredValue).toBe(2.5);
    });

    it('should ignore measurements without anomalies', () => {
      const measurements = [
        {
          id: 'meas_1',
          timestamp: new Date().toISOString(),
          sensorId: 'sensor_1',
          sensorType: 'bluetooth_multimeter' as const,
          value: 3.3,
          unit: 'V',
          anomalyDetected: false,
        },
      ];

      const symptoms =
        diagnosticService.analyzeMeasurementsForSymptoms(measurements);

      expect(symptoms.length).toBe(0);
    });

    it('should infer severity from confidence level', () => {
      const measurements = [
        {
          id: 'meas_1',
          timestamp: new Date().toISOString(),
          sensorId: 'sensor_1',
          sensorType: 'temperature' as const,
          value: 95,
          unit: 'C',
          componentId: 'ic_1',
          anomalyDetected: true,
          anomalyType: 'out_of_range' as const,
          confidence: 90,
        },
      ];

      const symptoms =
        diagnosticService.analyzeMeasurementsForSymptoms(measurements);

      expect(symptoms[0].severity).toBe('critical');
    });
  });

  describe('createSymptom', () => {
    it('should create a symptom with all fields', () => {
      const symptom = diagnosticService.createSymptom(
        'no_voltage',
        'No power at VCC pin',
        'ic_1',
        0.0,
        3.3,
      );

      expect(symptom.id).toBeDefined();
      expect(symptom.type).toBe('no_voltage');
      expect(symptom.description).toBe('No power at VCC pin');
      expect(symptom.componentId).toBe('ic_1');
      expect(symptom.measuredValue).toBe(0.0);
      expect(symptom.expectedValue).toBe(3.3);
      expect(symptom.severity).toBe('medium');
    });
  });

  describe('Power Route Analysis', () => {
    it('should identify input power failure', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 5V input voltage',
          measuredValue: 0.0,
          expectedValue: 5.0,
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.powerRouteAnalysis).toBeDefined();
      expect(result.powerRouteAnalysis?.inputVoltage.present).toBe(false);
      expect(result.powerRouteAnalysis?.routeIntegrity).toBe('broken');
    });

    it('should identify regulator failure when input is good', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V from regulator',
          measuredValue: 0.1,
          expectedValue: 3.3,
          severity: 'critical',
        },
        {
          id: 'symptom_2',
          type: 'no_voltage',
          description: '5V input OK',
          measuredValue: 5.0,
          expectedValue: 5.0,
          severity: 'low',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.powerRouteAnalysis?.inputVoltage.present).toBe(true);
      expect(result.powerRouteAnalysis?.regulatorStatus.working).toBe(false);
      expect(result.powerRouteAnalysis?.suspectedFailurePoint).toBe(
        'voltage_regulator',
      );
    });
  });

  describe('Repair Recommendations', () => {
    it('should generate prioritized recommendations', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'No 3.3V output',
          measuredValue: 0.0,
          expectedValue: 3.3,
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.recommendations.length).toBeGreaterThan(0);

      // Check priority ordering
      for (let i = 0; i < result.recommendations.length - 1; i++) {
        expect(result.recommendations[i].priority).toBeLessThanOrEqual(
          result.recommendations[i + 1].priority,
        );
      }
    });

    it('should include tools and steps in recommendations', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'Regulator failure',
          severity: 'high',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);
      const firstRec = result.recommendations[0];

      expect(firstRec.tools).toBeDefined();
      expect(firstRec.tools.length).toBeGreaterThan(0);
      expect(firstRec.steps).toBeDefined();
      expect(firstRec.steps.length).toBeGreaterThan(0);
    });

    it('should include confidence scores in recommendations', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'overheating',
          description: 'Component overheating',
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      result.recommendations.forEach(rec => {
        expect(rec.confidence).toBeGreaterThan(0);
        expect(rec.confidence).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('Probable Causes', () => {
    it('should rank probable causes by probability', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'Regulator not working',
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.probableCauses.length).toBeGreaterThan(0);

      // Check probability decreases
      for (let i = 0; i < result.probableCauses.length - 1; i++) {
        expect(result.probableCauses[i].probability).toBeGreaterThanOrEqual(
          result.probableCauses[i + 1].probability,
        );
      }
    });

    it('should include test procedures for causes', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_communication',
          description: 'UART failure',
          severity: 'high',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      result.probableCauses.forEach(cause => {
        expect(cause.testProcedure).toBeDefined();
        expect(cause.reasoning).toBeDefined();
      });
    });
  });

  describe('Diagnostic Metadata', () => {
    it('should include estimated difficulty', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'Power issue',
          severity: 'high',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.estimatedDifficulty).toBeDefined();
      expect(['easy', 'medium', 'hard', 'expert']).toContain(
        result.estimatedDifficulty,
      );
    });

    it('should include time and cost estimates', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'overheating',
          description: 'Component failure',
          severity: 'critical',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.estimatedTime).toBeGreaterThan(0);
      expect(result.estimatedCost).toBeGreaterThanOrEqual(0);
    });

    it('should include affected components', () => {
      const symptoms: Symptom[] = [
        {
          id: 'symptom_1',
          type: 'no_voltage',
          description: 'Problem',
          componentId: 'component_1',
          severity: 'high',
        },
        {
          id: 'symptom_2',
          type: 'overheating',
          description: 'Problem',
          componentId: 'component_2',
          severity: 'high',
        },
      ];

      const result = diagnosticService.diagnose(symptoms);

      expect(result.affectedComponents).toContain('component_1');
      expect(result.affectedComponents).toContain('component_2');
      expect(result.affectedComponents.length).toBe(2);
    });
  });
});
