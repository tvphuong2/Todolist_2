import { Platform, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Text, View } from '../components/Themed';
import ChuDe from '../components/c_button_chude';
import TimKiem from '../components/c_input_timkiem';
import KetQua from '../components/c_view_ketquatimkiem';
import { RootTabScreenProps } from '../types';
import * as API from './model/API/api';

export default function KhamPha({ navigation }: RootTabScreenProps<'KhamPha'>) {
  const [tu_khoa, thay_tu_khoa] = useState('');
  const [ket_qua, thay_ket_qua] = useState([]);

  useEffect(() => {
    API.APITimKiem(tu_khoa, thay_ket_qua)
  }, [tu_khoa])

  return (
    <ScrollView>
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