import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./login_styles";

export default function Login(props: any) {
    const [mail, setMail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    return (
        <View style={styles.container}>
            <View style={styles.containerInputs}>
            <TextInput onChange={(e) => {
                setMail(e.nativeEvent.text)
            }} style={styles.input} placeholder="Correo" />
            <TextInput onChange={(e) => {
                setPassword(e.nativeEvent.text)
            }} style={styles.input} placeholder="Contraseña" />
            </View>
            
            <TouchableOpacity onPress={() => { }} style={styles.container_button2}>
                <Text style={styles.text_button}>Inicia Sesión</Text>
            </TouchableOpacity>
        </View>
    )
}