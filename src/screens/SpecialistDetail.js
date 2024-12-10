import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';

const db = getFirestore(appFirebase);

export default function GeneralSpecialistDetail({ navigation }) {
    const [specialists, setSpecialists] = useState([]);

    const fetchSpecialists = async () => {
        const querySnapshot = await getDocs(collection(db, 'specialistdoctor'));
        const specialistsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSpecialists(specialistsList);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchSpecialists();
        });

        return unsubscribe;
    }, [navigation]);

    const handleDeleteSpecialist = async (id) => {
        Alert.alert(
            'Eliminar Especialista',
            '¿Estás seguro de que deseas eliminar este especialista?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'specialistdoctor', id));
                            fetchSpecialists();
                            Alert.alert('Éxito', 'Especialista eliminado correctamente');
                        } catch (error) {
                            Alert.alert('Error', 'Hubo un problema al eliminar el especialista.');
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
                data={specialists}
                renderItem={({ item }) => (
                    <View style={styles.specialistCard}>
                        <Text style={styles.specialistName}>{item.name}</Text>
                        <Text style={styles.specialistInfo}>Tel: {item.phone}</Text>
                        <Text style={styles.specialistInfo}>Email: {item.email}</Text>
                        <Text style={styles.specialistInfo}>Especialidad: {item.specialty}</Text>
                        <Text style={styles.specialistInfo}>Precio: {item.price}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => navigation.navigate('EditSpecialistScreen', {
                                    specialistId: item.id,
                                    specialistName: item.name,
                                    specialistPhone: item.phone,
                                    specialistEmail: item.email,
                                    specialistSpecialty: item.specialty,
                                    specialistPrice: item.price
                                })}
                            >
                                <Text style={styles.actionText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteSpecialist(item.id)}
                            >
                                <Text style={styles.actionText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.title}>Especialista Doctor Detail</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('AddSpecialistScreen')}
                        >
                            <Text style={styles.addButtonText}>+ Agregar Especialista</Text>
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
        fontSize: 19,
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
    specialistCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    specialistName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    specialistInfo: {
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
