import { useWindowDimensions } from "react-native";

export const useResponsiveDimensions = () => {
    const { width, height } = useWindowDimensions();

    const wp = (percentage: number) => {
        const elementWidth = (percentage * width) / 100;
        return elementWidth;
    }

    const hp = (percentage: number) => {
        const elementHeight = (percentage * height) / 100;
        return elementHeight;
    }

    const fs = (percentage: number) => {
        const diagonal = Math.sqrt(width * width + height * height);
        const elementFontSize = (percentage * diagonal) / 100;
        return elementFontSize;
    }

    return {
        wp, hp, fs
    }
}