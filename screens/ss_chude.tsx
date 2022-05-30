import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import TimKiem from '../components/c_input_timkiem';
import KetQua from '../components/c_view_ketquatimkiem';
import * as API from './model/API/api';

export default function TimKiemChuDe({ navigation, route }: any) {
    const [ket_qua, thay_ket_qua] = useState([]);
    const [keySearch, setKeySearch] = useState('');
    const {type_id} = route.params

    useEffect(() => {
        API.APITimKiemTheLoai(type_id, thay_ket_qua)
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <ScrollView style={{flex: 0.92}}>
                <View style={styles.header}>
                    <TimKiem value={keySearch} setValue={setKeySearch} placeholder="tìm kiếm" />
                </View>


                <View style={styles.list}>
                    {ket_qua && ket_qua.map((item, index) => {
                        return (
                        <KetQua banghi={item} key={`kq${index}`} index={index} navigation={navigation}/>
                        );
                    })}
                </View>
                </ScrollView>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        width: '100%', 
    },
    back: {
        padding: 0,
        margin: 0
    },
    listTopic: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 10
    },
});