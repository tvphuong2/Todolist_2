import React, {useState} from "react";
import {View, StyleSheet, TextInput} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PasswordInput = (props:any) => {
    const {password, setPassword, placeholder} = props;
    const [nameIcon, setNameIcon]:any = useState('eye-slash');
    const [hidePassword, setHidePassword] = useState(true);

    const handleShowHidePassword = () => {
        nameIcon === 'eye' ? setNameIcon('eye-slash') : setNameIcon('eye');
        hidePassword ? setHidePassword(false) : setHidePassword(true);
    }

    return (
        <View style={styles.inputView}>
            <TextInput autoComplete='password' style={styles.input} secureTextEntry={hidePassword} placeholder={placeholder} value={password} onChangeText={setPassword} />
            <FontAwesome style={styles.icon} name={nameIcon} size={20} color="gray" onPress={handleShowHidePassword} />
        </View>
    )
}

export default PasswordInput;

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 350,
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginBottom: 20
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 15
    },
})