import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../Context';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function LoginScreen({ navigation }) {
  const [orientation, setOrientation] = useState('portrait');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    // Detectar cambios de orientación
    const orientationSubscription = ScreenOrientation.addOrientationChangeListener((event) => {
        const orientationType = event.orientationInfo.orientation;
        setOrientation(
            orientationType === ScreenOrientation.Orientation.LANDSCAPE
                ? 'landscape'
                : 'portrait'
        );
    });

    return () => {
        ScreenOrientation.removeOrientationChangeListener(orientationSubscription);
    };
}, []);

  const translations = {
    es: {
      loginTitle: 'Iniciar Sesión',
      emailPlaceholder: 'Correo',
      passwordPlaceholder: 'Contraseña',
      loginButton: 'Iniciar Sesión',
      registerText: '¿No tienes una cuenta?',
      registerLink: 'Regístrate',
      errorMessage: 'Por favor, completa todos los campos.',
      successMessage: 'Inicio de sesión exitoso',
      invalidCredentials: 'Correo o contraseña incorrectos.',
    },
    en: {
      loginTitle: 'Login',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
      registerText: "Don't have an account?",
      registerLink: 'Register',
      errorMessage: 'Please fill in all fields.',
      successMessage: 'Login successful',
      invalidCredentials: 'Incorrect email or password.',
    },
  };

  const handleLogin = () => {
    const t = translations[language];
    if (!email || !password) {
      Alert.alert('Error', t.errorMessage);
      return;
    }

    // Validar credenciales ficticias
    if (global.userData?.email === email && global.userData?.password === password) {
      Alert.alert('Éxito', t.successMessage);
      
    } else {
      Alert.alert('Error', t.invalidCredentials);
    }
    navigation.navigate('Rol'); // Navega a la pantalla de roles
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register'); // Navega a la pantalla de registro
  };

  const t = translations[language];

  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }} 
    horizontal={false} 
    keyboardShouldPersistTaps="handled">
    <View style={[styles.container, { minHeight: orientation === 'landscape' ? 300 : '100%' }]}>
      {/* Botones para cambiar idioma */}
      <View style={styles.languageButtons}>
        <TouchableOpacity
          style={[styles.languageButton, language === 'es' && styles.activeLanguageButton]}
          onPress={() => changeLanguage('es')}
        >
          <Text style={styles.languageButtonText}>ES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.languageButton, language === 'en' && styles.activeLanguageButton]}
          onPress={() => changeLanguage('en')}
        >
          <Text style={styles.languageButtonText}>EN</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen en la parte superior */}
      <Image
        source={require('../../assets/Home.png')} // Asegúrate de que esta ruta sea correcta
        style={styles.image}
      />

      {/* Parte inferior con fondo blanco */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>{t.loginTitle}</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder={t.emailPlaceholder}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#07DBEB" />
          <TextInput
            style={styles.input}
            placeholder={t.passwordPlaceholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t.loginButton}</Text>
        </TouchableOpacity>

        <View style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>{t.registerText} </Text>
          <TouchableOpacity onPress={handleRegisterRedirect}>
            <Text style={styles.registerLink}>{t.registerLink}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  languageButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
  languageButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  activeLanguageButton: {
    backgroundColor: '#07DBEB',
  },
  languageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20,
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
  loginButton: {
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
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    color: '#07DBEB',
    fontWeight: 'bold',
  },
});
