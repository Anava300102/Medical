import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ConfirmAppointmentScreen({ route, navigation }) {
  const { doctor } = route.params; // Recibir los datos del doctor seleccionado

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.8853, // Cambia estas coordenadas a una ubicación adecuada
          longitude: -102.2916,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: 21.8853, longitude: -102.2916 }} // Ubicación del doctor
          title={doctor.name}
          description={`Teléfono: ${doctor.phone}`}
        />
      </MapView>

      {/* Información del doctor */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Médico general</Text>
        <Text style={styles.detail}>Nombre: {doctor.name}</Text>
        <Text style={styles.detail}>Teléfono: {doctor.phone}</Text>
        <Text style={styles.detail}>Correo: {doctor.email}</Text>
        <Text style={styles.detail}>Precio de consulta: {doctor.price}</Text>

        {/* Botón para confirmar la cita */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => alert('Cita confirmada!')}
        >
          <Text style={styles.confirmText}>Confirmar cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 2,
  },
  infoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
