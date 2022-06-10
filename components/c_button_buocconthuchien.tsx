import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/Local_List'

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
        <View>
            {
                (trang_thai[buoc.key] == "0") ?
                    <TouchableOpacity onPress={thucHien} style={styles.chua_lam}>
                        <View>
                            <Text style={{color:'white'}} key={buoc.key + "b"}>{buoc.name}</Text>
                            {(buoc.description)? 
                                <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                                : <View></View>
                            }
                        </View>
                    </TouchableOpacity>
                : (trang_thai[buoc.key] == "1") ?
                    <TouchableOpacity onPress={thucHien} style={styles.dang_lam}>
                        <View>
                            <Text style={{color:'white'}} key={buoc.key + "b"}>{buoc.name}</Text>
                            {(buoc.description)? 
                                <Text style={{color:'grey'}} key={buoc.key + "bc"}>{buoc.description}</Text>
                                : <View></View>
                            }
                        </View>
                    </TouchableOpacity>
                :
                    <TouchableOpacity onPress={thucHien} style={styles.xong}>
                        <View>
                            <Text style={{color:'pink'}} key={buoc.key + "b"}>√ {buoc.name.slice(0, 40)} ...</Text>
                            {/* <View style={styles.gach_ngang}></View> */}
                        </View>
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
        borderColor:'blue', 
        borderWidth:2, 
        borderRadius:5, 
        margin: 5, 
        padding: 3
    },
    chua_lam :{
        borderWidth:2, 
        borderRadius:5, 
        margin: 5, 
        padding: 3
    },
    xong: {

    },
    gach_ngang: {
        borderTopWidth: 1,
        borderColor: 'pink',
        position: 'relative',
        top:-10,
        marginEnd:25,
    }
});