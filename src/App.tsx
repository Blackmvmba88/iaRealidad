import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import ARCameraScreen from './screens/ARCameraScreen';

export type RootStackParamList = {
  Home: undefined;
  ARCamera: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2196F3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'AR Repair Assistant'}}
          />
          <Stack.Screen
            name="ARCamera"
            component={ARCameraScreen}
            options={{title: 'AR View'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
