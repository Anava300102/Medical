import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useLanguage } from '../../Context';  // Asegúrate de importar el contexto de idioma

const db = getFirestore();

export default function AddDoctorScreen({ navigation }) {
  const [newDoctor, setNewDoctor] = useState({ name: '', phone: '', email: '', price: '' });
  const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

  const handleChange = (field, value) => {
    setNewDoctor({ ...newDoctor, [field]: value });
  };

  const handleAddDoctor = async () => {
    if (newDoctor.name && newDoctor.phone && newDoctor.email) {
      try {
        await addDoc(collection(db, 'generaldoctor'), newDoctor);
        setNewDoctor({ name: '', phone: '', email: '', price: '' }); // Limpiar el formulario
        Alert.alert(translations[language].success, translations[language].doctorAdded);
        navigation.goBack(); // Volver a la pantalla anterior
      } catch (error) {
        Alert.alert(translations[language].error, translations[language].errorMessage);
      }
    } else {
      Alert.alert(translations[language].warning, translations[language].fillFields);
    }
  };

  const translations = {
    es: {
      title: 'Agregar Doctor',
      namePlaceholder: 'Nombre completo',
      phonePlaceholder: 'Teléfono',
      emailPlaceholder: 'Correo electrónico',
      pricePlaceholder: 'Precio de visita',
      addDoctorButton: 'Agregar Doctor',
      success: 'Éxito',
      doctorAdded: 'Doctor agregado correctamente',
      error: 'Error',
      errorMessage: 'Hubo un problema al agregar el doctor.',
      warning: 'Advertencia',
      fillFields: 'Por favor, complete todos los campos.',
    },
    en: {
      title: 'Add Doctor',
      namePlaceholder: 'Full Name',
      phonePlaceholder: 'Phone',
      emailPlaceholder: 'Email',
      pricePlaceholder: 'Visit Price',
      addDoctorButton: 'Add Doctor',
      success: 'Success',
      doctorAdded: 'Doctor added successfully',
      error: 'Error',
      errorMessage: 'There was a problem adding the doctor.',
      warning: 'Warning',
      fillFields: 'Please fill in all the fields.',
    }
  };

  const t = translations[language]; // Obtener las traducciones según el idioma actual

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.title}</Text>
        <TextInput
          style={styles.input}
          placeholder={t.namePlaceholder}
          value={newDoctor.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.phonePlaceholder}
          value={newDoctor.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.emailPlaceholder}
          value={newDoctor.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder={t.pricePlaceholder}
          value={newDoctor.price}
          onChangeText={(text) => handleChange('price', text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddDoctor}>
          <Text style={styles.buttonText}>{t.addDoctorButton}</Text> {/* Aquí se usa la traducción */}
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
