import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import appFirebase from '../../credenciales';
import { auth } from '../../credenciales';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { useLanguage } from '../../Context';

// Inicializa Firestore
const db = getFirestore(appFirebase);

export default function ProfileScreen({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      profile: 'Perfil',
      editInformation: 'Editar Información',
      saveChanges: 'Guardar Cambios',
      deleteAccount: 'Eliminar Cuenta',
      deleteAccountMessage: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      successMessage: 'Los datos se actualizaron correctamente.',
      errorMessage: 'Hubo un problema al actualizar los datos.',
      deleteSuccess: 'Tu cuenta se ha eliminado correctamente.',
      deleteError: 'Hubo un problema al eliminar tu cuenta. Asegúrate de haber iniciado sesión recientemente.',
      loading: 'Cargando...',
      noName: 'Sin nombre',
      noPhone: 'Sin teléfono',
      noEmail: 'Sin correo',
    },
    en: {
      profile: 'Profile',
      editInformation: 'Edit Information',
      saveChanges: 'Save Changes',
      deleteAccount: 'Delete Account',
      deleteAccountMessage: 'Are you sure you want to delete your account? This action cannot be undone.',
      successMessage: 'The data has been successfully updated.',
      errorMessage: 'There was a problem updating the data.',
      deleteSuccess: 'Your account has been successfully deleted.',
      deleteError: 'There was a problem deleting your account. Make sure you have recently signed in.',
      loading: 'Loading...',
      noName: 'No name',
      noPhone: 'No phone',
      noEmail: 'No email',
    },
  };

  const t = translations[language];
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
          setEditableData({
            name: docSnap.data().name || '',
            phone: docSnap.data().phone || '',
          });
        } else {
          Alert.alert('Error', 'No user data found.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateInformation = async () => {
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, 'users', user.uid);

      try {
        await updateDoc(docRef, editableData);
        setUserInfo((prev) => ({
          ...prev,
          ...editableData,
        }));
        setIsEditing(false);
        Alert.alert('Success', t.successMessage);
      } catch (error) {
        Alert.alert('Error', t.errorMessage);
      }
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (user) {
      Alert.alert(
        t.deleteAccount,
        t.deleteAccountMessage,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const docRef = doc(db, 'users', user.uid);
                await deleteDoc(docRef);
                await deleteUser(user);
                Alert.alert('Success', t.deleteSuccess);
                navigation.navigate('Login');
              } catch (error) {
                Alert.alert('Error', t.deleteError);
              }
            },
          },
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
        <Text>{t.loading}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.background}>
          <Image source={require('../../assets/fondoperfil.jpeg')} style={styles.backgroundImage} />
        </View>
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/profile.png')} style={styles.profileImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>{t.profile}</Text>
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
                <Text style={styles.infoText}>{userInfo.email || t.noEmail}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.name || t.noName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-llamada-50.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.phone || t.noPhone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Image source={require('../../assets/icons8-nuevo-post-30.png')} style={styles.icon} />
                <Text style={styles.infoText}>{userInfo.email || t.noEmail}</Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.updateButton}
            onPress={isEditing ? handleUpdateInformation : () => setIsEditing(true)}
          >
            <Text style={styles.updateButtonText}>{isEditing ? t.saveChanges : t.editInformation}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>{t.deleteAccount}</Text>
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
