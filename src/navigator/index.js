import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Platform, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {SCREEN_NAME} from '../constants/screenName';
import NavigationServices from '../utils/navigationServices';

let webClientId =
  Platform.OS == 'android'
    ? '344123500469-i49grpauufg77d9d58h8uhsqrp93kb1d.apps.googleusercontent.com'
    : '93177892516-j69ufnokhj5sn2f4b418ukm5ug166722.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: webClientId,
});

import {COLORS} from '../constants/colors';
import {LINKING_URL} from '../constants/linkingURL';
import {getUserSelector} from '../redux/user/user.selectors';
import requestPermission from '../utils/permission';
import {
  notifeeListener,
  NotificationListener,
  requestUserPermission,
} from '../utils/pushNotification';
// import MainBottomTab from './mainBottomTab';

import PlaceContainer from '../screens/place/place.container';
import HomeView from '../screens/home/home.view';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  const user = useSelector(getUserSelector);
  useEffect(() => {
    requestUserPermission();
    requestPermission();
    NotificationListener();
    const unsubscribe = notifeeListener();

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      {/* <Stack.Screen
        name={SCREEN_NAME.BOTTOM_TAB_MAIN_SCREEN}
        component={MainBottomTab}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name={SCREEN_NAME.PLACE_SCREEN}
        component={PlaceContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_NAME.HOME_SCREEN}
        component={HomeView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppContainer = () => {
  const dispatch = useDispatch();

  const config = {
    screens: {
      HOME_SCREEN: 'HOME_SCREEN',
      // PURCHASED_SCREEN: {
      //   path: 'PURCHASED_SCREEN/:status',
      //   parse: {
      //     status: status => `${status}`,
      //   },
      // },
    },
  };
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.dark_bg : COLORS.light_bg,
  };
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // primary: string,
      background: COLORS.light_bg,
      // background: isDarkMode ? COLORS.dark_bg : COLORS.light_bg,
      // card: string,
      text: COLORS.light_basic_text,
      // text: isDarkMode ? COLORS.dark_basic_text : COLORS.light_basic_text,
      border: COLORS.border,
      // notification: string,
    },
  };
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={NavigationServices.navigationRef}
        linking={{
          prefixes: [LINKING_URL().ORIGIN],
          config,
        }}
        theme={MyTheme}>
        {/* <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        /> */}
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
