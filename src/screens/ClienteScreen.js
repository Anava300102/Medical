import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function ClienteScreen({ navigation }) {
  const handleOptionSelection = (option) => {
    console.log(`Selected: ${option}`);
    // Aquí puedes agregar la navegación según la opción seleccionada
    if (option === 'Visit') {
      navigation.navigate('VisitScreen'); // Asegúrate de registrar VisitScreen
    } else if (option === 'Pharmacy') {
      navigation.navigate('PharmacyScreen'); // Asegúrate de registrar PharmacyScreen
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image source={require('../../assets/icons8-menú-50.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Choose an option</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Opciones principales */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleOptionSelection('Visit')}
        >
          <Image
            source={require('../../assets/ImagenVisita.png')} 
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Visit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleOptionSelection('Pharmacy')}
        >
          <Image
            source={require('../../assets/ImagenFarmacia.png')} 
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Pharmacy</Text>
        </TouchableOpacity>
      </View>

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
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '90%',
    paddingVertical: 20,
  },
  optionImage: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
