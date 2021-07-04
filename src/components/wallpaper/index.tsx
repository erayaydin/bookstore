import React from "react";
import {Image} from "react-native";
import {GlobalStyles} from "../../styles/global";

const defaultBackground = require("../../assets/images/background.png");

const Wallpaper = () => {
    return <Image source={defaultBackground} style={GlobalStyles.wallpaper} />
};

export default Wallpaper;
