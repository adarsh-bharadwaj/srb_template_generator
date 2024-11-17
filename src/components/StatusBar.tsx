import React from 'react';
import { StatusBar as SB, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colorConstants';

export const StatusBar = () => {
    return (
        <SafeAreaView>
            <SB backgroundColor={COLORS.themePrimaryColor} translucent={false} />
        </SafeAreaView>
    )
}