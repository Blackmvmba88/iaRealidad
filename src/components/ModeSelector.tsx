import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RepairMode} from '../types';

interface Props {
  currentMode: RepairMode;
  onModeChange: (mode: RepairMode) => void;
}

const ModeSelector: React.FC<Props> = ({currentMode, onModeChange}) => {
  const modes: {mode: RepairMode; label: string; icon: string}[] = [
    {mode: 'inspection', label: 'Inspect', icon: '🔍'},
    {mode: 'measurement', label: 'Measure', icon: '📊'},
    {mode: 'repair', label: 'Repair', icon: '🔧'},
    {mode: 'creation', label: 'Create', icon: '⚡'},
    {mode: 'validation', label: 'Validate', icon: '✓'},
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {modes.map(mode => (
          <TouchableOpacity
            key={mode.mode}
            style={[
              styles.modeButton,
              currentMode === mode.mode && styles.modeButtonActive,
            ]}
            onPress={() => onModeChange(mode.mode)}>
            <Text style={styles.modeIcon}>{mode.icon}</Text>
            <Text
              style={[
                styles.modeLabel,
                currentMode === mode.mode && styles.modeLabelActive,
              ]}>
              {mode.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  modeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    minWidth: 80,
  },
  modeButtonActive: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    borderColor: '#fff',
  },
  modeIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  modeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modeLabelActive: {
    fontWeight: 'bold',
  },
});

export default ModeSelector;
