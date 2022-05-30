import {ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import DangSuDung from '../components/c_button_sudung'
import BuocThucHien from '../components/c_button_buocthuchien'
import * as API from './model/API/api';
import * as LOCAL from '../screens/model/API/SQLite';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'VanHanh'>) {
  const [banGhi, thayBanGhi]:any = useState(null);
  const [buoc, thayBuoc]:any = useState(null);
  const [trangThai, thayTrangThai]:any = useState(null);
  const [dangThucHien, doiBanGhi]:any = useState(null);
  
  useEffect(() => {
    API.dangNhap("tvphuong10@gmail.com","123456",console.log)

    LOCAL.DangSuDung(thayBanGhi) 
  }, [])

  useEffect(() => {
    if (dangThucHien)
      LOCAL.ThayTienDo(dangThucHien.list_id, trangThai.toString(), (res:any) => {
        LOCAL.DangSuDung(thayBanGhi) 
      })
  }, [trangThai])
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          banGhi && banGhi.map((banghi:any, i:number) => {
            return (
              <DangSuDung thayBuoc={thayBuoc} thayTrangThai={thayTrangThai} banghi={banghi} thayBanGhi={thayBanGhi} doiBanGhi={doiBanGhi}/>
            )
          })
        }
      </View>
      <ScrollView style={styles.body}>
        <Text style={{color: 'pink', fontSize: 20, marginBottom:30}}>| {dangThucHien.name}</Text>
        {
          buoc && buoc.map((step:any, i:number) => {
            return (
              <View>
                {
                  (trangThai[step.key] == "1")?
                  <View style={{borderColor: "white", borderWidth: 1}}>
                    <BuocThucHien trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                  </View>
                  : (trangThai[step.key] == "0")?
                  <View>
                    <BuocThucHien trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                  </View>
                  :
                  <View style={{borderColor: "red", borderWidth: 1}}>
                    <BuocThucHien trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                  </View>
                }
              </View>
          )})
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    left:0,
    width:'20%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flexDirection: 'column',
    width: '80%',
    height:'100%',
    paddingTop:100,
    paddingBottom:200,
    // justifyContent: 'center',
    paddingStart:20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  step: {
    borderRadius: 15,
    height: 50,
    padding:15,
    margin:10,
    backgroundColor:"black",
  },
  substep: {
    borderRadius: 15,
    height: 50,
    padding:15,
    margin:10,
    marginStart:50,
    backgroundColor:"black",
  },
});
