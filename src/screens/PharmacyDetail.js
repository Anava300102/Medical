import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../../credenciales';
import { useLanguage } from '../../Context';  // Asegúrate de importar el contexto de idioma

const db = getFirestore(appFirebase);

export default function PharmacyDetail({ navigation }) {
    const [medications, setMedications] = useState([]);
    const { language } = useLanguage(); // Obtener el idioma actual desde el contexto

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
            translations[language].deleteMedicationTitle,
            translations[language].deleteMedicationMessage,
            [
                { text: translations[language].cancel, style: 'cancel' },
                {
                    text: translations[language].delete,
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'pharmacy', id));
                            fetchMedications();
                            Alert.alert(translations[language].success, translations[language].medicationDeleted);
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
            title: 'Detalles de la Farmacia',
            addMedicationButton: '+ Agregar Medicamento',
            deleteMedicationTitle: 'Eliminar Medicamento',
            deleteMedicationMessage: '¿Estás seguro de que deseas eliminar este medicamento?',
            cancel: 'Cancelar',
            delete: 'Eliminar',
            success: 'Éxito',
            medicationDeleted: 'Medicamento eliminado correctamente.',
            error: 'Error',
            errorMessage: 'Hubo un problema al eliminar el medicamento.',
            edit: 'Editar', // Traducción para "Editar"
        },
        en: {
            title: 'Pharmacy Details',
            addMedicationButton: '+ Add Medication',
            deleteMedicationTitle: 'Delete Medication',
            deleteMedicationMessage: 'Are you sure you want to delete this medication?',
            cancel: 'Cancel',
            delete: 'Delete',
            success: 'Success',
            medicationDeleted: 'Medication deleted successfully.',
            error: 'Error',
            errorMessage: 'There was a problem deleting the medication.',
            edit: 'Edit', // Traducción para "Edit"
        }
    };

    const t = translations[language]; // Obtener las traducciones según el idioma actual

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
                                <Text style={styles.actionText}>{t.edit}</Text> {/* Aquí se usa la traducción */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDeleteMedication(item.id)}
                            >
                                <Text style={styles.actionText}>{t.delete}</Text> {/* Aquí se usa la traducción */}
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
                            onPress={() => navigation.navigate('AddPharmacyScreen')}
                        >
                            <Text style={styles.addButtonText}>{t.addMedicationButton}</Text> {/* Aquí se usa la traducción */}
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
