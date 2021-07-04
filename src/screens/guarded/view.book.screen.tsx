import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Modal, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity, TouchableWithoutFeedback,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { UserBookModel } from "../../models/book.model";
import Pdf from "react-native-pdf";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SectionModel } from "../../models/section.model";
import { Animated } from "react-native";
import {GlobalStyles} from "../../styles/global";
import Wallpaper from "../../components/wallpaper";
import Header from "../../components/header";
import {color} from "../../styles/color";
import VectorImage from "react-native-vector-image";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  headerBack: {},
  headerTitle: {},
  headerSections: {},
});

interface ListProps {
  data: SectionModel[];
  height?: number;
  marginTop?: number;
}

const closeIcon = require('../../assets/icons/close.svg');

const ViewBookScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const currentBook = useSelector<RootState, UserBookModel | undefined>(state => state.book.currentBook);
  const navigation = useNavigation();
  const access_token = useSelector<RootState, string | undefined>(state => state.auth.access_token);
  const opacityTranslation = useRef(new Animated.Value(0)).current;
  const zIndexTranslation = useRef(new Animated.Value(0)).current;
  const pdfRef = useRef<Pdf>(null);

  useEffect(() => {
    Animated.timing(opacityTranslation, {
      toValue: modalVisible ? 0.5 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
    Animated.timing(zIndexTranslation, {
      toValue: modalVisible ? 10 : -1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [modalVisible]);

  useEffect(() => {
    if (!currentBook) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "home" }]
        })
      );
    }
  }, [currentBook]);

  const onError = (e: object) => {
    console.log({ pdfError: e });
  };

  const sectionPressed = (item: SectionModel) => {
    pdfRef.current?.setPage(item.page);
    setModalVisible(false);
  };

  const SectionList = (props: ListProps) => (
    <FlatList data={props.data} style={{ height: props.height ? props.height : "auto", marginTop: props.marginTop ? props.marginTop : 0 }}
              renderItem={(props) => SectionItem(props)} />
  );

  const SectionItem = (props: ListRenderItemInfo<SectionModel>) => (
    <View>
      <TouchableOpacity onPress={() => sectionPressed(props.item)} style={{backgroundColor: color.deepPurple, borderRadius: 5, marginBottom: 3}}>
        <Text style={{fontSize: 20, color: color.white, padding: 8}}>
          {props.item.name}
        </Text>
      </TouchableOpacity>
      {props.item.subs.length > 0 && (
        <View style={{ marginLeft: 20, }}>
          <SectionList data={props.item.subs} />
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, GlobalStyles.full, GlobalStyles.bgPrimary]}>
      <Wallpaper />
      <Header
          text={currentBook?.name}
          titleStyle={GlobalStyles.headerTitle}
          leftIcon="back"
          onLeftPress={() => navigation.goBack()}
          rightIcon="sections"
          onRightPress={() => setModalVisible(true)}
      />
      {currentBook && (
        <Pdf source={{
          uri: currentBook.pdf,
          headers: { Host: "bookstore.localhost", Authorization: `Bearer ${access_token}` }
        }} style={GlobalStyles.pdf} ref={pdfRef} onError={(e) => onError(e)} />
      )}
      <Animated.View style={{
        backgroundColor: "#000",
        opacity: opacityTranslation,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        zIndex: zIndexTranslation
      }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{
          position: "relative",
          zIndex: 30
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: 20,
            margin: 20,
            borderRadius: 12,
            zIndex: 30,
            maxHeight: 200
          }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 8, position: "absolute", right: 5, }}>
              <VectorImage source={closeIcon} style={{width: 24, height: 24}} />
            </TouchableOpacity>
            <SectionList data={currentBook?.sections ?? []} height={200} marginTop={15} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewBookScreen;
