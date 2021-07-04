import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncInitializeLoginAction } from "../store/auth/actions";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {GlobalStyles} from "../styles/global";
import {color} from "../styles/color";

const SplashScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    asyncInitializeLoginAction()(dispatch).then(isLoggedIn => {
      setTimeout(() => {
        if (isLoggedIn) {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "home" }] }));
        } else {
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "login" }] }));
        }
      }, 2500);
    }).catch(() => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "login" }] })));
  }, []);
  return (
    <View style={[GlobalStyles.bgPrimary, GlobalStyles.full, {alignItems: "center", justifyContent: "center"}]}>
      <Text style={{fontSize: 31, color: color.white}}>Book Store</Text>
    </View>
  );
};

export default SplashScreen;
