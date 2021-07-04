import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import NavigationScreen from "./src/screens/navigationScreen";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {color} from "./src/styles/color";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: color.deepPurple,
        accent: color.lightPurple,
    },
};

const App = () => {
  return (
      <Provider store={store}>
          <PaperProvider theme={theme}>
              <NavigationScreen />
          </PaperProvider>
      </Provider>
  );
};

export default App;
