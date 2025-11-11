// // app/playlist.tsx
// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { Audio, AVPlaybackStatus } from "expo-av";
// import { Colors } from "../assets/styles/theme";
//
// export default function PlaylistScreen() {
//   const { title } = useLocalSearchParams();
//   const router = useRouter();
//   const [sound, setSound] = useState<Audio.Sound | null>(null);
//   const [currentSong, setCurrentSong] = useState<string | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//
//   // cleanup sound when navigating away
//   useEffect(() => {
//     return sound
//       ? () => {
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);
//
//   // Sample playlist with audio file paths
//   const songs = [
//     { id: "1", name: "Song 1", file: require("../assets/audio/chill1.mp3") },
//     { id: "2", name: "Song 2", file: require("../assets/audio/chill2.mp3") },
//     { id: "3", name: "Song 3", file: require("../assets/audio/romantic1.mp3") },
//   ];
//
//   const playSong = async (item: any) => {
//     try {
//       // Stop previous song
//       if (sound) {
//         await sound.stopAsync();
//         await sound.unloadAsync();
//       }
//
//       const { sound: newSound } = await Audio.Sound.createAsync(item.file);
//       setSound(newSound);
//       setCurrentSong(item.name);
//       setIsPlaying(true);
//       await newSound.playAsync();
//     } catch (err) {
//       console.error("Error playing sound:", err);
//     }
//   };
//
//   const togglePlayPause = async () => {
//     if (!sound) return;
//     const status = await sound.getStatusAsync();
//     if (status.isLoaded) {
//       if (status.isPlaying) {
//         await sound.pauseAsync();
//         setIsPlaying(false);
//       } else {
//         await sound.playAsync();
//         setIsPlaying(true);
//       }
//     }
//   };
//
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={26} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.header}>{title}</Text>
//       </View>
//
//       {/* Songs list */}
//       <FlatList
//         data={songs}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={[
//               styles.songRow,
//               currentSong === item.name && styles.activeSong,
//             ]}
//             onPress={() => playSong(item)}
//           >
//             <Text
//               style={[
//                 styles.songTitle,
//                 currentSong === item.name && styles.activeSongTitle,
//               ]}
//             >
//               {item.name}
//             </Text>
//
//             {currentSong === item.name && isPlaying ? (
//               <Ionicons name="pause" size={24} color="#1DB954" />
//             ) : (
//               <Ionicons name="play" size={24} color="#fff" />
//             )}
//           </TouchableOpacity>
//         )}
//       />
//
//       {/* Bottom mini-player */}
//       {currentSong && (
//         <View style={styles.playerBar}>
//           <Text style={styles.nowPlayingText}>{currentSong}</Text>
//           <TouchableOpacity onPress={togglePlayPause}>
//             <Ionicons
//               name={isPlaying ? "pause-circle" : "play-circle"}
//               size={50}
//               color="#1DB954"
//             />
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     paddingHorizontal: 16,
//     paddingTop: 50,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   header: {
//     color: Colors.textPrimary,
//     fontSize: 22,
//     fontWeight: "bold",
//     marginLeft: 12,
//   },
//   songRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderBottomColor: Colors.border,
//     borderBottomWidth: 1,
//   },
//   songTitle: {
//     color: Colors.textPrimary,
//     fontSize: 16,
//   },
//   activeSong: {
//     backgroundColor: "#222",
//   },
//   activeSongTitle: {
//     color: Colors.accent,
//   },
//   playerBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     borderTopColor: Colors.border,
//     borderTopWidth: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: Colors.card,
//   },
//   nowPlayingText: {
//     color: Colors.textPrimary,
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
