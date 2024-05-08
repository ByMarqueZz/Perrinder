import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/routes/AppRoutes';
import { initializeApp } from 'firebase/app';

export default function App() {
    React.useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyDHQhbRG6GoDcLqrRpidCITvqLEq8c3PVk",
            authDomain: "perrinder-6aef8.firebaseapp.com",
            projectId: "perrinder-6aef8",
            storageBucket: "perrinder-6aef8.appspot.com",
            messagingSenderId: "1064613773752",
            appId: "1:1064613773752:web:9d6e863c1394210e618f4d",
            measurementId: "G-7SJK7NZFM6"
        };
        const app = initializeApp(firebaseConfig);
    }, []);
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    }
});