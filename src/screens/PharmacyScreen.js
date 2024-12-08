import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

export default function PharmacyScreen({ navigation }) {
  const medicines = [
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
  ];

  const handleProductSelect = (product) => {
    navigation.navigate('ProductsPharmacy', { product });
  };

  const renderMedicine = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleProductSelect(item)}>
      <Image source={item.image} style={styles.medicineImage} />
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{item.name}</Text>
        <Text style={styles.medicineDescription}>Description: {item.description}</Text>
        <Text style={styles.medicinePrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Pharmacy</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Lista de medicamentos */}
      <FlatList
        data={medicines}
        renderItem={renderMedicine}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Services')}>
          <Image source={require('../../assets/icons8-servicios-50.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AppointmentsOrders')}
        >
          <Image
            source={require('../../assets/icons8-historial-de-pedidos-50.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Appointments/Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Datebook')}>
          <Image
            source={require('../../assets/icons8-comprobante-de-pago-64.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Datebook</Text>
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
    justifyContent: 'space-around',
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