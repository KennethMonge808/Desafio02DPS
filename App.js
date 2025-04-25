import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { StatusBar } from 'expo-status-bar';

// Pantallas
import Inicio from './pantallas/Inicio';
import Acciones from './pantallas/Acciones';
import Actividades from './pantallas/Actividades';
import AgregarActividad from './pantallas/AgregarActividad';
import MenuLateral from './componentes/Menu';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1DB954', // Verde tipo SoundCloud
    background: '#121212',
    card: '#181818',
    text: '#FFFFFF',
    border: '#282828',
  },
};

function ActividadesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaActividades" component={Actividades} />
      <Stack.Screen name="AgregarActividad" component={AgregarActividad} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer theme={customDarkTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <MenuLateral {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#000000',
              width: 240,
            },
            drawerActiveTintColor: '#1DB954',
            drawerInactiveTintColor: '#B3B3B3',
          }}
        >
          <Drawer.Screen name="Inicio" component={Inicio} />
          <Drawer.Screen name="Acciones" component={Acciones} />
          <Drawer.Screen 
            name="MisActividades" 
            component={ActividadesStack}
            options={{ title: 'Mis Actividades' }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}