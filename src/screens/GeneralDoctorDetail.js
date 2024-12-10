import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';  // Asegúrate de importar el contexto de idioma

const db = getFirestore(appFirebase);

export default function GeneralDoctorDetail({ navigation }) {
    const [doctors, setDoctors] = useState([]);
    const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

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
            translations[language].deleteDoctorTitle,
            translations[language].deleteDoctorMessage,
            [
                { text: translations[language].cancel, style: 'cancel' },
                {
                    text: translations[language].delete,
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'generaldoctor', id));
                            fetchDoctors();
                            Alert.alert(translations[language].success, translations[language].doctorDeleted);
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
            title: 'Detalles del Doctor General',
            addDoctorButton: '+ Agregar Doctor',
            deleteDoctorTitle: 'Eliminar Doctor',
            deleteDoctorMessage: '¿Estás seguro de que deseas eliminar este doctor?',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            success: 'Éxito',
            doctorDeleted: 'Doctor eliminado correctamente',
            error: 'Error',
            errorMessage: 'Hubo un problema al eliminar el doctor.',
            edit: 'Editar', // Traducción para "Editar"
        },
        en: {
            title: 'General Doctor Details',
            addDoctorButton: '+ Add Doctor',
            deleteDoctorTitle: 'Delete Doctor',
            deleteDoctorMessage: 'Are you sure you want to delete this doctor?',
            cancel: 'Cancel',
            delete: 'Delete',
            success: 'Success',
            doctorDeleted: 'Doctor deleted successfully',
            error: 'Error',
            errorMessage: 'There was a problem deleting the doctor.',
            edit: 'Edit', // Traducción para "Edit"
        }
    };

    const t = translations[language]; // Obtener las traducciones según el idioma actual

    return (
        <View style={styles.container}>
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
                                <Text style={styles.actionText}>{t.edit}</Text> {/* Aquí se usa la traducción */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteDoctor(item.id)}
                            >
                                <Text style={styles.actionText}>{t.delete}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.title}>{t.title}</Text> {/* Aquí se usa la traducción */}
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigation.navigate('AddDoctorScreen')}
                        >
                            <Text style={styles.addButtonText}>{t.addDoctorButton}</Text> {/* Aquí se usa la traducción */}
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
