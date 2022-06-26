import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BinhLuan from '../components/c_view_binhluan'
import TaoBinhLuan from '../components/c_input_binhluan'
import * as API from './model/API/api';
import * as LOCAL from './model/API/Local_List';
import RNFS from 'react-native-fs';
import * as FileSystem from './model/API/FileSystem';


export default function BanGhi(props: any) {
    const { banghi } = props;
    const [danhGia, taoDanhGia]: any = useState([]);
    const [binhLuan, taoBinhLuan]: any = useState([]);
    const [binhLuanMoi, taoBinhLuanMoi]: any = useState([]);
    const [thich, daThich]: any = useState(false);
    const j_steps = JSON.parse(banghi.steps)

    useEffect(() => {
        API.APILayBanGhi(banghi.list_id, (res: any) => { })
        API.APILayDanhGia(banghi.list_id, taoDanhGia)
        API.APILayBinhLuan(banghi.list_id, taoBinhLuan)
        API.APIKiemTraThich(banghi.list_id, (res: any) => daThich(res.length > 0))
    }, []);

    function guiBinhLuan() {
        API.APITaoBinhLuan(banghi.list_id, binhLuanMoi, (res: any) => {
            API.APILayBinhLuan(banghi.list_id, (res: any) => taoBinhLuan(res.result))
        })
    }

    function nhanThich() {
        if (thich) {
            API.APIBoThich(banghi.list_id, (res: any) => { daThich(false) })
        } else {
            API.APIThich(banghi.list_id, (res: any) => { daThich(true) })
        }
    }

    async function download() {
        console.log("pip");
        FileSystem.downloadImage(banghi.image, (image: any) => {
            banghi.image = image;
            var error = true;
            LOCAL.Download(banghi, (res: any) => {
                if (res != 'Error'){
                    error = false;
                } else {
                    error = true;
                }
            });
            setTimeout(()=> {
                if(error) {
                    Alert.alert("", "Đã có bản ghi này trên máy");
                } else {
                    Alert.alert("", "Đã tải bản ghi về");
                    API.APITangLuotTaiVe(banghi.list_id);
                }
            }, 500)
        });
        
    }

    useEffect(() => {
        if (danhGia.avg == null) {
            taoDanhGia({ avg: 0 })
        }
    }, [danhGia]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.illustration}>
                {banghi && banghi.image !== '' && banghi.image !== null ?
                    <Image style={styles.img} source={{ uri: LOCAL.layAnh(banghi.image) }} /> :
                    <Image style={styles.img} source={require('../assets/images/8.png')} />
                }
                <View style={styles.download}>
                    <TouchableOpacity onPress={download}>
                        <MaterialCommunityIcons name="download" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.mainTitle}>{banghi.name}</Text>
                        <Text style={styles.desc}>{banghi.description}</Text>
                    </View>
                    <View style={styles.info}>
                        <View style={styles.type}>
                            <Text style={styles.type}>Lượt xem: {banghi.view}</Text>
                            <Text style={styles.type}>Lượt tải về: {banghi.download}</Text>
                            <Text style={styles.type}>Được thích: {danhGia.avg}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.type}>{banghi.author}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.step}>{
                    j_steps && j_steps.map((step: any, i: number) => {
                        return (
                            <View>
                                <Text style={styles.mainStep} key={`aa${i}`}>
                                    {i + 1}. {step.name}
                                </Text>
                                <Text style={styles.desc}>{step.description}</Text>
                                {
                                    step.substep && step.substep.map((child: any, j: number) => {
                                        return (
                                            <Text style={styles.childStep} key={`bb${j}`}>
                                                {child.name} <Text key={`cc${j}`} style={[styles.desc, { paddingLeft: 45 }]}>{child.description}</Text>
                                            </Text>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                </View>
            </View>

            <View style={styles.space}></View>

            <View style={styles.review}>
                <View style={styles.reviewHeader}>
                    <View style={styles.viewAll}>
                        <Text style={{ color: '#339fb7', fontSize: 20 }}>Đánh giá và bình luận </Text>
                        <Text><MaterialIcons name="navigate-next" size={20} color="#339fb7" /></Text>
                    </View>
                    <TouchableOpacity onPress={nhanThich}>
                        {thich ?
                            <MaterialCommunityIcons name="thumb-up" size={30} color="#72c2fb" /> :
                            <MaterialCommunityIcons name="thumb-up-outline" size={30} color="#72c2fb" />
                        }
                    </TouchableOpacity>
                </View>

                <TaoBinhLuan newComment={binhLuanMoi} setNewComment={taoBinhLuanMoi} handleCreateComment={guiBinhLuan} />
                {
                    binhLuan.length > 0 && binhLuan.map((comment: any, index: number) => {
                        return (
                            <BinhLuan key={`bl${index}`} comment={comment} />
                        )
                    })
                }
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 16,
        backgroundColor: 'white'
    },
    illustration: {
        flex: 1,
        // paddingTop: 30,
    },
    content: {
        flex: 3,
    },
    img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        // opacity: 0.5,
    },
    title: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
    },
    mainTitle: {
        fontSize: 30,
        fontWeight: '600',
        paddingBottom: 7,
        color: '#339fb7'
    },
    desc: {
        color: '#909090',
        fontWeight: 'normal',
        paddingLeft: 20,
    },
    download: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#339fb7',
        padding: 5,
        borderRadius: 20
    },
    info: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: '#f1f1f1',
        height: 100,
    },
    author: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    type: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#303030',
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#959595',
    },
    step: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        // lineHeight: 18,
    },
    mainStep: {
        // fontWeight: 'bold',
        // lineHeight: 30,
        // paddingBottom: 10
    },
    childStep: {
        // fontWeight: 'bold',
        paddingLeft: 30,
        paddingBottom: 10,
        color: '#000000',
    },
    back: {
        position: 'absolute',
        left: 5,
        top: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 20
    },
    space: {
        width: '100%',
        height: 10,
        backgroundColor: '#f1f1f1'
    },
    review: {
        margin: 10
    },
    reviewHeader: {
        margin: 10,
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reviewHeaderText: {
        fontWeight: '700',
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});