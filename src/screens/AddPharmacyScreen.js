import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function AddPharmacyScreen({ navigation }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddMedication = async () => {
        if (!name || !description || !price) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }
        try {
            await addDoc(collection(db, 'pharmacy'), { name, description, price });
            Alert.alert('Éxito', 'Medicamento agregado correctamente.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al agregar el medicamento.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Medicamento</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del medicamento"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={price}
                keyboardType="numeric"
                onChangeText={setPrice}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddMedication}>
                <Text style={styles.buttonText}>Guardar</Text>
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
