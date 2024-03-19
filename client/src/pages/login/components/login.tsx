import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./login_styles";
import store from "../../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login(props: any) {
    const [mail, setMail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    function handleLogin() {
        fetch(store.getState().url + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: mail,
                password: password
            })
        }).then((res) => {
            if (res.status === 201) {
                res.json().then((data) => {
                    AsyncStorage.setItem('token', data.token);
                    AsyncStorage.setItem('user', JSON.stringify(data.user));
                    props.loadUserFromStorage();
                })
            } else {
                alert('Usuario o contraseña incorrectos')
            }
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInputs}>
                <TextInput onChange={(e) => {
                    setMail(e.nativeEvent.text)
                }} style={styles.input} placeholder="Correo" autoCapitalize="none"/>
                <TextInput
                    secureTextEntry={true}
                    onChange={(e) => {
                        setPassword(e.nativeEvent.text)
                    }}
                    style={styles.input}
                    placeholder="Contraseña"
                />
            </View>

            <TouchableOpacity onPress={() => {
                handleLogin()
            }} style={styles.container_button2}>
                <Text style={styles.text_button}>Inicia Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}