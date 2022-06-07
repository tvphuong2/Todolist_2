import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/SQLite'
const rgba = require('color-rgba');

export default function DangSuDung(props:any) {
    const {trangThai, thayTrangThai, buoc , color , complete , displayMota} = props;
    var trang_thai = [...trangThai]

    var TextNameBuoc = complete == "true" ? buoc.name.substring(0, 25) + "..." : buoc.name;

    function thucHien() {
        if (trang_thai[buoc.key] == "0")
        trang_thai[buoc.key] = "1"
        else if (trang_thai[buoc.key] == "1")
        trang_thai[buoc.key] = "2"
        else
        trang_thai[buoc.key] = "0"
        thayTrangThai(trang_thai)
    }
    return (
        <View style={{paddingLeft: 10, backgroundColor : 'white'}}>
            <TouchableOpacity onPress={thucHien}>
                {
                    buoc.substep==null ?
                    <View>
                        <Text style={[{color:`${color}` , fontSize : 16}, trang_thai[buoc.key] == '2' ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'}]} key={buoc.key + "b"}>{TextNameBuoc}</Text>
                        <Text style={{display: displayMota , color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                    </View>
                    :
                    <View>
                        <Text style={[{color:`${color}` , fontSize : 16 , fontWeight : '500'}, trang_thai[buoc.key] == '2' ? {textDecorationLine: 'line-through'} : {textDecorationLine: 'none'}]} key={buoc.key + "b"}>{TextNameBuoc}</Text>
                        <Text style={{display: displayMota, color: 'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                    </View>
                }
            </TouchableOpacity>
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
        backgroundColor:"pink",
    }
});
