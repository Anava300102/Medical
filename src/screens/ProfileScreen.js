import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import appFirebase from '../../credenciales';
import { auth } from '../../credenciales';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

// Inicializa Firestore
const db = getFirestore(appFirebase);

export default function ProfileScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          setEditableData({
            name: docSnap.data().name || '',
            phone: docSnap.data().phone || ''
          });
        } else {
          Alert.alert('Error', 'No se encontraron datos para este usuario.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateInformation = async () => {
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, "users", user.uid);

      try {
        await updateDoc(docRef, editableData);
        setUserInfo((prev) => ({
          ...prev,
          ...editableData
        }));
        setIsEditing(false);
        Alert.alert('Éxito', 'Los datos se actualizaron correctamente.');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      Alert.alert(
        'Eliminar Cuenta',
        '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: async () => {
              try {
                // Elimina el registro del usuario en Firestore
                const docRef = doc(db, "users", user.uid);
                await deleteDoc(docRef);

                // Elimina la cuenta del usuario de Firebase Auth
                await deleteUser(user);

                Alert.alert('Cuenta eliminada', 'Tu cuenta se ha eliminado correctamente.');
                navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
              } catch (error) {
                Alert.alert('Error', 'Hubo un problema al eliminar tu cuenta. Asegúrate de haber iniciado sesión recientemente.');
              }
            }
          }
        ]
      );
    }
  };

  const handleChange = (field, value) => {
    setEditableData({ ...editableData, [field]: value });
  };

  if (!userInfo) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.background}>
          <Image
            source={require('../../assets/fondoperfil.jpeg')}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/profile.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Profile</Text>
          {isEditing ? (
            <>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
                <TextInput
                  style={styles.infoTextInput}
                  value={editableData.name}
                  onChangeText={(text) => handleChange('name', text)}
                />
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-llamada-50.png')} style={styles.icon} />
                <TextInput
                  style={styles.infoTextInput}
                  value={editableData.phone}
                  onChangeText={(text) => handleChange('phone', text)}
                />
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nuevo-post-30.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.email || 'Sin correo'}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.name || 'Sin nombre'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-llamada-50.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.phone || 'Sin teléfono'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nuevo-post-30.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.email || 'Sin correo'}</Text>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.updateButton} onPress={isEditing ? handleUpdateInformation : () => setIsEditing(true)}>
            <Text style={styles.updateButtonText}>{isEditing ? 'Guardar Cambios' : 'Editar Información'}</Text>
          </TouchableOpacity>

          {/* Botón para eliminar la cuenta */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Eliminar Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    height: '30%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '125%',
    resizeMode: 'cover',
  },
  profileContainer: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
  },
  profileImage: {
    width: 138,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  infoContainer: {
    marginTop: 80,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  infoTextInput: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  updateButton: {
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
