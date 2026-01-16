# ERA IV Features Guide: Community SDK & Case Sharing

> **Status**: ✅ Implemented | **Version**: 1.0.0 | **Phase**: ERA III → IV Transition

This guide covers the new features that transform iaRealidad from an AR repair tool into a **community-driven electronics diagnostic platform**.

## 🎯 Overview

The ERA IV features implement the "close the loop" functionality:

```
Capture → Diagnose → Register → Query → Share → Learn
```

These features enable:
- **Offline community**: Share repair knowledge without cloud
- **Plugin architecture**: Add boards/patterns without code changes
- **Case management**: Query and analyze repair history
- **Knowledge accumulation**: Build institutional memory

---

## 📦 1. Case Export/Import System

### Basic Case Export

Export a single repair case as JSON:

```typescript
import caseManagementService from './services/caseManagementService';

// Export single case
const caseId = 'case_123';
const jsonData = caseManagementService.exportCase(caseId);

// Save to file or share
console.log(jsonData); // Pretty-printed JSON
```

### Batch Export

Export multiple cases or all cases:

```typescript
// Export specific cases
const selectedIds = ['case_1', 'case_2', 'case_3'];
const batchJson = caseManagementService.exportCases(selectedIds);

// Export all cases
const allCasesJson = caseManagementService.exportAllCases();

// Result format:
{
  "version": "1.0",
  "exportDate": "2024-01-15T10:30:00Z",
  "totalCases": 3,
  "cases": [
    { /* case 1 data */ },
    { /* case 2 data */ },
    { /* case 3 data */ }
  ]
}
```

### Case Import

Import cases from JSON:

```typescript
// Import single case
const importedCase = caseManagementService.importCase(jsonString);

// Import batch
const result = caseManagementService.importCases(batchJsonString);
console.log(`Imported: ${result.imported}, Failed: ${result.failed}`);
```

### Use Cases

- **Backup**: Export all cases before system updates
- **Transfer**: Move cases between devices
- **Archive**: Store historical cases offline
- **Share**: Send specific cases to colleagues

---

## 🔍 2. Advanced Case Query System

### Basic Filters

Query cases with various filters:

```typescript
// Filter by board type
const esp32Cases = caseManagementService.queryCases({
  boardType: 'ESP32'
});

// Filter by failure pattern
const regulatorFailures = caseManagementService.queryCases({
  failurePattern: 'voltage_regulator_failure'
});

// Filter by success
const successfulRepairs = caseManagementService.queryCases({
  repairSuccess: true
});
```

### Cost and Date Filters

```typescript
// Filter by cost range
const affordableRepairs = caseManagementService.queryCases({
  minCost: 0,
  maxCost: 5.0
});

// Filter by date range
const recentCases = caseManagementService.queryCases({
  dateFrom: '2024-01-01T00:00:00Z',
  dateTo: '2024-01-31T23:59:59Z'
});
```

### Sorting and Pagination

```typescript
// Sort by cost (descending)
const expensiveFirst = caseManagementService.queryCases({
  sortBy: 'cost',
  sortOrder: 'desc'
});

// Sort by date (most recent first)
const recentFirst = caseManagementService.queryCases({
  sortBy: 'date',
  sortOrder: 'desc'
});

// Paginate results
const page1 = caseManagementService.queryCases({
  limit: 10,
  offset: 0
});

const page2 = caseManagementService.queryCases({
  limit: 10,
  offset: 10
});
```

### Tag-Based Search

```typescript
// Search by tags
const wifiIssues = caseManagementService.queryCases({
  tags: ['wifi', 'esp32']
});
```

### Complex Queries

Combine multiple filters:

```typescript
const complexQuery = caseManagementService.queryCases({
  boardType: 'ESP32',
  repairSuccess: true,
  minCost: 1.0,
  maxCost: 10.0,
  dateFrom: '2024-01-01T00:00:00Z',
  sortBy: 'cost',
  sortOrder: 'asc',
  limit: 20,
  offset: 0
});
```

### Case Statistics

Get comprehensive statistics:

```typescript
const stats = caseManagementService.getCaseStatistics();

console.log(`
  Total Cases: ${stats.totalCases}
  Success Rate: ${stats.successRate}%
  Average Cost: $${stats.averageCost}
  Average Time: ${stats.averageTime} minutes
  Most Common Failure: ${stats.mostCommonFailure}
  Most Common Board: ${stats.mostCommonBoard}
`);
```

---

## 🌐 3. Case Sharing System

### Share Single Case

Share a case in different formats:

```typescript
import shareCaseService from './services/shareCaseService';

// Share as JSON
const jsonResult = shareCaseService.shareCase(caseId, {
  format: 'json'
});

// Share as data URI (for links)
const dataUriResult = shareCaseService.shareCase(caseId, {
  format: 'datauri'
});

// Share as QR-friendly format (compact)
const qrResult = shareCaseService.shareCase(caseId, {
  format: 'qr'
});
```

### Share Multiple Cases

Create a case package:

```typescript
const packageResult = shareCaseService.shareCases(
  ['case_1', 'case_2', 'case_3'],
  'John Doe',                    // author
  'Common ESP32 power failures', // description
  { format: 'json' }
);

if (packageResult.success) {
  console.log(`Package size: ${packageResult.size} bytes`);
  // Share packageResult.data
}
```

### Generate Shareable Links

```typescript
// Single case link
const link = shareCaseService.generateShareLink(caseId);

// Multiple cases link
const multiLink = shareCaseService.generateShareLinkMultiple(
  ['case_1', 'case_2'],
  'Author',
  'Description'
);

// Link is a data URI that can be shared
console.log(link); // data:application/json;base64,...
```

### Preview Before Import

Preview a shared package without importing:

```typescript
const preview = shareCaseService.previewSharedPackage(sharedData);

if (preview.success) {
  console.log(`
    Package ID: ${preview.packageId}
    Author: ${preview.author}
    Description: ${preview.description}
    Total Cases: ${preview.totalCases}
    Board Types: ${preview.boardTypes?.join(', ')}
    Failure Patterns: ${preview.failurePatterns?.join(', ')}
  `);
  
  // User decides whether to import
  if (userAccepts) {
    const result = shareCaseService.importSharedPackage(sharedData);
  }
}
```

### Import Shared Cases

```typescript
const importResult = shareCaseService.importSharedPackage(sharedData);

console.log(`
  Success: ${importResult.success}
  Imported: ${importResult.imported} cases
  Failed: ${importResult.failed} cases
  Package ID: ${importResult.packageId}
`);
```

### Package Statistics

Analyze a package before importing:

```typescript
const pkg = shareCaseService.createCasePackage(['case_1', 'case_2']);
const stats = shareCaseService.getPackageStats(pkg!);

console.log(`
  Total Cases: ${stats.totalCases}
  Success Rate: ${stats.successRate}%
  Average Cost: $${stats.averageCost}
  Average Time: ${stats.averageTime} minutes
  Unique Boards: ${stats.uniqueBoards}
  Unique Patterns: ${stats.uniquePatterns}
`);
```

---

## 🔧 4. Registry Service (Board & Pattern SDK)

### Add Board Configuration

Add a new board from JSON:

```typescript
import registryService from './services/registryService';

const boardJson = `{
  "name": "ESP32 DevKit V1",
  "version": "1.0",
  "board": {
    "id": "esp32_devkit_v1",
    "manufacturer": "Espressif",
    "model": "ESP32 DevKit V1",
    "microcontroller": "ESP32-WROOM-32"
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
  "tags": ["esp32", "wifi", "bluetooth"]
}`;

const result = registryService.addBoardConfig(boardJson, 'user', 'Author Name');

if (result.success) {
  console.log(`Board added: ${result.id}`);
} else {
  console.error(`Error: ${result.error}`);
}
```

### Add Failure Pattern

Add a new diagnostic pattern:

```typescript
const patternJson = `{
  "name": "ESP32 Power Failure",
  "version": "1.0",
  "pattern": {
    "id": "power_supply_failure",
    "displayName": "Power Supply Failure",
    "category": "power"
  },
  "symptoms": [
    {
      "type": "no_voltage",
      "description": "No 5V at input",
      "severity": "critical"
    }
  ],
  "diagnosticSteps": [
    "Check USB cable",
    "Check fuse continuity"
  ],
  "repairProcedures": [
    {
      "description": "Replace USB cable",
      "tools": ["USB cable"],
      "steps": ["Disconnect old cable", "Connect new cable"],
      "estimatedTime": 5,
      "difficulty": "easy"
    }
  ],
  "estimatedCost": {"min": 0.0, "max": 3.0}
}`;

const result = registryService.addFailurePattern(patternJson, 'community');
```

### Query Registry

```typescript
// Get all boards
const allBoards = registryService.getAllBoardConfigs();

// Get specific board
const esp32 = registryService.getBoardConfig('esp32_devkit_v1');

// Get all patterns
const allPatterns = registryService.getAllFailurePatterns();

// Get specific pattern
const powerFailure = registryService.getFailurePattern('power_supply_failure');

// Search registry
const results = registryService.searchRegistry('esp32');

// Get registry statistics
const stats = registryService.getRegistryStats();
console.log(`
  Total Boards: ${stats.totalBoards}
  Total Patterns: ${stats.totalPatterns}
  User Contributions: ${stats.userContributions}
  Community Contributions: ${stats.communityContributions}
`);
```

### Convert Pattern to Knowledge

Integrate community patterns with diagnostic engine:

```typescript
const pattern = registryService.getFailurePattern('power_supply_failure');
const knowledge = registryService.convertToFailureKnowledge(pattern!);

// Use knowledge in diagnostic engine
// diagnosticService.addFailureKnowledge(knowledge);
```

---

## 🎓 Complete Usage Examples

### Example 1: Technician Workflow

A technician diagnoses an ESP32, documents the case, and shares it:

```typescript
import diagnosticService from './services/diagnosticService';
import caseManagementService from './services/caseManagementService';
import shareCaseService from './services/shareCaseService';

// 1. Diagnose the issue
const symptoms = [
  diagnosticService.createSymptom('no_voltage', 'No 3.3V output')
];
const diagnostic = diagnosticService.diagnose(symptoms);

// 2. Create repair case
const repairCase = caseManagementService.createCase(
  'ESP32 DevKit V1',
  symptoms,
  diagnostic
);

// 3. Perform repair
// ... repair steps ...

// 4. Complete case
caseManagementService.completeCase(
  repairCase.id,
  validationTest,
  validationResult,
  actualTime,
  'Replaced AMS1117 regulator'
);

// 5. Share case with team
const link = shareCaseService.generateShareLink(repairCase.id);
console.log('Share this link with your team:', link);
```

### Example 2: Learning from History

Query similar past cases before starting repair:

```typescript
// Current symptoms
const currentSymptoms = [
  { type: 'no_voltage', description: 'No 3.3V' }
];

// Find similar cases
const similarCases = caseManagementService.findSimilarCases(
  'ESP32 DevKit V1',
  currentSymptoms,
  5 // top 5 matches
);

// Analyze historical success
for (const match of similarCases) {
  console.log(`
    Case #${match.caseNumber}
    Similarity: ${match.similarity}%
    Resolution: ${match.resolution}
    Cost: $${match.cost}
    Time: ${match.timeToRepair} minutes
    Success: ${match.repairSuccess ? 'Yes' : 'No'}
  `);
}
```

### Example 3: Community Contribution

A maker contributes a new board configuration:

```typescript
// 1. Create board configuration
const boardConfig = {
  name: 'My Custom ESP32 Board',
  version: '1.0',
  board: {
    id: 'custom_esp32_v1',
    manufacturer: 'DIY',
    model: 'Custom V1',
    microcontroller: 'ESP32'
  },
  testPoints: [/* ... */],
  tags: ['esp32', 'custom', 'diy']
};

// 2. Submit to registry
const result = registryService.addBoardConfig(
  JSON.stringify(boardConfig),
  'community',
  'MakerJohn'
);

// 3. Export for sharing
const exported = registryService.exportBoardConfigYAML('custom_esp32_v1');

// 4. Share with community (via GitHub PR or direct sharing)
console.log('Share this configuration:', exported);
```

### Example 4: Offline Knowledge Transfer

Transfer cases to a colleague without internet:

```typescript
// Export all successful ESP32 repairs
const esp32Cases = caseManagementService.queryCases({
  boardType: 'ESP32',
  repairSuccess: true
});

const caseIds = esp32Cases.map(c => c.id);

// Create shareable package
const pkg = shareCaseService.shareCases(
  caseIds,
  'Senior Technician',
  'ESP32 repair knowledge base',
  { format: 'json' }
);

// Save to file
// fs.writeFileSync('esp32_repairs.json', pkg.data);

// Colleague imports:
// const data = fs.readFileSync('esp32_repairs.json', 'utf8');
// shareCaseService.importSharedPackage(data);
```

---

## 📊 Benefits Summary

### For Individual Technicians
- **Learn from experience**: Query past repairs
- **Save time**: Find similar cases instantly
- **Track progress**: Monitor success rates and costs
- **Build reputation**: Share successful repairs

### For Teams
- **Knowledge sharing**: Offline case exchange
- **Standardization**: Common diagnostic procedures
- **Training**: New technicians learn from veterans
- **Quality control**: Track team-wide success rates

### For Community
- **Open knowledge**: Anyone can contribute patterns
- **No gatekeepers**: Add boards without code access
- **Collective intelligence**: Community improves platform
- **Future-proof**: Platform grows with user needs

---

## 🚀 Next Steps

1. **Use the system**: Start documenting your repairs
2. **Share knowledge**: Export and share successful cases
3. **Contribute**: Add your boards and patterns
4. **Analyze**: Use statistics to improve repair processes
5. **Teach**: Share case packages with trainees

---

## 📚 Related Documentation

- [ERA III Diagnostic Guide](./ERA_III_DIAGNOSTIC_GUIDE.md)
- [Community SDK Examples](./examples/README.md)
- [Configuration Guide](./CONFIGURATION.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**Remember**: Every case you document helps the entire community. Together, we're building the world's first open electronics repair knowledge base. 🛠️
