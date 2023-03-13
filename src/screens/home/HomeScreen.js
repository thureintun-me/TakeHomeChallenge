//import liraries
import React, {Component, useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import FloatingButton from '../../components/FloatingButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {verticalScale, scale} from 'react-native-size-matters';
import EStyleSheet from 'react-native-extended-stylesheet';
import axios from 'axios';
import CartModal from './CartModal';
import AppContext from '../../context/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PaymentSuccess from './PaymentSuccessModal';
import FastImage from 'react-native-fast-image';

// create a component
const HomeScreen = () => {
  const [data, setData] = useState();
  const [filterData, setFilterData] = useState();
  const [cart, setCart] = useState([]);
  const [cartVisibility, setCartVisibility] = useState(false);
  const [paymentSuccessVisibility, setPaymentSuccessVisibility] =
    useState(false);
  // const [nameFilter, setNameFilter] = useState();

  const firstTimeRef = useRef(true);

  const pageNumber = useRef(1);
  const hasNextPage = useRef(true);
  const onEndReached = useRef(false);
  const pageSize = useRef(12);
  const [total, setTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const {loading, setLoading, token} = useContext(AppContext);
  const getPokemon = async () => {
    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    let response = await axios.get(
      `https://api.pokemontcg.io/v2/cards?page=${pageNumber.current}&pageSize=12`,
      config,
    );

    if (data) {
      //  Alert.alert('call');
      let modifyData = response.data.data.map(obj => {
        return {
          ...obj,
          count: 0,
        };
      });
      setData([...data, ...modifyData]);
      hasNextPage.current =
        response.data.data.length >= pageSize.current ? true : false;
      onEndReached.current = false;
      return;
    }
    setData(
      response.data.data.map(obj => {
        return {...obj, count: 0};
      }),
    );
    setLoading(false);
    console.log('Data ==>', response.data);
  };

  useEffect(() => {
    setLoading(true);
    getPokemon();
  }, []);

  useEffect(() => {
    if (cart.length < 0) {
      return;
    }
    let sum = 0;
    let totalPrice = 0;
    cart.forEach(obj => {
      console.log('Count', obj);
      totalPrice += obj.count * obj?.cardmarket?.prices?.averageSellPrice;
      sum = sum + obj.count;
    });

    setTotal(sum);
    setTotalPrice(totalPrice.toFixed(2));
  }, [cart]);

  const addToCart = item => {
    let checkAlredyInCart = cart.filter(obj => obj.id == item.id);

    console.log('Ch', checkAlredyInCart);
    if (checkAlredyInCart.length > 0) {
      let temp = cart.map(obj => {
        return {
          ...obj,
          count: obj.id == item.id ? obj.count + 1 : obj.count ? obj.count : 1,
        };
      });
      setCart(temp);
      // setData(
      //   data.map(obj => {
      //     return {
      //       ...obj,
      //       count: obj.id == item.id ? checkAlredyInCart[0].count + 1 : 0,
      //     };
      //   }),
      // );
    } else {
      item.count = 1;
      setCart([...cart, item]);
      setData(
        data.map(obj => {
          return {
            ...obj,
            count: obj.id == item.id ? 1 : 0,
          };
        }),
      );
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        key={item.id}
        style={{
          // justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 60,
          height: verticalScale(500),
          //  marginBottom: 100,
          //  backgroundColor: 'red',
        }}>
        <Pressable
          onPress={() => {
            if (item.count > 0) {
              console.log('Already in cart');
              return;
            }
            addToCart(item);
          }}
          style={{
            ...styles.box,
          }}>
          <View
            style={{
              ...styles.button,
              backgroundColor: item?.count > 0 ? '#000' : 'gold',
            }}>
            <Text
              style={{
                ...styles.selectCard,
                color: item?.count > 0 ? '#fff' : '#1D1C1C',
              }}>
              {item?.count > 0 ? 'Selected' : 'Select Card'}
            </Text>
          </View>
        </Pressable>

        <FastImage
          resizeMode={
            Platform.OS == 'android'
              ? FastImage.resizeMode.cover
              : FastImage.resizeMode.contain
          }
          style={{width: '80%', height: verticalScale(300), borderRadius: 5}}
          source={{
            uri: item.images.small,
            priority: FastImage.priority.normal,
          }}
        />
        <View
          style={{
            width: '100%',
            // backgroundColor: 'red',
            // paddingBottom: 50,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text numberOfLines={1} style={{...styles.pokemon}}>
            {item.name}
          </Text>
          <Text style={{...styles.rarity, marginVertical: 2}}>
            {item.rarity}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}>
            <Text style={{...styles.priceAndCartLeft}}>
              ${item?.cardmarket?.prices?.averageSellPrice}
            </Text>
            <Text style={{...styles.priceAndCartLeft}}>
              {item?.set?.total - item.count} left
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 50,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                width: '100%',
                // backgroundColor: 'blue',
                paddingHorizontal: 15,
                marginBottom: 60,
              }}>
              <TextInput
                placeholder="name"
                onChangeText={val => {}}
                style={{
                  paddingHorizontal: 15,
                  height: verticalScale(30),
                  width: '100%',
                  borderRadius: 30,
                  ...styles.neumorphism,
                  ...styles.filter,
                }}
              />
              <View
                style={{
                  width: '100%',
                  height: verticalScale(30),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <View
                  style={{
                    width: '32%',
                    borderRadius: 30,
                    ...styles.neumorphism,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.subFilter}}>Type</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={'#BCBBBB'}
                  />
                </View>
                <View
                  style={{
                    width: '32%',
                    borderRadius: 30,
                    ...styles.neumorphism,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.subFilter}}>Rairty</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={'#BCBBBB'}
                  />
                </View>
                <View
                  style={{
                    width: '32%',
                    borderRadius: 30,
                    ...styles.neumorphism,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{...styles.subFilter}}>Set</Text>
                  <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={'#BCBBBB'}
                  />
                </View>
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            data?.length > 0 && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginTop: 15,
                }}>
                <MaterialIcons name="search" size={20} />
                <Text style={{marginLeft: 3}}>Show More</Text>
              </View>
            )
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{marginBottom: 20}}></View>;
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          onEndReached.current = true;
        }}
        onMomentumScrollEnd={() => {
          console.log('ON', onEndReached.current && hasNextPage.current);
          if (onEndReached.current && hasNextPage.current) {
            pageNumber.current = pageNumber.current + 1;
            console.log('Page Number===>', hasNextPage.current);
            getPokemon();
            onEndReached.current = false;
          } else {
            //alert("here")
            onEndReached.current = false;
          }
        }}
        data={filterData ? filterData : data}
        renderItem={renderItem}
      />

      <FloatingButton
        cartLength={total}
        onPress={() => setCartVisibility(!cartVisibility)}
      />

      <CartModal
        totalCard={total}
        totalPrice={totalPrice}
        cartData={cart}
        clearCart={() => {
          setCart([]);
          setData(
            data.map(obj => {
              return {
                ...obj,
                count: 0,
              };
            }),
          );
        }}
        setCart={setCart}
        setData={setData}
        data={data}
        isVisible={cartVisibility}
        setIsVisible={setCartVisibility}
        onPaymentPress={() => {
          setLoading(true);
          setTimeout(() => {
            setCartVisibility(!cartVisibility);
            setPaymentSuccessVisibility(!paymentSuccessVisibility);
            setCart([]);
            setData(
              data.map(obj => {
                return {
                  ...obj,
                  count: 0,
                };
              }),
            );
            setLoading(false);
          }, 1000);
        }}
      />
      <PaymentSuccess
        isVisible={paymentSuccessVisibility}
        setIsVisible={setPaymentSuccessVisibility}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  header: {
    height: 60,
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
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
  },
  box: {
    top: verticalScale(240),
    position: 'absolute',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
    height: verticalScale(180),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    height: verticalScale(40),
    bottom: -15,
    backgroundColor: 'gold',
    width: '65%',
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  neumorphism: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: '#fff',
  },
  filterName: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#BCBBBB',
  },
  subFilter: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#BCBBBB',
  },
  selectCard: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
  },
  rarity: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#0F6DB0',
  },
  pokemon: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    color: '#1D1C1C',
  },
  priceAndCartLeft: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#6A6969',
  },
});

//make this component available to the app
export default HomeScreen;
