import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity, TouchableHighlight, Alert, ImageBackground, Modal } from 'react-native';
import BanGhi from '../components/c_button_luutru';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { RootTabScreenProps } from '../types';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
import * as API from '../screens/model/API/api';
import * as FileSystem from '../screens/model/API/FileSystem';
import TaiKhoan from './ss_taikhoan';


export default function LuuTru({ navigation, route }: any) {
  const { capNhat } = route.params
  const [ket_qua, thay_ket_qua]: any = useState(null);
  const [noi_bo, trang_noi_bo]: any = useState(true);
  const [tai_khoan, thay_tai_khoan]: any = useState([]);
  const [modalVisible, setModalVisible] = useState(false);


  function logout() {
    // LOCAL.XoaTaiKhoan((res:any)=> {
    //     thay_tai_khoan(null)
    // })
  }

  function xoa(key: any) {
    if (noi_bo) {
      LOCALLIST.deleteList(ket_qua[key].list_id, (res: any) => {
        thay_ket_qua(ket_qua.filter((item: any) => item.key != key))
        FileSystem.deleteImg(ket_qua[key].image)
      })
    } else {
      Alert.alert("", "Xóa bản ghi thành công!!\n Thật ra là chưa làm cái này :v")
      thay_ket_qua(ket_qua.filter((item: any) => item.key != key))
    }
  }

  function chuyenDuLieu(key: any) {
    if (noi_bo) {
      Alert.alert("", "Tải bản ghi thành công!!\n Thật ra là chưa làm cái này :v")
    } else {
      LOCALLIST.Download(ket_qua[key], (res: any) => {
        if (res == 'ThanhCong')
          Alert.alert("", "Đã tải bản ghi về");
        else Alert.alert("", "Đã có bản ghi này trên máy");
      })
    }

  }

  useEffect(() => {
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
    LOCALLIST.getAll((res: any) => {
      for (var i = 0; i < res.length; i++) {
        res[i]['key'] = i
      }
      thay_ket_qua(res)
    })
  }

  function layDuLieuTrucTuyen() {
    trang_noi_bo(false)
    API.APILayTatCa((res: any) => {
      for (var i = 0; i < res.length; i++) {
        res[i]['key'] = i
      }
      thay_ket_qua(res)
      // console.log(res);
    })
  }

  function hienThiBanGhi(ban_ghi: any) {
    return (
      <Animated.View>
        <BanGhi index={ban_ghi.index} banghi={ban_ghi.item} navigation={navigation} capNhat={capNhat.capNhat} />
      </Animated.View>
    )
  }

  function hienThiNen(data: any) {
    return (
      <View style={styles.rowBack}>
        <TouchableHighlight
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => { Alert.alert("", "Tải bản ghi lên server thành công") }}
        >
          {
            noi_bo ? <MaterialCommunityIcons name="earth" size={35} color="white" />
              : <MaterialCommunityIcons name="database" size={35} color="white" />
          }
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => { xoa(data.item.key) }}>
          <MaterialCommunityIcons name="trash-can" size={35} color="white" />
        </TouchableHighlight>
      </View>
    )
  }

  var last_key = "a"
  var huong = ""
  function khiVuot(swipeData: any) {
    const { key, value } = swipeData;
    if (value < -Dimensions.get('window').width / 3 && (key != last_key || huong == "t")) {
      last_key = key
      huong = "p"
      xoa(key)
    }
    if (value > Dimensions.get('window').width / 3 && (key != last_key || huong == "p")) {
      last_key = key
      huong = "t"
      chuyenDuLieu(key)
    }
  };

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={{ flex: 1, }}>
      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=2000' }}
        resizeMode="cover"
      >
        {
          tai_khoan && tai_khoan.email ?
            <View style={{ marginBottom: 15 }}>
              <View style={{ flexDirection: 'row', paddingTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  {
                    tai_khoan.image && tai_khoan.image !== '' ?
                      <Image style={styles.ava} source={{ uri: tai_khoan.image }} />
                      : <Image style={styles.ava} source={require('../assets/images/8.png')} />
                  }
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <SwipeListView
                    // data={ket_qua}
                    // renderItem={hienThiBanGhi}
                    // renderHiddenItem={hienThiNen}
                    rightOpenValue={-Dimensions.get('window').width / 6}
                    leftOpenValue={Dimensions.get('window').width / 6}
                    previewRowKey={'0'}
                    previewOpenValue={-Dimensions.get('window').width}
                    previewOpenDelay={1000}
                    onSwipeValueChange={closeModal}
                    useNativeDriver={false}
                  ><TaiKhoan /></SwipeListView>

                  
                </Modal>
                <Text style={{ color: '#339fb7', fontWeight: '600', fontSize: 20, marginVertical: 15 }}>Chào {tai_khoan.name}!</Text>
              </View>
              <TouchableOpacity style={styles.logout} onPress={logout}>
                <AntDesign name="logout" size={30} color="white" />
              </TouchableOpacity>
            </View>
            :
            <View style={{ flexDirection: 'row', marginVertical: 30, marginRight: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ color: '#339fb7', fontWeight: '700', marginRight: 10 }}>Hãy đăng nhập để lưu trữ!</Text>
              <TouchableOpacity onPress={() => { navigation.navigate('DangNhap', thay_tai_khoan) }}>
                <AntDesign name="login" size={30} color="#339fb7" />
              </TouchableOpacity>
            </View>
        }


        <View style={styles.menu}>
          {
            tai_khoan && tai_khoan.email && noi_bo ?
              <TouchableOpacity style={styles.menuItemActive} onPress={() => { layDuLieuNoiBo() }}>
                <Text style={styles.menuTextActive}>Bộ nhớ</Text>
              </TouchableOpacity> :
              noi_bo ?
                <TouchableOpacity style={[styles.menuItemActive, { width: '97%' }]} onPress={() => { layDuLieuNoiBo() }}>
                  <Text style={styles.menuTextActive}>Bộ nhớ</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.menuItem} onPress={() => { layDuLieuNoiBo() }}>
                  <Text style={styles.menuText}>Bộ nhớ</Text>
                </TouchableOpacity>
          }
          {
            tai_khoan && tai_khoan.email && noi_bo ?
              <TouchableOpacity style={styles.menuItem} onPress={() => { layDuLieuTrucTuyen() }}>
                <Text style={styles.menuText}>Máy chủ</Text>
              </TouchableOpacity>
              : tai_khoan && tai_khoan.email && !noi_bo ?
                <TouchableOpacity style={styles.menuItemActive} onPress={() => { layDuLieuTrucTuyen() }}>
                  <Text style={styles.menuTextActive}>Máy chủ</Text>
                </TouchableOpacity>
                : <View></View>
          }

        </View>
        <View style={styles.body}>
          <SwipeListView
            data={ket_qua}
            renderItem={hienThiBanGhi}
            renderHiddenItem={hienThiNen}
            rightOpenValue={-Dimensions.get('window').width / 6}
            leftOpenValue={Dimensions.get('window').width / 6}
            previewRowKey={'0'}
            previewOpenValue={-Dimensions.get('window').width}
            previewOpenDelay={1000}
            onSwipeValueChange={khiVuot}
            useNativeDriver={false}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  logout: {
    position: 'absolute',
    top: 25,
    right: 10,
    backgroundColor: '#339fb7',
    padding: 5,
    borderRadius: 20
  },
  menu: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  menuItemActive: {
    width: '47%',
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#339fb7',
    borderRadius: 16
  },
  menuItem: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextActive: {
    color: 'white',
    fontWeight: '800'
  },
  menuText: {
    color: '#339fb7',
    fontWeight: '800'
  },
  add: {
    color: "#4682B4",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150
  },
  // rowFront: {
  //   alignItems: 'center',
  //   backgroundColor: '#CCC',
  //   borderBottomColor: 'black',
  //   borderBottomWidth: 1,
  //   justifyContent: 'center',
  //   height: 50,
  // },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f9c8bd',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: "wrap",
    height: 80,
    marginVertical: 10,
    marginHorizontal: 20,
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
    width: 200,
    alignItems: 'flex-start',
    paddingStart: 15,
    backgroundColor: '#72c2fb',
    borderRadius: 20,
    left: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  ava: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15
  },
  body: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%'
  },
  iconAdd: {
    position: 'absolute',
    right: 10,
    top: 350,
    zIndex: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  }
});
