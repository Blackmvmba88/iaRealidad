import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {RepairMode} from '../types';
import AROverlay from '../components/AROverlay';
import ModeSelector from '../components/ModeSelector';

type ARCameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ARCamera'
>;

interface Props {
  navigation: ARCameraScreenNavigationProp;
}

const ARCameraScreen: React.FC<Props> = ({navigation}) => {
  const [currentMode, setCurrentMode] = useState<RepairMode>('inspection');
  const [isActive, setIsActive] = useState(true);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            'Camera Permission Required',
            'This app needs camera access to provide AR features.',
            [
              {text: 'Cancel', onPress: () => navigation.goBack()},
              {text: 'Grant', onPress: requestPermission},
            ],
          );
        }
      }
    };
    checkPermission();
  }, [hasPermission, requestPermission, navigation]);

  useEffect(() => {
    return () => {
      setIsActive(false);
    };
  }, []);

  const handleModeChange = useCallback((mode: RepairMode) => {
    setCurrentMode(mode);
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
      />
      
      <AROverlay mode={currentMode} />
      
      <ModeSelector currentMode={currentMode} onModeChange={handleModeChange} />
      
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 16,
  },
  controls: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  backButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    borderRadius: 8,
    padding: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ARCameraScreen;
