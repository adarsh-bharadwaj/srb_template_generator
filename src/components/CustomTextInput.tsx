import React from 'react';
import { TextInput as TI, Text, TextInput, TextInputProps,TextProps,TextStyle,View, ViewProps, ViewStyle } from 'react-native';
import { COLORS } from '../constants/colorConstants';
import { useResponsiveDimensions } from '../hooks/useResponsiveDimensions';

interface CustomTextInputProps extends TextInputProps {
    label?: string,
    containerStyle?:ViewStyle,
    labelContainerStyle?:ViewStyle,
    labelStyle?:TextStyle,
    textInputContainerStyle?:ViewStyle
}

const CustomTextInput = ({ 
    label = '',
    containerStyle={},
    labelStyle={},
    labelContainerStyle={},
    textInputContainerStyle={},
    ...props }: CustomTextInputProps) => {
    const {fs,hp,wp} = useResponsiveDimensions();
    return (
        <View style={[{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            marginTop:hp(3),
            paddingLeft:wp(8),
            paddingRight:wp(8)
        },containerStyle]}>
            {label.length > 0 && (
                <View style={[{
                    alignSelf:'flex-start',
                    marginBottom:hp(0.75)
                },labelContainerStyle]}>
                    <Text style={[{
                        fontSize:fs(1.9),
                        fontWeight:'bold'
                    },labelStyle]}>{label}</Text>
                </View>
            )}
            <View style={[{
                borderColor:COLORS.themePrimaryColor,
                borderWidth:1,
                height:hp(5.5),
                width:wp(85),
                borderRadius:10
            },textInputContainerStyle]}>
                <TextInput 
                {...props}
                />
            </View>
        </View>
    )
}

export default CustomTextInput;