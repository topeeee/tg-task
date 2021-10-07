import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Styles = StyleSheet.create({
    card: {
        borderRadius: 4,
        paddingVertical: RFValue(30),
        paddingHorizontal: RFValue(16),
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.0,
        elevation: 2,
        backgroundColor: '#fff',
        marginBottom: RFValue(14),
        marginHorizontal: RFValue(16),
    },
    container: {
        backgroundColor: '#fff',
        borderTopStartRadius: RFValue(15),
        borderTopEndRadius: RFValue(15),
        flex: 1,
    },
    customPad: {
        height: RFValue(42),
        width: RFValue(42),
        borderRadius: RFValue(21),
        backgroundColor: 'rgba(77, 133, 254, 0.16)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInputLabel: {
        color: '#686666',
        marginBottom: 2,
        fontSize: 14,
        lineHeight: 22,
    },
    customButton: {
        marginTop: 30,
        backgroundColor: 'grey',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 4
    }

})
