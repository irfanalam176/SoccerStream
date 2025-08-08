import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ViewerLayout from './src/screens/viewers/layout/ViewerLayout';
import BlankPage from './src/screens/BlankPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BroadCaster from './src/screens/Broadcaster/BroadCaster';
import AdminLogin from './src/screens/admin/AdminLogin';
import BroadCasterLogin from './src/screens/Broadcaster/BroadCasterLogin';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';
import BroadcasterStack from './src/screens/Broadcaster/BroadcasterStack';
import AdminStack from './src/screens/admin/layout/AdminStack';
const App = () => {
  const requestGalleryPermission = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, // or READ_EXTERNAL_STORAGE for older devices
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    });

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      console.log('Permission granted');
    } else {
      console.log('Permission denied');
    }
  };

  useEffect(() => {
    SplashScreen.hide()
    requestGalleryPermission();
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="role">
          <Stack.Screen name="role" component={BlankPage} />
          <Stack.Screen name="adminLogin" component={AdminLogin} />
          <Stack.Screen name="broadcasterLogin" component={BroadCasterLogin} />
          <Stack.Screen name="viewerLayout" component={ViewerLayout} />
          <Stack.Screen name="broadCaster" component={BroadCaster} />
          <Stack.Screen name="adminStack" component={AdminStack} />
          <Stack.Screen name="broadcasterStack" component={BroadcasterStack} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
