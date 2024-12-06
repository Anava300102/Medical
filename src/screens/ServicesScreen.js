import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert, TextInput } from 'react-native';
import appFirebase from '../../credenciales';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function Services({ navigation }) {
  const [services, setServices] = useState([
    { id: 1, name: 'Specialists', image: 'https://example.com/service1.jpg' },
    { id: 2, name: 'General doctor', image: 'https://example.com/service2.jpg' },
    { id: 3, name: 'Pharmacy', image: 'https://example.com/service3.jpg' },
  ]);
  const [editingService, setEditingService] = useState(null); // Servicio en edición
  const [editedName, setEditedName] = useState(''); // Nuevo nombre del servicio

  // Función para agregar un servicio
  const addService = (newService) => {
    setServices((prevServices) => [...prevServices, { ...newService, id: Date.now() }]);
  };

  // Función para eliminar un servicio
  const deleteService = (id) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setServices((prevServices) => prevServices.filter((service) => service.id !== id)),
        },
      ],
      { cancelable: true }
    );
  };

  // Función para activar el modo de edición
  const startEditing = (service) => {
    setEditingService(service.id);
    setEditedName(service.name);
  };

  // Función para guardar los cambios de edición
  const saveEdit = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, name: editedName } : service
      )
    );
    setEditingService(null);
    setEditedName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewService', { addService })} // Pasa addService como parámetro
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceItem}>
            <Image source={{ uri: service.image }} style={styles.image} />
            {editingService === service.id ? (
              <TextInput
                style={styles.editInput}
                value={editedName}
                onChangeText={setEditedName}
              />
            ) : (
              <Text>{service.name}</Text>
            )}
            <View style={styles.actionsContainer}>
              {editingService === service.id ? (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => saveEdit(service.id)}
                >
                  <Text style={styles.buttonText}>💾</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEditing(service)}
                >
                  <Text style={styles.buttonText}>✏️</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteService(service.id)}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#07DBEB',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: { fontSize: 30, color: '#fff' },
  listContainer: { marginTop: 20 },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  image: { width: 30, height: 30, marginRight: 10 },
  actionsContainer: { flexDirection: 'row', alignItems: 'center' },
  editButton: { padding: 5, marginRight: 10 },
  saveButton: { padding: 5, marginRight: 10 },
  deleteButton: { padding: 5 },
  buttonText: { fontSize: 18, color: '#07DBEB' },
  editInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#07DBEB',
    padding: 5,
    marginRight: 10,
    flex: 1,
  },
});
