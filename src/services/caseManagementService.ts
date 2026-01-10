/**
 * ERA III: Case Management Service
 *
 * This service manages repair cases - the "clinical electronic cases" that form
 * the memory and learning foundation of iaRealidad.
 *
 * Each case documents:
 * - Symptoms and diagnosis
 * - Repair process and outcomes
 * - Costs and time
 * - Learning data for future repairs
 *
 * Cases enable:
 * - Historical pattern matching
 * - Success rate tracking
 * - Cost estimation
 * - Community knowledge sharing (ERA IV)
 */

import {
  RepairCase,
  Symptom,
  DiagnosticResult,
  RepairStep,
  ComponentReplacement,
  ValidationTest,
  ValidationResult,
  HistoricalPatternMatch,
  FailurePattern,
} from '../types';

class CaseManagementService {
  private cases: Map<string, RepairCase> = new Map();
  private caseCounter: number = 1;

  // ==================== CASE CREATION ====================

  /**
   * Create a new repair case
   */
  createCase(
    boardType: string,
    symptoms: Symptom[],
    diagnosticResult: DiagnosticResult,
    boardId?: string,
  ): RepairCase {
    const caseId = `case_${Date.now()}_${this.caseCounter}`;
    const caseNumber = this.caseCounter++;

    const newCase: RepairCase = {
      id: caseId,
      caseNumber,
      timestamp: new Date().toISOString(),
      boardType,
      boardId,
      symptoms,
      failurePattern: diagnosticResult.failurePattern,
      diagnosticResult,
      repairSteps: [],
      repairSuccess: false,
      estimatedCost: diagnosticResult.estimatedCost,
      estimatedTime: diagnosticResult.estimatedTime,
      tags: this.generateTags(
        boardType,
        diagnosticResult.failurePattern,
        symptoms,
      ),
    };

    this.cases.set(caseId, newCase);
    return newCase;
  }

  /**
   * Get a case by ID
   */
  getCase(caseId: string): RepairCase | undefined {
    return this.cases.get(caseId);
  }

  /**
   * Get a case by case number
   */
  getCaseByNumber(caseNumber: number): RepairCase | undefined {
    return Array.from(this.cases.values()).find(
      c => c.caseNumber === caseNumber,
    );
  }

  /**
   * Get all cases
   */
  getAllCases(): RepairCase[] {
    return Array.from(this.cases.values());
  }

  // ==================== CASE UPDATES ====================

  /**
   * Add a repair step to a case
   */
  addRepairStep(caseId: string, step: RepairStep): boolean {
    const repairCase = this.cases.get(caseId);
    if (!repairCase) {
      return false;
    }

    repairCase.repairSteps.push(step);
    return true;
  }

  /**
   * Record a component replacement
   */
  recordComponentReplacement(
    caseId: string,
    replacement: ComponentReplacement,
  ): boolean {
    const repairCase = this.cases.get(caseId);
    if (!repairCase) {
      return false;
    }

    if (!repairCase.replacedComponents) {
      repairCase.replacedComponents = [];
    }
    repairCase.replacedComponents.push(replacement);

    // Update actual cost
    if (repairCase.actualCost !== undefined) {
      repairCase.actualCost += replacement.cost;
    } else {
      repairCase.actualCost = replacement.cost;
    }

    return true;
  }

  /**
   * Complete a repair case with validation results
   */
  completeCase(
    caseId: string,
    validationTest: ValidationTest,
    validationResult: ValidationResult,
    actualTime?: number,
    notes?: string,
  ): boolean {
    const repairCase = this.cases.get(caseId);
    if (!repairCase) {
      return false;
    }

    repairCase.validationTest = validationTest;
    repairCase.validationResult = validationResult;
    repairCase.repairSuccess = validationResult.passed;
    repairCase.actualTime = actualTime;

    if (notes) {
      repairCase.technicianNotes = notes;
    }

    return true;
  }

  /**
   * Add learning metadata to a case
   */
  addLearningData(
    caseId: string,
    rootCause?: string,
    preventiveMeasures?: string[],
    clientSource?: string,
    futureRiskProbability?: number,
  ): boolean {
    const repairCase = this.cases.get(caseId);
    if (!repairCase) {
      return false;
    }

    if (rootCause) {
      repairCase.rootCause = rootCause;
    }
    if (preventiveMeasures) {
      repairCase.preventiveMeasures = preventiveMeasures;
    }
    if (clientSource) {
      repairCase.clientSource = clientSource;
    }
    if (futureRiskProbability !== undefined) {
      repairCase.futureRiskProbability = futureRiskProbability;
    }

    return true;
  }

  // ==================== CASE SEARCH & ANALYSIS ====================

  /**
   * Search cases by board type
   */
  searchByBoardType(boardType: string): RepairCase[] {
    return Array.from(this.cases.values()).filter(c =>
      c.boardType.toLowerCase().includes(boardType.toLowerCase()),
    );
  }

  /**
   * Search cases by failure pattern
   */
  searchByFailurePattern(pattern: FailurePattern): RepairCase[] {
    return Array.from(this.cases.values()).filter(
      c => c.failurePattern === pattern,
    );
  }

  /**
   * Search cases by tags
   */
  searchByTag(tag: string): RepairCase[] {
    return Array.from(this.cases.values()).filter(c =>
      c.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase())),
    );
  }

  /**
   * Find similar cases based on symptoms and board type
   */
  findSimilarCases(
    boardType: string,
    symptoms: Symptom[],
    limit: number = 5,
  ): HistoricalPatternMatch[] {
    const allCases = Array.from(this.cases.values());
    const matches: HistoricalPatternMatch[] = [];

    for (const existingCase of allCases) {
      const similarity = this.calculateSimilarity(
        boardType,
        symptoms,
        existingCase,
      );

      if (similarity > 30) {
        // Minimum 30% similarity
        const matchingSymptoms = this.findMatchingSymptoms(
          symptoms,
          existingCase.symptoms,
        );

        matches.push({
          caseId: existingCase.id,
          caseNumber: existingCase.caseNumber,
          similarity,
          matchingSymptoms,
          boardType: existingCase.boardType,
          repairSuccess: existingCase.repairSuccess,
          resolution: this.summarizeResolution(existingCase),
          cost: existingCase.actualCost || existingCase.estimatedCost,
          timeToRepair: existingCase.actualTime || existingCase.estimatedTime,
        });
      }
    }

    // Sort by similarity (highest first) and limit results
    return matches.sort((a, b) => b.similarity - a.similarity).slice(0, limit);
  }

  /**
   * Calculate similarity between current issue and existing case
   */
  private calculateSimilarity(
    boardType: string,
    symptoms: Symptom[],
    existingCase: RepairCase,
  ): number {
    let similarity = 0;

    // Board type match (30% weight)
    if (boardType.toLowerCase() === existingCase.boardType.toLowerCase()) {
      similarity += 30;
    } else if (
      existingCase.boardType.toLowerCase().includes(boardType.toLowerCase())
    ) {
      similarity += 15;
    }

    // Symptom matching (70% weight)
    const matchingSymptoms = this.findMatchingSymptoms(
      symptoms,
      existingCase.symptoms,
    );
    const symptomSimilarity =
      (matchingSymptoms.length /
        Math.max(symptoms.length, existingCase.symptoms.length)) *
      70;
    similarity += symptomSimilarity;

    return Math.round(similarity);
  }

  /**
   * Find matching symptoms between two lists
   */
  private findMatchingSymptoms(
    symptoms1: Symptom[],
    symptoms2: Symptom[],
  ): string[] {
    const matches: string[] = [];

    for (const s1 of symptoms1) {
      for (const s2 of symptoms2) {
        if (s1.type === s2.type) {
          matches.push(`${s1.type}: ${s1.description}`);
        }
      }
    }

    return matches;
  }

  /**
   * Summarize the resolution of a case
   */
  private summarizeResolution(repairCase: RepairCase): string {
    if (!repairCase.repairSuccess) {
      return 'Repair unsuccessful';
    }

    const components = repairCase.replacedComponents || [];
    if (components.length === 0) {
      return 'Resolved without component replacement';
    }

    if (components.length === 1) {
      return `Replaced ${components[0].componentType}`;
    }

    return `Replaced ${components.length} components`;
  }

  // ==================== STATISTICS & ANALYTICS ====================

  /**
   * Get success rate for a specific failure pattern
   */
  getSuccessRateForPattern(pattern: FailurePattern): number {
    const casesWithPattern = this.searchByFailurePattern(pattern);
    if (casesWithPattern.length === 0) {
      return 0;
    }

    const successfulCases = casesWithPattern.filter(
      c => c.repairSuccess,
    ).length;
    return Math.round((successfulCases / casesWithPattern.length) * 100);
  }

  /**
   * Get average repair time for a failure pattern
   */
  getAverageRepairTime(pattern: FailurePattern): number {
    const casesWithPattern = this.searchByFailurePattern(pattern);
    const casesWithTime = casesWithPattern.filter(
      c => c.actualTime !== undefined,
    );

    if (casesWithTime.length === 0) {
      return 0;
    }

    const totalTime = casesWithTime.reduce(
      (sum, c) => sum + (c.actualTime || 0),
      0,
    );
    return Math.round(totalTime / casesWithTime.length);
  }

  /**
   * Get average repair cost for a failure pattern
   */
  getAverageRepairCost(pattern: FailurePattern): number {
    const casesWithPattern = this.searchByFailurePattern(pattern);
    const casesWithCost = casesWithPattern.filter(
      c => c.actualCost !== undefined,
    );

    if (casesWithCost.length === 0) {
      return 0;
    }

    const totalCost = casesWithCost.reduce(
      (sum, c) => sum + (c.actualCost || 0),
      0,
    );
    return Math.round((totalCost / casesWithCost.length) * 100) / 100;
  }

  /**
   * Get most common failure patterns
   */
  getMostCommonFailures(
    limit: number = 5,
  ): {pattern: FailurePattern; count: number}[] {
    const patternCounts = new Map<FailurePattern, number>();

    for (const repairCase of this.cases.values()) {
      const count = patternCounts.get(repairCase.failurePattern) || 0;
      patternCounts.set(repairCase.failurePattern, count + 1);
    }

    return Array.from(patternCounts.entries())
      .map(([pattern, count]) => ({pattern, count}))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Get component failure statistics
   */
  getComponentFailureStats(): Map<string, number> {
    const componentFailures = new Map<string, number>();

    for (const repairCase of this.cases.values()) {
      if (repairCase.replacedComponents) {
        for (const replacement of repairCase.replacedComponents) {
          const count = componentFailures.get(replacement.componentType) || 0;
          componentFailures.set(replacement.componentType, count + 1);
        }
      }
    }

    return componentFailures;
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Generate tags for a case
   */
  private generateTags(
    boardType: string,
    failurePattern: FailurePattern,
    symptoms: Symptom[],
  ): string[] {
    const tags: string[] = [];

    // Add board type
    tags.push(boardType.toLowerCase());

    // Add failure pattern
    tags.push(failurePattern);

    // Add symptom types
    const symptomTypes = new Set(symptoms.map(s => s.type));
    tags.push(...Array.from(symptomTypes));

    // Add severity if critical
    const hasCritical = symptoms.some(s => s.severity === 'critical');
    if (hasCritical) {
      tags.push('critical');
    }

    return tags;
  }

  /**
   * Export a case as JSON
   */
  exportCase(caseId: string): string | null {
    const repairCase = this.cases.get(caseId);
    if (!repairCase) {
      return null;
    }

    return JSON.stringify(repairCase, null, 2);
  }

  /**
   * Import a case from JSON
   */
  importCase(caseJson: string): RepairCase | null {
    try {
      const repairCase = JSON.parse(caseJson) as RepairCase;
      this.cases.set(repairCase.id, repairCase);

      // Update counter if needed
      if (repairCase.caseNumber >= this.caseCounter) {
        this.caseCounter = repairCase.caseNumber + 1;
      }

      return repairCase;
    } catch (error) {
      console.error('Failed to import case:', error);
      return null;
    }
  }

  /**
   * Delete a case
   */
  deleteCase(caseId: string): boolean {
    return this.cases.delete(caseId);
  }

  /**
   * Get total number of cases
   */
  getTotalCases(): number {
    return this.cases.size;
  }

  /**
   * Clear all cases (for testing)
   */
  clearAllCases(): void {
    this.cases.clear();
    this.caseCounter = 1;
  }
}

// Export singleton instance
export const caseManagementService = new CaseManagementService();
export default caseManagementService;
