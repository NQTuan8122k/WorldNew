import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import Loading from './components/Loading';
import AppContainer from './navigator';
import {persistor, store} from './redux/configureStore';

const App = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  // }, []);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      /> */}
      <StatusBar backgroundColor="#F7F7F7" barStyle="dark-content" />
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
