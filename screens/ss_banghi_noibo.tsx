import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import * as LOCAL from './model/API/SQLite';

export default function BanGhiNoiBo({ navigation, route }: any) {
    const {banghi} = route.params
    const j_steps = JSON.parse(banghi.steps)

    useEffect(() => {
        console.log(banghi)
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.illustration}>
                {banghi && banghi.image !== '' ?
                    <Image style={styles.img} source={{ uri: LOCAL.layAnh(banghi.image)}} /> :
                    <Image style={styles.img} source={require('../assets/images/8.png')} /> 
                }
            </View>
			<View style={styles.content}>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.mainTitle}>{banghi.name}</Text>
                        <Text style={styles.desc}>{banghi.description}</Text>
                    </View>
                </View>
                <View style={styles.space}></View>
				<View style={styles.step}>{
                    j_steps && j_steps.map((step:any, i:number) => {
                        return (
                            <View>
                                <Text style={styles.mainStep} key={`aa${i}`}>
                                    {i + 1}. {step.name}: <Text style={styles.desc}>{step.description}</Text>
                                </Text>
                                {
                                    step.substep && step.substep.map((child: any, j:number) => {
                                        return (
                                            <Text style={styles.childStep} key={`bb${j}`}>
                                            {child.name}: <Text key={`cc${j}`} style={styles.desc}>{child.description}</Text>
                                        </Text>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
				</View>
			</View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
	  fontSize: 16,
      backgroundColor: 'white'
    },
	illustration: {
		flex: 1,
		// paddingTop: 30,
	},
	content: {
		flex: 3,
	},
	img: {
		width: '100%',
		height: 200,
		resizeMode: 'cover',
		// opacity: 0.5,
	},
	title: {
		paddingHorizontal: 10,
		paddingTop: 10,
		paddingBottom: 20,
	},
	mainTitle: {
		fontSize: 32,
		paddingBottom: 7,
	},
	desc: {
		color: '#909090',
		fontWeight: 'normal',
	},
    download: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 20
    },
	info: {
		flexDirection: "row",
    	flexWrap: "wrap",
		justifyContent: 'space-between',
		paddingVertical: 10,
		backgroundColor: '#f1f1f1',
		height: 100,
	},
	author: {
		width: 70,
		height: 70,
		borderRadius: 35,	
	},
	type: {
		flex: 2,
		justifyContent: 'center',
        paddingHorizontal: 10,
		fontSize: 15,
		color: '#303030',
	},
	row: {
		flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
		borderLeftWidth: 1,
		borderLeftColor: '#959595',
	},
	step: {
		paddingHorizontal: 10,
		paddingVertical: 15,
		lineHeight: 18,
	},
	mainStep: {
		fontWeight: 'bold',
		lineHeight: 30,
	},
	childStep: {
		fontWeight: 'bold',
		paddingLeft: 30,
		color: '#000000',
	},
	back: {
		position: 'absolute',
    	left: 5,
    	top: 10,
        backgroundColor: '#cfcfcf',
        borderRadius: 20
	},
    space: {
        width: '100%',
        height: 10,
        backgroundColor: '#f1f1f1'
    },
    review: {
        margin: 10
    },
    reviewHeader: {
        margin: 10,
        marginLeft: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    reviewHeaderText: {
        fontWeight: '700',
    },
    viewAll: {
        flexDirection: 'row'
    }
  });
  