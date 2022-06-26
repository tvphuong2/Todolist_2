import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Modal, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as API from './model/API/api';
import * as LOCALACCOUNT from './model/API/Local_Account';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function TaiKhoan(props:any) {
    const {thayTaiKhoan} = props;
    const [account, setAccount]: any = useState([]);
    const [info, setInfo]: any = useState([]);
    const [image, setImage]: any = useState('');
    const [editName, setEditName]: any = useState(false);
    const [newName, setNewName]: any = useState('');

    useEffect(() => {
        LOCALACCOUNT.LayTaiKhoan((res: any) => {
            setAccount(res);
        });
        API.APILayThongTin((res: any) => {
            setInfo(res);
        });
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);            
            console.log(account);
            
            API.APIDoiAva(result.uri, (res: any) => {
                console.log(res.status);
                LOCALACCOUNT.LayTaiKhoan((res: any) => {
                    setAccount(res);
                    thayTaiKhoan(res);
                });
            });

            LOCALACCOUNT.DoiAnhDaiDien(account.account_id, result.uri, (res: any) => {
                console.log(res);
                LOCALACCOUNT.LayTaiKhoan((res: any) => {
                    setAccount(res);
                    thayTaiKhoan(res);
                });
            })
        }
        
    };

    function changeEditName () {
        const temp = editName ? false : true;
        setEditName(temp);
        setNewName(account.name);
    }
    function closeEditName() {
        setEditName(false);
    }
    function saveNewName() {
        API.APIDoiUserName(account.account_id, newName, (res:any) => {
            console.log(res);
            LOCALACCOUNT.LayTaiKhoan((res: any) => {
                setAccount(res);
                thayTaiKhoan(res);
            });
        });
        LOCALACCOUNT.DoiTen(account.account_id, newName, (res:any) => {
            console.log(res);
            thayTaiKhoan(res);

        });

        setEditName(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalView}>
                <View style={styles.account}>
                    <View style={styles.title}>
                        <View>
                            {account && account.image !== null ?
                                <Image style={styles.avatar} source={{ uri: account.image }} /> :
                                <Image style={styles.avatar} source={require('../assets/images/avatar-default.png')} />
                            }
                            <IconButton
                                icon="camera"
                                size={27}
                                onPress={pickImage}
                                style={styles.camera}
                            />
                        </View>
                        {account && editName &&
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                                <TextInput autoFocus style={styles.input} value={newName} onChangeText={setNewName} placeholder='Nhập tên mới' />
                                <TouchableOpacity onPress={closeEditName} style={{marginLeft: 5}}>
                                    <AntDesign name="closecircleo" size={24} color="#4682B4" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={saveNewName} style={{marginLeft: 5}}>
                                    <AntDesign name="checkcircleo" size={24} color="#ee5093" />
                                </TouchableOpacity>
                            </View>
                        }
                        {account && !editName &&
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                                <Text style={styles.name}>{account.name}</Text> 
                                <TouchableOpacity onPress={changeEditName}>
                                    <FontAwesome name="edit" size={24} color='#45818E' />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    
                    <View style={styles.info}>
                        <View style={styles.row}>
                            <FontAwesome name="file-text-o" size={24}  style={styles.icon} >
                                <Text style={styles.data}> {info.list}</Text>
                            </FontAwesome>
                            <FontAwesome name="eye" size={24} style={styles.icon} >
                                <Text style={styles.data}> {info.view}</Text>
                            </FontAwesome>
                        </View>
                        <View style={styles.row}>
                            <AntDesign name="like1" size={24} style={styles.icon} >
                                <Text style={styles.data}> {info.votes}</Text>
                            </AntDesign>
                            <AntDesign name="download" size={24} style={styles.icon} >
                                <Text style={styles.data}> {info.download}</Text>
                            </AntDesign>
                        </View>

                    </View>
                    {/* {image !== '' && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                </View>
            </View>



        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: 'black',
        // opacity: 0.5,
        borderRadius: 20,
        zIndex: 0,
    },
    
    modalView: {
        zIndex: 1,
        opacity: 1,
        marginTop: 20,
        padding: 20,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderColor: '#339fb7',
        paddingHorizontal: 35,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
    account: {
        // backgroundColor: '#E5E5E5',
    },
    title: {
        alignItems: 'center'
    },
    avatar: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "#73C2FB",
    },
    avatarIcon: {
        width: 170,
        height: 170,
        borderRadius: 85,
        fontSize: 50
    },
    camera: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        right: 0,
        bottom: 0,
        backgroundColor: "#D7F8FF"
    },
    icon: {
        color: "#45818E",
        marginHorizontal: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
        marginRight: 10
    },
    input: {
        width: 200,
        height: 50,
        fontSize: 18,
        fontWeight: "500",
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    info: {
        padding: 20,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        padding: 5,
    },
    data: {
        fontSize: 20,
    }

});

function rgba(arg0: number, arg1: number, arg2: number, arg3: number): any | import("react-native").ColorValue | undefined {
    throw new Error('Function not implemented.');
}