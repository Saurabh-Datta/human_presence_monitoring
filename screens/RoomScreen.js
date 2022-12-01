import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Switch } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useSelector } from 'react-redux';
import { selectRooms } from '../redux/rooms/roomsReducer';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteRoom, toggleDevices } from '../firebaseConfig';
import { useState } from 'react';
import { Icon, Input } from '@rneui/themed';

const RoomScreen = (props) => {
  const [inputText, setInputText] = useState("");
  const rooms = useSelector(selectRooms);
  const room = rooms.filter(item=> {return item.id===props.route.params.roomID})[0];
  const navigation = useNavigation();
  const toggleDevicesState = () => {
    toggleDevices({roomID: room.id, devicesState: room.devices})
  }
  console.log(room);
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.dashboard}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
              <Icon name='left' type='antdesign' />
            </TouchableOpacity>
            <Text style={styles.dashboard_text}>{room.name}</Text>
          </View>
          <View style={styles.information}>
            <Text>Room ID: {room.id}</Text>
            <Text>Room Name: {room.name}</Text>
            {room.humanPresence ? <Text>Human Presence: Detected</Text>:<Text>Human Presence: Not Detected</Text>}
          </View>
          <View style={styles.toggle_devices}>
            <View>
              <Text style={styles.toggle_devices_text}>Devices</Text>
            </View>
            <Switch 
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={room.devices ? "#0004AF" : "#f4f3f4"}
              onValueChange={()=>toggleDevicesState()}
              value={room.devices}
              style={styles.toggle_devices_switch}
            />
          </View>
          <View style={styles.room_name_input}>
            <Input placeholder='Room name' defaultValue='' value={inputText} onChangeText={(text) => setInputText(text)}></Input>
          </View>
          {inputText!==room.name && <Text style={styles.room_name_tip}>Enter room name to enable delete button.</Text>}
          <TouchableOpacity style={inputText!==room.name?styles.delete_button_disabled:styles.delete_button} disabled={inputText!==room.name} onPress={()=>{
            deleteRoom(room.id);
            navigation.goBack();
          }}>
            <Text style={styles.delete_button_text}>Delete Room</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  dashboard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    width: '100%',
    height: 40,
    marginLeft: 2,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 2,
  },
  dashboard_text: {
    marginLeft: 142,
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '600',
    marginTop: 4,
  },
  information: {
    backgroundColor: '#FFFFFF',
    width: 350,
    borderRadius: 5,
    marginTop: 25,
    alignItems: 'center',
  },
  toggle_devices: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  toggle_devices_text: {
    marginRight: 5,
    fontSize: 20,
  },
  toggle_devices_switch: {
    height: 32,
  },
  delete_button: {
    backgroundColor: '#F44336',
    borderRadius: 5,
    height: 35,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  delete_button_text: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 18,
  },
  room_name_input: {
    width: 200,
    marginTop: 15,
    alignItems: 'center',
  },
  delete_button_disabled: {
    backgroundColor: '#E7E7E7',
    borderRadius: 5,
    height: 35,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  room_name_tip: {
    color: '#2737EE',
  }
});