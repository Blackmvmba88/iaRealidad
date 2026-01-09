import {firmwareGeneratorService} from '../src/services/firmwareGeneratorService';

describe('Firmware Generator Service', () => {
  describe('generateESP32WiFiFirmware', () => {
    it('should generate ESP32 WiFi firmware with custom credentials', () => {
      const firmware = firmwareGeneratorService.generateESP32WiFiFirmware(
        'MyNetwork',
        'MyPassword123',
      );

      expect(firmware.id).toBe('fw_esp32_wifi_basic');
      expect(firmware.platform).toBe('esp32');
      expect(firmware.moduleType).toBe('WiFi');
      expect(firmware.code).toContain('MyNetwork');
      expect(firmware.code).toContain('MyPassword123');
      expect(firmware.code).toContain('#include <WiFi.h>');
      expect(firmware.code).toContain('#include <WebServer.h>');
    });

    it('should generate ESP32 WiFi firmware with default credentials', () => {
      const firmware = firmwareGeneratorService.generateESP32WiFiFirmware();

      expect(firmware.code).toContain('YOUR_SSID');
      expect(firmware.code).toContain('YOUR_PASSWORD');
    });

    it('should include web server endpoints', () => {
      const firmware = firmwareGeneratorService.generateESP32WiFiFirmware();

      expect(firmware.code).toContain('server.on("/", handleRoot)');
      expect(firmware.code).toContain('server.on("/status", handleStatus)');
      expect(firmware.code).toContain('server.on("/led/on", handleLEDOn)');
      expect(firmware.code).toContain('server.on("/led/off", handleLEDOff)');
    });

    it('should have setup and installation instructions', () => {
      const firmware = firmwareGeneratorService.generateESP32WiFiFirmware();

      expect(firmware.instructions.length).toBeGreaterThan(0);
      expect(firmware.instructions.some(i => i.includes('Arduino IDE'))).toBe(
        true,
      );
      expect(firmware.instructions.some(i => i.includes('ESP32'))).toBe(true);
    });

    it('should list required dependencies', () => {
      const firmware = firmwareGeneratorService.generateESP32WiFiFirmware();

      expect(firmware.dependencies).toContain('WiFi (built-in ESP32 library)');
      expect(firmware.dependencies).toContain(
        'WebServer (built-in ESP32 library)',
      );
    });
  });

  describe('generateESP32BluetoothFirmware', () => {
    it('should generate ESP32 Bluetooth firmware with custom device name', () => {
      const firmware =
        firmwareGeneratorService.generateESP32BluetoothFirmware('MyESP32_BT');

      expect(firmware.id).toBe('fw_esp32_bt_serial');
      expect(firmware.platform).toBe('esp32');
      expect(firmware.moduleType).toBe('Bluetooth');
      expect(firmware.code).toContain('MyESP32_BT');
      expect(firmware.code).toContain('#include "BluetoothSerial.h"');
    });

    it('should generate ESP32 Bluetooth firmware with default device name', () => {
      const firmware =
        firmwareGeneratorService.generateESP32BluetoothFirmware();

      expect(firmware.code).toContain('ESP32_BT');
    });

    it('should include LED control commands', () => {
      const firmware =
        firmwareGeneratorService.generateESP32BluetoothFirmware();

      expect(firmware.code).toContain('LED_ON');
      expect(firmware.code).toContain('LED_OFF');
      expect(firmware.code).toContain('STATUS');
    });

    it('should have Bluetooth configuration check', () => {
      const firmware =
        firmwareGeneratorService.generateESP32BluetoothFirmware();

      expect(firmware.code).toContain('CONFIG_BT_ENABLED');
      expect(firmware.code).toContain('CONFIG_BLUEDROID_ENABLED');
    });

    it('should list Bluetooth dependencies', () => {
      const firmware =
        firmwareGeneratorService.generateESP32BluetoothFirmware();

      expect(firmware.dependencies).toContain(
        'BluetoothSerial (built-in ESP32 library)',
      );
    });
  });

  describe('generateESP32CombinedFirmware', () => {
    it('should generate combined WiFi + Bluetooth firmware', () => {
      const firmware = firmwareGeneratorService.generateESP32CombinedFirmware(
        'TestNetwork',
        'TestPass',
        'TestDevice',
      );

      expect(firmware.id).toBe('fw_esp32_combined');
      expect(firmware.platform).toBe('esp32');
      expect(firmware.code).toContain('TestNetwork');
      expect(firmware.code).toContain('TestPass');
      expect(firmware.code).toContain('TestDevice');
    });

    it('should include both WiFi and Bluetooth libraries', () => {
      const firmware = firmwareGeneratorService.generateESP32CombinedFirmware();

      expect(firmware.code).toContain('#include <WiFi.h>');
      expect(firmware.code).toContain('#include <WebServer.h>');
      expect(firmware.code).toContain('#include "BluetoothSerial.h"');
    });

    it('should have setup functions for both WiFi and Bluetooth', () => {
      const firmware = firmwareGeneratorService.generateESP32CombinedFirmware();

      expect(firmware.code).toContain('setupWiFi()');
      expect(firmware.code).toContain('setupBluetooth()');
      expect(firmware.code).toContain('setupWebServer()');
    });

    it('should handle data from both interfaces', () => {
      const firmware = firmwareGeneratorService.generateESP32CombinedFirmware();

      expect(firmware.code).toContain('server.handleClient()');
      expect(firmware.code).toContain('SerialBT.available()');
    });

    it('should list all required dependencies', () => {
      const firmware = firmwareGeneratorService.generateESP32CombinedFirmware();

      expect(firmware.dependencies).toContain('WiFi (built-in)');
      expect(firmware.dependencies).toContain('WebServer (built-in)');
      expect(firmware.dependencies).toContain('BluetoothSerial (built-in)');
    });
  });

  describe('generateESP8266WiFiFirmware', () => {
    it('should generate ESP8266 WiFi firmware', () => {
      const firmware = firmwareGeneratorService.generateESP8266WiFiFirmware(
        'ESP8266Net',
        'ESP8266Pass',
      );

      expect(firmware.id).toBe('fw_esp8266_wifi');
      expect(firmware.platform).toBe('esp8266');
      expect(firmware.moduleType).toBe('WiFi');
      expect(firmware.code).toContain('ESP8266Net');
      expect(firmware.code).toContain('ESP8266Pass');
    });

    it('should use ESP8266-specific libraries', () => {
      const firmware = firmwareGeneratorService.generateESP8266WiFiFirmware();

      expect(firmware.code).toContain('#include <ESP8266WiFi.h>');
      expect(firmware.code).toContain('#include <ESP8266WebServer.h>');
      expect(firmware.code).not.toContain('#include <WiFi.h>'); // Should not use ESP32 WiFi
    });

    it('should handle NodeMCU LED polarity (inverted)', () => {
      const firmware = firmwareGeneratorService.generateESP8266WiFiFirmware();

      expect(firmware.code).toContain('LED_BUILTIN');
      // Should have comments about inverted LED
      expect(
        firmware.code.toLowerCase().includes('inverted') ||
          firmware.code.includes('HIGH') ||
          firmware.code.includes('LOW'),
      ).toBe(true);
    });

    it('should list ESP8266-specific dependencies', () => {
      const firmware = firmwareGeneratorService.generateESP8266WiFiFirmware();

      expect(firmware.dependencies).toContain('ESP8266WiFi (built-in)');
      expect(firmware.dependencies).toContain('ESP8266WebServer (built-in)');
    });

    it('should have ESP8266 board installation instructions', () => {
      const firmware = firmwareGeneratorService.generateESP8266WiFiFirmware();

      expect(
        firmware.instructions.some(
          i => i.includes('ESP8266') || i.includes('esp8266'),
        ),
      ).toBe(true);
      expect(firmware.instructions.some(i => i.includes('NodeMCU'))).toBe(true);
    });
  });

  describe('Common firmware properties', () => {
    it('all firmwares should have required fields', () => {
      const firmwares = [
        firmwareGeneratorService.generateESP32WiFiFirmware(),
        firmwareGeneratorService.generateESP32BluetoothFirmware(),
        firmwareGeneratorService.generateESP32CombinedFirmware(),
        firmwareGeneratorService.generateESP8266WiFiFirmware(),
      ];

      firmwares.forEach(firmware => {
        expect(firmware.id).toBeDefined();
        expect(firmware.moduleName).toBeDefined();
        expect(firmware.moduleType).toBeDefined();
        expect(firmware.platform).toBeDefined();
        expect(firmware.code).toBeDefined();
        expect(firmware.code.length).toBeGreaterThan(0);
        expect(firmware.dependencies).toBeDefined();
        expect(firmware.dependencies.length).toBeGreaterThan(0);
        expect(firmware.instructions).toBeDefined();
        expect(firmware.instructions.length).toBeGreaterThan(0);
      });
    });

    it('all firmwares should have setup and loop functions', () => {
      const firmwares = [
        firmwareGeneratorService.generateESP32WiFiFirmware(),
        firmwareGeneratorService.generateESP32BluetoothFirmware(),
        firmwareGeneratorService.generateESP32CombinedFirmware(),
        firmwareGeneratorService.generateESP8266WiFiFirmware(),
      ];

      firmwares.forEach(firmware => {
        expect(firmware.code).toContain('void setup()');
        expect(firmware.code).toContain('void loop()');
        expect(firmware.code).toContain('Serial.begin');
      });
    });
  });
});
