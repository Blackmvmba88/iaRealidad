# Contributing to iaRealidad

Thank you for your interest in contributing to the AR Electronics Repair Assistant! This document provides guidelines and instructions for contributing.

> 💡 **Want to contribute but not sure where to start?** Check our [ROADMAP.md](./ROADMAP.md) to see planned features and areas where we need help!

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Device/OS information
- React Native version

### Suggesting Features

Feature requests are welcome! Please check [ROADMAP.md](./ROADMAP.md) first to see if your feature is already planned.

When suggesting features, please include:
- Clear description of the feature
- Which ERA it belongs to (I, II, III, or IV)
- Use case and benefits
- Mockups or examples if applicable
- Technical considerations

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly on both platforms if possible
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Guidelines

### Code Style

- Follow the existing code style
- Use TypeScript for type safety
- Use functional components with hooks
- Keep components small and focused
- Add comments for complex logic

### Component Structure

```typescript
// Import order: React, React Native, third-party, local
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SomeLibrary} from 'some-library';
import {LocalType} from '../types';

// Props interface
interface Props {
  someProp: string;
  onAction: () => void;
}

// Component
const MyComponent: React.FC<Props> = ({someProp, onAction}) => {
  // State
  const [value, setValue] = useState('');
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Handlers
  const handlePress = () => {
    onAction();
  };
  
  // Render
  return (
    <View style={styles.container}>
      <Text>{someProp}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
```

### Testing

- Test on both iOS and Android when possible
- Verify camera permissions work correctly
- Test all 5 modes thoroughly
- Check performance on older devices
- Verify UI scales properly on different screen sizes

### Commit Messages

Use clear, descriptive commit messages:
- `feat: Add WiFi module guide`
- `fix: Resolve camera permission crash on Android`
- `docs: Update installation instructions`
- `style: Format code with Prettier`
- `refactor: Simplify AROverlay component`
- `test: Add unit tests for dataService`

## Areas for Contribution

> 📋 For a comprehensive view of planned features, see [ROADMAP.md](./ROADMAP.md)

### ERA I - Current Focus (60% Complete)

**High Priority - Completing AR Base:**
- [ ] More component types (inductors, diodes, transistors)
- [ ] Additional module guides (GPS, sensors, displays)
- [ ] Improved UI/UX and tutorials
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Better error handling and user feedback

**Medium Priority - ERA I Polish:**
- [ ] Unit and integration tests
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Documentation improvements
- [ ] More usage examples

### ERA II - Future (Perception & Validation)

- [ ] Machine learning integration for real component recognition
- [ ] OCR for component identification
- [ ] Automatic test point detection
- [ ] Tolerance validation system
- [ ] Electronic model library

### ERA III - Future (AI Technical Intelligence)

- [ ] Probabilistic diagnostic system
- [ ] Firmware generation templates
- [ ] Intelligent repair suggestions
- [ ] Compatibility checking engine

### ERA IV - Future (Community & Ecosystem)

- [ ] Cloud-based repair database
- [ ] Community-shared repair guides
- [ ] Save and load repair sessions
- [ ] Integration with component datasheets
- [ ] Parts ordering integration
- [ ] Collaborative AR features

### Enhancement Ideas (All Eras)

- [ ] Video recording of repair process
- [ ] Oscilloscope integration
- [ ] Schematic diagram overlay
- [ ] Export measurements and notes
- [ ] Improved AR tracking and stability

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AROverlay.tsx   # Main AR visualization
│   └── ModeSelector.tsx # Mode switching UI
├── screens/            # Full screens
│   ├── HomeScreen.tsx  # Landing page
│   └── ARCameraScreen.tsx # Camera view
├── services/           # Business logic
│   └── dataService.ts  # Data and guides
├── types/             # TypeScript types
│   └── index.ts       # Type definitions
└── App.tsx            # Root component
```

## Adding New Features

### Adding a New Mode

1. Add mode type to `src/types/index.ts`:
```typescript
export type RepairMode = 'inspection' | 'measurement' | 'repair' | 'creation' | 'validation' | 'your-new-mode';
```

2. Add mode data to `src/services/dataService.ts`

3. Add rendering logic to `src/components/AROverlay.tsx`:
```typescript
const renderYourNewMode = () => {
  // Your rendering logic
};
```

4. Add mode button to `ModeSelector.tsx`

5. Update HomeScreen with description

### Adding New Component Types

Edit `src/types/index.ts`:
```typescript
export interface Component {
  type: 'resistor' | 'capacitor' | 'ic' | 'your-new-type';
  // ... other fields
}
```

### Adding New Module Guides

Add to `src/services/dataService.ts`:
```typescript
export const yourModuleGuide: ModuleGuide = {
  id: 'mod_your_module',
  moduleName: 'Your Module',
  moduleType: 'YourType',
  // ... guide details
};
```

## Code Review Process

1. PRs require review before merging
2. Reviewers check:
   - Code quality and style
   - Test coverage
   - Documentation updates
   - Breaking changes
   - Performance impact

## Questions?

- Open an issue for questions
- Tag with "question" label
- We'll respond as soon as possible

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to iaRealidad! 🚀
