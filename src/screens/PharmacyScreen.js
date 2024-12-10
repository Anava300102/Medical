import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';

const db = getFirestore(appFirebase);

export default function PharmacyScreen({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      pharmacy: 'Farmacia',
      description: 'Descripción',
      price: 'Precio',
      services: 'Servicios',
      appointmentsOrders: 'Citas/Pedidos',
      datebook: 'Agenda',
    },
    en: {
      pharmacy: 'Pharmacy',
      description: 'Description',
      price: 'Price',
      services: 'Services',
      appointmentsOrders: 'Appointments/Orders',
      datebook: 'Datebook',
    },
  };

  const t = translations[language];
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pharmacy'));
        const medicinesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMedicines(medicinesData);
      } catch (error) {
        console.error('Error al cargar los medicamentos:', error);
        Alert.alert('Error', 'No se pudieron cargar los medicamentos.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleProductSelect = (product) => {
    navigation.navigate('ProductsPharmacy', { product });
  };

  const renderMedicine = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleProductSelect(item)}>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>
          {t.description}: {item.description}
        </Text>
        <Text style={styles.medicinePrice}>
          {t.price}: ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.pharmacy}</Text>
      </View>

      {/* Lista de medicamentos */}
      {loading ? (
        <Text style={styles.loadingText}>Cargando medicamentos...</Text>
      ) : (
        <FlatList
          data={medicines}
          renderItem={renderMedicine}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay medicamentos disponibles.</Text>}
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
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  medicineDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  medicinePrice: {
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
    justifyContent: 'center',
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
