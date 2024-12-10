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
            <View style={styles.header}>
                <Text style={styles.title}>Especialista Doctor Detail</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddSpecialistScreen')}
                >
                    <Text style={styles.addButtonText}>+ Agregar Especialista</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={specialists}
                renderItem={({ item }) => (
                    <View style={styles.specialistItem}>
                        <Text style={styles.specialistText}>{item.name}</Text>
                        <Text style={styles.specialistText}>{item.phone}</Text>
                        <Text style={styles.specialistText}>{item.email}</Text>
                        <Text style={styles.specialistText}>{item.specialty}</Text>
                        <Text style={styles.specialistText}>{item.price}</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('EditSpecialistScreen', {
                                    specialistId: item.id,
                                    specialistName: item.name,
                                    specialistPhone: item.phone,
                                    specialistEmail: item.email,
                                    specialistSpecialty: item.specialty,
                                    specialistPrice: item.price
                                })}
                            >
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDeleteSpecialist(item.id)}
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
    specialistItem: {
        padding: 15,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    specialistText: {
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
