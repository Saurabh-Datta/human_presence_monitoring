import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Rooms } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectRooms } from '../redux/rooms/roomsReducer';
import { useState } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  let userName = 'Saurabh';
  const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.welcome}>
            <Text style={styles.welcome_hello_text}>Hello {userName}</Text>
            <Text style={styles.welcome_text}>Welcome Back!</Text>
          </View>
          <StatusBar style="auto" />
          <View style={styles.rooms_heading}>
            <Text style={styles.rooms_heading_text}>Your Rooms</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("AddRoomScreen")}}>
              <Icon name='pluscircleo' type='antdesign' style={styles.rooms_heading_plus_icon}/>
            </TouchableOpacity>
          </View>  
          <View style={styles.rooms}>
            <Rooms />
          </View>
        </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        //alignItems: 'center',
        display: 'flex',
        marginTop: 25,
        backgroundColor: '#F9F9FA',
        height: '100%',
    },
    welcome: {
      width: '100%',
      alignItems: 'center',
      marginTop: 25,
    },
    welcome_hello_text: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 34,
    },
    welcome_text: {
      fontFamily: 'Roboto',
    },
    rooms: {
      marginTop: 1,
      alignItems: 'center',
    },
    rooms_heading: {
      marginTop: 100,
      display: 'flex',
      flexDirection: 'row',
    },
    rooms_heading_text: {
      fontFamily: 'Roboto',
      fontWeight: '700',
      fontSize: 20,
      marginLeft: 40,
    },
    rooms_heading_plus_icon: {
      marginLeft: 180,
    }
});