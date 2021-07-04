import {Dimensions, StyleSheet} from "react-native";
import {color} from "./color";
import {spacing} from "./spacing";

export const GlobalStyles = StyleSheet.create({
    full: {
        flex: 1,
    },
    column: {
        flexDirection: "column",
    },
    wallpaper: {
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        resizeMode: "stretch",
        width: "100%",
        height: "100%",
    },
    container: {
        backgroundColor: color.transparent,
        paddingHorizontal: spacing[4],
    },
    bgPrimary: {
        backgroundColor: color.deepPurple,
    },
    headerComponent: {
        flexDirection: "row",
        paddingHorizontal: 0,
        alignItems: "center",
        paddingTop: spacing[3],
        paddingBottom: spacing[4] + spacing[1],
        justifyContent: "flex-start",
    },
    headerTitle: {
        color: color.white,
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 15,
        textAlign: "center",
        letterSpacing: 1.5,
    },
    screenTitle: {
        fontWeight: "bold",
        fontSize: 28,
        lineHeight: 38,
        textAlign: "center",
        marginBottom: spacing[5],
    },
    heroText: {
        color: color.white,
        fontSize: 24,
        fontWeight: "bold"
    },
    screenDescription: {
        color: "#BAB6C8",
        fontSize: 15,
        lineHeight: 22,
        marginBottom: spacing[4] + spacing[1],
    },
    textField: {
        paddingVertical: spacing[3],
    },
    fieldLabel: {
        fontSize: 13,
        color: color.lightGrey,
    },
    errorLabel: {
        fontSize: 13,
        color: color.angry,
        marginTop: 8,
    },
    input: {
        color: color.white,
        minHeight: 44,
        fontSize: 18,
        backgroundColor: color.white,
    },
    formInput: {
        fontFamily: "normal",
        color: "#fff",
        marginTop: spacing[2],
        backgroundColor: color.deepPurple,
        paddingVertical: spacing[2],
        paddingHorizontal: spacing[3],
        fontSize: 15
    },
    footerContainer: {
        backgroundColor: "#20162D",
    },
    footerContent: {
        flexDirection: "row",
        paddingVertical: spacing[4],
        paddingHorizontal: spacing[4],
    },
    listContainer: {
        paddingHorizontal: spacing[4],
    },
    pdf: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
});
