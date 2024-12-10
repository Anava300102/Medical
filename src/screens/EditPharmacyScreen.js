import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function EditPharmacyScreen({ route, navigation }) {
    const { medicationId, medicationName, medicationDescription, medicationPrice } = route.params;

    const [name, setName] = useState(medicationName);
    const [description, setDescription] = useState(medicationDescription);
    const [price, setPrice] = useState(medicationPrice);

    const handleUpdateMedication = async () => {
        if (!name || !description || !price) {
            Alert.alert('Error', 'Todos los campos son obligatorios.');
            return;
        }
        try {
            await updateDoc(doc(db, 'pharmacy', medicationId), { name, description, price });
            Alert.alert('Éxito', 'Medicamento actualizado correctamente.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al actualizar el medicamento.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Medicamento</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleUpdateMedication}>
                <Text style={styles.buttonText}>Guardar Cambios</Text>
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
