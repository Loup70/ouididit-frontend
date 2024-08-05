import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen"
import CreateActivityScreen from "./screens/CreateActivityScreen";
import CalendarScreen from "./screens/CalendarScreen";
import DiscussionsScreen from "./screens/DiscussionsScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SignInScreen from "./screens/SignInScreen"

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Root = () => {
  return(
      <Drawer.Navigator style={styles.icon} screenOptions={{drawerPosition: 'right'}} initialRouteName="Accueil">
        <Drawer.Screen name="Accueil" component={HomeScreen} />
        <Drawer.Screen name="Créer une activité" component={CreateActivityScreen} />
        <Drawer.Screen name="Calendrier" component={CalendarScreen} />
        <Drawer.Screen name="Discussions" component={DiscussionsScreen} />
        <Drawer.Screen name="Profil" component={ProfilScreen} />
      </Drawer.Navigator>
    
  )
}

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Root" component={Root} />
       <Stack.Screen name="CreateActivityScreen" component={CreateActivityScreen}/>
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon : {
    justifyContent: "flex-end"
  }
})
