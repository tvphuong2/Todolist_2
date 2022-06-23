import EditScreenInfo from '../components/EditScreenInfo';
import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as LOCAL from './model/API/Local_List';

export default function TaoBanGHi() {
  function Step(name, description, substep) {
    this.name = name;
    this.description = description;
    this.substep = substep;
  }
  const [listBuoc, SetlistBuoc] = useState([{ step: new Step("Bước 1", "", [{ name: "Thanh Phần 1", description: "Mô Tả", oldElement: "yes" }]), old: "no" }]);
  const [isRenderListBuoc, SetisRenderListBuoc] = useState(false);
  const [NameRecord, SetNameRecord] = useState("");
  const [DescriptionRecord, SetDescriptionRecord] = useState("");
  useEffect(() => {

  });
  const addBuoc = () => {
    var listBuocOd = listBuoc;
    listBuocOd[listBuocOd.length - 1].old = "no";
    listBuocOd.push({ step: new Step(`Bước ${listBuocOd.length + 1}`, "", [{ name: "Thành Phần 1", description: "Mô Tả", oldElement: "yes" }]), old: "yes" });
    SetlistBuoc(listBuocOd);
    SetisRenderListBuoc(!isRenderListBuoc);
  }
  const deleteBuoc = () => {
    var listBuocOd = listBuoc;
    listBuocOd.pop();
    listBuocOd[listBuocOd.length - 1].old = 'yes';
    SetlistBuoc(listBuocOd);
    SetisRenderListBuoc(!isRenderListBuoc);
  }
  const BuocItem = ({ item, index }) => {
    var indexBuoc = index;
    var placeholderText = `${item.step.name}`;
    var showDeleteBuoc = "none";
    if (item.old == "yes" && index != 0) {
      showDeleteBuoc = "flex";
    }
    const ThanhPhanItem = ({ item, index }) => {
      var itemElement = item;
      var indexElement = index;
      var ShowDeleteElement = "none";
      if (itemElement.oldElement == "yes") {
        ShowDeleteElement = "flex";
      }
      function onChangeElementName(text) {
        var listBuocOd = listBuoc;
        listBuocOd[indexBuoc].step.substep[indexElement].name = text;
        SetlistBuoc(listBuocOd);
        SetisRenderListBuoc(!isRenderListBuoc);
      }
      function onChangeElementDescription(text) {
        var listBuocOd = listBuoc;
        listBuocOd[indexBuoc].step.substep[indexElement].description = text;
        SetlistBuoc(listBuocOd);
        SetisRenderListBuoc(!isRenderListBuoc);
      }
      return (
        <View style={styles.thanhphan}>
          <TouchableOpacity onPress={deleteElement}><Feather style={{ display: `${ShowDeleteElement}`, textAlign: 'right' }} name="x-circle" size={24} color="tomato" /></TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#ccc', height: 15, width: 15, borderRadius: 10, marginRight: 6 }}></View>
            <View style={styles.thanhphanText}>
              <TextInput onChangeText={(text) => { onChangeElementName(text) }} value={itemElement.name} style={{ height: 30, backgroundColor: '#ccc', borderRadius: 5, marginBottom: 6 }}></TextInput>
              <TextInput onChangeText={(text) => { onChangeElementDescription(text) }} multiline={true}
                numberOfLines={4} placeholder='Mô Tả  ...' style={{ height: 40, backgroundColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 6 }} textAlignVertical='top'>
              </TextInput>
            </View>
          </View>
        </View>
      )
    };
    function onChangeTextBuocName(text) {
      var listBuocOd = listBuoc;
      listBuocOd[index].step.name = text;
      SetlistBuoc(listBuocOd);
      SetisRenderListBuoc(!isRenderListBuoc);
    }
    function onChangeBuocDescription(text) {
      var listBuocOd = listBuoc;
      listBuocOd[index].step.description = text;
      SetlistBuoc(listBuocOd);
    }
    function addElement() {
      var listBuocOd = listBuoc;
      if (listBuocOd[indexBuoc].step.substep.length == 0) {
        listBuocOd[index].step.substep.push({ name: `Thành Phần ${listBuoc[index].step.substep.length + 1}`, description: "Mô Tả", oldElement: "yes" })
      } else {
        listBuocOd[index].step.substep[listBuocOd[index].step.substep.length - 1].oldElement = "no";
        listBuocOd[index].step.substep.push({ name: `Thành Phần ${listBuoc[index].step.substep.length + 1}`, description: "Mô Tả", oldElement: "yes" })
      }
      SetlistBuoc(listBuocOd);
      SetisRenderListBuoc(!isRenderListBuoc);
    }
    const deleteElement = () => {
      var listBuocOd = listBuoc;
      if (listBuocOd[index].step.substep.length == 1) {
        listBuocOd[index].step.substep = [];
      } else {
        listBuocOd[index].step.substep.pop();
        listBuocOd[index].step.substep[listBuocOd[index].step.substep.length - 1].oldElement = 'yes';
      }
      SetlistBuoc(listBuocOd);
      SetisRenderListBuoc(!isRenderListBuoc);
    }
    return (
      <View style={styles.buoc}>
        <TouchableOpacity onPress={deleteBuoc}><MaterialIcons style={{ display: `${showDeleteBuoc}`, textAlign: 'right' }} name="delete" size={30} color="tomato" /></TouchableOpacity>
        <TextInput onChangeText={(text) => { onChangeTextBuocName(text) }} value={placeholderText} style={{ height: 50, backgroundColor: '#ccc', borderRadius: 10, padding: 10 }}></TextInput>
        <View style={{ marginTop: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <TextInput multiline={true} onChangeText={(text) => { onChangeBuocDescription(text) }}
            numberOfLines={4} placeholder='Mô Tả 1 ...' style={{ height: 60, backgroundColor: '#ccc', padding: 10, borderRadius: 10, flex: 1 }} textAlignVertical='top'>
          </TextInput>
          <Fontisto style={{ marginHorizontal: 6, padding: 10, backgroundColor: '#ccc', borderRadius: 10 }} name="clock" size={30} color="black" />
        </View>
        <FlatList data={listBuoc[index].step.substep} renderItem={ThanhPhanItem} listKey={(item, index) => `_key${index.toString()}`}>
        </FlatList>
        <TouchableOpacity onPress={addElement}>
          <Ionicons style={{ textAlign: 'center', zIndex: 1 }} name="add-circle" size={28} color="tomato" />
        </TouchableOpacity>
      </View>
    );
  }
  function OnSubmit() {
    console.log('---------------------------')
    var listStep = listBuoc.map(function(BuocItem) {
      return {
        name : BuocItem.step.name ,
        description : BuocItem.step.name ,
        time : 0 ,
        substep : BuocItem.step.substep.map(function(sstep) {
          return {
            name : sstep.name ,
            description : sstep.description ,
            time : 0
          }
        })
      }
    })
     var data = {
      steps : JSON.stringify(listStep),
      image : "none" ,
      name : NameRecord ,
      description : DescriptionRecord ,
      progress : "none"
   }
   LOCAL.Upload(data , function(tintrang) {
      console.log(tintrang);
   })
  
  LOCAL.getAll((res) => {
    for (var i = 0; i < res.length; i++) {
      res[i]['key'] = i
    }
    console.log(res);
  })
  }
  function OnNameRecordChange(text) {
    SetNameRecord(text);
  }
  function OnDescriptionRecordChange(text) {
    SetDescriptionRecord(text);
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      <View style={{ flex: 1 }}>
        <View styles={styles.container}>
          <View style={{ flexDirection: 'row', marginTop: 36 }}>
            <TextInput onChangeText={(text) => { OnNameRecordChange(text) }} style={styles.IpTieude} placeholder='Tiêu Đề'></TextInput>
            <TouchableOpacity onPress={OnSubmit} style={{ backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', padding: 10, marginRight: 6, borderRadius: 6 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Thêm Mới</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chude}>
            <View style={styles.chudeTop}>
              <MaterialCommunityIcons style={styles.IconChuDe} name="silverware-fork-knife" size={24} color="black" />
              <FontAwesome5 style={styles.IconChuDe} name="briefcase-medical" size={24} color="black" />
              <MaterialIcons style={styles.IconChuDe} name="work" size={24} color="black" />
              <MaterialIcons style={styles.IconChuDe} name="wrong-location" size={24} color="black" />
            </View>
            <View style={styles.chudeBottom}>
              <FontAwesome  style={{fontSize : 30 , backgroundColor : "#ccc" , paddingHorizontal : 14 , paddingVertical : 10 , borderRadius : 50}} name="plane" size={24} color="black" />
              <FontAwesome style={{fontSize : 30 , backgroundColor : "#ccc" , paddingHorizontal : 14 , paddingVertical : 10 , borderRadius : 50}} name="tree" size={24} color="black" />
              <FontAwesome5 style={{fontSize : 30 , backgroundColor : "#ccc" , paddingHorizontal : 14 , paddingVertical : 10 , borderRadius : 50}} name="running" size={24} color="black" />
              <Ionicons style={{fontSize : 30 , backgroundColor : "#ccc" , paddingHorizontal : 14 , paddingVertical : 10 , borderRadius : 50}}  name="football" size={24} color="black" />
            </View>
          </View>
          <View style={styles.SubChude}>
            <TextInput multiline={true} onChangeText={(text) => { OnDescriptionRecordChange(text) }}
              numberOfLines={4} placeholder='Mô Tả...' style={styles.SubChuDeTextIp} textAlignVertical='top'>
            </TextInput>
            <View style={styles.SubChuDeExtend}>
              <Feather style={styles.IconSubChude} name="image" size={24} color="black" />
              <Fontisto style={styles.IconSubChude} name="clock" size={24} color="black" />
            </View>
          </View>
          <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 16 }}>Các Bước : </Text>
          <View style={styles.listBuoc}>
            <FlatList style={{ height: '45%' }} data={listBuoc} renderItem={BuocItem} keyExtractor={(item) => item.id} extraData={isRenderListBuoc}>

            </FlatList>
          </View>
          <TouchableOpacity onPress={addBuoc} style={{ backgroundColor: 'rgba(0 , 0 , 0 , 0.2)' }}>
            <Ionicons style={{ textAlign: 'center', marginBottom: 50, zIndex: 1 }} name="add-circle" size={35} color="#40E0D0" />
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  IpTieude: {
    height: 50,
    marginHorizontal: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    flex: 1
  },
  chude: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  chudeTop: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  chudeBottom: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  IconChuDe: {
    fontSize: 30,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 50
  },
  SubChude: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10
  },
  SubChuDeTextIp: {
    flex: 1,
    height: 100,
    backgroundColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 10
  },
  SubChuDeExtend: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  IconSubChude: {
    fontSize: 30,
    marginLeft: 10,
    backgroundColor: '#ccc',
    padding: 5,
    borderRadius: 10
  },
  listBuoc: {
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5
  },
  buoc: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 6
  },
  thanhphan: {
    display: 'flex',
    flexDirection: 'column'
  },
  thanhphanText: {
    flex: 1
  }
});

