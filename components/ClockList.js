import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView, Image} from 'react-native';
import ListItems from "./ListItems";
import * as Font from "expo-font";

import Database from "./functions/Database";

export default function ClockList(props){
    const [clocks, setClocks] = useState([])

    useEffect(async () => {
        await Font.loadAsync({
            'Bold': require('../assets/fonts/Lato-Bold.ttf'),
            'Regular': require('../assets/fonts/Lato-Regular.ttf'),
            'Light': require('../assets/fonts/Lato-Light.ttf'),
        });

        Database.createTable();
        Database.add('22:54')
        Database.getAll().then(all => setClocks(JSON.parse(all).rows._array))

    }, [])
    const addHandle = (val) => {
        console.log(val)
        Database.add(val)
        Database.getAll().then(all => setClocks(JSON.parse(all).rows._array))
    }
    const removeHandleByKey = (key) => {
        Database.removeByKey(key)
        Database.getAll().then(all => setClocks(JSON.parse(all).rows._array))
    }
    return(
        <View style={styles.cont}>
            {/*<TouchableOpacity onPress={() => Database.add()}><Text>essa</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => Database.getAll().then(all => console.log(all))}><Text>essa2</Text></TouchableOpacity>*/}
            <ScrollView>
                <ListItems clocks={clocks} removeHandleByKey={(key) => removeHandleByKey(key)} reload={() => Database.getAll().then(all => setClocks(JSON.parse(all).rows._array))}/>
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => props.navigation.navigate("addClock", {
                addHandle: (value) => addHandle(value),
            })}>
                <View>
                    <Image style={styles.img} source={require('../assets/plus.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cont: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: '#9070FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
    },
    addButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#C71585",
        position: "absolute",
        top: Dimensions.get("window").height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    }
});