import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function EditSpecialistScreen({ route, navigation }) {
  const { specialistId, specialistName, specialistPhone, specialistEmail, specialistSpecialty, specialistPrice } = route.params;
  const [name, setName] = useState(specialistName);
  const [phone, setPhone] = useState(specialistPhone);
  const [email, setEmail] = useState(specialistEmail);
  const [specialty, setSpecialty] = useState(specialistSpecialty);
  const [price, setPrice] = useState(specialistPrice);

  const handleSave = async () => {
    try {
      const specialistRef = doc(db, 'specialistdoctor', specialistId);
      await updateDoc(specialistRef, { name, phone, email, specialty, price });
      Alert.alert('Éxito', 'Datos del especialista actualizados correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el especialista.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
       <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
      <Text style={styles.title}>Editar Especialista</Text>
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
        value={specialty}
        onChangeText={setSpecialty}
        placeholder="Especialidad"
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
