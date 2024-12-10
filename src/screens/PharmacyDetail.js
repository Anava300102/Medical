import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function PharmacyDetail({ navigation }) {
    const [medications, setMedications] = useState([]);

    // Función para obtener todos los medicamentos
    const fetchMedications = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'pharmacy'));
            const medicationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMedications(medicationsList);
        } catch (error) {
            console.error("Error al obtener los medicamentos:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchMedications();
        });
        return unsubscribe;
    }, [navigation]);

    const handleDeleteMedication = async (id) => {
        Alert.alert(
            'Eliminar Medicamento',
            '¿Estás seguro de que deseas eliminar este medicamento?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'pharmacy', id));
                            fetchMedications();
                            Alert.alert('Éxito', 'Medicamento eliminado correctamente.');
                        } catch (error) {
                            Alert.alert('Error', 'Hubo un problema al eliminar el medicamento.');
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={medications}
                renderItem={({ item }) => (
                    <View style={styles.medicationCard}>
                        <Text style={styles.medicationName}>{item.name}</Text>
                        <Text style={styles.medicationInfo}>Descripción: {item.description}</Text>
                        <Text style={styles.medicationInfo}>Precio: ${item.price}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => navigation.navigate('EditPharmacyScreen', {
                                    medicationId: item.id,
                                    medicationName: item.name,
                                    medicationDescription: item.description,
                                    medicationPrice: item.price,
                                })}
                            >
                                <Text style={styles.actionText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteMedication(item.id)}
                            >
                                <Text style={styles.actionText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.title}>Pharmacy Detail</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('AddPharmacyScreen')}
                        >
                            <Text style={styles.addButtonText}>+ Agregar Medicamento</Text>
                        </TouchableOpacity>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: '#07DBEB',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    medicationCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    medicationInfo: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#07DBEB',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});
