import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export default function AddDoctorScreen({ navigation }) {
  const [newDoctor, setNewDoctor] = useState({ name: '', phone: '', email: '', price: '' });

  const handleChange = (field, value) => {
    setNewDoctor({ ...newDoctor, [field]: value });
  };

  const handleAddDoctor = async () => {
    if (newDoctor.name && newDoctor.phone && newDoctor.email) {
      try {
        await addDoc(collection(db, 'generaldoctor'), newDoctor);
        setNewDoctor({ name: '', phone: '', email: '', price: '' }); // Limpiar el formulario
        Alert.alert('Éxito', 'Doctor agregado correctamente');
        navigation.goBack(); // Volver a la pantalla anterior
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al agregar el doctor.');
      }
    } else {
      Alert.alert('Advertencia', 'Por favor, complete todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
      <Text style={styles.title}>Agregar Doctor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={newDoctor.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={newDoctor.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={newDoctor.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio de visita"
        value={newDoctor.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddDoctor}>
        <Text style={styles.buttonText}>Agregar Doctor</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#07DBEB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

