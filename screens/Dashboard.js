import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, 
FlatList, Text, ActivityIndicator, Alert} from 'react-native';
import ItemBox from './ItemBox';
import axios from "axios";
import * as base from "./api";

const Dashboard = (props) => {
  const [lists, setLists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      props.navigation.addListener('focus', () =>{
        getUsers();
      }) 
  }, []);

  const getUsers = () => {
    setIsLoading(true);
    axios.get(base.BASE_URL + `/getcontact?page=${currentPage}`)
      .then(res => {
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
   console.log('delete.....' + index)
   //delete_contact
   const arr = [...lists];
   arr.splice(index, 1);
   setLists(arr);


   axios.post(base.BASE_URL +'/delete_contact', 
   { id:index })
   .then(response => {
     console.log('delete' + response.message)
   
   })
   .catch((error) => console.log(error));
   
  };

const editItem =(index) => {
  console.log('edit.....' + index)
  props.navigation.navigate('Editcontact', {
    id: index
 })
}


  return (
    <SafeAreaView style={styles.container}>
    <FlatList
        data={lists}
        renderItem={({item, index}) => {
          return <ItemBox data={item} 
          handleDelete={() => deleteItem(item.id)} 
          handleEdit={() => editItem(item.id)} 
          
          />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.seperatorLine}></View>;
        }} 
       /*  ListFooterComponent={renderLoader} */
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