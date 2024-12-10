import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function EditDoctorScreen({ route, navigation }) {
  const { doctorId, doctorName, doctorPhone, doctorEmail, doctorPrice } = route.params;
  const [name, setName] = useState(doctorName);
  const [phone, setPhone] = useState(doctorPhone);
  const [email, setEmail] = useState(doctorEmail);
  const [price, setPrice] = useState(doctorPrice);

  const handleSave = async () => {
    try {
      const doctorRef = doc(db, 'generaldoctor', doctorId);
      await updateDoc(doctorRef, {
        name,
        phone,
        email,
        price
      });
      Alert.alert('Éxito', 'Datos del doctor actualizados correctamente');
      navigation.goBack(); // Regresa a la pantalla anterior
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el doctor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Doctor</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Teléfono"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Correo"
      />
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Precio"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
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
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#07DBEB',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
