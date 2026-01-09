import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RepairMode} from '../types';
import Svg, {Circle, Rect, Line, Text as SvgText} from 'react-native-svg';

interface Props {
  mode: RepairMode;
}

// Helper function to get color for pin type
const getPinColor = (pinType: string): string => {
  switch (pinType) {
    case 'VCC':
      return '#f44336'; // Red
    case 'GND':
      return '#000'; // Black
    case 'DATA':
      return '#2196F3'; // Blue
    default:
      return '#9E9E9E'; // Gray
  }
};

// Validation test status
enum TestStatus {
  PASS = 'pass',
  WARNING = 'warning',
  FAIL = 'fail',
}

const AROverlay: React.FC<Props> = ({mode}) => {
  // Sample component positions (in a real app, these would come from AR recognition)
  const components = [
    {id: '1', name: 'U1 (IC)', x: 150, y: 200, type: 'ic'},
    {id: '2', name: 'R1', x: 100, y: 300, type: 'resistor'},
    {id: '3', name: 'C1', x: 200, y: 300, type: 'capacitor'},
  ];

  const pins = [
    {id: 'p1', name: 'VCC', x: 140, y: 190, type: 'VCC'},
    {id: 'p2', name: 'GND', x: 160, y: 190, type: 'GND'},
    {id: 'p3', name: 'TX', x: 140, y: 210, type: 'DATA'},
    {id: 'p4', name: 'RX', x: 160, y: 210, type: 'DATA'},
  ];

  // Validation test results (in real app, these would come from actual tests)
  const validationResults = [
    {componentId: '1', status: TestStatus.PASS},
    {componentId: '2', status: TestStatus.PASS},
    {componentId: '3', status: TestStatus.WARNING},
  ];

  const renderInspectionMode = () => (
    <View style={styles.overlayContainer}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        {/* Highlight components */}
        {components.map(comp => (
          <React.Fragment key={comp.id}>
            <Rect
              x={comp.x - 20}
              y={comp.y - 15}
              width="40"
              height="30"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="2"
            />
            <SvgText
              x={comp.x}
              y={comp.y - 20}
              fill="#4CAF50"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle">
              {comp.name}
            </SvgText>
          </React.Fragment>
        ))}
        
        {/* Highlight pins */}
        {pins.map(pin => (
          <React.Fragment key={pin.id}>
            <Circle
              cx={pin.x}
              cy={pin.y}
              r="5"
              fill={getPinColor(pin.type)}
              opacity="0.7"
            />
            <SvgText
              x={pin.x}
              y={pin.y - 10}
              fill={getPinColor(pin.type)}
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle">
              {pin.name}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Inspection Mode</Text>
        <Text style={styles.infoText}>
          • Components highlighted in green
        </Text>
        <Text style={styles.infoText}>
          • VCC pins in red, GND in black, Data in blue
        </Text>
        <Text style={styles.infoText}>
          • Tap components for details
        </Text>
      </View>
    </View>
  );

  const renderMeasurementMode = () => (
    <View style={styles.overlayContainer}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        {/* Show test points with probe indicators */}
        <Circle cx={140} cy={190} r="8" fill="none" stroke="#FF9800" strokeWidth="3" />
        <Line x1={140} y1={190} x2={140} y2={150} stroke="#FF9800" strokeWidth="2" />
        <SvgText x={145} y={145} fill="#FF9800" fontSize="12" fontWeight="bold">
          Probe VCC
        </SvgText>
        
        <Circle cx={160} cy={190} r="8" fill="none" stroke="#FF9800" strokeWidth="3" />
        <Line x1={160} y1={190} x2={160} y2={150} stroke="#FF9800" strokeWidth="2" />
        <SvgText x={165} y={145} fill="#FF9800" fontSize="12" fontWeight="bold">
          Probe GND
        </SvgText>
      </Svg>
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Measurement Mode</Text>
        <Text style={styles.infoText}>
          📍 VCC to GND: Expected 3.3V - 5.0V
        </Text>
        <Text style={styles.infoText}>
          📍 Set multimeter to DC Voltage
        </Text>
        <Text style={styles.infoText}>
          📍 Red probe on VCC, Black on GND
        </Text>
        <View style={[styles.badge, styles.warningBadge]}>
          <Text style={styles.badgeText}>⚠️ Check polarity!</Text>
        </View>
      </View>
    </View>
  );

  const renderRepairMode = () => (
    <View style={styles.overlayContainer}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        {/* Highlight component to replace */}
        <Rect
          x={180}
          y={285}
          width="40"
          height="30"
          fill="rgba(244, 67, 54, 0.3)"
          stroke="#f44336"
          strokeWidth="3"
        />
        <SvgText x={200} y={330} fill="#f44336" fontSize="14" fontWeight="bold" textAnchor="middle">
          Replace C1
        </SvgText>
      </Svg>
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Repair Mode - Step 2 of 5</Text>
        <Text style={styles.infoText}>
          🔧 Remove faulty capacitor C1
        </Text>
        <Text style={styles.infoText}>
          1. Heat solder joints with iron (350°C)
        </Text>
        <Text style={styles.infoText}>
          2. Apply solder wick to remove solder
        </Text>
        <Text style={styles.infoText}>
          3. Gently lift component
        </Text>
        <View style={[styles.badge, styles.dangerBadge]}>
          <Text style={styles.badgeText}>⚠️ Avoid overheating!</Text>
        </View>
      </View>
    </View>
  );

  const renderCreationMode = () => (
    <View style={styles.overlayContainer}>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        {/* Show connection lines */}
        <Line x1={140} y1={190} x2={250} y2={100} stroke="#4CAF50" strokeWidth="3" strokeDasharray="5,5" />
        <Circle cx={250} cy={100} r="25" fill="rgba(76, 175, 80, 0.3)" stroke="#4CAF50" strokeWidth="2" />
        <SvgText x={250} y={105} fill="#4CAF50" fontSize="12" fontWeight="bold" textAnchor="middle">
          BLE Module
        </SvgText>
        
        <Line x1={160} y1={190} x2={300} y2={100} stroke="#000" strokeWidth="3" strokeDasharray="5,5" />
        <Circle cx={300} cy={100} r="6" fill="#000" />
      </Svg>
      
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Creation Mode - Add Bluetooth</Text>
        <Text style={styles.infoText}>
          📡 HC-05 Bluetooth Module
        </Text>
        <Text style={styles.infoText}>
          • VCC (red) → Board VCC (3.3V)
        </Text>
        <Text style={styles.infoText}>
          • GND (black) → Board GND
        </Text>
        <Text style={styles.infoText}>
          • TX → Board RX pin
        </Text>
        <Text style={styles.infoText}>
          • RX → Board TX pin (via divider)
        </Text>
        <View style={[styles.badge, styles.infoBadge]}>
          <Text style={styles.badgeText}>💡 Use 3.3V level shifter</Text>
        </View>
      </View>
    </View>
  );

  const renderValidationMode = () => {
    // Helper function to get color and icon for test status
    const getTestStatusDisplay = (status: TestStatus) => {
      switch (status) {
        case TestStatus.PASS:
          return {color: '#4CAF50', icon: '✓'};
        case TestStatus.WARNING:
          return {color: '#FFC107', icon: '⚠'};
        case TestStatus.FAIL:
          return {color: '#f44336', icon: '✗'};
        default:
          return {color: '#9E9E9E', icon: '?'};
      }
    };

    return (
      <View style={styles.overlayContainer}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          {/* Show test results */}
          {components.map((comp, idx) => {
            const result = validationResults[idx];
            const display = getTestStatusDisplay(result.status);
            return (
              <React.Fragment key={comp.id}>
                <Rect
                  x={comp.x - 20}
                  y={comp.y - 15}
                  width="40"
                  height="30"
                  fill="none"
                  stroke={display.color}
                  strokeWidth="2"
                />
                <SvgText
                  x={comp.x + 25}
                  y={comp.y}
                  fill={display.color}
                  fontSize="16"
                  fontWeight="bold">
                  {display.icon}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
        
        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Validation Mode</Text>
          <Text style={[styles.infoText, styles.successText]}>
            ✓ U1 IC: Power OK
          </Text>
          <Text style={[styles.infoText, styles.successText]}>
            ✓ R1 Resistor: Value correct
          </Text>
          <Text style={[styles.infoText, styles.warningText]}>
            ⚠ C1 Capacitor: Voltage low
          </Text>
          <View style={[styles.badge, styles.successBadge]}>
            <Text style={styles.badgeText}>2/3 Tests Passed</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    switch (mode) {
      case 'inspection':
        return renderInspectionMode();
      case 'measurement':
        return renderMeasurementMode();
      case 'repair':
        return renderRepairMode();
      case 'creation':
        return renderCreationMode();
      case 'validation':
        return renderValidationMode();
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  },
  overlayContainer: {
    flex: 1,
    pointerEvents: 'box-none',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
    lineHeight: 20,
  },
  successText: {
    color: '#4CAF50',
  },
  warningText: {
    color: '#FFC107',
  },
  badge: {
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  successBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  warningBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.3)',
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  dangerBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.3)',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  infoBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AROverlay;
