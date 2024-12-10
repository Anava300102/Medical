import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../../Context';

const translations = {
  es: {
    chooseOption: 'Elige una opción',
    visit: 'Visita',
    pharmacy: 'Farmacia',
    appointmentsOrders: 'Citas/Pedidos',
  },
  en: {
    chooseOption: 'Choose an option',
    visit: 'Visit',
    pharmacy: 'Pharmacy',
    appointmentsOrders: 'Appointments/Orders',
  },
};

export default function ClienteScreen({ navigation }) {
  const { language } = useLanguage();
  const t = translations[language];

  const handleOptionSelection = (option) => {
    console.log(`Selected: ${option}`);
    const screens = {
      Visit: 'VisitScreen',
      Pharmacy: 'PharmacyScreen',
    };
    navigation.navigate(screens[option]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.chooseOption}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Opciones principales */}
      <View style={styles.optionsContainer}>
        <OptionCard image={require('../../assets/ImagenVisita.png')} text={t.visit} onPress={() => handleOptionSelection('Visit')} />
        <OptionCard image={require('../../assets/ImagenFarmacia.png')} text={t.pharmacy} onPress={() => handleOptionSelection('Pharmacy')} />
      </View>

      
      <View style={styles.bottomBar}>
        <NavItem
          image={require('../../assets/icons8-historial-de-pedidos-50.png')}
          text={t.appointmentsOrders}
          onPress={() => navigation.navigate('AppointmentsOrders')}
        />
      </View>
      </ScrollView>
    </View>
  );
}


const OptionCard = ({ image, text, onPress }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <Image source={image} style={styles.optionImage} />
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

//  navegación inferior
const NavItem = ({ image, text, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Image source={image} style={styles.navIcon} />
    <Text style={styles.navText}>{text}</Text>
  </TouchableOpacity>
);

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
