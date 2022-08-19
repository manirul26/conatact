import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useState, 
  useEffect, useRef, Button, Image, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Contactlist from './screens/Contactlist'
import Contact from './screens/Contact'


const Stack = createStackNavigator();

function LogoTitle() {
  return (
     <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    /> 


  );
}
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Contactlist" >
      <Stack.Screen name="Contactlist" component={Contactlist}
       /*    options={({ route }) => ({
            headerShown: true

          })} */
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#00cc00"
              />
            ),
          }}
        />
        <Stack.Screen name="Contact" component={Contact}
          options={({ route }) => ({
            headerShown: true

          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default App;
