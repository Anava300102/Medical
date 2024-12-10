import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function GeneralDoctorDetail({ navigation }) {
    const [doctors, setDoctors] = useState([]);

    // Función para obtener todos los doctores
    const fetchDoctors = async () => {
        const querySnapshot = await getDocs(collection(db, 'generaldoctor'));
        const doctorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(doctorsList);
    };

    // Llamamos a fetchDoctors cuando el componente se monta
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Llamar a fetchDoctors cuando la pantalla se enfoque nuevamente
            fetchDoctors();
        });

        // Limpiar el listener cuando el componente se desmonte
        return unsubscribe;
    }, [navigation]);


    // Función para eliminar un doctor
    const handleDeleteDoctor = async (id) => {
        Alert.alert(
            'Eliminar Doctor',
            '¿Estás seguro de que deseas eliminar este doctor?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // Intentamos eliminar el doctor
                            await deleteDoc(doc(db, 'generaldoctor', id));
                            // Si la eliminación fue exitosa, actualizamos la lista de doctores
                            fetchDoctors();
                            Alert.alert('Éxito', 'Doctor eliminado correctamente');
                        } catch (error) {
                            // Si algo sale mal, mostramos el alert de error
                            Alert.alert('Error', 'Hubo un problema al eliminar el doctor.');
                            console.error(error); // Es útil loguear el error para entenderlo mejor en la consola
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Botón de agregar doctor */}
            <View style={styles.header}>
                <Text style={styles.title}>General Doctor Detail</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddDoctorScreen')}
                >
                    <Text style={styles.addButtonText}>+ Agregar Doctor</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de doctores */}
            <FlatList
                data={doctors}
                renderItem={({ item }) => (
                    <View style={styles.doctorItem}>
                        <Text style={styles.doctorText}>{item.name}</Text>
                        <Text style={styles.doctorText}>{item.phone}</Text>
                        <Text style={styles.doctorText}>{item.email}</Text>
                        <Text style={styles.doctorText}>{item.price}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('EditDoctorScreen', {
                                    doctorId: item.id,
                                    doctorName: item.name,
                                    doctorPhone: item.phone,
                                    doctorEmail: item.email,
                                    doctorPrice: item.price
                                })}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDeleteDoctor(item.id)}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
    },
    addButton: {
        backgroundColor: '#07DBEB',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    doctorItem: {
        padding: 15,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    doctorText: {
        fontSize: 16,
        marginBottom: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#07DBEB',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
