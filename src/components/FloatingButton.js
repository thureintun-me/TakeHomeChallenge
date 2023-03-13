//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// create a component
const FloatingButton = ({cartLength = 0, onPress}) => {
  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
      style={{
        width: 102,
        height: 35,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#298BFD',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
      }}>
      {cartLength > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: -10,
            backgroundColor: 'red',
            width: 20,
            height: 20,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>{cartLength}</Text>
        </View>
      )}

      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <MaterialIcons name="cart-outline" size={20} color={'#fff'} />
        <Text style={{color: '#fff', marginLeft: 5}}>View Cart</Text>
      </View>
    </Pressable>
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
export default FloatingButton;
