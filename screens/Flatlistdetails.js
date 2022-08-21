import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native';
import { getColorByLetter } from '../colors/index';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons'; 
/* https://www.youtube.com/watch?v=VKgAwI7dS3s */

export default function Flatlistdetails({ contactInfo }) {
   const color = getColorByLetter(contactInfo.name[0]);
   const id = contactInfo.id;

   const deleteitem = (id) =>{
     // alert('delete' + id);
     console.log(id)
   }

   const Renderright =(progress, dragX) => {
      const scale = dragX.interpolate({
         inputRange: [-30, 0.5],
         outputRange: [1, 0.1]
      })
      const Style = {
         transform: [
            {
               scale
            }
         ]
      }
      return(
        <View style={{ backgroundColor: '#E9E9E9', 
      flexDirection: 'row',
        alignContent: 'space-between', padding: 20 }}>
         {/*  <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
         <MaterialIcons name="edit" size={24} color="black" style={{ padding: 5 }}
         onPress={deleteitem(id)} />
         <MaterialIcons name="delete" size={24} color="black" style={{ padding: 5 }}  />
        </View>
      )
   }

   return (
    <Swipeable overshootRight={false} renderRightActions={Renderright}>
      <View style={styles.card}>
         <View style={styles.infoContainer}>
            <View style={{...styles.icon, backgroundColor: color}}>
               <Text style={styles.iconContent}>{contactInfo.name[0]}</Text>
            </View>
            <Text style={styles.primaryText}>{contactInfo.name}</Text>
         </View> 
      </View>
      </Swipeable>
   )
}

const styles = StyleSheet.create({
   card: {
      padding: 10,
      margin: 5,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1
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
