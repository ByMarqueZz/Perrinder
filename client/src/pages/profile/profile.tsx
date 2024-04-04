import React from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import styles from "./profile_styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePet from "./componentes/createPet/createPet";

export default function Profile(props: any) {
    const [isAddingPet, setIsAddingPet] = React.useState<boolean>(false);

    function handleLogout() {
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        props.loadUserFromStorage()
    }

    if (isAddingPet) {
        return (
            <CreatePet goBack={() => {
                setIsAddingPet(false);
            }}/>
        )
    }

    return (
        <View style={styles.container}>
            <Text onPress={() => {
                setIsAddingPet(true);
            }} style={{ color: 'gray' }}>Añadir perro</Text>
            <Text onPress={handleLogout} style={{ color: 'red' }}>Logout</Text>
        </View>
    )
}