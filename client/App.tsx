import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/routes/AppRoutes';
import Footer from './src/components/footer/footer';

export default function App() {
    return (
        <Provider store={store}>
            <AppNavigation />
            {/* <Footer /> */}
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