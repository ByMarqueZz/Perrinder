import React from "react";
import { View, Text } from "react-native";
import styles from "./profile_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile(props:any) {
    function handleLogout() {
        AsyncStorage.removeItem('user');
        props.loadUserFromStorage()
    }
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text onPress={handleLogout} style={{color:'red'}}>Logout</Text>
        </View>
    )
}