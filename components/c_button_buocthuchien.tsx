import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/SQLite'

export default function DangSuDung(props:any) {
    const {trangThai, thayTrangThai, buoc} = props;
    var trang_thai = [...trangThai]


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
        <View>
            <TouchableOpacity onPress={thucHien}>
                {
                    buoc.substep==null ?
                    <View style={{marginStart:30}}>
                        <Text style={{color:'white'}} key={buoc.key + "b"}>{buoc.name}</Text>
                        <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                    </View>
                    :
                    <View>
                        <Text style={{color:'white'}} key={buoc.key + "b"}>{buoc.name}</Text>
                        <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
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
        backgroundColor:"blue",
    },
});