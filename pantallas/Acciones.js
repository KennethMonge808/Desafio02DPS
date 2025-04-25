import { ScrollView, View, StyleSheet } from 'react-native';
import TarjetaAccion from '../componentes/Card';

const acciones = [
  {
    id: 1,
    titulo: 'Plantar Árboles',
    descripcion: 'Crea pulmones verdes en tu comunidad',
    imagen: require('../assets/imagenes/acciones/plantar.jpg')
  },
  {
    id: 2,
    titulo: 'Reciclar',
    descripcion: 'Separa tus residuos correctamente',
    imagen: require('../assets/imagenes/acciones/reciclar.jpg')
  },
  {
    id: 3,
    titulo: 'Transporte Sostenible',
    descripcion: 'Usa bicicleta o transporte público',
    imagen: require('../assets/imagenes/acciones/bici.jpg')
  },
  {
    id: 4,
    titulo: 'Energía Renovable',
    descripcion: 'Considera paneles solares en tu hogar',
    imagen: require('../assets/imagenes/acciones/solar.jpg')
  }
];

export default function Acciones() {
  return (
    <ScrollView 
      contentContainerStyle={styles.contenedor}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.lista}>
        {acciones.map((accion) => (
          <TarjetaAccion 
            key={accion.id}
            titulo={accion.titulo}
            descripcion={accion.descripcion}
            imagen={accion.imagen}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 15,
    backgroundColor: '#121212',
  },
  lista: {
    paddingBottom: 20,
  },
});