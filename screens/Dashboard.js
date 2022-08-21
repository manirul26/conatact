import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, 
FlatList, Text, ActivityIndicator} from 'react-native';
import ItemBox from './ItemBox';
import axios from "axios";
import * as base from "./api";
/* const data = [
  {id: '1', name: 'A'},
  {id: '2', name: 'B'},
  {id: '3', name: 'C'},
  {id: '4', name: 'D'},
  {id: '5', name: 'E'},
  {id: '6', name: 'F'},
  {id: '7', name: 'G'},
  {id: '8', name: 'H'},
  {id: '9', name: 'I'},
  {id: '10', name: 'J'},
  {id: '11', name: 'K'},
  {id: '12', name: 'L'},
  {id: '13', name: 'M'},
  {id: '14', name: 'N'},
  {id: '15', name: 'O'},
  {id: '16', name: 'P'},
  {id: '17', name: 'Q'},
  {id: '18', name: 'R'},
  {id: '19', name: 'S'},
  {id: '20', name: 'T'},
  {id: '21', name: 'U'},
  {id: '22', name: 'V'},
  {id: '23', name: 'W'},
  {id: '24', name: 'X'},
  {id: '25', name: 'Y'},
  {id: '26', name: 'Z'},
]; */

const Dashboard = () => {
  //const [lists, setLists] = useState(data);
const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


    const getUsers = () => {
    setIsLoading(true);
    axios.get(base.BASE_URL + `/getcontact?page=${currentPage}`)
      .then(res => {
       // setLists(res.data.data);
       // console.log(res.data.data[0])
        console.log(res.data.data.id)
         console.log(res.data.data)
       // setLists([...lists, ...res.data.results]);
       setLists([...lists, ...res.data.data]);
        setIsLoading(false);
      });
  };
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  const renderLoader = () => {
    return (
      isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemWrapperStyle}>
       {/*  <Image style={styles.itemImageStyle} source={{ uri: item.picture.large }} /> */}
        <View style={styles.contentWrapperStyle}>
          <Text style={styles.txtNameStyle}> {`${item.firstname} ${item.lastname} `}</Text>
          <Text style={styles.txtEmailStyle}>{item.phone}</Text>
        </View>
      </View>
    );
  };




  const deleteItem = (index) => {
    const arr = [...lists];
    arr.splice(index, 1);
    setLists(arr);
  };
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
        data={lists}
        renderItem={({item, index}) => {
          return <ItemBox data={item} 
          handleDelete={() => deleteItem(index)} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperatorLine}></View>;
        }} 
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      /> 
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
   itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemImageStyle: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  contentWrapperStyle: {
    justifyContent: "space-around",
  },
  txtNameStyle: {
    fontSize: 16,
  },
  txtEmailStyle: {
    color: "#777",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});