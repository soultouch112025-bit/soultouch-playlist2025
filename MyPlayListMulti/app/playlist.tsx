// app/playlist.tsx
import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity,  StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
// import styles from "../assets/styles/playlistStyles";
import { Colors } from "../assets/styles/theme";

export default function PlaylistScreen() {
 const { title } = useLocalSearchParams();
  const router = useRouter();
  const soundRef = useRef<Audio.Sound | null>(null);

  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
     // cleanup sound when navigating away
     useEffect(() => {
         return () => {
           if (soundRef.current) {
             soundRef.current.unloadAsync();
           }
         };
       }, []);

  // Sample playlist with audio file paths
    const songs = [
      { id: "1", name: "Song 1", file: require("../assets/audio/aathi.mp3") },
      { id: "2", name: "Song 2", file: require("../assets/audio/pookal-pookum.mp3") },
      { id: "3", name: "Song 3", file: require("../assets/audio/yaakai-thiri.mp3") },
    ];

 const playSong = async (item: any) => {
     try {
       setLoading(true);

       // ✅ Stop and unload any currently playing sound
       if (soundRef.current) {
         const currentStatus = await soundRef.current.getStatusAsync();
         if (currentStatus.isLoaded) {
           await soundRef.current.stopAsync();
           await soundRef.current.unloadAsync();
         }
         soundRef.current = null;
       }

       // ✅ Load and play new song
       const { sound } = await Audio.Sound.createAsync(item.file);
       soundRef.current = sound;
       setCurrentSong(item.name);
       setIsPlaying(true);
       await sound.playAsync();

       // Automatically update when finished
       sound.setOnPlaybackStatusUpdate((status) => {
         if ((status as any).didJustFinish) {
           setIsPlaying(false);
           sound.unloadAsync();
           soundRef.current = null;
         }
       });
     } catch (err) {
       console.error("Playback error:", err);
     } finally {
       setLoading(false);
     }
   };

  const togglePlayPause = async () => {
     if (!soundRef.current) return;

     const status = await soundRef.current.getStatusAsync();
     if (status.isLoaded) {
       if (status.isPlaying) {
         await soundRef.current.pauseAsync();
         setIsPlaying(false);
       } else {
         await soundRef.current.playAsync();
         setIsPlaying(true);
       }
     }
   };

  const songList = Array.from({ length: Number(songs) || 10 }, (_, i) => ({
    id: i + 1,
    name: `${title} Song ${i + 1}`,
    duration: `${3 + (i % 2)}:${(i * 13) % 60}`,
  }));

  return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.header}>{title || "Playlist"}</Text>
        </View>

        {/* Songs List */}
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.songRow,
                currentSong === item.name && styles.activeSong,
              ]}
              onPress={() => playSong(item)}
            >
              <Text
                style={[
                  styles.songTitle,
                  currentSong === item.name && styles.activeSongTitle,
                ]}
              >
                {item.name}
              </Text>

              {loading && currentSong === item.name ? (
                <Ionicons name="time-outline" size={22} color="#1DB954" />
              ) : currentSong === item.name && isPlaying ? (
                <Ionicons name="pause" size={22} color="#1DB954" />
              ) : (
                <Ionicons name="play" size={22} color="#fff" />
              )}
            </TouchableOpacity>
          )}
        />

        {/* Bottom Mini Player */}
        {currentSong && (
          <View style={styles.playerBar}>
            <Text style={styles.nowPlayingText}>{currentSong}</Text>
            <TouchableOpacity onPress={togglePlayPause}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={50}
                color="#1DB954"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },
  songRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  songTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  activeSong: {
    backgroundColor: "#222",
  },
  activeSongTitle: {
    color: Colors.accent,
  },
  playerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.card,
  },
  nowPlayingText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
});
