//import liraries
import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import AppContext from '../../context/AppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../utils/Loading';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
// create a component
const LoginScreen = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [eyeVisiblity, setEyeVisibility] = useState(false);
  const {setToken, setLoading} = useContext(AppContext);
  const checkLoginUser = () => {
    setLoading(true);
    setTimeout(() => {
      if (!userName || !password) {
        let message = userName
          ? 'Password is required'
          : password
          ? 'user name is required'
          : 'user name and password is required';
        Alert.alert('', message);
        setLoading(false);
        return;
      }

      if (userName === 'Admin' && password === 'Admin@me') {
        setToken('Token');
        RNSecureKeyStore.set('token', 'Token', {
          accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
        })
          .then(res => console.log('Res==>', res))
          .catch(err => console.log('err', err));
        setLoading(false);
        return;
      }
      setLoading(false);
      return Alert.alert('', 'user name or password is incorrect');
    }, 1500);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 150,
            height: 150,
            //  backgroundColor: 'blue',
            borderWidth: 1,
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>App logo</Text>
        </View>
        <Text>Take Home Test Challenge</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 30,
            // backgroundColor: 'cyan',
          }}>
          <TextInput
            placeholder="userName"
            value={userName}
            style={styles.button}
            onChangeText={value => setUserName(value)}
          />
          <View style={{flexDirection: 'row', width: '100%', ...styles.button}}>
            <TextInput
              placeholder="password"
              value={password}
              secureTextEntry={!eyeVisiblity}
              style={{flex: 1}}
              onChangeText={value => setPassword(value)}
            />

            <Pressable onPress={() => setEyeVisibility(!eyeVisiblity)}>
              {eyeVisiblity ? (
                <MaterialCommunityIcons
                  name={'eye-outline'}
                  size={20}
                  color="#000"
                />
              ) : (
                <MaterialCommunityIcons
                  name={'eye-off-outline'}
                  size={20}
                  color="#000"
                />
              )}
            </Pressable>
          </View>

          <Pressable onPress={checkLoginUser} style={styles.button}>
            <Text>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    // width: '100%',
    backgroundColor: '#fff',
    height: 56,
    paddingHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default LoginScreen;
