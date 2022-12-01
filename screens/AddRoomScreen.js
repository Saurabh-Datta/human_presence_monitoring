import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Icon, Input } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { addRoom } from '../firebaseConfig';

const AddRoomScreen = () => {
  const [roomName, setRoomName] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.container_navigation}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
          <Icon name='left' type='antdesign' />
        </TouchableOpacity>
        <Text style={styles.container_navigation_text}>Add Room</Text>
      </View>
      <View style={styles.container_form}>
        <Input placeholder='Room Name' defaultValue={roomName} onChangeText={text=>setRoomName(text)}></Input>
        {roomName===""?<Text style={styles.container_form_error}>This field is required.*</Text>:null}
        <TouchableOpacity style={styles.container_form_add_button} onPress={() => {
          if(roomName!="") {
            addRoom(roomName);
            navigation.goBack();
          }
        }}>
          <Text style={styles.container_form_add_button_text}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default AddRoomScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  container_navigation: {
    marginLeft: 2,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 2,
  },
  container_navigation_text: {
    marginLeft: 123,
    fontWeight: '700',
    fontSize: 20,
  },
  container_form: {
    marginTop: 100,
    alignItems: 'center',
  },
  container_form_add_button: {
    width: 150,
    backgroundColor: '#2089DC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 3,
    marginTop: 10,
  },
  container_form_add_button_text: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  container_form_error: {
    color: '#FF0F22',
  },
});