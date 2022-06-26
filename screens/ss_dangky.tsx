import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Dimensions, TouchableOpacity, Alert, Modal } from 'react-native';
import PasswordInput from '../components/c_input_matkhau';
import { useNavigation } from '@react-navigation/native';
import * as API from './model/API/api';

const { width, height } = Dimensions.get('window');

export default function DangKy({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [e_signup, setE_signup] = useState('');

    const handleSubmit = () => {
        console.log("Đang đăng ký")
        if (password !== repeatPassword) {
            setModalVisible(true);
            return;
        }
        API.dangKy(email, name, password, (res: any) => {
            console.log(res);
            if (res.status != "Thành công") {
                setE_signup('Thông tin đăng ký không đúng')
            } else {
                console.log("aaaaa");
                Alert.alert("Đăng ký tài khoản thành công")
                navigation.navigate('DangNhap');
            }
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.logo} source={require('../assets/images/logo.png')} />
            </View>
            <View>
                <Text style={styles.header}>Đăng ký</Text>
            </View>
            <View>
                <TextInput autoComplete='email' autoCapitalize="none" style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} autoCapitalize="none" placeholder='Tên' value={name} onChangeText={setName} />
                <PasswordInput password={password} setPassword={setPassword} placeholder='Mật khẩu' />
                <PasswordInput password={repeatPassword} setPassword={setRepeatPassword} placeholder='Nhập lại mật khẩu' />
            </View>
            <Text>{e_signup}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
            <Text>Bạn đã có tài khoản?
                <TouchableOpacity onPress={() => navigation.navigate('DangNhap')} >
                    <Text style={styles.linkText}> Đăng nhập</Text>
                </TouchableOpacity>
            </Text>

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Mật khẩu không khớp</Text>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.buttonModal}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text>Đồng ý</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        backgroundColor: '#abe7ff'
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
    input: {
        width: 350,
        height: 50,
        paddingLeft: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        borderRadius: 25
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