# ERA II: Hardware Compatibility Guide

## 🔌 Supported Hardware for Sensing Capabilities

This guide lists compatible hardware devices and sensors that can be integrated with iaRealidad's ERA II sensing capabilities.

---

## 📱 Bluetooth Multimeters

### Officially Tested
- **Aneng AN8009**: Full voltage, current, resistance support
- **Owon B35T+**: Bluetooth 4.0, auto-ranging multimeter
- **Fluke 117**: Professional-grade with Bluetooth dongle
- **UNI-T UT61E**: Low-cost option with good accuracy

### Community Reported Working
- Brymen BM869s
- KAIWEETS HT118A
- AstroAI WH5000A
- Tacklife CM02A

### Connection Protocol
```
Service UUID: 0000ffe0-0000-1000-8000-00805f9b34fb
Characteristic UUID: 0000ffe1-0000-1000-8000-00805f9b34fb
```

### Setup Instructions
1. Enable Bluetooth on device
2. Put multimeter in pairing mode
3. Open iaRealidad sensing mode
4. Tap "Discover Sensors"
5. Select your multimeter from list
6. Grant pairing permission
7. Start measuring!

---

## 🎧 Audio Sensors

### Built-in Microphone
- **All devices**: Use built-in microphone for audio analysis
- **Sample Rate**: 44.1 kHz recommended
- **Bit Depth**: 16-bit minimum

### External Microphones
- **Rode VideoMic Me**: iPhone/Android compatible
- **Shure MV88**: High-quality iOS microphone
- **AudioQuest DragonFly**: USB-C audio interface
- **Zoom H1n**: Portable recorder with line-out

### Audio Analysis Capabilities
- **Frequency Range**: 20 Hz - 20 kHz
- **Detectable Patterns**:
  - 50/60 Hz mains hum
  - Switching regulator noise (>20 kHz)
  - Relay clicks
  - Fan noise
  - Oscillator signals

---

## 🌡️ Temperature Sensors

### Bluetooth Temperature Sensors
- **Inkbird IBS-TH1**: Bluetooth thermometer
- **ThermoPro TP20**: Wireless meat thermometer (works great!)
- **Govee H5075**: Bluetooth hygrometer/thermometer
- **SensorPush**: High-accuracy wireless sensor

### IR Thermometers (Future Support)
- **Seek Thermal**: Smartphone thermal camera
- **FLIR One**: Consumer thermal imaging
- **MLX90614**: Non-contact IR sensor

### Setup
1. Pair Bluetooth temperature sensor
2. Enable in sensing mode
3. Point at component to measure
4. Set warning/critical thresholds
5. Monitor in real-time

---

## 🔗 UART/Serial Devices

### USB-to-Serial Adapters
- **FTDI FT232RL**: Industry standard
- **CP2102**: Low-cost alternative
- **CH340G**: Budget-friendly option
- **Prolific PL2303**: Widely compatible

### Microcontroller Boards
- Arduino (all models)
- ESP32 DevKit
- ESP8266 NodeMCU
- STM32 Blue Pill
- Raspberry Pi Pico

### Connection Requirements
- **OTG Cable**: USB On-The-Go adapter for Android
- **Lightning Adapter**: Camera connection kit for iOS
- **Baud Rates**: 9600, 19200, 38400, 57600, 115200
- **Voltage Levels**: 3.3V or 5V TTL

---

## 🔄 I2C Sensors

### Supported I2C Addresses
The app can scan addresses `0x00` to `0x7F`.

### Common I2C Sensors
| Sensor | Address | Type | Use Case |
|--------|---------|------|----------|
| BMP280 | 0x76/0x77 | Pressure/Temp | Environmental |
| MPU6050 | 0x68 | Accelerometer | Motion |
| ADS1115 | 0x48 | ADC | Analog reading |
| OLED SSD1306 | 0x3C/0x3D | Display | Debug output |
| PCF8574 | 0x20-0x27 | I/O Expander | GPIO |
| DS3231 | 0x68 | RTC | Timekeeping |

### I2C Interface Requirements
- **Voltage**: 3.3V or 5V
- **Pull-up Resistors**: 4.7kΩ recommended
- **Clock Speed**: 100 kHz (standard) or 400 kHz (fast)
- **Connection**: SDA, SCL, VCC, GND

### Adapters
- **Adafruit FT232H**: USB-to-I2C adapter
- **CH341A**: Multi-protocol USB adapter
- **Bus Pirate**: Universal serial interface tool

---

## ⚡ SPI Sensors

### Supported SPI Modes
- **Mode 0**: CPOL=0, CPHA=0 (most common)
- **Mode 1**: CPOL=0, CPHA=1
- **Mode 2**: CPOL=1, CPHA=0
- **Mode 3**: CPOL=1, CPHA=1

### Common SPI Devices
| Device | Type | Use Case |
|--------|------|----------|
| nRF24L01+ | RF Module | Wireless comm |
| SD Card | Storage | Data logging |
| MAX7219 | LED Driver | Display |
| W5500 | Ethernet | Network |
| MCP3008 | ADC | Analog input |

### SPI Pins
- **MOSI**: Master Out, Slave In
- **MISO**: Master In, Slave Out
- **SCK**: Serial Clock
- **CS/SS**: Chip Select

---

## 🔧 DIY Hardware Integration

### Building Your Own Sensor Interface

#### Option 1: Arduino Bridge
```arduino
// Simple sensor bridge for iaRealidad
void setup() {
  Serial.begin(115200);
}

void loop() {
  // Read sensor
  int value = analogRead(A0);
  float voltage = value * (5.0 / 1023.0);
  
  // Send to app via Serial
  Serial.print("VOLTAGE:");
  Serial.println(voltage);
  
  delay(100);
}
```

#### Option 2: ESP32 WiFi Bridge
```cpp
// WiFi sensor bridge
#include <WiFi.h>

void setup() {
  WiFi.begin("SSID", "password");
  // Setup web server or MQTT
}

void loop() {
  // Read sensors and publish
}
```

#### Option 3: Bluetooth LE Sensor
```cpp
// BLE sensor broadcasting
#include <BLEDevice.h>

void setup() {
  BLEDevice::init("iaRealidad Sensor");
  // Setup BLE characteristics
}
```

---

## 📊 Recommended Starter Kit

### Beginner Kit (~$50)
- USB multimeter (Aneng AN8009 or similar)
- USB-to-Serial adapter (FTDI or CH340)
- Arduino Uno or ESP32
- Basic jumper wires
- Breadboard

### Intermediate Kit (~$150)
- Bluetooth multimeter (Owon B35T+)
- Bluetooth temperature sensor
- I2C sensor kit (BMP280, MPU6050, OLED)
- Logic analyzer (USB)
- Thermal probe

### Advanced Kit (~$500)
- Professional Bluetooth multimeter
- FLIR One thermal camera
- High-speed logic analyzer
- Bus Pirate
- Oscilloscope with USB
- Multiple I2C/SPI sensors

---

## 🔍 Testing Your Hardware

### Connection Test Procedure

1. **Power Test**
   ```
   - Connect device
   - Check voltage output
   - Verify current draw
   ```

2. **Communication Test**
   ```
   - Open sensing mode
   - Scan for devices
   - Verify device appears
   - Test connection
   ```

3. **Data Test**
   ```
   - Start sensor
   - Take measurements
   - Verify data accuracy
   - Check update rate
   ```

4. **Stability Test**
   ```
   - Run for 5 minutes
   - Check for disconnects
   - Monitor errors
   - Verify consistent readings
   ```

---

## 🚨 Troubleshooting

### Bluetooth Issues

**Problem**: Device not discovered
- **Solution**: Ensure Bluetooth is enabled
- **Solution**: Put device in pairing mode
- **Solution**: Check device battery
- **Solution**: Restart iaRealidad app

**Problem**: Connection drops
- **Solution**: Move closer to device
- **Solution**: Check for interference
- **Solution**: Update device firmware
- **Solution**: Reduce distance (<5m)

### UART Issues

**Problem**: No data received
- **Solution**: Check baud rate matches
- **Solution**: Verify TX/RX not swapped
- **Solution**: Check voltage levels (3.3V vs 5V)
- **Solution**: Test with serial terminal first

**Problem**: Garbage data
- **Solution**: Adjust baud rate
- **Solution**: Check data bits/stop bits
- **Solution**: Verify parity setting
- **Solution**: Check ground connection

### I2C Issues

**Problem**: Device not detected
- **Solution**: Check pull-up resistors
- **Solution**: Verify address is correct
- **Solution**: Check SDA/SCL connections
- **Solution**: Test with I2C scanner first

**Problem**: Intermittent readings
- **Solution**: Add stronger pull-ups
- **Solution**: Shorten wires (<30cm)
- **Solution**: Check power supply stability
- **Solution**: Reduce clock speed

### SPI Issues

**Problem**: No communication
- **Solution**: Verify MISO/MOSI connections
- **Solution**: Check clock polarity/phase
- **Solution**: Ensure CS is controlled properly
- **Solution**: Test at lower clock speed

---

## 🌐 Community Hardware Database

### Contribute Your Device

If you've tested hardware with iaRealidad, please share!

**Submission Format**:
```markdown
### Device Name
- **Manufacturer**: Company
- **Model**: Model number
- **Type**: Multimeter/Sensor/Interface
- **Status**: ✅ Working / ⚠️ Partial / ❌ Not working
- **Notes**: Any special configuration
- **Tested By**: Your username
- **Date**: YYYY-MM-DD
```

Submit via:
- GitHub issue with tag `hardware-compatibility`
- Pull request to this document
- Community forum post

---

## 📱 Mobile Device Compatibility

### Android
- **Minimum**: Android 7.0 (API 24)
- **Recommended**: Android 10+ for best Bluetooth
- **OTG**: Required for USB sensors
- **Permissions**: Bluetooth, Location, Storage

### iOS
- **Minimum**: iOS 13.0
- **Recommended**: iOS 15+ for best features
- **Accessories**: Lightning to USB adapter needed
- **Permissions**: Bluetooth, Camera, Microphone

---

## 🔮 Coming Soon

### ERA III Hardware Support
- Oscilloscope integration
- Logic analyzer support
- Network analyzer
- Spectrum analyzer
- Power analyzer
- Advanced thermal imaging

Stay tuned for updates in ERA III!

---

## 📚 Additional Resources

### Documentation
- [ERA_II_SENSING_GUIDE.md](./ERA_II_SENSING_GUIDE.md) - Software guide
- [EXAMPLES.md](./EXAMPLES.md) - Usage examples
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute

### External Links
- [Bluetooth Low Energy GATT](https://www.bluetooth.com/specifications/gatt/)
- [I2C Specification](https://www.nxp.com/docs/en/user-guide/UM10204.pdf)
- [SPI Tutorial](https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi)

---

**Last Updated**: January 2026  
**Version**: 1.0  
**Community Tested Devices**: 15+

💡 **Tip**: Always test new hardware with manufacturer software first, then integrate with iaRealidad!
