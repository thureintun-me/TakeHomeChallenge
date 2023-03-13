//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// create a component
const PaymentSuccess = ({isVisible, setIsVisible}) => {
  return (
    <ReactNativeModal
      coverScreen={false}
      style={{
        flex: 1,
        //  backgroundColor: '#fff',
        justifyContent: 'flex-end',
      }}
      isVisible={isVisible}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: 'red',
          marginBottom: 50,
          elevation: 1,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 10},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{marginBottom: 15, alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="check-circle"
            size={100}
            color={'lightgreen'}
          />
          <Text style={{fontSize: 25}}>Payment Success</Text>
        </View>
        <View style={{position: 'absolute', bottom: -10, alignSelf: 'center'}}>
          <Pressable
            style={{
              width: 25,
              height: 25,
              backgroundColor: '#e50914',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <MaterialCommunityIcons name="window-close" size={20} />
          </Pressable>
        </View>
      </View>
    </ReactNativeModal>
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
export default PaymentSuccess;
