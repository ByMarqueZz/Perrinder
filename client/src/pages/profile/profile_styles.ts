import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 80,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    header: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMail: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        right: '5%',
        color: 'red',
    },
    headerContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        paddingBottom: 20,
        borderBottomWidth: .5,
        borderColor: 'gray',
        width: '100%',
    }
});