import {ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import VanHanhBanGhi from '../components/c_view_vanhanhbanghi'
import * as API from './model/API/api';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function TabOneScreen({navigation, route}:any) {
  const {capNhat} = route.params
  const [banGhi, thayBanGhi]:any = useState(null);
  
  useEffect(() => {
    // API.dangNhap("tvphuong10@gmail.com","123456",console.log);
    // LOCAL.reset();
    LOCALACCOUNT.createAccount();
    LOCALLIST.createLocalList();
    LOCALLIST.getProgress(thayBanGhi) 
  }, [])

  // useEffect(() => {
  //   if (dangThucHien)
  //     LOCAL.setProgress(dangThucHien.list_id, trangThai.toString(), (res:any) => {
  //       LOCAL.getProgress(thayBanGhi) 
  //     })
  // }, [trangThai])
  
  return (
    <ScrollView>
      <View style = {{marginTop: 70}}>
          {
            banGhi && banGhi.map((banghi:any, i:number) => {
              return (
                <VanHanhBanGhi banghi={banghi}/>
              )})
          }
      </View>
    </ScrollView>
    
  );
}