import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import ItemActividad from '../componentes/Item';

export default function Actividades({ navigation }) {
  const [actividades, setActividades] = useState([]);

  // Cargar actividades al iniciar y cuando se enfoca la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarActividades);
    cargarActividades();
    return unsubscribe;
  }, [navigation]);

  const cargarActividades = async () => {
    try {
      const actividadesGuardadas = await AsyncStorage.getItem('eco-actividades');
      setActividades(actividadesGuardadas ? JSON.parse(actividadesGuardadas) : []);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarActividad = async (id) => {
    try {
      const nuevasActividades = actividades.filter(act => act.id !== id);
      await AsyncStorage.setItem('eco-actividades', JSON.stringify(nuevasActividades));
      setActividades(nuevasActividades);
    } catch (error) {
      console.error("Error eliminando actividad:", error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity 
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('AgregarActividad')}
      >
        <MaterialIcons name="add" size={24} color="white" />
        <Text style={styles.textoBoton}>NUEVA ACTIVIDAD</Text>
      </TouchableOpacity>

      <FlatList
        data={actividades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemActividad 
            actividad={item} 
            onEliminar={eliminarActividad} 
          />
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <MaterialIcons name="playlist-add" size={50} color="#535353" />
            <Text style={styles.textoVacio}>No hay actividades aún</Text>
          </View>
        }
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#121212',
  },
  botonAgregar: {
    flexDirection: 'row',
    backgroundColor: '#1DB954',
    padding: 15,
    margin: 15,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBoton: {
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Roboto_500Medium',
    letterSpacing: 0.5,
  },
  lista: {
    paddingHorizontal: 15,
  },
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  textoVacio: {
    color: '#535353',
    marginTop: 15,
    fontSize: 16,
  },
});