//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const CartModal = ({
  totalCard,
  totalPrice,
  cartData,
  isVisible,
  setIsVisible,
  clearCart,
  onPaymentPress,
  setCart,
  setData,
  data,
}) => {
  return (
    <ReactNativeModal
      coverScreen={false}
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 100,
        marginBottom: 50,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        backgroundColor: '#fff',
        borderRadius: 20,
      }}
      isVisible={isVisible}>
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingVertical: 50}}
        data={cartData.filter(obj => obj.count > 0)}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'red'}}>There is no item in the cart !</Text>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            cartData.filter(obj => obj.count > 0).length > 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable onPress={clearCart}>
                  <Text style={styles.clearAll}>Clear All</Text>
                </Pressable>
                <View
                  style={{
                    width: 217,
                    justifyContent: 'space-between',
                    marginTop: 30,
                  }}>
                  <View
                    style={{
                      marginHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}>
                    <Text style={styles.totalCard}>Total Cards </Text>
                    <Text style={{...styles.totalCard, color: '#FD2929'}}>
                      {totalCard}
                    </Text>
                  </View>

                  <View
                    style={{
                      marginHorizontal: 15,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 30,
                    }}>
                    <Text style={styles.totalPriceText}>Total Price </Text>
                    <Text style={{...styles.totalPriceText, color: '#FD2929'}}>
                      $ {totalPrice}
                    </Text>
                  </View>

                  <Pressable
                    onPress={onPaymentPress}
                    style={{
                      height: 47,
                      backgroundColor: '#298BFD',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 25,
                    }}>
                    <Text style={styles.payNow}>Pay Now</Text>
                  </Pressable>
                </View>
              </View>
            )
          );
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                marginHorizontal: 40,
              }}>
              <Image
                resizeMode="contain"
                style={{width: 77, height: 106}}
                source={{
                  uri: item.images?.large,
                }}
              />
              <View
                style={{
                  marginHorizontal: 10,
                  //  marginVertical: 20,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  //  backgroundColor: 'red',
                }}>
                <View style={{justifyContent: 'space-between'}}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      // alignItems: 'center',
                    }}>
                    <Text style={styles.pokemonName}>{item.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.pricePerCardText}>
                        ${item?.cardmarket?.prices?.averageSellPrice}
                      </Text>
                      <Text style={styles.pricePerCard}> per card</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      height: 50,
                      // justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={{...styles.leftCardCount, color: '#FD2929'}}>
                      {item?.set?.total - item.count}{' '}
                    </Text>
                    <Text style={styles.leftCard}>cards left</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={styles.totalPriceTextPerCard}>
                        {item.count}
                      </Text>
                      <View
                        style={{
                          position: 'absolute',
                          top: -20,
                          left: 8,
                          // backgroundColor: 'red',
                          width: 20,
                        }}>
                        <Pressable
                          onPress={() => {
                            if (item?.set?.total - item.count <= 0) {
                              Alert.alert('', 'Out of stock!');
                              return;
                            }
                            setCart(
                              cartData.map(obj => {
                                return {
                                  ...obj,
                                  count:
                                    obj.id == item.id
                                      ? obj.count + 1
                                      : obj.count,
                                };
                              }),
                            );
                            setData(
                              data.map(obj => {
                                return {
                                  ...obj,
                                  count:
                                    obj.id == item.id
                                      ? obj.count + 1
                                      : obj.count,
                                };
                              }),
                            );
                          }}>
                          <Ionicons
                            name="chevron-up"
                            size={15}
                            color={'#298BFD'}
                          />
                        </Pressable>

                        {item.count == 1 ? (
                          <Pressable
                            onPress={() => {
                              setCart(
                                cartData.filter(obj => obj.id !== item.id),
                              );
                              setData(
                                data.map(obj => {
                                  return {
                                    ...obj,
                                    count: obj.id == item.id ? 0 : obj.count,
                                  };
                                }),
                              );
                            }}>
                            <MaterialCommunityIcons
                              name="window-close"
                              size={13}
                              color={'#FD2929'}
                            />
                          </Pressable>
                        ) : (
                          <Pressable
                            onPress={() => {
                              setCart(
                                cartData.map(obj => {
                                  return {
                                    ...obj,
                                    count:
                                      obj.id == item.id
                                        ? obj.count - 1
                                        : obj.count,
                                  };
                                }),
                              );
                              setData(
                                data.map(obj => {
                                  return {
                                    ...obj,
                                    count:
                                      obj.id == item.id
                                        ? obj.count - 1
                                        : obj.count,
                                  };
                                }),
                              );
                            }}>
                            <Ionicons
                              name="chevron-down"
                              size={15}
                              color={'#298BFD'}
                            />
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 50,
                    }}>
                    <Text style={styles.pricePerCardText}>Price</Text>
                    <Text style={styles.totalPriceTextPerCard}>
                      ${' '}
                      {(
                        item.count * item?.cardmarket?.prices?.averageSellPrice
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={{position: 'absolute', bottom: -15, alignSelf: 'center'}}>
        <Pressable
          style={{
            width: 35,
            height: 35,
            backgroundColor: '#fd2929',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setIsVisible(!isVisible)}>
          <MaterialCommunityIcons name="window-close" size={20} />
        </Pressable>
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
  totalPriceText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  totalCard: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  clearAll: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6A6969',
    textDecorationLine: 'underline',
  },
  leftCardCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  leftCard: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#BCBBBB',
  },
  pricePerCardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#1D1C1C',
  },
  pricePerCard: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#6A6969',
  },
  pokemonName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1D1C1C',
  },
  totalPriceTextPerCard: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#298BFD',
  },
  payNow: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
});

//make this component available to the app
export default CartModal;
