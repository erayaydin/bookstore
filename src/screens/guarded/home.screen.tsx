import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/types";
import React, { useCallback, useEffect } from "react";
import { fetchBooksAction, setCurrentBook } from "../../store/book/actions";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { asyncLogoutAction } from "../../store/auth/actions";
import { BookModel, UserBookModel } from "../../models/book.model";
import { useNavigation, CommonActions } from "@react-navigation/native";
import {GlobalStyles} from "../../styles/global";
import Wallpaper from "../../components/wallpaper";
import Header from "../../components/header";
import {color} from "../../styles/color";
import {Button, Card, Paragraph, Title} from "react-native-paper";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const bookList = useSelector<RootState, BookModel[]>(state => state.book.bookList);
  const booksLoading = useSelector<RootState, boolean>(state => state.book.isLoading);
  const access_token = useSelector<RootState, string | undefined>(state => state.auth.access_token);
  const navigation = useNavigation();

  const loadBooks = useCallback(() => {
    dispatch(fetchBooksAction({ request: { page: 1, access_token } }));
  }, []);

  const bookPressed = (book: BookModel) => {
    dispatch(setCurrentBook({ book, currentPage: 1 }));
    navigation.dispatch(
      CommonActions.navigate({ name: "viewBook" })
    );
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const logout = () => {
    asyncLogoutAction()(dispatch);
  };

  return (
    <View style={[GlobalStyles.full, GlobalStyles.bgPrimary, GlobalStyles.column]}>
      <Wallpaper />
      <Header
          text="KİTAP LİSTESİ"
          titleStyle={GlobalStyles.headerTitle}
          leftIcon="menu"
          onLeftPress={() => {}}
          rightIcon="logout"
          onRightPress={() => logout()}
      />
      <FlatList data={bookList} contentContainerStyle={GlobalStyles.listContainer} renderItem={
        ({ item }) => (
            <Card style={{marginBottom: 20, backgroundColor: color.lightPurple}}>
                <Card.Title title={item.name} subtitle={item.authors.map(a => a.name)} titleStyle={{color: "white"}} subtitleStyle={{color: "white"}} />
                <Card.Cover source={{ uri: item.image }} />
                <Card.Actions>
                    <Button labelStyle={{color: "white"}} onPress={() => bookPressed(item)}>Okumaya Devam Et</Button>
                </Card.Actions>
            </Card>
          // <TouchableOpacity style={{ marginBottom: 10, alignItems: "center", flexDirection: "row", padding: 10, borderWidth: 1, borderColor: color.deepPurple, backgroundColor: color.lightPurple, borderRadius: 6, }} onPress={() => bookPressed(item)}>
          //   <Text style={{color: color.white}}>{item.name}</Text>
          // </TouchableOpacity>
        )
      } keyExtractor={item => item.uuid} refreshControl={<RefreshControl
        refreshing={booksLoading}
        onRefresh={loadBooks}
      />} />
    </View>
  );
};

export default HomeScreen;
