import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '100%',
        marginBottom: 10,
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingLeft: 30,
        paddingRight: 30,
    },
    goBack: {
        position: 'absolute',
        top: 50,
        left: 30,
        zIndex: 1,
    },
    goBackText: {
        fontSize: 16,
        color: 'blue'
    }
});