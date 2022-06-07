import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as API from '../screens/model/API/api'

const KetQua = (props: any) => {
    const { banghi, index, navigation } = props;
    const [anh, taoAnh]:any = useState([]);
    // console.log(banghi)

    const handleNumberView = (number: number) => {
        if (number < 1000) {
            return number;
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return (number / 1000000).toFixed(1) + "M";
        }
    }

    // var storageList = [];
    // var steps = [];

    return (
        <View style={styles.container} key={`k${index}`}>
            <TouchableOpacity key={`n${index}`} onPress={() => navigation.navigate('BanGhi', {banghi})}>
                <View>
                {banghi && banghi.image !== '' ?
                    <Image style={styles.anh} source={{ uri: API.layAnh(banghi.image)}} /> :
                    <Image style={styles.anh} source={require('../assets/images/8.png')} /> 
                }
                </View>
                <View>
                    <Text style={{color: 'gray', fontSize: 12}}>{banghi.name}</Text>
                </View>
            </TouchableOpacity>

        
            <View>
                <View>
                    <View style={{flexDirection: 'row',}}>
                        <Text style={{color: 'gray', fontSize: 12}}>{handleNumberView(banghi.view)}</Text>
                        <Text style={{color: 'gray', marginLeft: 3, fontSize: 12}}>lượt xem</Text>
                    </View>
                </View>
                

            </View>
        </View>
    );
}

export default KetQua;

const styles = StyleSheet.create({
    container: {
        // width: 200,
        // height:80,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
    },
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        margin: 5

    },
    titleText: {
        textAlign: 'center',
        overflow: 'hidden',
        lineHeight: 20,
        height: 40
    },
    view: {
        margin: 5,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 35
    },

    anh: {
        width:300,
        height:150,
        borderRadius: 10,
    }

});