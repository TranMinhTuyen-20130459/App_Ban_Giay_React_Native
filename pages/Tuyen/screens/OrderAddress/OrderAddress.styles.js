import {StyleSheet} from 'react-native'
import {colors} from "../../../../theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    content: {
        flex: 1,
    },
    mainContent: {
        backgroundColor: 'white',
        padding: 20,
    },
    label_name_customer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view_contain_text: {
        marginTop: 7,
        marginBottom: 7
    },
    view_contain_text_input: {
        borderRadius: 5,
        borderWidth: 1,
        padding: 10
    },
    fontSizeText: {
        fontSize: 15
    },
    btConfirm: {
        backgroundColor: colors.bgButtonRed,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: 'center'
    },
    text_in_button: {
        color: 'white',
        fontWeight: 400
    },
    footer: {
        backgroundColor: 'white',
        padding: 20
    },
    drop_down:{
        backgroundColor: 'rgba(230, 236, 243, 1)',
        // justifyContent: 'flex-start',

    }
    ,scroll:{
        flex: 1,
        // width: '100%',
      }
})