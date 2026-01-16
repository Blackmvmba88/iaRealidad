/**
 * ERA III: Diagnostic Service
 *
 * This service provides intelligent diagnostic capabilities, transforming
 * iaRealidad from a tool into a semi-autonomous electronic mechanic.
 *
 * Core capabilities:
 * - Failure pattern detection
 * - Power route analysis
 * - Context-based inference
 * - Rule-based repair recommendations
 * - Historical pattern matching
 *
 * This is the "wisdom layer" that converts information into actionable intelligence.
 */

import {
  Symptom,
  DiagnosticResult,
  FailurePattern,
  ProbableCause,
  PowerRouteAnalysis,
  RepairRecommendation,
  InferenceRule,
  FailureKnowledge,
  SensingMeasurement,
} from '../types';

class DiagnosticService {
  private inferenceRules: InferenceRule[] = [];
  private failureKnowledgeBase: Map<FailurePattern, FailureKnowledge> =
    new Map();
  private diagnosticIdCounter: number = 0;

  constructor() {
    this.initializeInferenceRules();
    this.initializeFailureKnowledgeBase();
  }

  // ==================== INITIALIZATION ====================

  /**
   * Initialize inference rules for diagnostic reasoning
   */
  private initializeInferenceRules(): void {
    this.inferenceRules = [
      // Rule 1: No 3.3V usually means dead regulator
      {
        id: 'rule_001',
        name: 'No 3.3V - Regulator Failure',
        conditions: [
          {
            symptomType: 'no_voltage',
            measurementRange: {max: 0.5},
          },
        ],
        conclusion: {
          failurePattern: 'voltage_regulator_failure',
          confidence: 85,
          reasoning:
            'No 3.3V output typically indicates AMS1117 or similar regulator failure',
        },
        priority: 1,
      },
      // Rule 2: 5V present but 3.3V low suggests regulator problem
      {
        id: 'rule_002',
        name: 'Low 3.3V - Degraded Regulator',
        conditions: [
          {
            symptomType: 'low_voltage',
            measurementRange: {min: 1.0, max: 3.0},
          },
        ],
        conclusion: {
          failurePattern: 'voltage_regulator_failure',
          confidence: 75,
          reasoning:
            'Low 3.3V output suggests degraded or failing voltage regulator',
        },
        priority: 2,
      },
      // Rule 3: UART not responding with good power = firmware issue
      {
        id: 'rule_003',
        name: 'UART Dead with Power - Firmware Issue',
        conditions: [
          {
            symptomType: 'no_communication',
          },
        ],
        conclusion: {
          failurePattern: 'firmware_corruption',
          confidence: 70,
          reasoning:
            'UART not responding with proper power suggests firmware corruption or bootloader failure',
        },
        priority: 3,
      },
      // Rule 4: Component overheating in idle = short circuit
      {
        id: 'rule_004',
        name: 'Overheating in Idle - Short Circuit',
        conditions: [
          {
            symptomType: 'overheating',
          },
        ],
        conclusion: {
          failurePattern: 'short_circuit',
          confidence: 80,
          reasoning:
            'Component heating with no load indicates short circuit or damaged component',
        },
        priority: 1,
      },
      // Rule 5: No boot with power present
      {
        id: 'rule_005',
        name: 'No Boot - Microcontroller or Firmware',
        conditions: [
          {
            symptomType: 'no_communication',
          },
        ],
        conclusion: {
          failurePattern: 'microcontroller_dead',
          confidence: 65,
          reasoning:
            'Power present but no boot suggests dead microcontroller or corrupt firmware',
        },
        priority: 4,
      },
    ];
  }

  /**
   * Initialize failure knowledge base with common patterns
   */
  private initializeFailureKnowledgeBase(): void {
    // ESP32 Voltage Regulator Failure
    this.failureKnowledgeBase.set('voltage_regulator_failure', {
      id: 'fk_001',
      failurePattern: 'voltage_regulator_failure',
      commonSymptoms: [
        'No 3.3V output',
        'Low 3.3V output (< 3.0V)',
        'Regulator overheating',
        'No microcontroller activity',
      ],
      typicalCauses: [
        'Cheap/faulty power supply',
        'Input voltage spike',
        'Shorted output',
        'Component aging',
        'Poor soldering',
      ],
      diagnosticSteps: [
        'Measure input voltage (should be 4.5-6V for AMS1117)',
        'Measure output voltage (should be 3.3V ± 0.1V)',
        'Check regulator temperature',
        'Test with no load',
        'Check for shorts on 3.3V rail',
      ],
      repairProcedures: [
        'Replace voltage regulator (AMS1117-3.3)',
        'Replace input capacitor (typically 10µF)',
        'Replace output capacitor (typically 22µF)',
        'Check for board damage',
        'Test with known good power supply',
      ],
      requiredTools: [
        'Soldering iron',
        'Multimeter',
        'Hot air station (optional)',
        'Flux',
      ],
      estimatedCost: {min: 0.5, max: 2.0},
      estimatedTime: {min: 15, max: 45},
      successRate: 92,
      difficulty: 'medium',
      relatedCaseIds: [],
    });

    // Firmware Corruption
    this.failureKnowledgeBase.set('firmware_corruption', {
      id: 'fk_002',
      failurePattern: 'firmware_corruption',
      commonSymptoms: [
        'No UART response',
        'Boot loop',
        'Partial boot',
        'Random behavior',
      ],
      typicalCauses: [
        'Failed firmware upload',
        'Power loss during flashing',
        'Corrupted flash memory',
        'Wrong bootloader',
      ],
      diagnosticSteps: [
        'Verify power supply stability (3.3V)',
        'Check boot mode pins',
        'Monitor UART output during boot',
        'Try entering bootloader mode',
        'Test with external programmer',
      ],
      repairProcedures: [
        'Enter bootloader mode (hold BOOT, press RESET)',
        'Reflash firmware via UART',
        'Try different baud rate',
        'Use external programmer (JTAG/SWD)',
        'If hardware OK, flash known-good firmware',
      ],
      requiredTools: ['USB-UART adapter', 'Computer', 'Programming software'],
      estimatedCost: {min: 0, max: 0},
      estimatedTime: {min: 10, max: 30},
      successRate: 85,
      difficulty: 'easy',
      relatedCaseIds: [],
    });

    // Microcontroller Failure
    this.failureKnowledgeBase.set('microcontroller_dead', {
      id: 'fk_003',
      failurePattern: 'microcontroller_dead',
      commonSymptoms: [
        'No boot',
        'No communication on any interface',
        'Chip is hot or cold',
        'No current draw',
      ],
      typicalCauses: [
        'ESD damage',
        'Reverse voltage',
        'Overvoltage',
        'Manufacturing defect',
      ],
      diagnosticSteps: [
        'Verify 3.3V at VDD pins',
        'Check GND continuity',
        'Measure current consumption',
        'Test crystal oscillator (if present)',
        'Try external programmer',
      ],
      repairProcedures: [
        'Verify all power connections',
        'Test with external debugger',
        'If confirmed dead, replace microcontroller',
        'Check for board-level damage',
        'Consider board replacement if BGA package',
      ],
      requiredTools: ['Multimeter', 'Hot air station', 'Programmer/Debugger'],
      estimatedCost: {min: 2.0, max: 15.0},
      estimatedTime: {min: 30, max: 120},
      successRate: 60,
      difficulty: 'hard',
      relatedCaseIds: [],
    });

    // Power Supply Failure
    this.failureKnowledgeBase.set('power_supply_failure', {
      id: 'fk_004',
      failurePattern: 'power_supply_failure',
      commonSymptoms: [
        'No 5V at input',
        'Voltage drops under load',
        'USB port not working',
        'Fuse blown',
      ],
      typicalCauses: [
        'Dead USB cable',
        'Blown fuse',
        'Damaged diode',
        'Bad USB connector',
      ],
      diagnosticSteps: [
        'Test USB cable with other device',
        'Check fuse continuity',
        'Measure voltage at USB connector',
        'Check protection diode',
        'Look for physical damage',
      ],
      repairProcedures: [
        'Replace USB cable',
        'Replace blown fuse',
        'Replace protection diode',
        'Reflow USB connector',
        'Check for shorts before powering',
      ],
      requiredTools: ['Multimeter', 'Soldering iron', 'Known-good USB cable'],
      estimatedCost: {min: 0, max: 3.0},
      estimatedTime: {min: 5, max: 30},
      successRate: 90,
      difficulty: 'easy',
      relatedCaseIds: [],
    });
  }

  // ==================== DIAGNOSTIC ENGINE ====================

  /**
   * Perform comprehensive diagnosis based on symptoms
   */
  diagnose(symptoms: Symptom[]): DiagnosticResult {
    // Input validation
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      throw new Error('Invalid symptoms: must be a non-empty array');
    }

    // Validate each symptom has required fields
    symptoms.forEach((symptom, index) => {
      if (!symptom.id || !symptom.type || !symptom.description) {
        throw new Error(
          `Invalid symptom at index ${index}: missing required fields`,
        );
      }
    });

    const diagnosticId = `diag_${Date.now()}_${this.diagnosticIdCounter++}`;

    // Apply inference rules
    const matchedRules = this.applyInferenceRules(symptoms);

    // Determine failure pattern
    const failurePattern = this.determineFailurePattern(symptoms, matchedRules);

    // Calculate confidence
    const confidence = this.calculateConfidence(
      symptoms,
      failurePattern,
      matchedRules,
    );

    // Identify probable causes
    const probableCauses = this.identifyProbableCauses(
      failurePattern,
      symptoms,
    );

    // Analyze power route if relevant
    const powerRouteAnalysis = this.analyzePowerRoute(symptoms);

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      failurePattern,
      symptoms,
      probableCauses,
    );

    // Get affected components (optimized with Set for deduplication)
    const affectedComponents = Array.from(
      new Set(
        symptoms
          .map(s => s.componentId)
          .filter((id): id is string => id !== undefined),
      ),
    );

    // Estimate difficulty, time, and cost
    const knowledge = this.failureKnowledgeBase.get(failurePattern);

    return {
      id: diagnosticId,
      timestamp: new Date().toISOString(),
      symptoms,
      failurePattern,
      confidence,
      probableCauses,
      affectedComponents,
      powerRouteAnalysis,
      recommendations,
      estimatedDifficulty: knowledge?.difficulty || 'medium',
      estimatedTime: knowledge?.estimatedTime.min || 30,
      estimatedCost: knowledge?.estimatedCost.min || 1.0,
    };
  }

  /**
   * Apply inference rules to symptoms (optimized with early exits)
   */
  private applyInferenceRules(symptoms: Symptom[]): InferenceRule[] {
    const matchedRules: InferenceRule[] = [];

    // Early exit if no symptoms
    if (symptoms.length === 0) {
      return matchedRules;
    }

    // Optimize: Pre-index symptoms by type for faster lookup
    const symptomsByType = new Map<string, Symptom[]>();
    for (const symptom of symptoms) {
      const existing = symptomsByType.get(symptom.type) || [];
      existing.push(symptom);
      symptomsByType.set(symptom.type, existing);
    }

    for (const rule of this.inferenceRules) {
      let matches = true;

      for (const condition of rule.conditions) {
        // Use indexed lookup instead of full array scan
        const relevantSymptoms =
          symptomsByType.get(condition.symptomType) || [];

        const hasMatchingSymptom = relevantSymptoms.some(symptom => {
          if (
            condition.measurementRange &&
            symptom.measuredValue !== undefined
          ) {
            const value = symptom.measuredValue;
            const range = condition.measurementRange;

            if (range.min !== undefined && value < range.min) {
              return false;
            }
            if (range.max !== undefined && value > range.max) {
              return false;
            }
          }

          return true;
        });

        if (!hasMatchingSymptom) {
          matches = false;
          break;
        }
      }

      if (matches) {
        matchedRules.push(rule);
      }
    }

    // Sort by priority
    return matchedRules.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Determine the most likely failure pattern
   */
  private determineFailurePattern(
    symptoms: Symptom[],
    matchedRules: InferenceRule[],
  ): FailurePattern {
    if (matchedRules.length > 0) {
      return matchedRules[0].conclusion.failurePattern;
    }

    // Fallback: analyze symptoms directly
    const severeCritical = symptoms.filter(
      s => s.severity === 'critical',
    ).length;
    const hasNoVoltage = symptoms.some(s => s.type === 'no_voltage');
    const hasOverheating = symptoms.some(s => s.type === 'overheating');
    const hasNoCommunication = symptoms.some(
      s => s.type === 'no_communication',
    );

    if (hasNoVoltage) {
      return 'no_power';
    }
    if (hasOverheating) {
      return 'component_overheating';
    }
    if (hasNoCommunication && severeCritical === 0) {
      return 'communication_failure';
    }

    return 'unknown';
  }

  /**
   * Calculate diagnostic confidence
   */
  private calculateConfidence(
    symptoms: Symptom[],
    failurePattern: FailurePattern,
    matchedRules: InferenceRule[],
  ): number {
    let confidence = 50; // Base confidence

    // Add confidence based on matched rules
    if (matchedRules.length > 0) {
      confidence = matchedRules[0].conclusion.confidence;
    }

    // Adjust based on number of symptoms
    const symptomBonus = Math.min(symptoms.length * 5, 20);
    confidence += symptomBonus;

    // Adjust based on symptom severity
    const hasCritical = symptoms.some(s => s.severity === 'critical');
    if (hasCritical) {
      confidence += 10;
    }

    return Math.min(confidence, 95); // Cap at 95%
  }

  /**
   * Identify probable causes based on failure pattern
   */
  private identifyProbableCauses(
    failurePattern: FailurePattern,
    _symptoms: Symptom[],
  ): ProbableCause[] {
    const knowledge = this.failureKnowledgeBase.get(failurePattern);
    if (!knowledge) {
      return [];
    }

    const causes: ProbableCause[] = knowledge.typicalCauses.map(
      (cause, index) => ({
        id: `cause_${Date.now()}_${index}`,
        description: cause,
        probability: 80 - index * 15, // Decreasing probability
        reasoning: `Common cause for ${failurePattern}`,
        testProcedure: knowledge.diagnosticSteps[index] || 'Visual inspection',
      }),
    );

    return causes.slice(0, 3); // Return top 3 causes
  }

  /**
   * Analyze power route for power-related issues
   */
  private analyzePowerRoute(
    symptoms: Symptom[],
  ): PowerRouteAnalysis | undefined {
    const powerRelated = symptoms.some(
      s => s.type === 'no_voltage' || s.type === 'low_voltage',
    );

    if (!powerRelated) {
      return undefined;
    }

    // Check for input voltage symptom
    const inputVoltage = symptoms.find(
      s =>
        s.description.toLowerCase().includes('input') ||
        s.description.toLowerCase().includes('5v'),
    );

    // Check for regulator output symptom
    const regulatorOutput = symptoms.find(
      s =>
        s.description.toLowerCase().includes('3.3v') ||
        s.description.toLowerCase().includes('regulator'),
    );

    const analysis: PowerRouteAnalysis = {
      inputVoltage: {
        present: inputVoltage?.measuredValue
          ? inputVoltage.measuredValue > 4.0
          : false,
        value: inputVoltage?.measuredValue,
        expected: 5.0,
      },
      regulatorStatus: {
        working: regulatorOutput?.measuredValue
          ? regulatorOutput.measuredValue > 3.0
          : false,
        outputVoltage: regulatorOutput?.measuredValue,
      },
      microcontrollerPower: {
        present: regulatorOutput?.measuredValue
          ? regulatorOutput.measuredValue > 3.0
          : false,
        value: regulatorOutput?.measuredValue,
        expected: 3.3,
      },
      routeIntegrity: 'broken',
      recommendations: [],
    };

    // Generate recommendations based on analysis
    if (!analysis.inputVoltage.present) {
      analysis.recommendations.push('Check USB cable and power source');
      analysis.recommendations.push('Test fuse continuity');
      analysis.suspectedFailurePoint = 'power_input';
    } else if (!analysis.regulatorStatus.working) {
      analysis.recommendations.push('Replace voltage regulator');
      analysis.recommendations.push('Check for shorts on output rail');
      analysis.suspectedFailurePoint = 'voltage_regulator';
    }

    // Determine route integrity
    if (analysis.inputVoltage.present && analysis.regulatorStatus.working) {
      analysis.routeIntegrity = 'good';
    } else if (analysis.inputVoltage.present) {
      analysis.routeIntegrity = 'degraded';
    }

    return analysis;
  }

  /**
   * Generate repair recommendations
   */
  private generateRecommendations(
    failurePattern: FailurePattern,
    _symptoms: Symptom[],
    _probableCauses: ProbableCause[],
  ): RepairRecommendation[] {
    const knowledge = this.failureKnowledgeBase.get(failurePattern);
    if (!knowledge) {
      return [];
    }

    const recommendations: RepairRecommendation[] = [];

    // Create recommendations from repair procedures
    knowledge.repairProcedures.forEach((procedure, index) => {
      recommendations.push({
        id: `rec_${Date.now()}_${index}`,
        priority: index + 1,
        action: this.inferActionFromProcedure(procedure),
        description: procedure,
        tools: knowledge.requiredTools,
        steps: [procedure],
        expectedOutcome: `Resolve ${failurePattern}`,
        confidence: 85 - index * 10,
      });
    });

    return recommendations.slice(0, 5); // Top 5 recommendations
  }

  /**
   * Infer action type from procedure description
   */
  private inferActionFromProcedure(
    procedure: string,
  ): RepairRecommendation['action'] {
    const lower = procedure.toLowerCase();
    if (lower.includes('replace')) {
      return 'replace';
    }
    if (lower.includes('measure') || lower.includes('check')) {
      return 'measure';
    }
    if (lower.includes('test')) {
      return 'test';
    }
    if (lower.includes('reflow')) {
      return 'reflow';
    }
    if (lower.includes('clean')) {
      return 'clean';
    }
    if (lower.includes('flash') || lower.includes('program')) {
      return 'reprogram';
    }
    return 'test';
  }

  // ==================== HELPER METHODS ====================

  /**
   * Get failure knowledge for a specific pattern
   */
  getFailureKnowledge(pattern: FailurePattern): FailureKnowledge | undefined {
    return this.failureKnowledgeBase.get(pattern);
  }

  /**
   * Analyze sensing measurements and convert to symptoms
   */
  analyzeMeasurementsForSymptoms(
    measurements: SensingMeasurement[],
  ): Symptom[] {
    const symptoms: Symptom[] = [];

    measurements.forEach((measurement, index) => {
      if (measurement.anomalyDetected) {
        const symptom: Symptom = {
          id: `symptom_${Date.now()}_${index}`,
          type: this.mapAnomalyToSymptomType(measurement.anomalyType),
          componentId: measurement.componentId,
          pinId: measurement.pinId,
          measuredValue:
            typeof measurement.value === 'number'
              ? measurement.value
              : undefined,
          unit: measurement.unit,
          description: `Anomaly detected: ${measurement.anomalyType}`,
          severity: this.inferSeverity(measurement),
        };
        symptoms.push(symptom);
      }
    });

    return symptoms;
  }

  /**
   * Map anomaly type to symptom type
   */
  private mapAnomalyToSymptomType(anomalyType?: string): Symptom['type'] {
    switch (anomalyType) {
      case 'out_of_range':
        return 'low_voltage';
      case 'noise':
        return 'noise';
      case 'unstable':
        return 'intermittent';
      default:
        return 'no_voltage';
    }
  }

  /**
   * Infer severity from measurement
   */
  private inferSeverity(measurement: SensingMeasurement): Symptom['severity'] {
    if (measurement.confidence && measurement.confidence > 80) {
      return 'critical';
    }
    if (measurement.confidence && measurement.confidence > 60) {
      return 'high';
    }
    if (measurement.confidence && measurement.confidence > 40) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Create a symptom from user input
   */
  createSymptom(
    type: Symptom['type'],
    description: string,
    componentId?: string,
    measuredValue?: number,
    expectedValue?: number,
  ): Symptom {
    return {
      id: `symptom_${Date.now()}`,
      type,
      description,
      componentId,
      measuredValue,
      expectedValue,
      severity: 'medium',
    };
  }
}

// Export singleton instance
export const diagnosticService = new DiagnosticService();
export default diagnosticService;
