import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image } from 'react-native';

export default function RepartidorScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState('Evaluating');

  const orders = [
    {
      id: '1',
      title: 'Request #1',
      orderDate: '10/10/2024',
      patient: '',
      address: '',
    },
    {
      id: '2',
      title: 'Request #2',
      orderDate: '10/10/2024',
      patient: '',
      address: '',
    },
  ];

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardText}>Order date: {item.orderDate}</Text>
      <Text style={styles.cardText}>Patient: {item.patient || 'N/A'}</Text>
      <Text style={styles.cardText}>Address: {item.address || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image source={require('../../assets/icons8-menú-50.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/icons8-búsqueda.gif')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Navegación por pestañas */}
      <View style={styles.tabContainer}>
        {['Evaluating', 'Delivered', 'On the way'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de pedidos */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Services')}
        >
          <Image source={require('../../assets/icons8-servicios-50.png')} style={styles.bottomIcon} />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../../assets/icons8-historial-de-pedidos-50.png')} style={styles.bottomIcon} />
          <Text style={styles.navText}>Appointments/Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile')} // Redirige a la pantalla ProfileScreen
        >
          <Image source={require('../../assets/icons8-nombre-50.png')} style={styles.bottomIcon} />
          <Text style={styles.navText}>Profile</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#07DBEB',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#07DBEB',
    fontWeight: 'bold',
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
  navText: {
    fontSize: 12,
    color: '#07DBEB',
    marginTop: 5,
  },
  bottomIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
