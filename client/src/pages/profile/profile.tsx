import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./profile_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(props:any) {
    // {
    //     "name": "string",
    //     "gender": "string",
    //     "breed": "string",
    //     "weight": "string",
    //     "age": "string",
    //     "location": "string",
    //     "description": "string"
    //   }
    function handleLogout() {
        AsyncStorage.removeItem('user');
        props.loadUserFromStorage()
    }
    return (
        <View style={styles.container}>
            <Text>Añade mascota</Text>
            <TextInput style={styles.input} placeholder="Nombre" />
            <TextInput style={styles.input} placeholder="Genero" />
            <TextInput style={styles.input} placeholder="Raza" />
            <TextInput style={styles.input} placeholder="Color" />
            <Text onPress={handleLogout} style={{color:'red'}}>Logout</Text>
        </View>
    )
}