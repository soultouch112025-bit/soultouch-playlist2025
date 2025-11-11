import React, { ReactNode } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import PlayerBar from "./PlayerBar";
import { Colors } from "../../assets/styles/theme";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>{children}</View>

      {/* Bottom Music Player */}
      <View style={styles.playerWrapper}>
        <PlayerBar
          songTitle="Pookal Pookum"
          isPlaying={false}
          onPlayPause={() => console.log("Play / Pause")}
          onNext={() => console.log("Next")}
          onPrev={() => console.log("Previous")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
      marginTop: 0, // ensure no gap
    },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  playerWrapper: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
