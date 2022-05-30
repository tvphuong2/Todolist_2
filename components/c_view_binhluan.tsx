import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from 'react-native';
import * as API from '../screens/model/API/api'

const CommentView = (props: any) => {
    const {comment} = props;
    const [user, setUser]: any = useState(null);

    useEffect(() => {
        API.APILayTacGia(comment.account_id, (res:any) => {
            setUser(res.result)
        })
    }, []);

    const formatDate = (date:string) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }

    return(
        <View>
            <View
                style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: '#F1F1F1'
                }}
            ></View>

            <View style={styles.comment}>
                {/* <View>
                    {user && user.image !== null ?
                    <Image style={styles.image} source={{ uri: user.avatar }} /> :
                    <Image style={styles.image} source={require('../resource/Image/logo.png')} />
                    }
                </View> */}
                <View style={styles.right}>
                    {user && <Text style={{color: 'rgba(0,0,0,.87)', marginBottom: 10}}>{user.name}</Text>}
                    <Text style={{marginTop: 10}}>{comment.comment}</Text>
                    <Text style={styles.date}>{formatDate(comment.date)}</Text>
                </View>
            </View>
        </View>
    )
}

export default CommentView;

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 75
    },
    right: {
        marginLeft: 10
    },
    date: {
        color: 'rgba(0,0,0,.54)',
        marginTop: 10
    }
})
