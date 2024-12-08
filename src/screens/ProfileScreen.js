import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const handleUpdateInformation = () => {
    console.log('Update Information Pressed');
    // Aquí puedes agregar la navegación o funcionalidad para actualizar la información
  };

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <View style={styles.background}>
        <Image
          source={require('../../assets/fondoperfil.jpeg')} 
          style={styles.backgroundImage}
        />
      </View>

      {/* Contenedor de la imagen de perfil */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/profile.png')} 
          style={styles.profileImage}
        />
      </View>

      {/* Contenedor de la información */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons8-nombre-50.png')} 
            style={styles.icon}
          />
          <Text style={styles.infoText}>Angel Nava</Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons8-nuevo-post-30.png')} 
            style={styles.icon}
          />
          <Text style={styles.infoText}>angel@gmail.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons8-llamada-50.png')} 
            style={styles.icon}
          />
          <Text style={styles.infoText}>449 188 6437</Text>
        </View>

        {/* Botón para actualizar información */}
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateInformation}>
          <Text style={styles.updateButtonText}>Update Information</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Services')}>
          <Image source={require('../../assets/icons8-servicios-50.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../../assets/icons8-historial-de-pedidos-50.png')} style={styles.navIcon} />
          <Text style={styles.navText}>Ordenes</Text>
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
  background: {
    height: '30%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '125%',
    resizeMode: 'cover',
  },
  profileContainer: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  profileImage: {
    width: 138,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoContainer: {
    marginTop: 80,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
