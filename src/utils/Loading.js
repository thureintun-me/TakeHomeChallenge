//import liraries
import React, {Component, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import ReactNativeModal from 'react-native-modal';
// create a component
const Loading = ({isLoading}) => {
  return (
    isLoading && (
      <ReactNativeModal
        isVisible={true}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Lottie
          autoPlay
          style={{width: 150, height: 150}}
          source={require('../assets/lotties/loading.json')}
        />
      </ReactNativeModal>
    )
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
export default Loading;
