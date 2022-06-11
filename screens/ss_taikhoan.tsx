import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, Text, View, Alert, Modal} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import PasswordInput from '../components/c_input_matkhau';
import { RootTabScreenProps } from '../types';
import * as API from './model/API/api';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
const {width, height} = Dimensions.get('window');

export default function Dangnhap({ navigation }: any) {
    const [tai_khoan, thayTaiKhoan]:any = useState('');
    const [thong_tin, thayThongTin]:any = useState();

    useEffect(() => {
        LOCALACCOUNT.LayTaiKhoan((res:any) =>{
            thayTaiKhoan(res)
            API.APILayTongTinTaiKhoan(thayThongTin)
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{marginTop: 50, justifyContent: 'center'}}>
                {tai_khoan && tai_khoan.image && tai_khoan.image !== '' ?
                    <Image style={styles.logo} source={{ uri: API.layAnh(tai_khoan.image)}} /> :
                    <Image style={styles.logo} source={require('../assets/images/8.png')} /> 
                }
                <Text>         Chào {tai_khoan.name}!         </Text>
                {
                    thong_tin?
                    <View>
                        <Text>Views: {thong_tin.views? thong_tin.views: 0}</Text>
                        <Text>Download: {thong_tin.download? thong_tin.download: 0}</Text>
                        <Text>List count: {thong_tin.count}</Text>
                    </View>
                    :
                    <View></View>
                }
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        textAlign: 'center',
        color: '#202b4d',
        fontSize: 30,
        marginBottom: 20,
        marginTop: 20
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 350,
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    btn: {
        width: 350,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#ee4d2d',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 340
    },
    linkText: {
        marginTop: 10,
        textDecorationLine: 'underline',
        color: '#202b4d'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
    flexDirection: 'row',
    },
    buttonModal: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
    },
    modalText: {
    marginBottom: 15,
    color: 'gray'
    }
})