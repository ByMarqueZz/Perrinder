import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'absolute',
        bottom: '1%',
        left: '50%',
        transform: [{ translateX: -116}],
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
    },
});