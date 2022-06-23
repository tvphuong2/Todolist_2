import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TextInput, Dimensions, TouchableOpacity, Text, View, Alert, Modal } from 'react-native';
// import {  } from '../components/Themed';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import PasswordInput from '../components/c_input_matkhau';
import { RootTabScreenProps } from '../types';
import * as API from './model/API/api';
import * as LOCALLIST from './model/API/Local_List';
import * as LOCALACCOUNT from './model/API/Local_Account';
const { width, height } = Dimensions.get('window');
import * as FileSystem from './model/API/FileSystem';


export default function Dangnhap({ navigation, route }: any) {
    let thay_tai_khoan = route.params
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [e_login, setE_login] = useState('');
    const [account, setAccount]: any = useState([]);

    async function dangNhap() {
        console.log("dang dang nhap")
        LOCALACCOUNT.createAccount();
        API.dangNhap(email, password, (res: any) => {
            // console.log(res)
            if (res.status != "thanhcong") {
                setE_login('Tên đăng nhập hoặc mật khẩu sai')
            } else {
                API.APILayTacGia(res.id, (result: any) => {
                    setAccount(result);
                })
            }
        });
        account.image = await FileSystem.downloadImage(account.image);
        LOCALACCOUNT.DangNhap(account, (res: any) => {
            console.log("Đăng nhập thành công");
            LOCALACCOUNT.LayTaiKhoan((res: any) => {
                thay_tai_khoan = res;
                navigation.navigate('KhamPha');
            })
        })
    }



    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            </View>
            <View>
                <Text style={styles.header}>Đăng nhập</Text>
            </View>
            <View>
                <View style={styles.inputView}>
                    <TextInput autoComplete='email' style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
                </View>
                <PasswordInput password={password} setPassword={setPassword} placeholder='Mật khẩu' />
            </View>
            <Text>{e_login}</Text>
            <TouchableOpacity style={styles.btn} onPress={dangNhap}>
                <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>


            <TouchableOpacity>
                <View style={styles.footer}>
                    <View>
                        {/* <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Dangky')}> */}
                        <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
                            <Text style={styles.linkText}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>Quên mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
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
        backgroundColor: '#abe7ff'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        textAlign: 'center',
        color: '#339fb7',
        fontSize: 30,
        fontWeight: '600',
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
        paddingLeft: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 25
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    btn: {
        width: 350,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#339fb7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
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