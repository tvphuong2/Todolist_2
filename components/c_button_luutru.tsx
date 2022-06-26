import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    Switch,
    TouchableWithoutFeedback,
    TouchableHighlight,
    StyleSheet,
} from 'react-native'
import * as LOCAL from '../screens/model/API/Local_List'


export default function BanGhiNoiBo(props:any) {
  const {index, banghi, navigation, capNhat} = props;
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (!isEnabled) LOCAL.useList(banghi.list_id, (res:any)=> {
      LOCAL.setProgress(banghi.list_id, "", (res:any) => {})
      capNhat()
    })
    else LOCAL.cancelList(banghi.list_id, (res:any)=> {capNhat()})
  }
	
  useEffect(()=>{
    console.log(banghi.onl)
    setIsEnabled(banghi.onl == 1)
  }, []);

  function chuyenTrang() {
    if (banghi.view == null) {
      navigation.navigate('BanGhiNoiBo', {banghi})
    } else {
      navigation.navigate('BanGhi', {banghi})
    }
  }

    return (
        <TouchableWithoutFeedback key={index} onPress={() => {chuyenTrang()}}>
          <View style={styles.banghi}>
              <View style={styles.todo}>
              { banghi.name.length < 22 ? 
                  <Text style={styles.title}>{ banghi.name }</Text>:
                  <Text style={styles.title}>{ banghi.name.substring(0, 20) }...</Text>
              }
              </View>
              <View style={styles.status}>
                {
                  banghi.view == null ?
                  <Switch
                  trackColor={{ false: "#767577", true: "#d7f8ff" }}
                  thumbColor={isEnabled ? "#339fb7" : "#339fb7"}
                  ios_backgroundColor="#eeeeee"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  />:
                  <View></View>
                }

              </View>
          </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({ 
    banghi: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: 'white',
        height: 80,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
      },

      todo: {
        flex: 3,
        justifyContent: 'center'
      },
      status: {
        flex: 1,
      },
      title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#339fb7'
      },
      timeStart: {
        paddingTop: 15,
      }
})