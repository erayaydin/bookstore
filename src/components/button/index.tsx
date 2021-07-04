import React from "react";
import {StyleProp, Text, TextStyle, TouchableOpacity, TouchableOpacityProps} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    text?: string,
    textStyle?: StyleProp<TextStyle>,
    children?: React.ReactNode,
}

const Button = (props: ButtonProps) => {

    const {
        text,
        style,
        textStyle,
        children,
        ...rest
    } = props;

    return (
        <TouchableOpacity style={style} {...rest}>
            {
                children || <Text style={[{textAlign: "center"},textStyle]}>{ text }</Text>
            }
        </TouchableOpacity>
    );
};

export default Button;
