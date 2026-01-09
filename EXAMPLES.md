# Usage Examples

This guide provides practical examples of using the AR Electronics Repair Assistant for common tasks.

## Example 1: Identifying Components on an Arduino Board

**Scenario**: You have an Arduino Uno and want to identify the main components.

**Steps**:
1. Launch the app and select **Inspection Mode**
2. Tap **Start AR Mode**
3. Grant camera permission when prompted
4. Point your camera at the Arduino board
5. The app will overlay:
   - **U1**: ATmega328P microcontroller (green box)
   - **VCC pins**: Red circles
   - **GND pins**: Black circles
   - **TX/RX pins**: Blue circles
   - **Voltage regulator**: Green box with label
   - **Reset button**: Component label

**What you'll see**:
- Component names above each part
- Color-coded pins (Red=Power, Black=Ground, Blue=Data)
- Component designators (U1, C1, R1, etc.)

---

## Example 2: Measuring Power Supply Voltage

**Scenario**: You need to check if your circuit is getting the correct 5V supply.

**Steps**:
1. Select **Measurement Mode** on the home screen
2. Start AR Mode
3. Point camera at your power supply section
4. The app will show:
   - **Orange circles** on VCC and GND test points
   - **Orange lines** pointing to probe locations
   - **Instructions**: "Probe VCC" and "Probe GND"
5. Bottom panel displays:
   ```
   📍 VCC to GND: Expected 3.3V - 5.0V
   📍 Set multimeter to DC Voltage
   📍 Red probe on VCC, Black on GND
   ⚠️ Check polarity!
   ```
6. Follow the instructions with your multimeter
7. Compare your reading to expected range

**Tips**:
- Keep camera steady for accurate overlay
- Ensure good lighting
- The app doesn't read multimeter - you compare values manually

---

## Example 3: Replacing a Faulty Capacitor

**Scenario**: You've identified a bad capacitor and need to replace it.

**Steps**:
1. Select **Repair Mode**
2. Start AR Mode
3. Point camera at the faulty capacitor (e.g., C1)
4. The app shows:
   - **Red highlight** box around component to replace
   - **Red label**: "Replace C1"
5. Bottom panel shows current step:
   ```
   🔧 Repair Mode - Step 2 of 5
   🔧 Remove faulty capacitor C1
   1. Heat solder joints with iron (350°C)
   2. Apply solder wick to remove solder
   3. Gently lift component
   ⚠️ Avoid overheating!
   ```
6. Follow each step carefully
7. Mode selector lets you switch to Validation Mode after repair

**Safety Notes**:
- Always disconnect power before repairs
- Use proper ventilation when soldering
- Follow temperature guidelines

---

## Example 4: Adding a Bluetooth Module

**Scenario**: You want to add HC-05 Bluetooth to your Arduino project.

**Steps**:
1. Select **Creation Mode** on home screen
2. Start AR Mode
3. Point camera at your Arduino's connection pins
4. The app overlays:
   - **Green dashed line** from board VCC to module location
   - **Black dashed line** from board GND to module
   - **Blue lines** for TX/RX connections
   - **Green circle** showing module placement
5. Bottom panel shows:
   ```
   📡 HC-05 Bluetooth Module
   • VCC (red) → Board VCC (3.3V)
   • GND (black) → Board GND
   • TX → Board RX pin
   • RX → Board TX pin (via divider)
   💡 Use 3.3V level shifter
   ```
6. Follow the pin connections shown
7. Use the voltage level warning to add a resistor divider if needed

**Important**:
- HC-05 RX is 3.3V only
- Use voltage divider for 5V boards
- Cross-connect TX/RX (module TX → board RX)

---

## Example 5: Validating a Circuit After Repair

**Scenario**: You've completed a repair and want to verify everything works.

**Steps**:
1. Select **Validation Mode**
2. Start AR Mode
3. Point camera at the repaired circuit
4. The app shows test results:
   - **Green checkmarks** (✓) on working components
   - **Yellow warning** (⚠) on questionable readings
   - **Red X** on failed tests
5. Bottom panel displays:
   ```
   ✓ U1 IC: Power OK
   ✓ R1 Resistor: Value correct
   ⚠ C1 Capacitor: Voltage low
   [2/3 Tests Passed]
   ```
6. Address any warnings or failures
7. Retest until all pass

**Troubleshooting Failed Tests**:
- Check solder joints
- Verify component orientation
- Measure voltages at test points
- Look for cold solder joints or bridges

---

## Example 6: Adding a WiFi Module (ESP8266)

**Scenario**: You want to add WiFi capability to your project.

**Steps**:
1. Select **Creation Mode**
2. In AR view, the app guides you through ESP8266 connection
3. Shows critical warnings:
   ```
   ⚠️ Do NOT connect to 5V - will damage module!
   ```
4. Pin connection overlay shows:
   - VCC → 3.3V (NOT 5V!)
   - GND → GND
   - TX → RX (board)
   - RX → TX (board)
   - CH_PD → 3.3V (chip enable)
5. After connections, testing instructions appear:
   ```
   Send AT command to verify communication
   Expected: Module responds with "OK"
   ```

**Critical Notes**:
- ESP8266 requires 3.3V only (5V will destroy it)
- Needs at least 300mA current
- CH_PD must be pulled HIGH to enable chip

---

## Example 7: Switching Between Modes During Work

**Scenario**: You're repairing and need to switch between measurement and repair modes.

**Steps**:
1. Start in **Repair Mode**
2. While viewing AR overlay, scroll the mode selector at bottom
3. Tap **Measure** icon
4. Overlay immediately switches to measurement mode
5. Probe test points as guided
6. Tap **Repair** to continue repair steps
7. Finally switch to **Validate** to test

**Benefit**:
No need to exit AR view - seamlessly switch modes as your work progresses.

---

## Example 8: Understanding Pin Types

The app color-codes pins for easy identification:

| Color | Pin Type | Purpose | Example |
|-------|----------|---------|---------|
| 🔴 Red | VCC | Power supply | 3.3V, 5V, 12V rails |
| ⚫ Black | GND | Ground | 0V reference |
| 🔵 Blue | DATA | Signal/Data | TX, RX, SDA, SCL |
| 🟡 Yellow | ANALOG | Analog signals | ADC inputs |
| 🟢 Green | GPIO | General I/O | Digital pins |

**Example Reading**:
```
Arduino Pins as shown in app:
- Pin 13 (Blue): Digital GPIO
- 5V (Red): Power supply
- GND (Black): Ground
- A0 (Yellow): Analog input
```

---

## Example 9: Using Expected Ranges

**Measurement Mode** shows expected ranges for each measurement:

**Example Output**:
```
Test Point 1: VCC
Expected: 5.0V
Range: 4.75V - 5.25V
Unit: V (DC Voltage)

Your multimeter should read between 4.75V and 5.25V
```

**If out of range**:
- < 4.75V: Weak power supply or voltage drop
- > 5.25V: Overvoltage condition (dangerous!)
- 0V: No power reaching component

---

## Example 10: Safety Features

The app includes safety warnings in relevant modes:

**Measurement Mode**:
- ⚠️ "Check polarity!" - Ensure correct probe placement
- ⚠️ "Disconnect power before probing" - For safety

**Repair Mode**:
- ⚠️ "Set iron to 350°C" - Correct temperature
- ⚠️ "Avoid overheating!" - Prevent damage
- ⚠️ "Disconnect power before repair" - Always

**Creation Mode**:
- ⚠️ "Use 3.3V level shifter" - Voltage compatibility
- ⚠️ "Do NOT connect to 5V" - Component protection
- ⚠️ "Check polarity" - Prevent reverse voltage

---

## Tips for Best Results

1. **Lighting**: Use good ambient lighting for clear camera view
2. **Stability**: Hold device steady or use a stand
3. **Distance**: Keep camera 15-30cm from circuit board
4. **Angle**: Point camera perpendicular to board
5. **Clean Board**: Remove dust and flux for better recognition
6. **Practice**: Try each mode with a simple board first

---

## Common Workflows

### Quick Component Check
1. Inspection Mode → Identify all components
2. Measurement Mode → Check power rails
3. Done!

### Full Repair
1. Inspection Mode → Find problem area
2. Measurement Mode → Confirm faulty component
3. Repair Mode → Replace component
4. Validation Mode → Verify fix

### Adding a Module
1. Creation Mode → Select module type
2. Follow connection guide
3. Validation Mode → Test module
4. Done!

---

## Limitations

Current version has these limitations:
- Sample data only (not real AR recognition yet)
- Manual multimeter reading required
- No automatic component detection
- Limited component database
- Requires good lighting

**Future versions will add**:
- ML-based component recognition
- Automatic value reading
- Expanded component library
- Cloud-based repair guides
- Community contributions

---

For more information, see:
- [README.md](README.md) - Full feature list
- [SETUP.md](SETUP.md) - Installation guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details
