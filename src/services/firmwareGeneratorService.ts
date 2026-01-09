import {FirmwareStub} from '../types';

/**
 * Service for generating firmware stubs for different platforms and modules
 */
export class FirmwareGeneratorService {
  /**
   * Generate ESP32 WiFi basic firmware
   * @param ssid WiFi network name
   * @param password WiFi password
   * @returns FirmwareStub with complete Arduino code
   * @security WARNING: WiFi credentials are embedded in plain text. For production,
   *           consider using WiFiManager library with captive portal for secure credential input.
   */
  generateESP32WiFiFirmware(
    ssid: string = 'YOUR_SSID',
    password: string = 'YOUR_PASSWORD',
  ): FirmwareStub {
    // Sanitize inputs to prevent code injection
    const safeSsid = ssid.replace(/['"\\]/g, '');
    const safePassword = password.replace(/['"\\]/g, '');

    return {
      id: 'fw_esp32_wifi_basic',
      moduleName: 'ESP32 WiFi Module',
      moduleType: 'WiFi',
      platform: 'esp32',
      code: `/*
 * ESP32 WiFi Basic Connection
 * Board: ESP32 Dev Module
 * 
 * This firmware connects ESP32 to WiFi and provides basic web server functionality
 * 
 * SECURITY WARNING: WiFi credentials are stored in plain text in this sketch.
 * For production use, consider using WiFiManager library with captive portal
 * to securely configure credentials without hardcoding them.
 */

#include <WiFi.h>
#include <WebServer.h>

// WiFi credentials
const char* ssid = "${safeSsid}";
const char* password = "${safePassword}";

// Web server on port 80
WebServer server(80);

// LED pin (built-in LED on most ESP32 boards)
#define LED_PIN 2

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  Serial.println("\\nESP32 WiFi Module Starting...");
  
  // Initialize LED pin
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Connect to WiFi
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  // Wait for connection
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\\nWiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    Serial.print("Signal strength (RSSI): ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    
    // Blink LED to indicate successful connection
    for (int i = 0; i < 3; i++) {
      digitalWrite(LED_PIN, HIGH);
      delay(200);
      digitalWrite(LED_PIN, LOW);
      delay(200);
    }
  } else {
    Serial.println("\\nWiFi connection failed!");
    Serial.println("Please check your credentials and try again.");
  }
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/status", handleStatus);
  server.on("/led/on", handleLEDOn);
  server.on("/led/off", handleLEDOff);
  server.onNotFound(handleNotFound);
  
  // Start web server
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  // Handle client requests
  server.handleClient();
  
  // Check WiFi connection status
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi connection lost. Attempting to reconnect...");
    WiFi.reconnect();
    delay(5000);
  }
}

// Handle root URL
void handleRoot() {
  String html = "<html><body>";
  html += "<h1>ESP32 Web Server</h1>";
  html += "<p>WiFi Status: Connected</p>";
  html += "<p>IP: " + WiFi.localIP().toString() + "</p>";
  html += "<p><a href='/led/on'>Turn LED ON</a></p>";
  html += "<p><a href='/led/off'>Turn LED OFF</a></p>";
  html += "<p><a href='/status'>View Status</a></p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

// Handle status request
void handleStatus() {
  String json = "{";
  json += "\\"wifi_status\\": \\"connected\\",";
  json += "\\"ssid\\": \\"" + String(ssid) + "\\",";
  json += "\\"ip\\": \\"" + WiFi.localIP().toString() + "\\",";
  json += "\\"rssi\\": " + String(WiFi.RSSI()) + ",";
  json += "\\"mac\\": \\"" + WiFi.macAddress() + "\\"";
  json += "}";
  server.send(200, "application/json", json);
}

// Handle LED ON request
void handleLEDOn() {
  digitalWrite(LED_PIN, HIGH);
  server.send(200, "text/plain", "LED is ON");
}

// Handle LED OFF request
void handleLEDOff() {
  digitalWrite(LED_PIN, LOW);
  server.send(200, "text/plain", "LED is OFF");
}

// Handle 404 errors
void handleNotFound() {
  server.send(404, "text/plain", "404: Not Found");
}`,
      dependencies: [
        'WiFi (built-in ESP32 library)',
        'WebServer (built-in ESP32 library)',
      ],
      instructions: [
        'Install Arduino IDE 1.8.x or 2.x',
        'Install ESP32 board support: File > Preferences > Additional Boards Manager URLs: https://dl.espressif.com/dl/package_esp32_index.json',
        'Go to Tools > Board > Boards Manager, search for "esp32" and install',
        'Select your ESP32 board: Tools > Board > ESP32 Arduino > ESP32 Dev Module',
        'Select the correct COM port: Tools > Port',
        'Replace YOUR_SSID and YOUR_PASSWORD with your WiFi credentials',
        'Click Upload to flash the code',
        'Open Serial Monitor at 115200 baud to see connection status',
        'Once connected, open the IP address shown in Serial Monitor in your web browser',
        'Test the web interface and LED control',
      ],
    };
  }

  /**
   * Generate ESP32 Bluetooth firmware
   * @param deviceName Bluetooth device name (max 32 characters)
   * @returns FirmwareStub with Bluetooth Serial code
   */
  generateESP32BluetoothFirmware(
    deviceName: string = 'ESP32_BT',
  ): FirmwareStub {
    // Sanitize device name: max 32 chars, alphanumeric + underscore/hyphen
    const safeDeviceName = deviceName
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 32);

    return {
      id: 'fw_esp32_bt_serial',
      moduleName: 'ESP32 Bluetooth Serial',
      moduleType: 'Bluetooth',
      platform: 'esp32',
      code: `/*
 * ESP32 Bluetooth Serial Communication
 * Board: ESP32 Dev Module
 * 
 * This firmware enables Bluetooth Serial communication on ESP32
 */

#include "BluetoothSerial.h"

// Check if Bluetooth is available
#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run 'make menuconfig' to enable it
#endif

// Bluetooth Serial object
BluetoothSerial SerialBT;

// Device name
String deviceName = "${safeDeviceName}";

void setup() {
  // Initialize serial communication
  Serial.begin(115200);
  Serial.println("ESP32 Bluetooth Serial Starting...");
  
  // Initialize Bluetooth
  if (!SerialBT.begin(deviceName)) {
    Serial.println("An error occurred initializing Bluetooth");
  } else {
    Serial.println("Bluetooth initialized successfully");
    Serial.print("Device name: ");
    Serial.println(deviceName);
    Serial.println("You can now pair with the device from your phone!");
  }
  
  // Built-in LED
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // Check if data received from Bluetooth
  if (SerialBT.available()) {
    String received = SerialBT.readString();
    Serial.print("Bluetooth received: ");
    Serial.println(received);
    
    // Echo back to Bluetooth
    SerialBT.print("Echo: ");
    SerialBT.println(received);
    
    // Simple command processing
    received.trim();
    if (received == "LED_ON") {
      digitalWrite(LED_BUILTIN, HIGH);
      SerialBT.println("LED turned ON");
      Serial.println("LED turned ON");
    } else if (received == "LED_OFF") {
      digitalWrite(LED_BUILTIN, LOW);
      SerialBT.println("LED turned OFF");
      Serial.println("LED turned OFF");
    } else if (received == "STATUS") {
      SerialBT.println("ESP32 is running");
      SerialBT.print("Free heap: ");
      SerialBT.println(ESP.getFreeHeap());
    }
  }
  
  // Check if data received from Serial Monitor
  if (Serial.available()) {
    String sent = Serial.readString();
    SerialBT.print(sent);
  }
  
  delay(20);
}`,
      dependencies: ['BluetoothSerial (built-in ESP32 library)'],
      instructions: [
        'Install Arduino IDE with ESP32 support (see WiFi firmware instructions)',
        'Select ESP32 Dev Module board',
        'Make sure Bluetooth is enabled in ESP32 board settings',
        'Customize deviceName if desired',
        'Upload the code to ESP32',
        'Open Serial Monitor at 115200 baud',
        'On your phone, scan for Bluetooth devices and pair with ESP32',
        'Use a Bluetooth Serial Terminal app to connect and send commands',
        'Try commands: LED_ON, LED_OFF, STATUS',
        'Or simply send text to see it echoed back',
      ],
    };
  }

  /**
   * Generate ESP32 combined WiFi + Bluetooth firmware
   * @param ssid WiFi network name
   * @param password WiFi password
   * @param btName Bluetooth device name
   * @returns FirmwareStub with combined WiFi and Bluetooth code
   * @security WARNING: Credentials are embedded in plain text. For production,
   *           use secure credential storage or WiFiManager library.
   */
  generateESP32CombinedFirmware(
    ssid: string = 'YOUR_SSID',
    password: string = 'YOUR_PASSWORD',
    btName: string = 'ESP32_Device',
  ): FirmwareStub {
    // Sanitize inputs
    const safeSsid = ssid.replace(/['"\\]/g, '');
    const safePassword = password.replace(/['"\\]/g, '');
    const safeBtName = btName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 32);

    return {
      id: 'fw_esp32_combined',
      moduleName: 'ESP32 WiFi + Bluetooth',
      moduleType: 'WiFi',
      platform: 'esp32',
      code: `/*
 * ESP32 WiFi + Bluetooth Combined
 * Board: ESP32 Dev Module
 * 
 * This firmware enables both WiFi and Bluetooth on ESP32
 * 
 * SECURITY WARNING: Credentials are stored in plain text.
 * For production, consider using WiFiManager or secure storage.
 */

#include <WiFi.h>
#include <WebServer.h>
#include "BluetoothSerial.h"

// WiFi credentials
const char* ssid = "${safeSsid}";
const char* password = "${safePassword}";

// Bluetooth device name
String btDeviceName = "${safeBtName}";

// Web server and Bluetooth Serial
WebServer server(80);
BluetoothSerial SerialBT;

#define LED_PIN 2

void setup() {
  Serial.begin(115200);
  Serial.println("\\nESP32 WiFi + Bluetooth Module Starting...");
  
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
  
  // Initialize WiFi
  setupWiFi();
  
  // Initialize Bluetooth
  setupBluetooth();
  
  // Setup web server
  setupWebServer();
  
  Serial.println("\\nSetup complete!");
  Serial.println("WiFi IP: " + WiFi.localIP().toString());
  Serial.println("Bluetooth: " + btDeviceName);
}

void setupWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\\nWiFi connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\\nWiFi connection failed!");
  }
}

void setupBluetooth() {
  if (!SerialBT.begin(btDeviceName)) {
    Serial.println("Bluetooth initialization failed");
  } else {
    Serial.println("Bluetooth initialized: " + btDeviceName);
  }
}

void setupWebServer() {
  server.on("/", []() {
    String html = "<h1>ESP32 WiFi + BT</h1>";
    html += "<p>WiFi: " + WiFi.localIP().toString() + "</p>";
    html += "<p>BT: " + btDeviceName + "</p>";
    html += "<p><a href='/led/on'>LED ON</a> | <a href='/led/off'>LED OFF</a></p>";
    server.send(200, "text/html", html);
  });
  
  server.on("/led/on", []() {
    digitalWrite(LED_PIN, HIGH);
    server.send(200, "text/plain", "LED ON");
    SerialBT.println("LED turned ON via WiFi");
  });
  
  server.on("/led/off", []() {
    digitalWrite(LED_PIN, LOW);
    server.send(200, "text/plain", "LED OFF");
    SerialBT.println("LED turned OFF via WiFi");
  });
  
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  server.handleClient();
  
  // Handle Bluetooth data
  if (SerialBT.available()) {
    String btData = SerialBT.readString();
    btData.trim();
    Serial.println("BT: " + btData);
    
    if (btData == "LED_ON") {
      digitalWrite(LED_PIN, HIGH);
      SerialBT.println("LED ON");
    } else if (btData == "LED_OFF") {
      digitalWrite(LED_PIN, LOW);
      SerialBT.println("LED OFF");
    } else if (btData == "STATUS") {
      SerialBT.println("WiFi: " + WiFi.localIP().toString());
      SerialBT.println("RSSI: " + String(WiFi.RSSI()) + " dBm");
    }
  }
  
  delay(10);
}`,
      dependencies: [
        'WiFi (built-in)',
        'WebServer (built-in)',
        'BluetoothSerial (built-in)',
      ],
      instructions: [
        'Install Arduino IDE with ESP32 support',
        'Select ESP32 Dev Module board',
        'Update WiFi credentials (ssid, password)',
        'Customize Bluetooth device name if desired',
        'Upload the firmware',
        'Monitor Serial output at 115200 baud',
        'Connect to the device via WiFi (web browser) or Bluetooth (BT terminal app)',
        'Control LED from both WiFi and Bluetooth interfaces',
      ],
    };
  }

  /**
   * Generate ESP8266 WiFi firmware
   * @param ssid WiFi network name
   * @param password WiFi password
   * @returns FirmwareStub with ESP8266 WiFi code
   * @security WARNING: Credentials are embedded in plain text.
   */
  generateESP8266WiFiFirmware(
    ssid: string = 'YOUR_SSID',
    password: string = 'YOUR_PASSWORD',
  ): FirmwareStub {
    // Sanitize inputs
    const safeSsid = ssid.replace(/['"\\]/g, '');
    const safePassword = password.replace(/['"\\]/g, '');

    return {
      id: 'fw_esp8266_wifi',
      moduleName: 'ESP8266 WiFi Module',
      moduleType: 'WiFi',
      platform: 'esp8266',
      code: `/*
 * ESP8266 WiFi Basic Connection
 * Board: NodeMCU 1.0 (ESP-12E Module)
 * 
 * This firmware connects ESP8266 to WiFi
 * 
 * SECURITY WARNING: Credentials are stored in plain text.
 */

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

const char* ssid = "${safeSsid}";
const char* password = "${safePassword}";

ESP8266WebServer server(80);

#define LED_PIN LED_BUILTIN // or use specific GPIO like D4

void setup() {
  Serial.begin(115200);
  Serial.println("\\nESP8266 WiFi Module Starting...");
  
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH); // LED off (inverted on NodeMCU)
  
  // Connect to WiFi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\\nConnected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
  
  // Setup web server
  server.on("/", handleRoot);
  server.on("/led/on", []() {
    digitalWrite(LED_PIN, LOW); // LED on (inverted)
    server.send(200, "text/plain", "LED ON");
  });
  server.on("/led/off", []() {
    digitalWrite(LED_PIN, HIGH); // LED off (inverted)
    server.send(200, "text/plain", "LED OFF");
  });
  
  server.begin();
  Serial.println("HTTP server started");
}

void handleRoot() {
  String html = "<h1>ESP8266 Web Server</h1>";
  html += "<p>IP: " + WiFi.localIP().toString() + "</p>";
  html += "<p><a href='/led/on'>LED ON</a> | <a href='/led/off'>LED OFF</a></p>";
  server.send(200, "text/html", html);
}

void loop() {
  server.handleClient();
}`,
      dependencies: ['ESP8266WiFi (built-in)', 'ESP8266WebServer (built-in)'],
      instructions: [
        'Install Arduino IDE',
        'Add ESP8266 board: File > Preferences > Additional Boards Manager URLs: http://arduino.esp8266.com/stable/package_esp8266com_index.json',
        'Install ESP8266 boards via Boards Manager',
        'Select NodeMCU 1.0 board',
        'Update WiFi credentials',
        'Upload and monitor at 115200 baud',
      ],
    };
  }
}

// Export singleton instance
export const firmwareGeneratorService = new FirmwareGeneratorService();
export default firmwareGeneratorService;
