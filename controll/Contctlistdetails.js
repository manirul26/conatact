import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

/* import { getColorByLetter } from '../utils/index'; */

export default function Contctlistdetails({ contactInfo }) {
   
   const { displayName } = contactInfo;
  // const color = getColorByLetter(displayName[0]);
   return (
      <View>
       <Text>jjjj</Text>
        <Text>{displayName[0]}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   card: {
      padding: 10,
      margin: 5
   },
   infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5
   },
   primaryText: {
      fontSize: 18
   },
   iconContent: {
      flex: 1,
      paddingVertical: 5,
      fontSize: 24,
      color: 'white',
      marginHorizontal: 10
   },
   icon:{
      borderRadius: 25,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      padding: 1,
      backgroundColor: 'green'
   }
})