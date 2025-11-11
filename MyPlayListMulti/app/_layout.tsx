// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../assets/styles/theme";
import PlayerBar from "./components/PlayerBar";
import { SafeAreaView, View, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Expo Router navigation stack */}
        <Stack
          screenOptions={{
            headerShown: false, // hide default header
            contentStyle: { backgroundColor: Colors.background },
          }}
        />
        {/* Persistent bottom player */}
        <PlayerBar
          songTitle="No song selected"
          isPlaying={false}
          onPlayPause={() => {}}
          onNext={() => {}}
          onPrev={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
