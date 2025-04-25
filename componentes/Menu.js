import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MenuLateral({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.titulo}>ECOLIFE</Text>
        <Text style={styles.subtitulo}>Tu app ecológica</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.boton}
        onPress={() => navigation.navigate('Inicio')}
      >
        <MaterialIcons name="home" size={20} color="#B3B3B3" />
        <Text style={styles.texto}>Inicio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.boton}
        onPress={() => navigation.navigate('Acciones')}
      >
        <MaterialIcons name="list-alt" size={20} color="#B3B3B3" />
        <Text style={styles.texto}>Acciones</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.boton}
        onPress={() => navigation.navigate('MisActividades')}
      >
        <MaterialIcons name="check-circle" size={20} color="#B3B3B3" />
        <Text style={styles.texto}>Mis Actividades</Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
    marginBottom: 20,
  },
  titulo: {
    color: '#1DB954',
    fontSize: 22,
    fontFamily: 'Roboto_500Medium',
    letterSpacing: 1,
  },
  subtitulo: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  texto: {
    color: '#FFFFFF',
    marginLeft: 15,
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  version: {
    color: '#535353',
    fontSize: 12,
  },
});