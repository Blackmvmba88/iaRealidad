# iaRealidad Community SDK Examples

This directory contains example configurations for boards and failure patterns that can be contributed by the community.

## 📁 Directory Structure

```
examples/
├── boards/              # Board configuration files
│   ├── esp32_devkit_v1.json
│   ├── arduino_uno_r3.json
│   └── ...
├── failure-patterns/    # Failure pattern definitions
│   ├── esp32_power_failure.json
│   ├── arduino_bootloop.json
│   └── ...
└── README.md           # This file
```

## 🎯 Purpose

These examples enable **community contributions without code changes**. Contributors can:

1. **Add new board configurations** - Support for new development boards
2. **Add failure patterns** - Diagnostic knowledge for common failures
3. **Share expertise** - Document repair procedures and best practices

## 🚀 Quick Start

### Adding a Board Configuration

1. Copy one of the example board files
2. Modify the configuration for your board
3. Submit via pull request or share as JSON

```bash
# Example usage (programmatic)
iaRealidad --add-board examples/boards/my_board.json
```

### Adding a Failure Pattern

1. Copy one of the example pattern files
2. Document the symptoms, causes, and repair procedures
3. Submit via pull request or share as JSON

```bash
# Example usage (programmatic)
iaRealidad --add-pattern examples/failure-patterns/my_pattern.json
```

## 📋 Board Configuration Format

Board configurations use JSON (YAML-compatible) format:

```json
{
  "name": "Board Name",
  "version": "1.0",
  "description": "Board description",
  "board": {
    "id": "unique_board_id",
    "manufacturer": "Manufacturer Name",
    "model": "Model Number",
    "microcontroller": "MCU Type"
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
  "components": [
    {
      "id": "u1",
      "name": "Component Name",
      "type": "microcontroller",
      "position": {"x": 200, "y": 200},
      "description": "Component description"
    }
  ],
  "commonFailures": ["voltage_regulator_failure", "firmware_corruption"],
  "tags": ["tag1", "tag2"]
}
```

### Required Fields

- `name`: Human-readable board name
- `version`: Configuration version (semantic versioning)
- `board.id`: Unique identifier (lowercase, underscores)
- `board.manufacturer`: Manufacturer name
- `board.model`: Model number
- `testPoints`: At least one test point

### Optional Fields

- `description`: Detailed board description
- `specifications`: Voltage and current specs
- `components`: Component locations
- `commonFailures`: List of common failure patterns
- `tags`: Search tags

## 📋 Failure Pattern Format

Failure patterns document diagnostic and repair knowledge:

```json
{
  "name": "Pattern Name",
  "version": "1.0",
  "description": "Pattern description",
  "pattern": {
    "id": "failure_pattern_id",
    "displayName": "Display Name",
    "category": "power"
  },
  "symptoms": [
    {
      "type": "no_voltage",
      "description": "Symptom description",
      "severity": "critical"
    }
  ],
  "causes": [
    {
      "description": "Cause description",
      "probability": 85,
      "reasoning": "Why this is a likely cause",
      "testProcedure": "How to test for this cause"
    }
  ],
  "diagnosticSteps": [
    "Step 1: Do this",
    "Step 2: Check that"
  ],
  "repairProcedures": [
    {
      "description": "Repair description",
      "tools": ["Tool 1", "Tool 2"],
      "steps": ["Step 1", "Step 2"],
      "warnings": ["Warning 1"],
      "estimatedTime": 15,
      "difficulty": "medium"
    }
  ],
  "estimatedCost": {"min": 0.0, "max": 5.0},
  "successRate": 85,
  "tags": ["tag1", "tag2"]
}
```

### Required Fields

- `name`: Human-readable pattern name
- `version`: Pattern version
- `pattern.id`: Must match existing FailurePattern type
- `symptoms`: At least one symptom
- `diagnosticSteps`: At least one step
- `repairProcedures`: At least one procedure

### Pattern Categories

- `power`: Power supply and voltage issues
- `communication`: Serial, I2C, SPI failures
- `component`: Component failures
- `firmware`: Firmware and software issues
- `other`: Other failure types

### Difficulty Levels

- `easy`: Basic tools, minimal experience required
- `medium`: Standard tools, some experience needed
- `hard`: Advanced tools, significant experience required
- `expert`: Specialized equipment, expert-level skills

## 🎓 Contribution Guidelines

### Board Configurations

When contributing a board configuration:

1. **Accuracy**: Ensure all voltage values and specs are accurate
2. **Test Points**: Include critical test points (VCC, GND, key signals)
3. **Documentation**: Add clear descriptions for components
4. **Tags**: Add relevant tags for searchability
5. **Common Failures**: List known failure modes

### Failure Patterns

When contributing a failure pattern:

1. **Real Experience**: Base patterns on actual repair experience
2. **Clear Symptoms**: Describe observable symptoms clearly
3. **Probability**: Estimate cause probabilities based on frequency
4. **Safety**: Include all relevant safety warnings
5. **Tools**: List all required tools accurately
6. **Time**: Give realistic time estimates
7. **Success Rate**: If known, include success rate from experience

## 🔧 Validation

Before submitting:

1. **Valid JSON**: Ensure JSON syntax is correct
2. **Required Fields**: Include all mandatory fields
3. **Realistic Values**: Use realistic voltage/time/cost values
4. **Tested**: If possible, test with actual hardware

## 🌍 Community Contributions

### How to Contribute

1. Fork the repository
2. Add your configuration to the appropriate directory
3. Test if possible
4. Submit a pull request with:
   - Configuration file
   - Brief description
   - Photos/schematics (optional but helpful)

### Recognition

Contributors are recognized in:
- Board/pattern metadata (author field)
- Project documentation
- Release notes

## 📚 Resources

### Tools for Creating Configurations

- **JSON Validators**: [jsonlint.com](https://jsonlint.com)
- **Board Documentation**: Manufacturer datasheets
- **Test Equipment**: Multimeter for voltage measurements

### Learning Resources

- [ERA III Diagnostic Guide](../ERA_III_DIAGNOSTIC_GUIDE.md)
- [Hardware Compatibility Guide](../HARDWARE_COMPATIBILITY.md)
- [Configuration Guide](../CONFIGURATION.md)

## ❓ FAQ

**Q: Can I submit configurations for prototype boards?**
A: Yes, but mark them clearly in the description.

**Q: What if my board isn't working?**
A: Use the diagnostic engine to identify issues first.

**Q: Can I modify existing configurations?**
A: Yes, submit improvements via pull request.

**Q: Do I need to know programming?**
A: No, just JSON/YAML editing skills.

## 📞 Support

- **Issues**: Open a GitHub issue
- **Questions**: Use GitHub Discussions
- **Pull Requests**: Submit configuration contributions

---

## 🎯 Vision

This SDK transforms iaRealidad from:

> "An app that helps"

to:

> "A platform where technicians contribute and learn together"

Every board configuration and failure pattern you contribute helps the entire community. Together, we're building the world's first open electronics repair knowledge base.

**Thank you for contributing!** 🛠️
