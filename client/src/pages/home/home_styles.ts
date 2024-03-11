import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        marginTop: 25,
        overflow: 'hidden',
    },
    cardAbsolute: {
        position: 'absolute',
        top: 55,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        overflow: 'hidden',
        zIndex: -1,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    name: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    },
});

export default styles;