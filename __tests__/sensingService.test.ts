/**
 * Tests for ERA II Sensing Service
 */

import {sensingService} from '../src/services/sensingService';
import {SensorType} from '../src/types';

describe('SensingService', () => {
  beforeEach(() => {
    sensingService.clearAll();
  });

  describe('Sensor Initialization', () => {
    it('should initialize an audio sensor', () => {
      const sensor = sensingService.initializeSensor('audio');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('audio');
      expect(sensor?.status).toBe('disconnected');
      expect(sensor?.capabilities).toContain('noise_detection');
    });

    it('should initialize a microphone sensor', () => {
      const sensor = sensingService.initializeSensor('microphone');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('microphone');
      expect(sensor?.capabilities).toContain('click_detection');
    });

    it('should initialize a temperature sensor', () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('temperature');
      expect(sensor?.capabilities).toContain('temperature_monitoring');
    });

    it('should initialize a Bluetooth multimeter', () => {
      const sensor = sensingService.initializeSensor('bluetooth_multimeter');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('bluetooth_multimeter');
      expect(sensor?.capabilities).toContain('voltage');
    });

    it('should initialize a UART debug interface', () => {
      const sensor = sensingService.initializeSensor('uart_debug');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('uart_debug');
      expect(sensor?.capabilities).toContain('serial_monitoring');
    });

    it('should initialize an I2C sensor', () => {
      const sensor = sensingService.initializeSensor('i2c_sensor');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('i2c_sensor');
      expect(sensor?.capabilities).toContain('device_scanning');
    });

    it('should initialize an SPI sensor', () => {
      const sensor = sensingService.initializeSensor('spi_sensor');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('spi_sensor');
      expect(sensor?.capabilities).toContain('high_speed_data');
    });

    it('should initialize a visual topology sensor', () => {
      const sensor = sensingService.initializeSensor('visual_topology');
      expect(sensor).toBeDefined();
      expect(sensor?.type).toBe('visual_topology');
      expect(sensor?.capabilities).toContain('component_detection');
    });
  });

  describe('Sensor Control', () => {
    it('should start a sensor', async () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      const started = await sensingService.startSensor(sensor!.id);
      expect(started).toBe(true);

      const status = sensingService.getSensorStatus(sensor!.id);
      expect(status).toBe('connected');
    });

    it('should stop a sensor', async () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      await sensingService.startSensor(sensor!.id);
      const stopped = sensingService.stopSensor(sensor!.id);
      expect(stopped).toBe(true);

      const status = sensingService.getSensorStatus(sensor!.id);
      expect(status).toBe('disconnected');
    });

    it('should get all active sensors', () => {
      sensingService.initializeSensor('audio');
      sensingService.initializeSensor('temperature');
      sensingService.initializeSensor('bluetooth_multimeter');

      const sensors = sensingService.getActiveSensors();
      expect(sensors.length).toBe(3);
    });

    it('should get sensors by type', () => {
      // Clear first to ensure isolation
      sensingService.clearAll();
      
      sensingService.initializeSensor('audio');
      sensingService.initializeSensor('temperature');
      sensingService.initializeSensor('audio');

      const audioSensors = sensingService.getSensorsByType('audio');
      expect(audioSensors.length).toBe(2);
      expect(audioSensors[0].type).toBe('audio');
    });
  });

  describe('Sensing Session', () => {
    it('should start a new session', () => {
      const session = sensingService.startSession('sensing', 'board_001');
      expect(session).toBeDefined();
      expect(session.mode).toBe('sensing');
      expect(session.boardId).toBe('board_001');
      expect(session.activeSensors).toEqual([]);
    });

    it('should stop a session and calculate duration', () => {
      sensingService.startSession('measurement');

      // Wait a bit
      const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      return wait(100).then(() => {
        const session = sensingService.stopSession();
        expect(session).toBeDefined();
        expect(session!.duration).toBeGreaterThanOrEqual(0);
      });
    });

    it('should get current session', () => {
      const session = sensingService.startSession('inspection');
      const current = sensingService.getCurrentSession();
      expect(current).toEqual(session);
    });
  });

  describe('Measurements', () => {
    it('should record a measurement', () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      const measurement = sensingService.recordMeasurement(
        sensor!.id,
        25.5,
        'component_001',
      );

      expect(measurement).toBeDefined();
      expect(measurement.sensorId).toBe(sensor!.id);
      expect(measurement.value).toBe(25.5);
      expect(measurement.componentId).toBe('component_001');
      expect(measurement.unit).toBe('°C');
    });

    it('should get all measurements', () => {
      const sensor = sensingService.initializeSensor('audio');
      expect(sensor).toBeDefined();

      sensingService.recordMeasurement(sensor!.id, 100);
      sensingService.recordMeasurement(sensor!.id, 120);

      const measurements = sensingService.getMeasurements();
      expect(measurements.length).toBe(2);
    });

    it('should get measurements by sensor', () => {
      const sensor1 = sensingService.initializeSensor('temperature');
      const sensor2 = sensingService.initializeSensor('audio');
      expect(sensor1).toBeDefined();
      expect(sensor2).toBeDefined();

      sensingService.recordMeasurement(sensor1!.id, 25);
      sensingService.recordMeasurement(sensor2!.id, 100);
      sensingService.recordMeasurement(sensor1!.id, 26);

      const measurements = sensingService.getMeasurementsBySensor(sensor1!.id);
      expect(measurements.length).toBe(2);
      expect(measurements[0].value).toBe(25);
      expect(measurements[1].value).toBe(26);
    });
  });

  describe('Anomaly Detection', () => {
    it('should detect out-of-range anomalies', () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      const measurement = sensingService.recordMeasurement(sensor!.id, 100); // Too high

      const anomalies = sensingService.detectAnomalies(
        [measurement],
        {min: 20, max: 30},
      );

      expect(anomalies.length).toBe(1);
      expect(anomalies[0].anomalyType).toBe('out_of_range');
      expect(anomalies[0].severity).toBeTruthy();
    });

    it('should not detect anomalies for values in range', () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      const measurement = sensingService.recordMeasurement(sensor!.id, 25);

      const anomalies = sensingService.detectAnomalies(
        [measurement],
        {min: 20, max: 30},
      );

      expect(anomalies.length).toBe(0);
    });

    it('should calculate severity correctly', () => {
      const sensor = sensingService.initializeSensor('temperature');
      expect(sensor).toBeDefined();

      // Critical deviation (>50%)
      const measurement1 = sensingService.recordMeasurement(sensor!.id, 200);
      const anomalies1 = sensingService.detectAnomalies(
        [measurement1],
        {min: 20, max: 30},
      );
      expect(anomalies1[0].severity).toBe('critical');

      // Clear measurements for next test
      sensingService.clearAll();
      const sensor2 = sensingService.initializeSensor('temperature');

      // Medium deviation (~15%)
      const measurement2 = sensingService.recordMeasurement(sensor2!.id, 35);
      const anomalies2 = sensingService.detectAnomalies(
        [measurement2],
        {min: 20, max: 30},
      );
      expect(anomalies2[0].severity).toBe('medium');
    });
  });

  describe('Sensor Discovery', () => {
    it('should discover available sensors', async () => {
      const discovery = await sensingService.discoverSensors();

      expect(discovery).toBeDefined();
      expect(discovery.availableSensors).toBeDefined();
      expect(discovery.availableSensors.bluetooth).toBeInstanceOf(Array);
      expect(discovery.availableSensors.uart).toBeInstanceOf(Array);
      expect(discovery.availableSensors.i2c).toBeInstanceOf(Array);
      expect(discovery.availableSensors.spi).toBeInstanceOf(Array);
    });

    it('should return timestamp with discovery', async () => {
      const discovery = await sensingService.discoverSensors();
      expect(discovery.timestamp).toBeDefined();
      expect(new Date(discovery.timestamp).getTime()).toBeLessThanOrEqual(
        Date.now(),
      );
    });
  });

  describe('Audio Analysis', () => {
    it('should analyze audio noise', () => {
      const audioData = Array.from({length: 100}, () => Math.random() * 0.1);
      const analysis = sensingService.analyzeAudioNoise(audioData);

      expect(analysis).toBeDefined();
      expect(analysis.frequency).toBeGreaterThanOrEqual(0);
      expect(analysis.amplitude).toBeGreaterThanOrEqual(0);
      expect(analysis.pattern).toBeTruthy();
      expect(analysis.quality).toBeGreaterThanOrEqual(0);
      expect(analysis.quality).toBeLessThanOrEqual(100);
    });

    it('should detect clean signal', () => {
      const audioData = Array.from({length: 100}, () => 0.01); // Very low amplitude
      const analysis = sensingService.analyzeAudioNoise(audioData);

      expect(analysis.pattern).toBe('clean');
      expect(analysis.quality).toBeGreaterThan(90);
    });

    it('should detect static noise', () => {
      // Generate data that will definitely trigger static (high amplitude)
      const audioData = Array.from({length: 100}, () => Math.random() * 0.95 + 0.05);
      const analysis = sensingService.analyzeAudioNoise(audioData);

      // With high amplitude random data, it should detect static or clicking
      expect(['static', 'clicking']).toContain(analysis.pattern);
    });
  });

  describe('Simulation Helpers', () => {
    it('should simulate sensor reading for temperature', () => {
      const reading = sensingService.simulateSensorReading('temperature');
      expect(typeof reading).toBe('number');
      expect(reading).toBeGreaterThanOrEqual(25);
      expect(reading).toBeLessThanOrEqual(45);
    });

    it('should simulate sensor reading for bluetooth multimeter', () => {
      const reading = sensingService.simulateSensorReading('bluetooth_multimeter');
      expect(typeof reading).toBe('number');
      expect(reading).toBeGreaterThanOrEqual(4.75);
      expect(reading).toBeLessThanOrEqual(5.25);
    });
  });

  describe('Cleanup', () => {
    it('should clear all sensors and measurements', () => {
      sensingService.initializeSensor('audio');
      sensingService.initializeSensor('temperature');
      sensingService.startSession('sensing');

      sensingService.clearAll();

      expect(sensingService.getActiveSensors().length).toBe(0);
      expect(sensingService.getMeasurements().length).toBe(0);
      expect(sensingService.getCurrentSession()).toBeNull();
    });

    it('should remove a specific sensor', () => {
      const sensor = sensingService.initializeSensor('audio');
      expect(sensor).toBeDefined();

      const removed = sensingService.removeSensor(sensor!.id);
      expect(removed).toBe(true);

      const sensors = sensingService.getActiveSensors();
      expect(sensors.find(s => s.id === sensor!.id)).toBeUndefined();
    });
  });
});
