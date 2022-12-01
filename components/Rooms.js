import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import db, { getRooms } from '../firebaseConfig';
import { useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { setItem } from '../redux/rooms/roomsReducer';
import { useDispatch } from 'react-redux';

const compare = (a,b) => {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

const Rooms = () => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();
  useEffect(()=> {
    const q = query(collection(db,'rooms'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const rooms = querySnapshot.docs.map(docSnapshot => ({
        id: docSnapshot.id,
        name: docSnapshot.data().name,
        humanPresence: docSnapshot.data().humanPresence,
        devices: docSnapshot.data().devices,
        automation: docSnapshot.data().automation,
      }))
      const sorted = [...rooms].sort(compare);
      setRooms(sorted);
      dispatch(setItem(sorted));
    });
    getRooms().then(rooms => setRooms([...rooms].sort(compare)));
  },[setRooms])
  return (
    <FlatList 
      data={rooms}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          {item.humanPresence?<TouchableOpacity 
        onPress={() => navigation.navigate("RoomScreen", {roomID: item.id})}
        style={styles.container_present}>
          <View style={styles.container_view}>
            <Text style={styles.container_view_heading}>
              {item.name}
            </Text>
            {item.humanPresence? <Text style={styles.container_view_text}>Activity Detected</Text>:<Text style={styles.container_view_text}>No activity Detected</Text>}
            {item.devices? <Image source={require('../assets/bulb.png')} style={styles.container_view_bulb_icon} />:<Image source={require('../assets/bulb_off.png')} style={styles.container_view_bulb_icon}/>}
          </View>
        </TouchableOpacity>:<TouchableOpacity 
        onPress={() => navigation.navigate("RoomScreen", {roomID: item.id})}
        style={styles.container_absent}>
          <View style={styles.container_view}>
            <Text style={styles.container_view_heading}>
              {item.name}
            </Text>
            {item.humanPresence? <Text style={styles.container_view_text}>Activity Detected</Text>:<Text style={styles.container_view_text}>No activity Detected</Text>}
            {item.devices? <Image source={require('../assets/bulb.png')} style={styles.container_view_bulb_icon} />:<Image source={require('../assets/bulb_off.png')} style={styles.container_view_bulb_icon}/>}
          </View>
        </TouchableOpacity>}
        
        </View>
        
      )}
    />
  );
};

export default Rooms;

const styles = StyleSheet.create({
    container_present: {
        padding: 2,
        paddingBottom: 8,
        paddingTop: 4, 
        backgroundColor: '#AAE5AD',
        borderRadius: 5,
        margin: 20,
        width: 140,
        height: 200,
    },
    container_absent: {
      padding: 2,
      paddingBottom: 8,
      paddingTop: 4, 
      backgroundColor: '#92C7DC',
      borderRadius: 5,
      margin: 20,
      width: 140,
      height: 200,
    },
    container_view: {
        alignItems: 'center',
    },
    container_view_heading: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: '700',
        alignItems: 'center',
    },
    container_view_text: {
      marginTop: 2,
    },
    container_view_bulb_icon: {
      height: 150,
      width: 100,
    },
});