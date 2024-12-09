import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function ConfirmAppointmentScreen({ route }) {
  const { doctor } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showMapAnimation, setShowMapAnimation] = useState(false);
  const [movingCarLocation, setMovingCarLocation] = useState(null);

  const doctorLocation = { latitude: 21.8845, longitude: -102.2911 };
  const TARIFF_PER_KM = 10;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso denegado para acceder a la ubicación.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userCoords);
      setLoading(false);
    })();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const simulateMovement = (from, to, duration) => {
    const steps = duration * 60; // Número de pasos con base en el tiempo en minutos
    const latStep = (to.latitude - from.latitude) / steps;
    const lonStep = (to.longitude - from.longitude) / steps;

    const interval = setInterval(() => {
      from.latitude += latStep;
      from.longitude += lonStep;
      setMovingCarLocation({ ...from });

      if (calculateDistance(from.latitude, from.longitude, to.latitude, to.longitude) < 0.05) {
        clearInterval(interval);
        setModalContent('¡El doctor ha llegado a tu ubicación!');
        setModalVisible(true);
      }
    }, 1000); // Actualización cada segundo
  };

  const handleConfirm = () => {
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      doctorLocation.latitude,
      doctorLocation.longitude
    );
    const estimatedTime = Math.ceil(distance / 0.5); // 0.5 km/min aprox
    const extraFee = (distance * TARIFF_PER_KM).toFixed(2);

    setModalContent(
      `Tarifa adicional: $${extraFee} MXN\n\nTiempo estimado de llegada: ${estimatedTime} minutos.`
    );
    setModalVisible(true);
  };

  const handleStartJourney = () => {
    setModalVisible(false);
    setShowMapAnimation(true);
    simulateMovement(
      { ...doctorLocation },
      userLocation,
      calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        doctorLocation.latitude,
        doctorLocation.longitude
      ) / 0.5 // Relacionar distancia con tiempo
    );
  };

  const handleCancel = () => {
    setModalVisible(false);
    setShowMapAnimation(false);
    setMovingCarLocation(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={doctorLocation} title="Doctor" />
        <Marker coordinate={userLocation} title="Tu ubicación" pinColor="blue" />
        {showMapAnimation && movingCarLocation && (
          <Marker coordinate={movingCarLocation}>
            <Image source={require('../../assets/car.png')} style={{ width: 40, height: 40 }} />
          </Marker>
        )}
      </MapView>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Confirmar cita</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleStartJourney}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={handleCancel}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 4 },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    margin: 20,
  },
  confirmText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 15, alignItems: 'center', width: '80%' },
  modalText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalButton: { flex: 1, backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginHorizontal: 5 },
  modalButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  cancelButton: { backgroundColor: 'red' },
  cancelButtonText: { color: 'white' },
});
