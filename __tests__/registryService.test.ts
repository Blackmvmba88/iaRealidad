/**
 * Tests for Registry Service
 */

import registryService from '../src/services/registryService';
import {FailurePattern} from '../src/types';

describe('RegistryService', () => {
  beforeEach(() => {
    // Clear registry before each test
    registryService.clearRegistry();
  });

  describe('Board Configuration Management', () => {
    const validBoardConfig = `{
      "name": "Test Board",
      "version": "1.0",
      "description": "Test board configuration",
      "board": {
        "id": "test_board_001",
        "manufacturer": "Test Manufacturer",
        "model": "Test Model",
        "microcontroller": "Test MCU"
      },
      "specifications": {
        "voltage": {
          "input": {"min": 4.5, "max": 6.0, "typical": 5.0},
          "output": {"min": 3.2, "max": 3.4, "typical": 3.3}
        },
        "current": {
          "typical": 80,
          "max": 500
        }
      },
      "testPoints": [
        {
          "id": "tp_5v",
          "name": "5V Input",
          "type": "VCC",
          "position": {"x": 50, "y": 100},
          "expectedVoltage": 5.0,
          "tolerance": 0.25
        }
      ],
      "components": [],
      "tags": ["test", "board"]
    }`;

    it('should add a valid board configuration', () => {
      const result = registryService.addBoardConfig(validBoardConfig, 'user');

      expect(result.success).toBe(true);
      expect(result.id).toBe('test_board_001');
      expect(result.error).toBeUndefined();
    });

    it('should reject board configuration without ID', () => {
      const invalidConfig = `{
        "name": "Invalid Board",
        "version": "1.0",
        "board": {
          "manufacturer": "Test",
          "model": "Test"
        },
        "testPoints": []
      }`;

      const result = registryService.addBoardConfig(invalidConfig, 'user');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject board configuration without test points', () => {
      const invalidConfig = `{
        "name": "Invalid Board",
        "version": "1.0",
        "board": {
          "id": "invalid_board",
          "manufacturer": "Test",
          "model": "Test"
        },
        "testPoints": []
      }`;

      const result = registryService.addBoardConfig(invalidConfig, 'user');

      expect(result.success).toBe(false);
      expect(result.error).toContain('test point');
    });

    it('should retrieve a board configuration', () => {
      registryService.addBoardConfig(validBoardConfig, 'user');

      const config = registryService.getBoardConfig('test_board_001');

      expect(config).toBeDefined();
      expect(config?.board.id).toBe('test_board_001');
      expect(config?.name).toBe('Test Board');
    });

    it('should get all board configurations', () => {
      registryService.addBoardConfig(validBoardConfig, 'user');

      const configs = registryService.getAllBoardConfigs();

      expect(configs).toHaveLength(1);
      expect(configs[0].board.id).toBe('test_board_001');
    });

    it('should remove a board configuration', () => {
      registryService.addBoardConfig(validBoardConfig, 'user');

      const removed = registryService.removeBoardConfig('test_board_001');

      expect(removed).toBe(true);
      expect(registryService.getBoardConfig('test_board_001')).toBeUndefined();
    });

    it('should export board configuration as YAML', () => {
      registryService.addBoardConfig(validBoardConfig, 'user');

      const exported = registryService.exportBoardConfigYAML('test_board_001');

      expect(exported).toBeDefined();
      expect(exported).toContain('test_board_001');
    });
  });

  describe('Failure Pattern Management', () => {
    const validFailurePattern = `{
      "name": "Test Failure Pattern",
      "version": "1.0",
      "description": "Test pattern",
      "pattern": {
        "id": "voltage_regulator_failure",
        "displayName": "Test Pattern",
        "category": "power"
      },
      "symptoms": [
        {
          "type": "no_voltage",
          "description": "No voltage output",
          "severity": "critical"
        }
      ],
      "causes": [
        {
          "description": "Component failure",
          "probability": 80,
          "reasoning": "Most common cause"
        }
      ],
      "diagnosticSteps": [
        "Check voltage",
        "Test component"
      ],
      "repairProcedures": [
        {
          "description": "Replace component",
          "tools": ["Soldering iron"],
          "steps": ["Step 1", "Step 2"],
          "estimatedTime": 30,
          "difficulty": "medium"
        }
      ],
      "estimatedCost": {"min": 1.0, "max": 5.0},
      "tags": ["test"]
    }`;

    it('should add a valid failure pattern', () => {
      const result = registryService.addFailurePattern(
        validFailurePattern,
        'user',
      );

      expect(result.success).toBe(true);
      expect(result.id).toBe('voltage_regulator_failure');
      expect(result.error).toBeUndefined();
    });

    it('should reject pattern without symptoms', () => {
      const invalidPattern = `{
        "name": "Invalid Pattern",
        "version": "1.0",
        "pattern": {
          "id": "test_pattern",
          "displayName": "Test",
          "category": "power"
        },
        "symptoms": [],
        "diagnosticSteps": ["Step 1"],
        "repairProcedures": []
      }`;

      const result = registryService.addFailurePattern(invalidPattern, 'user');

      expect(result.success).toBe(false);
      expect(result.error).toContain('symptom');
    });

    it('should retrieve a failure pattern', () => {
      registryService.addFailurePattern(validFailurePattern, 'user');

      const pattern = registryService.getFailurePattern(
        'voltage_regulator_failure' as FailurePattern,
      );

      expect(pattern).toBeDefined();
      expect(pattern?.name).toBe('Test Failure Pattern');
    });

    it('should get all failure patterns', () => {
      registryService.addFailurePattern(validFailurePattern, 'user');

      const patterns = registryService.getAllFailurePatterns();

      expect(patterns).toHaveLength(1);
      expect(patterns[0].pattern.id).toBe('voltage_regulator_failure');
    });

    it('should convert pattern to FailureKnowledge', () => {
      registryService.addFailurePattern(validFailurePattern, 'user');

      const pattern = registryService.getFailurePattern(
        'voltage_regulator_failure' as FailurePattern,
      );
      expect(pattern).toBeDefined();

      const knowledge = registryService.convertToFailureKnowledge(pattern!);

      expect(knowledge).toBeDefined();
      expect(knowledge.failurePattern).toBe('voltage_regulator_failure');
      expect(knowledge.commonSymptoms).toHaveLength(1);
      expect(knowledge.diagnosticSteps).toHaveLength(2);
    });

    it('should remove a failure pattern', () => {
      registryService.addFailurePattern(validFailurePattern, 'user');

      const removed = registryService.removeFailurePattern(
        'voltage_regulator_failure' as FailurePattern,
      );

      expect(removed).toBe(true);
      expect(
        registryService.getFailurePattern(
          'voltage_regulator_failure' as FailurePattern,
        ),
      ).toBeUndefined();
    });
  });

  describe('Registry Queries', () => {
    const boardConfig = `{
      "name": "Query Test Board",
      "version": "1.0",
      "board": {
        "id": "query_board",
        "manufacturer": "QueryCorp",
        "model": "QB-1"
      },
      "testPoints": [{"id": "tp1", "name": "Test", "type": "VCC", "position": {"x": 0, "y": 0}}],
      "tags": ["query", "test"]
    }`;

    it('should get all registry entries', () => {
      registryService.addBoardConfig(boardConfig, 'user', 'TestAuthor');

      const entries = registryService.getRegistry();

      expect(entries).toHaveLength(1);
      expect(entries[0].type).toBe('board');
      expect(entries[0].author).toBe('TestAuthor');
    });

    it('should filter registry by type', () => {
      registryService.addBoardConfig(boardConfig, 'user');

      const boardEntries = registryService.getRegistryByType('board');

      expect(boardEntries).toHaveLength(1);
      expect(boardEntries[0].type).toBe('board');
    });

    it('should search registry', () => {
      registryService.addBoardConfig(boardConfig, 'user', 'TestAuthor');

      const results = registryService.searchRegistry('Query');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].name).toContain('Query');
    });

    it('should search by author', () => {
      registryService.addBoardConfig(boardConfig, 'user', 'TestAuthor');

      const results = registryService.searchRegistry('TestAuthor');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].author).toBe('TestAuthor');
    });
  });

  describe('Registry Statistics', () => {
    it('should provide registry statistics', () => {
      const boardConfig = `{
        "name": "Stats Board",
        "version": "1.0",
        "board": {"id": "stats_board", "manufacturer": "Test", "model": "Test"},
        "testPoints": [{"id": "tp1", "name": "Test", "type": "VCC", "position": {"x": 0, "y": 0}}]
      }`;

      registryService.addBoardConfig(boardConfig, 'user');
      registryService.addBoardConfig(boardConfig.replace('stats_board', 'stats_board_2'), 'community');

      const stats = registryService.getRegistryStats();

      expect(stats.totalBoards).toBe(2);
      expect(stats.userContributions).toBe(1);
      expect(stats.communityContributions).toBe(1);
    });
  });
});
