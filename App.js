import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, 
  useEffect, useRef, Button, Image, 
  TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons'; 

import Contactlist from './screens/Contactlist'
import Contact from './screens/Contact'
import Dashboard from './screens/Dashboard'
import Testgrid from './screens/Testgrid'
const Stack = createStackNavigator();

function LogoTitle() {
  return (
     <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    /> 


  );
}
const App = (props) => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" >
   
      <Stack.Screen name="Dashboard" component={Dashboard}
         options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => 
                navigation.navigate("Contact")} >
                  <MaterialIcons name="add" size={24} color="black" 
                  style={{ padding: 5 }}
                  />  
                </TouchableOpacity>
              ),
            })}
        />
   
    {/*   <Stack.Screen name="Contactlist" component={Contactlist}
          options={({ route }) => ({
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <MaterialIcons name="add" size={24} color="black" 
              style={{ padding: 5 }}
              onPress={() => {
                props.navigation.navigate('Contact');
              }}
              />
            ),
          
          })}
          
        /> */}

<Stack.Screen name="Contactlist" component={Contactlist}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => 
                navigation.navigate("Contact")} >
                  <MaterialIcons name="add" size={24} color="black" 
                  style={{ padding: 5 }}
                  />  
                </TouchableOpacity>
              ),
            })}
          />

        <Stack.Screen name="Contact" component={Contact}
          options={({ route }) => ({
            headerShown: true

          })}
        />
                <Stack.Screen name="Testgrid" component={Testgrid}
          options={({ route }) => ({
            headerShown: true

          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
