import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

export default function GeneralDoctor({ navigation }) {
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    {
      id: '1',
      name: 'Alfredo Lopez Sandoval',
      phone: '4491633605',
      email: 'alf.ls@gmail.com',
      price: '$400',
      image: require('../../assets/alfredosandoval.jpeg'),
    },
    {
      id: '2',
      name: 'Estefania Rodriguez Ponce',
      phone: '4491237687',
      email: 'estef.rp@gmail.com',
      price: '$460',
      image: require('../../assets/estefaniaponce.jpeg'),
    },
  ];

  const handleDoctorSelect = (doctor) => {
    navigation.navigate('ConfirmAppointmentScreen', { doctor });
  };
  

  const renderDoctor = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDoctorSelect(item)}>
      <Image source={item.image} style={styles.doctorImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorDetails}>Phone: {item.phone}</Text>
        <Text style={styles.doctorDetails}>Email: {item.email}</Text>
        <Text style={styles.doctorPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>General Doctor</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Lista de doctores */}
      <FlatList
        data={doctors}
        renderItem={renderDoctor}
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
          onPress={() => navigation.navigate('AppointmentsOrders', { appointments })}
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
  doctorImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
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
