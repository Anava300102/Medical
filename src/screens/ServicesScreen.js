import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function Services({ navigation }) {
  // Función para navegar a la pantalla de detalle según el servicio
  const navigateToServiceDetail = (serviceName) => {
    switch (serviceName) {
      case 'Specialists':
        navigation.navigate('SpecialistDetail');
        break;
      case 'General doctor':
        navigation.navigate('GeneralDoctorDetail');
        break;
      case 'Pharmacy':
        navigation.navigate('PharmacyDetail');
        break;
      default:
        console.log('Unknown service');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        {/* Botones para cada servicio */}
        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('Specialists')} // Redirige al detalle de Specialists
        >
          <Text style={styles.serviceText}>Specialists</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('General doctor')} // Redirige al detalle de General doctor
        >
          <Text style={styles.serviceText}>General doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('Pharmacy')} // Redirige al detalle de Pharmacy
        >
          <Text style={styles.serviceText}>Pharmacy</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' }, // Fondo gris suave
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' }, // Título oscuro para contraste
  listContainer: { marginTop: 20 },
  serviceButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#07DBEB', // Azul claro
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceText: { fontSize: 18, color: '#fff', fontWeight: 'bold' }, // Texto blanco y negrita
});
