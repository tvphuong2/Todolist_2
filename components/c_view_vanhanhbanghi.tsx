import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Buoc from './c_button_buocthuchien'
import BuocCon from './c_button_buocconthuchien'
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as LOCAL from '../screens/model/API/SQLite'
import * as API from '../screens/model/API/api';

export default function VanHanhBanGhi(props:any) {
    const {banghi, i} = props;
    const [trangThai, thayTrangThai]:any = useState(null);
    const [buoc, thayBuoc]:any = useState();

    useEffect(() => {
        if (trangThai && buoc) {
            var t = [...trangThai]
            var da_sua = false
            for (var i = 0; i < buoc.length; i++) {
                if (trangThai[buoc[i]['key']] != "2") {
                    for (var j = i + 1; j < buoc.length; j++) {
                        if (t[buoc[j]['key']] != "0") {
                            t[buoc[j]['key']] = "0"
                            da_sua = true
                        }
                    }
                    break
                }
                else if (i + 1 == buoc.length)
                    console.log("DA XONG")
                else if (trangThai[buoc[i + 1]['key']] == "0") {
                    t[buoc[i+1]['key']] = "1"
                    da_sua = true
                    break
                }
            }
            LOCAL.ThayTienDo(banghi.list_id, t.toString(), (res:any) => {
                if (da_sua) thayTrangThai(t)
            })
        } 
      }, [trangThai])

    useEffect(() => {
        var progress:any = []
        var key = 0
        var json_steps = JSON.parse(banghi.steps)

        if (banghi.progress == null || banghi.progress == "") {
            console.log("pip")
            for (var i = 0; i < json_steps.length; i++) {
                progress.push(0)
                for (var j=0; j < json_steps[i].substep.length; j++) {
                    progress.push(0)
                }
            }
            progress[0] = 1
            LOCAL.ThayTienDo(banghi.list_id, progress.toString(), (res:any) => {})
        } else {
            progress = banghi.progress.split(",")
        }
        
        for (var i = 0; i < json_steps.length; i++) {
            json_steps[i]['key'] = key
            key+=1
            for (var j=0; j < json_steps[i].substep.length; j++) {
                json_steps[i].substep[j]['key'] = key
                key+=1
            }
        }
        thayBuoc(json_steps)
        thayTrangThai(progress)
    }, [])


    return (
        <View>
            <Text style={{color:'white', marginTop:40}}>----------------------------------------</Text>
            <Text style={{color:'white'}}>{banghi.name}</Text>
            <Text style={{color:'white', marginBottom:20}}>----------------------------------------</Text>
            {
                buoc && buoc.map((step:any, i:number) => {
                return (
                    <View>
                        <Buoc trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={step} stt={i + 1 + "."}/>
                        {
                            trangThai[step['key']] == "1" && step.substep && step.substep.map((substep:any, j:number) => {
                                return (
                                <View style= {{marginStart:40}}>
                                    <BuocCon trangThai={trangThai} thayTrangThai={thayTrangThai} buoc={substep}/>
                                </View>
                            )})
                        }
                    </View>
                )})
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
});