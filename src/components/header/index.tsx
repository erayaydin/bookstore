import React from "react";
import {ImageRequireSource, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import {GlobalStyles} from "../../styles/global";
import Button from "../button";
import VectorImage from "react-native-vector-image";

interface HeaderProps {
    text?: string,
    leftIcon?: string,
    rightIcon?: string,
    onLeftPress?: () => void,
    onRightPress?: () => void,
    style?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>,
}

const icons: {[key: string]: ImageRequireSource} = {
    back: require('../../assets/icons/back.svg'),
    logout: require('../../assets/icons/logout.svg'),
    menu: require('../../assets/icons/menu.svg'),
    sections: require('../../assets/icons/sections.svg'),
};

const Header = (props: HeaderProps) => {
    const {
        text,
        style,
        leftIcon,
        rightIcon,
        onLeftPress,
        onRightPress,
        titleStyle,
    } = props;

    return (
        <View style={[GlobalStyles.headerComponent, style]}>
            {
                leftIcon && (
                    <Button onPress={onLeftPress}>
                        <VectorImage source={icons[leftIcon]} style={{width: 32, height: 32}} />
                    </Button>
                )
            }
            { !leftIcon && <View style={{width: 32}} /> }
            <View style={{flex: 1, justifyContent: "center"}}>
                <Text style={[{textAlign: "center"}, titleStyle]}>{ text }</Text>
            </View>
            {
                rightIcon && (
                    <Button onPress={onRightPress}>
                        <VectorImage source={icons[rightIcon]} style={{width: 32, height: 32}} />
                    </Button>
                )
            }
            { !rightIcon && <View style={{width: 32}} /> }
        </View>
    )
};

export default Header;
