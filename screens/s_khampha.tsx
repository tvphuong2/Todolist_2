import { Platform, StyleSheet, TouchableOpacity, ScrollView, Image, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import ChuDe from '../components/c_button_chude';
import TimKiem from '../components/c_input_timkiem';
import KetQua from '../components/c_view_ketquatimkiem';
import { RootTabScreenProps } from '../types';
import * as API from './model/API/api';
import * as LOCAL from './model/API/SQLite';

export default function KhamPha({ navigation }: RootTabScreenProps<'KhamPha'>) {
  const [tu_khoa, thay_tu_khoa] = useState('');
  const [ket_qua, thay_ket_qua] = useState([]);
  const [tai_khoan, thay_tai_khoan]:any = useState([]);

  useEffect(() => {
    LOCAL.LayTaiKhoan(thay_tai_khoan)
  }, [])

  useEffect(() => {
    API.APITimKiem(tu_khoa, thay_ket_qua)
  }, [tu_khoa])

  useEffect(() => {
    API.APITimKiem(tu_khoa, thay_ket_qua)
  }, [tai_khoan])

  function logout() {
    LOCAL.XoaTaiKhoan((res:any)=> {
        thay_tai_khoan(null)
    })
  }

  return (
    <ScrollView>
        {
          tai_khoan && tai_khoan.email?
          <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => {navigation.navigate('TaiKhoan')}}>
              {
                tai_khoan.image && tai_khoan.image !== '' ?
                <Image style={styles.ava} source={{ uri: API.layAnh(tai_khoan.image)}}/>
                :<Image style={styles.ava} source={require('../assets/images/8.png')} /> 
              }
            </TouchableOpacity>
            <Text>         Chào {tai_khoan.name}!         </Text>
            <TouchableOpacity onPress={logout}>
              <MaterialCommunityIcons name="logout" size={35} color="white" />
            </TouchableOpacity>
          </View>
          :
          <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center'}}>
            <Text>         Hãy đăng nhập để khám phá!         </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('DangNhap', thay_tai_khoan)}}>
              <MaterialCommunityIcons name="login" size={35} color="white" />
            </TouchableOpacity>
          </View>
        }
      <View style={styles.container}>
        <TimKiem value={tu_khoa} setValue={thay_tu_khoa} placeholder='Tìm kiếm' />
        <View style={styles.listTopic}>
            {ds_chude.map((item, index) => {
                return (
                    <ChuDe  icon={item.icon} 
                            color={item.color} 
                            name={item.name} 
                            label={item.label} 
                            key={index} 
                            onPress={() => {
                              navigation.navigate('ChuDe', { type_id:index + 1})
                              console.log("tim kiem theo chu de")
                            }} />
                )
            })}
        </View>
        <Text style={styles.title}>Khám phá</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View>
          {ket_qua && ket_qua.map((item, index) => {
            return (
              <KetQua banghi={item} key={`kq${index}`} index={index} navigation={navigation}/>
            );
          })}
        </View>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  ngang: {
    flexDirection: 'row',
  },
  listTopic: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ava: {
    width: 40,
    height: 40,
  },
});

const ds_chude = [
  {
      id: 1,
      icon: 'food-bank',
      color: '#8f60bf',
      name: 'food',
      label: 'Món ăn'
  },
  {
      id: 2,
      icon: 'medical-services',
      color: '#f291a3',
      name: 'medical',
      label: 'Y tế'
  },
  {
      id: 3,
      icon: 'airplanemode-active',
      color: '#079dd9',
      name: 'travel',
      label: 'Du lịch'
  },
  {
      id: 4,
      icon: 'computer',
      color: 'gray',
      name: 'computer',
      label: 'Điện tư'
  },
  {
      id: 5,
      icon: 'nature',
      color: '#56c596',
      name: 'nature',
      label: 'Nông nghiệp'
  },
  {
      id: 6,
      icon: 'style',
      color: '#f56a79',
      name: 'style',
      label: 'Sắc đẹp'
  },
  {
      id: 7,
      icon: 'sports-football',
      color: 'orange',
      name: 'activity',
      label: 'Thể thao'
  },
  {
      id: 8,
      icon: 'work',
      color: '#425d8a',
      name: 'work',
      label: 'Công việc'
  },
]