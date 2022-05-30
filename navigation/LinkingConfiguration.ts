/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          VanHanh: {
            screens: {
              VanHanhScreen: 'one',
            },
          },
          LuuTru: {
            screens: {
              LuuTruScreen: 'two',
            },
          },
          KhamPha: {
            screens: {
              KhamPhaScreen: 'two',
            },
          },
          ThongBao: {
            screens: {
              ThongBaoScreen: 'two',
            },
          },
          TaiKhoan: {
            screens: {
              TaiKhoanScreen: 'two',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
