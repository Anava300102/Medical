import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PharmacyDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pharmacy Detail</Text>
      <Text style={styles.description}>Here you can see more details about the Pharmacy service.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', color: '#555' },
});