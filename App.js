import React from "react";
import AppNavigator from "./Navigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#ffffff",
      accent: "#f1c40f",
      text: "#515151",
      surface: "#FF6766",
      underlineColor: "transparent",
      background: "#ffffff",
      contained: "#000000"
    }
  };

  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
}
