import "reflect-metadata";
import { Stack } from "expo-router";
import { Provider } from "inversify-react";
import { container } from "@/config/di/inversify";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

SplashScreen.preventAutoHideAsync();

function cacheFonts(fonts: any[]) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        const fontAssets = cacheFonts([
          MaterialCommunityIcons.font,
          MaterialIcons.font,
        ]);

        await Promise.all([...fontAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        // Una vez listo, ocultar la pantalla de splash
        SplashScreen.hideAsync();
      }
    }

    loadResources();
  }, []);

  if (!isReady) {
    return null; // Aquí podrías mostrar un indicador de carga si lo deseas
  }

  return (
    <Provider container={container}>
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="index" />
      </Stack>
    </Provider>
  );
}
