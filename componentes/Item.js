import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ItemActividad({ actividad, onEliminar }) {
  const confirmarEliminacion = () => {
    Alert.alert(
      "Eliminar Actividad",
      "¿Estás seguro de que quieres eliminar esta actividad?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Eliminar", 
          onPress: () => onEliminar(actividad.id),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.icono}>
        <MaterialIcons name="eco" size={20} color="#1DB954" />
      </View>
      
      <View style={styles.contenido}>
        <Text style={styles.titulo}>{actividad.nombre}</Text>
        <View style={styles.detalles}>
          <Text style={styles.detalle}>
            <MaterialIcons name="date-range" size={14} color="#B3B3B3" /> {actividad.fecha}
          </Text>
          <Text style={styles.detalle}>
            <MaterialIcons name="place" size={14} color="#B3B3B3" /> {actividad.lugar}
          </Text>
        </View>
      </View>
      <Text style={styles.detalle}>
  <MaterialIcons 
    name={actividad.fumadores === 'sin_fumadores' ? 'smoke-free' : 'smoking-rooms'} 
    size={14} 
    color="#B3B3B3" 
  /> 
  {actividad.fumadores === 'sin_fumadores' ? ' Sin fumadores' : ' Con fumadores'}
</Text>
      
      <TouchableOpacity onPress={confirmarEliminacion}>
        <MaterialIcons name="delete" size={20} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#181818',
    borderRadius: 6,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icono: {
    backgroundColor: '#282828',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contenido: {
    flex: 1,
  },
  titulo: {
    color: 'white',
    fontFamily: 'Roboto_500Medium',
    fontSize: 15,
    marginBottom: 5,
  },
  detalles: {
    flexDirection: 'row',
  },
  detalle: {
    color: '#B3B3B3',
    fontSize: 12,
    marginRight: 15,
    fontFamily: 'Roboto_400Regular',
  },
});