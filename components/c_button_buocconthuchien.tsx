import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/SQLite'

export default function BuocCon(props:any) {
    const {trangThai, thayTrangThai, buoc} = props;
    var trang_thai = [...trangThai]

    function thucHien() {
        if      (trang_thai[buoc.key] == "0")   trang_thai[buoc.key] = "1"
        else if (trang_thai[buoc.key] == "1")   trang_thai[buoc.key] = "2"
        else                                    trang_thai[buoc.key] = "0"
        thayTrangThai(trang_thai)
    }

    return (
        <View style={{marginHorizontal: 10, marginBottom: 5}}>
            {
                (trang_thai[buoc.key] == "0") ?
                <View>
                    <TouchableOpacity onPress={thucHien} style={styles.chua_lam}>
                        <FontAwesome name="circle-thin" size={24} color="#339fb7" />
                        <Text style={{color:'black', fontSize: 15, marginLeft: 5}} key={buoc.key + "b"}>{buoc.name}</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft: 25}}>
                        {(buoc.description)? 
                            <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                            : <View></View>
                        }
                    </View>
                </View>
                : (trang_thai[buoc.key] == "1") ?
                <View>
                    <TouchableOpacity onPress={thucHien} style={styles.dang_lam}>
                        <FontAwesome name="circle" size={24} color="#339fb7" />
                        <Text style={{color:'black', fontSize: 15, marginLeft: 5}} key={buoc.key + "b"}>{buoc.name}</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft: 25}}>
                        {(buoc.description)? 
                            <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                            : <View></View>
                        }
                    </View>
                </View>
                :
                    <TouchableOpacity onPress={thucHien} style={styles.xong}>
                        <FontAwesome name="circle" size={24} color="#ee5093" />
                        <Text style={{color:'#ee5093', fontSize: 15, marginLeft: 5, textDecorationLine: 'line-through'}} key={buoc.key + "b"}>{buoc.name.slice(0, 40)} ...</Text>
                        {/* <View style={styles.gach_ngang}></View> */}
                    </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 20,
        width:50,
        height: 50,
        padding:15,
        margin:20,
        backgroundColor:"blue",
    },
    dang_lam :{
        // borderColor:'blue', 
        // borderWidth:2, 
        // borderRadius:5, 
        // margin: 5, 
        // padding: 3
        flexDirection : 'row' ,
    },
    chua_lam :{
        // borderWidth:2, 
        // borderRadius:5, 
        // margin: 5, 
        // padding: 3
        flexDirection : 'row' ,
    },
    xong: {
        flexDirection : 'row' ,
    },
    gach_ngang: {
        borderTopWidth: 1,
        borderColor: 'pink',
        position: 'relative',
        top:-10,
        marginEnd:25,
    }
});