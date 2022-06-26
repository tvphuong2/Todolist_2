import { Platform, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, Alert, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';
import ChuDe from '../components/c_button_chude';
import TimKiem from '../components/c_input_timkiem';
import KetQua from '../components/c_view_ketquatimkiem';
import { RootTabScreenProps } from '../types';
import * as API from './model/API/api';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
import TaiKhoan from './ss_taikhoan';
import Modal from "react-native-modal";




export default function KhamPha({ navigation }: RootTabScreenProps<'KhamPha'>) {
  const [tu_khoa, thay_tu_khoa] = useState('');
  const [ket_qua, thay_ket_qua] = useState([]);
  const [tai_khoan, thay_tai_khoan]: any = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    LOCALACCOUNT.LayTaiKhoan(thay_tai_khoan);
    const willFocusSubscription = navigation.addListener('focus', () => {
      LOCALACCOUNT.LayTaiKhoan(thay_tai_khoan);
    });
    return willFocusSubscription;
  }, [])

  useEffect(() => {
    API.APITimKiem(tu_khoa, thay_ket_qua);
    const willFocusSubscription = navigation.addListener('focus', () => {
      API.APITimKiem(tu_khoa, thay_ket_qua);
    });
    return willFocusSubscription;
  }, [tu_khoa])

  useEffect(() => {
    API.APITimKiem(tu_khoa, thay_ket_qua);
    const willFocusSubscription = navigation.addListener('focus', () => {
      API.APITimKiem(tu_khoa, thay_ket_qua);
    });
    return willFocusSubscription;
  }, [tai_khoan])

  function logout() {
    LOCALACCOUNT.DangXuat((res: any) => {
      thay_tai_khoan(null);
    })
  }



  return (
    <ScrollView>
      <View style={{ backgroundColor: '#abe7ff', alignItems: 'center', justifyContent: 'center' }}>
        {
          tai_khoan && tai_khoan.email ?
            <View style={{ marginBottom: 15, width: '100%' }}>
              <View style={{ flexDirection: 'row', paddingTop: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#abe7ff' }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  {
                    tai_khoan.image && tai_khoan.image !== '' ?
                      <Image style={styles.ava} source={{ uri: tai_khoan.image }} />
                      : <Image style={styles.ava} source={require('../assets/images/avatar-default.png')} />
                  }
                </TouchableOpacity>

                <Modal
                  isVisible={modalVisible}
                  style={{ justifyContent: 'flex-end', margin: 0 }}
                  onBackdropPress={() => setModalVisible(false)}
                  onBackButtonPress={() => setModalVisible(false)}
                  onSwipeComplete={() => setModalVisible(false)}
                  swipeDirection="down"

                >

                  <TaiKhoan />
                </Modal>
                <Text style={{ color: '#339fb7', fontWeight: '600', fontSize: 20, marginVertical: 15, marginLeft: 10 }}>Chào {tai_khoan.name}!</Text>
              </View>
              <TouchableOpacity style={styles.logout} onPress={logout}>
                <AntDesign name="logout" size={30} color="white" />
              </TouchableOpacity>
            </View>
            :
            <View style={{ flexDirection: 'row', marginVertical: 30, marginRight: 10, alignItems: 'center', justifyContent: 'flex-end', width: '100%', backgroundColor: '#abe7ff' }}>
              <Text style={{ color: '#339fb7', fontWeight: '700', marginRight: 10 }}>Hãy đăng nhập để lưu trữ!</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('DangNhap', thay_tai_khoan) }}>
                <AntDesign name="login" size={30} color="#339fb7" />
              </TouchableOpacity>
            </View>
        }
        <TimKiem value={tu_khoa} setValue={thay_tu_khoa} placeholder='Tìm kiếm' />

        <View style={styles.container}>

          <View style={styles.listTopic}>
            <ScrollView horizontal={true}>
              <View style={styles.listTopic}>
                {ds_chude.map((item, index) => {
                  return (
                    <ChuDe
                      icon={item.icon}
                      color={item.color}
                      name={item.name}
                      label={item.label}
                      key={index}
                      onPress={() => {
                        navigation.navigate('ChuDe', { type_id: index + 1 })
                        console.log("tim kiem theo chu de")
                      }}
                    />
                  )
                })}
              </View>
            </ScrollView>
          </View>
          {/* <Text style={styles.title}>Khám phá</Text> */}
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View>
            {ket_qua && ket_qua.map((item, index) => {
              return (
                <KetQua banghi={item} key={`kq${index}`} index={index} navigation={navigation} />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white'
  },
  logout: {
    position: 'absolute',
    top: 20,
    right: 10,
    backgroundColor: '#339fb7',
    padding: 5,
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    // height: 1,
    // width: '80%',
  },
  ngang: {
    flexDirection: 'row',
  },
  listTopic: {
    flexDirection: 'row',
    // flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ava: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#73C2FB",
  },
});

const ds_chude = [
  {
    id: 1,
    icon: 'food-bank',
    // color: '#8f60bf',
    color: 'white',
    name: 'food',
    label: 'Món ăn'
  },
  {
    id: 2,
    icon: 'medical-services',
    // color: '#f291a3',
    color: 'white',
    name: 'medical',
    label: 'Y tế'
  },
  {
    id: 3,
    icon: 'airplanemode-active',
    // color: '#079dd9',
    color: 'white',
    name: 'travel',
    label: 'Du lịch'
  },
  {
    id: 4,
    icon: 'computer',
    // color: 'gray',
    color: 'white',
    name: 'computer',
    label: 'Điện tư'
  },
  {
    id: 5,
    icon: 'nature',
    // color: '#56c596',
    color: 'white',
    name: 'nature',
    label: 'Nông nghiệp'
  },
  {
    id: 6,
    icon: 'style',
    // color: '#f56a79',
    color: 'white',
    name: 'style',
    label: 'Sắc đẹp'
  },
  {
    id: 7,
    icon: 'sports-football',
    // color: 'orange',
    color: 'white',
    name: 'activity',
    label: 'Thể thao'
  },
  {
    id: 8,
    icon: 'work',
    // color: '#425d8a',
    color: 'white',
    name: 'work',
    label: 'Công việc'
  },
]