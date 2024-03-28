import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';
export const Addsid = {
  ...Platform.select({
    ios: {
      BANNER: TestIds.BANNER,
      Interstitial: TestIds.INTERSTITIAL,
    },
    android: {
      BANNER: TestIds.BANNER,
      Interstitial: TestIds.INTERSTITIAL,
      Interstitial2: 'ca-app-pub-3339897183017333/7197749989',
    },
  }),
};
