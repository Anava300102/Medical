import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
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

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDoctors();
        });
        return unsubscribe;
    }, [navigation]);

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
                            await deleteDoc(doc(db, 'generaldoctor', id));
                            fetchDoctors();
                            Alert.alert('Éxito', 'Doctor eliminado correctamente');
                        } catch (error) {
                            Alert.alert('Error', 'Hubo un problema al eliminar el doctor.');
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
             <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
            <View style={styles.header}>
                <Text style={styles.title}>General Doctor Detail</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddDoctorScreen')}
                >
                    <Text style={styles.addButtonText}>+ Agregar Doctor</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={doctors}
                renderItem={({ item }) => (
                    <View style={styles.doctorCard}>
                        <Text style={styles.doctorName}>{item.name}</Text>
                        <Text style={styles.doctorInfo}>Tel: {item.phone}</Text>
                        <Text style={styles.doctorInfo}>Email: {item.email}</Text>
                        <Text style={styles.doctorInfo}>Precio: {item.price}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => navigation.navigate('EditDoctorScreen', {
                                    doctorId: item.id,
                                    doctorName: item.name,
                                    doctorPhone: item.phone,
                                    doctorEmail: item.email,
                                    doctorPrice: item.price,
                                })}
                            >
                                <Text style={styles.actionText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteDoctor(item.id)}
                            >
                                <Text style={styles.actionText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            </ScrollView>
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
    doctorCard: {
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
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    doctorInfo: {
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
