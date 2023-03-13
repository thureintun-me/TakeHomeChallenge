//import liraries
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import HomeScreen from '../../screens/home/HomeScreen';

const Stack = createStackNavigator();
// create a component
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          header: ({navigation, route, options, back}) => {
            return (
              <SafeAreaView
                style={{
                  ...styles.header,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.headerText,
                  }}>
                  TCG Marketplace
                </Text>

                <View
                  style={{
                    ...styles.logoCircle,
                    // justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 30,
                      transform: [{rotate: '-6 deg'}],
                    }}
                    source={require('../../assets/images/Text.png')}
                  />
                  <Image
                    style={{
                      width: '40%',
                      height: '40%',
                      transform: [{rotate: '45deg'}],
                    }}
                    source={require('../../assets/images/logo.png')}
                  />
                </View>
              </SafeAreaView>
            );
          },
        }}
      />
    </Stack.Navigator>
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
  header: {
    height: Platform.OS == 'ios' ? verticalScale(100) : verticalScale(77),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
  },

  logoCircle: {
    // top: 45,
    bottom: -25,
    position: 'absolute',
    width: verticalScale(50, 0.3),
    height: verticalScale(50, 0.3),
    borderRadius: verticalScale(50, 0.3),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#1D1C1C',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
});

//make this component available to the app
export default HomeStack;
