import React, { useState, useEffect } from 'react';
import {
    View, 
    Text,
    Switch,
    TouchableOpacity,
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
    console.log(banghi.on)
    setIsEnabled(banghi.on == 1)
  }, []);

  function chuyenTrang() {
    if (banghi.view == null) {
      navigation.navigate('BanGhiNoiBo', {banghi})
    } else {
      navigation.navigate('BanGhi', {banghi})
    }
  }

    return (
        <TouchableHighlight key={index} onPress={() => {chuyenTrang()}}>
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
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  />:
                  <View></View>
                }

              </View>
          </View>
        </TouchableHighlight>
    );
}


const styles = StyleSheet.create({ 
    banghi: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: '#E5E5E5',
        height: 100,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
      },

      todo: {
        flex: 3,
      },
      status: {
        flex: 1,
      },
      title: {
        fontSize: 17,
      },
      timeStart: {
        paddingTop: 15,
      }
})