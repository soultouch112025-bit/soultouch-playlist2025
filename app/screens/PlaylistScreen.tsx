import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../assets/styles/playlistStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";


type Props = NativeStackScreenProps<RootStackParamList, "Playlist">;

type Song = {
  id: number;
  title: string;
  duration: string;
};

export default function PlaylistScreen({ route, navigation }: Props) {
 const { playlist } = route.params || { playlist: { title: "Unknown", songs: 0, image: null } };


  // Dummy songs
  const songs: Song[] = Array.from({ length: playlist.songs }, (_, i) => ({
    id: i + 1,
    title: `${playlist.title} Song ${i + 1}`,
    duration: `${3 + (i % 2)}:${(i * 13) % 60}`,
  }));

  // State for currently playing song
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    const prevIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    setCurrentSong(songs[prevIndex]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>{playlist.title}</Text>
      </View>

      {/* Songs List */}
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songRow}
            onPress={() => handlePlaySong(item)}
          >
            <View>
              <Text
                style={[
                  styles.songTitle,
                  currentSong?.id === item.id && { color: "#1DB954" },
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.songDuration}>{item.duration}</Text>
            </View>
            {currentSong?.id === item.id && (
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={26}
                color="#1DB954"
              />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Bottom Music Player Bar */}
      {currentSong && (
        <View style={playerStyles.playerBar}>
          <TouchableOpacity onPress={handlePrev}>
            <Ionicons name="play-skip-back" size={28} color="#fff" />
          </TouchableOpacity>

          <View style={playerStyles.songInfo}>
            <Text style={playerStyles.songTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
          </View>

          <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={40}
              color="#1DB954"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <Ionicons name="play-skip-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// 🎨 Player bar styles
const playerStyles = StyleSheet.create({
  playerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#1c1c1e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopColor: "#333",
    borderTopWidth: 1,
    paddingHorizontal: 12,
  },
  songInfo: {
    flex: 1,
    marginHorizontal: 8,
  },
  songTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
