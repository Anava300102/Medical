import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import appFirebase from '../../credenciales';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function NewService({ route, navigation }) {
  const { addService } = route.params; // Recibe la función addService desde la pantalla anterior
  const [image, setImage] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería para subir una imagen.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddService = async () => {
    try {


      if (!serviceName || !description || !image) {
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
      setImage(null);
      navigation.goBack(); // Regresar a la pantalla de servicios
    }
    catch {
      console.error(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Service</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require('../../assets/camara.png')}
            style={styles.imagePlaceholder}
          />
        )}
      </TouchableOpacity>

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
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  imagePlaceholder: { width: 100, height: 100, tintColor: '#888' },
  image: { width: '100%', height: '100%', borderRadius: 10 },
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
