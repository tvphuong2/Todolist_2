/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import VanHanh from '../screens/s_vanhanh';
import LuuTru from '../screens/s_luutru';
import TaiKhoan from '../screens/ss_taikhoan';
import DangNhap from '../screens/ss_dangnhap';
import KhamPha from '../screens/s_khampha';
import ChuDe from '../screens/ss_chude';
import BanGhi from '../screens/ss_banghi';
import BanGhiNoiBo from '../screens/ss_banghi_noibo';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useState, useEffect } from 'react';
import * as API from '../screens/model/API/api';
import * as LOCAL from '../screens/model/API/SQLite';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Screen name="VanHanh" component={VanHanh} options={{ title: 'Oops!' }} /> */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="ChuDe" component={ChuDe}/>
        <Stack.Screen name="Modal" component={ModalScreen}/>
        <Stack.Screen name="BanGhi" component={BanGhi} options={{title: 'Xem bản ghi'}}/>
        <Stack.Screen name="BanGhiNoiBo" component={BanGhiNoiBo} options={{title: 'Xem bản ghi'}}/>
        <Stack.Screen name="TaiKhoan" component={TaiKhoan}/>
        <Stack.Screen name="DangNhap" component={DangNhap}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [banGhi, thayBanGhi]:any = useState(null);

  function capNhat() {
    LOCAL.DangSuDung(thayBanGhi)
  }

  useEffect(() => {
    LOCAL.LayTaiKhoan((res:any) => {
      console.log(res)
      if (res.email) {
        console.log(res)
        API.dangNhap(res.email,res.password,console.log)
      }
    })
    capNhat()
  }, [])

  return (
    <BottomTab.Navigator
      initialRouteName="VanHanh"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>      
      <BottomTab.Screen
        name="LuuTru"
        component={LuuTru}
        initialParams={{capNhat: {capNhat}}} 
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="save" color={color} />,
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="VanHanh"
        component={VanHanh}
        initialParams={{capNhat:capNhat}} 
        options={({ navigation }: RootTabScreenProps<'VanHanh'>) => ({
          title: banGhi? banGhi.length + "" : "0",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="KhamPha"
        component={KhamPha}
        options={{
          title: '',
          tabBarIcon: ({ color }) => <TabBarIcon name="compass" color={color} />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
