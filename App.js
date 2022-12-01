import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AddRoomScreen, HomeScreen, RoomScreen } from './screens';
import { Provider } from "react-redux";
import { store } from "./app/store";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>        
          <Stack.Navigator>
            <Stack.Screen 
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false,
                }}
            />
            <Stack.Screen 
                name='RoomScreen'
                component={RoomScreen}
                options={{
                  headerShown: false,
                }}
            />
            <Stack.Screen 
                name='AddRoomScreen'
                component={AddRoomScreen}
                options={{
                  headerShown: false,
                }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
