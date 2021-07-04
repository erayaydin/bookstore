import React from "react";
import {StyleProp, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle} from "react-native";
import {GlobalStyles} from "../../styles/global";
import {color} from "../../styles/color";
import { Control, useController, Controller, ControllerProps } from "react-hook-form";

interface TextFieldProps extends TextInputProps {
    placeholder?: string,
    label?: string,
    style?: StyleProp<ViewStyle>,
    inputStyle?: StyleProp<TextStyle>,
    name?: string,
    control?: Control<Record<string, any>>;
    defaultValue?: string;
    rules?: ControllerProps["rules"];
    errorMessage?: string;
}

const TextField = (props: TextFieldProps) => {
    const {
        placeholder,
        label,
        style,
        control,
        inputStyle,
        defaultValue,
        name,
        rules,
        errorMessage,
        ...rest
    } = props;

    return (
        <View style={[GlobalStyles.textField, style]}>
            <Text style={[GlobalStyles.fieldLabel]}>{ label }</Text>
            {name && control && (
              <Controller
                name={name}
                control={control}
                rules={rules}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={color.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    onChangeText={text => control && name ? onChange(text) : (rest.onChangeText ? rest.onChangeText(text) : () => null)}
                    {...rest}
                    style={[GlobalStyles.input, inputStyle]}
                  />
                )}
              />
            )}
            {(!control || !name) && (
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={color.lighterGrey}
                underlineColorAndroid={color.transparent}
                {...rest}
                style={[GlobalStyles.input, inputStyle]}
              />
            )}
            {errorMessage && <Text style={[GlobalStyles.errorLabel]}>{errorMessage}</Text>}
        </View>
    )
};

export default TextField;
