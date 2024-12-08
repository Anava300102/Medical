import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function VisitScreen({ navigation }) {
  const handleDoctorSelection = (type) => {
    console.log(`Selected: ${type}`);
    if (type === 'General Doctor') {
      navigation.navigate('GeneralDoctorScreen'); 
    } else if (type === 'Specialist') {
      navigation.navigate('SpecialistScreen'); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons8-menú-50.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a type of Doctor</Text>
      </View>

      {/* Opciones principales */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleDoctorSelection('General Doctor')}
        >
          <Image
            source={require('../../assets/doctorgeneral.png')} 
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>General Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={() => handleDoctorSelection('Specialist')}
        >
          <Image
            source={require('../../assets/specialist.png')} 
            style={styles.optionImage}
          />
          <Text style={styles.optionText}>Specialist</Text>
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
        {/* <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Datebook')}>
          <Image source={require('../../assets/icons8-datebook-50.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Datebook</Text>
        </TouchableOpacity> */}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    height: 100,
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
