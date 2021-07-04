import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  View
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../styles/global";
import Wallpaper from "../../components/wallpaper";
import Header from "../../components/header";
import { spacing } from "../../styles/spacing";
import TextField from "../../components/text-field";
import Button from "../../components/button";
import { color } from "../../styles/color";
import { RegisterRequest } from "../../models/register.request";
import { registerApi } from "../../api/auth.api";
import { useForm } from "react-hook-form";
import KeyboardAvoid from "../../components/keyboard-avoid";

const RegisterScreen = () => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors }, getValues } = useForm();

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const register = (data: RegisterRequest) => {
    setIsRegistering(true);
    registerApi(data).then(res => {
      if (res === 200) {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "login" }] }));
        return;
      }

      showToast("E-Posta adresi zaten kayıtlı.");
    }).finally(() => {
      setIsRegistering(false);
    });
  };

  return (
    <View style={[GlobalStyles.bgPrimary, GlobalStyles.full, GlobalStyles.column]}>
      <Wallpaper />
      <View style={{ paddingHorizontal: spacing[4], flex: 1 }}>
        <Header
          text="Kayıt Ol"
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          titleStyle={GlobalStyles.headerTitle}
        />
        <Text style={[GlobalStyles.heroText, GlobalStyles.screenTitle]}>Aramıza Katıl!</Text>
        <Text style={[GlobalStyles.screenDescription]}>Aşağıdaki form ile hesap oluşturarak uygulamaya ilk adımını atabilirsin.</Text>

        <KeyboardAvoid>
          <TextField
            control={control}
            name="name"
            label="İsim Soyisim"
            inputStyle={GlobalStyles.formInput}
            placeholder="İsminiz Soyisminiz"
            autoFocus={true}
            rules={{ required: true }}
            errorMessage={errors.name ? "İsim soyisim alanı gerekli" : undefined}
          />
          <TextField
            control={control}
            name="email"
            label="E-Posta Adresi"
            inputStyle={GlobalStyles.formInput}
            placeholder="E-Posta Adresiniz"
            autoCompleteType="email"
            autoCorrect={false}
            autoFocus={false}
            keyboardType="email-address"
            rules={{ required: true }}
            errorMessage={errors.email ? "E-Posta alanı gerekli" : undefined}
          />
          <TextField
            control={control}
            name="password"
            label="Parola"
            inputStyle={GlobalStyles.formInput}
            placeholder="Parolanız"
            secureTextEntry={true}
            errorMessage={errors.password ? "Parola alanı gerekli ve en az 6 karakterden oluşmalı" : undefined}
            rules={{ required: true, minLength: 6 }}
          />
          <TextField
            control={control}
            name="password_confirmation"
            label="Parola Onayı"
            inputStyle={GlobalStyles.formInput}
            placeholder="Parola Onayı"
            secureTextEntry={true}
            errorMessage={errors.password_confirmation ? "Parola Onayı alanı gerekli ve Parola alanıyla aynı olmalı" : undefined}
            rules={{ required: true, minLength: 6, validate: value => value === getValues("password") }}
          />
        </KeyboardAvoid>
      </View>
      <SafeAreaView style={[GlobalStyles.footerContainer]}>
        <View style={[GlobalStyles.footerContent]}>
          <Button
            style={{
              paddingVertical: spacing[4],
              paddingHorizontal: spacing[4],
              backgroundColor: color.deepPurple,
              flexGrow: 1,
              marginLeft: spacing[3]
            }}
            textStyle={{ fontWeight: "bold", color: color.white, fontFamily: "normal", fontSize: 13, letterSpacing: 2 }}
            text="KAYIT OL"
            onPress={handleSubmit(register)}
            disabled={isRegistering}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
