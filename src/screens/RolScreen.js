import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

export default function RolScreen({ navigation }) {
  const roles = [
    { id: '1', name: 'Especialista', image: require('../../assets/especialista.png') },
    { id: '2', name: 'Repartidor', image: require('../../assets/repartidor.jpg') },
    { id: '3', name: 'Cliente', image: require('../../assets/segundapantalla.jpg') },
  ];

  const handleRoleSelection = (role) => {
    if (role === 'Especialista') {
      navigation.navigate('Especialista'); 
    } else if (role === 'Repartidor') {
      navigation.navigate('Repartidor'); 
    } else if (role === 'Cliente') {
      navigation.navigate('Cliente'); 
    } else {
      console.log(`Rol seleccionado: ${role}`);
    }
  };

  const renderRole = ({ item }) => (
    <TouchableOpacity
      style={styles.roleCard}
      onPress={() => handleRoleSelection(item.name)}
    >
      <Image source={item.image} style={styles.roleImage} />
      <Text style={styles.roleText}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Hacer Scroll para elegir rol
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a role</Text>
      <FlatList
        data={roles}
        renderItem={renderRole}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  roleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    width: 200,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 10,
  },
  roleImage: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  roleText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
});
