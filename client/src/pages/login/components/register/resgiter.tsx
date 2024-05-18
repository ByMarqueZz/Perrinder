import React from "react";
import { View, Text, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import styles from "./register_styles";
import store from "../../../../redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Register(props: any) {
    const [firstName, setFirstName] = React.useState<string>('')
    const [lastName, setLastName] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleRegister = () => {
        fetch(store.getState().url + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                password: password
            })
        })
            .then((res) => {
                if (res.status === 201) {
                    // Login
                    fetch(store.getState().url + '/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }).then((res) => {
                        if (res.status === 201) {
                            res.json().then((data) => {
                                AsyncStorage.setItem('token', data.token);
                                AsyncStorage.setItem('user', JSON.stringify(data.user));
                                // AQUI DEBERÍA DE SALIR UN MODAL DE BIENVENIDA
                                props.loadUserFromStorage();
                            })
                        }
                    })
                } else {
                    console.log(res.status)
                    alert('Algo salió mal :(')
                }
            })
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.image} source={require('../../../../../assets/background_login/6.jpg')} resizeMode="cover" />
            <View style={styles.form}>
                <View style={styles.backgroundDiv}>
                    <Text style={styles.textInicia}>Registrarse</Text>
                    <TextInput onChange={(e) => {
                        setFirstName(e.nativeEvent.text)
                    }
                    } style={styles.input} placeholder="Nombre" />
                    <TextInput onChange={(e) => {
                        setLastName(e.nativeEvent.text)
                    }
                    } style={styles.input} placeholder="Apellido" />
                    <TextInput onChange={(e) => {
                        setPhone(e.nativeEvent.text)
                    }
                    } style={styles.input} placeholder="Teléfono" />
                    <TextInput onChange={(e) => {
                        setEmail(e.nativeEvent.text)
                    }
                    } style={styles.input} placeholder="Correo" />
                    <TextInput
                        secureTextEntry={true}
                        onChange={(e) => {
                            setPassword(e.nativeEvent.text)
                        }}
                        style={styles.input}
                        placeholder="Contraseña"
                    />
                    <TouchableOpacity onPress={handleRegister} style={styles.container_button}>
                        <Text style={styles.text_button}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}