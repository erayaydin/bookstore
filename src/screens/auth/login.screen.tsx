import React, {useCallback, useEffect, useState} from "react";
import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {LoginRequest} from "../../models/login.request";
import {getUniqueId} from "react-native-device-info";
import {useDispatch, useSelector} from "react-redux";
import {authLoginAction} from "../../store/auth/actions";
import {RootState} from "../../store/types";
import {Link, useNavigation} from "@react-navigation/native";
import {GlobalStyles} from "../../styles/global";
import Wallpaper from "../../components/wallpaper";
import Header from "../../components/header";
import {spacing} from "../../styles/spacing";
import TextField from "../../components/text-field";
import Button from "../../components/button";
import {color} from "../../styles/color";
import { useForm } from "react-hook-form";
import KeyboardAvoid from "../../components/keyboard-avoid";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const isLoggingIn = useSelector<RootState, boolean>(state => state.auth.isLoggingIn);
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const login = (data: LoginRequest) => {
        const request: LoginRequest = {
            ...data,
            device_name: getUniqueId()
        };
        dispatch(authLoginAction({request}));
    };

    return (
        <View style={[GlobalStyles.bgPrimary, GlobalStyles.full, GlobalStyles.column]}>
            <Wallpaper/>
            <View style={{paddingHorizontal: spacing[4], flex: 1}}>
                <Header
                    text="Giriş Yap"
                    titleStyle={GlobalStyles.headerTitle}
                />
                <Text style={[GlobalStyles.heroText, GlobalStyles.screenTitle]}>Okumaya Kaldığınız Yerden Devam Edin</Text>
                <Text style={[GlobalStyles.screenDescription]}>Giriş bilgilerinizi girerek uygulamayı kullanmaya devam edebilirsiniz.</Text>
                <KeyboardAvoid>
                    <TextField
                      control={control}
                      name="email"
                      rules={{required: true}}
                      label="E-Posta Adresi"
                      inputStyle={GlobalStyles.formInput}
                      placeholder="E-Posta Adresiniz"
                      autoCompleteType="email"
                      autoCorrect={false}
                      autoFocus={true}
                      keyboardType="email-address"
                      errorMessage={errors.email ? 'E-Posta adresi alanı gerekli' : undefined}
                    />
                    <TextField
                      control={control}
                      name="password"
                      rules={{required: true}}
                      label="Parola"
                      inputStyle={GlobalStyles.formInput}
                      placeholder="Parolanız"
                      secureTextEntry={true}
                      errorMessage={errors.email ? 'Parola alanı gerekli' : undefined}
                    />
                </KeyboardAvoid>
            </View>
            <SafeAreaView style={[GlobalStyles.footerContainer]}>
                <View style={[GlobalStyles.footerContent]}>
                    <Button
                        style={{paddingVertical: spacing[4], paddingHorizontal: spacing[4], backgroundColor: color.deepPurple}}
                        textStyle={{fontWeight: "bold", color: color.white, fontFamily: "normal", fontSize: 13, letterSpacing: 2}}
                        text="KAYIT OL"
                        onPress={() => navigation.navigate("register")}
                    />
                    <Button
                        style={{paddingVertical: spacing[4], paddingHorizontal: spacing[4], backgroundColor: color.deepPurple, flexGrow: 1, marginLeft: spacing[3],}}
                        textStyle={{fontWeight: "bold", color: color.white, fontFamily: "normal", fontSize: 13, letterSpacing: 2}}
                        text="GİRİŞ YAP"
                        onPress={handleSubmit(login)}
                        disabled={isLoggingIn}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default LoginScreen;
