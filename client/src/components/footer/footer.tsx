import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './footer_styles';

export default function Footer() {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('home' as never)}>
                <Image source={require('../../../assets/tinder.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('sms'as never)}>
                <Image source={require('../../../assets/sms.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('profile' as never)}>
                <Image source={require('../../../assets/profile.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>
    );
}
