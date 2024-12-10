import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useLanguage } from '../../Context';

export default function ProductsPharmacyScreen({ navigation }) {
  const { language } = useLanguage();

  const translations = {
    es: {
      pharmacy: 'Farmacia',
      description: 'Descripción',
      price: 'Precio',
      note: 'Si tienes preguntas sobre este medicamento, ¡háznoslo saber!',
      addToOrder: 'Añadir al pedido',
      appointmentsOrders: 'Citas/Pedidos',
      datebook: 'Agenda',
      product: {
        id: '1',
        name: 'Forxiga',
        description:
          'Es un medicamento utilizado para tratar la diabetes mellitus tipo 2 y la insuficiencia cardíaca crónica sintomática en adultos.',
        price: '$1,832.00',
        image: require('../../assets/foxiga.png'),
      },
    },
    en: {
      pharmacy: 'Pharmacy',
      description: 'Description',
      price: 'Price',
      note: 'If you have any questions about this medication, let us know!',
      addToOrder: 'Add to order',
      appointmentsOrders: 'Appointments/Orders',
      datebook: 'Datebook',
      product: {
        id: '1',
        name: 'Forxiga',
        description:
          'It is a medication used to treat type 2 diabetes mellitus and symptomatic chronic heart failure in adults.',
        price: '$1,832.00',
        image: require('../../assets/foxiga.png'),
      },
    },
  };

  const t = translations[language];
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToOrder = () => {
    const product = {
      id: t.product.id,
      name: t.product.name,
      price: t.product.price,
      quantity,
      image: t.product.image,
    };

    navigation.navigate('AppointmentsOrders', { product });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
      {/* Barra superior sin goBack */}
      <View style={styles.topBar}>
        <Text style={styles.title}>{t.pharmacy}</Text>
      </View>

      {/* Información del producto */}
      <View style={styles.productContainer}>
        <Image source={t.product.image} style={styles.productImage} />
        <Text style={styles.productTitle}>{t.product.name}</Text>
        <Text style={styles.productDescription}>
          {t.description}: {t.product.description}
        </Text>
        <Text style={styles.productPrice}>
          {t.price}: {t.product.price}
        </Text>
        <Text style={styles.productNote}>{t.note}</Text>
      </View>

      {/* Sección de cantidad y botón */}
      <View style={styles.actionContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            editable={false}
            textAlign="center"
          />
          <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToOrder}>
          <Text style={styles.addButtonText}>{t.addToOrder}</Text>
        </TouchableOpacity>
      </View>

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
          <Text style={styles.navText}>{t.appointmentsOrders}</Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productContainer: {
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#07DBEB',
    marginBottom: 10,
  },
  productNote: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#E6F7F7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#07DBEB',
    padding: 15,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center', // Centramos el contenido
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
