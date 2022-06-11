import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import  BanGhi  from '../components/c_button_luutru';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { RootTabScreenProps } from '../types';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
import * as API from '../screens/model/API/api';
import * as FileSystem from '../screens/model/API/FileSystem';
 
export default function LuuTru({navigation, route}:any) {
  const {capNhat} = route.params
  const [ket_qua, thay_ket_qua]:any = useState(null);
  const [noi_bo, trang_noi_bo]:any = useState(true);
  const [tai_khoan, thay_tai_khoan]:any = useState([]);

  function logout() {
    // LOCAL.XoaTaiKhoan((res:any)=> {
    //     thay_tai_khoan(null)
    // })
  }

  function xoa (key:any) {
    if (noi_bo) {
      LOCALLIST.deleteList(ket_qua[key].list_id, (res:any) => {
        thay_ket_qua(ket_qua.filter((item:any) => item.key != key))
        FileSystem.deleteImg(ket_qua[key].image)
      })
    } else {
      Alert.alert("","Xóa bản ghi thành công!!\n Thật ra là chưa làm cái này :v")
      thay_ket_qua(ket_qua.filter((item:any) => item.key != key))
    }
  }

  function chuyenDuLieu(key:any) {
    if (noi_bo) {
      Alert.alert("","Tải bản ghi thành công!!\n Thật ra là chưa làm cái này :v")
    } else {
      LOCALLIST.Download(ket_qua[key], (res:any) => {
        Alert.alert("","Đã tải bản ghi về")
      })
    }
    
  }

	useEffect(()=>{
      layDuLieuNoiBo()
      LOCALACCOUNT.LayTaiKhoan(thay_tai_khoan);
      const willFocusSubscription = navigation.addListener('focus', () => {
        layDuLieuNoiBo()
        LOCALACCOUNT.LayTaiKhoan(thay_tai_khoan);
      });

    return willFocusSubscription;
    }, []);

  function layDuLieuNoiBo() {
    trang_noi_bo(true)
    LOCALLIST.getAll((res:any) => {
      for (var i = 0; i < res.length; i++) {
        res[i]['key'] = i
      }
      thay_ket_qua(res)
    }) 
  }

  function layDuLieuTrucTuyen() {
    trang_noi_bo(false)
    API.APILayTatCa((res:any) => {
      for (var i = 0; i < res.length; i++) {
        res[i]['key'] = i
      }
      thay_ket_qua(res)
      // console.log(res);
    }) 
  }

  function hienThiBanGhi(ban_ghi:any) {
    return (
      <Animated.View>
        <BanGhi index={ban_ghi.index} banghi={ban_ghi.item} navigation={navigation} capNhat={capNhat.capNhat}/>
      </Animated.View>
    )
  }

  function hienThiNen (data:any) {
    return (
      <View style={styles.rowBack}>
          <TouchableHighlight 
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={() => {Alert.alert("","Tải bản ghi lên server thành công")}}
            >
              {
                noi_bo? <MaterialCommunityIcons name="earth" size={35} color="white" />
                : <MaterialCommunityIcons name="database" size={35} color="white" />
              }
          </TouchableHighlight>
          <TouchableHighlight 
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => {xoa(data.item.key)}}>
              <MaterialCommunityIcons name="trash-can" size={35} color="white" />
          </TouchableHighlight>
      </View>
    )
    }

  var last_key = "a"
  var huong = ""
  function khiVuot(swipeData:any) {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width/3 &&( key != last_key || huong == "t")) {
        last_key = key
        huong = "p"
        xoa(key)
    }
    if (value > Dimensions.get('window').width/3 && (key != last_key||huong == "p")) {
        last_key = key
        huong = "t"
        chuyenDuLieu(key)
    }
  };

	return (
        <View style={{flex: 1, paddingTop: 15}}>
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
                <Text style={{color:'white'}}>         Chào {tai_khoan.name}!         </Text>
                <TouchableOpacity onPress={logout}>
                  <MaterialCommunityIcons name="logout" size={35} color="white" />
                </TouchableOpacity>
              </View>
              :
              <View style={{flexDirection: 'row', marginTop: 50, justifyContent: 'center'}}>
                <Text style={{color:'white'}}>         Hãy đăng nhập để lưu trữ!         </Text>
                <TouchableOpacity onPress={() => {navigation.navigate('DangNhap', thay_tai_khoan)}}>
                  <MaterialCommunityIcons name="login" size={35} color="white" />
                </TouchableOpacity>
              </View>
            }
          <Text></Text>



          <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:70}}>
            <TouchableHighlight onPress={()=> {layDuLieuNoiBo()}}>  
              {
                noi_bo? <MaterialCommunityIcons name="database" size={35} color="white" />
                : <MaterialCommunityIcons name="database" size={35} color="grey" />
              }
            </TouchableHighlight>
            {
              tai_khoan && tai_khoan.email?
              <TouchableHighlight onPress={()=> {layDuLieuTrucTuyen()}}>
              {
                noi_bo? <MaterialCommunityIcons name="earth" size={35} color="grey" />
                  : <MaterialCommunityIcons name="earth" size={35} color="white" />
                }
              </TouchableHighlight>
              :
              <View></View>
            }

          </View>
            <View style={{flex: 0.92}}>
                <SwipeListView
                  data={ket_qua}
                  renderItem={hienThiBanGhi}
                  renderHiddenItem={hienThiNen}
                  rightOpenValue={-Dimensions.get('window').width/6}
                  leftOpenValue={Dimensions.get('window').width/6}
                  previewRowKey={'0'}
                  previewOpenValue={-Dimensions.get('window').width}
                  previewOpenDelay={1000}
                  onSwipeValueChange={khiVuot}
                  useNativeDriver={false}
                />
            </View>
        </View>  
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    paddingTop: 20,
	},
	menu: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  add: {
    color: "#4682B4",
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:150
  },
  typeStorage: {
    paddingHorizontal: 15,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: "wrap",
      height: 100,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 20,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnRight: {
      borderRadius: 20,
      right: 0,
  },
  backRightBtnLeft: {
    width:200,
    alignItems: 'flex-start',
    paddingStart: 15,
    backgroundColor: 'blue',
    borderRadius: 20,
    left: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  ava: {
    width: 40,
    height: 40,
  },
});
