//import liraries
import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/home/HomeScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import AppContext from './src/context/AppContext';
import Loading from './src/utils/Loading';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import HomeStack from './src/navigatios/Stack/HomeStack';
import EStyleSheet from 'react-native-extended-stylesheet';
import Splash from './src/screens/splash/Splash';
// create a component
const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [splash, setSplash] = useState(true);
  const [card, setCard] = useState([]);
  const totalCard = useRef();
  const totalPrice = useRef();

  const values = {
    token: token,
    setToken: setToken,
    setLoading: setLoading,
    card: card,
    setCard: setCard,
    totalCard: totalCard,
    totalPrice: totalPrice,
  };

  let {height, width} = Dimensions.get('window');
  EStyleSheet.build({
    $rem: width > 340 ? 18 : 16,
  });
  useEffect(() => {
    setTimeout(() => {
      RNSecureKeyStore.get('token')
        .then(res => {
          console.log('Res==>', res);
          setToken(res);
        })
        .catch(err => console.log('err', err))
        .finally(() => setSplash(!splash));
    }, 1500);
  }, []);
  return (
    <NavigationContainer>
      <AppContext.Provider value={values}>
        {splash ? <Splash /> : token ? <HomeStack /> : <LoginScreen />}
      </AppContext.Provider>
      <Loading isLoading={loading} />
    </NavigationContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
