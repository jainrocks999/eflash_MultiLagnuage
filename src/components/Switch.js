import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {height, width} from './Diemenstions';
import {isTablet} from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';

const Switch = ({style, text, sw, onPress, type, ...props}) => {
  const table = useSelector(state => state.table);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('tbl_items');
  const [items, setItems] = useState([
    {label: 'Engish', value: 'tbl_items'},
    {label: 'French', value: 'tbl_french'},
    {label: 'Italian', value: 'tbl_italian'},
    {label: 'Japanese', value: 'tbl_japanies'},
    {label: 'Spanish', value: 'tbl_spanish'},
  ]);
  useEffect(() => {
    if (table != null && table != undefined && table != '') {
      setValue(table);
    }
  }, []);
  const Tablet = isTablet();
  return (
    <View style={{flexDirection: 'row', margin: '2%'}}>
      <View style={{width: '60%', marginLeft: '-1%'}}>
        <Text style={[style]}>{text} :</Text>
      </View>
      {!type ? (
        <TouchableOpacity {...props} onPress={onPress} style={styles.pressable}>
          <Image
            style={Tablet ? {height: 50, width: 90} : styles.pre}
            source={
              sw
                ? require('../../Assets4/on.png')
                : require('../../Assets4/off.png')
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginTop: '-10%',
            paddingBottom: '2%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <DropDownPicker
            maxHeight={hp(20)}
            arrowIconStyle={{
              aspectRatio: '0',
              borderBlockColor: 'white',
              borderColor: 'red',
              elevation: 5,
            }}
            ArrowDownIconComponent={() => (
              <View>
                <Image
                  tintColor="black"
                  style={{height: hp(1.7), width: hp(1.7), marginTop: '30%'}}
                  source={require('../../Assets4/down.png')}
                />
              </View>
            )}
            ArrowUpIconComponent={() => (
              <View>
                <Image
                  tintColor="black"
                  style={{height: hp(1.7), width: hp(1.7), marginTop: '30%'}}
                  source={require('../../Assets4/up.png')}
                />
              </View>
            )}
            disableBorderRadius={true}
            multiple={false}
            showArrowIcon={true}
            style={{
              width: '40%',
              marginTop: '6%',
              backgroundColor: null,
              borderWidth: 0,
              height: hp(5.2),
              paddingRight: '6%',
            }}
            dropDownContainerStyle={{
              width: '40%',
              backgroundColor: '#2ab4e3',
              borderWidth: 0,
              marginTop: '6%',
              // backgroundColor: null,

              // paddingLeft: '20%',
            }}
            textStyle={{
              fontSize: hp(2.5),
              fontFamily: 'KaiseiTokumin-Medium',
            }}
            open={open}
            value={value}
            items={items}
            onChangeValue={item => onPress(item)}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      )}
    </View>
  );
};

export default Switch;
const styles = StyleSheet.create({
  pressable: {
    marginLeft: '1%',
  },
  pre: {
    height: hp(4),
    width: wp(30),
  },
});
