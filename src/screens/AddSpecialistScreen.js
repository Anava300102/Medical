import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore();

export default function AddSpecialistScreen({ navigation }) {
  const [newSpecialist, setNewSpecialist] = useState({ name: '', phone: '', email: '', specialty: '', price: '' });

  const handleChange = (field, value) => {
    setNewSpecialist({ ...newSpecialist, [field]: value });
  };

  const handleAddSpecialist = async () => {
    if (newSpecialist.name && newSpecialist.phone && newSpecialist.email && newSpecialist.specialty) {
      try {
        await addDoc(collection(db, 'specialistdoctor'), newSpecialist);
        setNewSpecialist({ name: '', phone: '', email: '', specialty: '', price: '' });
        Alert.alert('Éxito', 'Especialista agregado correctamente');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al agregar el especialista.');
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
      <Text style={styles.title}>Agregar Especialista</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={newSpecialist.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={newSpecialist.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={newSpecialist.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={newSpecialist.specialty}
        onChangeText={(text) => handleChange('specialty', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio de visita"
        value={newSpecialist.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddSpecialist}>
        <Text style={styles.buttonText}>Agregar Especialista</Text>
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

