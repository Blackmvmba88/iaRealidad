/**
 * ERA IV: Registry Service
 *
 * This service manages the plugin-based registry system for:
 * - Failure patterns (YAML)
 * - Board configurations (YAML)
 *
 * This enables community contributions without requiring code changes.
 * Contributors can add boards and patterns via simple YAML files.
 */

import {FailurePattern, FailureKnowledge, InferenceRule} from '../types';

// ==================== TYPES ====================

export interface BoardConfigYAML {
  name: string;
  version: string;
  description: string;
  board: {
    id: string;
    manufacturer: string;
    model: string;
    microcontroller: string;
  };
  specifications: {
    voltage: {
      input: {min: number; max: number; typical: number};
      output: {min: number; max: number; typical: number};
    };
    current: {
      typical: number;
      max: number;
    };
  };
  testPoints: Array<{
    id: string;
    name: string;
    type: 'VCC' | 'GND' | 'GPIO' | 'ANALOG' | 'DATA';
    position: {x: number; y: number};
    expectedVoltage?: number;
    tolerance?: number;
  }>;
  components: Array<{
    id: string;
    name: string;
    type: string;
    position: {x: number; y: number};
    description?: string;
  }>;
  commonFailures?: string[];
  tags?: string[];
}

export interface FailurePatternYAML {
  name: string;
  version: string;
  description: string;
  pattern: {
    id: FailurePattern;
    displayName: string;
    category: 'power' | 'communication' | 'component' | 'firmware' | 'other';
  };
  symptoms: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
  }>;
  causes: Array<{
    description: string;
    probability: number;
    reasoning: string;
    testProcedure?: string;
  }>;
  diagnosticSteps: string[];
  repairProcedures: Array<{
    description: string;
    tools: string[];
    steps: string[];
    warnings?: string[];
    estimatedTime: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  }>;
  estimatedCost: {min: number; max: number};
  successRate?: number;
  tags?: string[];
}

export interface RegistryEntry {
  id: string;
  type: 'board' | 'failure-pattern';
  name: string;
  version: string;
  source: 'builtin' | 'user' | 'community';
  addedDate: string;
  author?: string;
  verified: boolean;
}

// ==================== REGISTRY SERVICE ====================

class RegistryService {
  private boardConfigs: Map<string, BoardConfigYAML> = new Map();
  private failurePatterns: Map<string, FailurePatternYAML> = new Map();
  private registry: Map<string, RegistryEntry> = new Map();

  constructor() {
    this.loadBuiltinConfigurations();
  }

  // ==================== INITIALIZATION ====================

  /**
   * Load built-in configurations
   */
  private loadBuiltinConfigurations(): void {
    // Built-in boards and patterns are loaded from default configs
    // In production, these would be embedded or loaded from assets
  }

  // ==================== BOARD CONFIGURATION MANAGEMENT ====================

  /**
   * Add a board configuration from YAML
   */
  addBoardConfig(yaml: string, source: 'user' | 'community' = 'user', author?: string): {success: boolean; error?: string; id?: string} {
    try {
      const config = this.parseBoardYAML(yaml);
      const boardId = config.board.id;

      // Validate configuration
      const validation = this.validateBoardConfig(config);
      if (!validation.valid) {
        return {success: false, error: validation.error};
      }

      // Store configuration
      this.boardConfigs.set(boardId, config);

      // Add to registry
      const registryEntry: RegistryEntry = {
        id: boardId,
        type: 'board',
        name: config.name,
        version: config.version,
        source,
        addedDate: new Date().toISOString(),
        author,
        verified: source === 'builtin',
      };
      this.registry.set(boardId, registryEntry);

      return {success: true, id: boardId};
    } catch (error) {
      return {success: false, error: (error as Error).message};
    }
  }

  /**
   * Get a board configuration
   */
  getBoardConfig(boardId: string): BoardConfigYAML | undefined {
    return this.boardConfigs.get(boardId);
  }

  /**
   * Get all board configurations
   */
  getAllBoardConfigs(): BoardConfigYAML[] {
    return Array.from(this.boardConfigs.values());
  }

  /**
   * Remove a board configuration
   */
  removeBoardConfig(boardId: string): boolean {
    const removed = this.boardConfigs.delete(boardId);
    if (removed) {
      this.registry.delete(boardId);
    }
    return removed;
  }

  // ==================== FAILURE PATTERN MANAGEMENT ====================

  /**
   * Add a failure pattern from YAML
   */
  addFailurePattern(yaml: string, source: 'user' | 'community' = 'user', author?: string): {success: boolean; error?: string; id?: string} {
    try {
      const pattern = this.parseFailurePatternYAML(yaml);
      const patternId = pattern.pattern.id;

      // Validate pattern
      const validation = this.validateFailurePattern(pattern);
      if (!validation.valid) {
        return {success: false, error: validation.error};
      }

      // Store pattern
      this.failurePatterns.set(patternId, pattern);

      // Add to registry
      const registryEntry: RegistryEntry = {
        id: patternId,
        type: 'failure-pattern',
        name: pattern.name,
        version: pattern.version,
        source,
        addedDate: new Date().toISOString(),
        author,
        verified: source === 'builtin',
      };
      this.registry.set(`pattern_${patternId}`, registryEntry);

      return {success: true, id: patternId};
    } catch (error) {
      return {success: false, error: (error as Error).message};
    }
  }

  /**
   * Get a failure pattern
   */
  getFailurePattern(patternId: FailurePattern): FailurePatternYAML | undefined {
    return this.failurePatterns.get(patternId);
  }

  /**
   * Get all failure patterns
   */
  getAllFailurePatterns(): FailurePatternYAML[] {
    return Array.from(this.failurePatterns.values());
  }

  /**
   * Convert failure pattern YAML to FailureKnowledge
   */
  convertToFailureKnowledge(patternYAML: FailurePatternYAML): FailureKnowledge {
    return {
      id: `fk_${patternYAML.pattern.id}`,
      failurePattern: patternYAML.pattern.id,
      commonSymptoms: patternYAML.symptoms.map(s => s.description),
      typicalCauses: patternYAML.causes.map(c => c.description),
      diagnosticSteps: patternYAML.diagnosticSteps,
      repairProcedures: patternYAML.repairProcedures.map(r => r.description),
      requiredTools: patternYAML.repairProcedures.flatMap(r => r.tools),
      estimatedCost: patternYAML.estimatedCost,
      estimatedTime: {
        min: Math.min(...patternYAML.repairProcedures.map(r => r.estimatedTime)),
        max: Math.max(...patternYAML.repairProcedures.map(r => r.estimatedTime)),
      },
      successRate: patternYAML.successRate || 0,
      difficulty: patternYAML.repairProcedures[0]?.difficulty || 'medium',
      relatedCaseIds: [],
    };
  }

  /**
   * Remove a failure pattern
   */
  removeFailurePattern(patternId: FailurePattern): boolean {
    const removed = this.failurePatterns.delete(patternId);
    if (removed) {
      this.registry.delete(`pattern_${patternId}`);
    }
    return removed;
  }

  // ==================== REGISTRY QUERIES ====================

  /**
   * Get all registry entries
   */
  getRegistry(): RegistryEntry[] {
    return Array.from(this.registry.values());
  }

  /**
   * Get registry entries by type
   */
  getRegistryByType(type: 'board' | 'failure-pattern'): RegistryEntry[] {
    return Array.from(this.registry.values()).filter(e => e.type === type);
  }

  /**
   * Search registry
   */
  searchRegistry(query: string): RegistryEntry[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.registry.values()).filter(
      e =>
        e.name.toLowerCase().includes(lowerQuery) ||
        e.id.toLowerCase().includes(lowerQuery) ||
        e.author?.toLowerCase().includes(lowerQuery),
    );
  }

  // ==================== VALIDATION ====================

  /**
   * Validate board configuration
   */
  private validateBoardConfig(config: BoardConfigYAML): {valid: boolean; error?: string} {
    if (!config.board?.id) {
      return {valid: false, error: 'Board ID is required'};
    }
    if (!config.board?.manufacturer) {
      return {valid: false, error: 'Board manufacturer is required'};
    }
    if (!config.board?.model) {
      return {valid: false, error: 'Board model is required'};
    }
    if (!config.testPoints || config.testPoints.length === 0) {
      return {valid: false, error: 'At least one test point is required'};
    }
    return {valid: true};
  }

  /**
   * Validate failure pattern
   */
  private validateFailurePattern(pattern: FailurePatternYAML): {valid: boolean; error?: string} {
    if (!pattern.pattern?.id) {
      return {valid: false, error: 'Pattern ID is required'};
    }
    if (!pattern.symptoms || pattern.symptoms.length === 0) {
      return {valid: false, error: 'At least one symptom is required'};
    }
    if (!pattern.diagnosticSteps || pattern.diagnosticSteps.length === 0) {
      return {valid: false, error: 'Diagnostic steps are required'};
    }
    if (!pattern.repairProcedures || pattern.repairProcedures.length === 0) {
      return {valid: false, error: 'Repair procedures are required'};
    }
    return {valid: true};
  }

  // ==================== YAML PARSING ====================

  /**
   * Parse board YAML/JSON (supports both formats)
   */
  private parseBoardYAML(yaml: string): BoardConfigYAML {
    try {
      // In production, use a proper YAML parser like js-yaml
      // For now, we support JSON format (which is valid YAML)
      return JSON.parse(yaml) as BoardConfigYAML;
    } catch {
      throw new Error('Invalid JSON/YAML format for board configuration');
    }
  }

  /**
   * Parse failure pattern YAML/JSON (supports both formats)
   */
  private parseFailurePatternYAML(yaml: string): FailurePatternYAML {
    try {
      // In production, use a proper YAML parser like js-yaml
      // For now, we support JSON format (which is valid YAML)
      return JSON.parse(yaml) as FailurePatternYAML;
    } catch {
      throw new Error('Invalid JSON/YAML format for failure pattern');
    }
  }

  /**
   * Export board config to YAML string
   */
  exportBoardConfigYAML(boardId: string): string | null {
    const config = this.boardConfigs.get(boardId);
    if (!config) {
      return null;
    }
    // In production, use a proper YAML serializer
    return JSON.stringify(config, null, 2);
  }

  /**
   * Export failure pattern to YAML string
   */
  exportFailurePatternYAML(patternId: FailurePattern): string | null {
    const pattern = this.failurePatterns.get(patternId);
    if (!pattern) {
      return null;
    }
    // In production, use a proper YAML serializer
    return JSON.stringify(pattern, null, 2);
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Clear all registry data (for testing)
   */
  clearRegistry(): void {
    this.boardConfigs.clear();
    this.failurePatterns.clear();
    this.registry.clear();
  }

  /**
   * Get registry statistics
   */
  getRegistryStats(): {
    totalBoards: number;
    totalPatterns: number;
    userContributions: number;
    communityContributions: number;
    verifiedEntries: number;
  } {
    const entries = Array.from(this.registry.values());
    return {
      totalBoards: entries.filter(e => e.type === 'board').length,
      totalPatterns: entries.filter(e => e.type === 'failure-pattern').length,
      userContributions: entries.filter(e => e.source === 'user').length,
      communityContributions: entries.filter(e => e.source === 'community')
        .length,
      verifiedEntries: entries.filter(e => e.verified).length,
    };
  }
}

// Export singleton instance
export const registryService = new RegistryService();
export default registryService;
