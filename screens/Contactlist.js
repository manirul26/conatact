import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import * as Contacts from 'expo-contacts';

import Flatlistdetails from './Flatlistdetails'

export default class Contactlist extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadContacts = async () => {
    
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    console.log(data[0]);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  renderItem = ({ item }) => (
    
    <View style={{ minHeight: 20, padding: 5 }}>
<Flatlistdetails contactInfo={item} />

    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {

      let contactLowercase = (
        contact.name
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
       {/*  <SafeAreaView style={{ backgroundColor: '#fffff' }} /> */}
        <TextInput
          placeholder="Search"
          placeholderTextColor="#000"
          style={styles.textbox}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1,  backgroundColor: '#ffffff'  }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20
                }}
              >
                <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textbox:{
    height: 40,
    fontSize: 12,
    padding: 10,
    color: '#000',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d90a0'
  },
  iconContent: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 24,
    color: 'white',
    marginHorizontal: 10
 }
});