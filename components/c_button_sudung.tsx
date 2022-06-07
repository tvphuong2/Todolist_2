import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/SQLite';
import {MaterialIcons} from '@expo/vector-icons';

export default function DangSuDung(props:any) {
    const { thayBuoc, thayTrangThai, banghi, thayBanGhi, doiBanGhi} = props;
    const j_steps = JSON.parse(banghi.steps)
    var progress:any = []
    var step:any = []
    var sudung = 'black';
    function chuyenTrang() {
        if (banghi.progress == null || banghi.progress == "") {
            console.log("pip")
            for (var i = 0; i < j_steps.length; i++) {
                progress.push(0)
                for (var j=0; j < j_steps[i].substep.length; j++) {
                    progress.push(0)
                }
            }
            LOCAL.ThayTienDo(banghi.list_id, progress.toString(), (res:any) => {})
        } else {
            progress = banghi.progress.split(",")
        }

        var key = 0
        for (var i = 0; i < j_steps.length; i++) {
            j_steps[i]['key'] = key
            key+=1
            step.push(j_steps[i])
            for (var j=0; j < j_steps[i].substep.length; j++) {
                j_steps[i].substep[j]['key'] = key
                key+=1
                step.push(j_steps[i].substep[j])
            }
        }
        doiBanGhi(banghi)
        thayTrangThai(progress)
        thayBuoc(step);
        sudung = 'red';
    }
    console.log(sudung);
    return (
        <TouchableOpacity onPress={chuyenTrang}>
            {/* <Text style={[styles.icon , {backgroundColor : `${sudung}`}]} key={banghi.list_id}>{banghi.name[0] + banghi.name[1]}</Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
                <MaterialIcons name="work" size={35} color="black" />
                <Text style={{color: '#339fb7', fontSize: 20, fontWeight : 'bold', marginLeft: 10}}>{banghi.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 20,
        width:50,
        height: 50,
        padding:15,
        margin : 10 ,
        backgroundColor:"black",
        color : '#fff'
    },
});