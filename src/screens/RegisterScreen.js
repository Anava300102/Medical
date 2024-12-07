import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos de teléfono y candado
import { useLanguage } from '../../Context';

export default function RegisterScreen({ navigation }) { // Recibe 'navigation' como prop
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { language, changeLanguage } = useLanguage();

  const translations = {
    es: {
      selectImage: 'Selecciona una imagen',
      title: 'Registro',
      namePlaceholder: 'Nombre',
      lastNamePlaceholder: 'Apellido',
      emailPlaceholder: 'Correo electrónico',
      phonePlaceholder: 'Teléfono',
      passwordPlaceholder: 'Contraseña',
      confirmPasswordPlaceholder: 'Confirmar contraseña',
      registerButton: 'Registrarse',
      loginRedirect: '¿Ya tienes una cuenta? Inicia sesión',
    },
    en: {
      selectImage: 'Select an image',
      title: 'Register',
      namePlaceholder: 'Name',
      lastNamePlaceholder: 'Last name',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Phone',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Confirm password',
      registerButton: 'Register',
      loginRedirect: 'Already have an account? Log in',
    }
  }





  const t = translations[language];
  const handleRegister = () => {
    // Validar que todos los campos estén llenos
    if (!name || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo válido.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Validar que el número de teléfono sea numérico y tenga una longitud adecuada
    if (!/^\d+$/.test(phone) || phone.length < 8) {
      Alert.alert('Error', 'Por favor, ingresa un número de teléfono válido.');
      return;
    }

    // Si todo está correcto, navegar a la pantalla de servicios
    Alert.alert('Éxito', 'Registro exitoso');
    navigation.navigate('Services');
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login'); // Redirige a la pantalla de inicio de sesión
  };

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground
        source={require('../../assets/Home.png')} // Aquí puedes agregar tu propia ruta
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Contenedor de la imagen de perfil */}
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/icons8-nuevo-post-30.png')} style={styles.profileImage} />
        <Text style={styles.profileText}>Selecciona una imagen</Text>
      </View>

      {/* Formulario de registro */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Apellido(s)"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Botón de confirmación */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>

        {/* Enlace para iniciar sesión */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#07DBEB',
  },
  profileText: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#AAAAAA',
    marginBottom: 20,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    color: '#07DBEB',
    fontWeight: 'bold',
  },
});
