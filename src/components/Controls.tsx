import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ControlsProps {
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  precision: string;
  setPrecision: (precision: string) => void;
  scale: number;
  setScale: (scale: number) => void;
}

export default function Controls({connected, onConnect, onDisconnect, precision, setPrecision, scale, setScale}: ControlsProps){
  const precisionOptions = ['P0', 'P1', 'P2', 'P3'];
  const scaleOptions = [0.5, 1, 2];

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: connected ? '#10b981' : '#ef4444' }]} />
        <Text style={styles.statusText}>{connected ? 'Connected' : 'Disconnected'}</Text>
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.label}>Precision</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              const currentIndex = precisionOptions.indexOf(precision);
              const newIndex = Math.max(0, currentIndex - 1);
              setPrecision(precisionOptions[newIndex]);
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.valueText}>{precision}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              const currentIndex = precisionOptions.indexOf(precision);
              const newIndex = Math.min(precisionOptions.length - 1, currentIndex + 1);
              setPrecision(precisionOptions[newIndex]);
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.label}>Scale</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              const currentIndex = scaleOptions.indexOf(scale);
              const newIndex = Math.max(0, currentIndex - 1);
              setScale(scaleOptions[newIndex]);
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.valueText}>{scale}x</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              const currentIndex = scaleOptions.indexOf(scale);
              const newIndex = Math.min(scaleOptions.length - 1, currentIndex + 1);
              setScale(scaleOptions[newIndex]);
            }}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controlGroup}>
        <Text style={styles.label}>Connection</Text>
        <TouchableOpacity 
          style={[styles.connectButton, connected ? styles.disconnectButton : styles.connectButton]} 
          onPress={connected ? onDisconnect : onConnect}
        >
          <Text style={styles.connectButtonText}>
            {connected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width:'100%',
    backgroundColor: '#1f2937',
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  controlGroup: {
    marginBottom: 16,
    flexDirection:'column'
    },
  label: {
    color: '#cbd5e1',
    marginBottom: 8,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#263238', // Darker button background
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#374151', // Even darker button
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#cbd5e1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valueText: {
    color: '#cbd5e1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectButton: {
    backgroundColor: '#10b981', // Green for connect
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disconnectButton: {
    backgroundColor: '#ef4444', // Red for disconnect
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});