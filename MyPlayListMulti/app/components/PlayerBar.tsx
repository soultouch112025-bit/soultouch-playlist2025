// components/PlayerBar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../assets/styles/theme";

interface PlayerBarProps {
  songTitle: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PlayerBar({
  songTitle,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
}: PlayerBarProps) {
  return (
    <View style={styles.container}>
      {/* Left controls */}
      <TouchableOpacity onPress={onPrev}>
        <Ionicons name="play-skip-back" size={26} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* Center controls */}
      <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
        <Ionicons
          name={isPlaying ? "pause-circle" : "play-circle"}
          size={44}
          color={Colors.accent}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext}>
        <Ionicons name="play-skip-forward" size={26} color={Colors.textPrimary} />
      </TouchableOpacity>

      {/* Song name */}
      <Text style={styles.songTitle} numberOfLines={1}>
        {songTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: Colors.card,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 8,
  },
  playButton: {
    marginHorizontal: 10,
  },
  songTitle: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
});
