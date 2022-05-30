import React from "react";
import {View, StyleSheet, TextInput} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

const SearchInput = (props:{value: string, setValue: any, placeholder: string}) => {
    const {value, setValue, placeholder} = props;
    return (
        <View style={styles.search}>
            <View>
                <EvilIcons name="search" size={24} color="black" />
            </View>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
            />
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        backgroundColor: 'white',
        margin: 10,
        paddingLeft: 20,
        height: 40,
        width: 320
    },
})