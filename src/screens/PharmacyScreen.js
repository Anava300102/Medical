import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useLanguage } from '../../Context';

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
      medicines: [
        {
          id: '1',
          name: 'Forxiga',
          description:
            'Es un medicamento utilizado para tratar la diabetes mellitus tipo 2 y la insuficiencia cardíaca crónica sintomática en adultos.',
          price: '$1,831',
          image: require('../../assets/foxiga.png'),
        },
        {
          id: '2',
          name: 'Rhabil',
          description:
            'La reducción de bacteroides y la inflamación del intestino, ayudando a tratar el colon irritable y prevenir la aterosclerosis.',
          price: '$1,330',
          image: require('../../assets/rhabil.png'),
        },
      ],
    },
    en: {
      pharmacy: 'Pharmacy',
      description: 'Description',
      price: 'Price',
      services: 'Services',
      appointmentsOrders: 'Appointments/Orders',
      datebook: 'Datebook',
      medicines: [
        {
          id: '1',
          name: 'Forxiga',
          description:
            'It is a medication used to treat type 2 diabetes mellitus and symptomatic chronic heart failure in adults.',
          price: '$1,831',
          image: require('../../assets/foxiga.png'),
        },
        {
          id: '2',
          name: 'Rhabil',
          description:
            'The reduction of bacteroids and inflammation of the intestine, helping to treat irritable colon and prevent atherosclerosis.',
          price: '$1,330',
          image: require('../../assets/rhabil.png'),
        },
      ],
    },
  };

  const t = translations[language];

  const handleProductSelect = (product) => {
    navigation.navigate('ProductsPharmacy', { product });
  };

  const renderMedicine = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleProductSelect(item)}>
      <Image source={item.image} style={styles.medicineImage} />
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>
          {t.description}: {item.description}
        </Text>
        <Text style={styles.medicinePrice}>
          {t.price}: {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.pharmacy}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Lista de medicamentos */}
      <FlatList
        data={t.medicines}
        renderItem={renderMedicine}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AppointmentsOrders')}
        >
          <Image
            source={require('../../assets/icons8-historial-de-pedidos-50.png')}
            style={styles.navIcon}
          />
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
    justifyContent: 'space-between',
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
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
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
  medicineImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center', // Centramos el contenido
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 12,
    color: '#07DBEB',
    marginTop: 5,
  },
});
