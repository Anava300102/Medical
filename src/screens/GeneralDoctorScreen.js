import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';

const db = getFirestore(appFirebase);

export default function GeneralDoctor({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      generalDoctor: 'Médico General',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      price: 'Precio',
      appointmentsOrders: 'Citas/Pedidos',
    },
    en: {
      generalDoctor: 'General Doctor',
      phone: 'Phone',
      email: 'Email',
      price: 'Price',
      appointmentsOrders: 'Appointments/Orders',
    },
  };

  const t = translations[language];
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'generaldoctor'));
        const doctorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error al cargar los doctores:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos de los doctores.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDoctorSelect = (doctor) => {
    navigation.navigate('ConfirmAppointmentScreen', { doctor });
  };

  const renderDoctor = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDoctorSelect(item)}>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorDetails}>
          {t.phone}: {item.phone}
        </Text>
        <Text style={styles.doctorDetails}>
          {t.email}: {item.email}
        </Text>
        <Text style={styles.doctorPrice}>
          {t.price}: ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.generalDoctor}</Text>
      </View>

      {/* Lista de doctores */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando doctores...</Text>
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctor}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay doctores disponibles.</Text>}
        />
      )}

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AppointmentsOrders', { appointments: [] })}
        >
          <Text style={styles.navText}>{t.appointmentsOrders}</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  doctorDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  doctorPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#07DBEB',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#07DBEB',
    marginTop: 5,
  },
});
