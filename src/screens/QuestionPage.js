import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {height, width} from '../components/Diemenstions';
import {StyleSheet} from 'react-native';
import {setupPlayer} from '../components/Setup';
import TrackPlayer from 'react-native-track-player';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {addPagable} from '../reduxToolkit/Slicer6';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {isTablet} from 'react-native-device-info';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
  GAMBannerAd,
  BannerAdSize,
  BannerAd,
} from 'react-native-google-mobile-ads';
import {Addsid} from './ads';
import RNFS from 'react-native-fs';
const authId = Addsid.Interstitial;
const requestOption = {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
};
const QuestionPage = props => {
  const cat = useSelector(state => state.cat);
  const table = useSelector(state => state.table);
  const path = Platform.select({
    android: 'asset:/files/',
    ios: RNFS.MainBundlePath + '/files/',
  });
  const folder =
    table == 'tbl_french'
      ? 'french'
      : table == 'tbl_italian'
      ? 'italian'
      : table == 'tbl_japanies'
      ? 'japanies'
      : table == 'tbl_spanish'
      ? 'spanish'
      : 'english';
  const soundPath = Platform.select({
    android: 'asset:/files/' + folder + '/',
    ios: RNFS.MainBundlePath + '/files/' + folder + '/',
  });

  const WrongVoid = [
    (track1 = {
      url: `${soundPath}uhoh.mp3`,
      title: 'uhoh',
      artist: 'eFlashApps',

      artwork: `${soundPath}uhoh.mp3`,
      duration: null,
    }),
    (track = {
      url: `${soundPath}tryagain.mp3`,
      title: 'tryagain',
      artist: 'eFlashApps',

      artwork: `${soundPath}tryagain.mp3`,
      duration: null,
    }),
    (track3 = {
      url: `${soundPath}oopsie.mp3`,
      title: 'oopsie',
      artist: 'eFlashApps',

      artwork: `${soundPath}oopsie.mp3`,
      duration: null,
    }),
    (track4 = {
      url: `${soundPath}youcandoit.mp3`,
      title: 'youcandoit',
      artist: 'eFlashApps',

      artwork: `${soundPath}youcandoit.mp3`,
      duration: null,
    }),
  ];
  const RightVOid = [
    (track1 = {
      url: `${soundPath}excellent.mp3`,
      title: 'excellent',
      artist: 'eFlashApps',

      artwork: `${soundPath}excellent.mp3`,
      duration: null,
    }),
    (track = {
      url: `${soundPath}fantastic.mp3`,
      title: 'fantastic',
      artist: 'eFlashApps',

      artwork: '${path}fantastic.mp3',
      duration: null,
    }),
    (track3 = {
      url: `${soundPath}goodanswer.mp3`,
      title: 'goodanswer',
      artist: 'eFlashApps',

      artwork: '${path}goodanswer.mp3',
      duration: null,
    }),
    (track5 = {
      url: `${soundPath}great.mp3`,
      title: 'great',
      artist: 'eFlashApps',

      artwork: `${soundPath}great.mp3`,
      duration: null,
    }),
    (track6 = {
      url: `${soundPath}marvelous.mp3`,
      title: 'marvelous',
      artist: 'eFlashApps',

      artwork: '${path}marvelous.mp3',
      duration: null,
    }),
    (track7 = {
      url: `${soundPath}sensational.mp3`,
      title: 'sensational',
      artist: 'eFlashApps',

      artwork: '${path}sensational.mp3',
      duration: null,
    }),
    (track8 = {
      url: `${soundPath}spectacular.mp3`,
      title: 'spectacular',
      artist: 'eFlashApps',

      artwork: '${path}spectacular.mp3',
      duration: null,
    }),
  ];

  const interstitial = InterstitialAd.createForAdRequest(authId, requestOption);
  const tablet = isTablet();
  const disapatch = useDispatch();
  useEffect(() => {
    const backAction = async () => {
      await TrackPlayer.reset();
      navigation.reset({index: 0, routes: [{name: 'home'}]});
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const navigation = useNavigation();
  const backSound = useSelector(state => state.backsound);
  const [song, setSong] = useState();
  const [x, setX] = useState(0);
  const [count, setCount] = useState(1);
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState(false);
  const data = useSelector(state => state.Items);
  const showAdd = () => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );
    interstitial.load();
    return unsubscribe;
  };

  const IsPlay = async (item, index) => {
    let isReady = await setupPlayer();
    await TrackPlayer.reset();
    setCount(count + 1);

    if (count > 8) {
      setCount(0), showAdd();
    }
    let arr = [
      (track = {
        url: `${soundPath}clickon.mp3`,
        title: item.title,
        artist: 'eFlashApps',
        duration: null,
      }),
      (track2 = {
        url: `${soundPath}${item.sound}`,
        title: item.title,
        artist: 'eFlashApps',
        duration: null,
      }),
    ];
    if (isReady) {
      await TrackPlayer.add(arr);
      await TrackPlayer.play();
    }
    setSong(arr);
  };

  const [rendomdat, setrandomDat] = useState(data.slice(0, 4));
  const up = async indexx => {
    await TrackPlayer.reset();

    let traxck;
    let track2;
    traxck = WrongVoid.sort(() => Math.random() - 0.5)[1];
    track2 = RightVOid.sort(() => Math.random() - 0.5)[1];

    if (indexx === x) {
      setRight(true);
      const arr = [0, 1, 2, 3].filter(item => item != x);
      setWrong(arr);
      await TrackPlayer.add(track2);
      setTimeout(() => {
        setRight(false);
        setWrong([]);
        const shuffledData = data
          .slice()
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setrandomDat(shuffledData);
      }, 2000);
    } else {
      await TrackPlayer.add(traxck);
      switch (indexx) {
        case 0:
          setWrong([...wrong, 0]);
          break;
        case 1:
          setWrong([...wrong, 1]);
          break;
        case 2:
          setWrong([...wrong, 2]);
          break;
        case 3:
          setWrong([...wrong, 3]);
          break;
      }
    }

    await TrackPlayer.play();
  };

  useEffect(() => {
    backSound.fromQuestion == false ? run() : null;
  }, [rendomdat]);

  const run = async () => {
    await TrackPlayer.reset();
    let y = Math.floor(Math.random() * 4);
    rendomdat.map((item, index) => {
      if (index === y) {
        IsPlay(item, index);
        setX(y);
      }
    });
  };
  let cn = 0;
  useEffect(() => {
    backSound.fromQuestion
      ? setTimeout(() => {
          sound();
          disapatch({
            type: 'backSoundFromquestions/playWhenThePage',
            fromDetails: false,
            fromQuestion: false,
          });
        }, 500)
      : null;
  }, [backSound.fromQuestion == true]);

  const sound = async () => {
    const isSetup = await setupPlayer();
    await TrackPlayer.reset();
    await TrackPlayer.add(song);
    if (isSetup) {
      await TrackPlayer.play();
    }
  };

  const gotoSettings = async () => {
    await TrackPlayer.reset();
    disapatch({
      type: 'backSoundFromquestions/playWhenThePage',
      fromDetails: false,
      fromQuestion: false,
    });
    navigation.dispatch(StackActions.push('setting', {pr: 'question'}));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      <View style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.reset();

                navigation.reset({index: 0, routes: [{name: 'home'}]});
              }}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('../../Assets4/btnhome_normal.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sound()}>
              <Image
                style={styles.btn2}
                source={require('../../Assets4/btnrepeat_normal.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                gotoSettings();
              }}>
              <Image
                style={styles.icon}
                source={require('../../Assets4/btnsetting_normal.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: tablet ? '-1%' : '-1%',
              alignSelf: 'center',
              alignItems: 'center',
              paddingLeft: '2%',
            }}>
            <FlatList
              data={rendomdat}
              numColumns={2}
              keyExtractor={item => item.ID}
              renderItem={({item, index}) => {
                let Imagess = `${
                  (cat == 'Alphabet' && table == 'tbl_italian') ||
                  (cat == 'Alphabet' && table == 'tbl_spanish') ||
                  (cat == 'Numbers' && table == 'tbl_french') ||
                  (cat == 'Numbers' && table == 'tbl_japanies') ||
                  (cat == 'Numbers' && table == 'tbl_italian')
                    ? soundPath
                    : path
                }${item.image}`;

                return (
                  <TouchableOpacity
                    onPress={() => {
                      up(index);
                      if (backSound.fromQuestion) {
                        disapatch({
                          type: 'backSoundFromquestions/playWhenThePage',
                          fromDetails: false,
                          fromQuestion: false,
                        });
                      }
                    }}
                    style={[!tablet ? styles.mobileView : styles.tabView]}
                    disabled={right || wrong.includes(index) ? true : false}>
                    <Image
                      style={{height: '100%', width: '100%'}}
                      source={{uri: Imagess}}
                      resizeMode="contain"
                    />
                    {wrong.includes(index) ? (
                      <Image
                        //resizeMode="stretch"
                        style={{
                          height: '100%',
                          width: '100%',
                          position: 'absolute',
                        }}
                        // resizeMode="contain"
                        source={require('../../Assets4/wrongselection.png')}
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View style={{bottom: 0, borderWidth: 0, backgroundColor: 'white'}}>
          <BannerAd
            unitId={Addsid.BANNER}
            sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuestionPage;
const styles = StyleSheet.create({
  icon: {
    height: hp(7),
    width: hp(7),
    margin: '1%',
  },
  Titel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  header: {
    height: height / 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  btn2: {
    height: hp(6.5),
    width: hp(6.5),
    alignSelf: 'center',
    marginTop: '15%',
  },
  wrongImg1: {
    height: hp(33),
    width: hp(24),
    marginHorizontal: wp(1.5),
    marginVertical: hp(3),
    // borderWidth: 4,
    alignItems: 'center',
  },
  wrongImg2: {
    height: hp(33),
    width: hp(24),
    marginHorizontal: wp(1.5),
    marginVertical: hp(3),
    // /  borderWidth: 4,
    alignItems: 'center',
  },
  worgImgContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: '16.7%',
  },
  worgImgContainer2: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '1%',
  },
  mobileView: {
    height: hp(38),
    width: '46%',
    marginHorizontal: '1.5%',
    marginVertical: '1.5%',
  },
  tabView: {
    height: hp(38),
    width: hp(27),
    marginHorizontal: hp(1.5),
    // borderWidth: 4,
    marginVertical: hp(1),
  },
  tabWrong2: {
    height: hp(40),
    width: hp(29),
    marginLeft: hp(1),
    marginVertical: hp(1),
  },
  tabWrong1: {
    height: hp(40),
    width: hp(29),
    marginLeft: hp(4),
    marginVertical: hp(1),
  },
});
