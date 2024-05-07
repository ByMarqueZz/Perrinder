import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    container_button2: {
        backgroundColor: 'tomato',
        width: '75%',
        padding: 15,
        borderRadius: 20,
    },
    text_button: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    input: {
        width: '80%',
        padding: 15,
        borderRadius: 20,
        fontSize: 18,
    },
    containerInputs: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20,
    },
    form: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundDiv: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        borderRadius: 20,
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInicia: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
        textShadowColor: 'black',  // Color del contorno
        textShadowOffset: { width: 2, height: 2 },  // Offset del contorno
        textShadowRadius: 4,  // Radio del contorno
    }
});