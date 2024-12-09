import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../Context';
import { auth } from '../../credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../../credenciales';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(appFirebase);

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { language } = useLanguage();

  const translations = {
    es: {
      title: 'Registro',
      namePlaceholder: 'Nombre',
      emailPlaceholder: 'Correo electrónico',
      phonePlaceholder: 'Teléfono',
      passwordPlaceholder: 'Contraseña',
      registerButton: 'Confirmar',
      loginRedirect: '¿Ya tienes una cuenta? Inicia sesión',
    },
    en: {
      title: 'Register',
      namePlaceholder: 'Name',
      emailPlaceholder: 'Email',
      phonePlaceholder: 'Phone',
      passwordPlaceholder: 'Password',
      registerButton: 'Confirm',
      loginRedirect: 'Already have an account? Log in',
    },
  };

  const t = translations[language];

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', t.completeFields || 'Please complete all fields.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",
        name: name,
        phone: phone,
      });

      Alert.alert('Success', t.registerSuccess || 'Registration successful.');
      navigation.navigate('Cliente');
    } catch (error) {
      Alert.alert('Error', t.registerError || 'An error occurred. Please try again.');
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../assets/Home.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <View style={styles.formContainer}>
          <Text style={styles.title}>{t.title}</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#07DBEB" />
            <TextInput
              style={styles.input}
              placeholder={t.namePlaceholder}
              value={name}
              onChangeText={setName}
            />
          </View>

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
            <Ionicons name="call-outline" size={20} color="#07DBEB" />
            <TextInput
              style={styles.input}
              placeholder={t.phonePlaceholder}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
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

          <TouchableOpacity style={styles.confirmButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>{t.registerButton}</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>{t.loginRedirect}</Text>
            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={styles.loginLink}>{t.loginRedirect}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    height: 200,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
