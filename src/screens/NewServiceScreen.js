import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import appFirebase from '../../credenciales';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function NewService({ route, navigation }) {
  const { addService } = route.params; // Recibe la función addService desde la pantalla anterior
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddService = async () => {
    try {


      if (!serviceName || !description) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      await addDoc(collection(db, 'services'), {
        name: serviceName,
        description,
      });

      // Agregar el nuevo servicio usando la función addService
      addService({ name: serviceName, description, image });

      Alert.alert('Servicio agregado', 'Tu servicio ha sido agregado exitosamente.');

      // Limpiar los campos
      setServiceName('');
      setDescription('');
      navigation.goBack(); // Regresar a la pantalla de servicios
    }
    catch {
      console.error(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Service</Text>

      <TextInput
        style={styles.input}
        placeholder="Service name"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
        <Text style={styles.addButtonText}>Add Service</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
