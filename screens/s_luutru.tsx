import React, { useState, useEffect } from 'react';
import { View, Image, Animated, Dimensions, StyleSheet, Text, ScrollView, TouchableOpacity, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import  BanGhi  from '../components/c_button_luutru';
import {MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { RootTabScreenProps } from '../types';
import { SwipeListView } from 'react-native-swipe-list-view';
import * as LOCAL from '../screens/model/API/SQLite';
import * as API from '../screens/model/API/api';

 
export default function LuuTru({ navigation }: RootTabScreenProps<'KhamPha'>) {

  const [ket_qua, thay_ket_qua]:any = useState(null);
  const [noi_bo, trang_noi_bo]:any = useState(true);

  function xoa (key:any) {
    if (noi_bo) {
      LOCAL.XoaBanGhi(ket_qua[key].list_id, (res:any) => {
        thay_ket_qua(ket_qua.filter((item:any) => item.key != key))
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
      LOCAL.Download(ket_qua[key].steps, ket_qua[key].image, ket_qua[key].name, ket_qua[key].description, (res:any) => {
        Alert.alert("","Đã tải bản ghi về")
      })
    }
    
  }

	useEffect(()=>{
      layDuLieuNoiBo()
    }, []);

  function layDuLieuNoiBo() {
    trang_noi_bo(true)
    LOCAL.APILayTatCa((res:any) => {
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
    }) 
  }

  function hienThiBanGhi(ban_ghi:any) {
    return (
      <Animated.View>
        <BanGhi index={ban_ghi.index} banghi={ban_ghi.item} navigation={navigation}/>
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
        <View style={styles.container}>
          <ImageBackground 
            source={{uri: 'https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg?w=2000'}} 
            resizeMode="cover" 
          >
            <View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#339fb7', fontWeight: '600', fontSize: 30, marginVertical: 15}}>Chào A!</Text>
                <Text style={{color: '#339fb7', fontSize: 16, marginBottom: 15}}>Bạn có 2 công việc đang làm</Text>
              </View>
              <View style={styles.menu}>
                {noi_bo? 
                <TouchableOpacity style={styles.menuItemActive} onPress={()=> {layDuLieuNoiBo()}}>  
                  <Text style={styles.menuTextActive}>Bộ nhớ</Text>
                </TouchableOpacity>
                : <TouchableOpacity style={styles.menuItem} onPress={()=> {layDuLieuNoiBo()}}>  
                  <Text style={styles.menuText}>Bộ nhớ</Text>
                  </TouchableOpacity>
                }
                
                {noi_bo ?
                  <TouchableOpacity style={styles.menuItem} onPress={()=> {layDuLieuTrucTuyen()}}>
                    <Text style={styles.menuText}>Máy chủ</Text>
                  </TouchableOpacity>
                  : <TouchableOpacity style={styles.menuItemActive} onPress={()=> {layDuLieuTrucTuyen()}}>
                    <Text style={styles.menuTextActive}>Máy chủ</Text>
                  </TouchableOpacity>
                }
                
              </View>
            </View>
            
            <View style={styles.body}>
              <TouchableOpacity style={styles.iconAdd}>
                <MaterialIcons name="add-circle" size={60} color="#339fb7" />
              </TouchableOpacity>
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

          </ImageBackground>
        </View>  
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    paddingTop: 25
	},
	menu: {
    flexDirection: 'row', 
    marginHorizontal:20,
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
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:150
  },
  // typeStorage: {
  //   paddingHorizontal: 15,
  // },
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
    width:200,
    alignItems: 'flex-start',
    paddingStart: 15,
    backgroundColor: '#72c2fb',
    borderRadius: 20,
    left: 0,
},
  backTextWhite: {
    color: '#FFF',
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
