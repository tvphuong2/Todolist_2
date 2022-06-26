import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import * as API from '../screens/model/API/api';
import Modal from "react-native-modal";
import Banghi from '../screens/ss_banghi';

const KetQua = (props: any) => {
    const { banghi, index, navigation } = props;
    const [anh, taoAnh]: any = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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
            <TouchableOpacity key={`n${index}`} onPress={() => { setModalVisible(true)}}>
                <View>
                    {banghi && banghi.image !== '' ?
                        <View style={styles.imageView}>
                            <Image style={styles.anh} source={{ uri: API.layAnh(banghi.image) }} />
                        </View>
                        :
                        <View>
                            <Image style={styles.anh} source={require('../assets/images/8.png')} />
                        </View>
                    }
                </View>
            </TouchableOpacity>


            <View style={styles.content}>
                <TouchableOpacity key={`n${index}`} onPress={() => {setModalVisible(true);}}>
                    <Text style={styles.title}>{banghi.name}</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'gray', fontSize: 13 }}>{handleNumberView(banghi.view)}</Text>
                    <Text style={{ color: 'gray', marginLeft: 3, fontSize: 13 }}>lượt xem</Text>
                </View>
            </View>

            <Modal
                isVisible={modalVisible}
                style={styles.modal}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                // onSwipeComplete={() => setModalVisible(false)}
                propagateSwipe={true}
                // swipeDirection="down"
                >
                    <ScrollView><Banghi banghi={banghi} /></ScrollView>
                
            </Modal>
        </View>
    );
}

export default KetQua;

const styles = StyleSheet.create({
    container: {
        width: 300,
        marginTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1'
    },
    content: {

    },
    title: {
        marginVertical: 10,
        color: '#339fb7',
        fontSize: 16,
    },

    anh: {
        width: 300,
        height: 140,
        borderRadius: 10,
    },
    imageView: {
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6.27,

        elevation: 10,
    },
    modal: {
        borderRadius: 20,
        borderColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: 0,
        marginTop: 100,
    }

});