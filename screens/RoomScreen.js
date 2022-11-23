import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Switch } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useSelector } from 'react-redux';
import { selectRooms } from '../redux/rooms/roomsReducer';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteRoom, toggleDevices } from '../firebaseConfig';
import { useState } from 'react';

const RoomScreen = (props) => {
  const rooms = useSelector(selectRooms);
  const room = rooms.filter(item=> {return item.id===props.route.params.roomID})[0];
  const navigation = useNavigation();
  const [devices, setDevices] = useState(room.devices);
  // const [automation, setAutomation] = useState(room.automation);
  const toggleDevicesState = () => {
    setDevices(devices => !devices);
    toggleDevices({roomID: room.id, devicesState: room.devices})
  }
  // const toggleAutomationState = () => {
  //   setDevices(automation => !automation);
  // }
  console.log(room);
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.dashboard}>
            <Text style={styles.dashboard_text}>Room {room.name}</Text>
          </View>
          <View style={styles.information}>
            <Text>Room ID: {room.id}</Text>
            <Text>Room Name: {room.name}</Text>
            {room.humanPresence ? <Text>Human Presence: Detected</Text>:<Text>Human Presence: Not Detected</Text>}
          </View>
          <TouchableOpacity onPress={()=>{
            deleteRoom(room.id);
            navigation.goBack();
          }}>
            <Text>Delete</Text>
          </TouchableOpacity>
          <View style={styles.toggle_devices}>
            <View>
              <Text style={styles.toggle_devices_text}>Devices</Text>
            </View>
            <Switch 
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={devices ? "#0004AF" : "#f4f3f4"}
              onValueChange={()=>toggleDevicesState()}
              value={devices}
              style={styles.toggle_devices_switch}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  dashboard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    width: '100%',
    height: 40,
    alignItems: 'center',
  },
  dashboard_text: {
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
    
  }
});