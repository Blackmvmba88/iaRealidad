import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {RepairMode} from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [selectedMode, setSelectedMode] = useState<RepairMode>('inspection');

  const modes: {
    mode: RepairMode;
    title: string;
    description: string;
    icon: string;
  }[] = [
    {
      mode: 'inspection',
      title: 'Inspection',
      description: 'Identify components, pins, and connections on circuit boards',
      icon: '🔍',
    },
    {
      mode: 'measurement',
      title: 'Measurement',
      description: 'Guide multimeter probing with expected voltage/resistance ranges',
      icon: '📊',
    },
    {
      mode: 'repair',
      title: 'Repair',
      description: 'Step-by-step repair instructions with component highlighting',
      icon: '🔧',
    },
    {
      mode: 'creation',
      title: 'Creation',
      description: 'Guide adding Bluetooth/WiFi modules and new components',
      icon: '⚡',
    },
    {
      mode: 'validation',
      title: 'Validation',
      description: 'Test circuit functionality and verify connections',
      icon: '✓',
    },
  ];

  const handleStartAR = () => {
    navigation.navigate('ARCamera');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Electronics Repair Assistant</Text>
          <Text style={styles.subtitle}>
            Select a mode to start AR-guided electronics work
          </Text>
        </View>

        <View style={styles.modesContainer}>
          {modes.map(mode => (
            <TouchableOpacity
              key={mode.mode}
              style={[
                styles.modeCard,
                selectedMode === mode.mode && styles.modeCardSelected,
              ]}
              onPress={() => setSelectedMode(mode.mode)}>
              <Text style={styles.modeIcon}>{mode.icon}</Text>
              <Text style={styles.modeTitle}>{mode.title}</Text>
              <Text style={styles.modeDescription}>{mode.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStartAR}>
          <Text style={styles.startButtonText}>Start AR Mode</Text>
        </TouchableOpacity>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Features:</Text>
          <Text style={styles.featureItem}>
            • Real-time component overlay and identification
          </Text>
          <Text style={styles.featureItem}>
            • Pin highlighting (VCC, GND, GPIO, etc.)
          </Text>
          <Text style={styles.featureItem}>
            • Multimeter probing guidance
          </Text>
          <Text style={styles.featureItem}>
            • Module installation instructions
          </Text>
          <Text style={styles.featureItem}>
            • Circuit validation and testing
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  modesContainer: {
    marginBottom: 24,
  },
  modeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeCardSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  modeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  features: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});

export default HomeScreen;
