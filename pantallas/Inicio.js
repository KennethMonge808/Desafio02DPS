import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Inicio({ navigation }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Ecolife!</Text>
      <Text style={styles.subtitulo}>La ecologia es vida.</Text>
      
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Acciones')}
      >
        <Image 
          source={require('../assets/imagenes/eco1.jpg')} 
          style={styles.imagen}
        />
        <View style={styles.overlay} />
        <Text style={styles.textoCard}>EXPLORAR ACCIONES</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('MisActividades')}
      >
        <Image 
          source={require('../assets/imagenes/eco2.jpg')} 
          style={styles.imagen}
        />
        <View style={styles.overlay} />
        <Text style={styles.textoCard}>MIS REGISTROS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 32,
    fontFamily: 'Roboto_500Medium',
    textAlign: 'center',
    marginVertical: 10,
    color: '#1DB954',
    letterSpacing: 2,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#B3B3B3',
    fontFamily: 'Roboto_400Regular',
  },
  card: {
    width: '100%',
    height: 160,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textoCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});