import React from 'react';
import {View, FlatList, Linking} from 'react-native';
import Card from './Card';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addData} from '../reduxToolkit/Slice';
import {addCatNext} from '../reduxToolkit/Slice7';
import databse from '../components/db';

const HorizontalList = ({items}) => {
  const disapatch = useDispatch();
  const table = useSelector(state => state.table);
  const getData = async (cat, id) => {
    disapatch({
      type: 'backSoundFromquestions/playWhenThePage',
      fromDetails: false,
      fromQuestion: false,
    });
    if (cat != 'link' && cat != 'link2') {
      const data = await databse(table, cat, false, 0);
      disapatch(addData(data));
      disapatch(addCatNext({items, id: parseInt(id) + 1}));
      navigation.navigate(wr ? 'question' : 'details', {
        page: true,
        cat,
      });
    } else {
      Linking.openURL(
        cat == 'link'
          ? 'https://babyflashcards.com/apps.html'
          : 'https://play.google.com/store/apps/details?id=com.eFlashEnglish&pli=1',
      );
    }
  };

  const wr = useSelector(state => state.question);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginLeft: '2%',
      }}>
      <FlatList
        scrollEnabled={true}
        numColumns={2}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <Card
              onPress={() => {
                getData(item.Category, item?.id);
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default HorizontalList;
