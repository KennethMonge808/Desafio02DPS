import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
export default function TarjetaAccion({ titulo, descripcion, imagen }) {
  return (
    <TouchableOpacity style={styles.tarjeta}>
      <Image source={imagen} style={styles.imagen} />
      <View style={styles.contenido}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <View style={styles.lineaDivisoria} />
        <Text style={styles.verMas}>VER DETALLES →</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#181818',
    borderRadius: 6,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imagen: {
    width: '100%',
    height: 120,
  },
  contenido: {
    padding: 15,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    marginBottom: 5,
  },
  descripcion: {
    color: '#B3B3B3',
    fontSize: 14,
    fontFamily: 'Roboto_400Regular',
    marginBottom: 15,
  },
  lineaDivisoria: {
    height: 1,
    backgroundColor: '#282828',
    marginVertical: 10,
  },
  verMas: {
    color: '#1DB954',
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
    letterSpacing: 0.5,
  },
});