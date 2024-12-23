import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

export default function EspecialistaScreen({ navigation }) {
  const consultations = [
    {
      id: '1',
      title: 'Medical consultation completed #1',
      orderDate: '10/10/2024',
      patient: '',
      address: '',
    },
    {
      id: '2',
      title: 'Medical consultation completed #2',
      orderDate: '10/10/2024',
      patient: '',
      address: '',
    },
  ];

  const renderConsultation = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>Order date: {item.orderDate}</Text>
      <Text style={styles.cardText}>Patient: {item.patient || 'N/A'}</Text>
      <Text style={styles.cardText}>Address: {item.address || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medical consultation</Text>
        <Text style={styles.headerSubtitle}>completed</Text>
      </View>

      <FlatList
        data={consultations}
        renderItem={renderConsultation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('AppointmentsOrders')}
        >
          <Image
            source={require('../../assets/icons8-historial-de-pedidos-50.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Appointments/Orders</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 12,
    color: '#07DBEB',
    marginTop: 5,
  },
});
