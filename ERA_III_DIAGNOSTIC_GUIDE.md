# ERA III: Technical Repair Intelligence Guide

## 🧠 Overview

ERA III transforms iaRealidad from a sensing tool into an **intelligent electronic mechanic** with diagnostic reasoning, case-based learning, and repair wisdom.

> **"La diferencia entre 'te digo cómo medir' vs 'sé por qué falló y qué hacer después'"**

This is the layer that converts information into **SABIDURÍA** (wisdom).

---

## 🎯 What ERA III Adds

### Before ERA III (ERA I + II)
- ✅ Visual overlays and AR guidance
- ✅ Sensor measurements and anomaly detection
- ✅ Real-time data from multimeters, UART, I2C, SPI

### After ERA III
- ✅ **Automatic failure diagnosis** based on symptoms
- ✅ **Intelligent repair recommendations** with confidence scores
- ✅ **Historical pattern matching** from past repairs
- ✅ **Case-based learning** that improves over time
- ✅ **Power route analysis** to trace failures
- ✅ **Repair case documentation** (clinical electronic cases)

---

## 🔧 Core Capabilities

### 1. Diagnostic Engine

The diagnostic engine analyzes symptoms and determines the most likely failure pattern.

#### Supported Failure Patterns

1. **`voltage_regulator_failure`**
   - **Symptoms**: No 3.3V output, regulator overheating
   - **Common Causes**: Cheap power supply, voltage spike, shorted output
   - **Difficulty**: Medium
   - **Est. Cost**: $0.50 - $2.00
   - **Success Rate**: 92%

2. **`firmware_corruption`**
   - **Symptoms**: No UART response, boot loop, random behavior
   - **Common Causes**: Failed firmware upload, power loss during flash
   - **Difficulty**: Easy
   - **Est. Cost**: $0
   - **Success Rate**: 85%

3. **`microcontroller_dead`**
   - **Symptoms**: No boot, no communication, no current draw
   - **Common Causes**: ESD damage, reverse voltage, overvoltage
   - **Difficulty**: Hard
   - **Est. Cost**: $2.00 - $15.00
   - **Success Rate**: 60%

4. **`power_supply_failure`**
   - **Symptoms**: No 5V at input, voltage drops under load
   - **Common Causes**: Dead USB cable, blown fuse, damaged diode
   - **Difficulty**: Easy
   - **Est. Cost**: $0 - $3.00
   - **Success Rate**: 90%

5. **`short_circuit`**
   - **Symptoms**: Component overheating in idle, excessive current
   - **Common Causes**: Solder bridge, damaged component
   - **Difficulty**: Medium
   - **Est. Cost**: Variable
   - **Success Rate**: 75%

### 2. Inference Engine

The inference engine applies rules to symptoms to determine the failure pattern.

**Example Rule:**
```typescript
IF no_voltage detected (< 0.5V)
AND expected voltage is 3.3V
THEN voltage_regulator_failure
WITH confidence 85%
```

### 3. Power Route Analysis

For power-related issues, ERA III traces the power route:
- **Input Voltage** (USB 5V) → present/absent?
- **Regulator** (AMS1117) → working/failed?
- **Microcontroller Power** (3.3V) → present/absent?

**Identifies suspected failure point** and provides targeted recommendations.

### 4. Case Management System

Every repair is documented as a **clinical electronic case** with:
- Symptoms and diagnosis
- Repair steps taken
- Components replaced
- Validation results
- Cost and time tracking
- Learning data (root cause, preventive measures)

---

## 📖 Usage Guide

### Basic Diagnostic Flow

```typescript
import diagnosticService from './services/diagnosticService';
import {Symptom} from './types';

// Step 1: Create symptoms
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
  {
    id: 'symptom_2',
    type: 'overheating',
    description: 'Regulator very hot',
    componentId: 'regulator_1',
    severity: 'high',
  },
];

// Step 2: Run diagnosis
const result = diagnosticService.diagnose(symptoms);

// Step 3: Review results
console.log(`Failure Pattern: ${result.failurePattern}`);
console.log(`Confidence: ${result.confidence}%`);
console.log(`Estimated Cost: $${result.estimatedCost}`);
console.log(`Estimated Time: ${result.estimatedTime} minutes`);

// Step 4: Review recommendations
result.recommendations.forEach(rec => {
  console.log(`Priority ${rec.priority}: ${rec.description}`);
  console.log(`Tools needed: ${rec.tools.join(', ')}`);
});

// Step 5: Check power route (if available)
if (result.powerRouteAnalysis) {
  console.log(`Input voltage: ${result.powerRouteAnalysis.inputVoltage.present ? 'OK' : 'MISSING'}`);
  console.log(`Suspected failure: ${result.powerRouteAnalysis.suspectedFailurePoint}`);
}
```

### Converting Sensor Measurements to Symptoms

```typescript
import sensingService from './services/sensingService';
import diagnosticService from './services/diagnosticService';

// Get anomaly measurements from sensors
const measurements = sensingService.getAllMeasurements();

// Convert to symptoms
const symptoms = diagnosticService.analyzeMeasurementsForSymptoms(measurements);

// Run diagnosis
const result = diagnosticService.diagnose(symptoms);
```

### Managing Repair Cases

```typescript
import caseManagementService from './services/caseManagementService';

// Step 1: Create a case
const repairCase = caseManagementService.createCase(
  'ESP32 DevKit V1',
  symptoms,
  diagnosticResult,
  'board_12345'
);

console.log(`Case #${repairCase.caseNumber} created`);

// Step 2: Add repair steps
caseManagementService.addRepairStep(repairCase.id, {
  id: 'step_1',
  order: 1,
  title: 'Measure regulator output',
  description: 'Use multimeter to verify 3.3V rail',
  componentIds: ['regulator_1'],
  type: 'measure',
});

// Step 3: Record component replacement
caseManagementService.recordComponentReplacement(repairCase.id, {
  id: 'replace_1',
  componentId: 'regulator_1',
  componentType: 'AMS1117-3.3',
  reason: 'No output voltage, component hot',
  cost: 0.76,
});

// Step 4: Complete the case
caseManagementService.completeCase(
  repairCase.id,
  validationTest,
  validationResult,
  45, // actual time in minutes
  'Replaced regulator and output capacitor. Board now working.'
);

// Step 5: Add learning data
caseManagementService.addLearningData(
  repairCase.id,
  'Cheap power supply caused voltage spike',
  ['Use quality power supplies rated for >1A', 'Add TVS diode protection'],
  'Generic Aliexpress 5V adapter',
  92 // 92% probability this will happen again with cheap PSU
);
```

### Finding Similar Cases

```typescript
// Search for similar historical cases
const similarCases = caseManagementService.findSimilarCases(
  'ESP32 DevKit V1',
  symptoms,
  5 // return top 5 matches
);

similarCases.forEach(match => {
  console.log(`Case #${match.caseNumber} - Similarity: ${match.similarity}%`);
  console.log(`Resolution: ${match.resolution}`);
  console.log(`Cost: $${match.cost}, Time: ${match.timeToRepair} min`);
  console.log(`Success: ${match.repairSuccess ? 'YES' : 'NO'}`);
});
```

### Getting Statistics

```typescript
// Success rate for a failure pattern
const successRate = caseManagementService.getSuccessRateForPattern(
  'voltage_regulator_failure'
);
console.log(`Success rate: ${successRate}%`);

// Average repair time
const avgTime = caseManagementService.getAverageRepairTime(
  'voltage_regulator_failure'
);
console.log(`Average time: ${avgTime} minutes`);

// Average cost
const avgCost = caseManagementService.getAverageRepairCost(
  'voltage_regulator_failure'
);
console.log(`Average cost: $${avgCost}`);

// Most common failures
const commonFailures = caseManagementService.getMostCommonFailures(5);
commonFailures.forEach(failure => {
  console.log(`${failure.pattern}: ${failure.count} cases`);
});

// Component failure statistics
const componentStats = caseManagementService.getComponentFailureStats();
componentStats.forEach((count, componentType) => {
  console.log(`${componentType}: ${count} failures`);
});
```

---

## 🎓 Example: Complete Repair Workflow

### Scenario: ESP32 Won't Boot

```typescript
// 1. Gather measurements from sensors
const multimeterReading = 0.1; // Measured 3.3V rail
const regulatorTemp = 85; // Celsius - very hot!
const uartResponse = false; // No response

// 2. Create symptoms
const symptoms = [
  diagnosticService.createSymptom(
    'no_voltage',
    'No 3.3V at regulator output',
    'regulator_1',
    0.1,
    3.3
  ),
  diagnosticService.createSymptom(
    'overheating',
    'Regulator overheating (85°C)',
    'regulator_1',
    85,
    50
  ),
  diagnosticService.createSymptom(
    'no_communication',
    'UART not responding',
    'uart_1'
  ),
];

// 3. Run diagnosis
const diagnosis = diagnosticService.diagnose(symptoms);

console.log('=== DIAGNOSIS ===');
console.log(`Pattern: ${diagnosis.failurePattern}`);
// Output: voltage_regulator_failure

console.log(`Confidence: ${diagnosis.confidence}%`);
// Output: ~90%

console.log('\n=== PROBABLE CAUSES ===');
diagnosis.probableCauses.forEach(cause => {
  console.log(`${cause.probability}% - ${cause.description}`);
});
// Output:
// 80% - Cheap/faulty power supply
// 65% - Input voltage spike
// 50% - Shorted output

console.log('\n=== RECOMMENDATIONS ===');
diagnosis.recommendations.forEach(rec => {
  console.log(`Priority ${rec.priority}: ${rec.description}`);
});
// Output:
// Priority 1: Replace voltage regulator (AMS1117-3.3)
// Priority 2: Replace input capacitor
// Priority 3: Replace output capacitor
// ...

// 4. Create repair case
const repairCase = caseManagementService.createCase(
  'ESP32 DevKit V1',
  symptoms,
  diagnosis
);

console.log(`\nCase #${repairCase.caseNumber} created`);

// 5. Execute repair (track steps)
caseManagementService.addRepairStep(repairCase.id, {
  id: 'step_1',
  order: 1,
  title: 'Verify power supply',
  description: 'Tested with good 5V supply - still no 3.3V',
  componentIds: [],
  type: 'test',
});

caseManagementService.recordComponentReplacement(repairCase.id, {
  id: 'replace_1',
  componentId: 'regulator_1',
  componentType: 'AMS1117-3.3',
  reason: 'Dead - no output, excessive heat',
  cost: 0.76,
});

caseManagementService.recordComponentReplacement(repairCase.id, {
  id: 'replace_2',
  componentId: 'cap_output',
  componentType: 'Capacitor 22µF',
  reason: 'Replaced along with regulator',
  cost: 0.15,
});

// 6. Validate repair
const validationTest = {
  id: 'test_1',
  name: 'Power Validation',
  description: 'Verify all voltages',
  measurementPoints: [
    {
      id: 'mp_1',
      componentId: 'regulator_1',
      expectedValue: '3.3V',
      expectedRange: {min: 3.2, max: 3.4},
      unit: 'V' as const,
      description: 'Regulator output',
    },
  ],
  passCriteria: '3.3V within tolerance',
  failureActions: ['Recheck connections', 'Test with no load'],
};

const validationResult = {
  id: 'result_1',
  timestamp: new Date().toISOString(),
  testId: 'test_1',
  testName: 'Power Validation',
  passed: true,
  results: [
    {
      measurementId: 'mp_1',
      passed: true,
      measuredValue: 3.31,
      expectedValue: '3.3V',
    },
  ],
};

caseManagementService.completeCase(
  repairCase.id,
  validationTest,
  validationResult,
  45, // took 45 minutes
  'Board fully functional. UART responding, can upload code.'
);

// 7. Add learning data
caseManagementService.addLearningData(
  repairCase.id,
  'Client used generic 5V adapter from Aliexpress - voltage spike killed regulator',
  [
    'Recommend quality power supplies (UL/CE certified)',
    'Add TVS diode on input for future protection',
    'Educate clients about power supply quality',
  ],
  'Generic Aliexpress 5V 1A adapter',
  92 // 92% chance this happens again with cheap supplies
);

console.log('\n=== REPAIR COMPLETE ===');
console.log(`Case #${repairCase.caseNumber}`);
console.log(`Success: YES`);
console.log(`Actual Cost: $0.91`);
console.log(`Actual Time: 45 minutes`);
console.log(`Root Cause: Cheap power supply`);

// 8. Next time this happens, you'll have the data!
const futureSimilarCases = caseManagementService.findSimilarCases(
  'ESP32 DevKit V1',
  symptoms,
  1
);

console.log('\n=== HISTORICAL DATA ===');
console.log(`Found ${futureSimilarCases.length} similar case(s)`);
if (futureSimilarCases.length > 0) {
  const match = futureSimilarCases[0];
  console.log(`Previous Case #${match.caseNumber}`);
  console.log(`Similarity: ${match.similarity}%`);
  console.log(`Resolution: ${match.resolution}`);
  console.log(`Cost: $${match.cost}, Time: ${match.timeToRepair} min`);
}
```

---

## 🔍 Advanced Features

### Custom Symptoms

You can create symptoms manually or from sensor data:

```typescript
// Manual symptom
const symptom = diagnosticService.createSymptom(
  'low_voltage',
  'Voltage drops to 2.8V under load',
  'regulator_1',
  2.8,
  3.3
);

// From sensor measurement
const measurements = sensingService.getAllMeasurements();
const autoSymptoms = diagnosticService.analyzeMeasurementsForSymptoms(measurements);
```

### Accessing Failure Knowledge

```typescript
// Get detailed knowledge about a failure pattern
const knowledge = diagnosticService.getFailureKnowledge('voltage_regulator_failure');

if (knowledge) {
  console.log('Common Symptoms:', knowledge.commonSymptoms);
  console.log('Typical Causes:', knowledge.typicalCauses);
  console.log('Diagnostic Steps:', knowledge.diagnosticSteps);
  console.log('Repair Procedures:', knowledge.repairProcedures);
  console.log('Required Tools:', knowledge.requiredTools);
  console.log(`Cost: $${knowledge.estimatedCost.min} - $${knowledge.estimatedCost.max}`);
  console.log(`Time: ${knowledge.estimatedTime.min} - ${knowledge.estimatedTime.max} min`);
  console.log(`Success Rate: ${knowledge.successRate}%`);
  console.log(`Difficulty: ${knowledge.difficulty}`);
}
```

### Searching Cases

```typescript
// By board type
const esp32Cases = caseManagementService.searchByBoardType('ESP32');

// By failure pattern
const regulatorFailures = caseManagementService.searchByFailurePattern(
  'voltage_regulator_failure'
);

// By tags
const criticalCases = caseManagementService.searchByTag('critical');
```

### Export/Import Cases

```typescript
// Export a case to JSON
const caseJson = caseManagementService.exportCase(repairCase.id);

// Save to file or share with community
fs.writeFileSync('case_4723.json', caseJson);

// Import a case from JSON
const importedCase = caseManagementService.importCase(caseJson);
```

---

## 📊 Understanding Confidence Scores

Confidence scores indicate how certain the diagnostic engine is about its conclusions.

### Confidence Ranges

- **90-100%**: Very high confidence - clear symptoms match known pattern
- **75-89%**: High confidence - strong match with some ambiguity
- **60-74%**: Medium confidence - probable but needs verification
- **40-59%**: Low confidence - multiple possible causes
- **< 40%**: Very low confidence - unclear or unknown failure

### What Affects Confidence

1. **Rule Matching**: Exact symptom matches increase confidence
2. **Number of Symptoms**: More symptoms = higher confidence
3. **Symptom Severity**: Critical symptoms increase confidence
4. **Historical Data**: Similar past cases increase confidence

---

## 🚀 Future Enhancements (Roadmap)

### Coming in ERA III Phase 2

- **Machine Learning Models**: Learn from repair outcomes
- **Component Library**: Database of common components and failure modes
- **Repair Recipes**: Pre-built repair workflows
- **Interactive Troubleshooting**: Step-by-step diagnostic wizards
- **BOM Generation**: Automatic parts list for repairs

### Coming in ERA IV (Ecosystem)

- **Cloud Case Database**: Share cases globally
- **Community Playbooks**: User-contributed repair guides
- **Real-time Collaboration**: Remote repair assistance
- **Marketplace Integration**: Order parts from diagnosis
- **Reputation System**: Expert technicians and verified solutions

---

## 🎯 Key Differentiators

**What makes ERA III special:**

1. **Context-Aware**: Understands the relationship between symptoms
2. **Learning System**: Gets smarter with every repair
3. **Probabilistic**: Ranks solutions by likelihood, not just rules
4. **Cost-Conscious**: Tracks actual repair costs for better estimates
5. **Evidence-Based**: Decisions backed by historical data

**This is not just a diagnostic tool - it's an AI repair mentor.**

---

## 📚 API Reference

### DiagnosticService

- `diagnose(symptoms: Symptom[]): DiagnosticResult` - Run diagnosis
- `getFailureKnowledge(pattern: FailurePattern): FailureKnowledge | undefined` - Get knowledge
- `analyzeMeasurementsForSymptoms(measurements: SensingMeasurement[]): Symptom[]` - Convert measurements
- `createSymptom(...)` - Create symptom manually

### CaseManagementService

- `createCase(...)` - Create new repair case
- `getCase(caseId: string)` - Retrieve case
- `getCaseByNumber(caseNumber: number)` - Retrieve case by number
- `addRepairStep(caseId: string, step: RepairStep)` - Add repair step
- `recordComponentReplacement(caseId: string, replacement: ComponentReplacement)` - Record replacement
- `completeCase(...)` - Mark case as complete with validation
- `addLearningData(...)` - Add learning metadata
- `findSimilarCases(...)` - Find historical matches
- `searchByBoardType(boardType: string)` - Search cases
- `searchByFailurePattern(pattern: FailurePattern)` - Search cases
- `searchByTag(tag: string)` - Search by tags
- `getSuccessRateForPattern(pattern: FailurePattern)` - Get statistics
- `getAverageRepairTime(pattern: FailurePattern)` - Get statistics
- `getAverageRepairCost(pattern: FailurePattern)` - Get statistics
- `getMostCommonFailures(limit: number)` - Get statistics
- `getComponentFailureStats()` - Get statistics
- `exportCase(caseId: string)` - Export to JSON
- `importCase(caseJson: string)` - Import from JSON

---

## 🎓 Learning Resources

- See `__tests__/diagnosticService.test.ts` for usage examples
- See `__tests__/caseManagementService.test.ts` for case management examples
- Check `src/types/index.ts` for all type definitions

---

**¡Bienvenido a la era de la inteligencia técnica!**

The repair assistant now has **wisdom**, not just knowledge.
