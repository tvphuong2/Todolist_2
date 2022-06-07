import {ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import VanHanhBanGhi from '../components/c_view_vanhanhbanghi'
import * as API from './model/API/api';
import * as LOCAL from './model/API/SQLite';

export default function TabOneScreen({navigation, route}:any) {
  const {capNhat} = route.params
  const [banGhi, thayBanGhi]:any = useState(null);
  
  useEffect(() => {
    LOCAL.DangSuDung(thayBanGhi) 
  }, [])
  
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