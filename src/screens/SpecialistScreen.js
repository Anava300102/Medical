import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';

const db = getFirestore(appFirebase);

export default function SpecialistScreen({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      specialist: 'Especialista',
      specialty: 'Especialidad:',
      phone: 'Teléfono:',
      email: 'Correo:',
      price: 'Precio:',
      appointmentsOrders: 'Citas/Pedidos',
    },
    en: {
      specialist: 'Specialist',
      specialty: 'Specialty:',
      phone: 'Phone:',
      email: 'Email:',
      price: 'Price:',
      appointmentsOrders: 'Appointments/Orders',
    },
  };

  const t = translations[language];
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'specialistdoctor'));
        const specialistsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpecialists(specialistsData);
      } catch (error) {
        console.error('Error al cargar especialistas:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos de los especialistas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  const handleSpecialistSelect = (specialist) => {
    navigation.navigate('AppointmentsOrders', { specialist });
  };

  const renderSpecialist = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSpecialistSelect(item)}>
      <View style={styles.specialistInfo}>
        <Text style={styles.specialistName}>{item.name}</Text>
        <Text style={styles.specialistDetails}>
          {t.specialty} {item.specialty}
        </Text>
        <Text style={styles.specialistDetails}>
          {t.phone} {item.phone}
        </Text>
        <Text style={styles.specialistDetails}>
          {t.email} {item.email}
        </Text>
        <Text style={styles.specialistPrice}>
          {t.price} ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.specialist}</Text>
      </View>

      {/* Lista de especialistas */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando especialistas...</Text>
      ) : (
        <FlatList
          data={specialists}
          renderItem={renderSpecialist}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay especialistas disponibles.</Text>}
        />
      )}

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AppointmentsOrders')}
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
    alignItems: 'center',
    justifyContent: 'center',
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
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  specialistDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  specialistPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#07DBEB',
    marginTop: 5,
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
