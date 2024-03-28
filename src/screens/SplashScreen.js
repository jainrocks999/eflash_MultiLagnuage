import {View, Text, Image, SafeAreaView} from 'react-native';
import React, {startTransition, useEffect} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Table} from '../reduxToolkit/tableSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const lagunage = await AsyncStorage.getItem('table');
    if (lagunage != null) {
      dispatch(Table(lagunage));
    }
    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'home'}]});
    }, 2000);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#abdbe3'}}>
      <View style={{flex: 1, marginHorizontal: 1}}>
        <Image
          resizeMode="stretch"
          style={{height: '100%', width: '100%'}}
          source={require('../../Assets4/splash.png')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
