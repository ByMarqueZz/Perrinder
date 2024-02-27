import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderWidth: 1,
        borderColor: 'black',
        width: '75%',
        padding: 15,
        borderRadius: 20,
    },
    containerInputs: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        paddingBottom: 20,
    }
});