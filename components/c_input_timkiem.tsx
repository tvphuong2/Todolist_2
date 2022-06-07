import React from "react";
import {View, StyleSheet, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = (props:{value: string, setValue: any, placeholder: string}) => {
    const {value, setValue, placeholder} = props;
    return (
        <View style={styles.search}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
            />
            <View>
            <Ionicons name="search-circle" size={35} color="#72c2fb" />
            </View>
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 10,
        paddingLeft: 20,
        height: 40,
        width: 330
    },
})