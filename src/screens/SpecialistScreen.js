import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

export default function SpecialistScreen({ navigation }) {
  const specialists = [
    {
      id: '1',
      name: 'Cardiologist',
      expertise: ['Echocardiogram', 'Stress Test', 'High blood pressure', 'Heart failure'],
      price: '$700',
      image: require('../../assets/cardiologo.png'),
    },
    {
      id: '2',
      name: 'Otorhinolaryngology',
      expertise: [
        'Sense organs (odor, smell and taste)',
        'Phonation organs',
        'Central vestibular system',
      ],
      price: '$500',
      image: require('../../assets/otorrino.png'),
    },
  ];

  const renderSpecialist = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.specialistImage} />
      <View style={styles.specialistInfo}>
        <Text style={styles.specialistName}>{item.name}</Text>
        <Text style={styles.specialistDetails}>Expert in:</Text>
        {item.expertise.map((expert, index) => (
          <Text key={index} style={styles.expertiseItem}>
            {expert}
          </Text>
        ))}
        <Text style={styles.specialistPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior sin botones */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Specialist</Text>
      </View>

      {/* Lista de especialistas */}
      <FlatList
        data={specialists}
        renderItem={renderSpecialist}
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
          <Image source={require('../../assets/icons8-comprobante-de-pago-64.png')} style={styles.navIcon} />
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
  specialistImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 15,
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
  expertiseItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  specialistPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#07DBEB',
    marginTop: 5,
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
