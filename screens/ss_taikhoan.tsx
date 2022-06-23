import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as API from './model/API/api';
import * as LOCALACCOUNT from './model/API/Local_Account';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function TaiKhoan() {
    const [account, setAccount]: any = useState([]);

    useEffect(() => {
        LOCALACCOUNT.LayTaiKhoan((res: any) => {
            setAccount(res);
        })
    }, []);

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
                                // onPress={pickImage}
                                style={styles.camera}
                            />
                        </View>
                        {account && <Text style={styles.name}>
                            {account.name}{ }
                            <FontAwesome name="edit" size={24} style={styles.icon} />
                        </Text>}
                    </View>
                    <View style={styles.info}>
                        <View style={styles.row}>
                            <FontAwesome name="file-text-o" size={24}  style={styles.icon} >
                                <Text style={styles.data}> 4</Text>
                            </FontAwesome>
                            <FontAwesome name="eye" size={24} style={styles.icon} >
                                <Text style={styles.data}> 4</Text>
                            </FontAwesome>
                        </View>
                        <View style={styles.row}>
                            <AntDesign name="like1" size={24} style={styles.icon} >
                                <Text style={styles.data}> 4</Text>
                            </AntDesign>
                            <AntDesign name="download" size={24} style={styles.icon} >
                                <Text style={styles.data}> 4</Text>
                            </AntDesign>
                        </View>

                    </View>
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
        marginTop: 10
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
