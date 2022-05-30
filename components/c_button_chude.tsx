import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const ChuDe = (props: any) => {
    const { icon, color, name, label, onPress } = props;
    return (
        <View style={styles.container}>
            <View style={styles.iconButton}>
                <IconButton
                    onPress={onPress}
                    icon={() => (
                        <MaterialIcons name={icon} size={35} color={color} />
                    )}
                />
            </View>
            <Text style={styles.title}>{label}</Text>
        </View>

    );
}

export default ChuDe;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        width: 90,
        alignItems: 'center'
    },
    iconButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        width: 50,
    },
    title: {
        overflow: 'hidden',
        color: 'white'
    }
});