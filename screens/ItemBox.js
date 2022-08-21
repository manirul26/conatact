import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = (props) => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity activeOpacity={0.6}>
         <View style={styles.deleteBox}>
          <Animated.Text  style={
           styles.anima,
           {transform: [{scale: scale}]}}
           onPress={props.handleEdit} 
           >
            Edit
          </Animated.Text>
          <Animated.Text  
          style={styles.anima2,{transform: [{scale: scale}]}}
          onPress={props.handleDelete} 
          >
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.container}>
        <Text>{props.data.firstname} {props.data.lastname}</Text>
      </View>
    </Swipeable>
  );
};

export default ItemBox;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
    shadowOpacity: 0.88,
    shadowOffset: {
      width: 0,
      height: 20
    },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'red'
    
  },
  anima: {
    backgroundColor: 'silver'
  },
  anima2: {
   backgroundColor: 'red'
 },
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
});