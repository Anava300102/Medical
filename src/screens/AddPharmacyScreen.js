import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useLanguage } from '../../Context'; // Asegúrate de importar el contexto de idioma
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function AddPharmacyScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

  const handleAddMedication = async () => {
    if (!name || !description || !price) {
      Alert.alert(translations[language].error, translations[language].fillFields);
      return;
    }
    try {
      await addDoc(collection(db, 'pharmacy'), { name, description, price });
      Alert.alert(translations[language].success, translations[language].medicationAdded);
      navigation.goBack();
    } catch (error) {
      Alert.alert(translations[language].error, translations[language].errorMessage);
      console.error(error);
    }
  };

  const translations = {
    es: {
      title: 'Agregar Medicamento',
      namePlaceholder: 'Nombre del medicamento',
      descriptionPlaceholder: 'Descripción',
      pricePlaceholder: 'Precio',
      saveButton: 'Guardar',
      error: 'Error',
      fillFields: 'Todos los campos son obligatorios.',
      success: 'Éxito',
      medicationAdded: 'Medicamento agregado correctamente.',
      errorMessage: 'Hubo un problema al agregar el medicamento.',
    },
    en: {
      title: 'Add Medication',
      namePlaceholder: 'Medication Name',
      descriptionPlaceholder: 'Description',
      pricePlaceholder: 'Price',
      saveButton: 'Save',
      error: 'Error',
      fillFields: 'All fields are required.',
      success: 'Success',
      medicationAdded: 'Medication added successfully.',
      errorMessage: 'There was an issue adding the medication.',
    }
  };

  const t = translations[language]; // Obtener las traducciones según el idioma actual

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <TextInput
        style={styles.input}
        placeholder={t.namePlaceholder}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={t.descriptionPlaceholder}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder={t.pricePlaceholder}
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddMedication}>
        <Text style={styles.buttonText}>{t.saveButton}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
