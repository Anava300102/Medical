import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';  // Asegúrate de importar el contexto de idioma

const db = getFirestore(appFirebase);

export default function GeneralSpecialistDetail({ navigation }) {
    const [specialists, setSpecialists] = useState([]);
    const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

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
            translations[language].deleteSpecialistTitle,
            translations[language].deleteSpecialistMessage,
            [
                { text: translations[language].cancel, style: 'cancel' },
                {
                    text: translations[language].delete,
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'specialistdoctor', id));
                            fetchSpecialists();
                            Alert.alert(translations[language].success, translations[language].specialistDeleted);
                        } catch (error) {
                            Alert.alert(translations[language].error, translations[language].errorMessage);
                            console.error(error);
                        }
                    }
                }
            ]
        );
    };

    const translations = {
        es: {
            title: 'Detalles de Especialista Doctor',
            addSpecialistButton: '+ Agregar Especialista',
            deleteSpecialistTitle: 'Eliminar Especialista',
            deleteSpecialistMessage: '¿Estás seguro de que deseas eliminar este especialista?',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            success: 'Éxito',
            specialistDeleted: 'Especialista eliminado correctamente',
            error: 'Error',
            errorMessage: 'Hubo un problema al eliminar el especialista.',
            edit: 'Editar', // Traducción para "Editar"
        },
        en: {
            title: 'Specialist Doctor Details',
            addSpecialistButton: '+ Add Specialist',
            deleteSpecialistTitle: 'Delete Specialist',
            deleteSpecialistMessage: 'Are you sure you want to delete this specialist?',
            cancel: 'Cancel',
            delete: 'Delete',
            success: 'Success',
            specialistDeleted: 'Specialist deleted successfully',
            error: 'Error',
            errorMessage: 'There was a problem deleting the specialist.',
            edit: 'Edit', // Traducción para "Edit"
        }
    };

    const t = translations[language]; // Obtener las traducciones según el idioma actual

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
                                <Text style={styles.actionText}>{t.edit}</Text>  {/* Aquí se usa la traducción */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteSpecialist(item.id)}
                            >
                                <Text style={styles.actionText}>{t.delete}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.title}>{t.title}</Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('AddSpecialistScreen')}
                        >
                            <Text style={styles.addButtonText}>{t.addSpecialistButton}</Text>
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
