/**
 * ERA II: Sensing Service
 *
 * This service provides comprehensive sensing capabilities for iaRealidad,
 * enabling the app to "listen" to the physical world through various sensors.
 *
 * Features:
 * - Passive sensing: Audio, microphone, temperature, visual topology
 * - Active sensing: Bluetooth multimeters, UART, I2C, SPI
 * - Real-time data streaming
 * - Anomaly detection
 * - Sensor discovery and management
 */

import {
  Sensor,
  SensorType,
  SensorStatus,
  AudioSensor,
  MicrophoneSensor,
  TemperatureSensor,
  BluetoothMultimeter,
  UARTDebugInterface,
  I2CSensor,
  SPISensor,
  VisualTopologySensor,
  SensingMeasurement,
  SensingSession,
  AnomalyDetection,
  SensorDiscovery,
  SensorConfig,
} from '../types';

class SensingService {
  private activeSensors: Map<string, Sensor> = new Map();
  private currentSession: SensingSession | null = null;
  private measurements: SensingMeasurement[] = [];
  private sensorConfigs: Map<SensorType, SensorConfig> = new Map();
  private sensorIdCounter: number = 0;

  // ==================== SENSOR INITIALIZATION ====================

  /**
   * Initialize a sensor with default configuration
   */
  initializeSensor(
    type: SensorType,
    config?: Partial<SensorConfig>,
  ): Sensor | null {
    // Validate sensor type
    if (!type) {
      console.error('Sensor type is required');
      return null;
    }

    // Validate sampling rate if provided
    if (config?.samplingRate !== undefined && config.samplingRate <= 0) {
      console.error('Sampling rate must be positive');
      return null;
    }

    const defaultConfig: SensorConfig = {
      sensorType: type,
      enabled: true,
      autoStart: false,
      samplingRate: 10, // 10 Hz default
      ...config,
    };

    this.sensorConfigs.set(type, defaultConfig);

    // Create sensor based on type
    switch (type) {
      case 'audio':
        return this.createAudioSensor();
      case 'microphone':
        return this.createMicrophoneSensor();
      case 'temperature':
        return this.createTemperatureSensor();
      case 'bluetooth_multimeter':
        return this.createBluetoothMultimeterPlaceholder();
      case 'uart_debug':
        return this.createUARTDebugInterface();
      case 'i2c_sensor':
        return this.createI2CSensor();
      case 'spi_sensor':
        return this.createSPISensor();
      case 'visual_topology':
        return this.createVisualTopologySensor();
      default:
        console.error(`Unknown sensor type: ${type}`);
        return null;
    }
  }

  // ==================== SENSOR CREATION ====================

  private createAudioSensor(): AudioSensor {
    const sensor: AudioSensor = {
      id: `audio_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'Audio Analyzer',
      type: 'audio',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: [
        'noise_detection',
        'frequency_analysis',
        'pattern_recognition',
      ],
      frequency: 0,
      amplitude: 0,
      signalQuality: 0,
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createMicrophoneSensor(): MicrophoneSensor {
    const sensor: MicrophoneSensor = {
      id: `mic_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'Microphone Analyzer',
      type: 'microphone',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: ['click_detection', 'pattern_recognition'],
      clickDetected: false,
      clickCount: 0,
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createTemperatureSensor(): TemperatureSensor {
    const sensor: TemperatureSensor = {
      id: `temp_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'Temperature Monitor',
      type: 'temperature',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: [
        'temperature_monitoring',
        'trend_analysis',
        'threshold_alerts',
      ],
      currentTemp: 25, // Default room temperature
      threshold: {
        warning: 70,
        critical: 85,
      },
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createBluetoothMultimeterPlaceholder(): BluetoothMultimeter {
    const sensor: BluetoothMultimeter = {
      id: `btmm_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'Bluetooth Multimeter',
      type: 'bluetooth_multimeter',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: ['voltage', 'current', 'resistance', 'continuity'],
      deviceName: 'Unknown',
      deviceId: '',
      measurementType: 'voltage',
      currentValue: 0,
      unit: 'V',
      autoRange: true,
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createUARTDebugInterface(): UARTDebugInterface {
    const sensor: UARTDebugInterface = {
      id: `uart_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'UART Debug',
      type: 'uart_debug',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: ['serial_monitoring', 'logging', 'command_interface'],
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      buffer: [],
      logCount: 0,
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createI2CSensor(): I2CSensor {
    const sensor: I2CSensor = {
      id: `i2c_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'I2C Interface',
      type: 'i2c_sensor',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: ['device_scanning', 'register_reading', 'data_monitoring'],
      address: '0x00',
      scanResult: [],
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createSPISensor(): SPISensor {
    const sensor: SPISensor = {
      id: `spi_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'SPI Interface',
      type: 'spi_sensor',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: ['high_speed_data', 'multi_device', 'full_duplex'],
      clockSpeed: 1000000, // 1 MHz
      mode: 0,
      bitOrder: 'MSB',
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  private createVisualTopologySensor(): VisualTopologySensor {
    const sensor: VisualTopologySensor = {
      id: `visual_${Date.now()}_${this.sensorIdCounter++}`,
      name: 'Visual Topology Analyzer',
      type: 'visual_topology',
      status: 'disconnected',
      lastUpdated: new Date().toISOString(),
      capabilities: [
        'component_detection',
        'trace_mapping',
        'topology_analysis',
      ],
      detectedComponents: [],
      tracesDetected: [],
      confidenceLevel: 0,
    };
    this.activeSensors.set(sensor.id, sensor);
    return sensor;
  }

  // ==================== SENSOR CONTROL ====================

  /**
   * Start a sensor
   */
  async startSensor(sensorId: string): Promise<boolean> {
    const sensor = this.activeSensors.get(sensorId);
    if (!sensor) {
      return false;
    }

    sensor.status = 'connecting';
    sensor.lastUpdated = new Date().toISOString();

    // Simulate connection (in real implementation, this would connect to actual hardware)
    await this.simulateConnection(1000);

    sensor.status = 'connected';
    sensor.lastUpdated = new Date().toISOString();
    this.activeSensors.set(sensorId, sensor);

    return true;
  }

  /**
   * Stop a sensor
   */
  stopSensor(sensorId: string): boolean {
    const sensor = this.activeSensors.get(sensorId);
    if (!sensor) {
      return false;
    }

    sensor.status = 'disconnected';
    sensor.lastUpdated = new Date().toISOString();
    this.activeSensors.set(sensorId, sensor);

    return true;
  }

  /**
   * Get sensor status
   */
  getSensorStatus(sensorId: string): SensorStatus | null {
    const sensor = this.activeSensors.get(sensorId);
    return sensor ? sensor.status : null;
  }

  /**
   * Get all active sensors
   */
  getActiveSensors(): Sensor[] {
    return Array.from(this.activeSensors.values());
  }

  /**
   * Get sensors by type
   */
  getSensorsByType(type: SensorType): Sensor[] {
    return Array.from(this.activeSensors.values()).filter(
      sensor => sensor.type === type,
    );
  }

  // ==================== SENSING SESSION ====================

  /**
   * Start a new sensing session
   */
  startSession(mode: string, boardId?: string): SensingSession {
    this.currentSession = {
      id: `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      mode: mode as any,
      activeSensors: this.getActiveSensors(),
      measurements: [],
      duration: 0,
      boardId,
    };
    return this.currentSession;
  }

  /**
   * Stop current sensing session
   */
  stopSession(): SensingSession | null {
    if (this.currentSession) {
      const endTime = Date.now();
      const startTime = new Date(this.currentSession.timestamp).getTime();
      this.currentSession.duration = Math.floor((endTime - startTime) / 1000);
      this.currentSession.measurements = this.measurements;
    }
    const session = this.currentSession;
    this.currentSession = null;
    this.measurements = [];
    return session;
  }

  /**
   * Get current session
   */
  getCurrentSession(): SensingSession | null {
    return this.currentSession;
  }

  // ==================== MEASUREMENTS ====================

  /**
   * Record a measurement
   */
  recordMeasurement(
    sensorId: string,
    value: number | string | boolean,
    componentId?: string,
    pinId?: string,
  ): SensingMeasurement {
    // Validate input
    if (!sensorId) {
      throw new Error('Sensor ID is required');
    }

    if (value === null || value === undefined) {
      throw new Error('Measurement value is required');
    }

    const sensor = this.activeSensors.get(sensorId);
    if (!sensor) {
      throw new Error(`Sensor ${sensorId} not found`);
    }

    // Warn if sensor is not connected (but allow measurement for testing)
    if (sensor.status !== 'connected' && sensor.status !== 'streaming') {
      console.warn(
        `Warning: Recording measurement from disconnected sensor ${sensorId}`,
      );
    }

    const measurement: SensingMeasurement = {
      id: `measurement_${Date.now()}`,
      timestamp: new Date().toISOString(),
      sensorId,
      sensorType: sensor.type,
      value,
      componentId,
      pinId,
    };

    // Add unit based on sensor type
    if (sensor.type === 'bluetooth_multimeter') {
      measurement.unit = (sensor as BluetoothMultimeter).unit;
    } else if (sensor.type === 'temperature') {
      measurement.unit = '°C';
    } else if (sensor.type === 'audio') {
      measurement.unit = 'Hz/dB';
    }

    this.measurements.push(measurement);
    return measurement;
  }

  /**
   * Get measurements for current session
   */
  getMeasurements(): SensingMeasurement[] {
    return this.measurements;
  }

  /**
   * Get measurements by sensor
   */
  getMeasurementsBySensor(sensorId: string): SensingMeasurement[] {
    return this.measurements.filter(m => m.sensorId === sensorId);
  }

  // ==================== ANOMALY DETECTION ====================

  /**
   * Detect anomalies in sensor data
   */
  detectAnomalies(
    measurements: SensingMeasurement[],
    expectedRange?: {min: number; max: number},
  ): AnomalyDetection[] {
    const anomalies: AnomalyDetection[] = [];

    measurements.forEach(measurement => {
      if (typeof measurement.value === 'number' && expectedRange) {
        if (
          measurement.value < expectedRange.min ||
          measurement.value > expectedRange.max
        ) {
          anomalies.push({
            id: `anomaly_${Date.now()}`,
            timestamp: measurement.timestamp,
            sensorId: measurement.sensorId,
            anomalyType: 'out_of_range',
            severity: this.calculateSeverity(measurement.value, expectedRange),
            description: `Value ${measurement.value} is outside expected range [${expectedRange.min}, ${expectedRange.max}]`,
            suggestedActions: [
              'Verify sensor calibration',
              'Check component connections',
              'Review measurement setup',
            ],
            affectedComponents: measurement.componentId
              ? [measurement.componentId]
              : [],
            confidence: 85,
          });
        }
      }
    });

    return anomalies;
  }

  /**
   * Calculate severity of out-of-range measurement
   */
  private calculateSeverity(
    value: number,
    range: {min: number; max: number},
  ): 'low' | 'medium' | 'high' | 'critical' {
    const deviation =
      value < range.min
        ? ((range.min - value) / range.min) * 100
        : ((value - range.max) / range.max) * 100;

    if (deviation > 50) {
      return 'critical';
    }
    if (deviation > 25) {
      return 'high';
    }
    if (deviation > 10) {
      return 'medium';
    }
    return 'low';
  }

  // ==================== SENSOR DISCOVERY ====================

  /**
   * Discover available sensors
   */
  async discoverSensors(): Promise<SensorDiscovery> {
    // In real implementation, this would scan for actual devices
    // For now, return simulated discovery results
    return {
      availableSensors: {
        bluetooth: [
          {
            id: 'bt_001',
            name: 'DMM-100 Multimeter',
            type: 'multimeter',
            rssi: -65,
            paired: false,
          },
        ],
        uart: [
          {
            id: 'uart_001',
            port: '/dev/ttyUSB0',
            description: 'USB Serial Port',
            manufacturer: 'FTDI',
          },
        ],
        i2c: [
          {
            address: '0x48',
            type: 'Temperature Sensor',
            registers: 16,
          },
          {
            address: '0x68',
            type: 'Accelerometer',
            registers: 32,
          },
        ],
        spi: [
          {
            id: 'spi_001',
            chipSelect: 0,
            type: 'Flash Memory',
          },
        ],
      },
      timestamp: new Date().toISOString(),
    };
  }

  // ==================== AUDIO ANALYSIS ====================

  /**
   * Analyze audio for electrical noise patterns
   */
  analyzeAudioNoise(audioData: number[]): {
    frequency: number;
    amplitude: number;
    pattern: 'humming' | 'clicking' | 'buzzing' | 'static' | 'clean';
    quality: number;
  } {
    // Simplified audio analysis (in real implementation, use FFT)
    const avgAmplitude =
      audioData.reduce((sum, val) => sum + Math.abs(val), 0) / audioData.length;

    // Detect dominant frequency (simplified)
    const dominantFreq = this.detectDominantFrequency(audioData);

    // Classify noise pattern
    let pattern: 'humming' | 'clicking' | 'buzzing' | 'static' | 'clean' =
      'clean';
    if (dominantFreq > 100 && dominantFreq < 200) {
      pattern = 'humming'; // Likely 50/60 Hz mains hum
    } else if (avgAmplitude > 0.7) {
      pattern = 'static';
    } else if (dominantFreq > 1000) {
      pattern = 'buzzing';
    } else if (avgAmplitude > 0.3) {
      pattern = 'clicking';
    }

    const quality = Math.max(0, 100 - avgAmplitude * 100);

    return {
      frequency: dominantFreq,
      amplitude: avgAmplitude,
      pattern,
      quality,
    };
  }

  /**
   * Detect dominant frequency in audio signal (simplified)
   */
  private detectDominantFrequency(audioData: number[]): number {
    // Simplified frequency detection
    // In real implementation, use FFT (Fast Fourier Transform)
    let crossings = 0;

    for (let i = 1; i < audioData.length; i++) {
      if (
        (audioData[i] >= 0 && audioData[i - 1] < 0) ||
        (audioData[i] < 0 && audioData[i - 1] >= 0)
      ) {
        crossings++;
      }
    }

    // Estimate frequency from zero crossings
    const sampleRate = 44100; // Assuming 44.1 kHz sample rate
    const frequency = (crossings / 2) * (sampleRate / audioData.length);

    return Math.round(frequency);
  }

  // ==================== SIMULATION HELPERS ====================

  /**
   * Simulate sensor connection delay
   */
  private simulateConnection(delay: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Simulate sensor reading
   */
  simulateSensorReading(
    sensorType: SensorType,
    _componentId?: string,
  ): number | string {
    switch (sensorType) {
      case 'temperature':
        return 25 + Math.random() * 20; // 25-45°C
      case 'bluetooth_multimeter':
        return 5.0 + (Math.random() - 0.5) * 0.5; // ~5V with noise
      case 'audio':
        return Math.random() * 100; // Frequency in Hz
      default:
        return Math.random();
    }
  }

  // ==================== CLEANUP ====================

  /**
   * Clear all sensors and measurements
   */
  clearAll(): void {
    this.activeSensors.clear();
    this.measurements = [];
    this.currentSession = null;
    this.sensorConfigs.clear();
  }

  /**
   * Remove a sensor
   */
  removeSensor(sensorId: string): boolean {
    return this.activeSensors.delete(sensorId);
  }
}

export const sensingService = new SensingService();
