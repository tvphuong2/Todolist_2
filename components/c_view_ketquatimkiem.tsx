import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as API from '../screens/model/API/api';
import { AntDesign } from '@expo/vector-icons';

const KetQua = (props: any) => {
    const { banghi, index, navigation } = props;
    const [anh, taoAnh]:any = useState([]);

    const handleNumberView = (number: number) => {
        if (number < 1000) {
            return number;
        } else if (number < 1000000) {
            return (number / 1000).toFixed(1) + 'K';
        } else {
            return (number / 1000000).toFixed(1) + "M";
        }
    }
    // console.log(banghi);
    // var storageList = [];
    // var steps = [];

    return (
        <View style={styles.container} key={`k${index}`}>
            <TouchableOpacity key={`n${index}`} onPress={() => navigation.navigate('BanGhi', {banghi})}>
                <View style={{backgroundColor : 'white' , borderRadius : 12}}>
                {banghi && banghi.image !== '' ?
                    <Image style={styles.anh} source={{ uri: API.layAnh(banghi.image)}} /> :
                    <Image style={styles.anh} source={require('../assets/images/8.png')} /> 
                }
                </View>
                <View style={{position : 'absolute' , borderRadius : 4 ,  top : 5 , left : 5}}>
                    <Text style={{color: 'black', fontSize: 18 , fontWeight : '700'}}>{banghi.name}</Text>
                </View>
                <View style={{position : 'absolute' , borderRadius : 5 ,  bottom : 10 , left : 20}}>
                    <View style={{flexDirection: 'row', alignItems : 'center'}}>
                        <AntDesign name="eye" size={24} color="black" style={{marginRight : 4}} />
                        <Text style={{color: 'black', fontSize: 15 , fontWeight : '700'}}>{handleNumberView(banghi.view)}</Text>
                        {/* <Text style={{color: 'black', marginLeft: 3, fontSize: 12}}>lượt xem</Text> */}
                    </View>
                </View>
                <View style={{position : 'absolute' , borderRadius : 5 ,  bottom : 10 , right : 20}}>
                    <View style={{flexDirection: 'row', alignItems : 'center'}}>
                        <AntDesign name="like1" size={24} color="black" />
                        <Text style={{color: 'black', fontSize: 15 , fontWeight : '700'}}>{banghi.l}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
        position : 'relative'
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
        borderRadius: 12 ,
        opacity : 0.4
    }

});