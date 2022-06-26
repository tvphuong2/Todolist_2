import React, { useState, useEffect } from 'react';
import { View, Image, Modal, Pressable, Button, StyleSheet, Text, FlatList, SafeAreaView, ActivityIndicator, ScrollView, TouchableHighlight, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker
import * as LOCAL from './model/API/Local_List';
import { TouchableWithoutFeedback, Keyboard} from 'react-native';

import {  KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

export default function TaoBanGHi() {
  function Step(name, description, substep) {
    this.name = name;
    this.description = description;
    this.substep = substep;
  }
  const [listBuoc, SetlistBuoc] = useState([{ step: new Step("", "", [{ name: "", description: "", oldElement: "yes" }]), old: "no", id: 1 }]);
  const [isRenderListBuoc, SetisRenderListBuoc] = useState(false);
  const [NameRecord, SetNameRecord] = useState("");
  const [DescriptionRecord, SetDescriptionRecord] = useState("");
  const [image, setImage] = useState(null);
  const [colorChude, setcolorChude] = useState(['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']);
  const [colorIconChude, setcolorIconChude] = useState(['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black']);
  const [type_id, setType_id] = useState(null);
  const [modalWarningVisible, setModalWarningVisible] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [iconImage, seticonImage] = useState('image');
  const [sizeIconImage, setsizeIconImage] = useState(24);
  const [heightList, setheightList] = useState('59%');
  useEffect(() => {

  });
  const addBuoc = () => {
    var listBuocOd = listBuoc;
    var newid = listBuocOd[listBuocOd.length - 1].id++;
    listBuocOd[listBuocOd.length - 1].old = "no";
    listBuocOd.push({ step: new Step(``, "", [{ name: "", description: "", oldElement: "yes" }]), old: "yes", id: newid });
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
    var placeholderText = item.step.name.length == 0 ? `Bước ${item.id}` : '';
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
          <View style={{ flexDirection: 'row' }}>
            <View style={{ backgroundColor: '#EAEAEA', height: 15, width: 15, borderRadius: 10, marginRight: 6 }}></View>
            <View style={styles.thanhphanText}>
              <View style={{flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center'}}>
              <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} placeholder='Nội dung Thành Phần' onChangeText={(text) => { onChangeElementName(text) }} style={{ height: 30, backgroundColor: '#EAEAEA', borderRadius: 5, marginBottom: 6 , flex : 1  , marginRight : 4}}></TextInput>
              <TouchableOpacity onPress={deleteElement}><Feather style={{ display: `${ShowDeleteElement}`, textAlign: 'right' }} name="x-circle" size={24} color="rgba(255, 99, 71, 0.8)" /></TouchableOpacity>
              </View>
              <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} onChangeText={(text) => { onChangeElementDescription(text) }} multiline={true}
                numberOfLines={4} placeholder='Mô Tả  ...' style={{ height: 40, backgroundColor: '#EAEAEA', padding: 10, borderRadius: 5, marginBottom: 6 }} textAlignVertical='top'>
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
        listBuocOd[index].step.substep.push({ name: '', description: "", oldElement: "yes" })
      } else {
        listBuocOd[index].step.substep[listBuocOd[index].step.substep.length - 1].oldElement = "no";
        listBuocOd[index].step.substep.push({ name: '', description: "", oldElement: "yes" })
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
        <View style={{flexDirection : 'row' , justifyContent : 'center' , alignItems : 'center'}}>
        <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} placeholder='Nội dung bước' onChangeText={(text) => { onChangeTextBuocName(text) }} style={{ height: 50, backgroundColor: '#EAEAEA', borderRadius: 10, padding: 10 , flex : 1}}></TextInput>
        <TouchableOpacity onPress={deleteBuoc}><MaterialIcons style={{ display: `${showDeleteBuoc}` }} name="delete" size={30} color="rgba(255,99,71,0.8)" /></TouchableOpacity>
        </View>
        <View style={{ marginTop: 6, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 6 }}>
          <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} multiline={true} onChangeText={(text) => { onChangeBuocDescription(text) }}
            numberOfLines={4} placeholder='Mô Tả ...' style={{ height: 60, backgroundColor: '#EAEAEA', padding: 10, borderRadius: 10, flex: 1 }} textAlignVertical='top'>
          </TextInput>
        </View>
        <FlatList data={listBuoc[index].step.substep} renderItem={ThanhPhanItem} listKey={(item, index) => `_key_two${index.toString()}`}>
        </FlatList>
        <TouchableOpacity onPress={addElement}>
          <Ionicons style={{ textAlign: 'center', zIndex: 1 }} name="add-circle" size={28} color="#339fb7" />
        </TouchableOpacity>
      </View>
    );
  }
  function OnSubmit() {
    if (type_id == null || image == null) {
      setModalWarningVisible(true);
    } else {
      var listStep = listBuoc.map(function (BuocItem) {
        return {
          name: BuocItem.step.name,
          description: BuocItem.step.name,
          time: 0,
          substep: BuocItem.step.substep.map(function (sstep) {
            return {
              name: sstep.name,
              description: sstep.description,
              time: 0
            }
          })
        }
      })
      var data = {
        steps: JSON.stringify(listStep),
        image: image,
        name: NameRecord,
        description: DescriptionRecord,
        progress: "none",
        type_id: type_id
      }
      console.log(data);
      LOCAL.Upload(data, function (tintrang) {
        console.log(tintrang);
      })

      LOCAL.getAll((res) => {
        for (var i = 0; i < res.length; i++) {
          res[i]['key'] = i
        }
        console.log(res);
      })
      setModalSuccessVisible(true);
    }
  }
  function OnNameRecordChange(text) {
    SetNameRecord(text);
  }
  function OnDescriptionRecordChange(text) {
    SetDescriptionRecord(text);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      seticonImage('pencil-alt');
      setsizeIconImage(4);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
      <View style={{ flex: 1, backgroundColor: '#99dcff', paddingBottom: 20 }}>
        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalWarningVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalWarningVisible(!modalWarningVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontWeight: "bold", color: "tomato", fontSize: 18, marginBottom: 4 }}>Cảnh báo</Text>
            <Text style={styles.modalText}>{type_id == null ? 'Vui Lòng Chọn Chủ đề' : 'Vui lòng chọn ảnh'}</Text>
            <TouchableOpacity>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalWarningVisible(!modalWarningVisible)}
              >
                <Text style={styles.textStyle}>Thoát</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSuccessVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalSuccessVisible(!modalSuccessVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontWeight: "bold", color: "tomato", fontSize: 18, marginBottom: 4 }}>Thông báo</Text>
            <Text style={styles.modalText}>Bạn Đã Thêm Bản Ghi Thành Công</Text>
            <TouchableOpacity>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalSuccessVisible(!modalSuccessVisible)}
              >
                <Text style={styles.textStyle}>Thoát</Text>
              </Pressable>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ flex: 1 }}>
        <View styles={styles.container}>
          <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', padding: 4, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
            <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} autoFocus={true} onChangeText={(text) => { OnNameRecordChange(text) }} style={styles.IpTieude} placeholder='Tiêu Đề...'></TextInput>
            <TouchableOpacity onPress={OnSubmit} style={{ backgroundColor: '#339fb7', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14, marginRight: 6, borderRadius: 6 }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 24 }}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chude}>
            <View style={styles.chudeTop}>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['#339fb7', 'white', 'white', 'white', 'white', 'white', 'white', 'white']); setType_id(1);
                  setcolorIconChude(['white', 'black', 'black', 'black', 'black', 'black', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[0]}` }]} name="food-bank" size={24} color={colorIconChude[0]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', '#339fb7', 'white', 'white', 'white', 'white', 'white', 'white']); setType_id(2);
                  setcolorIconChude(['black', 'white', 'black', 'black', 'black', 'black', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[1]}` }]} name="medical-services" size={24} color={colorIconChude[1]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', '#339fb7', 'white', 'white', 'white', 'white', 'white']); setType_id(3);
                  setcolorIconChude(['black', 'black', 'white', 'black', 'black', 'black', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[2]}` }]} name="airplanemode-active" size={24} color={colorIconChude[2]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', 'white', '#339fb7', 'white', 'white', 'white', 'white']); setType_id(4);
                  setcolorIconChude(['black', 'black', 'black', 'white', 'black', 'black', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[3]}` }]} name="computer" size={24} color={colorIconChude[3]} />
              </TouchableOpacity>
            </View>
            <View style={styles.chudeBottom}>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', 'white', 'white', '#339fb7', 'white', 'white', 'white']); setType_id(5);
                  setcolorIconChude(['black', 'black', 'black', 'black', 'white', 'black', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[4]}` }]} name="nature" size={24} color={colorIconChude[4]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', 'white', 'white', 'white', '#339fb7', 'white', 'white']); setType_id(6);
                  setcolorIconChude(['black', 'black', 'black', 'black', 'black', 'white', 'black', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[5]}` }]} name="style" size={24} color={colorIconChude[5]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', 'white', 'white', 'white', 'white', '#339fb7', 'white']); setType_id(7);
                  setcolorIconChude(['black', 'black', 'black', 'black', 'black', 'black', 'white', 'black'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[6]}` }]} name="sports-football" size={24} color={colorIconChude[6]} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons onPress={() => {
                  setcolorChude(['white', 'white', 'white', 'white', 'white', 'white', 'white', '#339fb7']); setType_id(8);
                  setcolorIconChude(['black', 'black', 'black', 'black', 'black', 'black', 'black', 'white'])
                }}
                  style={[styles.IconChuDe, { backgroundColor: `${colorChude[7]}` }]} name="work" size={24} color={colorIconChude[7]} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.SubChude}>
            <TextInput onFocus={() => setheightList('42%')} onBlur={() => setheightList('59%')} multiline={true} onChangeText={(text) => { OnDescriptionRecordChange(text) }}
              numberOfLines={4} placeholder='Mô Tả...' style={styles.SubChuDeTextIp} textAlignVertical='top'>
            </TextInput>
            <View style={styles.SubChuDeExtend}>
            {image && <Image source={{ uri: image }} style={{ width: 65, height: 65, marginLeft: 10, marginTop: 4, borderRadius: 4, borderColor: '#99dcff', borderWidth: 1 , position : 'relative' , borderRadius : 16 }} />}
            <FontAwesome5 onPress={pickImage} style={image == null ? styles.IconSubChude : styles.IconSubChudeChoose} name={iconImage} color="black" />
            </View>
          </View>

          <View style={styles.listBuoc}>
            <KeyboardAwareFlatList style={{ height: `${heightList}` }} data={listBuoc} renderItem={BuocItem} keyExtractor={(item, index) => `_key_one${index.toString()}`} extraData={isRenderListBuoc}>

            </KeyboardAwareFlatList>
          </View>
          <TouchableOpacity onPress={addBuoc} style={{ backgroundColor: '#339fb7' , justifyContent : 'center' , alignItems : 'center' }}>
            <Ionicons style={{ textAlign: 'center', zIndex: 1 }} name="add-circle" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  IpTieude: {
    height: 40,
    marginHorizontal: 10,
    padding: 10,
    fontWeight: "500",
    fontSize: 20,
    color: 'black',
    flex: 1,
    borderTopEndRadius: 10
  },
  chude: {
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  chudeTop: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  chudeBottom: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  IconChuDe: {
    fontSize: 30,
    padding: 10,
    borderRadius: 50
  },
  SubChude: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal : 16 ,
    // paddingVertical : 4 , 
    paddingBottom : 4 ,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30 ,
    borderBottomRightRadius : 30 ,
    borderBottomLeftRadius : 30 ,
    marginBottom : 6 ,
    justifyContent : 'center' ,
    alignItems : 'center'
  },
  SubChuDeTextIp: {
    flex: 1,
    height: 60,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 16,
    borderRadius: 10 ,
    lineHeight : 60
  },
  SubChuDeExtend: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  IconSubChude: {
    fontSize: 40,
    marginLeft: 10,
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderRadius: 10
  },
  IconSubChudeChoose: {
    position : 'absolute' ,
    top : 12 ,
    right : 6 , 
    fontSize: 18,
    textAlign : 'right' , 
    backgroundColor : 'rgba(255 , 255 , 255 , 0.4)' ,
    borderRadius : 6 , 
    paddingHorizontal : 2 , 
    marginLeft : 10 ,
    paddingVertical : 2 ,
    zIndex : 1
    // backgroundColor: '#f1f1f1',
  },
  listBuoc: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius : 16
  },
  buoc: {
    marginTop: 6,
    backgroundColor: '#F5F5F5',
    padding: 10,
    marginBottom: 6,
    borderRadius: 4
  },
  thanhphan: {
    display: 'flex',
    flexDirection: 'column'
  },
  thanhphanText: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0 , 0 , 0 , 0.2)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "tomato",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16
  }
});

