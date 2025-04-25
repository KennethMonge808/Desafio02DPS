import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AgregarActividad({ navigation }) {
  const [form, setForm] = useState({
    nombre: '',
    fecha: '',
    lugar: '',
    tipo: 'individual',
    fumadores: 'sin_fumadores'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setForm({
        ...form,
        fecha: date.toLocaleDateString('es-ES')
      });
    }
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return false;
    }
    if (!form.fecha) {
      Alert.alert('Error', 'La fecha es obligatoria');
      return false;
    }
    if (!form.lugar.trim()) {
      Alert.alert('Error', 'El lugar es obligatorio');
      return false;
    }
    return true;
  };

  const guardarActividad = async () => {
    if (!validarFormulario()) return;

    try {
      const nuevaActividad = {
        id: Date.now(),
        nombre: form.nombre.trim(),
        lugar: form.lugar.trim(),
        fecha: form.fecha,
        tipo: form.tipo,
        fumadores: form.fumadores,
        timestamp: selectedDate.getTime()
      };

      const actividadesGuardadas = await AsyncStorage.getItem('eco-actividades');
      const actividades = actividadesGuardadas ? JSON.parse(actividadesGuardadas) : [];
      
      await AsyncStorage.setItem(
        'eco-actividades',
        JSON.stringify([nuevaActividad, ...actividades])
      );

      Alert.alert('Éxito', 'Actividad guardada correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la actividad');
      console.error(error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>NUEVA ACTIVIDAD ECOLÓGICA</Text>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="eco" size={20} color="#1DB954" />
        <TextInput
          style={styles.input}
          placeholder="Nombre de la actividad"
          placeholderTextColor="#535353"
          value={form.nombre}
          onChangeText={(text) => setForm({...form, nombre: text})}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="date-range" size={20} color="#1DB954" />
        <TouchableOpacity 
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={form.fecha ? styles.dateText : styles.placeholderText}>
            {form.fecha || 'Selecciona una fecha (DD/MM/AAAA)'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="place" size={20} color="#1DB954" />
        <TextInput
          style={styles.input}
          placeholder="Lugar o ubicación"
          placeholderTextColor="#535353"
          value={form.lugar}
          onChangeText={(text) => setForm({...form, lugar: text})}
        />
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Tipo de actividad:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              form.tipo === 'individual' && styles.radioButtonSelected
            ]}
            onPress={() => setForm({...form, tipo: 'individual'})}
          >
            <Text style={[
              styles.radioText,
              form.tipo === 'individual' && styles.radioTextSelected
            ]}>
              Individual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              form.tipo === 'grupal' && styles.radioButtonSelected
            ]}
            onPress={() => setForm({...form, tipo: 'grupal'})}
          >
            <Text style={[
              styles.radioText,
              form.tipo === 'grupal' && styles.radioTextSelected
            ]}>
              Grupal
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {}
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Espacio:</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              form.fumadores === 'sin_fumadores' && styles.radioButtonSelected
            ]}
            onPress={() => setForm({...form, fumadores: 'sin_fumadores'})}
          >
            <MaterialIcons 
              name="smoke-free" 
              size={18} 
              color={form.fumadores === 'sin_fumadores' ? '#1DB954' : '#B3B3B3'} 
              style={styles.radioIcon}
            />
            <Text style={[
              styles.radioText,
              form.fumadores === 'sin_fumadores' && styles.radioTextSelected
            ]}>
              Sin fumadores
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              form.fumadores === 'con_fumadores' && styles.radioButtonSelected
            ]}
            onPress={() => setForm({...form, fumadores: 'con_fumadores'})}
          >
            <MaterialIcons 
              name="smoking-rooms" 
              size={18} 
              color={form.fumadores === 'con_fumadores' ? '#1DB954' : '#B3B3B3'} 
              style={styles.radioIcon}
            />
            <Text style={[
              styles.radioText,
              form.fumadores === 'con_fumadores' && styles.radioTextSelected
            ]}>
              Con fumadores
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.botonGuardar}
        onPress={guardarActividad}
      >
        <Text style={styles.textoGuardar}>GUARDAR ACTIVIDAD</Text>
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
    color: '#1DB954',
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
    marginBottom: 30,
    letterSpacing: 1,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#282828',
    marginBottom: 25,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 8,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
  },
  dateText: {
    color: 'white',
    fontSize: 16,
  },
  placeholderText: {
    color: '#535353',
    fontSize: 16,
  },
  radioContainer: {
    marginBottom: 25,
  },
  radioLabel: {
    color: '#B3B3B3',
    marginBottom: 10,
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#535353',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  radioButtonSelected: {
    borderColor: '#1DB954',
    backgroundColor: '#1DB95420',
  },
  radioIcon: {
    marginRight: 8,
  },
  radioText: {
    color: '#B3B3B3',
  },
  radioTextSelected: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  botonGuardar: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textoGuardar: {
    color: 'white',
    fontFamily: 'Roboto_500Medium',
    letterSpacing: 1,
    fontSize: 16,
  },
});