import { StyleSheet } from "react-native"
import { useResponsiveDimensions } from "../hooks/useResponsiveDimensions"
import { COLORS } from "../constants/colorConstants";

export const appStyles = () => {

    const { hp, fs, wp } = useResponsiveDimensions();

    return StyleSheet.create({
        keyboardAvoidViewContentContainer: {
            marginBottom: hp(20)
        },
        scrollContentContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingBottom: hp(10)
        },
        logoImage: {
            width: wp(100),
            height: hp(50),
        },
        titleTextContainer: {
            position: 'relative',
            top: -hp(6),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleText: {
            color: 'black',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontWeight: '700',
        },
        formContainer: {
            position: 'relative',
            top: -hp(5),
            alignItems: 'center'
        },
        topButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(85)
        },
        topButton: {
            marginTop: hp(3),
            justifyContent: 'center',
            width: wp(40),
            height: hp(5),
            borderRadius: 10
        },
        topButtonText: {
            color: COLORS.buttonTitleColor,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: fs(1.8)
        },
        descriptionInputContainer: {
            height: hp(15),
        },
        descriptionInput: {
            height: hp(15),
            textAlignVertical: 'top'
        },
        calendarInputContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp(3),
            paddingLeft: wp(8),
            paddingRight: wp(8)
        },
        calendarLabelContainer: {
            alignSelf: 'flex-start',
            marginBottom: hp(0.75)
        },
        calendarLabel: {
            fontSize: fs(1.9),
            fontWeight: 'bold'
        },
        calendarInput: {
            borderColor: COLORS.themePrimaryColor,
            borderWidth: 1,
            justifyContent: 'center',
            paddingLeft: wp(1),
            height: hp(5.5),
            width: wp(85),
            borderRadius: 10
        },
        calendarInputText: {
            textAlignVertical: 'center'
        },
        bottomButtonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp(85)
        },
        bottomButton: {
            borderRadius: 10,
            backgroundColor: COLORS.themePrimaryColor,
            width: wp(40),
            height: hp(5),
            alignItems: 'center',
            justifyContent: 'center'
        },
        bottomButtonText: {
            fontSize: fs(2),
            color: COLORS.buttonTitleColor,
            fontWeight: 'bold',
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        modalContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(100),
            height: hp(100),
            position: 'absolute'
        },
        modalBackDrop: {
            backgroundColor: 'black',
            opacity: 0.8,
            width: wp(100),
            height: hp(100)
        },
        calendarPickerContainer: {
            borderRadius: 20,
            backgroundColor: 'white',
            position: 'absolute'
        },
        previewImage: {
            position: 'absolute',
            width: wp(100),
            height: wp(150)
        }
    })
}