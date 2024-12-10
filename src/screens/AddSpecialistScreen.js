import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useLanguage } from '../../Context'; // Asegúrate de importar el contexto de idioma
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function AddSpecialistScreen({ navigation }) {
  const [newSpecialist, setNewSpecialist] = useState({ name: '', phone: '', email: '', specialty: '', price: '' });
  const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

  const handleChange = (field, value) => {
    setNewSpecialist({ ...newSpecialist, [field]: value });
  };

  const handleAddSpecialist = async () => {
    if (newSpecialist.name && newSpecialist.phone && newSpecialist.email && newSpecialist.specialty) {
      try {
        await addDoc(collection(db, 'specialistdoctor'), newSpecialist);
        setNewSpecialist({ name: '', phone: '', email: '', specialty: '', price: '' });
        Alert.alert(translations[language].success, translations[language].specialistAdded);
        navigation.goBack();
      } catch (error) {
        Alert.alert(translations[language].error, translations[language].errorMessage);
      }
    } else {
      Alert.alert(translations[language].warning, translations[language].fillFields);
    }
  };

  const translations = {
    es: {
      title: 'Agregar Especialista',
      namePlaceholder: 'Nombre completo',
      phonePlaceholder: 'Teléfono',
      emailPlaceholder: 'Correo electrónico',
      specialtyPlaceholder: 'Especialidad',
      pricePlaceholder: 'Precio de visita',
      addButton: 'Agregar Especialista',
      success: 'Éxito',
      specialistAdded: 'Especialista agregado correctamente.',
      error: 'Error',
      errorMessage: 'Hubo un problema al agregar el especialista.',
      warning: 'Advertencia',
      fillFields: 'Por favor, complete todos los campos.',
    },
    en: {
      title: 'Add Specialist',
      namePlaceholder: 'Full Name',
      phonePlaceholder: 'Phone',
      emailPlaceholder: 'Email',
      specialtyPlaceholder: 'Specialty',
      pricePlaceholder: 'Consultation Fee',
      addButton: 'Add Specialist',
      success: 'Success',
      specialistAdded: 'Specialist added successfully.',
      error: 'Error',
      errorMessage: 'There was an issue adding the specialist.',
      warning: 'Warning',
      fillFields: 'Please fill all the fields.',
    }
  };

  const t = translations[language]; // Obtener las traducciones según el idioma actual

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t.title}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.namePlaceholder}
          value={newSpecialist.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.phonePlaceholder}
          value={newSpecialist.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.emailPlaceholder}
          value={newSpecialist.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.specialtyPlaceholder}
          value={newSpecialist.specialty}
          onChangeText={(text) => handleChange('specialty', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.pricePlaceholder}
          value={newSpecialist.price}
          onChangeText={(text) => handleChange('price', text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddSpecialist}>
          <Text style={styles.buttonText}>{t.addButton}</Text>
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
