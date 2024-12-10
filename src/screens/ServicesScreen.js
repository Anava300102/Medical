import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../../Context';

export default function Services({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      services: 'Servicios',
      specialists: 'Especialistas',
      generalDoctor: 'Médico General',
      pharmacy: 'Farmacia',
      logout: 'Cerrar sesión', 
    },
    en: {
      services: 'Services',
      specialists: 'Specialists',
      generalDoctor: 'General Doctor',
      pharmacy: 'Pharmacy',
      logout: 'Log out', 
    },
  };

  const t = translations[language];

  const navigateToServiceDetail = (serviceName) => {
    switch (serviceName) {
      case 'Specialists':
        navigation.navigate('SpecialistDetail');
        break;
      case 'General doctor':
        navigation.navigate('GeneralDoctorDetail');
        break;
      case 'Pharmacy':
        navigation.navigate('PharmacyDetail');
        break;
      default:
        console.log('Unknown service');
    }
  };

  const handleLogout = () => {


    navigation.replace('Login'); // Redirige al login
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.services}</Text>
      </View>



      <ScrollView style={styles.listContainer}>
        {/* Botones para cada servicio */}
        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('Specialists')}
        >
          <Text style={styles.serviceText}>{t.specialists}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('General doctor')}
        >

          <Text style={styles.serviceText}>{t.generalDoctor}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.serviceButton}
          onPress={() => navigateToServiceDetail('Pharmacy')}
        >

          <Text style={styles.serviceText}>{t.pharmacy}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Botón de Cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t.logout}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' }, 
  listContainer: { marginTop: 20 },
  serviceButton: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#07DBEB', // 
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  logoutButton: {
    backgroundColor: '#ff0000', 
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { fontSize: 18, color: '#fff', fontWeight: 'bold' }, 
});
