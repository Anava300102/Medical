import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useLanguage } from '../../Context';

export default function OrdersScreen({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      ordersTitle: 'Citas/Pedidos',
      total: 'Total',
      confirmOrder: 'Confirmar Pedido',
      services: 'Servicios',
      appointmentsOrders: 'Citas/Pedidos',
      datebook: 'Agenda',
      orders: [
        {
          id: '1',
          name: 'Forxiga',
          price: 1832,
          quantity: 1,
          image: require('../../assets/foxiga.png'),
        },
      ],
    },
    en: {
      ordersTitle: 'Appointments/Orders',
      total: 'Total',
      confirmOrder: 'Confirm Order',
      services: 'Services',
      appointmentsOrders: 'Appointments/Orders',
      datebook: 'Datebook',
      orders: [
        {
          id: '1',
          name: 'Forxiga',
          price: 1832,
          quantity: 1,
          image: require('../../assets/foxiga.png'),
        },
      ],
    },
  };

  const t = translations[language];
  const [orders, setOrders] = useState(t.orders);

  const incrementQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, quantity: order.quantity + 1 } : order
      )
    );
  };

  const decrementQuantity = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id && order.quantity > 1
          ? { ...order, quantity: order.quantity - 1 }
          : order
      )
    );
  };

  const deleteOrder = (id) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => total + order.price * order.quantity, 0);
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decrementQuantity(item.id)}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => incrementQuantity(item.id)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>${item.price * item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteOrder(item.id)}>
        <Image
          source={require('../../assets/icons8-eliminar-30.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra superior con el botón de perfil */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.ordersTitle}</Text>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
          <Image
            source={require('../../assets/icons8-nombre-50.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Lista de pedidos */}
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Total y Confirmar Pedido */}
      <View style={styles.bottomContainer}>
        <Text style={styles.totalText}>
          {t.total} ${calculateTotal()}
        </Text>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>{t.confirmOrder}</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('OrdersScreen')}
        >
          <Image
            source={require('../../assets/icons8-historial-de-pedidos-50.png')}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>{t.appointmentsOrders}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileButton: {
    padding: 5,
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  listContainer: {
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#07DBEB',
  },
  deleteIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#07DBEB',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
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
});
