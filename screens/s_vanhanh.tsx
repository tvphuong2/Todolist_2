import {ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import DangSuDung from '../components/c_button_sudung'
import BuocThucHien from '../components/c_button_buocthuchien'
import * as API from './model/API/api';
import * as LOCAL from '../screens/model/API/Local';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'VanHanh'>) {
  const [banGhi, thayBanGhi]:any = useState(null);
  const [buoc, thayBuoc]:any = useState(null);
  const [trangThai, thayTrangThai]:any = useState(null);
  const [dangThucHien, doiBanGhi]:any = useState(null);
  
  useEffect(() => {
    API.dangNhap("tvphuong10@gmail.com","123456",console.log);
    // LOCAL.reset();
    LOCAL.createLocalList();
    LOCAL.getProgress(thayBanGhi) 
  }, [])

  useEffect(() => {
    if (dangThucHien)
      LOCAL.setProgress(dangThucHien.list_id, trangThai.toString(), (res:any) => {
        LOCAL.getProgress(thayBanGhi) 
      })
  }, [trangThai])
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {
          banGhi && banGhi.map((banghi:any, i:number) => {
            return (
              <DangSuDung sudung={"false"} thayBuoc={thayBuoc} thayTrangThai={thayTrangThai} banghi={banghi} thayBanGhi={thayBanGhi} doiBanGhi={doiBanGhi}/>
            )
          })
        }
      </View>
      <ScrollView style={styles.body}>
        {
          dangThucHien? <Text style={{color: 'white', fontSize: 20, marginBottom:30  , fontWeight : 'bold'}}>| {dangThucHien.name}</Text>
          :<View></View>
        }
        
        {
          buoc && buoc.map((step:any, i:number) => {
            return (
              <View style={{marginVertical : 6 , marginRight : 6 , backgroundColor : 'black' , flexDirection : 'row' , alignItems : 'center'}}>
                {
                  (trangThai[step.key] == "1")?
                  <View style={{borderColor: "#6383A8", borderWidth: 2 , borderRadius : 10 }}>
                    <BuocThucHien color={'white'} displayMota={"flex"} complete={"false"} trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                  </View>
                  : (trangThai[step.key] == "0")?
                  <View>
                    <BuocThucHien color={'white'} displayMota={"flex"} complete={"false"}  trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                  </View>
                  :
                  <View style={{backgroundColor : 'black' , flexDirection : 'row' , alignItems : 'center' , borderRadius : 10}}>
                     <AntDesign name="checkcircle" size={20} color="tomato" />
                     <View style={{flex : 1}}>
                     <BuocThucHien color={'tomato'} displayMota={'none'} complete={"true"} trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step}/>
                     </View>
                  </View>
                }
              </View>
          )})
        }
        {/* <View style={{marginBottom : 120}}></View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'column' ,
    backgroundColor : 'black'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    left:0,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row' ,
    backgroundColor : 'gray' ,
    marginTop : 32 ,
    borderBottomEndRadius : 10 ,
    borderBottomLeftRadius : 10
  },
  body: {
    flexDirection: 'column',
    width: '90%',
    height:'100%',
    paddingTop: 20,
    paddingBottom:300,
    // justifyContent: 'center',
    paddingStart:20,
    backgroundColor : "black" ,
    marginBottom : 50 ,
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
    backgroundColor:"rgba(0 , 0 , 0 , 0.2)",
  },
  substep: {
    borderRadius: 15,
    height: 50,
    padding:15,
    margin:10,
    marginStart:50,
    backgroundColor:"rgba(0 , 0 , 0 , 0.2)",
  },
});
