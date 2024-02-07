import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './login_style';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login(props: any) {
    const images = {
        0: require('../../../assets/background_login/1.jpg'),
        1: require('../../../assets/background_login/7.jpg'),
        2: require('../../../assets/background_login/3.jpg'),
        3: require('../../../assets/background_login/4.jpg'),
        4: require('../../../assets/background_login/5.jpg'),
        5: require('../../../assets/background_login/6.jpg'),
        6: require('../../../assets/background_login/2.jpg'),
    };
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Object.keys(images).length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    const onPressRegister = () => {
        setTimeout(() => {
            AsyncStorage.setItem('user', JSON.stringify({ id: 1, username: 'paco', password: 'pepe' }));
            props.loadUserFromStorage();
        }, 200)
    };

    return (
        <View style={styles.container}>
            <Image source={images[currentImageIndex]} style={styles.backgroundImage} />
            <View style={styles.title}>
                <Image source={require('../../../assets/dogFoot.gif')} style={styles.imageDogFoot} />
                <View>
                <Text style={styles.title_text}>Perrinder</Text>
                <Text style={styles.legendText}>La media naranja de tu mascota</Text>
                </View>
            </View>
            {/* Contenedor del botón de inicio de sesión */}
            <View style={styles.container_button_view2}>
                <TouchableOpacity onPress={onPressRegister} style={styles.container_button2}>
                    <Text style={styles.text_button}>Inicia Sesión</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container_button_view}>
                <TouchableOpacity onPress={onPressRegister} style={styles.container_button}>
                    <Text style={styles.text_button}>Soy nuevo, registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Login;
